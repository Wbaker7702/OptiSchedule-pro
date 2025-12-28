import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Scheduling from './pages/Scheduling';
import Operations from './pages/Operations';
import Inventory from './pages/Inventory';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import Playbook from './pages/Playbook';
import Login from './components/Login';
import { View } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(View.DASHBOARD);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.SCHEDULING:
        return <Scheduling />;
      case View.OPERATIONS:
        return <Operations />;
      case View.INVENTORY:
        return <Inventory />;
      case View.ANALYTICS:
        return <Analytics />;
      case View.TEAM:
        return <Team />;
      case View.PLAYBOOK:
        return <Playbook />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogout={handleLogout}
      />
      <main className="flex-1 ml-64 flex flex-col h-screen">
        {renderView()}
      </main>
    </div>
  );
};

export default App;