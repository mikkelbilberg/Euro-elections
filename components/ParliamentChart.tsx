'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import itemSeries from 'highcharts/modules/item-series';
import accessibility from 'highcharts/modules/accessibility';
import { motion, AnimatePresence } from 'framer-motion';

// Sikker initialisering for Next.js og Turbopack
if (typeof window !== 'undefined') {
  // Turbopack gemmer nogle gange funktionen inde i et ".default" objekt. Vi tjekker for begge dele.
  const initItemSeries = (itemSeries as any).default || itemSeries;
  const initAccessibility = (accessibility as any).default || accessibility;
  
  if (typeof initItemSeries === 'function') initItemSeries(Highcharts);
  if (typeof initAccessibility === 'function') initAccessibility(Highcharts);
}

export type Party = {
  id: string;
  name: string;
  seats: number;
  color: string;
  euGroup?: string;
  flagUrl?: string;
};

interface ParliamentChartProps {
  countryName: string;
  totalSeats: number;
  parties: Party[];
  electoralNote?: string;
}

export default function ParliamentChart({ countryName, totalSeats, parties, electoralNote }: ParliamentChartProps) {
  const [coalitionIds, setCoalitionIds] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [usesLeft, setUsesLeft] = useState(5);
  
  // Load saved uses from local storage on first render to prevent refresh cheating
  useEffect(() => {
    const savedUses = localStorage.getItem('euro_ai_uses');
    if (savedUses !== null) {
      setUsesLeft(parseInt(savedUses, 10));
    }
  }, []);

  useEffect(() => {
    setCoalitionIds([]);
    setAiAnalysis(null);
  }, [countryName]);

  const majorityThreshold = Math.floor(totalSeats / 2) + 1;
  
  const coalitionSeats = useMemo(() => {
    return parties
      .filter(p => coalitionIds.includes(p.id))
      .reduce((sum, p) => sum + p.seats, 0);
  }, [coalitionIds, parties]);

  const hasMajority = coalitionSeats >= majorityThreshold;
  const progressPercentage = Math.min((coalitionSeats / majorityThreshold) * 100, 100);

  const toggleParty = (id: string) => {
    setCoalitionIds(prev => {
      const newIds = prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id];
      setAiAnalysis(null); 
      return newIds;
    });
  };

  const handleAnalyze = async () => {
    if (coalitionIds.length === 0 || usesLeft <= 0) return;
    
    setIsAnalyzing(true);
    setAiAnalysis(null);

    // Deduct one use and save to local storage
    const newUses = usesLeft - 1;
    setUsesLeft(newUses);
    localStorage.setItem('euro_ai_uses', newUses.toString());

    const selectedParties = parties.filter(p => coalitionIds.includes(p.id));

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryName, coalitionSeats, majorityThreshold, parties: selectedParties })
      });
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch (error) {
      setAiAnalysis("Error communicating with the AI. Ensure your API key is valid.");
      // Refund the use if the API call failed
      setUsesLeft(usesLeft);
      localStorage.setItem('euro_ai_uses', usesLeft.toString());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sortedParties = [...parties].sort((a, b) => {
    const aSelected = coalitionIds.includes(a.id);
    const bSelected = coalitionIds.includes(b.id);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    if (aSelected && bSelected) return b.seats - a.seats;
    return parties.findIndex(p => p.id === a.id) - parties.findIndex(p => p.id === b.id);
  });

  const chartData = sortedParties.map(party => ({
    name: party.name,
    y: party.seats,
    color: coalitionIds.includes(party.id) || coalitionIds.length === 0 ? party.color : '#FFFFFF', 
  }));

  const options: Highcharts.Options = {
    chart: { type: 'item', backgroundColor: 'transparent', animation: true },
    title: { text: '' },
    legend: { enabled: false },
    series: [{
      type: 'item',
      name: 'Seats',
      data: chartData,
      dataLabels: { enabled: false },
      center: ['50%', '85%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90
    }],
    tooltip: { 
      backgroundColor: '#1e293b',
      style: { color: '#f8fafc' },
      borderWidth: 0,
      pointFormat: '<b>{point.y}</b> seats' 
    },
    credits: { enabled: false }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
      
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
          <h2 className="text-3xl font-light tracking-wide text-white mb-2">{countryName}</h2>
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-6">Parliamentary Seat Distribution</p>
          
          <div className="relative h-80 -mt-4">
             <HighchartsReact highcharts={Highcharts} options={options} updateArgs={[true, true, true]} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {parties.map(party => {
            const isSelected = coalitionIds.includes(party.id);
            return (
              <button
                key={party.id}
                onClick={() => toggleParty(party.id)}
                className={`p-4 rounded-xl border-t-4 text-left transition-all duration-300 flex flex-col justify-between h-24 shadow-lg hover:-translate-y-1 ${isSelected ? 'bg-slate-800 border-x border-b border-slate-600' : 'bg-slate-950/80 border-transparent opacity-70 hover:opacity-100'}`}
                style={{ borderTopColor: party.color }}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="font-semibold text-slate-100 text-sm pr-2 leading-tight line-clamp-2">{party.name}</div>
                  {party.flagUrl ? (
                    <img src={party.flagUrl} alt="Flag" className="w-5 h-5 rounded-full object-cover border border-slate-700 shrink-0" />
                  ) : party.euGroup ? (
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-[9px] font-bold text-slate-300 flex items-center justify-center border border-slate-600 shrink-0" title={`EU Group: ${party.euGroup}`}>
                      {party.euGroup}
                    </div>
                  ) : null}
                </div>
                <div className="text-slate-400 font-mono text-sm">{party.seats} seats</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl flex flex-col h-full">
          <h3 className="text-lg font-medium tracking-widest uppercase text-slate-400 mb-6">Coalition Builder</h3>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 font-mono">
              <span className="text-slate-300">Selected: {coalitionSeats}</span>
              <span className="text-slate-500">Target: {majorityThreshold}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div 
                className={`h-full rounded-full ${hasMajority ? 'bg-emerald-500' : 'bg-blue-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            {hasMajority && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 text-xs font-bold mt-2 text-right uppercase tracking-wider">
                Majority Achieved
              </motion.p>
            )}
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={coalitionIds.length === 0 || isAnalyzing || usesLeft <= 0}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex flex-col items-center justify-center gap-1 mb-6 ${coalitionIds.length === 0 || usesLeft <= 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-purple-500/25'}`}
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  <span>AI Analysis</span>
                </div>
                <span className="text-xs font-medium opacity-80">
                  {usesLeft > 0 ? `${usesLeft} uses left` : 'Out of uses'}
                </span>
              </>
            )}
          </button>

          <AnimatePresence>
            {aiAnalysis && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex-1 bg-slate-950/50 border border-purple-500/20 rounded-xl p-5 overflow-y-auto"
              >
                <div className="text-slate-300 text-sm space-y-3 whitespace-pre-line leading-relaxed font-sans">
                  {aiAnalysis}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {electoralNote && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 text-slate-400 text-xs leading-relaxed shadow-inner">
            <span className="text-blue-400 font-bold uppercase tracking-wider block mb-1">System Note</span>
            {electoralNote}
          </div>
        )}
      </div>

    </div>
  );
}