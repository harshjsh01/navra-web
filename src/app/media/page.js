'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Play, 
  Sparkles, 
  Film, 
  Layers, 
  Zap, 
  ArrowRight, 
  Eye, 
  Volume2, 
  Image as ImageIcon,
  Barcode,
  X,
  Send,
  Mail,
  Phone,
  CheckCircle2,
  Maximize2,
  Compass
} from 'lucide-react';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'NAVRA SIGNATURE BRAND SHOWREEL',
    client: 'NAVRA STUDIO LAB // 2026',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/finalreel_navra.mp4',
    posterSrc: '/show/edit_1.png',
    edition: '01 / FEATURE',
    duration: '1:10',
    resolution: '4K CINEMA',
    tags: ['MASTER REEL', 'VFX MOTION', 'COLOR SCIENCE'],
    stats: 'FLAGSHIP SHOWREEL',
    description: 'The master studio showreel showcasing cinematic pacing, analog sound design, dynamic transitions, and commercial storytelling.',
  },
  {
    id: 2,
    title: 'CREATIVE MASTERCLASS & WORKSHOP PROMO',
    client: 'NAVRA WORKSHOPS // LIVE',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/workshop_promo.mp4',
    posterSrc: '/show/edit_2.png',
    edition: '02 / LIVE REEL',
    duration: '0:40',
    resolution: '1080P 60FPS',
    tags: ['WORKSHOP', 'MOTION DESIGN', 'EVENT PROMO'],
    stats: 'EDUCATIONAL',
    description: 'Hands-on creative masterclass promo highlighting live design workflows, software pipelines, and dynamic graphic edits.',
  },
  {
    id: 3,
    title: 'EXCLUSIVE PRE-ORDER CAMPAIGN FILM',
    client: 'PRODUCT LAUNCH // COMMERCIAL',
    category: 'Commercials',
    type: 'video',
    mediaSrc: '/show/preorder_final_reel.mp4',
    posterSrc: '/show/wedding_collection.png',
    edition: '03 / PROMO',
    duration: '0:45',
    resolution: '4K ULTRA HD',
    tags: ['PRE-ORDER', 'PRODUCT AD', 'HIGH-HOOK'],
    stats: '+340% ROAS',
    description: 'High-conversion product pre-order commercial reel featuring energetic pacing, kinetic title overlays, and promotional narrative structure.',
  },
  {
    id: 4,
    title: 'NAVRANG NAVRATRI FESTIVAL REEL',
    client: 'CULTURAL EXPERIENCE // 2026',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navrang_navratri.mp4',
    posterSrc: '/show/edit_1.png',
    edition: '04 / EVENT',
    duration: '0:15',
    resolution: '1080P HD',
    tags: ['EVENT REEL', 'MUSIC SYNC', 'FESTIVAL'],
    stats: '150K+ VIEWS',
    description: 'High-energy cultural event promotional reel featuring dynamic music synchronization and festive visual pacing.',
  },
  {
    id: 5,
    title: 'NAVRATRI RANGAT FESTIVAL PROMO',
    client: 'STAGE & LIVE PRODUCTION',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navratri_rangat.mp4',
    posterSrc: '/show/edit_2.png',
    edition: '05 / EVENT',
    duration: '0:30',
    resolution: '1080P HD',
    tags: ['COLOR GRADE', 'AUDIO MASTER', 'STAGE PROMO'],
    stats: '280K+ VIEWS',
    description: 'Cinematic festival promotional video with festive color grading, rhythm cuts, and atmospheric sound design.',
  },
  {
    id: 6,
    title: 'DYNAMIC MOTION IDENTITY & TYPOGRAPHY',
    client: 'NAVRA MOTION LAB',
    category: '3D Motion',
    type: 'video',
    mediaSrc: '/show/motion_design.mp4',
    posterSrc: '/show/we_agency.png',
    edition: '06 / MOTION',
    duration: '0:20',
    resolution: 'VECTOR 60FPS',
    tags: ['MOTION GRAPHICS', 'KINETIC TYPE', 'VISUAL ID'],
    stats: 'VIRAL REACH',
    description: 'Modern kinetic typography motion reel with stylized visual transitions and fluid vector animations.',
  },
  {
    id: 7,
    title: 'CINEMATIC SEQUENCE & MOOD FILM',
    client: 'VISUAL STORYTELLING LAB',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/walk_cinematic.mov',
    posterSrc: '/show/wedding_collection.png',
    edition: '07 / CINEMA',
    duration: '0:45',
    resolution: '4K CINEMA',
    tags: ['CINEMATIC FILM', 'COLOR SCIENCE', 'PACING'],
    stats: 'MASTER QUALITY',
    description: 'Atmospheric narrative visual sequence with custom color treatment and cinematic wide-angle framing.',
  },
  {
    id: 8,
    title: 'LUXURY GOLD & DIAMOND WEDDING CAMPAIGN',
    client: 'FINE JEWELRY BROADSIDE',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    edition: '08 / PRINT AD',
    duration: 'POSTER / AD',
    resolution: '1080x1080 HQ',
    tags: ['COMMERCIAL', 'JEWELRY BRANDING', 'AD DESIGN'],
    stats: 'COMMERCIAL',
    description: 'Premium luxury commercial creative developed for high-converting social media advertising and wedding collection promotions.',
  },
  {
    id: 9,
    title: 'CREATIVE AGENCY BRAND IDENTITY SYSTEM',
    client: 'NAVRA STUDIO BRAND ARCHIVE',
    category: 'Brand & Print',
    type: 'image',
    mediaSrc: '/show/we_agency.png',
    posterSrc: '/show/we_agency.png',
    edition: '09 / BRAND ID',
    duration: 'VISUAL ID',
    resolution: '1080x1080 HQ',
    tags: ['BRAND IDENTITY', 'TYPOGRAPHY', 'EDITORIAL'],
    stats: 'STANDARD',
    description: 'Comprehensive agency visual identity artwork featuring modern typography hierarchy and brand color synergy.',
  },
  {
    id: 10,
    title: 'WIDE-FORMAT EDITORIAL CAMPAIGN BANNER',
    client: 'DIGITAL BROADCAST SUITE',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/edit_4.png',
    posterSrc: '/show/edit_4.png',
    edition: '10 / BANNER',
    duration: 'WEB BANNER',
    resolution: '2000x647 WIDE',
    tags: ['WEB BANNER', 'ADVERTISING', 'COMPOSITION'],
    stats: '99.4% CTR',
    description: 'High-impact wide-format digital campaign header designed for multi-channel digital distribution.',
  },
];

