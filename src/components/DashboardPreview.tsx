"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ShieldCheck, Activity, MapPin } from "lucide-react";

/* ─── Data ─── */
const densityData = [
  { time: "08:00", density: 85 },
  { time: "10:00", density: 60 },
  { time: "12:00", density: 45 },
  { time: "14:00", density: 50 },
  { time: "16:00", density: 75 },
  { time: "18:00", density: 90 },
  { time: "20:00", density: 40 },
];

const vehicleCountData = [
  { name: "Car", count: 720 },
  { name: "SUV", count: 480 },
  { name: "EV", count: 320 },
  { name: "Truck", count: 180 },
  { name: "Bus", count: 120 },
  { name: "Moto", count: 90 },
];

const signalStatusData = [
  { name: "Active", value: 45 },
  { name: "Holding", value: 55 },
];

const INTERSECTIONS = [
  { name: "Downtown & 5th Ave", flow: "12% Optimal", color: "#10B981" },
  { name: "Broadway Blvd", flow: "38% Moderate", color: "#8B5CF6" },
  { name: "West Gate Freeway", flow: "15% Optimal", color: "#10B981" },
  { name: "Airport Access Rd", flow: "82% Critical", color: "#EF4444" },
];

/* ─── Tooltip style ─── */
const tooltipStyle = {
  contentStyle: {
    background: "#0F0F0F",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: 8,
    fontSize: 11,
    color: "#fff",
  },
  cursor: { stroke: "rgba(139,92,246,0.2)" },
};

/* ─── Shared chart container style ─── */
const chartCard: React.CSSProperties = {
  background: "#111",
  border: "1px solid rgba(139,92,246,0.12)",
  borderRadius: 16,
  padding: "20px 20px 14px",
};

export default function DashboardPreview() {
  const [cameraVehicles, setCameraVehicles] = useState<
    { id: number; left: number; top: number; type: string; w: number; h: number }[]
  >([]);

  /* ─── Simulated bounding boxes ─── */
  useEffect(() => {
    const types = ["Sedan", "SUV", "Tesla", "Truck"];
    const spawn = setInterval(() => {
      const n = Math.floor(Math.random() * 4) + 1;
      setCameraVehicles(
        Array.from({ length: n }, (_, i) => ({
          id: i,
          left: Math.random() * 68 + 8,
          top: Math.random() * 48 + 16,
          type: types[Math.floor(Math.random() * types.length)],
          w: Math.floor(Math.random() * 28) + 38,
          h: Math.floor(Math.random() * 18) + 28,
        }))
      );
    }, 2000);
    return () => clearInterval(spawn);
  }, []);

  return (
    <section
      id="dashboard"
      style={{
        padding: "96px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div>
            <div className="section-label">Operations Center</div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                maxWidth: 520,
              }}
            >
              Enterprise Analytics Dashboard
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#10B981",
              }}
            >
              <ShieldCheck size={13} /> Models Stable
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#A78BFA",
              }}
            >
              <Activity size={13} /> Live Sync
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 20,
            alignItems: "start",
          }}
          className="dash-grid"
        >
          {/* ─ Sidebar: intersection list ─ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B7280",
                marginBottom: 4,
              }}
            >
              Intersections
            </div>
            {INTERSECTIONS.map((n) => (
              <div
                key={n.name}
                className="card"
                style={{ padding: "14px 16px", cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <MapPin size={12} color="#8B5CF6" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                    {n.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: n.color,
                  }}
                >
                  {n.flow}
                </div>
              </div>
            ))}
          </div>

          {/* ─ Chart grid ─ */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
            className="chart-grid"
          >
            {/* Density line chart */}
            <div style={{ ...chartCard, height: 260 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#BDBDBD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Traffic Density %
                </span>
                <span style={{ fontSize: 10, color: "#6B7280" }}>12 hrs</span>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={densityData}>
                  <XAxis dataKey="time" stroke="#333" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#333" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip {...tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="density"
                    stroke="#8B5CF6"
                    strokeWidth={2.5}
                    dot={{ fill: "#8B5CF6", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#A78BFA" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Vehicle bar chart */}
            <div style={{ ...chartCard, height: 260 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#BDBDBD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Vehicle Flow
                </span>
                <span style={{ fontSize: 10, color: "#6B7280" }}>Count</span>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={vehicleCountData}>
                  <XAxis dataKey="name" stroke="#333" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#333" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CCTV feed */}
            <div style={{ ...chartCard, height: 300 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#BDBDBD",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  CCTV Vision Feed
                </span>
                {/* Green kept as live status indicator */}
                <span className="chip-online">Live</span>
              </div>
              <div
                style={{
                  position: "relative",
                  height: "calc(100% - 32px)",
                  background: "#080808",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Grid lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                  }}
                />
                {/* Bounding boxes — kept purple */}
                {cameraVehicles.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      position: "absolute",
                      left: `${c.left}%`,
                      top: `${c.top}%`,
                      width: c.w,
                      height: c.h,
                      border: "1.5px solid rgba(139,92,246,0.7)",
                      background: "rgba(139,92,246,0.05)",
                      borderRadius: 4,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: -14,
                        left: 0,
                        fontSize: 8,
                        fontFamily: "monospace",
                        color: "#A78BFA",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.type} 99%
                    </span>
                  </div>
                ))}
                <span style={{ fontSize: 11, color: "#333", fontFamily: "monospace" }}>
                  CAM-01 · North Avenue
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    background: "rgba(0,0,0,0.8)",
                    padding: "5px 10px",
                    borderRadius: 6,
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: "#6B7280",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span>30.2 FPS</span>
                  <span>YOLO-v8x</span>
                </div>
              </div>
            </div>

            {/* Congestion heatmap + pie */}
            <div style={{ ...chartCard, height: 300, display: "flex", flexDirection: "column", gap: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#BDBDBD",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Daily Congestion Heatmap
              </span>
              {/* Heat cells */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: 5,
                }}
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const isPeak = [8, 9, 17, 18].includes(i);
                  const isMod = [7, 10, 16, 19].includes(i);
                  return (
                    <div
                      key={i}
                      title={`${i}:00`}
                      style={{
                        aspectRatio: "1",
                        borderRadius: 4,
                        background: isPeak
                          ? "#8B5CF6"
                          : isMod
                          ? "rgba(139,92,246,0.4)"
                          : "rgba(255,255,255,0.05)",
                        transition: "background 0.2s",
                        cursor: "default",
                      }}
                    />
                  );
                })}
              </div>

              {/* Signal pie */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                <div style={{ width: 72, height: 72, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={signalStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={22}
                        outerRadius={32}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        <Cell fill="#8B5CF6" />
                        <Cell fill="#1A1A1A" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                    Signal Phase
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 10, fontFamily: "monospace" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#BDBDBD" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", display: "inline-block" }} />
                      Active 45%
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#6B7280" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A1A1A", border: "1px solid #333", display: "inline-block" }} />
                      Hold 55%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .dash-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
