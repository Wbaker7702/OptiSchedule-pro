
import React, { useState } from 'react';
import Header from '../components/Header';
import { HEATMAP_DATA } from '../constants';
// Added Activity to the imports from lucide-react
import { Calendar, Download, Printer, Filter, RefreshCw, Link as LinkIcon, Check, X, ShieldCheck, Settings, Database, Users as UsersIcon, List, ArrowLeftRight, Activity } from 'lucide-react';

const Scheduling: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'heatmap' | 'logs'>('heatmap');
  const [portalId, setPortalId] = useState('');
  const [syncConfig, setSyncConfig] = useState({
    employees: true,
    shifts: true,
    timeOff: true,
    performance: false
  });

  const syncLogs = [
    { event: 'Pull Availability', target: 'Employee CRM', status: 'Success', time: '06:00 AM' },
    { event: 'Push Schedule', target: 'HubSpot Calendar', status: 'Success', time: '06:05 AM' },
    { event: 'Sync Time-Off', target: 'Operation Hub', status: 'Pending', time: 'Now' },
    { event: 'Update Performance', target: 'Deals & Tasks', status: 'Failed', time: 'Yesterday' }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setIsModalOpen(false);
    setTimeout(() => {
        setIsConnected(true);
        setIsSyncing(false);
    }, 1500);
  };

  const toggleConfig = (key: keyof typeof syncConfig) => {
    setSyncConfig(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto relative">
      <Header title="Scheduling Center" subtitle="Optimize workforce allocation based on customer flow patterns" />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100 border border-gray-100">
                <div className="bg-[#ff7a59] p-6 flex items-center justify-between">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <span className="bg-white text-[#ff7a59] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">HS</span>
                        {isConnected ? 'Update Integration' : 'Connect HubSpot'}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-8">
                    <p className="text-gray-600 text-sm mb-6 text-center leading-relaxed">
                        {isConnected 
                          ? "Modify your sync settings below. Changes will be applied during the next scheduled synchronization."
                          : "Connect your HubSpot Operations Hub to automatically sync employee availability, shift patterns, and leave requests."}
                    </p>

                    <form onSubmit={handleConnect} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">HubSpot Portal ID</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={portalId}
                                    onChange={(e) => setPortalId(e.target.value)}
                                    placeholder="e.g. 8675309"
                                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7a59] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-gray-50 focus:bg-white"
                                    required={!isConnected}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <Database className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-700">Sync Configuration</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { key: 'employees', label: 'Employee Profiles', icon: UsersIcon },
                                    { key: 'shifts', label: 'Shift Schedules', icon: Calendar },
                                    { key: 'timeOff', label: 'Time Off Requests', icon: Calendar },
                                    { key: 'performance', label: 'Performance Data', icon: Settings }
                                ].map((item) => (
                                    <div 
                                        key={item.key}
                                        onClick={() => toggleConfig(item.key as keyof typeof syncConfig)}
                                        className={`cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all ${
                                            syncConfig[item.key as keyof typeof syncConfig] 
                                            ? 'border-[#ff7a59] bg-[#fff1ee] text-[#a0361a]' 
                                            : 'border-gray-200 hover:border-gray-300 text-gray-500'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                                            syncConfig[item.key as keyof typeof syncConfig]
                                            ? 'bg-[#ff7a59] border-[#ff7a59]'
                                            : 'bg-white border-gray-300'
                                        }`}>
                                            {syncConfig[item.key as keyof typeof syncConfig] && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit"
                                className="w-full py-3.5 bg-[#ff7a59] hover:bg-[#ff8f73] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isConnected ? 'Update Configuration' : 'Authorize Connection'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* HubSpot Integration Status */}
        {!isConnected ? (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff7a59]/5 to-[#ff7a59]/20 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110 duration-700 blur-3xl"></div>
                <div className="flex items-center gap-6 z-10 relative">
                   <div className="w-20 h-20 bg-[#fff1ee] rounded-2xl flex items-center justify-center border border-[#ff7a59]/20 shadow-sm shrink-0">
                      <svg className="w-10 h-10 text-[#ff7a59]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                   </div>
                   <div className="max-w-xl">
                     <h3 className="text-xl font-bold text-gray-900 mb-2">HubSpot Integration Required</h3>
                     <p className="text-gray-500 leading-relaxed">
                        To automate the "Zone Defense" labor reallocation strategy, you must connect your HubSpot instance. This ensures staffing levels dynamically adjust to marketing campaigns and deal volume.
                     </p>
                   </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-xl z-10 whitespace-nowrap"
                >
                   <LinkIcon className="w-5 h-5" />
                   Setup Integration
                </button>
             </div>
        ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-white via-green-50/30 to-green-50/50 gap-6">
               <div className="flex items-center gap-5 w-full lg:w-auto">
                  <div className="relative shrink-0">
                      <div className="w-14 h-14 bg-[#ff7a59] rounded-xl flex items-center justify-center text-white shadow-lg ring-4 ring-white">
                         <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                         </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 border-[3px] border-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                        HubSpot Integration Active
                    </h3>
                    <p className="text-sm text-gray-500">Portal: <span className="font-mono text-gray-700 font-bold">{portalId || '8675309'}</span> • Syncing {Object.values(syncConfig).filter(Boolean).length} Entities</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                   <button 
                       onClick={() => setIsModalOpen(true)}
                       className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
                   >
                       <Settings className="w-4 h-4" />
                       Configure Mapping
                   </button>
                   <button 
                       onClick={handleSync}
                       disabled={isSyncing}
                       className={`flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-bold transition-all shadow-sm ${isSyncing ? 'opacity-70 cursor-wait' : ''}`}
                   >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
                      {isSyncing ? 'Syncing...' : 'Sync Now'}
                   </button>
               </div>
            </div>
        )}

        {/* Dynamic Content Area */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
              <button 
                onClick={() => setActiveTab('heatmap')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors relative ${activeTab === 'heatmap' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Activity className="w-4 h-4" />
                Staffing Heatmap
                {activeTab === 'heatmap' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
              <button 
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors relative ${activeTab === 'logs' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-4 h-4" />
                Sync Activity Logs
                {activeTab === 'logs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
           </div>

           {activeTab === 'heatmap' ? (
              <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <div>
                      <h2 className="text-lg font-bold text-white">Staffing vs. Demand Misalignment</h2>
                      <p className="text-red-400 text-sm font-medium mt-1">"The $90k/Week Leak" Detected</p>
                   </div>
                </div>
                
                <div className="p-6 overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-[150px_repeat(10,1fr)]">
                      <div className="flex flex-col justify-center space-y-16 text-slate-400 font-medium text-sm pr-4 border-r border-slate-700">
                        <div className="h-24 flex items-center justify-end">Traffic (HubSpot)</div>
                        <div className="h-24 flex items-center justify-end">Floor Staffing</div>
                      </div>

                      {HEATMAP_DATA.map((point, index) => {
                         let topColorClass = "bg-emerald-600";
                         if(point.efficiency > 80) topColorClass = "bg-red-700";
                         else if(point.efficiency > 60) topColorClass = "bg-orange-500";
                         
                         return (
                          <div key={index} className="flex flex-col">
                            <div className={`h-24 ${topColorClass} border-r border-slate-800/20 flex items-center justify-center text-white font-bold text-lg`}>
                               {point.transactionVolume}
                            </div>
                            <div className={`h-24 bg-emerald-700 border-r border-slate-800/20 border-t border-white/20 flex items-center justify-center text-white font-bold text-lg`}>
                              {point.staffing}
                            </div>
                            <div className="mt-4 text-center text-slate-400 text-sm font-medium">{point.hour}</div>
                          </div>
                         );
                      })}
                    </div>
                  </div>
                </div>
              </div>
           ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-900">HubSpot Operations Hub Log</h3>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {syncLogs.map((log, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                             log.status === 'Success' ? 'bg-green-50 text-green-600' : 
                             log.status === 'Pending' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                           }`}>
                             <ArrowLeftRight className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-gray-900">{log.event}</p>
                              <p className="text-xs text-gray-500">Mapping to: {log.target}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                             log.status === 'Success' ? 'bg-green-100 text-green-700' : 
                             log.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                           }`}>
                             {log.status}
                           </span>
                           <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           )}
        </div>

        {/* Weekly Schedule Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
             <div className="flex items-center gap-4">
                <h3 className="font-semibold text-gray-900">Weekly Schedule</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                   <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded text-gray-800">Dec 15 - Dec 21</button>
                   <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Next Week</button>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Calendar className="w-4 h-4" /> Generate AI Schedule
                </button>
             </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg min-w-[150px]">Time</th>
                      <th className="px-4 py-3 min-w-[120px]">Mon 12/15</th>
                      <th className="px-4 py-3 min-w-[120px]">Tue 12/16</th>
                      <th className="px-4 py-3 min-w-[120px]">Wed 12/17</th>
                      <th className="px-4 py-3 min-w-[120px]">Thu 12/18</th>
                      <th className="px-4 py-3 min-w-[120px]">Fri 12/19</th>
                      <th className="px-4 py-3 rounded-r-lg min-w-[120px]">Sat 12/20</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    <tr>
                       <td className="px-4 py-4 font-medium text-gray-900">8:00 AM - 12:00 PM</td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium block w-fit">A. Davis</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium block w-fit">A. Davis</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium block w-fit">S. Johnson</span></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
