import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { ToastProvider } from './components/ToastProvider';
import FactionLayout from './components/factions/FactionLayout';
import ProtectedFactionRoute from './routes/ProtectedFactionRoute';

const Home = lazy(() => import('./pages/Home'));
const QuantumQuorist = lazy(() => import('./pages/QuantumQuorist'));
const QuantumCourse = lazy(() => import('./pages/QuantumCourse'));
const BlockchainBattalion = lazy(() => import('./pages/BlockchainBattalion'));
const BlockchainCourse = lazy(() => import('./pages/BlockchainCourse'));
const AIArchitect = lazy(() => import('./pages/AIArchitect'));
const AIArchitectTasks = lazy(() => import('./pages/AIArchitect/tasks'));
const AIArchitectProposals = lazy(() => import('./pages/AIArchitect/proposals'));
const AIArchitectContributions = lazy(() => import('./pages/AIArchitect/contributions'));
const AIArchitectGovernance = lazy(() => import('./pages/AIArchitect/governance'));
const AICourse = lazy(() => import('./pages/AICourse'));
const IoTInnovator = lazy(() => import('./pages/IoTInnovator'));
const IoTInnovatorTasks = lazy(() => import('./pages/IoTInnovator/tasks'));
const IoTInnovatorProposals = lazy(() => import('./pages/IoTInnovator/proposals'));
const IoTInnovatorContributions = lazy(() => import('./pages/IoTInnovator/contributions'));
const IoTInnovatorGovernance = lazy(() => import('./pages/IoTInnovator/governance'));
const IoTCourse = lazy(() => import('./pages/IoTCourse'));
const GenesisFaction = lazy(() => import('./pages/GenesisFaction'));
const GenesisFactionTasks = lazy(() => import('./pages/GenesisFaction/tasks'));
const GenesisFactionProposals = lazy(() => import('./pages/GenesisFaction/proposals'));
const GenesisFactionContributions = lazy(() => import('./pages/GenesisFaction/contributions'));
const GenesisFactionGovernance = lazy(() => import('./pages/GenesisFaction/governance'));
const BlockchainBattalionTasks = lazy(() => import('./pages/BlockchainBattalion/tasks'));
const BlockchainBattalionProposals = lazy(() => import('./pages/BlockchainBattalion/proposals'));
const BlockchainBattalionContributions = lazy(() => import('./pages/BlockchainBattalion/contributions'));
const BlockchainBattalionGovernance = lazy(() => import('./pages/BlockchainBattalion/governance'));
const QuantumQuoristTasks = lazy(() => import('./pages/QuantumQuorist/tasks'));
const QuantumQuoristProposals = lazy(() => import('./pages/QuantumQuorist/proposals'));
const QuantumQuoristContributions = lazy(() => import('./pages/QuantumQuorist/contributions'));
const QuantumQuoristGovernance = lazy(() => import('./pages/QuantumQuorist/governance'));
const HouseOfCode = lazy(() => import('./pages/HouseOfCode'));
const HouseOfCodeTasks = lazy(() => import('./pages/HouseOfCode/tasks'));
const HouseOfCodeProposals = lazy(() => import('./pages/HouseOfCode/proposals'));
const HouseOfCodeContributions = lazy(() => import('./pages/HouseOfCode/contributions'));
const HouseOfCodeGovernance = lazy(() => import('./pages/HouseOfCode/governance'));
const AccessDenied = lazy(() => import('./pages/AccessDenied'));
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
                <Route path="/quantum-quorist/tasks" element={<QuantumQuoristTasks />} />
                <Route path="/quantum-quorist/proposals" element={<QuantumQuoristProposals />} />
                <Route path="/quantum-quorist/contributions" element={<QuantumQuoristContributions />} />
                <Route path="/quantum-quorist/governance" element={<QuantumQuoristGovernance />} />
                <Route path="/quantum-quorist/course" element={<QuantumCourse />} />
                <Route path="/blockchain-battalion" element={<BlockchainBattalion />} />
                <Route path="/blockchain-battalion/tasks" element={<BlockchainBattalionTasks />} />
                <Route path="/blockchain-battalion/proposals" element={<BlockchainBattalionProposals />} />
                <Route path="/blockchain-battalion/contributions" element={<BlockchainBattalionContributions />} />
                <Route path="/blockchain-battalion/governance" element={<BlockchainBattalionGovernance />} />
                <Route path="/blockchain-battalion/course" element={<BlockchainCourse />} />
                <Route
                  path="/ai-architect/*"
                  element={
                    <ProtectedFactionRoute requiredLevel={2} redirectPath="/access-denied">
                      <FactionLayout faction="ai-architect" />
                    </ProtectedFactionRoute>
                  }
                >
                  <Route index element={<AIArchitect />} />
                  <Route path="tasks" element={<AIArchitectTasks />} />
                  <Route path="proposals" element={<AIArchitectProposals />} />
                  <Route path="contributions" element={<AIArchitectContributions />} />
                  <Route path="governance" element={<AIArchitectGovernance />} />
                  <Route path="course" element={<AICourse />} />
                </Route>
                <Route path="/iot-innovator" element={<IoTInnovator />} />
                <Route path="/iot-innovator/tasks" element={<IoTInnovatorTasks />} />
                <Route path="/iot-innovator/proposals" element={<IoTInnovatorProposals />} />
                <Route path="/iot-innovator/contributions" element={<IoTInnovatorContributions />} />
                <Route path="/iot-innovator/governance" element={<IoTInnovatorGovernance />} />
                <Route path="/iot-innovator/course" element={<IoTCourse />} />
                <Route path="/genesis-faction" element={<GenesisFaction />} />
                <Route path="/genesis-faction/tasks" element={<GenesisFactionTasks />} />
                <Route path="/genesis-faction/proposals" element={<GenesisFactionProposals />} />
                <Route path="/genesis-faction/contributions" element={<GenesisFactionContributions />} />
                <Route path="/genesis-faction/governance" element={<GenesisFactionGovernance />} />
                <Route path="/house-of-code" element={<HouseOfCode />} />
                <Route path="/house-of-code/tasks" element={<HouseOfCodeTasks />} />
                <Route path="/house-of-code/proposals" element={<HouseOfCodeProposals />} />
                <Route path="/house-of-code/contributions" element={<HouseOfCodeContributions />} />
                <Route path="/house-of-code/governance" element={<HouseOfCodeGovernance />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/submit" element={<DocumentSubmission />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/task-builder" element={<TaskBuilder />} />
                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/access-denied" element={<AccessDenied />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;


