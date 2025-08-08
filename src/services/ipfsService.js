import axios from 'axios';

const IPFS_API_URL = 'https://ipfs.example.com/upload';

export const uploadDocument = async (fileData) => {
  try {
    const response = await axios.post(IPFS_API_URL, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.hash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const uploadAgentMd = async (fileOrString) => {
  try {
    const formData = new FormData();
    if (fileOrString instanceof Blob || fileOrString instanceof File) {
      formData.append('file', fileOrString, 'AGENTS.md');
    } else if (typeof fileOrString === 'string') {
      const blob = new Blob([fileOrString], { type: 'text/markdown' });
      formData.append('file', blob, 'AGENTS.md');
    } else {
      throw new Error('fileOrString must be a File, Blob, or string');
    }
    const response = await axios.post(IPFS_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.hash;
  } catch (error) {
    console.error('Error uploading AGENTS.md to IPFS:', error);
    throw error;
  }
};

export const fetchFromIPFS = async (hash) => {
  try {
    const url = `https://ipfs.io/ipfs/${hash}`;
    const response = await axios.get(url, { responseType: 'text' });
    return response.data;
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
};

export default {
  uploadDocument,
  uploadAgentMd,
  fetchFromIPFS,
};
