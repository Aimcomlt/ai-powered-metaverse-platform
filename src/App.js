import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import QuantumQuorist from './pages/QuantumQuorist';
import QuantumCourse from './pages/QuantumCourse';
import BlockchainBattalion from './pages/BlockchainBattalion';
import BlockchainCourse from './pages/BlockchainCourse'; 
import AIArchitect from './pages/AIArchitect';
import AICourse from './pages/AICourse'; 
import IoTInnovator from './pages/IoTInnovator';
import IoTCourse from './pages/IoTCourse';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/quantum-quorist" element={<QuantumQuorist />} />
          <Route path="/quantum-quorist/course" element={<QuantumCourse />} />
          <Route path="/blockchain-battalion" element={<BlockchainBattalion />} />
          <Route path="/blockchain-battalion/course" element={<BlockchainCourse />} /> 
          <Route path="/ai-architect" element={<AIArchitect />} />
          <Route path="/ai-architect/course" element={<AICourse />} />
          <Route path="/iot-innovator" element={<IoTInnovator />} />
          <Route path="/iot-innovator/course" element={<IoTCourse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


