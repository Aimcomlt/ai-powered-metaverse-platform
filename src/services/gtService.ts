import { GovernanceToken, GTStaking } from '../contracts';
import { getProvider, getSigner } from './provider';

export interface StakeParams {
  id: number;
  amount: bigint;
}

export interface GTService {
  getGovernanceToken(): Promise<GovernanceToken>;
  getGTStaking(): Promise<GTStaking>;
  fetchUserGTs(user: string): Promise<bigint[]>;
  stake(params: StakeParams): Promise<any>;
  unstake(tokenId: number): Promise<any>;
}

let governanceToken: GovernanceToken | undefined;
let stakingInstance: GTStaking | undefined;

const GOVERNANCE_TOKEN_ADDRESS =
  process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS ||
  process.env.GOVERNANCE_TOKEN_ADDRESS ||
  '0x0000000000000000000000000000000000000000';

const GT_STAKING_ADDRESS =
  process.env.REACT_APP_GT_STAKING_ADDRESS ||
  process.env.GT_STAKING_ADDRESS ||
  '0x0000000000000000000000000000000000000000';

export const getGovernanceToken = async (): Promise<GovernanceToken> => {
  if (!governanceToken) {
    const provider = getProvider();
    governanceToken = new GovernanceToken(GOVERNANCE_TOKEN_ADDRESS, provider);
  }
  return governanceToken;
};

export const getGTStaking = async (): Promise<GTStaking> => {
  if (!stakingInstance) {
    const provider = getProvider();
    stakingInstance = new GTStaking(GT_STAKING_ADDRESS, provider);
  }
  return stakingInstance;
};

export const fetchUserGTs = async (user: string): Promise<bigint[]> => {
  const gt = await getGovernanceToken();
  return gt.getUserGTs(user);
};

export const stake = async ({ id, amount }: StakeParams) => {
  const staking = await getGTStaking();
  const signer = await getSigner();
  return staking.connect(signer).stake(BigInt(id), amount);
};

export const unstake = async (tokenId: number) => {
  const staking = await getGTStaking();
  const signer = await getSigner();
  return staking
    .connect(signer)
    .unstake(await signer.getAddress(), BigInt(tokenId));
};

const service: GTService = {
  getGovernanceToken,
  getGTStaking,
  fetchUserGTs,
  stake,
  unstake,
};

export default service;
