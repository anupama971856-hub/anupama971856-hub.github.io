"use client";

import React, { useEffect, useState } from "react";
import { Camera, RefreshCw } from "lucide-react";

interface CameraItem {
  id: string;
  name: string;
  count: number;
  density: number;
  lightState: "Green" | "Red" | "Yellow";
}

export default function LiveMonitoring() {
  const [cams, setCams] = useState<CameraItem[]>([
    { id: "CAM-101", name: "Intersection 5th & Main", count: 12, density: 42, lightState: "Green" },
    { id: "CAM-102", name: "North Gateway Blvd", count: 8, density: 24, lightState: "Green" },
    { id: "CAM-103", name: "West Exit Expressway", count: 24, density: 78, lightState: "Red" },
    { id: "CAM-104", name: "Central Station Plaza", count: 6, density: 18, lightState: "Yellow" },
  ]);

  // Fluctuating values simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCams((prev) =>
        prev.map((c) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const newCount = Math.max(0, c.count + delta);
          const newDensity = Math.min(100, Math.max(0, Math.floor(newCount * 3.8)));
          
          let state = c.lightState;
          if (Math.random() < 0.2) {
            state = state === "Green" ? "Yellow" : state === "Yellow" ? "Red" : "Green";
          }

          return { ...c, count: newCount, density: newDensity, lightState: state };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4 text-xs font-semibold text-[#8B5CF6]">
              <Camera size={12} /> Edge Processing Network
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight font-sans">
              Live Edge Monitoring Grids
            </h2>
            <p className="text-[#BDBDBD] text-sm leading-relaxed font-sans">
              Real-time video sensor streams returning local inference metadata from intersection processors.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-semibold text-[#BDBDBD] hover:text-white bg-white/2 border border-white/5 hover:bg-white/5 px-5 py-2.5 rounded-full transition-all duration-300">
            <RefreshCw size={12} className="text-[#8B5CF6]" /> Reset Inference Cycles
          </button>
        </div>

        {/* CCTV Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cams.map((cam) => (
            <div key={cam.id} className="glass-card rounded-[20px] border border-[#8B5CF6]/15 bg-[#0E0E0E]/70 shadow-lg overflow-hidden flex flex-col hover:border-[#8B5CF6]/35 transition-all duration-300">
              
              {/* CCTV Visual Placeholder Screen */}
              <div className="relative aspect-video bg-black/80 flex items-center justify-center border-b border-white/5">
                <div className="absolute left-0 right-0 h-[1px] bg-[#8B5CF6]/20 shadow-[0_0_8px_#8B5CF6]"></div>
                <span className="text-[9px] text-gray-700 font-mono tracking-widest uppercase">Inference Stream</span>
                
                {/* Light lens indicator (Status lights kept red/green/yellow as permitted) */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/85 px-2 py-0.5 rounded border border-white/5 text-[9px] font-mono text-gray-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${cam.lightState === "Green" ? "bg-emerald-400" : cam.lightState === "Yellow" ? "bg-amber-400" : "bg-red-500"}`}></span>
                  {cam.lightState}
                </div>
              </div>

              {/* CCTV Details */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">{cam.name}</h4>
                    <span className="text-[9px] text-gray-500 font-mono">{cam.id}</span>
                  </div>
                  {/* Status indicator kept green as permitted */}
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> Online
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/5 pt-3">
                  <div>
                    <span className="text-gray-500 block">Detections:</span>
                    <span className="font-bold text-white text-xs">{cam.count} vehicles</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Flow Density:</span>
                    <span className={`font-bold text-xs ${cam.density > 60 ? "text-red-400" : cam.density > 30 ? "text-amber-400" : "text-emerald-400"}`}>
                      {cam.density}%
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
