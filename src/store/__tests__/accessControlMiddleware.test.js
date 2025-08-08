import accessControlMiddleware from '../accessControlMiddleware';
import { resolveMpnsName } from '../../hooks/useMpns';
import { getProvider } from '../../services/provider';
import { ethers, BigNumber } from 'ethers';

jest.mock('../../hooks/useMpns', () => ({
  resolveMpnsName: jest.fn(),
}));

jest.mock('../../services/provider', () => ({
  getProvider: jest.fn(),
}));

jest.mock('ethers', () => {
  const actual = jest.requireActual('ethers');
  return {
    ethers: { ...actual.ethers, Contract: jest.fn() },
    BigNumber: actual.BigNumber,
  };
});

describe('accessControlMiddleware', () => {
  const address = '0xabc';
  const action = { type: 'navigation/attempt' };
  let store;
  let next;

  beforeEach(() => {
    store = { getState: () => ({ wallet: { address } }), dispatch: jest.fn() };
    next = jest.fn();
    getProvider.mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('allows action when balance and role are valid', async () => {
    resolveMpnsName
      .mockResolvedValueOnce({ type: 'contract', value: '0x1' })
      .mockResolvedValueOnce({ type: 'contract', value: '0x2' });

    ethers.Contract
      .mockImplementationOnce(() => ({ balanceOf: jest.fn().mockResolvedValue(BigNumber.from(1)) }))
      .mockImplementationOnce(() => ({ hasRole: jest.fn().mockResolvedValue(true) }));

    await accessControlMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('blocks action and logs error when requirements fail', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    resolveMpnsName
      .mockResolvedValueOnce({ type: 'contract', value: '0x1' })
      .mockResolvedValueOnce({ type: 'contract', value: '0x2' });

    ethers.Contract
      .mockImplementationOnce(() => ({ balanceOf: jest.fn().mockResolvedValue(BigNumber.from(0)) }))
      .mockImplementationOnce(() => ({ hasRole: jest.fn().mockResolvedValue(false) }));

    await accessControlMiddleware(store)(next)(action);
    expect(next).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
