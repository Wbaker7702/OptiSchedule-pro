import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, Filter, Shield, AlertTriangle, User, Download } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  date: string;
  details: string;
  status: 'Success' | 'Failed' | 'Warning';
  ip: string;
}

const Audit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs: AuditLog[] = [
    { id: 'LOG-001', action: 'User Login', user: 'Sarah Connor', role: 'Store Manager', date: '2024-03-20 08:00:12', details: 'Successful login attempt', status: 'Success', ip: '192.168.1.10' },
    { id: 'LOG-002', action: 'Schedule Update', user: 'Mike Ross', role: 'Supervisor', date: '2024-03-20 08:15:33', details: 'Modified shift for J. Doe', status: 'Success', ip: '192.168.1.12' },
    { id: 'LOG-003', action: 'Inventory Adjust', user: 'Sarah Connor', role: 'Store Manager', date: '2024-03-20 09:30:00', details: 'Manual adjustment: -5 units SKU-123', status: 'Warning', ip: '192.168.1.10' },
    { id: 'LOG-004', action: 'Failed Login', user: 'Unknown', role: 'N/A', date: '2024-03-20 10:05:00', details: 'Invalid password attempt', status: 'Failed', ip: '203.0.113.42' },
    { id: 'LOG-005', action: 'Report Export', user: 'Mike Ross', role: 'Supervisor', date: '2024-03-20 11:20:15', details: 'Exported Monthly Sales Report', status: 'Success', ip: '192.168.1.12' },
    { id: 'LOG-006', action: 'System Backup', user: 'System', role: 'Automated', date: '2024-03-20 12:00:00', details: 'Daily database backup', status: 'Success', ip: 'Localhost' },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Security Audit Log" subtitle="Monitor system access and critical actions" />
      
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
             <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800">System Activity</h2>
             </div>
             
             <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                   <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                   <input 
                      type="text" 
                      placeholder="Search logs..." 
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                   <Filter className="w-4 h-4" />
                   Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                   <Download className="w-4 h-4" />
                   Export
                </button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.filter(log => 
                    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    log.details.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-600 font-mono">{log.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.user}</p>
                          <p className="text-xs text-gray-500">{log.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-900 font-medium">{log.action}</td>
                    <td className="p-4 text-sm text-gray-600">{log.details}</td>
                    <td className="p-4 text-xs font-mono text-gray-500">{log.ip}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.status === 'Success' ? 'bg-green-100 text-green-800' :
                        log.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.status === 'Success' && <Shield className="w-3 h-3 mr-1" />}
                        {log.status === 'Failed' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
             <p>Showing {logs.length} entries</p>
             <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;
