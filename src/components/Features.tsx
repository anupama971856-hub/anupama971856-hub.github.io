"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Activity,
  Cpu,
  ShieldAlert,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";

const FEATURES = [
  {
    Icon: Camera,
    title: "Real-Time Vehicle Detection",
    desc: "Multi-class object tracking detects cars, cycles, trucks, and pedestrians with 99.4% confidence using YOLO v8.",
  },
  {
    Icon: Activity,
    title: "AI Traffic Density Analysis",
    desc: "Calculates spatial density and flow rates per intersection lane to accurately assess and predict delay dynamics.",
  },
  {
    Icon: Cpu,
    title: "Adaptive Signal Timing",
    desc: "Adapts signal durations dynamically in response to incoming traffic queues — no static preset intervals.",
  },
  {
    Icon: ShieldAlert,
    title: "Emergency Vehicle Priority",
    desc: "Instantly carves green corridors for ambulances and fire trucks, pre-empting standard timing models.",
  },
  {
    Icon: TrendingUp,
    title: "Predictive Traffic Forecasting",
    desc: "Neural network forecasters predict congestion peaks 60 minutes ahead, enabling preemptive grid routing.",
  },
  {
    Icon: LayoutDashboard,
    title: "Live Analytics Dashboard",
    desc: "Gives urban planners and command centres immediate control metrics, alert systems, and live camera feeds.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{ padding: "96px 24px", position: "relative" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">Platform Capabilities</div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              maxWidth: 640,
              margin: "0 auto 16px",
            }}
          >
            Built for Modern Smart Cities
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#BDBDBD",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Traditional fixed-timer grid control is obsolete. TrafficAI senses,
            predicts, and resolves gridlocks before they form.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="card"
              style={{ padding: 28, cursor: "default" }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8B5CF6",
                  marginBottom: 20,
                }}
              >
                <Icon size={20} />
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 14, color: "#BDBDBD", lineHeight: 1.65 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
