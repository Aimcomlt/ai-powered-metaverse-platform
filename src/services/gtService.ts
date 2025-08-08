import { GovernanceToken, GTStaking } from '../contracts';
import { getProvider, getSigner } from './provider';
import { resolveMpnsName } from './mpns';

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

export const getGovernanceToken = async (): Promise<GovernanceToken> => {
  if (!governanceToken) {
    const provider = getProvider();
    const res = await resolveMpnsName('governance-token.mpns', provider);
    const address = res.value || '0x0000000000000000000000000000000000000000';
    governanceToken = new GovernanceToken(address, provider);
  }
  return governanceToken;
};

export const getGTStaking = async (): Promise<GTStaking> => {
  if (!stakingInstance) {
    const provider = getProvider();
    const res = await resolveMpnsName('gt-staking.mpns', provider);
    const address = res.value || '0x0000000000000000000000000000000000000000';
    stakingInstance = new GTStaking(address, provider);
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
