"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Analytics", href: "#analytics" },
  { label: "Database", href: "#database" },
  { label: "Architecture", href: "#architecture" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      role="banner"
    >
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled
            ? "rgba(5, 5, 5, 0.85)"
            : "rgba(15, 15, 15, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: scrolled
            ? "1px solid rgba(139, 92, 246, 0.2)"
            : "1px solid rgba(139, 92, 246, 0.1)",
          borderRadius: "14px",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.06)"
            : "none",
          transition: "all 0.3s ease",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 select-none"
            aria-label="TrafficAI home"
          >
            <span
              className="glow-dot"
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#8B5CF6",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#fff",
              }}
            >
              Traffic<span style={{ color: "#8B5CF6" }}>AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#BDBDBD",
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "color 0.18s, background 0.18s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#fff";
                  (e.target as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#BDBDBD";
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="#dashboard"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: "8px 18px", fontSize: 13 }}
          >
            Launch Dashboard
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#BDBDBD",
                borderRadius: 2,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#BDBDBD",
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#BDBDBD",
                borderRadius: 2,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: "hidden",
                borderTop: "1px solid rgba(139,92,246,0.1)",
              }}
            >
              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#BDBDBD",
                      padding: "10px 12px",
                      borderRadius: 8,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#dashboard" className="btn-primary mt-2">
                  Launch Dashboard
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
