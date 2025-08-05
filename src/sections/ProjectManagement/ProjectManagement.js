import React, { useState, useEffect } from 'react';
import aiService from '../../services/aiService';
import Loader from '../../components/Loader';
import { useToast } from '../../components/ToastProvider';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', resources: '' });
  const [monitoringData, setMonitoringData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        const response = await aiService.getMonitoringData();
        setMonitoringData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monitoring data:', error);
        showToast('Failed to fetch monitoring data', 'error');
        setLoading(false);
      }
    };

    fetchMonitoringData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const response = await aiService.allocateResources(newProject);
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '', resources: '' });
      showToast('Project added successfully', 'success');
    } catch (error) {
      console.error('Error adding project:', error);
      showToast('Error adding project', 'error');
    }
  };

  return (
    <div className="project-management">
      <h2>Project Management</h2>
      <form onSubmit={handleAddProject}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Resources Needed</label>
          <input
            type="text"
            name="resources"
            value={newProject.resources}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
      <div className="projects-list">
        <h3>Current Projects</h3>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <p><strong>Resources:</strong> {project.resources}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="monitoring-data">
        <h3>Project Monitoring</h3>
        {loading ? <Loader /> : (
          <ul>
            {monitoringData.map((data, index) => (
              <li key={index}>
                <p><strong>Project:</strong> {data.projectName}</p>
                <p><strong>Status:</strong> {data.status}</p>
                <p><strong>Resource Utilization:</strong> {data.resourceUtilization}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
