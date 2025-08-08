import React from 'react';

interface AlertMessageProps {
  type?: 'error' | 'info' | 'success' | 'warning';
  message: string;
  onRetry?: () => void;
}

const typeStyles: Record<string, string> = {
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
};

const AlertMessage: React.FC<AlertMessageProps> = ({ type = 'info', message, onRetry }) => (
  <div className={`p-4 mb-4 rounded ${typeStyles[type]} flex items-center justify-between`} role="alert">
    <span>{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="ml-4 px-3 py-1 rounded bg-white text-sm border border-current"
        >
          Retry
        </button>
      )}
  </div>
);

export default AlertMessage;
