"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  label: string;
  end: number;
  suffix?: string;
  decimals?: boolean;
}

function Counter({ label, end, suffix = "", decimals = false }: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setVal(ease * end);
      if (p < 1) requestAnimationFrame(tick);
      else setVal(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="card"
      style={{ padding: "28px 28px 24px", cursor: "default" }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#6B7280",
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {decimals ? val.toFixed(1) : Math.floor(val).toLocaleString()}
        <span style={{ fontSize: 22, color: "#8B5CF6", marginLeft: 2 }}>
          {suffix}
        </span>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section style={{ padding: "0 24px 80px" }}>
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
        className="stats-grid"
      >
        <Counter label="Vehicles Detected" end={12547} />
        <Counter label="Average Wait Time" end={18} suffix=" sec" />
        <Counter label="Signal Accuracy" end={98.7} suffix="%" decimals />
        <Counter label="Congestion Reduction" end={34} suffix="%" />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
