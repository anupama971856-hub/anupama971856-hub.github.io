"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, BarChart2, Activity } from "lucide-react";

/* ─── Data ─── */
const peakHourData = [
  { hour: "00:00", cars: 120 },
  { hour: "04:00", cars: 80 },
  { hour: "08:00", cars: 980 },
  { hour: "12:00", cars: 600 },
  { hour: "16:00", cars: 1100 },
  { hour: "20:00", cars: 480 },
];

const waitTimeData = [
  { day: "Mon", standard: 52, ai: 22 },
  { day: "Tue", standard: 48, ai: 18 },
  { day: "Wed", standard: 55, ai: 20 },
  { day: "Thu", standard: 61, ai: 24 },
  { day: "Fri", standard: 58, ai: 19 },
  { day: "Sat", standard: 32, ai: 12 },
  { day: "Sun", standard: 28, ai: 10 },
];

const sectorData = [
  { node: "Sector A", rate: 94 },
  { node: "Sector B", rate: 88 },
  { node: "Sector C", rate: 91 },
  { node: "Sector D", rate: 85 },
];

const tt = {
  contentStyle: {
    background: "#0F0F0F",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: 8,
    fontSize: 11,
    color: "#fff",
  },
};

const cardStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid rgba(139,92,246,0.12)",
  borderRadius: 16,
  padding: "20px 20px 14px",
  display: "flex",
  flexDirection: "column",
};

export default function Analytics() {
  return (
    <section
      id="analytics"
      style={{
        padding: "96px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">Analytics</div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 14,
            }}
          >
            Predictive City Analytics
          </h2>
          <p style={{ fontSize: 15, color: "#BDBDBD", maxWidth: 480, margin: "0 auto" }}>
            Historical modelling and real-time comparison of TrafficAI efficiency gains versus standard signal schedules.
          </p>
        </div>

        {/* Charts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
          className="analytics-grid"
        >
          {/* Peak hour area chart */}
          <motion.div
            style={{ ...cardStyle, height: 300 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#BDBDBD", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <TrendingUp size={13} color="#8B5CF6" /> Peak Hour Flow
              </span>
              <span style={{ fontSize: 10, color: "#6B7280" }}>Hourly avg</span>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={peakHourData}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip {...tt} />
                  <Area
                    type="monotone"
                    dataKey="cars"
                    stroke="#8B5CF6"
                    strokeWidth={2.5}
                    fill="url(#areaGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#A78BFA", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Wait time comparison */}
          <motion.div
            style={{ ...cardStyle, height: 300 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#BDBDBD", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <BarChart2 size={13} color="#8B5CF6" /> Wait Times (s)
              </span>
              <span style={{ fontSize: 10, color: "#6B7280" }}>Standard vs AI</span>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waitTimeData} barGap={2}>
                  <XAxis dataKey="day" stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip {...tt} />
                  <Bar dataKey="standard" name="Standard" fill="#1E1E1E" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="ai"       name="TrafficAI" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sector performance — full width */}
          <motion.div
            style={{ ...cardStyle, height: 260, gridColumn: "span 2" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="full-col"
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#BDBDBD", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <Activity size={13} color="#8B5CF6" /> Sector Throughput (%)
              </span>
              <span style={{ fontSize: 10, color: "#6B7280" }}>Intersection performance</span>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} layout="vertical">
                  <XAxis type="number" stroke="#222" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis dataKey="node" type="category" stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip {...tt} />
                  <Bar dataKey="rate" name="Throughput" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .analytics-grid { grid-template-columns: 1fr !important; }
          .full-col { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
