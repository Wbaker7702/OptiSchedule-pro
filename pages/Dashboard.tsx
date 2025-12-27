import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Clock, ShieldAlert, ShieldCheck, ThumbsUp, Scale, TrendingUp } from 'lucide-react';
import { DATE_STRING, FISCAL_METRICS } from '../constants';

const data = [
  { time: '8 AM', value: 40 },
  { time: '10 AM', value: 65 },
  { time: '12 PM', value: 95 },
  { time: '2 PM', value: 80 },
  { time: '4 PM', value: 110 },
  { time: '6 PM', value: 70 },
  { time: '8 PM', value: 45 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Home Dashboard" subtitle={`Welcome back, Wesley • ${DATE_STRING}`} />
      
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* The Fiscal Foundation Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 flex flex-col xl:flex-row items-center justify-between shadow-lg border border-slate-700 gap-6 relative overflow-hidden">
           {/* Background decorative element */}
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Scale className="w-48 h-48 text-white" />
           </div>

           <div className="flex items-center gap-5 w-full xl:w-auto relative z-10">
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30 shrink-0">
                 <ShieldAlert className="w-8 h-8 text-red-400" />
              </div>
              <div>
                 <h2 className="text-white font-bold text-lg">The Fiscal Foundation</h2>
                 <p className="text-slate-400 text-sm">Execution Leakage: <span className="text-red-400 font-mono font-bold">${FISCAL_METRICS.executionLeakage.toLocaleString()}/week</span> (Market Wide)</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full xl:w-auto border-t xl:border-t-0 xl:border-l border-slate-700 pt-6 xl:pt-0 xl:pl-8 relative z-10">
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Labor Surplus</p>
                  <p className="text-2xl font-bold text-green-400">{FISCAL_METRICS.laborSurplusPct}%</p>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Target Recovery</p>
                  <p className="text-2xl font-bold text-white">{FISCAL_METRICS.targetWeeklyHoursRecapture} <span className="text-sm font-normal text-slate-400">hrs</span></p>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">ROI Multiplier</p>
                  <div className="flex items-center justify-center xl:justify-start gap-1">
                     <p className="text-2xl font-bold text-blue-400">{FISCAL_METRICS.currentROI}x</p>
                     <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Annual Impact</p>
                  <div className="flex items-center justify-center xl:justify-start gap-1">
                     <span className="text-lg font-bold text-white">${FISCAL_METRICS.annualRecoveryTarget}M</span>
                  </div>
               </div>
           </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Capital Recovered" 
            value="$24,600" 
            subtitle="YTD (Store 5065 Pilot)"
            trend={`+${FISCAL_METRICS.currentROI}x ROI`} 
            trendDirection="up"
            icon={<div className="text-green-600 font-bold">$</div>}
          />
          <StatCard 
            title="Zone Defense Coverage" 
            value="68%" 
            trend="+12% shift" 
            trendDirection="up"
            subtitle="Moving from Stationary Cashiering"
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <StatCard 
            title="Labor Efficiency" 
            value="18.5%" 
            subtitle="Target: 18% (Variance Protection)"
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard 
            title="Staff Utilization" 
            value="87%" 
            subtitle="Optimal range: 85-90%"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
        </div>

        {/* Resource Reallocation & Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Customer Flow vs. Staffing</h3>
                <p className="text-xs text-gray-500">Identifying low-flow periods for task pivoting</p>
              </div>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full animate-pulse">Live Data</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Resource Reallocation</h3>
            <p className="text-xs text-gray-500 mb-6">Pivot from "Unaccounted/Stationary" to "Revenue Generating"</p>
            
            <div className="space-y-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                        Stationary (Leakage)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-red-600">
                        35%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                    <div style={{ width: "35%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Zone Defense (Active)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        65%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                        <ThumbsUp className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Optimization Goal</p>
                            <p className="text-xs text-gray-600 mt-1">Reduce stationary hours by {FISCAL_METRICS.laborSurplusPct}% to recapture hours.</p>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;