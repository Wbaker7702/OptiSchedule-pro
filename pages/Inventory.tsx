import React from 'react';
import Header from '../components/Header';
import { INVENTORY_DATA } from '../constants';
import { Plus, Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Inventory Management" subtitle="Track stock levels, orders, and quality control" />
      
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
             <p className="text-sm text-gray-500">Total SKUs</p>
             <p className="text-2xl font-bold text-gray-900 mt-1">12,450</p>
           </div>
           <div className="bg-white p-5 rounded-lg border border-red-200 shadow-sm bg-red-50/30">
             <p className="text-sm text-red-600 font-medium">Low Stock Items</p>
             <p className="text-2xl font-bold text-red-700 mt-1">23</p>
           </div>
           <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
             <p className="text-sm text-gray-500">Pending Orders</p>
             <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
           </div>
           <div className="bg-blue-600 p-5 rounded-lg border border-blue-700 shadow-sm text-white flex flex-col justify-center items-center cursor-pointer hover:bg-blue-700 transition-colors">
              <Plus className="w-6 h-6 mb-1" />
              <span className="font-semibold">New Order</span>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-semibold text-gray-900">Inventory Items</h3>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
                 <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    <Filter className="w-4 h-4" /> Filter
                 </button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                 <tr>
                   <th className="px-6 py-4">Product Name</th>
                   <th className="px-6 py-4">SKU</th>
                   <th className="px-6 py-4">Category</th>
                   <th className="px-6 py-4">Stock</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {INVENTORY_DATA.map((item) => (
                   <tr key={item.id} className="hover:bg-gray-50/50">
                     <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                     <td className="px-6 py-4 font-mono text-xs text-gray-500">{item.sku}</td>
                     <td className="px-6 py-4">
                       <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{item.category}</span>
                     </td>
                     <td className="px-6 py-4 font-medium">{item.stock}</td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-1.5">
                         {item.status === 'Good' && <CheckCircle className="w-4 h-4 text-green-500" />}
                         {item.status === 'Low' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                         {item.status === 'Critical' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                         <span className={`
                           ${item.status === 'Good' ? 'text-green-700' : ''}
                           ${item.status === 'Low' ? 'text-orange-700' : ''}
                           ${item.status === 'Critical' ? 'text-red-700' : ''}
                         `}>{item.status}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                        <span className="mx-2 text-gray-300">|</span>
                        <button className="text-gray-500 hover:text-gray-700 font-medium text-xs">History</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
