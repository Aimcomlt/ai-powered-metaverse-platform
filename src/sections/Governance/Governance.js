import React, { useState } from 'react';
import aiService from '../../services/aiService';
import './Governance.css';

const Governance = () => {
  const [policyText, setPolicyText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handlePolicyChange = (e) => {
    setPolicyText(e.target.value);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setAnalyzing(true);

    try {
      const response = await aiService.analyzePolicy(policyText);
      setAnalysis(response.choices[0].message.content);
      setAnalyzing(false);
    } catch (error) {
      console.error('Error analyzing policy document:', error);
      setAnalyzing(false);
    }
  };

  return (
    <div className="governance">
      <h2>Draft and Analyze Policy</h2>
      <form onSubmit={handleAnalyze}>
        <div>
          <label>Policy Document</label>
          <textarea
            value={policyText}
            onChange={handlePolicyChange}
            required
          />
        </div>
        <button type="submit" disabled={analyzing}>
          {analyzing ? 'Analyzing...' : 'Analyze Policy'}
        </button>
      </form>
      {analysis && (
        <div className="analysis-result">
          <h3>Analysis and Recommendations</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default Governance;
