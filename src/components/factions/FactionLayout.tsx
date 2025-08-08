import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface FactionLayoutProps {
  faction: string;
}

const FactionLayout: React.FC<FactionLayoutProps> = ({ faction }) => {
  const base = `/${faction}`;
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'font-bold mr-4' : 'mr-4';

  return (
    <div className="p-4">
      <nav className="mb-4">
        <NavLink to={`${base}/tasks`} className={linkClass}>
          Tasks
        </NavLink>
        <NavLink to={`${base}/proposals`} className={linkClass}>
          Proposals
        </NavLink>
        <NavLink to={`${base}/contributions`} className={linkClass}>
          Contributions
        </NavLink>
        <NavLink to={`${base}/governance`} className={linkClass}>
          Governance
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default FactionLayout;

