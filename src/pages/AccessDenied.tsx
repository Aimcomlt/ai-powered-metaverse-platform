import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
    <p className="mb-4">You do not meet the requirements to access this area.</p>
    <Link to="/" className="text-blue-500 underline">
      Return Home
    </Link>
  </div>
);

export default AccessDenied;
