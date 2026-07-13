"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Eye, Cpu, Database, Server, Monitor, ToggleRight } from "lucide-react";

const LAYERS = [
  {
    label: "Ingestion",
    nodes: [{ Icon: Camera, title: "CCTV Cameras", desc: "High-FPS edge sensors" }],
  },
  {
    label: "Processing",
    nodes: [
      { Icon: Eye,      title: "YOLO Detector",      desc: "Edge frame inference" },
      { Icon: Cpu,      title: "AI Engine",           desc: "Decision model core" },
      { Icon: Database, title: "SQL Database",        desc: "Partitioned event logs" },
      { Icon: Server,   title: "Analytics Server",    desc: "Predictive pipeline" },
    ],
  },
  {
    label: "Output",
    nodes: [
      { Icon: Monitor,     title: "Operations Centre",  desc: "Command & control UI" },
      { Icon: ToggleRight, title: "Smart Signals",      desc: "Adaptive hardware API" },
    ],
  },
];

const nodeCard: React.CSSProperties = {
  background: "#111",
  border: "1px solid rgba(139,92,246,0.12)",
  borderRadius: 14,
  padding: "14px 16px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  transition: "border-color 0.2s, box-shadow 0.2s",
  cursor: "default",
};

export default function Architecture() {
  return (
    <section
      id="architecture"
      style={{ padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">Infrastructure</div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 14,
            }}
          >
            System Architecture
          </h2>
          <p style={{ fontSize: 15, color: "#BDBDBD", maxWidth: 480, margin: "0 auto" }}>
            Scalable edge-to-cloud components coordinating sensor networks with central AI decision models.
          </p>
        </div>

        {/* Architecture columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
          className="arch-grid"
        >
          {LAYERS.map((layer, li) => (
            <div key={layer.label} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Layer label */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  textAlign: li === 2 ? "right" : li === 1 ? "center" : "left",
                  paddingBottom: 4,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {layer.label}
              </div>

              {/* Nodes */}
              {layer.nodes.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
                  style={nodeCard}
                  whileHover={{
                    borderColor: "rgba(139,92,246,0.35)",
                    boxShadow: "0 0 0 1px rgba(139,92,246,0.08), 0 8px 24px rgba(0,0,0,0.4)",
                    y: -3,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8B5CF6",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                      {title}
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .arch-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
