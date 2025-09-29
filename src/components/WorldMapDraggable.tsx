"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Float {
    id: number;
    lat: number;
    lng: number;
    status: 'active' | 'inactive' | 'maintenance';
    lastUpdate: string;
}

interface WorldMapProps {
    floats?: Float[];
    darkMode?: boolean;
}

// Custom icons for different float statuses
const createCustomIcon = (status: string) => {
    const color = status === 'active' ? '#10b981' : status === 'maintenance' ? '#f59e0b' : '#ef4444';
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });
};

// Component to handle map events
function MapEvents() {
    const map = useMapEvents({
        click: (e) => {
            console.log('Map clicked at:', e.latlng);
        },
        moveend: () => {
            console.log('Map moved to:', map.getCenter());
        },
    });
    return null;
}

export const WorldMap: React.FC<WorldMapProps> = ({ floats = [], darkMode = false }) => {
    const [isClient, setIsClient] = useState(false);

    const defaultFloats = [
        { lat: 19.0, lng: 72.8, id: 1, status: 'active' as const, lastUpdate: '2024-01-01' }, // Mumbai coast
        { lat: 15.3, lng: 73.8, id: 2, status: 'active' as const, lastUpdate: '2024-01-01' }, // Goa coast
        { lat: 11.0, lng: 76.0, id: 3, status: 'maintenance' as const, lastUpdate: '2024-01-01' }, // Kerala coast
        { lat: 13.1, lng: 80.3, id: 4, status: 'active' as const, lastUpdate: '2024-01-01' }, // Chennai coast
        { lat: 17.7, lng: 83.3, id: 5, status: 'inactive' as const, lastUpdate: '2024-01-01' }, // Visakhapatnam coast
        { lat: 22.3, lng: 88.3, id: 6, status: 'active' as const, lastUpdate: '2024-01-01' }, // Kolkata coast
        { lat: 8.5, lng: 76.9, id: 7, status: 'active' as const, lastUpdate: '2024-01-01' }, // Trivandrum coast
        // Additional global points
        { lat: 40.7128, lng: -74.0060, id: 8, status: 'active' as const, lastUpdate: '2024-01-01' }, // New York
        { lat: 51.5074, lng: -0.1278, id: 9, status: 'active' as const, lastUpdate: '2024-01-01' }, // London
        { lat: 35.6762, lng: 139.6503, id: 10, status: 'maintenance' as const, lastUpdate: '2024-01-01' }, // Tokyo
        { lat: -33.8688, lng: 151.2093, id: 11, status: 'active' as const, lastUpdate: '2024-01-01' }, // Sydney
        { lat: 55.7558, lng: 37.6176, id: 12, status: 'inactive' as const, lastUpdate: '2024-01-01' }, // Moscow
    ];

    const displayFloats = floats && floats.length > 0 ? floats : defaultFloats;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-white text-lg">Loading Map...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-lg overflow-hidden">
            <MapContainer
                center={[20, 77]} // Centered on India
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
                dragging={true}
                touchZoom={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                boxZoom={true}
                keyboard={true}
                zoomControl={true}
            >
                <TileLayer
                    attribution={darkMode ?
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' :
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                    url={darkMode ?
                        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" :
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    className="map-tiles"
                />

                <MapEvents />

                {displayFloats.map((float) => (
                    <Marker
                        key={float.id}
                        position={[float.lat, float.lng]}
                        icon={createCustomIcon(float.status)}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-sm mb-1">Float #{float.id}</h3>
                                <p className="text-xs mb-1">
                                    <span className="font-semibold">Status:</span>{' '}
                                    <span className={`capitalize ${float.status === 'active' ? 'text-green-600' :
                                        float.status === 'maintenance' ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {float.status}
                                    </span>
                                </p>
                                <p className="text-xs mb-1">
                                    <span className="font-semibold">Location:</span> {float.lat.toFixed(4)}, {float.lng.toFixed(4)}
                                </p>
                                <p className="text-xs">
                                    <span className="font-semibold">Last Update:</span> {float.lastUpdate}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>


        </div>
    );
};