import { GTStaking } from '../contracts';
import { getProvider } from './provider';
import type { TaskMetrics } from '../contracts/types';
import { resolveMpnsName } from '../hooks/useMpns';

export interface TaskService {
  getGTStaking(): Promise<GTStaking>;
  getTaskMetrics(taskId: number): Promise<TaskMetrics>;
}

let stakingInstance: GTStaking | undefined;
const metricsCache = new Map<number, TaskMetrics>();

export const getGTStaking = async (): Promise<GTStaking> => {
  if (!stakingInstance) {
    const provider = getProvider();
    const res = await resolveMpnsName('gt-staking.mpns', provider);
    const address = res.value || '0x0000000000000000000000000000000000000000';
    stakingInstance = new GTStaking(address, provider);
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
