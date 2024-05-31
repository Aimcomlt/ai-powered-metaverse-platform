import CryptoJS from 'crypto-js';
import blockchainService from './blockchainService';

// Function to create SHA-256 hash
export const createHash = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

// Function to create a new block and link it to the previous block
export const createBlock = async (previousBlockHash, metadata) => {
  try {
    // Combine previous block hash with new metadata
    const combinedData = JSON.stringify({ previousBlockHash, ...metadata });
    
    // Create SHA-256 hash of the combined data
    const newBlockHash = createHash(combinedData);

    // Upload metadata to IPFS
    const metadataHash = await blockchainService.uploadMetadataToIPFS(metadata);

    // Store new block hash and metadata hash on the blockchain
    const account = await web3.eth.getAccounts()[0]; // Get the first account
    await blockchainService.createToken(account, newBlockHash, 1, metadataHash);

    return newBlockHash;
  } catch (error) {
    console.error('Error creating block:', error);
    throw error;
  }
};

// Function to retrieve block metadata from IPFS using the hash
export const getBlockMetadata = async (hash) => {
  try {
    const metadata = await blockchainService.getMetadataFromIPFS(hash);
    return metadata;
  } catch (error) {
    console.error('Error retrieving block metadata:', error);
    throw error;
  }
};

export default {
  createHash,
  createBlock,
  getBlockMetadata
};
