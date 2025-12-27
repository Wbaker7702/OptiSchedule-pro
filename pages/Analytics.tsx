import React from 'react';
import Header from '../components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell } from 'recharts';
import { Download, FileText, TrendingUp, DollarSign, Users, Scale, Target, ArrowUpRight } from 'lucide-react';
import { FISCAL_METRICS } from '../constants';

const laborPivotData = [
  { week: 'W1', leakage: 186, recovered: 0 },
  { week: 'W2', leakage: 160, recovered: 26 },
  { week: 'W3', leakage: 145, recovered: 41 },
  { week: 'W4', leakage: 120, recovered: 66 },
  { week: 'W5', leakage: 80, recovered: 106 },
  { week: 'W6', leakage: 44, recovered: 142 },
];

const scalingData = [
  { year: '2025', value: 4.68 },
  { year: '2026', value: 7.2 },
  { year: '2027', value: 11.5 },
  { year: '2028', value: 16 },
];

const reports = [
  { name: 'Variance Reduction Strategy (CEO/CFO)', date: 'Dec 14, 2025', size: '1.2 MB' },
  { name: 'Resource Reallocation Plan (Store Mgr)', date: 'Dec 10, 2025', size: '845 KB' },
  { name: 'Store 5065 Pilot Proof of Concept', date: 'Dec 01, 2025', size: '2.4 MB' },
];

const Analytics: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Analytics & Reports" subtitle="The Fiscal Foundation: Efficiency vs. Leakage" />

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* The Scaling Formula Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-blue-200 font-medium text-sm uppercase tracking-wider mb-1">Business Logic</p>
               <h3 className="text-2xl font-bold text-white">The ROI Formula</h3>
               <div className="mt-4 flex items-baseline gap-2">
                 <span className="text-4xl font-bold">{FISCAL_METRICS.currentROI}x</span>
                 <span className="text-blue-200 text-sm">Return</span>
               </div>
               <p className="mt-2 text-sm text-blue-100 opacity-90">"For every $1 invested, we protect ${FISCAL_METRICS.currentROI}."</p>
             </div>
             <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
               <Scale className="w-32 h-32" />
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-500">Annual Recovery Target</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">${FISCAL_METRICS.annualRecoveryTarget}M</h3>
               </div>
               <div className="p-2 bg-green-50 rounded-lg">
                 <Target className="w-6 h-6 text-green-600" />
               </div>
             </div>
             <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
               <span className="font-semibold text-gray-900">Goal:</span> "Leakage" Stopped across 12-store market.
             </div>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-500">2028 Vision</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">${FISCAL_METRICS.vision2028}M</h3>
               </div>
               <div className="p-2 bg-purple-50 rounded-lg">
                 <TrendingUp className="w-6 h-6 text-purple-600" />
               </div>
             </div>
             <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
               <ArrowUpRight className="w-4 h-4 mr-1" />
               Cumulative ROI through Scale
             </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Main Chart: The Pivot */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Labor Hour Recapture</h3>
                <p className="text-xs text-gray-500">Pivoting {FISCAL_METRICS.targetWeeklyHoursRecapture} hours from "Leakage" to "Revenue"</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={laborPivotData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="leakage" name="Unaccounted (Leakage)" stackId="1" stroke="#ef4444" fill="#fca5a5" />
                  <Area type="monotone" dataKey="recovered" name="Recaptured (Revenue)" stackId="1" stroke="#22c55e" fill="#86efac" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Chart: The Vision */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Projected Cumulative Impact (2025-2028)</h3>
                <p className="text-xs text-gray-500">Standardized scale across the market</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scalingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}M`} />
                  <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                     formatter={(value) => [`$${value} Million`, 'Cumulative ROI']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={50}>
                     {scalingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#1e40af' : '#3b82f6'} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Unified Takeaway Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Unified Takeaway</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">For the CEO / CFO</h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            "This is a variance reduction strategy that protects the P&L and boosts EBITDA."
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">For the Store Manager</h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            "This is a resource reallocation strategy. It gives you back the hours you need to keep your store 'Grand Opening Ready' <span className="font-semibold text-slate-800">without asking for more budget.</span>"
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Downloadable Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Strategic Documentation</h3>
           </div>
           <div className="divide-y divide-gray-100">
              {reports.map((report, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                      </div>
                   </div>
                   <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                     <Download className="w-4 h-4" /> Download
                   </button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;