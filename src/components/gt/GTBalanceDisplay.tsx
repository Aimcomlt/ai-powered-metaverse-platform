import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../../store/gtSlice';
import gtService from '../../services/gtService';

interface GTBalanceDisplayProps {
  userAddress: string;
}

const GTBalanceDisplay: React.FC<GTBalanceDisplayProps> = ({ userAddress }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state: any) => state.gt.balance);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!userAddress) return;
      setLoading(true);
      setError(null);
      try {
        const userGTs = await gtService.fetchUserGTs(userAddress);
        dispatch(setBalance(userGTs.length));
      } catch (err: any) {
        setError(err.message || 'Failed to load balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [userAddress, dispatch]);

  if (loading) {
    return <div className="text-gray-500">Loading balance...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div className="text-lg">GT Balance: {balance}</div>;
};

export default GTBalanceDisplay;

