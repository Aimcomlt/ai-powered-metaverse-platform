import { renderHook, waitFor } from '@testing-library/react';
import useMpns from '../useMpns';

describe('useMpns hook', () => {
  it('resolves a local ipfs record', async () => {
    const { result } = renderHook(() => useMpns('ai-architect'));
    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(result.current.result.type).toBe('ipfs');
    expect(result.current.result.value).toContain('ipfs://');
  });

  it('returns empty for unknown name', async () => {
    const { result } = renderHook(() => useMpns('unknown-name'));
    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(result.current.result.type).toBe('empty');
  });
});
