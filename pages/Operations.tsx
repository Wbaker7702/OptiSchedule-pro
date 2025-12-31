import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { DEPARTMENT_METRICS, OPERATIONAL_AUDITS as INITIAL_AUDITS } from '../constants';
import { RefreshCcw, Users, DollarSign, TrendingUp, Clock, ShieldAlert, CheckCircle, Info, Terminal, Search, AlertCircle, Play, Download, Loader2, ChevronRight, Activity, TerminalSquare } from 'lucide-react';
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
  defaultTab?: 'metrics' | 'audit';
}

const Operations: React.FC<OperationsProps> = ({ defaultTab = 'metrics' }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'audit'>(defaultTab);
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [linterLogs, setLinterLogs] = useState<LinterLog[]>([]);
  const [executionCount, setExecutionCount] = useState(1);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [linterLogs]);

  // Handle entry and logging
  useEffect(() => {
    if (activeTab === 'audit') {
      if (linterLogs.length === 0) {
        addLog(`[EXECUTION #${executionCount}] Baseline Sentinel diagnostic scan initialized.`, 'info');
        setTimeout(() => {
          addLog(`System check complete. ${audits.length} variances found. Integrity Score: 88%.`, 'warning');
        }, 600);
      } else if (defaultTab === 'audit') {
        // Log entry from Schedule Finalization
        addLog(`Scheduled Ingress Verification initiated. Validating variance against D365 ERP logic.`, 'info');
      }
    }
  }, [activeTab]);

  // Periodic Auto-Linter (Every 45 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'audit') {
        const nextExec = executionCount + 1;
        setExecutionCount(nextExec);
        addLog(`[EXECUTION #${nextExec}] Automated periodic background audit started...`, 'info');
        setTimeout(() => {
          addLog(`Automated check #${nextExec} complete. No new deviations detected in Sector Alpha.`, 'success');
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
    addLog(`[EXECUTION #${nextExec}] Manual Full-Scope Linter Sync initiated by user.`, 'info');
    addLog('Re-indexing Microsoft Dynamics 365 Sales/HR Node endpoints...', 'info');
    
    setTimeout(() => {
      setIsSyncing(false);
      addLog(`Full Sync #${nextExec} complete. All 5 policy vectors validated.`, 'success');
      if (audits.length === 0) {
        setAudits(INITIAL_AUDITS);
        addLog('Policy deviations detected after node refresh. Manual intervention required.', 'warning');
      }
    }, 2500);
  };

  const handleExportCSV = () => {
    addLog('Sentinel Ledger Export: Generating secure binary buffer...', 'info');
    const headers = ['ID', 'Severity', 'Code', 'Message', 'Entity', 'Fix Action'];
    const rows = audits.map(a => [
      a.id,
      a.severity,
      a.code,
      `"${a.message.replace(/"/g, '""')}"`,
      `"${a.file.replace(/"/g, '""')}"`,
      `"${a.fix.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `store_5065_audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog('Export successful. Ledger downloaded to local client storage.', 'success');
  };

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
             {audits.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  {audits.length}
                </span>
             )}
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
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
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
                            <AlertCircle className="w-3 h-3" /> {audits.filter(a => a.severity === 'error').length} ERRORS
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-orange-400 border-r border-slate-700">
                            <Info className="w-3 h-3" /> {audits.filter(a => a.severity === 'warning').length} WARN
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 text-blue-400">
                            <CheckCircle className="w-3 h-3" /> {INITIAL_AUDITS.length - audits.length + audits.filter(a => a.severity === 'info').length} OK
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
                        {audits.length > 0 ? (
                            audits.map((audit) => (
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
                                        <button 
                                            onClick={() => handleQuickFix(audit.id)}
                                            disabled={fixingId === audit.id}
                                            className="text-blue-400 hover:text-white flex items-center gap-1.5 text-[10px] font-bold ml-auto bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 hover:bg-blue-500/30 transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {fixingId === audit.id ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" /> Fixing...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-3 h-3" /> {audit.fix}
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <span className="text-slate-600 text-[10px]">VERIFIED</span>
                                    )}
                                </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 opacity-20" />
                                        <p className="text-slate-500 text-sm tracking-wide">No active linting errors. System clean.</p>
                                        <button 
                                            onClick={() => {
                                                setAudits(INITIAL_AUDITS);
                                                addLog('Sentinel Ledger: Audit log reset manually.', 'info');
                                            }}
                                            className="mt-4 text-blue-500 hover:text-blue-400 text-xs font-bold"
                                        >
                                            Reset Audit Log
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
                    <p className="text-[10px] text-slate-500">Scan Complete: Dec 13, 2025 • {isSyncing ? '...' : '0.04s'} Execution Time</p>
                    <div className="flex gap-2">
                    <button 
                        onClick={handleExportCSV}
                        disabled={audits.length === 0}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors border border-slate-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-3 h-3" /> Export Audit CSV
                    </button>
                    <button 
                        onClick={handleFullSync}
                        disabled={isSyncing}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCcw className="w-3 h-3" />}
                        Run Full System Sync
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
                      {linterLogs.length === 0 && (
                        <div className="text-slate-700 italic flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" /> Initializing Activity Bridge...
                        </div>
                      )}
                      <div ref={logEndRef} />
                   </div>
                </div>
                <div className="px-6 py-2 bg-slate-900/50 border-t border-slate-800 flex justify-end">
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Authorized Access Only • AES-256 Encrypted Stream</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Operations;