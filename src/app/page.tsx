import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import DashboardPreview from "@/components/DashboardPreview";
import DatabaseSection from "@/components/DatabaseSection";
import Workflow from "@/components/Workflow";
import Architecture from "@/components/Architecture";
import Analytics from "@/components/Analytics";
import LiveMonitoring from "@/components/LiveMonitoring";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#050505", color: "#fff" }}>
      {/* Dot-grid background overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 dot-grid opacity-60"
        aria-hidden="true"
      />

      {/* Purple ambient glow — top left */}
      <div
        className="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <DashboardPreview />
        <DatabaseSection />
        <Workflow />
        <Architecture />
        <Analytics />
        <LiveMonitoring />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
