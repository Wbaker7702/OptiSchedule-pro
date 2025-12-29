import React, { useState } from 'react';
import Header from '../components/Header';
import { Wrench, AlertTriangle, CheckSquare, Plus, MoreHorizontal } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  location: string;
  reportedBy: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Critical' | 'High' | 'Normal' | 'Low';
  date: string;
}

const Maintenance: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'TKT-1042', title: 'Walk-in Freezer Unit 2 Malfunction', location: 'Backroom Storage', reportedBy: 'John D.', status: 'Open', priority: 'Critical', date: '2024-03-21' },
    { id: 'TKT-1041', title: 'Register 4 Belt Jammed', location: 'Checkout Lane 4', reportedBy: 'Sarah C.', status: 'In Progress', priority: 'High', date: '2024-03-20' },
    { id: 'TKT-1039', title: 'Flickering Light Fixture', location: 'Aisle 12', reportedBy: 'Mike R.', status: 'Resolved', priority: 'Normal', date: '2024-03-19' },
    { id: 'TKT-1035', title: 'Restroom Sink Leaking', location: 'Customer Restroom', reportedBy: 'Janitorial', status: 'Resolved', priority: 'Normal', date: '2024-03-18' },
  ]);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Facilities Maintenance" subtitle="Equipment Repair & Store Upkeep" />

      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Kanban Board Layout */}
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
          
          {/* Open Column */}
          <div className="flex-1 min-w-[300px]">
            <div className="bg-gray-100 p-4 rounded-t-xl border-b-2 border-red-400 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Open Tickets</h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{tickets.filter(t => t.status === 'Open').length}</span>
            </div>
            <div className="bg-gray-100/50 p-4 rounded-b-xl min-h-[500px] space-y-4">
              {tickets.filter(t => t.status === 'Open').map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Report Issue
              </button>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="flex-1 min-w-[300px]">
             <div className="bg-gray-100 p-4 rounded-t-xl border-b-2 border-blue-400 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">In Progress</h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{tickets.filter(t => t.status === 'In Progress').length}</span>
            </div>
            <div className="bg-gray-100/50 p-4 rounded-b-xl min-h-[500px] space-y-4">
               {tickets.filter(t => t.status === 'In Progress').map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>

          {/* Resolved Column */}
          <div className="flex-1 min-w-[300px]">
             <div className="bg-gray-100 p-4 rounded-t-xl border-b-2 border-green-400 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Resolved</h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{tickets.filter(t => t.status === 'Resolved').length}</span>
            </div>
            <div className="bg-gray-100/50 p-4 rounded-b-xl min-h-[500px] space-y-4">
               {tickets.filter(t => t.status === 'Resolved').map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex justify-between items-start mb-3">
      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
      <button className="text-gray-300 hover:text-gray-600">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    <h4 className="font-bold text-gray-800 mb-2 leading-tight">{ticket.title}</h4>
    <div className="flex items-center gap-2 mb-4">
      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${
        ticket.priority === 'Critical' ? 'bg-red-50 text-red-600 border-red-100' :
        ticket.priority === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' :
        'bg-blue-50 text-blue-600 border-blue-100'
      }`}>
        {ticket.priority}
      </span>
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <Wrench className="w-3 h-3" /> {ticket.location}
      </span>
    </div>
    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
       <span className="text-xs text-gray-400">{ticket.date}</span>
       <div className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center text-slate-600 font-bold" title={ticket.reportedBy}>
          {ticket.reportedBy.charAt(0)}
       </div>
    </div>
  </div>
);

export default Maintenance;
