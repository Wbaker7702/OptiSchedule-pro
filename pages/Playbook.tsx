import React, { useState } from 'react';
import Header from '../components/Header';
import { FISCAL_METRICS } from '../constants';
import { Book, Shield, Scale, Zap, Info, ArrowRight, TrendingUp, Calculator, FileCheck, Users, Terminal, Database, Code, ShieldCheck } from 'lucide-react';

const Playbook: React.FC = () => {
  const [recaptureInput, setRecaptureInput] = useState(FISCAL_METRICS.targetWeeklyHoursRecapture);
  
  const projectedSavings = recaptureInput * FISCAL_METRICS.avgPayRate * 52;
  const projectedProtection = projectedSavings * FISCAL_METRICS.currentROI;

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Strategy Playbook" subtitle="v3.0.0 Enterprise • Standard Operating Procedures" />
      
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Interactive Scenario Planner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-900 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-white font-bold text-xl flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-400" />
                Enterprise ROI Planner
              </h3>
              <p className="text-slate-400 text-sm mt-1">Simulate fiscal recapture at scale.</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-xl border border-slate-700">
               <span className="text-slate-300 text-sm font-medium px-2 uppercase tracking-tighter text-[10px]">Weekly Recapture</span>
               <input 
                 type="number" 
                 value={recaptureInput}
                 onChange={(e) => setRecaptureInput(parseInt(e.target.value) || 0)}
                 className="w-24 bg-slate-900 text-white font-bold text-center py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Annual Cash Recapture</p>
              <h4 className="text-3xl font-bold text-gray-900">${Math.round(projectedSavings).toLocaleString()}</h4>
              <p className="text-sm text-gray-500">Recaptured from Surplus Hours</p>
            </div>
            <div className="space-y-2 border-x border-gray-100 px-8">
              <p className="text-xs text-blue-600 uppercase tracking-widest font-bold">EBITDA Impact</p>
              <h4 className="text-3xl font-bold text-blue-600">${Math.round(projectedProtection).toLocaleString()}</h4>
              <p className="text-sm text-gray-500">10.3x Growth Multiplier</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-green-600 uppercase tracking-widest font-bold">Vision 2028 Cap</p>
              <h4 className="text-3xl font-bold text-green-600">${FISCAL_METRICS.vision2028}M</h4>
              <p className="text-sm text-gray-500">Cumulative Enterprise Scale</p>
            </div>
          </div>
        </div>

        {/* Technical Engine Room Section */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
           <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <Code className="w-64 h-64 text-blue-400" />
           </div>
           
           <div className="relative z-10 flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 rounded-full border border-blue-600/30">
                    <Terminal className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Backend Architecture</span>
                 </div>
                 <h2 className="text-3xl font-black text-white leading-tight">The 3.0 Engine Room</h2>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   OptiSchedule 3.0 leverages a hardened **Ruby on Rails API** to ensure transactional integrity across multi-store clusters. Our "Operational Linter" applies static and dynamic analysis to staffing patterns, treating a "schedule gap" as a "runtime error."
                 </p>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">Rails 7.1</span>
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">PostgreSQL</span>
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">Redis Cache</span>
                 </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   {
                     title: "Lint Rules (Operational)",
                     desc: "Automated checks for over-staffing vs. transaction volume.",
                     icon: <FileCheck className="w-5 h-5 text-emerald-400" />,
                     code: "Audit::Efficiency.lint!"
                   },
                   {
                     title: "HubSpot Sync Worker",
                     desc: "Background jobs processing 2,000+ CRM events/sec.",
                     icon: <Database className="w-5 h-5 text-orange-400" />,
                     code: "HubspotSyncJob.perform_async"
                   },
                   {
                     title: "Audit Trails",
                     desc: "Every schedule adjustment is version-controlled and immutable.",
                     icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
                     code: "AuditTrail.log_change(id)"
                   },
                   {
                     title: "Real-time Pub/Sub",
                     desc: "Instant floor alerts via ActionCable for immediate 'Zone Defense' calls.",
                     icon: <Zap className="w-5 h-5 text-purple-400" />,
                     code: "Broadcast.alert('Surge')"
                   }
                 ].map((box, i) => (
                   <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-slate-900 rounded-lg">{box.icon}</div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">{box.code}</span>
                      </div>
                      <h4 className="text-white font-bold mb-1">{box.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{box.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Vision 2028 Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Road to $491M</h3>
                <div className="space-y-6">
                   {[
                     {year: "2025", goal: "Store 5065 Pilot Efficiency", progress: "100%"},
                     {year: "2026", goal: "12-Store Market Scale", progress: "25%"},
                     {year: "2027", goal: "Regional Standard SOP Rollout", progress: "0%"},
                     {year: "2028", goal: "Enterprise EBITDA Protection", progress: "0%"}
                   ].map(step => (
                     <div key={step.year} className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                        <span className="text-xs font-black text-blue-600">{step.year}</span>
                        <p className="text-sm font-bold text-gray-800">{step.goal}</p>
                        <div className="mt-2 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                           <div className="bg-blue-600 h-full" style={{width: step.progress}}></div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Shield className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 uppercase">Standardize or Fail</h3>
                <p className="text-blue-100 leading-relaxed mb-8 font-medium">
                  "Execution Leakage" happens in the shadows of non-standardized habits. Version 3.0 isn't just a dashboard; it's the operational codebase of the store. By following these SOPs, you aren't just managing—you are coding the success of the enterprise.
                </p>
                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                     Download Briefing <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Playbook;