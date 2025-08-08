import { ethers } from 'ethers';
import { getProvider } from '../services/provider';
import { resolveMpnsName } from '../hooks/useMpns';

const checkedTypes = ['navigation/attempt', 'task/start', 'proposal/submit'];

const accessControlMiddleware = (store) => (next) => async (action) => {
  if (checkedTypes.includes(action.type)) {
    const address = store.getState().wallet?.address;
    try {
      const provider = getProvider();
      const [tokenRes, roleRes] = await Promise.all([
        resolveMpnsName('houseOfCode.token.governance.mpns', provider),
        resolveMpnsName('user.role.mpns', provider),
      ]);
      if (tokenRes.type !== 'contract' || roleRes.type !== 'contract') {
        console.error('Required contracts unavailable');
        return;
      }
      const token = new ethers.Contract(
        tokenRes.value,
        ['function balanceOf(address owner) view returns (uint256)'],
        provider,
      );
      const roles = new ethers.Contract(
        roleRes.value,
        ['function hasRole(address account) view returns (bool)'],
        provider,
      );
      const [balance, hasRole] = await Promise.all([
        token.balanceOf(address),
        roles.hasRole(address),
      ]);
      if (balance.gt(0) && hasRole) {
        return next(action);
      }
      console.error('Access requirements not met');
      return;
    } catch (err) {
      console.error('Access check failed', err);
      return;
    }
  }
  return next(action);
};

export default accessControlMiddleware;
