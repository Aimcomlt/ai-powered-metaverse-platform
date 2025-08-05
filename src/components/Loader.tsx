import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
    <CircularProgress />
    {message && (
      <Typography mt={2} data-testid="loader-message">
        {message}
      </Typography>
    )}
  </Box>
);

export default Loader;
