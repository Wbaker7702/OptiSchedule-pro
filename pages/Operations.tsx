import React from 'react';
import Header from '../components/Header';
import { DEPARTMENT_METRICS } from '../constants';
import { RefreshCcw, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const salesData = [
  { name: 'Front End', sales: 42350 },
  { name: 'Electronics', sales: 28920 },
  { name: 'Grocery', sales: 31680 },
  { name: 'Apparel', sales: 15240 },
  { name: 'Home Goods', sales: 5890 },
  { name: 'Pharmacy', sales: 1350 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const Operations: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Operations Hub" subtitle="Real-time operational metrics across all departments" />

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
           <h2 className="text-lg font-semibold text-gray-800">Department Performance</h2>
           <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
             <RefreshCcw className="w-3 h-3" /> Refresh Data
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENT_METRICS.map((dept, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900">{dept.name}</h3>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">Dept {index + 1}</span>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Active Staff</p>
                    <p className="font-semibold text-gray-900">{dept.activeStaff}</p>
                  </div>
                   <div>
                    <p className="text-xs text-gray-500">Today's Sales</p>
                    <p className="font-semibold text-gray-900">{dept.sales}</p>
                  </div>
               </div>
               <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{dept.extraMetricLabel}</span>
                    <span className="font-medium text-blue-600">{dept.extraMetricValue}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-6">Sales by Department</h3>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#64748b'}} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                      <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={20}>
                        {salesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Top 5 Selling Products</h3>
              <div className="space-y-4">
                 {[
                   {name: 'iPhone 15 Pro', cat: 'Electronics', price: '$12,450', color: 'bg-blue-100 text-blue-600'},
                   {name: 'Organic Milk', cat: 'Grocery', price: '$8,920', color: 'bg-green-100 text-green-600'},
                   {name: 'Nike Air Max', cat: 'Apparel', price: '$6,780', color: 'bg-orange-100 text-orange-600'},
                   {name: 'Coffee Maker', cat: 'Home Goods', price: '$4,560', color: 'bg-purple-100 text-purple-600'},
                   {name: 'Vitamins Pack', cat: 'Pharmacy', price: '$3,240', color: 'bg-teal-100 text-teal-600'},
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center font-bold text-xs`}>
                           {i + 1}
                         </div>
                         <div>
                           <p className="text-sm font-medium text-gray-900">{item.name}</p>
                           <p className="text-xs text-gray-500">{item.cat}</p>
                         </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.price}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
