import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Compass, 
  Navigation, 
  Search, 
  Info,
  Phone,
  Mail,
  ExternalLink,
  Layers,
  Globe
} from 'lucide-react';

// ==========================================
// CAMPUS DATASET WITH REAL COORDINATES
// ==========================================
interface Campus {
  id: string;
  name: string;
  school: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
}

const ALL_SCHOOLS = [
  "All",
  "Boston School of Technology & AI",
  "Boston School of Management",
  "Boston School of Finance",
  "Boston School of Animation & Design",
  "Boston School of Data Science"
];

const COUNTRIES = [
  "All",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "South Africa",
  "India",
  "Pakistan",
  "Nigeria"
];

const CITIES = [
  "All", "Boston", "New York", "Chicago", "San Francisco", "London", "Dubai", 
  "Johannesburg", "Pretoria", "Durban", "Mumbai", "Delhi", "Bengaluru", 
  "Chennai", "Pune", "Hyderabad", "Kurnool", "Gurugram", "Nagpur", 
  "Coimbatore", "Trivandrum", "Indore", "Bhilai", "Karachi", "Lagos"
];

const CAMPUS_DATA: Campus[] = [
  // United States
  {
    id: "us-boston",
    name: "Boston - Downtown Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "United States",
    city: "Boston",
    address: "50 Milk Street, Floor 18, Boston 02109",
    phone: "+1 (617) 555-0190",
    email: "boston.tech@bostoninstitute.org",
    lat: 42.3578,
    lng: -71.0583
  },
  {
    id: "us-ny",
    name: "New York - Manhattan Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "United States",
    city: "New York",
    address: "261 Madison Ave, New York, NY 10016, USA",
    phone: "+1 (212) 555-0143",
    email: "ny.tech@bostoninstitute.org",
    lat: 40.7505,
    lng: -73.9808
  },
  {
    id: "us-chicago",
    name: "Chicago - Millennium Park Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "United States",
    city: "Chicago",
    address: "200 N Michigan Ave, Chicago, IL 60601, USA",
    phone: "+1 (312) 555-0177",
    email: "chicago.tech@bostoninstitute.org",
    lat: 41.8827,
    lng: -87.6227
  },
  {
    id: "us-sf",
    name: "San Francisco - Financial District Campus - School of Management",
    school: "Boston School of Management",
    country: "United States",
    city: "San Francisco",
    address: "44 Montgomery St, San Francisco, CA 94104, USA",
    phone: "+1 (415) 555-0112",
    email: "sf.mgmt@bostoninstitute.org",
    lat: 37.7946,
    lng: -122.3999
  },

  // United Kingdom
  {
    id: "uk-london",
    name: "London - City Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "United Kingdom",
    city: "London",
    address: "63 St Mary Axe, London EC3A 8AA, United Kingdom",
    phone: "+44 20 7946 0192",
    email: "london.tech@bostoninstitute.org",
    lat: 51.5146,
    lng: -0.0803
  },

  // United Arab Emirates
  {
    id: "uae-dubai",
    name: "Dubai - Knowledge Park Campus - School of Finance",
    school: "Boston School of Finance",
    country: "United Arab Emirates",
    city: "Dubai",
    address: "StanChart Tower, 5F Emaar Square, Downtown Dubai, UAE",
    phone: "+971 4 388 0123",
    email: "dubai.finance@bostoninstitute.org",
    lat: 25.1972,
    lng: 55.2744
  },

  // South Africa
  {
    id: "sa-joburg",
    name: "Johannesburg - Sandton Campus - School of Management",
    school: "Boston School of Management",
    country: "South Africa",
    city: "Johannesburg",
    address: "138 West St, Sandown, Sandton, 2196, South Africa",
    phone: "+27 11 345 6789",
    email: "joburg.mgmt@bostoninstitute.org",
    lat: -26.1076,
    lng: 28.0567
  },
  {
    id: "sa-pretoria",
    name: "Pretoria - Hatfield Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "South Africa",
    city: "Pretoria",
    address: "1115 Burnett St, Hatfield, Pretoria, 0028, South Africa",
    phone: "+27 12 987 6543",
    email: "pretoria.tech@bostoninstitute.org",
    lat: -25.7479,
    lng: 28.2379
  },
  {
    id: "sa-durban",
    name: "Durban - Beachfront Campus - School of Animation & Design",
    school: "Boston School of Animation & Design",
    country: "South Africa",
    city: "Durban",
    address: "45 Marine Parade, South Beach, Durban, 4001, South Africa",
    phone: "+27 31 123 4567",
    email: "durban.design@bostoninstitute.org",
    lat: -29.8587,
    lng: 31.0218
  },

  // India
  {
    id: "in-mumbai",
    name: "Mumbai - Andheri Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Mumbai",
    address: "Ground Floor, Kanakia Wall Street, Andheri East, Mumbai - 400059",
    phone: "+91 22 6123 4567",
    email: "mumbai.tech@bostoninstitute.org",
    lat: 19.1158,
    lng: 72.8727
  },
  {
    id: "in-delhi",
    name: "Delhi - CP Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Delhi",
    address: "Awfis, Place L29-L34, Connaught Place, New Delhi, Delhi - 110001",
    phone: "+91 11 4123 4567",
    email: "delhi.tech@bostoninstitute.org",
    lat: 28.6304,
    lng: 77.2177
  },
  {
    id: "in-bengaluru",
    name: "Bengaluru - MG Road Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Bengaluru",
    address: "Quest Offices, Raheja Towers, Level 10UF, 26-27 Mahatma Gandhi Road, Bengaluru, Karnataka - 560001",
    phone: "+91 80 4911 2345",
    email: "bengaluru.tech@bostoninstitute.org",
    lat: 12.9738,
    lng: 77.6119
  },
  {
    id: "in-hyderabad",
    name: "Hyderabad - Hitec City Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Hyderabad",
    address: "Unit no 206, Jain Sadguru Capital Park, Trendz Cowork, Next to Rameshwaram Cafe, Madhapur, Hitec City, Hyderabad, Telangana - 500081",
    phone: "+91 40 6811 2233",
    email: "hyderabad.tech@bostoninstitute.org",
    lat: 17.4483,
    lng: 78.3741
  },
  {
    id: "in-chennai",
    name: "Chennai - Nungambakkam Campus - School of Data Science",
    school: "Boston School of Data Science",
    country: "India",
    city: "Chennai",
    address: "12 Khader Nawaz Khan Rd, Nungambakkam, Chennai, Tamil Nadu - 600006",
    phone: "+91 44 4922 3344",
    email: "chennai.data@bostoninstitute.org",
    lat: 13.0607,
    lng: 80.2462
  },
  {
    id: "in-pune",
    name: "Pune - Koregaon Park Campus - School of Finance",
    school: "Boston School of Finance",
    country: "India",
    city: "Pune",
    address: "6th Floor, Jewel Square, Koregaon Park Road, Pune, Maharashtra - 411001",
    phone: "+91 20 6711 0099",
    email: "pune.finance@bostoninstitute.org",
    lat: 18.5362,
    lng: 73.8940
  },
  {
    id: "in-kurnool",
    name: "Kurnool - City Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Kurnool",
    address: "40/320-1, RS Road, Near Flyover, Kurnool, Andhra Pradesh - 518004",
    phone: "+91 8518 223344",
    email: "kurnool.tech@bostoninstitute.org",
    lat: 15.8281,
    lng: 78.0373
  },
  {
    id: "in-gurugram",
    name: "Gurugram - Cyber City Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Gurugram",
    address: "Building 10C, DLF Cyber City, Phase 2, Gurugram, Haryana - 122002",
    phone: "+91 124 4988 777",
    email: "gurugram.tech@bostoninstitute.org",
    lat: 28.4950,
    lng: 77.0878
  },
  {
    id: "in-nagpur",
    name: "Nagpur - Civil Lines Campus - School of Management",
    school: "Boston School of Management",
    country: "India",
    city: "Nagpur",
    address: "Temple Road, Civil Lines, Nagpur, Maharashtra - 440001",
    phone: "+91 712 2555 111",
    email: "nagpur.mgmt@bostoninstitute.org",
    lat: 21.1524,
    lng: 79.0801
  },
  {
    id: "in-coimbatore",
    name: "Coimbatore - RS Puram Campus - School of Finance",
    school: "Boston School of Finance",
    country: "India",
    city: "Coimbatore",
    address: "DB Road, RS Puram, Coimbatore, Tamil Nadu - 641002",
    phone: "+91 422 4333 222",
    email: "coimbatore.finance@bostoninstitute.org",
    lat: 11.0117,
    lng: 76.9532
  },
  {
    id: "in-trivandrum",
    name: "Trivandrum - Technopark Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Trivandrum",
    address: "Amstor House, Technopark Phase I, Trivandrum, Kerala - 695581",
    phone: "+91 471 2700 300",
    email: "trivandrum.tech@bostoninstitute.org",
    lat: 8.5581,
    lng: 76.8808
  },
  {
    id: "in-indore",
    name: "Indore - Vijay Nagar Campus - School of Animation & Design",
    school: "Boston School of Animation & Design",
    country: "India",
    city: "Indore",
    address: "Scheme No 54, Vijay Nagar, Indore, Madhya Pradesh - 452010",
    phone: "+91 731 4999 888",
    email: "indore.design@bostoninstitute.org",
    lat: 22.7533,
    lng: 75.8937
  },
  {
    id: "in-bhilai",
    name: "Bhilai - Civic Centre Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "India",
    city: "Bhilai",
    address: "Civic Centre, Area 4, Bhilai, Chhattisgarh - 490006",
    phone: "+91 788 2211 444",
    email: "bhilai.tech@bostoninstitute.org",
    lat: 21.1912,
    lng: 81.3501
  },

  // Pakistan
  {
    id: "pk-karachi",
    name: "Karachi - Clifton Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "Pakistan",
    city: "Karachi",
    address: "Block 4, Clifton, Karachi, Pakistan",
    phone: "+92 21 3583 0444",
    email: "karachi.tech@bostoninstitute.org",
    lat: 24.8138,
    lng: 67.0305
  },

  // Nigeria
  {
    id: "ng-lagos",
    name: "Lagos - Victoria Island Campus - School of Technology & AI",
    school: "Boston School of Technology & AI",
    country: "Nigeria",
    city: "Lagos",
    address: "Adetokunbo Ademola St, Victoria Island, Lagos, Nigeria",
    phone: "+234 1 270 0100",
    email: "lagos.tech@bostoninstitute.org",
    lat: 6.4281,
    lng: 3.4219
  }
];

