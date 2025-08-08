import { renderHook, act } from '@testing-library/react';
import useFactionDeploy from '../useFactionDeploy';

jest.mock('../../services/ipfsService', () => ({
  __esModule: true,
  default: { uploadAgentMd: jest.fn() },
}));
import ipfsService from '../../services/ipfsService';
const mockUpload = ipfsService.uploadAgentMd as jest.Mock;

const mockCreateFaction = jest.fn();
const mockRegister = jest.fn();

const mockUseContract = jest.fn();
jest.mock('../useContract', () => ({
  __esModule: true,
  default: (name: string) => mockUseContract(name),
}));

describe('useFactionDeploy', () => {
  beforeEach(() => {
    mockUpload.mockReset();
    mockCreateFaction.mockReset();
    mockRegister.mockReset();
    mockUseContract.mockReset();
  });

  it('deploys faction and registers charter', async () => {
    mockUpload.mockResolvedValue('cid123');
    mockCreateFaction.mockResolvedValue({
      wait: () => Promise.resolve({ events: [{ args: { faction: '0xF' } }] }),
    });
    mockRegister.mockResolvedValue(undefined);
    mockUseContract.mockImplementation((name) => async () => {
      if (name === 'GenesisBlockFactory') {
        return { createFaction: mockCreateFaction } as any;
      }
      if (name === 'FactionCharterRegistry') {
        return { registerCharter: mockRegister } as any;
      }
      return {} as any;
    });

    const { result } = renderHook(() => useFactionDeploy('0xAccount'));
    await act(async () => {
      await result.current.deployFaction('AI', 'AGENTS', true);
    });

    expect(mockUpload).toHaveBeenCalledWith('AGENTS');
    expect(mockCreateFaction).toHaveBeenCalledWith('AI');
    expect(mockRegister).toHaveBeenCalledWith('0xF', 'AI', 'cid123', true);
    expect(result.current.factionAddress).toBe('0xF');
    expect(result.current.error).toBeNull();
  });
});
