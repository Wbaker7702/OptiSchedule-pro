import React, { useState } from 'react';
import Header from '../components/Header';
import { DEPARTMENT_METRICS, OPERATIONAL_AUDITS } from '../constants';
import { RefreshCcw, Users, DollarSign, TrendingUp, Clock, ShieldAlert, CheckCircle, Info, Terminal, Search, AlertCircle, Play } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

const salesData = [
  { name: 'Front End', sales: 42350 },
  { name: 'Electronics', sales: 28920 },
  { name: 'Grocery', sales: 31680 },
  { name: 'Apparel', sales: 15240 },
  { name: 'Home Goods', sales: 5890 },
  { name: 'Pharmacy', sales: 1350 },
];

const Operations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'audit'>('metrics');

  const chartData = salesData.map(item => {
    const metric = DEPARTMENT_METRICS.find(d => d.name === item.name);
    return {
      ...item,
      activeStaff: metric ? metric.activeStaff : 'N/A',
      waitTime: metric ? metric.waitTime : 'N/A'
    };
  });

  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const averageSales = totalSales / salesData.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg outline-none min-w-[150px]">
          <p className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1">{label}</p>
          <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-4">
                  <span className="text-sm text-gray-500">Sales</span>
                  <span className="text-sm font-bold text-blue-600">${data.sales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                  <span className="text-xs text-gray-500">Active Staff</span>
                  <span className="text-xs font-medium text-gray-700">{data.activeStaff}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                  <span className="text-xs text-gray-500">Avg Wait</span>
                  <span className="text-xs font-medium text-gray-700">{data.waitTime}</span>
              </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Operations Hub" subtitle="Enterprise Edition 3.0.0 • Real-time Monitoring & Audit" />

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Sub Navigation */}
        <div className="flex items-center gap-4 border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('metrics')}
             className={`px-4 py-3 text-sm font-bold transition-all relative ${activeTab === 'metrics' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             Department Performance
             {activeTab === 'metrics' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveTab('audit')}
             className={`px-4 py-3 text-sm font-bold transition-all relative flex items-center gap-2 ${activeTab === 'audit' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             <Terminal className="w-4 h-4" />
             Operational Linter
             <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
             {activeTab === 'audit' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
           </button>
        </div>

        {activeTab === 'metrics' ? (
          <>
            <div className="flex justify-between items-center">
               <h2 className="text-lg font-semibold text-gray-800">Department Metrics</h2>
               <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                 <RefreshCcw className="w-3 h-3" /> Refresh Data
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEPARTMENT_METRICS.map((dept, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group">
                   <div className="p-5">
                       <div className="flex justify-between items-center mb-5">
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                                 index % 3 === 0 ? 'bg-blue-50 text-blue-600' : 
                                 index % 3 === 1 ? 'bg-purple-50 text-purple-600' : 
                                 'bg-emerald-50 text-emerald-600'
                             }`}>
                                 {dept.name.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                 <h3 className="font-bold text-gray-900">{dept.name}</h3>
                                 <p className="text-xs text-gray-500">Floor Section {index + 1}</p>
                             </div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-1.5 mb-2 text-gray-500">
                                <Users className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Staff</span>
                            </div>
                            <p className="font-bold text-gray-900 text-lg">{dept.activeStaff}</p>
                          </div>
                           <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-1.5 mb-2 text-gray-500">
                                <DollarSign className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Sales</span>
                            </div>
                            <p className="font-bold text-gray-900 text-lg">{dept.sales}</p>
                          </div>
                       </div>
                   </div>
                   
                   <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-200">
                      <div className="flex flex-col items-center justify-center px-2">
                         <span className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-1 flex items-center gap-1">
                           <TrendingUp className="w-3 h-3 text-blue-500" />
                           {dept.extraMetricLabel}
                         </span>
                         <span className="text-sm font-bold text-gray-700">{dept.extraMetricValue}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center px-2">
                         <span className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-1 flex items-center gap-1">
                           <Clock className="w-3 h-3 text-orange-500" />
                           Wait Time
                         </span>
                         <span className="text-sm font-bold text-gray-700">{dept.waitTime}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-900">Sales by Department</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-3 h-3 border border-gray-300 bg-gray-200"></div>
                      <span>Below Avg</span>
                      <div className="w-3 h-3 bg-blue-500"></div>
                      <span>Above Avg</span>
                    </div>
                  </div>
                  <div className="h-72">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#64748b'}} />
                          <Tooltip 
                            cursor={{fill: 'transparent'}} 
                            content={<CustomTooltip />}
                          />
                          <ReferenceLine x={averageSales} stroke="#ef4444" strokeDasharray="3 3">
                            <Label value={`Avg: $${Math.round(averageSales / 1000)}k`} position="top" fill="#ef4444" fontSize={10} />
                          </ReferenceLine>
                          <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={20}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.sales > averageSales ? '#3b82f6' : '#cbd5e1'}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Live Product Velocity</h3>
                  <div className="space-y-4">
                     {[
                       {name: 'iPhone 15 Pro', cat: 'Electronics', price: '$12,450', color: 'bg-blue-100 text-blue-600'},
                       {name: 'Organic Milk', cat: 'Grocery', price: '$8,920', color: 'bg-green-100 text-green-600'},
                       {name: 'Nike Air Max', cat: 'Apparel', price: '$6,780', color: 'bg-orange-100 text-orange-600'},
                       {name: 'Coffee Maker', cat: 'Home Goods', price: '$4,560', color: 'bg-purple-100 text-purple-600'},
                       {name: 'Vitamins Pack', cat: 'Pharmacy', price: '$3,240', color: 'bg-teal-100 text-teal-600'},
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                          <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center font-bold text-xs`}>
                               {i + 1}
                             </div>
                             <div>
                               <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</p>
                               <p className="text-xs text-gray-500">{item.cat}</p>
                             </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{item.price}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in duration-500">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-blue-600 rounded-lg">
                      <Terminal className="w-5 h-5 text-white" />
                   </div>
                   <div>
                      <h3 className="text-white font-bold">Operational Linter v3.0</h3>
                      <p className="text-slate-400 text-xs mt-0.5 font-mono">Auditing Store 5065 Live Performance...</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="bg-slate-800 rounded-lg p-1.5 flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-red-400 border-r border-slate-700">
                         <AlertCircle className="w-3 h-3" /> 2 ERRORS
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-orange-400 border-r border-slate-700">
                         <Info className="w-3 h-3" /> 1 WARN
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-blue-400">
                         <CheckCircle className="w-3 h-3" /> 1 OK
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="p-0">
                <table className="w-full text-left font-mono">
                   <thead className="bg-slate-800/30 text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800">
                      <tr>
                         <th className="px-6 py-3">Severity</th>
                         <th className="px-6 py-3">Audit Code</th>
                         <th className="px-6 py-3">Diagnostic Message</th>
                         <th className="px-6 py-3">Source Entity</th>
                         <th className="px-6 py-3 text-right">Quick Fix</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50">
                      {OPERATIONAL_AUDITS.map((audit) => (
                        <tr key={audit.id} className="hover:bg-slate-800/20 group transition-colors">
                           <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                 audit.severity === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                 audit.severity === 'warning' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              }`}>
                                 {audit.severity}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-slate-300 text-xs">{audit.code}</td>
                           <td className="px-6 py-4 text-white text-xs font-medium">{audit.message}</td>
                           <td className="px-6 py-4 text-slate-500 text-xs italic">{audit.file}</td>
                           <td className="px-6 py-4 text-right">
                              {audit.fix !== 'No action' ? (
                                 <button className="text-blue-400 hover:text-white flex items-center gap-1.5 text-[10px] font-bold ml-auto bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 hover:bg-blue-500/30 transition-all uppercase">
                                    <Play className="w-3 h-3" /> {audit.fix}
                                 </button>
                              ) : (
                                 <span className="text-slate-600 text-[10px]">VERIFIED</span>
                              )}
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
                <p className="text-[10px] text-slate-500">Scan Complete: Dec 13, 2025 • 0.04s Execution Time</p>
                <div className="flex gap-2">
                   <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors border border-slate-600">Export Audit CSV</button>
                   <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors font-bold shadow-lg shadow-blue-500/20">Run Full System Sync</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Operations;