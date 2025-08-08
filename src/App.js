import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { ToastProvider } from './components/ToastProvider';

const Home = lazy(() => import('./pages/Home'));
const QuantumQuorist = lazy(() => import('./pages/QuantumQuorist'));
const QuantumCourse = lazy(() => import('./pages/QuantumCourse'));
const BlockchainBattalion = lazy(() => import('./pages/BlockchainBattalion'));
const BlockchainCourse = lazy(() => import('./pages/BlockchainCourse'));
const AIArchitect = lazy(() => import('./pages/AIArchitect'));
const AICourse = lazy(() => import('./pages/AICourse'));
const IoTInnovator = lazy(() => import('./pages/IoTInnovator'));
const IoTCourse = lazy(() => import('./pages/IoTCourse'));
const GenesisFaction = lazy(() => import('./pages/GenesisFaction'));
const HouseOfCodeTasks = lazy(() => import('./pages/HouseOfCode/tasks'));
const TaskManager = lazy(() => import('./sections/TaskManager'));
const DocumentSubmission = lazy(() => import('./sections/DocumentSubmission'));
const Feedback = lazy(() => import('./sections/Feedback'));
const Governance = lazy(() => import('./sections/Governance'));
const ProjectManagement = lazy(() => import('./sections/ProjectManagement'));
const TaskBuilder = lazy(() => import('./sections/TaskBuilder'));
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <div className="app">
            <Header />
            <Suspense fallback={<Loader />}>
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
                <Route path="/genesis-faction" element={<GenesisFaction />} />
                <Route path="/house-of-code/tasks" element={<HouseOfCodeTasks />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/submit" element={<DocumentSubmission />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/task-builder" element={<TaskBuilder />} />
                <Route path="/projects" element={<ProjectManagement />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;


