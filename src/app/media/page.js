'use client';

import { useState, useEffect, useRef } from 'react';
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
  CheckCircle2,
  Compass,
  Move,
  MousePointer
} from 'lucide-react';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'NAVRA SIGNATURE BRAND SHOWREEL',
    kicker: 'LEAD STORY // 4K MASTER CUT',
    client: 'NAVRA STUDIO LAB // 2026',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/finalreel_navra.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • VOL. 26',
    duration: '1:10',
    resolution: '4K CINEMA',
    tags: ['MASTER REEL', 'VFX MOTION', 'COLOR SCIENCE'],
    stats: 'FLAGSHIP',
    dateline: 'NAVRA DESK — ',
    description: 'The master studio showreel showcasing cinematic pacing, analog sound design, dynamic transitions, and commercial storytelling engineered for high audience retention.',
  },
  {
    id: 2,
    title: 'CREATIVE MASTERCLASS & WORKSHOP PROMO',
    kicker: 'SPECIAL REPORT // DESIGN LAB',
    client: 'NAVRA WORKSHOPS // LIVE',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/workshop_promo.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 02 • EDUCATION',
    duration: '0:40',
    resolution: '1080P 60FPS',
    tags: ['WORKSHOP', 'MOTION DESIGN', 'EVENT PROMO'],
    stats: 'EDUCATIONAL',
    dateline: 'STUDIO REPORT — ',
    description: 'Hands-on creative masterclass highlighting live design workflows, software pipelines, typography manipulation, and dynamic graphic edits.',
  },
  {
    id: 3,
    title: 'EXCLUSIVE PRE-ORDER CAMPAIGN FILM',
    kicker: 'COMMERCIAL DISPATCH // AD SUITE',
    client: 'PRODUCT LAUNCH // COMMERCIAL',
    category: 'Commercials',
    type: 'video',
    mediaSrc: '/show/preorder_final_reel.mp4',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 03 • COMMERCE',
    duration: '0:45',
    resolution: '4K ULTRA HD',
    tags: ['PRE-ORDER', 'PRODUCT AD', 'HIGH-HOOK'],
    stats: '+340% ROAS',
    dateline: 'MARKETING WIRE — ',
    description: 'High-conversion product pre-order commercial reel featuring energetic pacing, kinetic title overlays, and promotional narrative structure.',
  },
  {
    id: 4,
    title: 'NAVRANG NAVRATRI FESTIVAL REEL',
    kicker: 'CULTURAL BROADSIDE // LIVE STAGE',
    client: 'CULTURAL EXPERIENCE // 2026',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navrang_navratri.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 04 • CULTURE',
    duration: '0:15',
    resolution: '1080P HD',
    tags: ['EVENT REEL', 'MUSIC SYNC', 'FESTIVAL'],
    stats: '150K+ VIEWS',
    dateline: 'LIVE EVENT — ',
    description: 'High-energy cultural event promotional reel featuring dynamic music synchronization and festive visual pacing.',
  },
  {
    id: 5,
    title: 'NAVRATRI RANGAT FESTIVAL PROMO',
    kicker: 'STAGE PRODUCTION // SOUND DESIGN',
    client: 'STAGE & LIVE PRODUCTION',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navratri_rangat.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 05 • ENTERTAINMENT',
    duration: '0:30',
    resolution: '1080P HD',
    tags: ['COLOR GRADE', 'AUDIO MASTER', 'STAGE PROMO'],
    stats: '280K+ VIEWS',
    dateline: 'PRODUCTION WIRE — ',
    description: 'Cinematic festival promotional video with festive color grading, rhythm cuts, and atmospheric sound design.',
  },
  {
    id: 6,
    title: 'DYNAMIC MOTION IDENTITY & TYPOGRAPHY',
    kicker: 'DIGITAL INNOVATION // VECTOR LAB',
    client: 'NAVRA MOTION LAB',
    category: '3D Motion',
    type: 'video',
    mediaSrc: '/show/motion_design.mp4',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 06 • TECHNOLOGY',
    duration: '0:20',
    resolution: 'VECTOR 60FPS',
    tags: ['MOTION GRAPHICS', 'KINETIC TYPE', 'VISUAL ID'],
    stats: 'VIRAL REACH',
    dateline: 'TECH DESK — ',
    description: 'Modern kinetic typography motion reel with stylized visual transitions and fluid vector animations.',
  },
  {
    id: 7,
    title: 'CINEMATIC SEQUENCE & MOOD FILM',
    kicker: 'CINEMA CRITIQUE // VISUAL ESSAY',
    client: 'VISUAL STORYTELLING LAB',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/walk_cinematic.mov',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 07 • ESSAY',
    duration: '0:45',
    resolution: '4K CINEMA',
    tags: ['CINEMATIC FILM', 'COLOR SCIENCE', 'PACING'],
    stats: 'MASTER QUALITY',
    dateline: 'CINEMA WIRE — ',
    description: 'Atmospheric narrative visual sequence with custom color treatment and cinematic wide-angle framing.',
  },
  {
    id: 8,
    title: 'LUXURY GOLD & DIAMOND WEDDING CAMPAIGN',
    kicker: 'COMMERCIAL BROADSHEET // SPECIAL AD',
    client: 'FINE JEWELRY BROADSIDE',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 08 • ADVERTISEMENT',
    duration: 'POSTER / AD',
    resolution: '1080x1080 HQ',
    tags: ['COMMERCIAL', 'JEWELRY BRANDING', 'AD DESIGN'],
    stats: 'COMMERCIAL',
    dateline: 'SPECIAL GAZETTE — ',
    description: 'Premium luxury commercial creative developed for high-converting social media advertising and wedding collection promotions.',
  },
  {
    id: 9,
    title: 'CREATIVE AGENCY BRAND IDENTITY SYSTEM',
    kicker: 'IDENTITY STANDARD // BRAND ARCHIVE',
    client: 'NAVRA STUDIO BRAND ARCHIVE',
    category: 'Brand & Print',
    type: 'image',
    mediaSrc: '/show/we_agency.png',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 09 • IDENTITY',
    duration: 'VISUAL ID',
    resolution: '1080x1080 HQ',
    tags: ['BRAND IDENTITY', 'TYPOGRAPHY', 'EDITORIAL'],
    stats: 'STANDARD',
    dateline: 'BRAND GAZETTE — ',
    description: 'Comprehensive agency visual identity artwork featuring modern typography hierarchy and brand color synergy.',
  },
];

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const containerRef = useRef(null);
  const canvas3DRef = useRef(null);

  // Drag physics refs
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: -260, y: -140, rotX: 0, rotY: 0 });
  const targetPos = useRef({ x: -260, y: -140, rotX: 0, rotY: 0 });

  useEffect(() => {
    const canvas = canvas3DRef.current;
    if (!canvas) return;

    let animationFrameId;
    const renderLoop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;
      currentPos.current.rotX += (targetPos.current.rotX - currentPos.current.rotX) * 0.1;
      currentPos.current.rotY += (targetPos.current.rotY - currentPos.current.rotY) * 0.1;

      if (canvas) {
        canvas.style.transform = `
          translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)
          rotateX(${currentPos.current.rotX}deg)
          rotateY(${currentPos.current.rotY}deg)
        `;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);

    const handleMouseDown = (e) => {
      if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) {
        return;
      }
      isDragging.current = true;
      dragMoved.current = false;
      startPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragMoved.current = true;
        }
        targetPos.current.x += dx * 1.1;
        targetPos.current.y += dy * 1.1;
        startPos.current = { x: e.clientX, y: e.clientY };
      } else {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        targetPos.current.rotY = xNorm * 5;
        targetPos.current.rotX = -yNorm * 5;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1 && !e.target.closest('input') && !e.target.closest('textarea')) {
        isDragging.current = true;
        dragMoved.current = false;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startPos.current.x;
        const dy = e.touches[0].clientY - startPos.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragMoved.current = true;
        }
        targetPos.current.x += dx * 1.3;
        targetPos.current.y += dy * 1.3;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleTileClick = (item) => {
    if (dragMoved.current) return;
    setSelectedMedia(item);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#020C1B] text-slate-100 font-sans select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1300px' }}
    >
      {/* Deep Atmosphere Glows */}
      <div className="absolute inset-0 bg-[#020C1B] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#020C1B_95%)] pointer-events-none z-10" />

      {/* ======================================================== */}
      {/* FLOATING INTERACTIVE HUD TAG ("DRAG & CLICK TO EXPLORE") */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#041026]/90 border border-cyan-400/40 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-bold tracking-wider">
            DRAG TO PAN 3D BROADSHEET • CLICK ANY NEWSPAPER TILE TO EXPAND
          </span>
          <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3D NEWSPAPER BROADSHEET MATRIX (AUTHENTIC EDITORIAL LAYOUT) */}
      {/* ======================================================== */}
      <div
        ref={canvas3DRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2200px] h-[1350px] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* TILE 1 (ROW 0, COL 0): EDITORIAL LEAD STORY WITH VIDEO CLIP  */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[0])}
          className="group absolute left-[0px] top-[0px] w-[500px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(45px)' }}
        >
          {/* Newspaper Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-2 text-[10px] font-mono text-cyan-300">
            <span className="font-bold uppercase tracking-wider">SECTION 1 // LEAD BROADCAST</span>
            <span className="text-slate-400 font-mono">VOL. 26 • ISSUE 01</span>
          </div>

          <div className="my-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              {SHOWCASE_ITEMS[0].kicker}
            </span>
            <h3 className="text-lg font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-cyan-200 transition-colors">
              {SHOWCASE_ITEMS[0].title}
            </h3>
          </div>

          {/* Embedded CRT Video Box */}
          <div className="relative w-full h-44 bg-black border border-white/15 overflow-hidden my-auto">
            <video
              src="/show/finalreel_navra.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-mono text-cyan-300 border border-white/20">
              ● LIVE 4K MONITOR
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
              <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Two-Column Newspaper Article Paragraph */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-[10px] font-mono text-slate-300 leading-relaxed">
            <p className="border-r border-white/10 pr-2">
              <strong className="text-cyan-300">NAVRA DESK —</strong> High-velocity pacing, speed ramps, and bespoke anamorphic color grading.
            </p>
            <p className="text-slate-400">
              Engineered for broadcast campaigns and digital growth conversions.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-400">
            <span className="group-hover:underline">▶ Click to Read Article & Play Reel</span>
            <span className="text-slate-400 font-bold">NV® 2026</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 2 (ROW 0, COL 1): "WE (ARE) CREATORS, NOT CONSUMERS"    */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[0])}
          className="group absolute left-[520px] top-[0px] w-[580px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/50 hover:border-cyan-300 rounded-none p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(65px)' }}
        >
          {/* Newspaper Masthead Banner */}
          <div className="flex items-center justify-between border-b-2 border-cyan-400/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black font-serif tracking-widest text-white uppercase">
                NAVRA STUDIO CHRONICLE
              </span>
            </div>
            <div className="text-[10px] font-mono text-cyan-300 font-bold tracking-wider">
              OFFICIAL PRESS ®
            </div>
          </div>

          <div className="relative my-auto flex items-center justify-between">
            <div className="max-w-[340px] z-10">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
                EDITORIAL MANIFESTO
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-white leading-tight">
                We (Are) <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
                  Creators,
                </span> <br />
                Not Consumers
              </h2>
              
              {/* Newspaper Editorial Columns */}
              <div className="mt-3 text-[11px] font-mono text-slate-300 leading-relaxed space-y-1">
                <p>We connect cinematic storytelling with digital software engineering.</p>
                <div className="flex items-center gap-2 pt-2 text-[10px] text-cyan-300 font-bold">
                  <span className="px-2 py-0.5 bg-blue-600/30 border border-cyan-400/40">01 CRAFT</span>
                  <span className="px-2 py-0.5 bg-blue-600/30 border border-cyan-400/40">02 DIRECT</span>
                  <span className="px-2 py-0.5 bg-blue-600/30 border border-cyan-400/40">03 SCALE</span>
                </div>
              </div>
            </div>

            {/* 3D Figurine Silhouette Graphics */}
            <div className="flex items-center gap-2 opacity-85 group-hover:scale-105 transition-transform">
              <div className="w-16 h-32 bg-gradient-to-b from-cyan-400/30 via-blue-600/20 to-transparent border border-cyan-400/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-cyan-300/40 border border-cyan-300 mb-1" />
                <div className="w-10 h-16 rounded-none bg-blue-600/30 border border-cyan-400/30" />
              </div>
              <div className="w-16 h-32 bg-gradient-to-b from-blue-500/30 via-indigo-600/20 to-transparent border border-blue-400/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-blue-300/40 border border-blue-300 mb-1" />
                <div className="w-10 h-16 rounded-none bg-indigo-600/30 border border-blue-400/30" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t-2 border-white/20 text-[10px] font-mono text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ Expand Manifesto & Watch Reel</span>
            <span className="text-cyan-400 font-bold">PAGE 01</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 3 (ROW 0, COL 2): VIBRANT NEON BROADSHEET ("NOT CONSUMERS") */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[1])}
          className="group absolute left-[1120px] top-[0px] w-[500px] h-[400px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 border-2 border-cyan-200 p-7 shadow-[0_30px_70px_rgba(6,182,212,0.4)] flex flex-col justify-between overflow-hidden text-black cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          style={{ transform: 'translateZ(85px) rotateZ(-1deg)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <div className="flex items-center justify-between z-10 border-b-2 border-black/30 pb-2">
            <span className="text-xs font-mono font-black tracking-widest uppercase">
              SPECIAL BROADSHEET // ISSUE 02
            </span>
            <Barcode className="w-8 h-6 text-black" />
          </div>

          <div className="relative my-auto z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1">
              EDITORIAL HEADLINE
            </span>
            <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none font-serif">
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
            <p className="text-xs font-mono font-medium mt-2 max-w-xs leading-snug">
              We connect the real world with high-tier digital media and interactive motion.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono font-black z-10 pt-2 border-t-2 border-black/30">
            <span>((NV)) BRAND STANDARD</span>
            <span>★ CLICK TO WATCH WORKSHOP</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 4 (ROW 0, COL 3): METALLIC BLUEPRINT GAZETTE CARD       */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[5])}
          className="group absolute left-[1640px] top-[0px] w-[500px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              BLUEPRINT SPECIFICATION // 100% & 400%
            </span>
            <span className="text-slate-400">REF: NV-09</span>
          </div>

          <div className="relative w-full h-48 bg-blue-950/40 border border-cyan-500/30 flex items-center justify-center overflow-hidden my-auto p-4">
            <div className="absolute w-36 h-36 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-24 h-24 rounded-full border border-dashed border-blue-400/40 animate-spin" style={{ animationDuration: '14s' }} />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(56,189,248,0.6)] flex items-center justify-center text-black font-black text-lg mb-1">
                NV
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                CHROME TOY SPEC
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                VECTOR MOTION RENDER
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ View Motion Identity</span>
            <span className="text-cyan-400 font-bold">PAGE 06</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 5 (ROW 1, COL 0): FESTIVAL REEL (NAVRANG NAVRATRI)      */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[3])}
          className="group absolute left-[0px] top-[430px] w-[500px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(55px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              CULTURE GAZETTE // FESTIVAL PROMO
            </span>
            <span className="text-slate-400">150K+ VIEWS</span>
          </div>

          <div className="my-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
              {SHOWCASE_ITEMS[3].kicker}
            </span>
            <h3 className="text-base font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-cyan-200">
              {SHOWCASE_ITEMS[3].title}
            </h3>
          </div>

          <div className="relative w-full h-44 bg-black border border-white/15 overflow-hidden my-auto">
            <video
              src="/show/navrang_navratri.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="pt-2 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ Watch Festival Reel</span>
            <span className="text-cyan-400 font-bold">PAGE 04</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 6 (ROW 1, COL 1): BROADSIDE HEADLINE BLOCK              */}
        {/* ============================================================ */}
        <div
          className="group absolute left-[520px] top-[430px] w-[580px] h-[400px] bg-[#040E20]/95 border-2 border-white/20 rounded-none p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-3 text-xs font-mono text-cyan-300">
            <span className="font-bold tracking-widest">★ THE NAVRA ARCHIVE</span>
            <Barcode className="w-8 h-5 text-slate-400" />
          </div>

          <div className="my-auto text-center">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold block mb-2">
              SPECIAL EDITORIAL ISSUE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-tight text-white leading-none mb-3">
              NAVRA STUDIO COLLECTION
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300 border-t border-b border-white/10 py-2">
              <span>★ COMMERCIAL DIRECTION</span>
              <span>★ 3D MOTION CGI</span>
              <span>★ FESTIVAL REELS</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t-2 border-white/20 text-xs font-mono text-slate-400">
            <span>LAT 28.61° N / 77.20° E</span>
            <span className="px-3 py-1 bg-blue-600/30 border border-cyan-400/40 text-cyan-300 font-bold">
              NV® 2026
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 7 (ROW 1, COL 2): LUXURY COMMERCIAL GAZETTE AD          */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[7])}
          className="group absolute left-[1120px] top-[430px] w-[500px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-amber-400/40 hover:border-amber-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(65px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-amber-300 font-bold uppercase">
              ★ COMMERCIAL GAZETTE // LUXURY AD
            </span>
            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold">
              25% OFF
            </span>
          </div>

          <div className="my-1.5">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
              {SHOWCASE_ITEMS[7].kicker}
            </span>
            <h3 className="text-base font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-amber-200">
              {SHOWCASE_ITEMS[7].title}
            </h3>
          </div>

          <div className="relative w-full h-44 bg-slate-950 border border-white/15 overflow-hidden my-auto flex items-center justify-center">
            <img
              src="/show/wedding_collection.png"
              alt="Luxury Wedding Collection"
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
            <span className="text-amber-300 group-hover:underline">▶ Inspect Commercial Poster</span>
            <span className="text-amber-300 font-bold">PAGE 08</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 8 (ROW 1, COL 3): KINETIC MOTION TYPOGRAPHY BROADCAST   */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[5])}
          className="group absolute left-[1640px] top-[430px] w-[500px] h-[400px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(55px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              TECH DISPATCH // MOTION ID
            </span>
            <span className="text-slate-400">60 FPS</span>
          </div>

          <div className="my-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
              {SHOWCASE_ITEMS[5].kicker}
            </span>
            <h3 className="text-base font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-cyan-200">
              {SHOWCASE_ITEMS[5].title}
            </h3>
          </div>

          <div className="relative w-full h-44 bg-black border border-white/15 overflow-hidden my-auto">
            <video
              src="/show/motion_design.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="pt-2 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ Watch Motion Design</span>
            <span className="text-cyan-400 font-bold">PAGE 06</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 9 (ROW 2, COL 0): WORKSHOP LIVE PROMO REEL CARD         */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[1])}
          className="group absolute left-[0px] top-[860px] w-[500px] h-[450px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              EDUCATION WIRE // MASTERCLASS
            </span>
            <span className="text-slate-400">LIVE SESSIONS</span>
          </div>

          <div className="my-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
              {SHOWCASE_ITEMS[1].kicker}
            </span>
            <h3 className="text-base font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-cyan-200">
              {SHOWCASE_ITEMS[1].title}
            </h3>
          </div>

          <div className="relative w-full h-56 bg-black border border-white/15 overflow-hidden my-auto">
            <video
              src="/show/workshop_promo.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ Watch Workshop Edit</span>
            <span className="text-cyan-400 font-bold">PAGE 02</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 10 (ROW 2, COL 1): PRE-ORDER COMMERCIAL FILM CARD       */}
        {/* ============================================================ */}
        <div
          onClick={() => handleTileClick(SHOWCASE_ITEMS[2])}
          className="group absolute left-[520px] top-[860px] w-[580px] h-[450px] bg-[#040E20]/95 hover:bg-[#061530] border-2 border-cyan-400/40 hover:border-cyan-300 rounded-none p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-[10px] font-mono">
            <span className="text-cyan-300 font-bold uppercase">
              COMMERCIAL AD WIRE // PRODUCT
            </span>
            <span className="text-slate-400">+340% ROAS</span>
          </div>

          <div className="my-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
              {SHOWCASE_ITEMS[2].kicker}
            </span>
            <h3 className="text-base font-black font-serif uppercase tracking-tight text-white leading-tight group-hover:text-cyan-200">
              {SHOWCASE_ITEMS[2].title}
            </h3>
          </div>

          <div className="relative w-full h-56 bg-black border border-white/15 overflow-hidden my-auto">
            <video
              src="/show/preorder_final_reel.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
            <span className="text-cyan-300 group-hover:underline">▶ Watch Pre-Order Film</span>
            <span className="text-cyan-400 font-bold">PAGE 03</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TILE 11 (ROW 2, COL 2-3 WIDE): SECTION C // CLASSIFIEDS FORM */}
        {/* ============================================================ */}
        <div
          className="absolute left-[1120px] top-[860px] w-[1020px] h-[450px] bg-[#040E20]/95 border-2 border-cyan-400/50 rounded-none p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(75px)' }}
        >
          {/* Newspaper Classifieds Masthead */}
          <div className="flex items-center justify-between border-b-2 border-cyan-400/50 pb-2.5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold uppercase tracking-wider">
                SECTION C // PRESS CLASSIFIEDS & DIRECT DISPATCH
              </span>
            </div>
            <Barcode className="w-8 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto">
            {/* Left Info Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                  OFFICIAL INQUIRY DESK
                </span>
                <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-white leading-tight mb-2">
                  Commission Your <br />
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    Next Masterpiece
                  </span>
                </h3>
                <p className="text-xs text-slate-300 font-mono leading-relaxed mb-4">
                  Initiate an editorial media sprint for cinematic reels, 3D CGI visuals, or complete visual branding.
                </p>

                <div className="space-y-2 text-xs font-mono">
                  <a
                    href="mailto:harshjsh02@gmail.com"
                    className="flex items-center gap-2.5 p-2.5 bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-300" />
                    <span>harshjsh02@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-2.5 p-2.5 bg-black/60 border border-white/15 text-slate-300">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span>Designed & Built by Harsh Joshi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Classifieds Form */}
            <div className="md:col-span-7 bg-black/50 border border-white/15 p-4">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
                  <div className="w-12 h-12 bg-cyan-400/20 border border-cyan-400 text-cyan-300 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold uppercase text-white font-mono">
                    DISPATCH TRANSMITTED
                  </span>
                  <p className="text-[11px] text-slate-300 font-mono">
                    Thank you! Harsh Joshi & Navra Studio will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-2 text-[11px] font-mono">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-cyan-300 uppercase mb-0.5 font-bold">
                        Name / Organization
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John / Apex"
                        className="w-full px-3 py-2 bg-black/70 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-300 uppercase mb-0.5 font-bold">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 bg-black/70 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyan-300 uppercase mb-0.5 font-bold">
                      Project Brief & Deliverables
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Describe your video, reel, 3D, or campaign requirements..."
                      className="w-full px-3 py-2 bg-black/70 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-400 text-black font-black uppercase tracking-wider text-xs hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Transmit Project Dispatch</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t-2 border-white/20 text-[10px] font-mono text-slate-500">
            <span>NAVRA CHRONICLE // ALL RIGHTS RESERVED</span>
            <span className="text-cyan-400 font-bold">PAGE 10 • NV® 2026</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULL-SCREEN ARTICLE & VIDEO CINEMA MODAL                 */}
      {/* ======================================================== */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#030D1E] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-white/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  [{selectedMedia.edition}] // {selectedMedia.client}
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-serif uppercase text-white mt-0.5">
                  {selectedMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center border border-white/15 mb-4 overflow-hidden">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.mediaSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.mediaSrc}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain p-2"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono mb-2">
                  <strong className="text-cyan-300">{selectedMedia.dateline}</strong>
                  {selectedMedia.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedMedia.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-cyan-400/20 text-cyan-300 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedMedia(null)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shrink-0 cursor-pointer"
              >
                <span>Back to 3D Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
