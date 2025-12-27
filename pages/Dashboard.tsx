import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Users, ShieldAlert, ArrowRight, ShieldCheck, ThumbsUp, BarChart as BarChartIcon } from 'lucide-react';
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

const resourceAllocationData = [
  { name: 'Stationary (Passive)', value: 35, color: '#ef4444' }, // Red for inefficient
  { name: 'Zone Defense (Active)', value: 65, color: '#22c55e' }, // Green for revenue generating
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Home Dashboard" subtitle={`Welcome back, Wesley • ${DATE_STRING}`} />
      
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Fiscal Foundation Alert Banner */}
        <div className="bg-slate-900 rounded-xl p-6 flex flex-col xl:flex-row items-center justify-between shadow-lg border border-slate-700 gap-6">
           <div className="flex items-center gap-5 w-full xl:w-auto">
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30 shrink-0">
                 <ShieldAlert className="w-8 h-8 text-red-400" />
              </div>
              <div>
                 <h2 className="text-white font-bold text-lg">Fiscal Health Monitor</h2>
                 <p className="text-slate-400 text-sm">Execution Leakage: <span className="text-red-400 font-mono font-bold">$90,000/week</span> (Market Wide)</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full xl:w-auto border-t xl:border-t-0 xl:border-l border-slate-700 pt-6 xl:pt-0 xl:pl-8">
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Labor Surplus</p>
                  <p className="text-2xl font-bold text-green-400">15%</p>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Hrs Recaptured</p>
                  <p className="text-2xl font-bold text-white">142</p>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Peak Coverage</p>
                  <div className="flex items-center justify-center xl:justify-start gap-1">
                     <p className="text-2xl font-bold text-blue-400">100%</p>
                     <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
               </div>
               <div className="text-center xl:text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Service Quality</p>
                  <div className="flex items-center justify-center xl:justify-start gap-1">
                     <span className="text-sm font-bold text-white bg-green-600/30 px-2 py-1 rounded border border-green-500/30">Maintained</span>
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
            trend="+10.3x ROI" 
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
                      