// Reference coordinates for fly-to zooming/panning
const REGION_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  "All": { lat: 20.0, lng: 12.0, zoom: 2 },
  "United States": { lat: 39.8283, lng: -98.5795, zoom: 4 },
  "United Kingdom": { lat: 55.3781, lng: -3.4360, zoom: 5 },
  "United Arab Emirates": { lat: 23.4241, lng: 53.8478, zoom: 7 },
  "South Africa": { lat: -30.5595, lng: 22.9375, zoom: 5 },
  "India": { lat: 20.5937, lng: 78.9629, zoom: 5 },
  "Pakistan": { lat: 30.3753, lng: 69.3451, zoom: 5 },
  "Nigeria": { lat: 9.0820, lng: 8.6753, zoom: 6 },
  "Boston": { lat: 42.3578, lng: -71.0583, zoom: 12 },
  "New York": { lat: 40.7505, lng: -73.9808, zoom: 12 },
  "Chicago": { lat: 41.8827, lng: -87.6227, zoom: 12 },
  "San Francisco": { lat: 37.7946, lng: -122.3999, zoom: 12 },
  "London": { lat: 51.5146, lng: -0.0803, zoom: 12 },
  "Dubai": { lat: 25.1972, lng: 55.2744, zoom: 12 },
  "Johannesburg": { lat: -26.1076, lng: 28.0567, zoom: 12 },
  "Pretoria": { lat: -25.7479, lng: 28.2379, zoom: 12 },
  "Durban": { lat: -29.8587, lng: 31.0218, zoom: 12 },
  "Mumbai": { lat: 19.1158, lng: 72.8727, zoom: 12 },
  "Delhi": { lat: 28.6304, lng: 77.2177, zoom: 12 },
  "Bengaluru": { lat: 12.9738, lng: 77.6119, zoom: 12 },
  "Chennai": { lat: 13.0607, lng: 80.2462, zoom: 12 },
  "Pune": { lat: 18.5362, lng: 73.8940, zoom: 12 },
  "Kurnool": { lat: 15.8281, lng: 78.0373, zoom: 12 },
  "Gurugram": { lat: 28.4950, lng: 77.0878, zoom: 12 },
  "Nagpur": { lat: 21.1524, lng: 79.0801, zoom: 12 },
  "Coimbatore": { lat: 11.0117, lng: 76.9532, zoom: 12 },
  "Trivandrum": { lat: 8.5581, lng: 76.8808, zoom: 12 },
  "Indore": { lat: 22.7533, lng: 75.8937, zoom: 12 },
  "Bhilai": { lat: 21.1912, lng: 81.3501, zoom: 12 },
  "Karachi": { lat: 24.8138, lng: 67.0305, zoom: 12 },
  "Lagos": { lat: 6.4281, lng: 3.4219, zoom: 12 }
};

