'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Volume2, Sparkles, Barcode, Eye, Shield, Award, Layers } from 'lucide-react';

export default function NewspaperMediaBackground() {
  const containerRef = useRef(null);
  const canvas3DRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentTranslate = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const targetTranslate = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const [activePlay, setActivePlay] = useState(false);

  useEffect(() => {
    const canvas = canvas3DRef.current;
    if (!canvas) return;

    // 1. Idle 3D Floating & Ticker Motion
    const idleTween = gsap.to(targetTranslate.current, {
      x: '+=60',
      y: '-=40',
      rotX: 3,
      rotY: -4,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // 2. Smooth Render Loop (60fps lerp inertia)
    let animationFrameId;
    const updatePhysics = () => {
      // Lerp current to target
      currentTranslate.current.x += (targetTranslate.current.x - currentTranslate.current.x) * 0.08;
      currentTranslate.current.y += (targetTranslate.current.y - currentTranslate.current.y) * 0.08;
      currentTranslate.current.rotX += (targetTranslate.current.rotX - currentTranslate.current.rotX) * 0.08;
      currentTranslate.current.rotY += (targetTranslate.current.rotY - currentTranslate.current.rotY) * 0.08;

      if (canvas) {
        canvas.style.transform = `
          translate3d(${currentTranslate.current.x}px, ${currentTranslate.current.y}px, 0)
          rotateX(${currentTranslate.current.rotX}deg)
          rotateY(${currentTranslate.current.rotY}deg)
        `;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    animationFrameId = requestAnimationFrame(updatePhysics);

    // 3. Mouse Parallax Navigation
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        targetTranslate.current.x += dx * 0.8;
        targetTranslate.current.y += dy * 0.8;
        startPos.current = { x: e.clientX, y: e.clientY };
      } else {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        targetTranslate.current.rotY = xNorm * 8;
        targetTranslate.current.rotX = -yNorm * 8;
        targetTranslate.current.x += xNorm * 0.4;
        targetTranslate.current.y += yNorm * 0.4;
      }
    };

    const handleMouseDown = (e) => {
      // Allow drag on canvas background
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'VIDEO') {
        isDragging.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch Support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startPos.current.x;
        const dy = e.touches[0].clientY - startPos.current.y;
        targetTranslate.current.x += dx * 1.2;
        targetTranslate.current.y += dy * 1.2;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 4. Subtle 3D Card Hover Float Animation
    gsap.to('.float-tile-slow', {
      y: '-=12',
      rotationZ: 0.8,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      idleTween.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden bg-[#020C1B] select-none"
      style={{ perspective: '1400px' }}
      aria-hidden="true"
    >
      {/* Deep Midnight Atmosphere & Vignette */}
      <div className="absolute inset-0 bg-[#020C1B] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020C1B_85%)] pointer-events-none z-10" />

      {/* Subtle Ambient Lighting Beams */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[170px] pointer-events-none" />

      {/* ======================================================== */}
      {/* 3D KINETIC BROADSHEET CANVAS (CLUBRARE / BEARBRICK STYLE) */}
      {/* ======================================================== */}
      <div
        ref={canvas3DRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[1800px] will-change-transform cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* TILE 1: LEAD HERO BROADSIDE ("WE (ARE) CREATORS, NOT CONSUMERS") */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[680px] top-[420px] w-[580px] h-[360px] bg-black/75 border-2 border-cyan-400/50 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(60px)' }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                NAVRA STUDIO ®
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider">
              VOL. 26 // ISSUE 01
            </div>
          </div>

          {/* Core Headline & Stylized 3D Figures */}
          <div className="relative my-auto flex items-center justify-between">
            <div className="max-w-[340px] z-10">
              <h2 className="text-3xl font-black font-sans uppercase tracking-tight text-white leading-none">
                We (Are) <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
                  Creators,
                </span> <br />
                Not Consumers
              </h2>
              <div className="flex items-center gap-3 mt-4 text-[11px] font-mono text-slate-300">
                <span className="px-2 py-0.5 rounded bg-blue-600/30 border border-cyan-400/40 text-cyan-300 font-bold">
                  01 02 03
                </span>
                <span>[Craft] [Direct] [Trade]</span>
              </div>
            </div>

            {/* Stylized 3D Bearbrick / Studio Figurine Silhouette Graphics */}
            <div className="flex items-center gap-2 opacity-85">
              <div className="w-16 h-28 rounded-2xl bg-gradient-to-b from-cyan-400/30 via-blue-600/20 to-transparent border border-cyan-400/30 flex flex-col items-center justify-center p-2 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-cyan-300/40 border border-cyan-300 mb-1" />
                <div className="w-10 h-14 rounded-lg bg-blue-600/30 border border-cyan-400/30" />
              </div>
              <div className="w-16 h-28 rounded-2xl bg-gradient-to-b from-blue-500/30 via-indigo-600/20 to-transparent border border-blue-400/30 flex flex-col items-center justify-center p-2 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-blue-300/40 border border-blue-300 mb-1" />
                <div className="w-10 h-14 rounded-lg bg-indigo-600/30 border border-blue-400/30" />
              </div>
            </div>
          </div>

          {/* Bottom Readout */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400">
            <span>NAVRA CHRONICLE BROADCAST</span>
            <span className="text-cyan-400 font-bold">NV® 2026</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 2: ELECTRIC NEON TYPOGRAPHY CARD ("NOT CONSUMERS")       */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[1290px] top-[400px] w-[420px] h-[380px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl p-7 shadow-[0_30px_70px_rgba(6,182,212,0.35)] flex flex-col justify-between overflow-hidden text-black select-none"
          style={{ transform: 'translateZ(85px) rotateZ(-2deg)' }}
        >
          {/* Subtle Decorative Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-mono font-black tracking-widest uppercase">
              (CR) EDITION 02
            </span>
            <Barcode className="w-8 h-6 text-black" />
          </div>

          {/* Huge Rotated Typography */}
          <div className="relative my-auto z-10">
            <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none font-sans">
              NOT <br />
              CONSUMERS
            </div>
            {/* Signature Doodle / Scribble SVG */}
            <svg viewBox="0 0 200 60" className="w-48 h-12 text-black/80 mt-2">
              <path
                d="M 10 40 Q 60 10, 110 35 T 190 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono font-bold z-10 pt-2 border-t border-black/20">
            <span>WE CONNECT THE REAL & DIGITAL</span>
            <span>★ NAVRA</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 3: RETRO-DIGITAL VIDEO MONITOR (CINEMATIC 4K REEL)      */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[220px] top-[360px] w-[430px] h-[450px] bg-black/80 border-2 border-cyan-400/40 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              [LIVE 4K STREAM]
            </span>
            <span className="text-slate-400">00:00:26</span>
          </div>

          {/* Video Player Box with Scanlines */}
          <div className="relative w-full h-56 rounded-xl bg-slate-950 border border-white/10 overflow-hidden my-auto">
            <video
              src="/show/finalreel_navra.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Scanline CRT overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[9px] font-mono text-cyan-300 backdrop-blur-md">
              MASTER SHOWREEL // NAVRA
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono">
            <div className="flex justify-between text-slate-300 font-bold">
              <span>COLOR SCIENCE & PACING</span>
              <span className="text-cyan-400">60 FPS</span>
            </div>
            <p className="text-[11px] text-slate-400 font-light leading-tight">
              Cinematic camera motion, speed ramps, and high-impact sound design.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 4: MASSIVE BRUTALIST HEADLINE ("NAVRA STUDIO ARCHIVE")   */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[220px] top-[840px] w-[1490px] h-[130px] bg-black/85 border-2 border-white/15 rounded-2xl px-8 py-4 flex items-center justify-between shadow-2xl backdrop-blur-2xl"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tight text-white leading-none select-none">
            NAVRA STUDIO COLLECTION
          </div>
          <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-cyan-300">
            <span>★ COMMERCIAL DIRECTION</span>
            <span>★ 3D MOTION CGI</span>
            <span>★ FESTIVAL REELS</span>
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-cyan-400/40 flex items-center justify-center font-bold text-base text-white">
              NV®
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 5: 3D METALLIC CHROME SPECIFICATION BLUEPRINT           */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[1290px] top-[810px] w-[420px] h-[460px] bg-black/80 border-2 border-cyan-400/40 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              STUDIO TOY SPEC // Ver. 100% & 400%
            </span>
            <span className="text-[10px] text-slate-500">REF-09</span>
          </div>

          {/* 3D Blueprint Wireframe Box */}
          <div className="relative w-full h-60 rounded-xl bg-blue-950/30 border border-cyan-500/30 flex items-center justify-center overflow-hidden my-auto p-4">
            {/* Ambient Tech Wireframe Rings */}
            <div className="absolute w-44 h-44 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-32 h-32 rounded-full border border-dashed border-blue-400/40 animate-spin" style={{ animationDuration: '14s' }} />
            
            {/* Center Figurine Blueprint Graphic */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(56,189,248,0.6)] flex items-center justify-center text-black font-black text-xl mb-2">
                NV
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                CHROME TOY EDITION
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                METALLIC VECTOR RENDER
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>CONNECT REAL & DIGITAL</span>
            <span className="text-cyan-400 font-bold">((CR))</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 6: LUXURY JEWELRY COMMERCIAL BROADSIDE                  */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[680px] top-[810px] w-[580px] h-[460px] bg-black/80 border-2 border-amber-400/30 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(65px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="text-amber-300 font-bold uppercase tracking-wider">
              ★ LUXURY COMMERCIAL CAMPAIGN
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[10px]">
              25% OFF SPECIAL
            </span>
          </div>

          <div className="relative w-full h-64 rounded-xl bg-slate-950 border border-white/10 overflow-hidden my-auto flex items-center justify-center">
            <img
              src="/show/wedding_collection.png"
              alt="Luxury Wedding Collection"
              className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
            <span>GOLD & DIAMOND COLLECTION</span>
            <span className="text-amber-300 font-bold">HIGH-ROAS AD</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 7: CULTURAL EVENT & FESTIVAL REEL (NAVRANG NAVRATRI)    */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[220px] top-[1000px] w-[430px] h-[400px] bg-black/80 border-2 border-cyan-400/40 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(55px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              NAVRANG NAVRATRI REEL
            </span>
            <span className="text-[10px] text-slate-400">150K+ VIEWS</span>
          </div>

          <div className="relative w-full h-52 rounded-xl bg-black border border-white/10 overflow-hidden my-auto">
            <video
              src="/show/navrang_navratri.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-2.5 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>FESTIVAL STAGE PROMO</span>
            <span className="text-cyan-400 font-bold">1080P HD</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 8: WORKSHOP MASTERCLASS PROMO CARD (WSHOP2.MP4)         */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[680px] top-[1300px] w-[580px] h-[380px] bg-black/80 border-2 border-cyan-400/40 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(70px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              CREATIVE MASTERCLASS WORKSHOP
            </span>
            <span className="text-[10px] text-slate-400">LIVE WORKFLOWS</span>
          </div>

          <div className="relative w-full h-52 rounded-xl bg-black border border-white/10 overflow-hidden my-auto">
            <video
              src="/show/workshop_promo.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
            <span>DESIGN & MOTION TRAINING</span>
            <span className="text-cyan-400 font-bold">60 FPS</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 9: BRAND IDENTITY SYSTEM POSTER (WE.PNG)                */}
        {/* ============================================================ */}
        <div
          className="float-tile-slow absolute left-[1290px] top-[1300px] w-[420px] h-[380px] bg-black/80 border-2 border-cyan-400/40 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              AGENCY BRAND IDENTITY
            </span>
            <Barcode className="w-7 h-5 text-slate-400" />
          </div>

          <div className="relative w-full h-52 rounded-xl bg-black border border-white/10 overflow-hidden my-auto flex items-center justify-center">
            <img
              src="/show/we_agency.png"
              alt="Agency Brand Design"
              className="w-full h-full object-contain p-2"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
            <span>TYPOGRAPHY & VECTOR ART</span>
            <span className="text-cyan-400 font-bold">STANDARD</span>
          </div>
        </div>

      </div>

      {/* Instruction Toast in Bottom Left */}
      <div className="fixed bottom-6 left-6 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-xl pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>DRAG OR MOVE CURSOR TO EXPLORE 3D KINETIC BROADSHEET</span>
      </div>
    </div>
  );
}
