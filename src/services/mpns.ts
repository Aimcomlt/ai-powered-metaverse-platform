import { ethers } from 'ethers';
import { getProvider } from './provider';
import MpNSRegistryAbi from '../abis/MpNSRegistry.json';
import localRecords from '../data/mpns.json';

export type MpnsResolution = {
  type: 'contract' | 'ipfs' | 'empty';
  value: string;
};

export const resolveMpnsName = async (
  lookup: string,
  provider = getProvider(),
): Promise<MpnsResolution> => {
  const registryAddress =
    process.env.REACT_APP_MPNS_REGISTRY_ADDRESS ||
    process.env.MPNS_REGISTRY_ADDRESS;
  try {
    let uri: string | undefined;
    if (registryAddress) {
      try {
        const registry = new ethers.Contract(
          registryAddress,
          MpNSRegistryAbi,
          provider,
        );
        uri = await registry.nameToUri(lookup);
      } catch {
        uri = undefined;
      }
    }
    if (!uri) {
      uri = (localRecords as Record<string, string>)[lookup];
    }
    if (!uri) {
      return { type: 'empty', value: '' };
    }
    if (/^0x[a-fA-F0-9]{40}$/.test(uri)) {
      return { type: 'contract', value: uri };
    }
    if (uri.startsWith('ipfs://') || uri.includes('/ipfs/')) {
      return { type: 'ipfs', value: uri };
    }
    return { type: 'empty', value: uri };
  } catch {
    return { type: 'empty', value: '' };
  }
};

export const normalizeIpfsUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${url.slice(7)}`;
  }
  if (!url.startsWith('http')) {
    return `https://ipfs.io/ipfs/${url}`;
  }
  return url;
};

export default { resolveMpnsName, normalizeIpfsUrl };
