import React, { useState } from 'react';
import aiService from '../../services/aiService';
import './Feedback.css';

const Feedback = () => {
  const [taskFeedback, setTaskFeedback] = useState('');
  const [documentFeedback, setDocumentFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const feedback = {
        taskFeedback,
        documentFeedback,
      };

      await aiService.learnFromFeedback(feedback);
      setFeedbackSubmitted(true);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback">
      <h2>Provide Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Feedback</label>
          <textarea
            value={taskFeedback}
            onChange={(e) => setTaskFeedback(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Document Feedback</label>
          <textarea
            value={documentFeedback}
            onChange={(e) => setDocumentFeedback(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {feedbackSubmitted && (
        <div className="feedback-success">
          <p>Feedback submitted successfully. Thank you!</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
