import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AccessDenied: React.FC = () => (
  <>
    <Helmet>
      <title>Access Denied | Metaverse Platform</title>
      <meta name="description" content="Access denied due to insufficient permissions." />
    </Helmet>
    <main id="main-content" tabIndex={-1} className="p-4">
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="mb-4">You do not meet the requirements to access this area.</p>
      <Link to="/" className="text-blue-500 underline focus:outline">
        Return Home
      </Link>
    </main>
  </>
);

export default AccessDenied;
