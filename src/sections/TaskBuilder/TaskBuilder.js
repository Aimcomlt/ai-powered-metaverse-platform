import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stakeGT } from '../../store/gtSlice';
import './TaskBuilder.css';

const TaskBuilder = () => {
  const staked = useSelector((state) => state.gt.staked[0] || 0);
  const dispatch = useDispatch();

  const handleStake = () => {
    dispatch(stakeGT({ id: 0, amount: 1 }));
  };

    if (staked > 0) {
      return (
        <main id="main-content" tabIndex={-1} className="task-builder">
          <h1>Task Builder</h1>
          <p>Builder unlocked. This is a placeholder for the AI-powered UI.</p>
        </main>
      );
    }

    return (
      <main id="main-content" tabIndex={-1} className="task-builder">
        <h1>Stake GT to Build a Task</h1>
        <button type="button" onClick={handleStake}>Stake 1 GT</button>
      </main>
    );
};

export default TaskBuilder;
