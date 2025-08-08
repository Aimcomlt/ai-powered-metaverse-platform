import agents from '../../agents/architects-guild/agents.json';
import ipfsService from './ipfsService';

export interface AgentMetadata {
  handle: string;
  description?: string;
  fileType?: string;
  ipfsHash?: string;
  version?: string;
  content?: string;
}

const agentList: AgentMetadata[] = agents as AgentMetadata[];

export const getAgent = async (handle: string): Promise<AgentMetadata | null> => {
  const metadata = agentList.find((a) => a.handle === handle);
  if (!metadata) return null;
  let content: string | undefined;
  if (metadata.ipfsHash) {
    try {
      content = await ipfsService.fetchFromIPFS(metadata.ipfsHash);
    } catch (error) {
      console.error('Error fetching AGENT.md from IPFS:', error);
    }
  }
  return { ...metadata, content };
};

export default {
  getAgent,
};
