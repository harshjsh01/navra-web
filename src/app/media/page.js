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
  Move,
  Search,
  Quote,
  Maximize2
} from 'lucide-react';

const SHOWCASE_ARTICLES = [
  {
    id: 1,
    title: 'CREATIVE AGENCY UNVEILS CINEMATIC MEDIA MATRIX',
    highlightWord: 'UNVEILED TODAY',
    kicker: 'LEAD STORY // 4K MASTER CUT',
    client: 'NAVRA STUDIO LAB // 2026',
    byline: 'By Harsh Joshi, Chief Media Director',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/finalreel_navra.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • VOL. 26',
    duration: '1:10',
    resolution: '4K CINEMA',
    caption: 'Fig 1.1 — Master 4K studio showreel showcasing dynamic speed ramps, anamorphic color grading, and commercial storytelling.',
    dateline: 'NEW DELHI — ',
    col1: 'In a landmark release for digital creative production, Navra Studio has revealed its full-spectrum media workflow, merging high-velocity video editing with bespoke sound engineering.',
    col2: 'The signature showreel demonstrates precision narrative pacing, speed ramp transitions, and studio-grade color science engineered to captivate audiences and maximize viewer retention across multi-channel digital platforms.',
    quote: 'We engineer visual identities and cinematic reels that command attention in an overcrowded digital landscape.',
  },
  {
    id: 2,
    title: 'HANDS-ON MASTERCLASS WORKSHOPS EXPAND DIGITAL CRAFT',
    highlightWord: 'LIVE SESSIONS',
    kicker: 'EDUCATION WIRE // DESIGN PIPELINE',
    client: 'NAVRA WORKSHOPS // LIVE',
    byline: 'By Editorial Bureau',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/workshop_promo.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 01 • LOWER QUADRANT',
    duration: '0:40',
    resolution: '1080P 60FPS',
    caption: 'Fig 1.2 — Live masterclass creative session demonstrating dynamic graphic workflows and software pipelines.',
    dateline: 'STUDIO DESK — ',
    col1: 'Navra Studio creative masterclasses provide interactive training in kinetic typography, software automation, and commercial video post-production.',
    col2: 'Participants engage in real-time project breakdowns, learning how to structure retention-optimized reels for high-impact brand campaigns.',
    quote: 'Bridging the gap between raw concept and finished broadcast masters.',
  },
  {
    id: 3,
    title: 'EXCLUSIVE PRE-ORDER CAMPAIGN ACHIEVES RECORD ROAS',
    highlightWord: 'HIGH CONVERSION',
    kicker: 'COMMERCIAL DISPATCH // AD SUITE',
    client: 'PRODUCT LAUNCH // COMMERCIAL',
    byline: 'By Commercial Analytics Desk',
    category: 'Commercials',
    type: 'video',
    mediaSrc: '/show/preorder_final_reel.mp4',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 01 • COMMERCE',
    duration: '0:45',
    resolution: '4K ULTRA HD',
    caption: 'Fig 1.3 — High-conversion commercial ad reel featuring product launch overlays and retention hooks.',
    dateline: 'MARKETING WIRE — ',
    col1: 'Engineered specifically for paid social marketing funnels, the pre-order commercial video utilizes aggressive opening hooks and synchronized audio cues.',
    col2: 'Campaign analytics indicate a +340% increase in ROAS and unprecedented click-through rates across Instagram, TikTok, and YouTube Shorts.',
    quote: 'Every frame is engineered to hold attention and drive direct purchase intent.',
  },
  {
    id: 4,
    title: 'CULTURAL FESTIVALS CAPTIVATED BY FAST-PACED REELS',
    highlightWord: 'FESTIVE REACH',
    kicker: 'CULTURAL BROADSIDE // STAGE PRODUCTION',
    client: 'CULTURAL EXPERIENCE // 2026',
    byline: 'By Cultural Affairs Correspondent',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navrang_navratri.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • EVENT WIRE',
    duration: '0:15',
    resolution: '1080P HD',
    caption: 'Fig 1.4 — Festive promotional reel capturing live stage energy with precision music synchronization.',
    dateline: 'MUMBAI — ',
    col1: 'Navrang Navratri and Navratri Rangat event coverage generated over 430,000 combined impressions across festive digital channels.',
    col2: 'Fast-cut editing paired with vibrant traditional color balance brought the raw energy of live stage performances directly to mobile feeds.',
    quote: 'Preserving cultural grandeur through modern cinematic pacing.',
  },
  {
    id: 5,
    title: '3D MOTION CGI & KINETIC TYPOGRAPHY REACH NEW FRONTIERS',
    highlightWord: 'DIGITAL INNOVATION',
    kicker: 'TECHNOLOGY REPORT // VECTOR LAB',
    client: 'NAVRA MOTION LAB',
    byline: 'By Tech & Motion Editor',
    category: '3D Motion',
    type: 'video',
    mediaSrc: '/show/motion_design.mp4',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 02 • TECH DESK',
    duration: '0:20',
    resolution: 'VECTOR 60FPS',
    caption: 'Fig 2.1 — Kinetic typography motion reel with vector logo simulations and fluid transitions.',
    dateline: 'INNOVATION LAB — ',
    col1: 'By combining SVG vector math with 3D CGI simulations, Navra Studio produces digital motion identities that elevate web and software interfaces.',
    col2: 'Modern brands demand fluid kinetic systems that transition seamlessly from video advertising into live digital product environments.',
    quote: 'Typography in motion is the heartbeat of contemporary digital brand systems.',
  },
  {
    id: 6,
    title: 'ATMOSPHERIC CINEMATIC SEQUENCE CAPTURES VISUAL POETRY',
    highlightWord: 'CINEMA CRITIQUE',
    kicker: 'VISUAL ESSAY // COLOR SCIENCE',
    client: 'VISUAL STORYTELLING LAB',
    byline: 'By Film & Optics Reviewer',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/walk_cinematic.mov',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 02 • ARTS',
    duration: '0:45',
    resolution: '4K CINEMA',
    caption: 'Fig 2.2 — Anamorphic visual sequence showcasing bespoke LUT color grading and wide-angle framing.',
    dateline: 'CINEMA WIRE — ',
    col1: 'Exploring the subtle interplay between natural lighting and digital grading algorithms, this visual sequence demonstrates mood development.',
    col2: 'Anamorphic lens emulation paired with spatial audio design creates an immersive narrative experience suited for high-end brand films.',
    quote: 'Light, shadow, and pacing unite to form unforgettable visual stories.',
  },
  {
    id: 7,
    title: 'ROYAL WEDDING JEWELRY COLLECTION ANNOUNCES 25% SAVINGS',
    highlightWord: 'COMMERCIAL AD',
    kicker: 'SPECIAL COMMERCIAL GAZETTE',
    client: 'FINE JEWELRY BROADSIDE',
    byline: 'Sponsored Feature',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 02 • ADVERTISEMENT',
    duration: 'PRINT AD',
    resolution: '1080x1080 HQ',
    caption: 'Fig 2.3 — Commercial ad creative for the Luxury Gold & Diamond Wedding Collection.',
    dateline: 'COMMERCIAL DESK — ',
    col1: 'Explore our latest wedding collection in gold and diamond at an exclusive 25% discount available until 23rd November.',
    col2: 'Crafted with timeless elegance and certified purity. Visit authorized showrooms or reserve exclusive collection pieces online.',
    quote: 'Elegance refined. Tradition celebrated with royal gold craftsmanship.',
  },
  {
    id: 8,
    title: 'AGENCY BRAND IDENTITY SYSTEM SETS NEW VISUAL STANDARD',
    highlightWord: 'BRAND ARCHIVE',
    kicker: 'GRAPHIC DESIGN // IDENTITY',
    client: 'NAVRA STUDIO BRAND ARCHIVE',
    byline: 'By Design Standards Bureau',
    category: 'Brand & Print',
    type: 'image',
    mediaSrc: '/show/we_agency.png',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 02 • IDENTITY',
    duration: 'BRAND ID',
    resolution: '1080x1080 HQ',
    caption: 'Fig 2.4 — Comprehensive agency visual identity layout and typography hierarchy.',
    dateline: 'DESIGN ARCHIVE — ',
    col1: 'The Navra Studio brand identity system establishes a rigorous typographic hierarchy, balancing bold serif authority with clean monospaced precision.',
    col2: 'Applied across digital merchandise, print publications, and software HUD interfaces for complete brand consistency.',
    quote: 'Consistent identity architecture builds long-term brand equity.',
  },
];

