import React, { useState } from 'react';
import Header from '../components/Header';
import { Book, CheckCircle, Clock, AlertCircle, Award, Search, Filter } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  completionRate: number;
}

const Training: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const modules: TrainingModule[] = [
    { id: 'TM-001', title: 'Workplace Safety Fundamentals', category: 'Safety', duration: '45 min', dueDate: '2024-04-01', status: 'In Progress', priority: 'High', completionRate: 65 },
    { id: 'TM-002', title: 'POS System Advanced Operations', category: 'Technical', duration: '60 min', dueDate: '2024-03-25', status: 'Completed', priority: 'Medium', completionRate: 100 },
    { id: 'TM-003', title: 'Customer Conflict Resolution', category: 'Soft Skills', duration: '30 min', dueDate: '2024-03-15', status: 'Overdue', priority: 'High', completionRate: 0 },
    { id: 'TM-004', title: 'Inventory Handling Procedures', category: 'Operations', duration: '90 min', dueDate: '2024-04-10', status: 'Not Started', priority: 'Medium', completionRate: 0 },
    { id: 'TM-005', title: 'Data Privacy & Security', category: 'Compliance', duration: '20 min', dueDate: '2024-03-30', status: 'Completed', priority: 'High', completionRate: 100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Training & Development" subtitle="Staff Certification and Learning Portal" />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Modules</p>
              <p className="text-xl font-bold text-gray-800">12</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-xl font-bold text-gray-800">84%</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-xl font-bold text-gray-800">3</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Certified Staff</p>
              <p className="text-xl font-bold text-gray-800">45</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800">Assigned Training Modules</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search modules..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Module Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Deadline</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Progress</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {modules.map((module) => (
                  <tr key={module.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{module.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {module.duration}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{module.category}</td>
                    <td className="p-4 text-sm text-gray-600">{module.dueDate}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        module.priority === 'High' ? 'text-red-600 bg-red-50' : 
                        module.priority === 'Medium' ? 'text-orange-600 bg-orange-50' : 
                        'text-blue-600 bg-blue-50'
                      }`}>
                        {module.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${module.completionRate === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                          style={{ width: `${module.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">{module.completionRate}%</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                        {module.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {module.status === 'Completed' ? 'Review' : 'Start'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
