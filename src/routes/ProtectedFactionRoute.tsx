import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useGtValidation from '../hooks/useGtValidation';

interface ProtectedFactionRouteProps {
  requiredLevel: number;
  minGtBalance?: number | bigint;
  redirectPath?: string;
  children: React.ReactElement;
}

const ProtectedFactionRoute: React.FC<ProtectedFactionRouteProps> = ({
  requiredLevel,
  minGtBalance = 1,
  redirectPath = '/',
  children,
}) => {
  const { level, balance } = useSelector((state: any) => state.gt || {});
  const hasChainBalance = useGtValidation(minGtBalance);

  const meetsLevel = typeof level === 'number' && level >= requiredLevel;
  const meetsBalance = typeof balance === 'number' && balance >= Number(minGtBalance);

  if (!meetsLevel || !meetsBalance || !hasChainBalance) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedFactionRoute;
