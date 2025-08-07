import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFactionDeploy from '../../hooks/useFactionDeploy';
import { addGenesisBlockFactoryEvent } from '../../store/eventSlices';
import useCharterMetadata from '../../hooks/useCharterMetadata';

interface GenesisBlockDeployerProps {
  account: string;
}

const GenesisBlockDeployer: React.FC<GenesisBlockDeployerProps> = ({ account }) => {
  const dispatch = useDispatch();
  const { deployFaction, loading, error, factionAddress } = useFactionDeploy(account);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [agentFile, setAgentFile] = useState<File | null>(null);

  const { metadata, immutableGenesis, agentHandles } = useCharterMetadata(name);

  useEffect(() => {
    if (metadata?.description) {
      setDescription(metadata.description);
    }
  }, [metadata]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentFile) {
      alert('Please upload an AGENTS.md file');
      return;
    }
    try {
      const { tx, faction } = await deployFaction(name, agentFile);
      setTxHash(tx.hash);
      dispatch(
        addGenesisBlockFactoryEvent({
          name: 'FactionCreated',
          args: [name, faction],
          transactionHash: tx.hash,
        }),
      );
    } catch (err) {
      console.error('Faction deployment failed', err);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Deploy Genesis Block Faction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Faction Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          rows={4}
        />
        <input
          type="file"
          accept=".md"
          onChange={(e) => setAgentFile(e.target.files ? e.target.files[0] : null)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Deploying...' : 'Deploy'}
        </button>
      </form>
      {immutableGenesis !== null && (
        <div className="mt-2">
          <span className="font-semibold">Immutable Genesis:</span>{' '}
          {immutableGenesis ? 'Yes' : 'No'}
        </div>
      )}
      {agentHandles.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold">Agent Handles:</span>{' '}
          {agentHandles.join(', ')}
        </div>
      )}
      {txHash && (
        <div className="mt-4">
          <span className="font-semibold">Transaction Hash:</span> {txHash}
        </div>
      )}
      {factionAddress && (
        <div className="mt-2">
          <span className="font-semibold">Faction Address:</span> {factionAddress}
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error.message || 'Deployment failed'}</div>}
    </div>
  );
};

export default GenesisBlockDeployer;

