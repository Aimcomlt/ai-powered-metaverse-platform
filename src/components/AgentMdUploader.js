import React, { useState } from 'react';
import ipfsService from '../services/ipfsService';

const AgentMdUploader = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const hash = await ipfsService.uploadAgentMd(file);
      setCid(hash);
    } catch (err) {
      console.error('Failed to upload AGENTS.md:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="agent-md-uploader">
      <h3>Upload AGENTS.md</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".md" onChange={handleFileChange} required />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {cid && (
        <div>
          <p>Uploaded CID:</p>
          <p>{cid}</p>
        </div>
      )}
    </div>
  );
};

export default AgentMdUploader;
