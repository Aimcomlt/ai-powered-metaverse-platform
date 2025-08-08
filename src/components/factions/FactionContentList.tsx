import React, { useEffect, useState } from 'react';
import useMpns from '../../hooks/useMpns';
import useGtValidation from '../../hooks/useGtValidation';
import LoadingSpinner from '../shared/LoadingSpinner';
import AlertMessage from '../shared/AlertMessage';

interface FactionContentListProps {
  mpnsName: string;
  title: string;
  requiredRole?: string;
  requiredLevel?: number;
}

const FactionContentList: React.FC<FactionContentListProps> = ({
  mpnsName,
  title,
  requiredRole = 'member',
  requiredLevel = 1,
}) => {
  const hasGt = useGtValidation(1);
  const { result: roleRes } = useMpns('user.role.mpns');
  const { result: levelRes } = useMpns('user.level.mpns');

  const role = roleRes.value || '';
  const level = parseInt(levelRes.value || '0', 10);
  const roleAllowed = role === requiredRole || role === 'admin';
  const levelAllowed = level >= requiredLevel;
  const allowed = hasGt && roleAllowed && levelAllowed;

  const { result, status, resolve } = useMpns(mpnsName);
  const [items, setItems] = useState<any[]>([]);
  const [dataStatus, setDataStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState('');

  const load = async () => {
    if (result.type === 'ipfs' && result.value) {
      setDataStatus('loading');
      setError('');
      let url = result.value;
      if (url.startsWith('ipfs://')) {
        url = `https://ipfs.io/ipfs/${url.slice(7)}`;
      }
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        if (Array.isArray(data)) {
          setItems(data);
        } else if (Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          setItems([]);
        }
        setDataStatus('ready');
      } catch (err) {
        console.error('Failed to load content', err);
        setError('Failed to load content.');
        setDataStatus('error');
      }
    }
  };

  useEffect(() => {
    if (result.type === 'ipfs') {
      load();
    }
  }, [result]);

  if (!allowed) {
    return (
      <div className="p-4 text-gray-500">Access restricted.</div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {(status === 'loading' || dataStatus === 'loading') && (
        <LoadingSpinner size="md" text="Loading..." />
      )}
      {status === 'error' && (
        <AlertMessage
          type="error"
          message="Failed to resolve content location."
          onRetry={() => resolve(mpnsName)}
        />
      )}
      {dataStatus === 'error' && (
        <AlertMessage
          type="error"
          message={error || 'Failed to load content.'}
          onRetry={load}
        />
      )}
      {dataStatus === 'ready' && items.length === 0 && (
        <div>No content found.</div>
      )}
      {dataStatus === 'ready' && items.length > 0 && (
        <ul className="list-disc pl-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx}>{item.title || `Item ${idx + 1}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FactionContentList;
