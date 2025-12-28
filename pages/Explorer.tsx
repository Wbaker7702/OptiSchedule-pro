import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import { EMPLOYEES, INVENTORY_DATA } from '../constants';
import { AlertTriangle, CheckCircle2, Search, Users, Package } from 'lucide-react';

type ExplorerTab = 'all' | 'inventory' | 'team';

function normalize(s: string) {
  return s.trim().toLowerCase();
}

const Explorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<ExplorerTab>('all');

  const q = normalize(query);

  const inventoryResults = useMemo(() => {
    if (!q) return INVENTORY_DATA;
    return INVENTORY_DATA.filter((p) => {
      const haystack = normalize(`${p.name} ${p.sku} ${p.category} ${p.status}`);
      return haystack.includes(q);
    });
  }, [q]);

  const employeeResults = useMemo(() => {
    if (!q) return EMPLOYEES;
    return EMPLOYEES.filter((e) => {
      const haystack = normalize(`${e.name} ${e.role} ${e.department} ${e.status} ${e.email}`);
      return haystack.includes(q);
    });
  }, [q]);

  const criticalCount = useMemo(
    () => INVENTORY_DATA.filter((p) => p.status === 'Critical').length,
    []
  );
  const lowCount = useMemo(() => INVENTORY_DATA.filter((p) => p.status === 'Low').length, []);
  const onLeaveCount = useMemo(() => EMPLOYEES.filter((e) => e.status === 'On Leave').length, []);

  const showInventory = tab === 'all' || tab === 'inventory';
  const showTeam = tab === 'all' || tab === 'team';

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Explorer" subtitle="Search across inventory and team data in one place" />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Critical Stock Items</p>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{criticalCount}</p>
            <p className="text-xs text-gray-500 mt-1">Immediate action recommended</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{lowCount}</p>
            <p className="text-xs text-gray-500 mt-1">Monitor reorder points</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Employees On Leave</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{onLeaveCount}</p>
            <p className="text-xs text-gray-500 mt-1">Factor into scheduling</p>
          </div>
        </div>

        {/* Search + tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Search</h3>
              <p className="text-xs text-gray-500">Try “critical”, “Front End”, “ELEC-”, or a name</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search inventory, team..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 max-w-full"
                />
              </div>

              <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setTab('all')}
                  className={`px-3 py-2 text-sm font-medium ${
                    tab === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTab('inventory')}
                  className={`px-3 py-2 text-sm font-medium ${
                    tab === 'inventory'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Inventory
                </button>
                <button
                  onClick={() => setTab('team')}
                  className={`px-3 py-2 text-sm font-medium ${
                    tab === 'team' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Team
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-6">
            {showInventory && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Inventory Results</h4>
                  </div>
                  <p className="text-xs text-gray-500">{inventoryResults.length} items</p>
                </div>

                <div className="overflow-x-auto custom-scrollbar border border-gray-100 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">SKU</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {inventoryResults.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-500">{item.sku}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium">{item.stock}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              {item.status === 'Good' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                              {item.status !== 'Good' && (
                                <AlertTriangle
                                  className={`w-4 h-4 ${
                                    item.status === 'Low' ? 'text-orange-500' : 'text-red-500'
                                  }`}
                                />
                              )}
                              <span
                                className={`${
                                  item.status === 'Good'
                                    ? 'text-green-700'
                                    : item.status === 'Low'
                                      ? 'text-orange-700'
                                      : 'text-red-700'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {inventoryResults.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                            No inventory matches found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showTeam && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Team Results</h4>
                  </div>
                  <p className="text-xs text-gray-500">{employeeResults.length} employees</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employeeResults.map((e) => (
                    <div
                      key={e.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={e.avatar}
                          alt={e.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{e.name}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {e.role} • {e.department}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              e.status === 'Active'
                                ? 'bg-green-50 text-green-700'
                                : e.status === 'Training'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-orange-50 text-orange-700'
                            }`}
                          >
                            {e.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                        <span className="truncate">{e.email}</span>
                        <span className="font-mono text-gray-600">{e.performance.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                  {employeeResults.length === 0 && (
                    <div className="md:col-span-2 py-8 text-center text-sm text-gray-500">
                      No team matches found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;

