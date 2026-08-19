'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RetroMediaBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Floating gentle hover oscillation for retro floating objects
      gsap.to('.retro-float-1', {
        y: -18,
        rotation: 4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.retro-float-2', {
        y: 20,
        rotation: -6,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.retro-float-3', {
        y: -14,
        rotation: 8,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.slinky-coil', {
        scaleY: 1.15,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // 2. CRT Screen Noise / Signal Scanline Pulse
      gsap.to('.crt-scanline', {
        yPercent: 200,
        duration: 6,
        repeat: -1,
        ease: 'none',
      });

      // 3. Interactive Mouse Parallax Tracking
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 40;
        const y = (clientY / innerHeight - 0.5) * 30;

        gsap.to('.retro-layer-far', { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power2.out' });
        gsap.to('.retro-layer-mid', { x: x * 0.8, y: y * 0.8, duration: 0.6, ease: 'power2.out' });
        gsap.to('.retro-layer-near', { x: -x * 1.2, y: -y * 1.2, duration: 0.6, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020C1B]"
      aria-hidden="true"
    >
      {/* 1. Deep Midnight Base with Retro CRT Scanlines & Grid Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020C1B] via-[#05142E] to-[#010814]" />
      
      {/* Retro Perspective Grid Floor at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-96 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(50px)] pointer-events-none" />

      {/* Subtle CRT Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40 z-0" />

      {/* SVG Canvas for Floating Retro 80s/90s Digital Artifacts */}
      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="retroCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="retroAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="retroPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          <radialGradient id="crtScreenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#020C1B" stopOpacity="0.9" />
          </radialGradient>

          <filter id="retroNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Floating Digital Particles */}
        <g className="retro-layer-far" opacity="0.6">
          <circle cx="180" cy="180" r="3" fill="#38BDF8" />
          <circle cx="280" cy="120" r="2.5" fill="#F472B6" />
          <circle cx="1260" cy="140" r="3" fill="#38BDF8" />
          <circle cx="1320" cy="220" r="2" fill="#FBBF24" />
          <circle cx="720" cy="90" r="3.5" fill="#67E8F9" filter="url(#retroNeonGlow)" />
          
          {/* Pixel Crosshair Badges */}
          <g transform="translate(1180, 80)" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4">
            <line x1="-8" y1="0" x2="8" y2="0" />
            <line x1="0" y1="-8" x2="0" y2="8" />
          </g>
          <g transform="translate(240, 90)" stroke="#F472B6" strokeWidth="1.5" opacity="0.4">
            <line x1="-8" y1="0" x2="8" y2="0" />
            <line x1="0" y1="-8" x2="0" y2="8" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* RETRO PROP 1: Isometric Rotating Rubik's Cube (Top-Left) */}
        {/* ======================================================== */}
        <g className="retro-layer-mid retro-float-1" transform="translate(140, 110)">
          {/* Barcode Tag Label */}
          <g transform="translate(-40, -35) rotate(-8)">
            <rect x="0" y="0" width="90" height="34" rx="4" fill="#F8FAFC" opacity="0.9" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))" />
            {/* Barcode stripes */}
            {[6, 12, 16, 22, 26, 30, 36, 42, 48, 52, 58, 64, 70, 76, 82].map((x, i) => (
              <line key={i} x1={x} y1="6" x2={x} y2="28" stroke="#0F172A" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
            ))}
          </g>

          {/* Isometric Rubik's Cube Faces in Brand & Retro Colors */}
          <g transform="translate(10, 0)">
            {/* Top Face */}
            <polygon points="45,0 90,22 45,45 0,22" fill="#38BDF8" stroke="#020C1B" strokeWidth="2.5" />
            <line x1="15" y1="15" x2="60" y2="37" stroke="#020C1B" strokeWidth="2" />
            <line x1="30" y1="7" x2="75" y2="30" stroke="#020C1B" strokeWidth="2" />
            <line x1="30" y1="37" x2="75" y2="15" stroke="#020C1B" strokeWidth="2" />
            <line x1="15" y1="30" x2="60" y2="7" stroke="#020C1B" strokeWidth="2" />

            {/* Left Face */}
            <polygon points="0,22 45,45 45,95 0,72" fill="#2563EB" stroke="#020C1B" strokeWidth="2.5" />
            <line x1="15" y1="37" x2="15" y2="87" stroke="#020C1B" strokeWidth="2" />
            <line x1="30" y1="45" x2="30" y2="95" stroke="#020C1B" strokeWidth="2" />
            <line x1="0" y1="39" x2="45" y2="62" stroke="#020C1B" strokeWidth="2" />
            <line x1="0" y1="56" x2="45" y2="79" stroke="#020C1B" strokeWidth="2" />

            {/* Right Face */}
            <polygon points="45,45 90,22 90,72 45,95" fill="#F472B6" stroke="#020C1B" strokeWidth="2.5" />
            <line x1="60" y1="45" x2="60" y2="95" stroke="#020C1B" strokeWidth="2" />
            <line x1="75" y1="37" x2="75" y2="87" stroke="#020C1B" strokeWidth="2" />
            <line x1="45" y1="62" x2="90" y2="39" stroke="#020C1B" strokeWidth="2" />
            <line x1="45" y1="79" x2="90" y2="56" stroke="#020C1B" strokeWidth="2" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* RETRO PROP 2: Retro Macintosh / CRT Monitor (Right Side) */}
        {/* ======================================================== */}
        <g className="retro-layer-mid retro-float-2" transform="translate(1080, 240)">
          {/* Shadow */}
          <ellipse cx="140" cy="270" rx="130" ry="24" fill="#000000" opacity="0.6" />

          {/* CRT Monitor Beige/Cream Body */}
          <rect x="20" y="20" width="230" height="210" rx="18" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="3" filter="drop-shadow(0 15px 35px rgba(0,0,0,0.7))" />
          
          {/* Inner Bezel */}
          <rect x="40" y="40" width="190" height="145" rx="12" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />

          {/* CRT Screen with Cyan Noise / Signal */}
          <rect x="48" y="48" width="174" height="129" rx="8" fill="url(#crtScreenGlow)" />
          
          {/* CRT "NO SIGNAL" / "NAVRA MATRIX" Text */}
          <g transform="translate(75, 115)">
            <rect x="-4" y="-18" width="120" height="26" rx="4" fill="#020C1B" opacity="0.85" />
            <text x="56" y="-2" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              NAVRA CRT 4K
            </text>
          </g>

          {/* Floppy Disk Slot */}
          <rect x="160" y="195" width="65" height="6" rx="2" fill="#475569" />

          {/* Retro Rainbow Apple / Custom Logo Badge */}
          <circle cx="55" cy="200" r="6" fill="#38BDF8" />

          {/* Keyboard Base */}
          <polygon points="10,230 250,230 270,270 -10,270" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
          {/* Key Rows */}
          <rect x="15" y="236" width="230" height="24" rx="3" fill="#94A3B8" opacity="0.6" />

          {/* Slinky Spring Mesh beside the CRT */}
          <g className="slinky-coil" transform="translate(-60, 160)">
            {[0, 8, 16, 24, 32, 40, 48].map((offset, idx) => (
              <ellipse
                key={idx}
                cx={40 + offset}
                cy={60 - offset * 0.4}
                rx="24"
                ry="38"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                opacity={0.4 + idx * 0.08}
                filter="url(#retroNeonGlow)"
              />
            ))}
          </g>

          {/* Yellow Retro Pacman Orb */}
          <g transform="translate(230, 170) rotate(-25)">
            <path d="M 30 30 L 56 12 A 30 30 0 1 0 56 48 Z" fill="url(#retroAmberGrad)" stroke="#020C1B" strokeWidth="2" />
            <circle cx="34" cy="16" r="3.5" fill="#020C1B" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* RETRO PROP 3: Retro 80s Walkie-Talkie / Brick Phone       */}
        {/* ======================================================== */}
        <g className="retro-layer-near retro-float-3" transform="translate(80, 440)">
          <g transform="rotate(-15)">
            {/* Antenna */}
            <line x1="50" y1="0" x2="50" y2="-70" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="-70" r="5" fill="#F472B6" />

            {/* Phone Body (Pink & Cyan 80s Style) */}
            <rect x="20" y="0" width="62" height="150" rx="10" fill="#F472B6" stroke="#DB2777" strokeWidth="2.5" filter="drop-shadow(0 12px 25px rgba(0,0,0,0.6))" />
            
            {/* Screen */}
            <rect x="28" y="16" width="46" height="38" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <text x="51" y="38" fill="#020C1B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              NAVRA
            </text>

            {/* Keypad Grid (3x4 buttons) */}
            {[0, 1, 2, 3].map((row) => (
              <g key={row} transform={`translate(0, ${row * 16})`}>
                <rect x="28" y="65" width="12" height="10" rx="2" fill="#FBBF24" />
                <rect x="45" y="65" width="12" height="10" rx="2" fill="#FBBF24" />
                <rect x="62" y="65" width="12" height="10" rx="2" fill="#FBBF24" />
              </g>
            ))}
          </g>
        </g>

        {/* Retro Hashtag Sticker Badge (Top Right) */}
        <g className="retro-float-1" transform="translate(1180, 40) rotate(12)">
          <rect x="0" y="0" width="70" height="70" rx="14" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="3" filter="drop-shadow(0 8px 18px rgba(0,0,0,0.5))" />
          <text x="35" y="48" fill="#0F172A" fontSize="42" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            #
          </text>
        </g>
      </svg>
    </div>
  );
}
