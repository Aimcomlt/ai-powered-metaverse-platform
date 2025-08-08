import { renderHook, waitFor } from '@testing-library/react';
import useFactionMetadata from '../useFactionMetadata';

const mockResolve = jest.fn();

jest.mock('../useMpns', () => ({
  __esModule: true,
  default: () => ({ resolve: mockResolve }),
}));

describe('useFactionMetadata', () => {
  beforeEach(() => {
    mockResolve.mockReset();
    (global as any).fetch = jest.fn();
  });

  it('fetches and returns faction metadata', async () => {
    const metadata = { title: 'AI Architect', description: 'Building futures' };
    mockResolve.mockResolvedValue({ type: 'ipfs', value: 'ipfs://cid/metadata.json' });
    (global as any).fetch.mockResolvedValue({
      json: () => Promise.resolve(metadata),
    });

    const { result } = renderHook(() => useFactionMetadata('ai-architect'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(metadata);
    expect(result.current.error).toBeNull();
  });

  it('returns null for non-ipfs result', async () => {
    mockResolve.mockResolvedValue({ type: 'empty' });
    const { result } = renderHook(() => useFactionMetadata('unknown'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
  });
});