export default function MediaLivePage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const canvas3DRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentTranslate = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const targetTranslate = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const canvas = canvas3DRef.current;
    if (!canvas) return;

    // 1. Idle 3D Floating Motion
    const idleTween = gsap.to(targetTranslate.current, {
      x: '+=50',
      y: '-=30',
      rotX: 2.5,
      rotY: -3.5,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // 2. Physics Render Loop (Lerp Damping)
    let animationFrameId;
    const updatePhysics = () => {
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

    // 3. Mouse & Drag Interaction
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        targetTranslate.current.x += dx * 0.9;
        targetTranslate.current.y += dy * 0.9;
        startPos.current = { x: e.clientX, y: e.clientY };
      } else {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        targetTranslate.current.rotY = xNorm * 7;
        targetTranslate.current.rotX = -yNorm * 7;
        targetTranslate.current.x += xNorm * 0.3;
        targetTranslate.current.y += yNorm * 0.3;
      }
    };

    const handleMouseDown = (e) => {
      // Don't drag if clicking directly on a button or link
      if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('input') && !e.target.closest('textarea')) {
        isDragging.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1 && !e.target.closest('button') && !e.target.closest('a')) {
        isDragging.current = true;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startPos.current.x;
        const dy = e.touches[0].clientY - startPos.current.y;
        targetTranslate.current.x += dx * 1.1;
        targetTranslate.current.y += dy * 1.1;
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

    // 4. Marquee animations
    gsap.to('.marquee-bar-track', {
      xPercent: -50,
      duration: 20,
      repeat: -1,
      ease: 'none',
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020C1B] text-slate-100 overflow-x-hidden font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP BROADSIDE MASTHEAD & CONTINUOUS TICKER TAPE       */}
      {/* ======================================================== */}
      <div className="sticky top-0 z-30 w-full bg-[#020C1B]/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl">
        
        {/* Newspaper Technical Edition Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-cyan-300">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-bold">
              THE NAVRA CHRONICLE // VOL. 26
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline uppercase text-slate-300">MEDIA PRODUCTION & VISUAL DIRECTION</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">LAT 28.61° N / 77.20° E</span>
            <span className="text-cyan-400 font-bold">NV® 2026</span>
            <a
              href="#contact-dispatch"
              className="px-3 py-1 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors uppercase"
            >
              Contact Studio ↓
            </a>
          </div>
        </div>

        {/* Horizontal Marquee Ticker */}
        <div className="overflow-hidden border-t border-cyan-500/20 bg-blue-950/40 py-1">
          <div className="marquee-bar-track flex whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300">
            <span className="mx-6">★ WE (ARE) CREATORS, NOT CONSUMERS</span>
            <span className="mx-6">★ CINEMATIC 4K VIDEO EDITING</span>
            <span className="mx-6">★ 3D MOTION GRAPHICS & CGI</span>
            <span className="mx-6">★ FESTIVAL EVENT REELS</span>
            <span className="mx-6">★ COMMERCIAL BRAND CAMPAIGNS</span>
            <span className="mx-6">★ CLICK ANY CARD TO PLAY / INSPECT</span>
            <span className="mx-6">★ WE (ARE) CREATORS, NOT CONSUMERS</span>
            <span className="mx-6">★ CINEMATIC 4K VIDEO EDITING</span>
            <span className="mx-6">★ 3D MOTION GRAPHICS & CGI</span>
            <span className="mx-6">★ FESTIVAL EVENT REELS</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. THE LIVE 3D INTERACTIVE BROADSHEET CANVAS (MAIN STAGE)*/}
      {/* ======================================================== */}
      <section className="relative w-full h-[88vh] min-h-[750px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border-b border-cyan-500/30">
        
        {/* Subtle Background Lighting & Dot Grid */}
        <div className="absolute inset-0 bg-[#020C1B] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020C1B_90%)] pointer-events-none z-10" />

        {/* Floating Instruction Toast */}
        <div className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-xl pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>CLICK & DRAG TO NAVIGATE 3D BROADSHEET • CLICK ANY TILE TO WATCH</span>
        </div>

        {/* 3D DRAGGABLE KINETIC CANVAS PLANE */}
        <div
          ref={canvas3DRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[1800px] will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ============================================================ */}
          {/* TILE 1: LEAD HERO BROADSIDE ("WE (ARE) CREATORS, NOT CONSUMERS") */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[0])}
            className="group absolute left-[680px] top-[400px] w-[580px] h-[370px] bg-black/80 hover:bg-black/95 border-2 border-cyan-400/50 hover:border-cyan-300 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ transform: 'translateZ(65px)' }}
          >
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

            <div className="relative my-auto flex items-center justify-between">
              <div className="max-w-[340px] z-10">
                <h2 className="text-3xl sm:text-4xl font-black font-sans uppercase tracking-tight text-white leading-none">
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

              {/* 3D Figurine Silhouette Graphics */}
              <div className="flex items-center gap-2 opacity-85 group-hover:scale-110 transition-transform">
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

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400">
              <span className="text-cyan-300 group-hover:underline flex items-center gap-1">
                ▶ Click to Play Master Showreel
              </span>
              <span className="text-cyan-400 font-bold">NV® 2026</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 2: ELECTRIC NEON TYPOGRAPHY CARD ("NOT CONSUMERS")       */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[1])}
            className="group absolute left-[1290px] top-[380px] w-[420px] h-[390px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl p-7 shadow-[0_30px_70px_rgba(6,182,212,0.35)] flex flex-col justify-between overflow-hidden text-black cursor-pointer transition-all duration-300 hover:scale-[1.03]"
            style={{ transform: 'translateZ(90px) rotateZ(-2deg)' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-black tracking-widest uppercase">
                (CR) EDITION 02
              </span>
              <Barcode className="w-8 h-6 text-black" />
            </div>

            <div className="relative my-auto z-10">
              <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none font-sans">
                NOT <br />
                CONSUMERS
              </div>
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
              <span>★ NAVRA WORKSHOP</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 3: RETRO-DIGITAL VIDEO MONITOR (CINEMATIC 4K REEL)      */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[0])}
            className="group absolute left-[220px] top-[340px] w-[430px] h-[450px] bg-black/85 hover:bg-black/95 border-2 border-cyan-400/40 hover:border-cyan-300 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono">
              <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                [LIVE 4K STREAM]
              </span>
              <span className="text-slate-400">00:00:26</span>
            </div>

            <div className="relative w-full h-56 rounded-xl bg-slate-950 border border-white/10 overflow-hidden my-auto">
              <video
                src="/show/finalreel_navra.mp4"
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cyan-400/80 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>COLOR SCIENCE & PACING</span>
                <span className="text-cyan-400">60 FPS</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-tight">
                Click to expand master 4K showreel player.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 4: MASSIVE BRUTALIST HEADLINE ("NAVRA STUDIO ARCHIVE")   */}
          {/* ============================================================ */}
          <div
            className="absolute left-[220px] top-[820px] w-[1490px] h-[130px] bg-black/90 border-2 border-white/15 rounded-2xl px-8 py-4 flex items-center justify-between shadow-2xl backdrop-blur-2xl"
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
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[5])}
            className="group absolute left-[1290px] top-[790px] w-[420px] h-[460px] bg-black/85 hover:bg-black/95 border-2 border-cyan-400/40 hover:border-cyan-300 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ transform: 'translateZ(55px)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
              <span className="text-cyan-300 font-bold uppercase">
                STUDIO TOY SPEC // Ver. 100% & 400%
              </span>
              <span className="text-[10px] text-slate-500">REF-09</span>
            </div>

            <div className="relative w-full h-60 rounded-xl bg-blue-950/30 border border-cyan-500/30 flex items-center justify-center overflow-hidden my-auto p-4">
              <div className="absolute w-44 h-44 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute w-32 h-32 rounded-full border border-dashed border-blue-400/40 animate-spin" style={{ animationDuration: '14s' }} />
              
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
              <span className="text-cyan-300 group-hover:underline">▶ View Motion Identity</span>
              <span className="text-cyan-400 font-bold">((CR))</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 6: LUXURY JEWELRY COMMERCIAL BROADSIDE                  */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[7])}
            className="group absolute left-[680px] top-[790px] w-[580px] h-[460px] bg-black/85 hover:bg-black/95 border-2 border-amber-400/40 hover:border-amber-300 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ transform: 'translateZ(70px)' }}
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
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              <span className="text-amber-300 group-hover:underline">▶ Inspect Commercial Poster</span>
              <span className="text-amber-300 font-bold">HIGH-ROAS AD</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 7: CULTURAL EVENT & FESTIVAL REEL (NAVRANG NAVRATRI)    */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[3])}
            className="group absolute left-[220px] top-[980px] w-[430px] h-[400px] bg-black/85 hover:bg-black/95 border-2 border-cyan-400/40 hover:border-cyan-300 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="pt-2.5 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
              <span className="text-cyan-300 group-hover:underline">▶ Watch Festival Edit</span>
              <span className="text-cyan-400 font-bold">1080P HD</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 8: WORKSHOP MASTERCLASS PROMO CARD (WSHOP2.MP4)         */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[1])}
            className="group absolute left-[680px] top-[1280px] w-[580px] h-[380px] bg-black/85 hover:bg-black/95 border-2 border-cyan-400/40 hover:border-cyan-300 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              <span className="text-cyan-300 group-hover:underline">▶ Watch Masterclass Edit</span>
              <span className="text-cyan-400 font-bold">60 FPS</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TILE 9: BRAND IDENTITY SYSTEM POSTER (WE.PNG)                */}
          {/* ============================================================ */}
          <div
            onClick={() => setSelectedMedia(SHOWCASE_ITEMS[8])}
            className="group absolute left-[1290px] top-[1280px] w-[420px] h-[380px] bg-black/85 hover:bg-black/95 border-2 border-cyan-400/40 hover:border-cyan-300 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ transform: 'translateZ(45px)' }}
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
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              <span className="text-cyan-300 group-hover:underline">▶ View Brand Layout</span>
              <span className="text-cyan-400 font-bold">STANDARD</span>
            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. EDITORIAL CONTACT & SPRINT DISPATCH SECTION           */}
      {/* ======================================================== */}
      <section id="contact-dispatch" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-br from-[#041026] via-[#020C1B] to-[#041026] p-8 sm:p-14 shadow-2xl backdrop-blur-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Editorial Info */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase">
                    SECTION C // DIRECT DISPATCH
                  </span>
                  <Barcode className="w-8 h-6 text-slate-400" />
                </div>

                <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white leading-tight mb-6">
                  Commission Your <br />
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
                    Next Masterpiece
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8">
                  Ready to elevate your promotional reels, commercial video ads, 3D CGI visuals, or complete brand identity? Reach out directly to initiate a creative production sprint.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-4">
                  <a
                    href="mailto:harshjsh02@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-400/40 transition-all text-sm font-mono text-slate-300 hover:text-white"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">DIRECT EMAIL</span>
                      <span className="font-bold text-white">harshjsh02@gmail.com</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/50 border border-white/10 text-sm font-mono text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">DESIGN & DIRECTION</span>
                      <span className="font-bold text-white">Designed & Built by Harsh Joshi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 text-xs font-mono text-slate-500 flex justify-between">
                <span>NAVRA STUDIO // ALL RIGHTS RESERVED</span>
                <span>NV® 2026</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-6 bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-white font-mono">
                    DISPATCH TRANSMITTED
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Thank you! Your project brief has been logged. Harsh Joshi & the Navra Studio team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-cyan-300 uppercase mb-1.5 font-bold">
                      Your Name / Company
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Doe / Apex Media"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-cyan-300 uppercase mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-cyan-300 uppercase mb-1.5 font-bold">
                      Service Requirement
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#08152B] border border-white/20 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                      <option>Cinematic Video Editing & Color Grade</option>
                      <option>3D Motion Graphics & CGI</option>
                      <option>Commercial Video Ads & Pre-Orders</option>
                      <option>Festival / Event Promotional Reel</option>
                      <option>Full Visual Branding & Identity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-cyan-300 uppercase mb-1.5 font-bold">
                      Project Scope & Timeline
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your vision, deliverables, and estimated launch deadline..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-cyan-400 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Project Dispatch</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE LIGHTBOX & VIDEO THEATER MODAL            */}
      {/* ======================================================== */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-4xl rounded-3xl bg-[#030D1E] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  [{selectedMedia.edition}] // {selectedMedia.client}
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-sans uppercase text-white mt-0.5">
                  {selectedMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Frame */}
            <div className="relative w-full aspect-video rounded-xl bg-black flex items-center justify-center border border-white/10 mb-4 overflow-hidden">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.mediaSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <img
                  src={selectedMedia.mediaSrc}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain rounded-xl p-2"
                />
              )}
            </div>

            {/* Modal Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-light mb-2">
                  {selectedMedia.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedMedia.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-cyan-400/20 text-cyan-300 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact-dispatch"
                onClick={() => setSelectedMedia(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shrink-0"
              >
                <span>Request Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
