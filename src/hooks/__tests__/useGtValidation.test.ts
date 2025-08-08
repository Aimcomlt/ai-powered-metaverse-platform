import { renderHook, waitFor } from '@testing-library/react';
import useGtValidation from '../useGtValidation';

const mockUseSelector = jest.fn();
const mockResult = { type: 'contract', value: '0xToken' };

jest.mock('react-redux', () => ({
  useSelector: (fn: any) => mockUseSelector(fn),
}));

jest.mock('../useMpns', () => ({
  __esModule: true,
  default: () => ({ result: mockResult }),
}));

const bigNumber = (v: any) => ({ value: BigInt(v), gte: (o: any) => BigInt(v) >= BigInt(o.value) });

jest.mock('ethers', () => {
  const mockBalanceOf = jest.fn();
  class MockContract {
    balanceOf = mockBalanceOf;
  }
  return {
    __esModule: true,
    ethers: {
      Contract: MockContract,
      BigNumber: { from: bigNumber },
    },
    mockBalanceOf,
  };
});

jest.mock('../../services/provider', () => ({ getProvider: jest.fn() }));

const { mockBalanceOf } = require('ethers');

describe('useGtValidation', () => {
  beforeEach(() => {
    mockBalanceOf.mockReset();
    mockUseSelector.mockReset();
  });

  it('returns true when balance meets requirement', async () => {
    mockBalanceOf.mockResolvedValue(bigNumber(10));
    mockUseSelector.mockImplementation((selector: any) => selector({ wallet: { address: '0x1' } }));
    const { result } = renderHook(() => useGtValidation(5));
    await waitFor(() => expect(result.current).toBe(true));
  });

  it('returns false without wallet address', async () => {
    mockBalanceOf.mockResolvedValue(bigNumber(0));
    mockUseSelector.mockImplementation((selector: any) => selector({ wallet: { address: null } }));
    const { result } = renderHook(() => useGtValidation(5));
    await waitFor(() => expect(result.current).toBe(false));
  });
});
