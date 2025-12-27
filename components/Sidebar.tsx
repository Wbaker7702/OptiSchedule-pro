import React from 'react';
import { LayoutDashboard, CalendarDays, Activity, Package, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onLogout }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Home Dashboard', icon: LayoutDashboard },
    { id: View.SCHEDULING, label: 'Scheduling Center', icon: CalendarDays },
    { id: View.OPERATIONS, label: 'Operations Hub', icon: Activity },
    { id: View.INVENTORY, label: 'Inventory Management', icon: Package },
    { id: View.ANALYTICS, label: 'Analytics & Reports', icon: BarChart3 },
    { id: View.TEAM, label: 'Team Management', icon: Users },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-lg p-1.5">
             <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">OptiSchedule Pro</h1>
            <p className="text-xs text-slate-400">Walmart Store 5065</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white w-full rounded-lg hover:bg-slate-800 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full rounded-lg hover:bg-slate-800 transition-colors mt-1"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;