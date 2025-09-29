"use client";

import React from 'react';
import ReactWorldMap from 'react-svg-worldmap';

interface Float {
  id: number;
  lat: number;
  lng: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
}

interface WorldMapProps {
  floats?: Float[];
}

export const WorldMap: React.FC<WorldMapProps> = ({ floats }) => {
  const defaultFloats = [
    { lat: 19.0, lng: 72.8, id: 1, status: 'active' as const, lastUpdate: '2024-01-01' }, // Mumbai coast
    { lat: 15.3, lng: 73.8, id: 2, status: 'active' as const, lastUpdate: '2024-01-01' }, // Goa coast
    { lat: 11.0, lng: 76.0, id: 3, status: 'maintenance' as const, lastUpdate: '2024-01-01' }, // Kerala coast
    { lat: 13.1, lng: 80.3, id: 4, status: 'active' as const, lastUpdate: '2024-01-01' }, // Chennai coast
    { lat: 17.7, lng: 83.3, id: 5, status: 'inactive' as const, lastUpdate: '2024-01-01' }, // Visakhapatnam coast
    { lat: 22.3, lng: 88.3, id: 6, status: 'active' as const, lastUpdate: '2024-01-01' }, // Kolkata coast
    { lat: 8.5, lng: 76.9, id: 7, status: 'active' as const, lastUpdate: '2024-01-01' }, // Trivandrum coast
  ];

  const displayFloats = floats && floats.length > 0 ? floats : defaultFloats;

  // Sample data for the world map
  const mapData = [
    { country: 'ae', value: 50 }, // UAE (Arabian Sea region)
    { country: 'sa', value: 75 }, // Saudi Arabia
    { country: 'om', value: 30 }, // Oman
    { country: 'us', value: 100 }, // United States
    { country: 'ca', value: 80 }, // Canada
    { country: 'br', value: 90 }, // Brazil
    { country: 'au', value: 60 }, // Australia
    { country: 'cn', value: 95 }, // China
    { country: 'ru', value: 85 }, // Russia
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-lg overflow-hidden">
      {/* World Map */}
      <div className="w-full h-full">
        <ReactWorldMap
          color="#374151"
          title="Float Locations"
          value-suffix="units"
          size="responsive"
          data={mapData}
          backgroundColor='black'
          styleFunction={(context) => ({
            fill: context.countryValue! > 0 ? '#374151' : '#1f2937',
            stroke: '#4b5563',
            strokeWidth: 0.5,
            cursor: 'pointer'
          })}
        />
      </div>

      {/* Float Markers Overlay */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Grid lines for reference */}
          {Array.from({ length: 17 }, (_, i) => (
            <line
              key={`lon-${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={400}
              stroke="#475569"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}

          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`lat-${i}`}
              x1={0}
              y1={i * 50}
              x2={800}
              y2={i * 50}
              stroke="#475569"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}

          {/* Float markers */}


          {/* Title and labels */}
          <text x="400" y="25" textAnchor="middle" className="text-lg font-bold" fill="#ffffff" style={{ textShadow: '0 0 4px #000000' }}>
            Global Ocean Monitoring Network
          </text>
          <text x="400" y="380" textAnchor="middle" className="text-sm" fill="#cbd5e1" style={{ textShadow: '0 0 2px #000000' }}>
            Indian Ocean Region - Real-time Float Tracking
          </text>

          {/* Legend */}
          {/* <g transform="translate(20, 320)">
            <rect x="0" y="0" width="180" height="60" fill="rgba(0,0,0,0.7)" rx="5" />
            <text x="10" y="15" className="text-xs font-semibold" fill="#ffffff">Float Status:</text>

            <circle cx="20" cy="30" r="4" fill="#10b981" />
            <text x="30" y="34" className="text-xs" fill="#cbd5e1">Active</text>

            <circle cx="20" cy="45" r="4" fill="#f59e0b" />
            <text x="30" y="49" className="text-xs" fill="#cbd5e1">Maintenance</text>

            <circle cx="90" cy="30" r="4" fill="#ef4444" />
            <text x="100" y="34" className="text-xs" fill="#cbd5e1">Inactive</text>
          </g> */}
        </svg>
      </div>
    </div>
  );
};
// export { WorldMap };