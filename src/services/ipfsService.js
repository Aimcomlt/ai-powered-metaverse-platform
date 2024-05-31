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

export default {
  uploadDocument,
};
