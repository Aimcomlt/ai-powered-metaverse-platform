import React from 'react';
import { Spinner, SpinnerProps } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  size: SpinnerProps['size'];
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, text }) => (
  <div className="flex flex-col items-center justify-center py-4">
    <Spinner size={size} />
    {text && <p className="mt-2 text-gray-600">{text}</p>}
  </div>
);

export default LoadingSpinner;
