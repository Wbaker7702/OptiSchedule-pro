import React, { useState } from 'react';
import Header from '../components/Header';
import { EMPLOYEES } from '../constants';
import { Mail, MoreHorizontal, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const Team: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(EMPLOYEES.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = EMPLOYEES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Team Management" subtitle="Manage staff profiles, performance, and training" />
      
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
             <h2 className="text-lg font-bold text-gray-900">Staff Directory</h2>
             <p className="text-sm text-gray-500">{EMPLOYEES.length} Active Employees</p>
           </div>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
             + Add Employee
           </button>
        </div>

        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Performance</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50/50 group transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={employee.avatar} alt={employee.name} className="w-9 h-9 rounded-full object-cover bg-gray-200" />
                        <div>
                          <p className="font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{employee.role}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        ${employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${employee.status === 'Training' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-900 font-medium">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {employee.performance}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                         <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
             <span className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, EMPLOYEES.length)} of {EMPLOYEES.length} employees
             </span>
             <div className="flex gap-2">
               <button 
                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                 disabled={currentPage === 1}
                 className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronLeft className="w-4 h-4" /> Previous
               </button>
               <button 
                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                 disabled={currentPage === totalPages}
                 className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 Next <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;