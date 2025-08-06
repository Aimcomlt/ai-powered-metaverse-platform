import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import aiService from '../services/aiService';
import { setRecommendations, setStatus } from '../store/aiSlice';

interface RootState {
  ai: {
    recommendations: any[];
    status: string | null;
  };
}

const useAiRecommendations = () => {
  const dispatch = useDispatch();
  const recommendations = useSelector((state: RootState) => state.ai.recommendations);
  const status = useSelector((state: RootState) => state.ai.status);

  useEffect(() => {
    const fetchRecommendations = async () => {
      dispatch(setStatus('loading'));
      try {
        const result = await aiService.recommendProposals({});
        dispatch(setRecommendations(result.proposals || []));
        dispatch(setStatus('ready'));
      } catch (err) {
        console.error('Failed to fetch AI recommendations', err);
        dispatch(setStatus('error'));
      }
    };

    if (status === null) {
      fetchRecommendations();
    }
  }, [dispatch, status]);

  return { recommendations, status };
};

export default useAiRecommendations;
