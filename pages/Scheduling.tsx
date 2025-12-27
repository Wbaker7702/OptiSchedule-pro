import React, { useState } from 'react';
import Header from '../components/Header';
import { HEATMAP_DATA } from '../constants';
import { Calendar, Download, Printer, Filter, RefreshCw, Link as LinkIcon, Check, X, ShieldCheck } from 'lucide-react';

const Scheduling: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [portalId, setPortalId] = useState('');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate connection process
    setIsSyncing(true);
    setIsModalOpen(false);
    setTimeout(() => {
        setIsConnected(true);
        setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto relative">
      <Header title="Scheduling Center" subtitle="Optimize workforce allocation based on customer flow patterns" />
      
      {/* HubSpot Connection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">
                <div className="bg-[#ff7a59] p-6 flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <span className="bg-white text-[#ff7a59] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">HS</span>
                        HubSpot Integration
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-6 flex justify-center">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">🏪</span>
                            </div>
                            <div className="h-px w-10 bg-gray-300 border-t border-dashed border-gray-400"></div>
                            <div className="w-12 h-12 bg-[#fff1ee] rounded-full flex items-center justify-center text-[#ff7a59]">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                            </div>
                         </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 text-center">
                        Connect your HubSpot Operations Hub to automatically sync employee availability, shift patterns, and leave requests.
                    </p>
                    <form onSubmit={handleConnect} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">HubSpot Portal ID</label>
                            <input 
                                type="text" 
                                value={portalId}
                                onChange={(e) => setPortalId(e.target.value)}
                                placeholder="e.g. 8675309"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7a59] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-100">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secure OAuth 2.0 connection encrypted.</span>
                        </div>
                        <div className="pt-2">
                            <button 
                                type="submit"
                                className="w-full py-2.5 bg-[#ff7a59] hover:bg-[#ff8f73] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                                Authorize Connection
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Integration Status Section */}
        {!isConnected ? (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff7a59]/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
                
                <div className="flex items-center gap-5 z-10">
                   <div className="w-16 h-16 bg-[#fff1ee] rounded-xl flex items-center justify-center border border-[#ff7a59]/20 shadow-sm shrink-0">
                      <svg className="w-8 h-8 text-[#ff7a59]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-gray-900">Connect HubSpot</h3>
                     <p className="text-gray-500 text-sm mt-1 max-w-lg">Sync scheduling data from HubSpot Operations Hub to automate shift allocation based on real-time employee data and sales forecasts.</p>
                   </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg z-10 whitespace-nowrap"
                >
                   <LinkIcon className="w-4 h-4" />
                   Setup Integration
                </button>
             </div>
        ) : (
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-white to-green-50/50 gap-4">
               <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative shrink-0">
                      <div className="w-10 h-10 bg-[#ff7a59] rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                         <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                         </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        HubSpot Integration Active
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">Live</span>
                    </h3>
                    <p className="text-sm text-gray-500">Synced with Portal ID: {portalId || '8675309'} • Last updated {isSyncing ? 'Just now' : '2 mins ago'}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                   <button 
                       onClick={() => setIsConnected(false)}
                       className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors px-2"
                   >
                       Disconnect
                   </button>
                   <button 
                       onClick={handleSync}
                       disabled={isSyncing}
                       className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all shadow-sm ${isSyncing ? 'opacity-70 cursor-wait' : ''}`}
                   >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
                      {isSyncing ? 'Syncing...' : 'Sync Now'}
                   </button>
               </div>
            </div>
        )}

        {/* Heatmap Section */}
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div>
                <h2 className="text-lg font-bold text-white">Staffing vs. Demand Misalignment</h2>
                <p className="text-red-400 text-sm font-medium mt-1">"The $90k/Week Leak" Detected</p>
             </div>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="text-xs text-slate-300">Optimal</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-600"></div>
                 <span className="text-xs text-slate-300">Critical</span>
               </div>
             </div>
          </div>
          
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[150px_repeat(9,1fr)]">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-center space-y-16 text-slate-400 font-medium text-sm pr-4 border-r border-slate-700">
                  <div className="h-24 flex items-center justify-end">Transaction Volume</div>
                  <div className="h-24 flex items-center justify-end">Current Staffing</div>
                </div>

                {/* Heatmap Columns */}
                {HEATMAP_DATA.map((point, index) => {
                   let topColorClass = "bg-green-600";
                   if(point.efficiency > 80) topColorClass = "bg-red-700";
                   else if(point.efficiency > 60) topColorClass = "bg-orange-500";
                   else if(point.efficiency > 30) topColorClass = "bg-yellow-400";
                   else if(point.efficiency <= 30) topColorClass = "bg-emerald-600";
                   
                   const bottomColorClass = "bg-emerald-700";

                   return (
                    <div key={index} className="flex flex-col">
                      {/* Top Cell (Demand) */}
                      <div className={`h-24 ${topColorClass} border-r border-slate-800/20 flex items-center justify-center text-white font-bold text-lg relative group`}>
                         {point.transactionVolume}
                         <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      {/* Bottom Cell (Staffing) */}
                      <div className={`h-24 ${bottomColorClass} border-r border-slate-800/20 border-t border-white/20 flex items-center justify-center text-white font-bold text-lg`}>
                        {point.staffing}
                      </div>
                      
                      {/* X-Axis Label */}
                      <div className="mt-4 text-center text-slate-400 text-sm font-medium">
                        {point.hour}
                      </div>
                    </div>
                   );
                })}
              </div>
            </div>
            <div className="mt-4 text-center text-slate-500 text-xs uppercase tracking-wider">Hour of Day</div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
             <div className="flex items-center gap-4">
                <h3 className="font-semibold text-gray-900">Weekly Schedule</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                   <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded text-gray-800">Dec 15 - Dec 21</button>
                   <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Next Week</button>
                </div>
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Filter className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Printer className="w-4 h-4" /></button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 ml-auto sm:ml-0">
                  <Calendar className="w-4 h-4" /> Create Schedule
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
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit mb-1">J. Smith</span><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium block w-fit">M. Chen</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium block w-fit">A. Davis</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium block w-fit">A. Davis</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium block w-fit">S. Johnson</span></td>
                    </tr>
                    <tr>
                       <td className="px-4 py-4 font-medium text-gray-900">12:00 PM - 4:00 PM</td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium block w-fit">S. Johnson</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium block w-fit">M. Chen</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium block w-fit">A. Davis</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium block w-fit">S. Johnson</span></td>
                       <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium block w-fit">J. Smith</span></td>
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