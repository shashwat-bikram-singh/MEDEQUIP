import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Warehouse, Truck, Compass, Clock, CheckCircle } from 'lucide-react';

const nepalCities = [
  { name: 'Kathmandu', coordinates: [27.7172, 85.3240] },
  { name: 'Pokhara', coordinates: [28.2096, 83.9856] },
  { name: 'Lalitpur', coordinates: [27.6744, 85.3239] },
  { name: 'Bhaktapur', coordinates: [27.6710, 85.4298] },
  { name: 'Bharatpur (Chitwan)', coordinates: [27.6798, 84.4362] },
  { name: 'Biratnagar', coordinates: [26.4525, 87.2718] },
  { name: 'Dharan', coordinates: [26.8126, 87.2831] },
  { name: 'Butwal', coordinates: [27.7000, 83.4500] },
  { name: 'Nepalgunj', coordinates: [28.0500, 81.6167] },
  { name: 'Hetauda', coordinates: [27.4208, 85.0312] },
  { name: 'Birgunj', coordinates: [27.0125, 84.8764] }
];

// Haversine formula to compute distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function ProductLocationMap({ product }) {
  const { location } = product || {};
  
  // Safe fallback to Central Kathmandu if location data is missing
  const warehouse = location || {
    warehouse: 'Central Kathmandu Hub',
    city: 'Kathmandu',
    address: 'Tripureshwor, Ward 11, Kathmandu, Nepal',
    phone: '+977-1-4261100',
    coordinates: [27.6934, 85.3149],
    stockAvailable: 25
  };

  const [selectedCity, setSelectedCity] = useState('');
  const [shippingDetails, setShippingDetails] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerGroupRef = useRef(null);
  const polylineInstanceRef = useRef(null);

  // Calculate shipping metrics when city changes
  useEffect(() => {
    if (!selectedCity) {
      setShippingDetails(null);
      return;
    }

    const cityObj = nepalCities.find(c => c.name === selectedCity);
    if (!cityObj) return;

    const distance = getDistance(
      warehouse.coordinates[0], 
      warehouse.coordinates[1], 
      cityObj.coordinates[0], 
      cityObj.coordinates[1]
    );

    let duration = '';
    let cost = 0;

    if (distance < 5) {
      duration = 'Same-Day Delivery';
      cost = 0; // Free local delivery
    } else if (distance < 100) {
      duration = '1-2 Business Days';
      cost = 120;
    } else if (distance < 250) {
      duration = '2-3 Business Days';
      cost = 220;
    } else {
      duration = '3-4 Business Days';
      cost = 350;
    }

    setShippingDetails({
      distance: Math.round(distance),
      duration,
      cost,
      routeDescription: distance < 5 
        ? 'Same-day instant dispatch via local warehouse courier.'
        : `Dispatched from ${warehouse.city} and shipped to ${cityObj.name} via national highway networks.`
    });
  }, [selectedCity, warehouse]);

  // Leaflet map initialization
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapRef.current, {
        center: warehouse.coordinates,
        zoom: 8.5,
        zoomControl: false
      });

      // Voyager layer from CartoDB - clean, premium, fitting modern UI
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
      markerGroupRef.current = L.featureGroup().addTo(map);
    } else {
      mapInstanceRef.current.setView(warehouse.coordinates, 8.5);
    }

    // Clear previous layers in the group
    markerGroupRef.current.clearLayers();

    // Create warehouse marker with pulse animation
    const warehouseIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-9 w-9 animate-ping rounded-full bg-sky-400 opacity-70"></span>
          <div class="relative flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 border-2 border-white shadow-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
            </svg>
          </div>
        </div>
      `,
      className: 'custom-warehouse-icon',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    const warehouseMarker = L.marker(warehouse.coordinates, { icon: warehouseIcon })
      .bindPopup(`
        <div class="p-1 font-sans">
          <p class="font-bold text-slate-800 text-sm mb-1">${warehouse.warehouse}</p>
          <p class="text-xs text-slate-500 mb-2">${warehouse.address}</p>
          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Stock: ${warehouse.stockAvailable} units in hand
          </div>
        </div>
      `)
      .addTo(markerGroupRef.current);

    // Auto-open on load
    warehouseMarker.openPopup();

    return () => {
      // Map cleanup on unmount handled in parent hook or when page changes
    };
  }, [warehouse]);

  // Handle destination plotting and routing line
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markerGroup = markerGroupRef.current;
    if (!map || !markerGroup) return;

    // Clear previous polyline
    if (polylineInstanceRef.current) {
      map.removeLayer(polylineInstanceRef.current);
      polylineInstanceRef.current = null;
    }

    // Clear any marker other than the main warehouse marker
    const layers = markerGroup.getLayers();
    if (layers.length > 1) {
      for (let i = 1; i < layers.length; i++) {
        markerGroup.removeLayer(layers[i]);
      }
    }

    if (!selectedCity) {
      // Zoom back to default warehouse centering
      map.setView(warehouse.coordinates, 8.5);
      return;
    }

    const cityObj = nepalCities.find(c => c.name === selectedCity);
    if (!cityObj) return;

    // Add user selected destination marker
    const destIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-8 w-8 animate-pulse rounded-full bg-emerald-400 opacity-60"></span>
          <div class="relative flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 border-2 border-white shadow-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        </div>
      `,
      className: 'custom-dest-icon',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const destMarker = L.marker(cityObj.coordinates, { icon: destIcon })
      .bindPopup(`
        <div class="p-1 font-sans">
          <p class="font-bold text-slate-800 text-xs">${cityObj.name}</p>
          <p class="text-[10px] text-slate-500">Destination Delivery Point</p>
        </div>
      `)
      .addTo(markerGroup);

    // Draw flowing route polyline
    const routeLine = L.polyline([warehouse.coordinates, cityObj.coordinates], {
      color: '#0284c7', // Sky-600
      weight: 3,
      opacity: 0.8,
      dashArray: '6, 6',
      className: 'animate-dash'
    }).addTo(map);

    polylineInstanceRef.current = routeLine;

    // Open destination popup
    destMarker.openPopup();

    // Fit map view to show both coordinates beautifully
    const bounds = L.latLngBounds([warehouse.coordinates, cityObj.coordinates]);
    map.fitBounds(bounds, { padding: [60, 60] });

  }, [selectedCity, warehouse]);

  // Clean up Leaflet on absolute unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mt-12 p-6 md:p-8">
      {/* Styles for dynamic dash animations on Leaflet SVGs */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-dash {
          stroke-dasharray: 8, 8;
          animation: dash 1.5s linear infinite;
        }
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(241, 245, 249, 1);
        }
        .leaflet-popup-tip {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
              Nepal GPS Logistic Node
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">Warehouse Location & Logistics</h3>
        </div>
        <p className="text-xs text-slate-400 mt-2 md:mt-0 italic">
          Live supply chain tracking enabled
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Map Container */}
        <div className="lg:col-span-7 xl:col-span-8 relative">
          <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/50 flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-bold text-slate-700">Nepal Depot Network</span>
          </div>
          
          <div 
            ref={mapRef} 
            className="w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-md"
            style={{ minHeight: '360px' }}
          />
        </div>

        {/* Info & Calculator Panel */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-6">
          
          {/* Warehouse Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-50 rounded-xl text-sky-600 flex-shrink-0">
                <Warehouse className="w-5 h-5" />
              </div>
              <div className="space-y-2.5 min-w-0">
                <div>
                  <h4 className="font-bold text-slate-800 text-base leading-tight truncate">
                    {warehouse.warehouse}
                  </h4>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle className="w-3 h-3" /> {warehouse.stockAvailable} units in stock
                  </span>
                </div>
                
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{warehouse.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{warehouse.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Shipping Calculator */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600" />
                <h5 className="font-bold text-slate-800 text-sm">Nepal Delivery Calculator</h5>
              </div>

              <div>
                <label htmlFor="city-select" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Select Your City in Nepal
                </label>
                <div className="relative">
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Choose destination --</option>
                    {nepalCities.map((city) => (
                      <option 
                        key={city.name} 
                        value={city.name}
                        disabled={city.name === warehouse.city}
                      >
                        {city.name} {city.name === warehouse.city ? '(Local Hub)' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {shippingDetails ? (
                <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3.5 space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white px-2.5 py-2 rounded-lg border border-slate-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Distance</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">{shippingDetails.distance} km</p>
                    </div>
                    <div className="bg-white px-2.5 py-2 rounded-lg border border-slate-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Shipping Cost</p>
                      <p className="text-sm font-extrabold text-sky-600 mt-0.5">
                        {shippingDetails.cost === 0 ? 'FREE' : `₹${shippingDetails.cost}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1.5 border-t border-sky-100/50">
                    <Clock className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-none">
                        Est: {shippingDetails.duration}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-normal mt-1">
                        {shippingDetails.routeDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[90px] border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                  <Truck className="w-5 h-5 text-slate-300 animate-bounce mb-1" />
                  <p className="text-xs text-slate-400">Select a city to calculate dynamic delivery rates & transit times.</p>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 mt-4 leading-normal flex items-start gap-1.5">
              <span className="font-extrabold text-sky-600 mt-0.5">Note:</span>
              <span>All medical products are handled in climate-controlled transport boxes to maintain absolute safety.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
