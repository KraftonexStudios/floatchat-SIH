"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onClose: () => void;
}

const temperatureData = [
  { month: 'Jan', temp: 24.2 },
  { month: 'Feb', temp: 25.1 },
  { month: 'Mar', temp: 26.8 },
  { month: 'Apr', temp: 28.3 },
  { month: 'May', temp: 29.7 },
  { month: 'Jun', temp: 30.2 },
  { month: 'Jul', temp: 29.8 }
];

const salinityData = [
  { month: 'Jan', salinity: 34.2 },
  { month: 'Feb', salinity: 34.5 },
  { month: 'Mar', salinity: 34.1 },
  { month: 'Apr', salinity: 33.8 },
  { month: 'May', salinity: 34.0 },
  { month: 'Jun', salinity: 34.3 }
];

const floatDistribution = [
  { name: 'Arabian Sea', value: 28, color: '#3B82F6' },
  { name: 'Bay of Bengal', value: 30, color: '#8B5CF6' },
  { name: 'Mumbai Coast', value: 15, color: '#10B981' },
  { name: 'Deep Ocean', value: 27, color: '#F59E0B' }
];

const monthlyViews = [
  { month: 'Jan', views: 450 },
  { month: 'Feb', views: 520 },
  { month: 'Mar', views: 380 },
  { month: 'Apr', views: 680 },
  { month: 'May', views: 750 },
  { month: 'Jun', views: 620 },
  { month: 'Jul', views: 890 }
];

const areaData = [
  { month: 'Jan', value1: 1200, value2: 800 },
  { month: 'Feb', value1: 1400, value2: 900 },
  { month: 'Mar', value1: 1100, value2: 750 },
  { month: 'Apr', value1: 1600, value2: 1100 },
  { month: 'May', value1: 1800, value2: 1300 },
  { month: 'Jun', value1: 1500, value2: 1000 },
  { month: 'Jul', value1: 2000, value2: 1400 }
];

export function Dashboard({ onClose }: DashboardProps) {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-7xl mx-auto min-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Ocean Data Dashboard</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Circular Progress */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Data Coverage</h3>
                <span className="text-green-400 text-sm">+25%</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${46 * 2.51} ${100 * 2.51}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">46%</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm text-center mt-2">Legend</p>
            </div>

            {/* Large Number Display */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Total Measurements</h3>
                <span className="text-green-400 text-sm">53% ↗</span>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">120K</div>
                <p className="text-gray-400 text-sm">Last update yesterday</p>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={60}>
                  <BarChart data={monthlyViews}>
                    <Bar dataKey="views" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visitors Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Visitors</h3>
                <span className="text-green-400 text-sm">53% ↗</span>
              </div>
              <div className="text-right mb-4">
                <div className="text-3xl font-bold text-white">20,345</div>
                <p className="text-gray-400 text-sm">Views</p>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={temperatureData}>
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Row - Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Monthly Data Collection</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-400">Legend 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-gray-400">Legend 2</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyViews}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Ocean Temperature Trends</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-400">Legend 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-gray-400">Legend 2</span>
                  </div>
                </div>
              </div>
              <div className="text-right mb-2">
                <span className="text-2xl font-bold text-white">$430.00</span>
                <span className="text-green-400 ml-2">↗</span>
              </div>
              <div className="text-right mb-4">
                <span className="text-sm text-gray-400">$1,900.00</span>
                <span className="text-green-400 ml-2">↗</span>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value1" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorValue1)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value2" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorValue2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Third Row - Line Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salinity Profiles */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Salinity Profiles by Depth</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-400">Legend 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-400">Legend 2</span>
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-white">27,632</span>
                <p className="text-gray-400 text-sm">May</p>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={salinityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="salinity" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Temperature Profiles */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Temperature Profiles by Depth</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Section - Data Summary */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">India currently maintains around 43 active Argo floats in the Indian Ocean as of September 2023, collecting data continuously from various locations, including the Arabian Sea and Bay of Bengal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Each Argo float profiles ocean temperature and salinity from the surface down to 2000 meters depth and relays the data typically within 24 hours of collection, enabling near real-time monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">India currently maintains around 43 active Argo floats in the Indian Ocean as of September 2023, collecting data continuously from various locations, including the Arabian Sea and Bay of Bengal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">India currently maintains around 43 active Argo floats in the Indian Ocean as of September 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}