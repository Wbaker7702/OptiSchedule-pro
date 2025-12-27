import React from 'react';
import Header from '../components/Header';
import { DEPARTMENT_METRICS } from '../constants';
import { RefreshCcw, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

const salesData = [
  { name: 'Front End', sales: 42350 },
  { name: 'Electronics', sales: 28920 },
  { name: 'Grocery', sales: 31680 },
  { name: 'Apparel', sales: 15240 },
  { name: 'Home Goods', sales: 5890 },
  { name: 'Pharmacy', sales: 1350 },
];

const Operations: React.FC = () => {
  // Merge numeric sales data with detailed metrics for the chart
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
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
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
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-100 group hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2 text-gray-500">
                            <Users className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium uppercase tracking-wide">Staff</span>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{dept.activeStaff}</p>
                      </div>
                       <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-100 group hover:border-green-200 transition-colors">
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