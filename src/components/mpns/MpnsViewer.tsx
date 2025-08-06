import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContract } from '../../hooks/useContract';
import { MpNSRegistry } from '../../contracts';

interface MpnsViewerProps {
  userAddress?: string;
  name?: string;
}

interface RegistrationInfo {
  name: string;
  expiration: Date;
  metadata?: any;
}

const MpnsViewer: React.FC<MpnsViewerProps> = ({ userAddress, name }) => {
  const getRegistry = useContract('MpNSRegistry');
  const [info, setInfo] = useState<RegistrationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!userAddress && !name) return;
      setLoading(true);
      setError(null);
      try {
        const registry = (await getRegistry()) as MpNSRegistry;
        let resolvedName = name;

        if (!resolvedName && userAddress) {
          const filter = registry.filters.NameRegistered(null, userAddress);
          const events = await registry.queryFilter(filter);
          if (events.length === 0) {
            setError('No name registration found');
            setLoading(false);
            return;
          }
          const last = events[events.length - 1];
          resolvedName = last.args?.name as string;
        }

        if (!resolvedName) {
          setError('Name not specified');
          setLoading(false);
          return;
        }

        const [expirationBn, uri] = await Promise.all([
          registry.expirationOf(resolvedName),
          registry.nameToUri(resolvedName),
        ]);

        let metadata: any = null;
        if (uri) {
          try {
            const res = await axios.get(uri);
            metadata = res.data;
          } catch {
            metadata = { uri };
          }
        }

        setInfo({
          name: resolvedName,
          expiration: new Date(Number(expirationBn.toString()) * 1000),
          metadata,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch registration');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [userAddress, name, getRegistry]);

  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!info) return null;

  return (
    <div className="space-y-2">
      <div><strong>Name:</strong> {info.name}</div>
      <div>
        <strong>Expiration:</strong> {info.expiration.toLocaleString()}
      </div>
      {info.metadata && (
        <div>
          <strong>Metadata:</strong>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(info.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MpnsViewer;

