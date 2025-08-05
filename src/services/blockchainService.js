import { ethers } from 'ethers';
import loadContract from '../contracts/loadContract';
import { getSigner } from './provider';

const MINTER_ROLE = ethers.utils.id('MINTER_ROLE');

const getContract = async (account) => {
  const signer = await getSigner(account);
  return loadContract('GovernanceToken', signer);
};

// Function to upload metadata to IPFS
export const uploadMetadataToIPFS = async (metadata) => {
  try {
    const response = await fetch('https://ipfs.example.com/upload', {
      method: 'POST',
      body: JSON.stringify(metadata),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw error;
  }
};

// Mint a new governance token with role check
export const mintGovernanceToken = async (
  account,
  factionId,
  level,
  taskId,
  proofURI
) => {
  try {
    const contract = await getContract(account);
    const hasRole = await contract.hasRole(MINTER_ROLE, account);
    if (!hasRole) {
      throw new Error('Caller lacks MINTER_ROLE');
    }
    const tx = await contract.mintGT(
      account,
      factionId,
      level,
      taskId,
      proofURI
    );
    return tx.wait();
  } catch (error) {
    console.error('Error minting governance token:', error);
    throw error;
  }
};

// Function to get token metadata from IPFS
export const getMetadataFromIPFS = async (hash) => {
  try {
    const response = await fetch(`https://ipfs.example.com/ipfs/${hash}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving metadata from IPFS:', error);
    throw error;
  }
};

// Function to interact with AI agent
export const interactWithAIAgent = async (message) => {
  try {
    const response = await fetch('https://api.example.com/ai/agent', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error interacting with AI agent:', error);
    throw error;
  }
};

export default {
  uploadMetadataToIPFS,
  mintGovernanceToken,
  getMetadataFromIPFS,
  interactWithAIAgent
};
