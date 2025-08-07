import React, { useState } from 'react';
import ipfsService from '../../services/ipfsService';
import AgentMdUploader from '../../components/AgentMdUploader';
import './DocumentSubmission.css';

const DocumentSubmission = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedHash, setUploadedHash] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('title', title);
      fileData.append('description', description);

      const hash = await ipfsService.uploadDocument(fileData);
      setUploadedHash(hash);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploading(false);
    }
  };

  return (
    <div className="document-submission">
      <h2>Submit Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
      {uploadedHash && (
        <div>
          <p>Document uploaded successfully. IPFS Hash:</p>
          <p>{uploadedHash}</p>
        </div>
      )}
      <AgentMdUploader />
    </div>
  );
};

export default DocumentSubmission;
