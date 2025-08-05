import { GTStaking } from '../contracts';
import { getProvider } from './provider';
import type { TaskMetrics } from '../contracts/types';

export interface TaskService {
  getGTStaking(): Promise<GTStaking>;
  getTaskMetrics(taskId: number): Promise<TaskMetrics>;
}

let stakingInstance: GTStaking | undefined;
const metricsCache = new Map<number, TaskMetrics>();

const GT_STAKING_ADDRESS =
  process.env.REACT_APP_GT_STAKING_ADDRESS ||
  process.env.GT_STAKING_ADDRESS ||
  '0x0000000000000000000000000000000000000000';

export const getGTStaking = async (): Promise<GTStaking> => {
  if (!stakingInstance) {
    const provider = getProvider();
    stakingInstance = new GTStaking(GT_STAKING_ADDRESS, provider);
  }
  return stakingInstance;
};

export const getTaskMetrics = async (taskId: number): Promise<TaskMetrics> => {
  const cached = metricsCache.get(taskId);
  if (cached) return cached;
  const staking = await getGTStaking();
  const metrics = await staking.taskMetrics(BigInt(taskId));
  metricsCache.set(taskId, metrics);
  return metrics;
};

const service: TaskService = {
  getGTStaking,
  getTaskMetrics,
};

export default service;
