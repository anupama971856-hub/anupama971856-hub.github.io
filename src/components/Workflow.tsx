"use client";

import React, { useEffect, useState } from "react";
import { Camera, Cpu, Eye, BarChart2, Layers, Zap } from "lucide-react";

const STEPS = [
  { Icon: Camera,  label: "Camera Feed",     desc: "High-res RTSP streams from edge sensors" },
  { Icon: Eye,     label: "Computer Vision", desc: "Frame decoding and lane segmentation" },
  { Icon: Layers,  label: "Object Detection",desc: "Multi-class YOLO v8 inference" },
  { Icon: BarChart2, label: "Density Analysis", desc: "Spatial flow density computation" },
  { Icon: Cpu,     label: "Decision Engine", desc: "Optimal cycle calculation" },
  { Icon: Zap,     label: "Smart Signal",    desc: "Adaptive signal dispatch" },
];

export default function Workflow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        padding: "96px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">Processing Pipeline</div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 14,
            }}
          >
            AI Data Processing Workflow
          </h2>
          <p style={{ fontSize: 15, color: "#BDBDBD", maxWidth: 480, margin: "0 auto" }}>
            From optical input to intersection signal output — the full neural pipeline.
          </p>
        </div>

        {/* Steps row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {STEPS.map(({ Icon, label, desc }, i) => (
            <React.Fragment key={label}>
              {/* Step card */}
              <div
                style={{
                  flex: 1,
                  minWidth: 140,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 12px",
                  transition: "opacity 0.3s",
                  opacity: i <= active ? 1 : 0.35,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: `2px solid ${i === active ? "#8B5CF6" : "rgba(255,255,255,0.08)"}`,
                    background: i === active ? "rgba(139,92,246,0.15)" : "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: i === active ? "#8B5CF6" : "#6B7280",
                    transition: "all 0.4s ease",
                    boxShadow: i === active ? "0 0 0 4px rgba(139,92,246,0.12), 0 0 20px rgba(139,92,246,0.2)" : "none",
                    marginBottom: 16,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === active ? "#fff" : "#BDBDBD",
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                    transition: "color 0.3s",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5, maxWidth: 130 }}>
                  {desc}
                </div>
              </div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flexShrink: 0,
                    alignSelf: "flex-start",
                    marginTop: 27,
                    width: 32,
                    height: 2,
                    background:
                      i < active
                        ? "linear-gradient(90deg, #8B5CF6, #A78BFA)"
                        : "rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    transition: "background 0.4s ease",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            marginTop: 40,
            height: 2,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
              borderRadius: 2,
              width: `${((active + 1) / STEPS.length) * 100}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            textAlign: "right",
            fontSize: 10,
            fontFamily: "monospace",
            color: "#6B7280",
          }}
        >
          Stage {active + 1} / {STEPS.length} — {STEPS[active].label}
        </div>
      </div>
    </section>
  );
}
