import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Clock, ShieldAlert, ShieldCheck, Scale, TrendingUp, Zap, Database, Activity, Terminal, Server, Globe } from 'lucide-react';
import { DATE_STRING, FISCAL_METRICS, APP_VERSION, HUBSPOT_ROI_DATA } from '../constants';

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
  const [pulseLogs, setPulseLogs] = useState<{id: number, msg: string, time: string}[]>([]);

  useEffect(() => {
    const messages = [
      "HS_CRM: New Lead 'Grocery' Score: 88",
      "API: Successfully synced 12 shift records",
      "LINT: LEAK_01 fixed in Front End",
      "SYNC: Latency normalized to 42ms",
      "DB: Backup completed (PostgreSQL)",
      "V3: Core Engine operating at 100%"
    ];
    
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        msg: messages[Math.floor(Math.random() * messages.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setPulseLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Executive Dashboard" subtitle={`Enterprise Suite v${APP_VERSION} • ${DATE_STRING}`} />
      
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* The Fiscal Foundation Section v3.0 */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col xl:flex-row items-center justify-between shadow-2xl border border-slate-700 gap-8 relative overflow-hidden group">
           <div className="absolute -top-12 -right-12 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-700">
              <Scale className="w-80 h-80 text-white" />
           </div>

           <div className="flex items-center gap-6 w-full xl:w-auto relative z-10">
              <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 shadow-inner group-hover:bg-red-500/20 transition-all">
                 <ShieldAlert className="w-10 h-10 text-red-400" />
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-white font-black text-2xl tracking-tight uppercase">The Fiscal Foundation</h2>
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">Live Audit</span>
                 </div>
                 <p className="text-slate-400 text-sm max-w-md">Currently stopping <span className="text-red-400 font-bold">${FISCAL_METRICS.executionLeakage.toLocaleString()}</span> in weekly execution leakage using the <span className="text-blue-400 font-mono">3.0.0 Linter Engine</span>.</p>
              </div>
           </div>

           <div className="flex gap-4 w-full xl:w-auto z-10">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[120px]">
                 <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Weekly Leak</p>
                 <p className="text-xl font-bold text-white">${Math.round(FISCAL_METRICS.executionLeakage / 1000)}k</p>
              </div>
              <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20 flex flex-col items-center min-w-[120px]">
                 <p className="text-[10px] text-blue-400 uppercase font-bold mb-1">Current ROI</p>
                 <p className="text-xl font-bold text-blue-400">{FISCAL_METRICS.currentROI}x</p>
              </div>
           </div>
        </div>

        {/* Real-time System Pulse & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Marketing Leads" 
              value={`${HUBSPOT_ROI_DATA.marketingLeads.value}%`} 
              trend="+12%" 
              trendDirection="up" 
              subtitle="HubSpot Ingestion"
              icon={<Zap className="w-5 h-5 text-orange-500" />}
            />
            <StatCard 
              title="Labor Recapture" 
              value={`${FISCAL_METRICS.targetWeeklyHoursRecapture}h`} 
              trend="+5h" 
              trendDirection="up" 
              subtitle="Weekly Savings"
              icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            />
            <StatCard 
              title="System Health" 
              value="99.9%" 
              subtitle="Ruby API Latency: 22ms"
              icon={<Server className="w-5 h-5 text-blue-500" />}
            />
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Live Ingestion Feed</h3>
            </div>
            <div className="space-y-3 flex-1 overflow-hidden">
               {pulseLogs.map(log => (
                 <div key={log.id} className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                    <p className="text-[10px] font-mono text-emerald-400 leading-tight">[{log.time}] {log.msg}</p>
                 </div>
               ))}
               {pulseLogs.length === 0 && <p className="text-[10px] font-mono text-slate-600">Waiting for HubSpot packets...</p>}
            </div>
          </div>
        </div>

        {/* Charts & Operational Smells */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-blue-500" />
                 Labor Deployment Efficiency
               </h3>
               <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none">
                 <option>Last 24 Hours</option>
                 <option>Last 7 Days</option>
               </select>
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
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Compliance Score
              </h3>
              <div className="flex items-center justify-center p-8">
                 <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364.4} strokeDashoffset={36.4} className="text-blue-600 rounded-full" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-2xl font-black text-slate-800">90%</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">A+ Rating</span>
                    </div>
                 </div>
              </div>
              <div className="space-y-3 pt-2">
                 {[
                   {label: "SOP Adherence", val: "94%"},
                   {label: "Sync Health", val: "99.8%"},
                   {label: "Audit Coverage", val: "100%"}
                 ].map(item => (
                    <div key={item.label} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                       <span className="text-xs text-gray-500">{item.label}</span>
                       <span className="text-xs font-bold text-gray-800">{item.val}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;