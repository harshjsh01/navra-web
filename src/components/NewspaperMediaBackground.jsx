'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NewspaperMediaBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous Marquee Ticker Motion
      gsap.to('.marquee-track-1', {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.marquee-track-2', {
        xPercent: 50,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      // Rotating Editorial Stamp Badges
      gsap.to('.rotating-stamp', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });

      // Subtle ambient pulse for brand glow nodes
      gsap.to('.ambient-neon-glow', {
        opacity: 0.8,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020C1B] text-slate-400 select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Midnight Navy Base with Subtle Radial Sapphire Glows */}
      <div className="absolute inset-0 bg-[#020C1B]" />
      <div className="ambient-neon-glow absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent blur-[120px]" />
      <div className="ambient-neon-glow absolute top-1/2 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-blue-700/15 via-cyan-400/10 to-transparent blur-[140px]" />
      <div className="ambient-neon-glow absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-blue-900/15 to-transparent blur-[130px]" />

      {/* 2. Editorial Halftone / Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{
          backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* 3. Editorial Broadside Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-[0.12]">
        {/* Vertical Column Rails */}
        <div className="w-full h-full max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 border-x border-cyan-400/40">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-cyan-400/30 h-full" />
          ))}
        </div>
      </div>

      {/* 4. Background Editorial Watermarks & Large Typographic Texture */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-[0.06] font-mono pointer-events-none overflow-hidden">
        
        {/* Top Watermark Row */}
        <div className="flex justify-between items-start text-xs tracking-widest text-cyan-300">
          <span>NAVRA STUDIO // BROADSIDE EDITION</span>
          <span>LAT 28.6139° N, LONG 77.2090° E</span>
          <span>[SYSTEM: ACTIVE]</span>
          <span>VOL. 26.04</span>
        </div>

        {/* Giant Background Brutalist Watermark */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="text-[12vw] font-black tracking-tighter text-cyan-400/20 leading-none uppercase font-serif select-none">
            NAVRA MEDIA
          </div>
          <div className="text-sm font-mono tracking-[0.5em] text-cyan-300/40 mt-2">
            CREATIVE PRODUCTION • EDITORIAL BROADCAST • VISUAL LAB
          </div>
        </div>

        {/* Bottom Technical Readout */}
        <div className="flex justify-between items-end text-[10px] font-mono tracking-widest text-slate-500">
          <span>PROD REF: #NV-8802</span>
          <span>4K DIGITAL MASTER / 60FPS CINEMA</span>
          <span>ALL RIGHTS RESERVED // NAVRA STUDIO</span>
        </div>
      </div>

      {/* 5. Animated Horizontal Newspaper Ticker Tape (Top & Bottom) */}
      <div className="absolute top-20 inset-x-0 overflow-hidden opacity-25 border-y border-cyan-500/20 bg-blue-950/20 py-1.5 backdrop-blur-sm">
        <div className="marquee-track-1 flex whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-300">
          <span className="mx-6">★ NAVRA STUDIO MEDIA LAB</span>
          <span className="mx-6">★ CINEMATIC EDITING</span>
          <span className="mx-6">★ 3D MOTION CGI</span>
          <span className="mx-6">★ FESTIVAL EVENT REELS</span>
          <span className="mx-6">★ COLOR SCIENCE</span>
          <span className="mx-6">★ SOUND DESIGN</span>
          <span className="mx-6">★ COMMERCIAL BROADCAST</span>
          <span className="mx-6">★ WE (ARE) CREATORS, NOT CONSUMERS</span>
          <span className="mx-6">★ NAVRA STUDIO MEDIA LAB</span>
          <span className="mx-6">★ CINEMATIC EDITING</span>
          <span className="mx-6">★ 3D MOTION CGI</span>
          <span className="mx-6">★ FESTIVAL EVENT REELS</span>
          <span className="mx-6">★ COLOR SCIENCE</span>
          <span className="mx-6">★ SOUND DESIGN</span>
        </div>
      </div>

      {/* 6. Rotating Editorial Seal Stamp in Background Corner */}
      <div className="absolute bottom-16 right-12 w-44 h-44 opacity-20 hidden md:block">
        <svg viewBox="0 0 200 200" className="rotating-stamp w-full h-full text-cyan-400">
          <defs>
            <path
              id="stampTextPath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="1" />
          <text fontSize="10.5" fontLetterSpacing="2" fill="currentColor" fontFamily="monospace" fontWeight="bold">
            <textPath href="#stampTextPath" startOffset="0%">
              ★ NAVRA STUDIO ★ MEDIA PRODUCTION ★ OFFICIAL PRESS ★ 2026 ★
            </textPath>
          </text>
          <text x="100" y="105" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor" fontFamily="serif">
            NV®
          </text>
        </svg>
      </div>

    </div>
  );
}
