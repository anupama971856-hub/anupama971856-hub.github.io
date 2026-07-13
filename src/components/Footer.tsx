"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#090909] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#8B5CF6] rounded-full shadow-[0_0_8px_#8B5CF6]"></div>
          <span className="text-base font-bold text-white tracking-tight">
            Traffic<span className="text-[#8B5CF6]">AI</span>
          </span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-mono text-gray-500 max-w-md text-center">
          <span>React</span>•
          <span>Next.js</span>•
          <span>Tailwind CSS</span>•
          <span>Framer Motion</span>•
          <span>Recharts</span>•
          <span>PostgreSQL</span>•
          <span>OpenCV</span>•
          <span>YOLO</span>
        </div>

        {/* Copyright */}
        <span className="text-xs text-gray-600">
          © {new Date().getFullYear()} TrafficAI. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
