import React from 'react';
import Header from '../components/Header';
import { STORE_NUMBER } from '../constants';
import { CheckCircle2, CloudUpload, GitBranch, Shield, Terminal } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <Header title="Settings" subtitle="Update, upgrade, and deploy checklist" />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Environment</p>
                <h3 className="text-lg font-bold text-gray-900 mt-2">Store {STORE_NUMBER}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This app is built with Vite + React and styled via Tailwind CDN.
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Branch flow</p>
                <h3 className="text-lg font-bold text-gray-900 mt-2">Update & Upgrade</h3>
                <p className="text-sm text-gray-600 mt-1">Keep dependencies current and builds reproducible.</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <GitBranch className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Deploy</p>
                <h3 className="text-lg font-bold text-gray-900 mt-2">Production build</h3>
                <p className="text-sm text-gray-600 mt-1">Run a clean build before shipping.</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CloudUpload className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Deploy checklist</h3>
              <p className="text-xs text-gray-500 mt-1">These commands should be green before deploy.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="w-4 h-4" />
              <span>CLI</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {[
              { cmd: 'npm install', note: 'Install dependencies' },
              { cmd: 'npm run lint', note: 'TypeScript no-emit check' },
              { cmd: 'npm run build', note: 'Production build output in dist/' },
              { cmd: 'npm run preview', note: 'Smoke test the built app locally' },
            ].map((step) => (
              <div
                key={step.cmd}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{step.note}</p>
                  <p className="font-mono text-xs text-gray-700 mt-1 break-all">{step.cmd}</p>
                </div>
                <div className="flex items-center gap-2 text-green-700 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Ready
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

