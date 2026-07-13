"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, ArrowRight } from "lucide-react";

/* ─── Types ─── */
type Vehicle = {
  id: number;
  dir: "N" | "S" | "E" | "W";
  x: number;
  y: number;
};

export default function Hero() {
  /* ─── Traffic light state ─── */
  const [nsGreen, setNsGreen] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  /* Cycle lights every 4 s */
  useEffect(() => {
    const t = setInterval(() => setNsGreen((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);

  /* Spawn vehicles */
  useEffect(() => {
    const spawn = setInterval(() => {
      const dirs: Vehicle["dir"][] = ["N", "S", "E", "W"];
      const dir = dirs[Math.floor(Math.random() * 4)];
      let x = 0,
        y = 0;
      if (dir === "N") { x = 188; y = -14; }
      else if (dir === "S") { x = 206; y = 314; }
      else if (dir === "E") { x = 414; y = 138; }
      else { x = -14; y = 156; }
      setVehicles((p) => [...p, { id: Date.now() + Math.random(), dir, x, y }]);
    }, 1100);
    return () => clearInterval(spawn);
  }, []);

  /* Move vehicles */
  useEffect(() => {
    const move = setInterval(() => {
      setVehicles((prev) =>
        prev
          .map((v) => {
            let nx = v.x,
              ny = v.y,
              stop = false;
            if (v.dir === "N") {
              if (!nsGreen && v.y < 115 && v.y + 2 >= 115) stop = true;
              else ny += 2;
            } else if (v.dir === "S") {
              if (!nsGreen && v.y > 185 && v.y - 2 <= 185) stop = true;
              else ny -= 2;
            } else if (v.dir === "E") {
              if (nsGreen && v.x > 235 && v.x - 2 <= 235) stop = true;
              else nx -= 2;
            } else {
              if (nsGreen && v.x < 165 && v.x + 2 >= 165) stop = true;
              else nx += 2;
            }
            return { ...v, x: nx, y: ny };
          })
          .filter((v) => v.x > -30 && v.x < 430 && v.y > -30 && v.y < 330)
      );
    }, 30);
    return () => clearInterval(move);
  }, [nsGreen]);

  /* ─── Render ─── */
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient purple glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="grid-hero"
      >
        {/* ─── LEFT: Copy ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge"
            style={{ marginBottom: 28, width: "fit-content" }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#8B5CF6",
                flexShrink: 0,
              }}
            />
            Smart City Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              marginBottom: 24,
              color: "#fff",
            }}
          >
            AI-Powered{" "}
            <span className="text-gradient">
              Traffic Management
            </span>{" "}
            System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#BDBDBD",
              maxWidth: 500,
              marginBottom: 40,
            }}
          >
            Real-time traffic intelligence powered by computer vision, machine
            learning, and predictive analytics — built for smarter, safer cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a href="#dashboard" className="btn-primary">
              Live Dashboard <ArrowRight size={14} />
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: 32,
            }}
          >
            {[
              { val: "98.7%", label: "Detection Accuracy" },
              { val: "4ms", label: "Avg Inference" },
              { val: "34%", label: "Congestion Reduced" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.val}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT: Dashboard preview ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* Main card */}
          <div
            className="card"
            style={{
              padding: 24,
              background: "#111111",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
                paddingBottom: 14,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 8px rgba(16,185,129,0.6)",
                  }}
                />
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>
                  Node: Sector-Alpha — Live
                </span>
              </div>
              <span className="chip-online">Active</span>
            </div>

            {/* Live intersection simulation */}
            <div
              style={{
                width: "100%",
                height: 260,
                background: "#0a0a0a",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Roads */}
              <div
                style={{
                  position: "absolute",
                  left: 176,
                  width: 48,
                  height: "100%",
                  background: "#161616",
                  borderLeft: "1px dashed rgba(255,255,255,0.06)",
                  borderRight: "1px dashed rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 124,
                  height: 48,
                  width: "100%",
                  background: "#161616",
                  borderTop: "1px dashed rgba(255,255,255,0.06)",
                  borderBottom: "1px dashed rgba(255,255,255,0.06)",
                }}
              />
              {/* Centre dashes */}
              <div
                style={{
                  position: "absolute",
                  left: 199,
                  top: 0,
                  width: 2,
                  height: "100%",
                  borderLeft: "1.5px dashed rgba(255,255,255,0.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 147,
                  left: 0,
                  height: 2,
                  width: "100%",
                  borderTop: "1.5px dashed rgba(255,255,255,0.12)",
                }}
              />

              {/* Traffic lights — green/red kept as status indicators */}
              {/* NS lights */}
              <div
                style={{
                  position: "absolute",
                  top: 102,
                  left: 158,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: nsGreen ? "#10B981" : "#EF4444",
                  boxShadow: `0 0 8px ${nsGreen ? "#10B981" : "#EF4444"}`,
                  transition: "all 0.4s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 102,
                  right: 158,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: nsGreen ? "#10B981" : "#EF4444",
                  boxShadow: `0 0 8px ${nsGreen ? "#10B981" : "#EF4444"}`,
                  transition: "all 0.4s",
                }}
              />
              {/* EW lights */}
              <div
                style={{
                  position: "absolute",
                  top: 102,
                  right: 158,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: !nsGreen ? "#10B981" : "#EF4444",
                  boxShadow: `0 0 8px ${!nsGreen ? "#10B981" : "#EF4444"}`,
                  transition: "all 0.4s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 102,
                  left: 158,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: !nsGreen ? "#10B981" : "#EF4444",
                  boxShadow: `0 0 8px ${!nsGreen ? "#10B981" : "#EF4444"}`,
                  transition: "all 0.4s",
                }}
              />

              {/* Vehicles */}
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  style={{
                    position: "absolute",
                    left: v.x,
                    top: v.y,
                    width: v.dir === "N" || v.dir === "S" ? 8 : 18,
                    height: v.dir === "N" || v.dir === "S" ? 18 : 8,
                    background: "#8B5CF6",
                    borderRadius: 3,
                    boxShadow: "0 0 6px rgba(139,92,246,0.6)",
                    transition: "left 0.03s linear, top 0.03s linear",
                  }}
                >
                  {/* Bounding box */}
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      border: "1px solid rgba(139,92,246,0.4)",
                      borderRadius: 4,
                    }}
                  />
                </div>
              ))}

              {/* Model overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 9,
                  fontFamily: "monospace",
                  color: "#8B5CF6",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                YOLO-v8x · 30 FPS
              </div>
            </div>
          </div>

          {/* Floating widget — latency */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="card animate-float"
            style={{
              position: "absolute",
              right: -28,
              bottom: -20,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#111",
              zIndex: 3,
              minWidth: 160,
            }}
          >
            <div
              style={{
                padding: 8,
                background: "rgba(139,92,246,0.12)",
                borderRadius: 8,
                color: "#8B5CF6",
              }}
            >
              <Cpu size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Latency
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                4.2 ms
              </div>
            </div>
          </motion.div>

          {/* Floating widget — throughput */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
            className="card"
            style={{
              position: "absolute",
              left: -28,
              top: "40%",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#111",
              zIndex: 3,
              minWidth: 172,
            }}
          >
            <div
              style={{
                padding: 8,
                background: "rgba(139,92,246,0.12)",
                borderRadius: 8,
                color: "#8B5CF6",
              }}
            >
              <Activity size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Throughput
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                124 vehicles/min
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 860px) {
          .grid-hero {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
