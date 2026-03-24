'use client';

import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import dynamic from 'next/dynamic';
import type { Party } from '../components/ParliamentChart';

const ParliamentChart = dynamic(() => import('../components/ParliamentChart'), { ssr: false });
import { europeanData } from '../utils/countryData';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const euCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];

const lastElections: Record<string, string> = {
  "Austria": "2024", "Belgium": "2024", "Bulgaria": "2024", "Croatia": "2024", "Cyprus": "2021", "Czechia": "2025", "Denmark": "2022", "Estonia": "2023", "Finland": "2023", "France": "2024", "Germany": "2025", "Greece": "2023", "Hungary": "2022", "Ireland": "2024", "Italy": "2022", "Latvia": "2022", "Lithuania": "2024", "Luxembourg": "2023", "Malta": "2022", "Netherlands": "2023", "Poland": "2023", "Portugal": "2024", "Romania": "2024", "Slovakia": "2023", "Slovenia": "2022", "Spain": "2023", "Sweden": "2022"
};

const euParties: Party[] = [
  { id: 'epp', name: 'EPP', seats: 188, color: '#3399FF' },
  { id: 'sd', name: 'S&D', seats: 136, color: '#FF0000' },
  { id: 'patriots', name: 'Patriots', seats: 84, color: '#000099' },
  { id: 'ecr', name: 'ECR', seats: 78, color: '#0054A5' },
  { id: 'renew', name: 'Renew', seats: 77, color: '#FFD700' },
  { id: 'greens', name: 'Greens', seats: 53, color: '#009900' },
  { id: 'left', name: 'The Left', seats: 46, color: '#990000' },
  { id: 'esn', name: 'ESN', seats: 25, color: '#CCCCCC' }, 
  { id: 'ni', name: 'Non-Inscrits', seats: 33, color: '#808080' }
];

// Scheduled and expected upcoming European elections
// Scheduled and expected upcoming European elections
const allUpcomingElections = [
  { country: "Denmark", date: "2026-03-24" }, // UPDATED: Snap election called!
  { country: "Sweden", date: "2026-09-13" },
  { country: "Latvia", date: "2026-10-03" },
  { country: "Estonia", date: "2027-03-07" },
  { country: "Finland", date: "2027-04-18" },
  { country: "France", date: "2027-04-25" }, 
  { country: "Greece", date: "2027-06-20" },
  { country: "Spain", date: "2027-07-25" },
  { country: "Italy", date: "2027-09-26" },
  { country: "Poland", date: "2027-10-15" },
  { country: "Netherlands", date: "2028-03-15" },
  { country: "Lithuania", date: "2028-10-08" },
  { country: "Ireland", date: "2029-03-01" },
  { country: "EU Parliament", date: "2029-06-07" },
  { country: "Germany", date: "2029-09-23" }
];

export default function EuropeanHubPage() {
  const [activeCountry, setActiveCountry] = useState('EU');
  const [showMap, setShowMap] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false); // NEW STATE

  const handleSelect = (country: string) => {
    setActiveCountry(country);
    setShowMap(false);
  };

  const currentData = useMemo(() => {
    if (activeCountry === 'EU') {
      return { parties: euParties, total: 720, note: undefined, year: "2024" };
    }
    
    const countryInfo = europeanData[activeCountry];
    if (!countryInfo) return { parties: [], total: 0, note: undefined, year: "" };

    return {
      parties: countryInfo.electionParties,
      total: countryInfo.totalSeats,
      note: countryInfo.electoralNote,
      year: lastElections[activeCountry] || ""
    };
  }, [activeCountry]);

  // NEW: Calculate the dynamic 4-year rolling window
  const upcomingFiltered = useMemo(() => {
    const today = new Date();
    const fourYearsFromNow = new Date();
    fourYearsFromNow.setFullYear(today.getFullYear() + 4);

    return allUpcomingElections
      .map(e => ({ ...e, parsedDate: new Date(e.date) }))
      .filter(e => e.parsedDate >= today && e.parsedDate <= fourYearsFromNow)
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  }, []);

  const chartTitle = activeCountry === 'EU' 
    ? "European Parliament (2024)"
    : `${activeCountry} Parliament (${currentData.year})`;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black relative font-sans text-slate-200">
      
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => handleSelect('EU')}
            className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all shadow-lg hover:shadow-blue-500/20 ${activeCountry === 'EU' ? 'border-blue-500 shadow-blue-500/20' : 'border-slate-700 opacity-80'}`}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="EU" className="w-full h-full object-cover" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-widest uppercase text-white">EuroElections</h1>
            <p className="text-xs text-slate-500 font-mono tracking-wider">Data Hub</p>
          </div>
        </div>

        {/* NEW: Added Timeline Button next to Change Nation */}
        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={() => setShowTimeline(true)}
            className="bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 text-white px-5 py-3 rounded-full font-medium tracking-wider text-sm transition-all shadow-lg border border-slate-600/50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Timeline
          </button>
          <button 
            onClick={() => setShowMap(true)}
            className="bg-blue-600/90 backdrop-blur-md hover:bg-blue-500 text-white px-5 py-3 rounded-full font-medium tracking-wider text-sm transition-all shadow-lg border border-blue-500/50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Change Nation
          </button>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen pt-24 pb-12 px-4 sm:px-8">
        <ParliamentChart 
          countryName={chartTitle} 
          totalSeats={currentData.total} 
          parties={currentData.parties}
          electoralNote={currentData.note} 
        />
      </div>

      {/* NEW: Timeline Modal Window */}
      {showTimeline && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/80 border border-slate-700/50 p-6 md:p-8 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Election Timeline</h2>
                <p className="text-sm text-slate-400 font-mono mt-1">Rolling 4-year forecast ({new Date().getFullYear()} - {new Date().getFullYear() + 4})</p>
              </div>
              <button onClick={() => setShowTimeline(false)} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-4 space-y-4">
              {upcomingFiltered.length > 0 ? (
                upcomingFiltered.map((election, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-blue-400 font-mono text-lg font-bold w-32 shrink-0">
                      {election.parsedDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div className="text-slate-200 text-lg font-medium">{election.country}</div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic">No elections scheduled in this window.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {showMap && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/50 border border-slate-700/50 p-6 md:p-8 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Select Region</h2>
                <p className="text-sm text-slate-500 font-mono mt-1">Interactive map of 27 EU member states</p>
              </div>
              <button onClick={() => setShowMap(false)} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="flex-1 bg-black/40 rounded-2xl overflow-hidden relative border border-slate-800/50">
              <button
                onClick={() => handleSelect('EU')}
                className="absolute top-8 left-8 w-20 h-20 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 transition-all flex items-center justify-center text-blue-400 font-bold text-xl z-20 backdrop-blur-md cursor-pointer shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              >
                EU
              </button>

              <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{ rotate: [-15.0, -50.0, 0], scale: 800 }}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = geo.properties.name;
                      const isEU = euCountries.includes(countryName);
                      const isClickable = !!europeanData[countryName];
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => { if (isClickable) handleSelect(countryName); }}
                          style={{
                            default: { fill: isEU ? "#1e293b" : "#0f172a", outline: "none", stroke: "#000000", strokeWidth: 0.5 },
                            hover: { fill: isClickable ? "#3b82f6" : (isEU ? "#2563eb" : "#0f172a"), outline: "none", cursor: isClickable ? "pointer" : "default" },
                            pressed: { fill: "#1d4ed8", outline: "none" }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}