import { HouseOfTheLaw } from '../contracts';
import { getProvider, getSigner } from './provider';
import { resolveMpnsName } from './mpns';

export interface ProposalParams {
  description: string;
  ipfsHash: string;
  eligibleGTId: number;
  target: string;
  data: string;
}

export interface VoteParams {
  proposalId: number;
  votes: number;
}

export interface ValidationParams {
  user: string;
  taskId: number;
  ftId: number;
  gtReward: number;
}

export interface HouseOfTheLawService {
  getHouse(): Promise<HouseOfTheLaw>;
  createProposal(params: ProposalParams): Promise<any>;
  vote(params: VoteParams): Promise<any>;
  validateTask(params: ValidationParams): Promise<any>;
}

let houseInstance: HouseOfTheLaw | undefined;

export const getHouse = async (): Promise<HouseOfTheLaw> => {
  if (!houseInstance) {
    const provider = getProvider();
    const res = await resolveMpnsName('house-of-the-law.mpns', provider);
    const address = res.value || '0x0000000000000000000000000000000000000000';
    houseInstance = new HouseOfTheLaw(address, provider);
  }
  return houseInstance;
};

export const createProposal = async (params: ProposalParams) => {
  const { description, ipfsHash, eligibleGTId, target, data } = params;
  const hotl = await getHouse();
  const signer = await getSigner();
  return hotl
    .connect(signer)
    .createProposal(description, ipfsHash, BigInt(eligibleGTId), target, data);
};

export const vote = async ({ proposalId, votes }: VoteParams) => {
  const hotl = await getHouse();
  const signer = await getSigner();
  return hotl.connect(signer).vote(BigInt(proposalId), BigInt(votes));
};

export const validateTask = async (params: ValidationParams) => {
  const { user, taskId, ftId, gtReward } = params;
  const hotl = await getHouse();
  const signer = await getSigner();
  return hotl
    .connect(signer)
    .validateTask(user, BigInt(taskId), BigInt(ftId), BigInt(gtReward));
};

const service: HouseOfTheLawService = {
  getHouse,
  createProposal,
  vote,
  validateTask,
};

export default service;
