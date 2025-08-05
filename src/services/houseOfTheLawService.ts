import { HouseOfTheLaw } from '../contracts';
import { getProvider, getSigner } from './provider';

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

const HOTL_ADDRESS =
  process.env.REACT_APP_HOUSE_OF_THE_LAW_ADDRESS ||
  process.env.HOUSE_OF_THE_LAW_ADDRESS ||
  '0x0000000000000000000000000000000000000000';

export const getHouse = async (): Promise<HouseOfTheLaw> => {
  if (!houseInstance) {
    const provider = getProvider();
    houseInstance = new HouseOfTheLaw(HOTL_ADDRESS, provider);
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