export default function Campus() {
  // State variables
  const [selectedSchool, setSelectedSchool] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCampusId, setActiveCampusId] = useState<string | null>(null);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");

  // DOM Refs for carousel scrolling
  const carouselRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<any>(null);
  const markersGroupRef = useRef<any[]>([]);

  // Filter logic
  const filteredCampuses = CAMPUS_DATA.filter(campus => {
    const matchSchool = selectedSchool === "All" || campus.school === selectedSchool;
    const matchCountry = selectedCountry === "All" || campus.country === selectedCountry;
    const matchCity = selectedCity === "All" || campus.city === selectedCity;
    const matchSearch = searchQuery.trim() === "" || 
      campus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campus.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campus.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campus.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSchool && matchCountry && matchCity && matchSearch;
  });

  // Carousel Scroll handler
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Setup/Initialize Leaflet Map
  useEffect(() => {
    // Dynamically inject Leaflet stylesheet
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Dynamically inject Leaflet JS library
    const scriptId = 'leaflet-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initLeafletMap();
      };
      document.body.appendChild(script);
    } else if ((window as any).L) {
      initLeafletMap();
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  // Set up the Leaflet Map instance
  const initLeafletMap = () => {
    const L = (window as any).L;
    if (!L || leafletMapInstance.current) return;

    // Create Map at reference coordinates (Global View)
    leafletMapInstance.current = L.map(mapContainerRef.current, {
      center: [20.0, 12.0],
      zoom: 2,
      zoomControl: false // custom position below
    });

    // Add scale and custom zoom control location
    L.control.zoom({ position: 'topright' }).addTo(leafletMapInstance.current);

    // Default tile layer
    updateTileLayer(mapType);
    
    // Draw initial markers
    renderMarkers();
  };

  // Map layer toggling
  const updateTileLayer = (type: "standard" | "satellite") => {
    const L = (window as any).L;
    if (!L || !leafletMapInstance.current) return;

    // Remove existing tile layers if any
    leafletMapInstance.current.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        leafletMapInstance.current.removeLayer(layer);
      }
    });

    let tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    if (type === "satellite") {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: attribution
    }).addTo(leafletMapInstance.current);
  };

  // Re-run layer updates if mapType changes
  useEffect(() => {
    updateTileLayer(mapType);
  }, [mapType]);

  // Update Map Markers on Filter or dataset change
  const renderMarkers = () => {
    const L = (window as any).L;
    if (!L || !leafletMapInstance.current) return;

    // Remove existing markers
    markersGroupRef.current.forEach(m => m.remove());
    markersGroupRef.current = [];

    // Red Location pin SVG (replicating original pins)
    const customIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-red-500/20 rounded-full animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9 text-red-600 drop-shadow-lg z-10">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.702 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
        </div>
      `,
      className: 'custom-leaflet-pin',
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    });

    const activeIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center scale-125 transition-transform duration-300">
          <div class="absolute w-12 h-12 bg-indigo-500/30 rounded-full animate-ping"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-indigo-700 drop-shadow-2xl z-10">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.702 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
        </div>
      `,
      className: 'custom-leaflet-pin-active',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    filteredCampuses.forEach(campus => {
      const isSelected = activeCampusId === campus.id;
      const marker = L.marker([campus.lat, campus.lng], { 
        icon: isSelected ? activeIcon : customIcon 
      }).addTo(leafletMapInstance.current);

      // Create rich detailed tooltip/popup
      const popupContent = `
        <div class="p-3 max-w-sm rounded-lg font-sans">
          <h4 class="font-bold text-gray-900 text-sm mb-1 leading-tight">${campus.name}</h4>
          <p class="text-xs text-indigo-600 font-semibold mb-2">${campus.school}</p>
          <div class="flex items-center text-xs text-gray-600 gap-1 mb-1">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${campus.address}</span>
          </div>
          <div class="flex items-center text-xs text-gray-600 gap-1 mb-3">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span>${campus.phone}</span>
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${campus.lat},${campus.lng}" 
             target="_blank" 
             rel="noreferrer"
             class="inline-flex items-center justify-center gap-1.5 w-full bg-indigo-600 text-white font-semibold py-1.5 px-3 rounded text-xs hover:bg-indigo-700 transition">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            Directions on Google Maps
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });

      // Click to trigger active states
      marker.on('click', () => {
        setActiveCampusId(campus.id);
        // Scroll to card ID in directory
        const element = document.getElementById(`card-${campus.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });

      markersGroupRef.current.push(marker);
    });
  };

  // Re-run marker renderer on data or focus changes
  useEffect(() => {
    renderMarkers();
  }, [filteredCampuses, activeCampusId]);

  // Handle focus changes (Fly-To camera animations)
  const flyToRegion = (regionName: string) => {
    const L = (window as any).L;
    if (!L || !leafletMapInstance.current) return;

    const target = REGION_COORDINATES[regionName];
    if (target) {
      leafletMapInstance.current.flyTo([target.lat, target.lng], target.zoom, {
        duration: 1.8,
        easeLinearity: 0.25
      });
    }
  };

  // Triggers camera change on country/city selection
  useEffect(() => {
    if (selectedCity !== "All") {
      flyToRegion(selectedCity);
    } else if (selectedCountry !== "All") {
      flyToRegion(selectedCountry);
    } else {
      flyToRegion("All");
    }
  }, [selectedCountry, selectedCity]);

  // Handle clicking a card: center map and highlight pin
  const handleSelectCampus = (campus: Campus) => {
    setActiveCampusId(campus.id);
    const L = (window as any).L;
    if (L && leafletMapInstance.current) {
      leafletMapInstance.current.setView([campus.lat, campus.lng], 14, {
        animate: true,
        duration: 1.2
      });

      // Find the corresponding marker and open popup
      const index = filteredCampuses.findIndex(c => c.id === campus.id);
      if (index !== -1 && markersGroupRef.current[index]) {
        markersGroupRef.current[index].openPopup();
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-500 selection:text-white antialiased">
      {/* HEADER SECTION */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-900 text-white p-2 rounded-xl shadow-md">
              <Compass className="w-6 h-6 animate-spin-slow text-indigo-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-indigo-950">
                Boston Institute of Analytics
              </h1>
              <p className="text-xs text-gray-500">Global Campus Interactive Directory</p>
            </div>
          </div>

          {/* Search bar inside header */}
          {/* <div className="relative max-w-xs w-full hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search campuses, cities, addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </header> */} 

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* COUNTRIES ROW */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-indigo-950 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Globe className="w-4 h-4 text-indigo-600" /> Countries
          </span>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => {
              const isActive = selectedCountry === country;
              return (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setSelectedCity("All"); // Reset city when changing country
                    setActiveCampusId(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-800 border-2 border-indigo-200 shadow-sm'
                      : 'bg-slate-50 text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-slate-100'
                  }`}
                >
                  {country}
                </button>
              );
            })}
          </div>
        </div>

        {/* GRID LAYOUT: CITIES SIDEBAR + INTERACTIVE MAP & DIRECTORY CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR: CITIES LIST */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col max-h-[680px] overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider">Cities</h3>
              <p className="text-xs text-gray-500 mt-1">Select location to zoom map</p>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {CITIES.map((city) => {
                const isActive = selectedCity === city;
                // Highlight city only if country context aligns, or if selecting "All"
                const mappedCountry = CAMPUS_DATA.find(c => c.city === city)?.country;
                const isHidden = selectedCountry !== "All" && mappedCountry && mappedCountry !== selectedCountry && city !== "All";

                if (isHidden) return null;

                return (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setActiveCampusId(null);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-950 text-white font-semibold border-l-4 border-indigo-400'
                        : 'text-gray-700 hover:bg-slate-50 hover:text-indigo-900'
                    }`}
                  >
                    <span>{city}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDEBAR: MAP & CARDS GRID */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* SEARCH FOR MOBILE */}
            <div className="relative md:hidden">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search campuses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>

            {/* DYNAMIC LEAFLET GLOBAL MAP CONTAINER */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Map header control bar */}
              <div className="absolute top-4 left-4 z-[400] flex bg-white/95 backdrop-blur rounded-xl shadow-md border border-gray-200/50 p-1 font-medium text-xs">
                <button
                  onClick={() => setMapType("standard")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mapType === "standard" 
                      ? 'bg-indigo-600 text-white font-semibold' 
                      : 'text-gray-600 hover:bg-slate-100'
                  }`}
                >
                  Map view
                </button>
                <button
                  onClick={() => setMapType("satellite")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mapType === "satellite" 
                      ? 'bg-indigo-600 text-white font-semibold' 
                      : 'text-gray-600 hover:bg-slate-100'
                  }`}
                >
                  Satellite view
                </button>
              </div>

              {/* Leaflet container */}
              <div 
                ref={mapContainerRef} 
                className="h-[380px] sm:h-[450px] w-full z-10"
              />

              {/* Tiny helpful warning footer on map */}
              <div className="absolute bottom-2 left-2 z-[400] bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-gray-500 shadow border border-gray-100">
                🗺️ Markers dynamic. Click for Google Map routes.
              </div>
            </div>

            {/* CAMPUSES LISTING CARD GRID */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
                  <span>Campus Locations</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {filteredCampuses.length} {filteredCampuses.length === 1 ? 'Campus' : 'Campuses'} found
                  </span>
                </h2>
              </div>

              {filteredCampuses.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm text-gray-500">
                  <Info className="w-10 h-10 mx-auto text-indigo-400 mb-2" />
                  <p className="font-semibold text-gray-700">No campuses matched your search criteria.</p>
                  <p className="text-sm text-gray-400 mt-1">Try clearing your search query or selecting "All" on countries/cities.</p>
                  <button 
                    onClick={() => {
                      setSelectedSchool("All");
                      setSelectedCountry("All");
                      setSelectedCity("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCampuses.map((campus) => {
                    const isSelected = activeCampusId === campus.id;
                    // Prepare live inline miniature OpenStreetMap url
                    const bboxDelta = 0.005;
                    const minLng = campus.lng - bboxDelta;
                    const minLat = campus.lat - bboxDelta;
                    const maxLng = campus.lng + bboxDelta;
                    const maxLat = campus.lat + bboxDelta;
                    const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${campus.lat}%2C${campus.lng}`;

                    return (
                      <div
                        key={campus.id}
                        id={`card-${campus.id}`}
                        onClick={() => handleSelectCampus(campus)}
                        className={`bg-white rounded-2xl p-4 border transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col md:flex-row gap-4 ${
                          isSelected 
                            ? 'border-indigo-600 ring-2 ring-indigo-600/15' 
                            : 'border-gray-200/80 hover:border-indigo-300'
                        }`}
                      >
                        {/* Interactive miniature map embed */}
                        <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-gray-100 relative group">
                          <iframe
                            title={`Map of ${campus.name}`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={osmEmbedUrl}
                            className="pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                            <span className="p-1.5 rounded-full bg-red-600 text-white shadow shadow-red-600/30">
                              <MapPin className="w-4 h-4 fill-white text-red-600" />
                            </span>
                          </div>
                        </div>

                        {/* Text info and actions */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-indigo-900 transition-colors">
                                {campus.name}
                              </h3>
                              <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                            </div>
                            
                            <p className="text-[11px] font-semibold text-indigo-600 mt-1 uppercase tracking-wider">
                              {campus.school}
                            </p>
                            
                            <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                              <span className="font-semibold text-gray-400 mt-0.5">Addr:</span>
                              <span className="line-clamp-2">{campus.address}</span>
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex flex-wrap gap-2 items-center justify-between">
                            <div className="flex flex-col text-[10px] text-gray-500">
                              <span className="flex items-center gap-1">
                                <Phone className="w-2.5 h-2.5 text-slate-400" /> {campus.phone}
                              </span>
                              <span className="flex items-center gap-1 mt-0.5">
                                <Mail className="w-2.5 h-2.5 text-slate-400" /> {campus.email}
                              </span>
                            </div>

                            {/* Direct dynamic google maps routes */}
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${campus.lat},${campus.lng}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg transition"
                            >
                              <span>Route on Google Maps</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}