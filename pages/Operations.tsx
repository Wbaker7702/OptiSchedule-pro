import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { DEPARTMENT_METRICS, OPERATIONAL_AUDITS as INITIAL_AUDITS } from '../constants';
import { RefreshCcw, Users, DollarSign, TrendingUp, Clock, ShieldAlert, CheckCircle, Info, Terminal, Search, AlertCircle, Play, Download, Loader2, ChevronRight, Activity, TerminalSquare, Eye, Maximize2, Radio } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

const salesData = [
  { name: 'Front End', sales: 42350 },
  { name: 'Electronics', sales: 28920 },
  { name: 'Grocery', sales: 31680 },
  { name: 'Apparel', sales: 15240 },
  { name: 'Home Goods', sales: 5890 },
  { name: 'Pharmacy', sales: 1350 },
];

interface LinterLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface OperationsProps {
  defaultTab?: 'metrics' | 'audit' | 'vision';
}

const Operations: React.FC<OperationsProps> = ({ defaultTab = 'metrics' }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'audit' | 'vision'>(defaultTab);
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [linterLogs, setLinterLogs] = useState<LinterLog[]>([]);
  const [executionCount, setExecutionCount] = useState(1);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Vision state
  const [activeCamera, setActiveCamera] = useState('CAM_01_CHECKOUT');

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [linterLogs]);

  useEffect(() => {
    if (activeTab === 'audit') {
      if (linterLogs.length === 0) {
        addLog(`[EXECUTION #${executionCount}] Baseline Sentinel diagnostic scan initialized.`, 'info');
        setTimeout(() => {
          addLog(`System check complete. ${audits.length} variances found. Integrity Score: 88%.`, 'warning');
        }, 600);
      }
    }
    if (activeTab === 'vision') {
        addLog(`Sentinel Floor Vision link established. Authenticating stream for ${activeCamera}...`, 'info');
        setTimeout(() => addLog(`Stream secure. Real-time telemetry overlay active.`, 'success'), 1200);
    }
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'audit') {
        const nextExec = executionCount + 1;
        setExecutionCount(nextExec);
        addLog(`[EXECUTION #${nextExec}] Automated periodic background audit started...`, 'info');
        setTimeout(() => {
          addLog(`Automated check #${nextExec} complete. No new deviations detected.`, 'success');
        }, 2000);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [activeTab, executionCount]);

  const addLog = (message: string, type: LinterLog['type']) => {
    const newLog: LinterLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      type
    };
    setLinterLogs(prev => [...prev, newLog]);
  };

  const handleQuickFix = (id: string) => {
    const audit = audits.find(a => a.id === id);
    setFixingId(id);
    addLog(`Protocol Trigger: Enforcing standard for variance ${audit?.code}.`, 'info');
    
    setTimeout(() => {
      setAudits(prev => prev.filter(a => a.id !== id));
      setFixingId(null);
      addLog(`REMEDIATION SUCCESS: ${audit?.code} cleared in real-time.`, 'success');
    }, 800);
  };

  const handleFullSync = () => {
    const nextExec = executionCount + 1;
    setExecutionCount(nextExec);
    setIsSyncing(true);
    addLog(`[EXECUTION #${nextExec}] Manual Full-Scope Linter Sync initiated.`, 'info');
    
    setTimeout(() => {
      setIsSyncing(false);
      addLog(`Full Sync #${nextExec} complete. Dynamics 365 & HubSpot vectors validated.`, 'success');
    }, 2500);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Operations Hub" subtitle="Enterprise Edition 3.1.0 • Real-time Monitoring & Floor Vision" />

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
             onClick={() => setActiveTab('vision')}
             className={`px-4 py-3 text-sm font-bold transition-all relative flex items-center gap-2 ${activeTab === 'vision' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             <Eye className="w-4 h-4" />
             Floor Vision
             {activeTab === 'vision' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveTab('audit')}
             className={`px-4 py-3 text-sm font-bold transition-all relative flex items-center gap-2 ${activeTab === 'audit' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             <Terminal className="w-4 h-4" />
             Operational Linter
             {audits.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  {audits.length}
                </span>
             )}
             {activeTab === 'audit' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
           </button>
        </div>

        {activeTab === 'metrics' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
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
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
             <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video group">
                {/* Simulated Camera Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="bg-red-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                         <Radio className="w-3 h-3" /> REC
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white">
                         <p className="text-[10px] font-mono font-bold tracking-widest">{activeCamera}</p>
                         <p className="text-[9px] font-mono text-slate-400 mt-0.5">LATENCY: 42ms • AI_OVERLAY: ACTIVE</p>
                      </div>
                   </div>
                   
                   <div className="flex justify-between items-end">
                      <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white space-y-2">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-mono font-bold">DENSITY ANALYSIS: LOW (4%)</span>
                         </div>
                         <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-4/100 h-full bg-emerald-500" />
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all backdrop-blur-md border border-white/10">
                            <Maximize2 className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>

                {/* Simulated Feed Background */}
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-slate-900/50 relative">
                        {/* CSS-based grid lines for the high-tech look */}
                        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <Activity className="w-12 h-12 text-slate-800 mx-auto mb-4 animate-pulse" />
                            <p className="text-slate-700 font-mono text-[10px] font-bold uppercase tracking-[0.4em]">Floor Vision Stream active</p>
                        </div>
                    </div>
                </div>
                
                {/* HUD Scanline */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
             </div>

             <div className="grid grid-cols-4 gap-4">
                {[
                   {id: 'CAM_01_CHECKOUT', label: 'Front End Main', status: 'Online'},
                   {id: 'CAM_02_GROCERY', label: 'Fresh Produce', status: 'Online'},
                   {id: 'CAM_03_ELECTRONICS', label: 'High Value Cage', status: 'Online'},
                   {id: 'CAM_04_PHARMACY', label: 'RX Distribution', status: 'Online'}
                ].map(cam => (
                   <button 
                     key={cam.id}
                     onClick={() => setActiveCamera(cam.id)}
                     className={`p-4 rounded-xl border text-left transition-all ${
                        activeCamera === cam.id 
                        ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                     }`}
                   >
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${activeCamera === cam.id ? 'text-blue-100' : 'text-gray-400'}`}>CAM {cam.id.split('_')[1]}</p>
                      <p className={`text-xs font-bold ${activeCamera === cam.id ? 'text-white' : 'text-gray-900'}`}>{cam.label}</p>
                   </button>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Operational Linter v3.1</h3>
                        <p className="text-slate-400 text-xs mt-0.5 font-mono">Dynamics & HubSpot telemetry analysis...</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="bg-slate-800 rounded-lg p-1.5 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-red-400 border-r border-slate-700">
                            <AlertCircle className="w-3 h-3" /> {audits.filter(a => a.severity === 'error').length} ERRORS
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-orange-400 border-r border-slate-700">
                            <Info className="w-3 h-3" /> {audits.filter(a => a.severity === 'warning').length} WARN
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="p-0 min-h-[300px] relative">
                    {isSyncing && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white">
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                            <p className="font-mono text-sm tracking-widest uppercase animate-pulse">Running Full System Sync...</p>
                        </div>
                    )}
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
                        {audits.map((audit) => (
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
                                {audit.fix !== 'No action' && (
                                    <button 
                                        onClick={() => handleQuickFix(audit.id)}
                                        className="text-blue-400 hover:text-white flex items-center gap-1.5 text-[10px] font-bold ml-auto bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 hover:bg-blue-500/30 transition-all uppercase"
                                    >
                                        <Play className="w-3 h-3" /> {audit.fix}
                                    </button>
                                )}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
                    <p className="text-[10px] text-slate-500">Scan Complete: {new Date().toLocaleDateString()}</p>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleFullSync}
                            disabled={isSyncing}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            <RefreshCcw className="w-3 h-3" /> Run Ingress Sync
                        </button>
                    </div>
                </div>
             </div>

             {/* Linter Activity Stream */}
             <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <TerminalSquare className="w-4 h-4 text-emerald-500" />
                      <h4 className="text-white text-[10px] font-black uppercase tracking-widest">Sentinel Activity Feed</h4>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[9px] font-mono text-slate-500">EXEC_ID: {executionCount.toString().padStart(4, '0')}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-emerald-500 font-mono font-bold uppercase tracking-widest">Bridging Active</span>
                      </div>
                   </div>
                </div>
                <div className="h-44 overflow-y-auto p-4 font-mono text-[11px] custom-scrollbar bg-[#020617] selection:bg-blue-500/30">
                   <div className="space-y-1.5">
                      {linterLogs.map((log) => (
                        <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300 group">
                           <span className="text-slate-600 shrink-0 font-bold">[{log.timestamp}]</span>
                           <div className="flex items-start gap-2">
                              <ChevronRight className={`w-3 h-3 mt-0.5 ${
                                 log.type === 'error' ? 'text-red-500' :
                                 log.type === 'warning' ? 'text-orange-500' :
                                 log.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
                              }`} />
                              <span className={`leading-relaxed ${
                                 log.type === 'error' ? 'text-red-400 font-bold' :
                                 log.type === 'warning' ? 'text-orange-300' :
                                 log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                              }`}>
                                 {log.message}
                              </span>
                           </div>
                        </div>
                      ))}
                      <div ref={logEndRef} />
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Operations;