"use client";

import React, { useState } from "react";
import { Database, Terminal, ShieldAlert } from "lucide-react";

/* ─── Data ─── */
const vehiclesData = [
  { id: "VEH-9201", cam: "CAM-102", type: "EV (Tesla)", speed: "42 mph", lane: "Lane 2", conf: "99.4%" },
  { id: "VEH-9202", cam: "CAM-104", type: "Sedan",      speed: "35 mph", lane: "Lane 1", conf: "98.7%" },
  { id: "VEH-9203", cam: "CAM-102", type: "SUV",        speed: "48 mph", lane: "Lane 3", conf: "99.1%" },
  { id: "VEH-9204", cam: "CAM-101", type: "Emergency",  speed: "55 mph", lane: "Lane 2", conf: "99.9%" },
];

const signalsData = [
  { id: "SIG-501", intersection: "Downtown & 5th Ave",     state: "Green", green: "45s", red: "55s", updated: "Just Now" },
  { id: "SIG-502", intersection: "Broadway Blvd Corridor", state: "Red",   green: "30s", red: "60s", updated: "2s ago" },
  { id: "SIG-503", intersection: "West Gate Freeway",      state: "Green", green: "65s", red: "40s", updated: "Just Now" },
  { id: "SIG-504", intersection: "Airport Access Rd",      state: "Red",   green: "20s", red: "80s", updated: "1s ago" },
];

const logsData = [
  { id: "LOG-4091", camera: "CAM-102", count: "14 vehicles", density: "Heavy (68%)",    pred: "High Congestion" },
  { id: "LOG-4092", camera: "CAM-101", count: "4 vehicles",  density: "Light (15%)",    pred: "Flowing Stable" },
  { id: "LOG-4093", camera: "CAM-104", count: "8 vehicles",  density: "Moderate (35%)", pred: "Steady State" },
];

type Tab = "vehicles" | "signals" | "logs";

export default function DatabaseSection() {
  const [tab, setTab] = useState<Tab>("vehicles");

  /* ─── table header configs ─── */
  const headers: Record<Tab, string[]> = {
    vehicles: ["vehicle_id", "camera_id", "type", "speed", "lane", "confidence"],
    signals:  ["signal_id",  "intersection", "state", "green_time", "red_time", "last_updated"],
    logs:     ["log_id",     "camera",       "vehicle_count", "density",  "ai_prediction"],
  };

  return (
    <section
      id="database"
      style={{ padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">
            <Database size={11} style={{ display: "inline", marginRight: 5 }} />
            Data Layer
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 14,
            }}
          >
            Structured Relational Database
          </h2>
          <p style={{ fontSize: 15, color: "#BDBDBD", maxWidth: 520, margin: "0 auto" }}>
            TrafficAI synchronises multi-lane detections into distributed tables for high-frequency analytical processing.
          </p>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: 24,
            alignItems: "start",
          }}
          className="db-layout"
        >
          {/* Left — SQL + info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* SQL block */}
            <div
              className="card"
              style={{ padding: 24 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <Terminal size={13} color="#8B5CF6" />
                PostgreSQL Query
              </div>
              <div className="code-block">
                <span className="kw">SELECT</span> intersection,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">AVG</span>(vehicle_count)<br />
                <span className="kw">FROM</span> traffic_data<br />
                <span className="kw">GROUP BY</span> intersection;<br />
                <br />
                <span className="cm">-- Execution time: 0.12 ms</span>
              </div>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "#6B7280",
                }}
              >
                <span>Connections: 1,208</span>
                <span>Rows: 840,204</span>
              </div>
            </div>

            {/* Info card */}
            <div
              className="card"
              style={{
                padding: "18px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div
                style={{
                  padding: 10,
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: 10,
                  color: "#8B5CF6",
                  flexShrink: 0,
                }}
              >
                <ShieldAlert size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                  Row Write Performance
                </div>
                <div style={{ fontSize: 12, color: "#BDBDBD", lineHeight: 1.6 }}>
                  PostgreSQL partitions logs hourly, achieving up to 14,000 parallel writes per second.
                </div>
              </div>
            </div>
          </div>

          {/* Right — table viewer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Tab switcher */}
            <div
              style={{
                display: "inline-flex",
                background: "#0F0F0F",
                border: "1px solid rgba(139,92,246,0.1)",
                borderRadius: 10,
                padding: 4,
                gap: 2,
                alignSelf: "flex-start",
              }}
            >
              {(["vehicles", "signals", "logs"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.18s",
                    background: tab === t ? "#8B5CF6" : "transparent",
                    color: tab === t ? "#fff" : "#6B7280",
                    textTransform: "capitalize",
                  }}
                >
                  {t === "vehicles" ? "Vehicles" : t === "signals" ? "Signals" : "Logs"}
                </button>
              ))}
            </div>

            {/* Table card */}
            <div
              className="card"
              style={{ overflow: "hidden", maxHeight: 360, overflowY: "auto" }}
            >
              <table className="db-table">
                <thead>
                  <tr>
                    {headers[tab].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab === "vehicles" &&
                    vehiclesData.map((r) => (
                      <tr key={r.id}>
                        <td style={{ color: "#8B5CF6", fontWeight: 700 }}>{r.id}</td>
                        <td>{r.cam}</td>
                        <td style={{ color: "#fff" }}>{r.type}</td>
                        <td>{r.speed}</td>
                        <td>{r.lane}</td>
                        <td style={{ color: "#6B7280" }}>{r.conf}</td>
                      </tr>
                    ))}
                  {tab === "signals" &&
                    signalsData.map((r) => (
                      <tr key={r.id}>
                        <td style={{ color: "#8B5CF6", fontWeight: 700 }}>{r.id}</td>
                        <td>{r.intersection}</td>
                        <td>
                          {/* Green/red kept as status indicators */}
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 10,
                              fontWeight: 700,
                              background:
                                r.state === "Green"
                                  ? "rgba(16,185,129,0.1)"
                                  : "rgba(239,68,68,0.1)",
                              color:
                                r.state === "Green" ? "#10B981" : "#EF4444",
                            }}
                          >
                            {r.state}
                          </span>
                        </td>
                        <td>{r.green}</td>
                        <td>{r.red}</td>
                        <td style={{ color: "#6B7280" }}>{r.updated}</td>
                      </tr>
                    ))}
                  {tab === "logs" &&
                    logsData.map((r) => (
                      <tr key={r.id}>
                        <td style={{ color: "#8B5CF6", fontWeight: 700 }}>{r.id}</td>
                        <td>{r.camera}</td>
                        <td style={{ color: "#fff" }}>{r.count}</td>
                        <td style={{ color: "#A78BFA" }}>{r.density}</td>
                        <td style={{ color: "#6B7280" }}>{r.pred}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .db-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
