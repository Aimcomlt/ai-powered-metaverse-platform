import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GenesisBlockDeployer from './GenesisBlockDeployer';

interface FactionConsoleProps {
  account: string;
}

interface FactionMember {
  address: string;
  role: string;
}

const FactionConsole: React.FC<FactionConsoleProps> = ({ account }) => {
  const { factionId, level } = useSelector((state: any) => state.gt);
  const [members, setMembers] = useState<FactionMember[]>([]);
  const [status, setStatus] = useState('Unknown');

  useEffect(() => {
    if (!factionId) return;

    // Placeholder: replace with real API/service calls to fetch status and members
    setStatus('Active');
    setMembers([{ address: account, role: 'Leader' }]);
  }, [factionId, account]);

  const canManage = level >= 2; // Example role check

  return (
    <div className="p-4 border rounded space-y-4">
      <h2 className="text-2xl font-bold">Faction Console</h2>
      {factionId ? (
        <>
          <div className="space-y-1">
            <div>
              <span className="font-semibold">Faction ID:</span> {factionId}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {status}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-4">Members</h3>
            {members.length === 0 ? (
              <div className="text-gray-500">No members found.</div>
            ) : (
              <ul className="list-disc list-inside">
                {members.map((m, idx) => (
                  <li key={idx}>
                    {m.address} - {m.role}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 space-y-4">
            {canManage ? (
              <>
                <GenesisBlockDeployer account={account} />
                <div className="p-2 border rounded">Other faction actions will appear here.</div>
              </>
            ) : (
              <div className="text-gray-500">
                You do not have permission to perform faction actions.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-gray-500">Join a faction to access the console.</div>
      )}
    </div>
  );
};

export default FactionConsole;

