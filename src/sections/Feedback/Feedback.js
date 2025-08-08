import React, { useState } from 'react';
import aiService from '../../services/ai';
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
      <main id="main-content" tabIndex={-1} className="feedback">
        <h1>Provide Feedback</h1>
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
      </main>
    );
};

export default Feedback;
