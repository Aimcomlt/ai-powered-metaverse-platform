import React from 'react';
import { Helmet } from 'react-helmet-async';
import FactionContentList from '../../components/factions/FactionContentList';

const QuantumQuoristTasks: React.FC = () => (
  <>
    <Helmet>
      <title>Quantum Quorist Tasks | Metaverse Platform</title>
      <meta name="description" content="Tasks for the Quantum Quorist faction." />
    </Helmet>
    <FactionContentList mpnsName="quantum-quorist.tasks.mpns" title="Quantum Quorist Tasks" />
  </>
);

export default QuantumQuoristTasks;