export default function MediaPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const containerRef = useRef(null);
  const broadsheetRef = useRef(null);

  // Drag & Physics refs
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: -200, y: -100, rotX: 0, rotY: 0 });
  const targetPos = useRef({ x: -200, y: -100, rotX: 0, rotY: 0 });

  useEffect(() => {
    const sheet = broadsheetRef.current;
    if (!sheet) return;

    let animationFrameId;
    const renderLoop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;
      currentPos.current.rotX += (targetPos.current.rotX - currentPos.current.rotX) * 0.1;
      currentPos.current.rotY += (targetPos.current.rotY - currentPos.current.rotY) * 0.1;

      if (sheet) {
        sheet.style.transform = `
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
        targetPos.current.rotY = xNorm * 4.5;
        targetPos.current.rotX = -yNorm * 4.5;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Wheel scrolling support
    const handleWheel = (e) => {
      targetPos.current.x -= e.deltaX * 0.8;
      targetPos.current.y -= e.deltaY * 0.8;
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
        targetPos.current.x += dx * 1.2;
        targetPos.current.y += dy * 1.2;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleArticleClick = (article) => {
    if (dragMoved.current) return;
    setSelectedArticle(article);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#020C1B] text-slate-200 font-sans select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1400px' }}
    >
      {/* Deep Space Background Atmosphere */}
      <div className="absolute inset-0 bg-[#020C1B] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#020C1B_95%)] pointer-events-none z-10" />

      {/* Floating HUD Instruction Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#041026]/95 border border-cyan-400/50 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-bold tracking-wider uppercase">
            DRAG TO PAN BROADSHEET • CLICK ANY ARTICLE TO READ & PLAY VIDEO
          </span>
          <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* CONTINUOUS 2-PAGE NEWSPAPER BROADSHEET CANVAS (3D PLANE) */}
      {/* ======================================================== */}
      <div
        ref={broadsheetRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[1550px] will-change-transform flex gap-8 p-6"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* PAGE 1: FRONT PAGE BROADSHEET (LEFT NEWSPAPER SHEET)         */}
        {/* ============================================================ */}
        <div 
          className="w-[1160px] h-full bg-[#040E20]/95 border-2 border-white/20 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div>
            {/* Top Newspaper Issue Bar */}
            <div className="flex items-center justify-between border-b-2 border-white/20 pb-2 text-[11px] font-mono text-cyan-300 font-bold">
              <span>VOL. XXVI // NO. 8802</span>
              <span>WEDNESDAY, AUGUST 19, 2026</span>
              <span>PRICE: SPECIAL MEDIA EDITION</span>
              <span>WEATHER: 60FPS CINEMA</span>
            </div>

            {/* Classic Newspaper Grand Masthead */}
            <div className="py-5 text-center border-b-4 border-double border-white/30 my-2">
              <h1 className="text-6xl sm:text-7xl font-black font-serif uppercase tracking-tight text-white leading-none">
                THE NAVRA CHRONICLE
              </h1>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                <span>• CINEMATIC REELS</span>
                <span>• 3D MOTION CGI</span>
                <span>• BRAND IDENTITIES</span>
                <span>• FESTIVAL BROADCASTS</span>
                <span>• COMMERCIAL SUITES</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LEAD STORY (ARTICLE 1: FINALREEL SHOWCASE)               */}
            {/* ======================================================== */}
            <div 
              onClick={() => handleArticleClick(SHOWCASE_ARTICLES[0])}
              className="group cursor-pointer border-b-2 border-white/20 pb-6 my-4 transition-colors hover:bg-blue-950/20 p-3 -mx-3"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold mb-1">
                <span>{SHOWCASE_ARTICLES[0].kicker}</span>
                <span>{SHOWCASE_ARTICLES[0].byline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-serif uppercase text-white leading-tight mb-3 group-hover:text-cyan-200 transition-colors">
                {SHOWCASE_ARTICLES[0].title} <span className="bg-cyan-500/30 text-cyan-300 px-2 py-0.5 border border-cyan-400/40 text-2xl align-middle font-mono">{SHOWCASE_ARTICLES[0].highlightWord}</span>
              </h2>

              <div className="grid grid-cols-12 gap-5">
                {/* Lead Video / Image Frame */}
                <div className="col-span-7">
                  <div className="relative w-full h-64 bg-black border border-white/20 overflow-hidden shadow-lg">
                    <video
                      src={SHOWCASE_ARTICLES[0].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-cyan-300">
                      ▶ CLICK TO PLAY MASTER 4K VIDEO
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 italic leading-tight">
                    {SHOWCASE_ARTICLES[0].caption}
                  </p>
                </div>

                {/* Lead Article Multi-Column Story Text */}
                <div className="col-span-5 flex flex-col justify-between text-xs font-mono text-slate-300 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-cyan-300 font-bold text-sm">{SHOWCASE_ARTICLES[0].dateline}</strong>
                    {SHOWCASE_ARTICLES[0].col1}
                  </p>
                  <p className="text-slate-400">
                    {SHOWCASE_ARTICLES[0].col2}
                  </p>
                  <div className="p-3 bg-blue-950/40 border-l-2 border-cyan-400 text-xs italic font-serif text-cyan-200">
                    "{SHOWCASE_ARTICLES[0].quote}"
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* FRONT PAGE LOWER HALF (3-COLUMN SUB-STORIES)             */}
            {/* ======================================================== */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              
              {/* SUB-STORY A: WORKSHOP SESSIONS */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[1])}
                className="group cursor-pointer border-r border-white/20 pr-4 hover:bg-blue-950/20 p-2 transition-colors"
              >
                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1 uppercase">
                  {SHOWCASE_ARTICLES[1].kicker}
                </span>
                <h3 className="text-base font-black font-serif uppercase text-white leading-tight mb-2 group-hover:text-cyan-200">
                  {SHOWCASE_ARTICLES[1].title}
                </h3>
                <div className="relative w-full h-32 bg-black border border-white/15 overflow-hidden mb-2">
                  <video
                    src={SHOWCASE_ARTICLES[1].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[8px] font-mono text-cyan-300">
                    PLAY REEL
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">
                  <strong className="text-cyan-300">{SHOWCASE_ARTICLES[1].dateline}</strong>
                  {SHOWCASE_ARTICLES[1].col1}
                </p>
              </div>

              {/* SUB-STORY B: PRE-ORDER CAMPAIGN */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[2])}
                className="group cursor-pointer border-r border-white/20 pr-4 hover:bg-blue-950/20 p-2 transition-colors"
              >
                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1 uppercase">
                  {SHOWCASE_ARTICLES[2].kicker}
                </span>
                <h3 className="text-base font-black font-serif uppercase text-white leading-tight mb-2 group-hover:text-cyan-200">
                  {SHOWCASE_ARTICLES[2].title}
                </h3>
                <div className="relative w-full h-32 bg-black border border-white/15 overflow-hidden mb-2">
                  <video
                    src={SHOWCASE_ARTICLES[2].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[8px] font-mono text-cyan-300">
                    PLAY AD
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">
                  <strong className="text-cyan-300">{SHOWCASE_ARTICLES[2].dateline}</strong>
                  {SHOWCASE_ARTICLES[2].col1}
                </p>
              </div>

              {/* SUB-STORY C: FESTIVAL REELS */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[3])}
                className="group cursor-pointer hover:bg-blue-950/20 p-2 transition-colors"
              >
                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1 uppercase">
                  {SHOWCASE_ARTICLES[3].kicker}
                </span>
                <h3 className="text-base font-black font-serif uppercase text-white leading-tight mb-2 group-hover:text-cyan-200">
                  {SHOWCASE_ARTICLES[3].title}
                </h3>
                <div className="relative w-full h-32 bg-black border border-white/15 overflow-hidden mb-2">
                  <video
                    src={SHOWCASE_ARTICLES[3].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[8px] font-mono text-cyan-300">
                    PLAY FEST
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">
                  <strong className="text-cyan-300">{SHOWCASE_ARTICLES[3].dateline}</strong>
                  {SHOWCASE_ARTICLES[3].col1}
                </p>
              </div>

            </div>
          </div>

          {/* Page 1 Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-white/20 pt-2 text-[10px] font-mono text-slate-400">
            <span>THE NAVRA CHRONICLE // FRONT PAGE</span>
            <span className="text-cyan-400 font-bold">PAGE 01 • CONTINUED ON PAGE 02 →</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PAGE 2: SECTION B (TECHNOLOGY, COMMERCE & CLASSIFIEDS)       */}
        {/* ============================================================ */}
        <div 
          className="w-[1160px] h-full bg-[#040E20]/95 border-2 border-white/20 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div>
            {/* Section B Header Bar */}
            <div className="flex items-center justify-between border-b-2 border-white/20 pb-2 text-[11px] font-mono text-cyan-300 font-bold">
              <span>SECTION B // ARTS, TECHNOLOGY & COMMERCE</span>
              <span>NAVRA STUDIO INTERNATIONAL EDITION</span>
              <span>PAGE 02 • VOL. 26</span>
            </div>

            {/* ======================================================== */}
            {/* TOP ROW: 3D MOTION STORY & CINEMATIC ESSAY               */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-6 my-4 border-b-2 border-white/20 pb-6">
              
              {/* Story 5: 3D Motion */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[4])}
                className="col-span-6 group cursor-pointer border-r border-white/20 pr-6 hover:bg-blue-950/20 p-2 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold mb-1">
                  <span>{SHOWCASE_ARTICLES[4].kicker}</span>
                  <span>60 FPS</span>
                </div>
                <h3 className="text-xl font-black font-serif uppercase text-white leading-tight mb-2 group-hover:text-cyan-200">
                  {SHOWCASE_ARTICLES[4].title}
                </h3>
                <div className="relative w-full h-44 bg-black border border-white/15 overflow-hidden mb-2">
                  <video
                    src={SHOWCASE_ARTICLES[4].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-mono text-cyan-300">
                    ▶ PLAY 3D MOTION REEL
                  </div>
                </div>
                <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                  <strong className="text-cyan-300">{SHOWCASE_ARTICLES[4].dateline}</strong>
                  {SHOWCASE_ARTICLES[4].col1}
                </p>
              </div>

              {/* Story 6: Cinematic Walk & Color Science */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[5])}
                className="col-span-6 group cursor-pointer hover:bg-blue-950/20 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold mb-1">
                    <span>{SHOWCASE_ARTICLES[5].kicker}</span>
                    <span>4K CINEMA</span>
                  </div>
                  <h3 className="text-xl font-black font-serif uppercase text-white leading-tight mb-2 group-hover:text-cyan-200">
                    {SHOWCASE_ARTICLES[5].title}
                  </h3>
                  <div className="relative w-full h-44 bg-black border border-white/15 overflow-hidden mb-2">
                    <video
                      src={SHOWCASE_ARTICLES[5].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-mono text-cyan-300">
                      ▶ PLAY CINEMA FILM
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">{SHOWCASE_ARTICLES[5].dateline}</strong>
                    {SHOWCASE_ARTICLES[5].col1}
                  </p>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* MIDDLE ROW: LUXURY ADVERTISEMENT & BRAND IDENTITY        */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-6 my-4 border-b-2 border-white/20 pb-6">
              
              {/* Luxury Wedding Jewelry Newspaper Ad */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[6])}
                className="col-span-7 group cursor-pointer border-2 border-amber-400/40 bg-amber-950/10 p-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-amber-400/30 pb-1.5 text-[10px] font-mono text-amber-300 font-bold mb-2">
                  <span>★ OFFICIAL COMMERCIAL GAZETTE ADVERTISEMENT</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-200">COUPON: NAVRA25</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 h-40 bg-black border border-white/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={SHOWCASE_ARTICLES[6].mediaSrc}
                      alt="Jewelry Ad"
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="col-span-7 font-mono text-xs text-slate-300 leading-tight space-y-2">
                    <h4 className="text-base font-black font-serif uppercase text-amber-200">
                      {SHOWCASE_ARTICLES[6].title}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {SHOWCASE_ARTICLES[6].col1}
                    </p>
                    <div className="text-[10px] text-amber-300 font-bold pt-1">
                      ▶ CLICK TO VIEW FULL COMMERCIAL POSTER
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Design Standard Story */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[7])}
                className="col-span-5 group cursor-pointer hover:bg-blue-950/20 p-3 transition-colors border-l border-white/20"
              >
                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1 uppercase">
                  {SHOWCASE_ARTICLES[7].kicker}
                </span>
                <h4 className="text-base font-black font-serif uppercase text-white mb-2 group-hover:text-cyan-200">
                  {SHOWCASE_ARTICLES[7].title}
                </h4>
                <div className="h-32 bg-black border border-white/15 overflow-hidden flex items-center justify-center mb-2">
                  <img
                    src={SHOWCASE_ARTICLES[7].mediaSrc}
                    alt="Brand Identity"
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">
                  {SHOWCASE_ARTICLES[7].col1}
                </p>
              </div>

            </div>

            {/* ======================================================== */}
            {/* BOTTOM: OFFICIAL PRESS CLASSIFIEDS & CONTACT BUREAU      */}
            {/* ======================================================== */}
            <div className="border-2 border-cyan-400/50 bg-[#020C1B] p-5 my-2">
              <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">
                    SECTION C // OFFICIAL PRESS CLASSIFIEDS & DISPATCH BUREAU
                  </span>
                </div>
                <Barcode className="w-8 h-4 text-slate-400" />
              </div>

              <div className="grid grid-cols-12 gap-6 mt-3">
                <div className="col-span-5 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <h4 className="text-lg font-black font-serif uppercase text-white mb-1">
                      Commission a Media Production Sprint
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-tight mb-3">
                      Direct inquiries for promotional reels, 3D visual identities, and ad campaigns.
                    </p>
                    <div className="space-y-1.5 text-[11px]">
                      <a href="mailto:harshjsh02@gmail.com" className="flex items-center gap-2 text-cyan-300 hover:underline">
                        <Mail className="w-3.5 h-3.5" />
                        <span>harshjsh02@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Designed & Built by Harsh Joshi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-black/60 border border-white/15 p-3">
                  {formSubmitted ? (
                    <div className="flex items-center justify-center p-4 text-center space-x-2 text-cyan-300 font-mono text-xs">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>DISPATCH TRANSMITTED // BUREAU WILL REPLY IN 24H</span>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-2 text-[10px] font-mono">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          required
                          type="text"
                          placeholder="Name / Brand"
                          className="w-full px-2.5 py-1.5 bg-black/80 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-2.5 py-1.5 bg-black/80 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Project Brief & Requirements..."
                        className="w-full px-2.5 py-1.5 bg-black/80 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-cyan-400 text-black font-black uppercase tracking-wider text-xs hover:bg-cyan-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Transmit Project Dispatch</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page 2 Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-white/20 pt-2 text-[10px] font-mono text-slate-400">
            <span>NAVRA CHRONICLE // ALL RIGHTS RESERVED • HARSH JOSHI</span>
            <span className="text-cyan-400 font-bold">PAGE 02 • END OF EDITION</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULL-SCREEN ARTICLE & VIDEO CINEMA MODAL                 */}
      {/* ======================================================== */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#030D1E] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-white/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  [{selectedArticle.edition}] // {selectedArticle.kicker}
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-serif uppercase text-white mt-0.5">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center border border-white/15 mb-4 overflow-hidden">
              {selectedArticle.type === 'video' ? (
                <video
                  src={selectedArticle.mediaSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedArticle.mediaSrc}
                  alt={selectedArticle.title}
                  className="w-full h-full object-contain p-2"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono mb-2">
                  <strong className="text-cyan-300">{selectedArticle.dateline}</strong>
                  {selectedArticle.col1} {selectedArticle.col2}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-cyan-400/20 text-cyan-300 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shrink-0 cursor-pointer"
              >
                <span>Back to Broadsheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
