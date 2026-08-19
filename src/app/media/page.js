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
  Quote,
  Flame,
  Globe,
  Radio
} from 'lucide-react';

const SHOWCASE_ARTICLES = [
  {
    id: 1,
    title: 'CREATIVE AGENCY UNVEILS CINEMATIC MEDIA MATRIX',
    highlightWord: 'UNVEILED TODAY',
    kicker: 'FRONT PAGE LEAD // 4K MASTER CUT',
    client: 'NAVRA STUDIO LAB // 2026',
    byline: 'By Harsh Joshi, Chief Creative Director',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/finalreel_navra.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • VOL. XXVI',
    duration: '1:10',
    resolution: '4K CINEMA',
    caption: 'Fig 1.1 — Master 4K studio showreel showcasing dynamic speed ramps, anamorphic color grading, and commercial storytelling.',
    dateline: 'NEW DELHI — ',
    col1: 'In a major milestone for digital creative production, Navra Studio has officially unveiled its complete high-end media ecosystem. Merging high-velocity video editing with bespoke spatial sound engineering, the agency represents a new standard for brands seeking algorithmic dominance across digital feeds.',
    col2: 'The flagship showreel demonstrates intricate pacing algorithms, multi-cam synchronization, and proprietary LUT color grading engineered to hold audience attention within the first 3 seconds while driving retention past 85% on performance marketing campaigns.',
    col3: 'Industry observers note that the combination of custom typography motion and anamorphic framing delivers an unforgettable visual identity tailored for modern luxury, automotive, and tech leaders.',
    quote: 'We engineer visual identities and cinematic reels that command absolute authority in an overcrowded digital landscape.',
  },
  {
    id: 2,
    title: 'HANDS-ON MASTERCLASS WORKSHOPS EXPAND DIGITAL CRAFT',
    highlightWord: 'LIVE SESSIONS',
    kicker: 'EDUCATION WIRE // DESIGN LAB',
    client: 'NAVRA WORKSHOPS // LIVE',
    byline: 'By Editorial Training Bureau',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/workshop_promo.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'SECTION 1 • EDUCATION',
    duration: '0:40',
    resolution: '1080P 60FPS',
    caption: 'Fig 1.2 — Live masterclass creative session demonstrating dynamic graphic workflows and software pipelines.',
    dateline: 'STUDIO DESK — ',
    col1: 'Navra Studio creative masterclasses provide interactive training in kinetic typography, software automation, and commercial video post-production pipelines.',
    col2: 'Participants engage in real-time project breakdowns, learning how to structure retention-optimized reels for high-impact brand campaigns and client deliverables.',
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
    edition: 'SECTION 1 • COMMERCE',
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
    edition: 'SECTION 1 • EVENT WIRE',
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
    edition: 'SECTION 2 • TECH DESK',
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
    edition: 'SECTION 2 • ARTS',
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
    byline: 'Sponsored Commercial Feature',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    edition: 'SECTION 2 • ADVERTISEMENT',
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
    edition: 'SECTION 2 • IDENTITY',
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

  // Drag physics refs
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const targetPos = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const sheet = broadsheetRef.current;
    if (!sheet) return;

    let animationFrameId;
    const renderLoop = () => {
      // Smooth lerp physics
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;
      currentPos.current.rotX += (targetPos.current.rotX - currentPos.current.rotX) * 0.12;
      currentPos.current.rotY += (targetPos.current.rotY - currentPos.current.rotY) * 0.12;

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
        targetPos.current.x += dx * 1.25;
        targetPos.current.y += dy * 1.25;
        startPos.current = { x: e.clientX, y: e.clientY };
      } else {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        targetPos.current.rotY = xNorm * 3;
        targetPos.current.rotX = -yNorm * 3;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Trackpad & Mousewheel support for pan in both X and Y
    const handleWheel = (e) => {
      targetPos.current.x -= e.deltaX * 0.9;
      targetPos.current.y -= e.deltaY * 0.9;
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
        targetPos.current.x += dx * 1.4;
        targetPos.current.y += dy * 1.4;
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
      className="relative w-screen h-screen overflow-hidden bg-[#071120] select-none cursor-grab active:cursor-grabbing font-serif"
      style={{ perspective: '1400px' }}
    >
      {/* Studio Ambient Studio Lights & Dark Vignette */}
      <div className="absolute inset-0 bg-[#071120] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#030812_90%)] pointer-events-none z-10" />

      {/* Floating HUD Instructions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#111827]/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-bold tracking-wider uppercase font-mono">
            DRAG ANYWHERE TO PAN BROADSHEET • CLICK ANY ARTICLE TO READ & PLAY VIDEO
          </span>
          <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* ZOOMED-IN AUTHENTIC NEWSPAPER BROADSHEET CANVAS (3D)     */}
      {/* ======================================================== */}
      <div
        ref={broadsheetRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1850px] h-[2600px] will-change-transform p-8"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* THE AUTHENTIC NEWSPRINT PAPER SHEET                          */}
        {/* ============================================================ */}
        <div 
          className="w-full h-full bg-[#F4F1EA] text-[#111827] border-4 border-[#1E293B] p-10 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          style={{
            transform: 'translateZ(45px)',
            backgroundImage: 'radial-gradient(#111827 0.75px, transparent 0.75px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div>
            {/* Top Newspaper Issue Bar */}
            <div className="flex items-center justify-between border-b-2 border-[#1E293B] pb-2 text-xs font-mono text-[#1E293B] font-bold">
              <span>VOL. XXVI // NO. 8802</span>
              <span>WEDNESDAY, AUGUST 19, 2026</span>
              <span>PRICE: SPECIAL MEDIA EDITION</span>
              <span>WEATHER: 60FPS CINEMA // LAT 28.61° N</span>
            </div>

            {/* Grand Newspaper Masthead */}
            <div className="py-7 text-center border-b-4 border-double border-[#1E293B] my-2">
              <h1 className="text-7xl sm:text-9xl font-black uppercase tracking-tight text-[#0A0E17] leading-none">
                THE NAVRA CHRONICLE
              </h1>
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#1E293B]/40 text-xs font-mono text-[#374151] uppercase tracking-widest font-bold">
                <span>★ CINEMATIC REELS</span>
                <span>★ 3D MOTION CGI</span>
                <span>★ BRAND IDENTITIES</span>
                <span>★ FESTIVAL BROADCASTS</span>
                <span>★ COMMERCIAL SUITES</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 1. LEAD FRONT-PAGE STORY (MASTER SHOWREEL)               */}
            {/* ======================================================== */}
            <div 
              onClick={() => handleArticleClick(SHOWCASE_ARTICLES[0])}
              className="group cursor-pointer border-b-2 border-[#1E293B] pb-8 my-5 transition-colors hover:bg-black/5 p-4 -mx-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-2">
                <span className="bg-[#E0F2FE] px-2 py-0.5 border border-[#0284C7]/40 uppercase tracking-wider">
                  {SHOWCASE_ARTICLES[0].kicker}
                </span>
                <span className="text-[#4B5563]">{SHOWCASE_ARTICLES[0].byline}</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black uppercase text-[#0A0E17] leading-tight mb-4 group-hover:text-[#0284C7] transition-colors">
                {SHOWCASE_ARTICLES[0].title}{' '}
                <span className="bg-[#0284C7] text-white px-3 py-1 font-mono text-3xl align-middle font-bold">
                  {SHOWCASE_ARTICLES[0].highlightWord}
                </span>
              </h2>

              <div className="grid grid-cols-12 gap-8">
                {/* Lead Video Frame */}
                <div className="col-span-7">
                  <div className="relative w-full h-96 bg-black border-2 border-[#1E293B] overflow-hidden shadow-2xl">
                    <video
                      src={SHOWCASE_ARTICLES[0].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
                    <div className="absolute bottom-3 left-3 px-3.5 py-1.5 bg-[#0A0E17] border border-cyan-400 text-xs font-mono text-cyan-300 font-bold flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>CLICK TO PLAY MASTER 4K VIDEO</span>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-[#4B5563] mt-2 italic leading-tight">
                    {SHOWCASE_ARTICLES[0].caption}
                  </p>
                </div>

                {/* Lead Article Multi-Column Story Text */}
                <div className="col-span-5 flex flex-col justify-between text-sm text-[#1F2937] leading-relaxed space-y-4 font-serif">
                  <p className="text-base leading-normal">
                    <strong className="text-[#0284C7] font-bold font-mono uppercase">{SHOWCASE_ARTICLES[0].dateline}</strong>
                    {SHOWCASE_ARTICLES[0].col1}
                  </p>
                  <p className="text-[#374151]">
                    {SHOWCASE_ARTICLES[0].col2}
                  </p>
                  <p className="text-[#4B5563] text-xs font-mono">
                    {SHOWCASE_ARTICLES[0].col3}
                  </p>
                  <div className="p-4 bg-[#E0F2FE]/50 border-l-4 border-[#0284C7] text-sm italic font-serif text-[#0C4A6E]">
                    "{SHOWCASE_ARTICLES[0].quote}"
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 2. THREE-COLUMN MIDDLE SECTION                           */}
            {/* ======================================================== */}
            <div className="grid grid-cols-3 gap-8 py-6 border-b-2 border-[#1E293B]">
              
              {/* SUB-STORY A: WORKSHOP SESSIONS */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[1])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-6 hover:bg-black/5 p-3 transition-colors"
              >
                <span className="text-xs font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                  {SHOWCASE_ARTICLES[1].kicker}
                </span>
                <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                  {SHOWCASE_ARTICLES[1].title}
                </h3>
                <div className="relative w-full h-44 bg-black border-2 border-[#1E293B] overflow-hidden mb-3">
                  <video
                    src={SHOWCASE_ARTICLES[1].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0A0E17] text-[10px] font-mono text-cyan-300 font-bold">
                    PLAY REEL
                  </div>
                </div>
                <p className="text-xs font-serif text-[#374151] leading-relaxed">
                  <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[1].dateline}</strong>
                  {SHOWCASE_ARTICLES[1].col1}
                </p>
              </div>

              {/* SUB-STORY B: PRE-ORDER CAMPAIGN */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[2])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-6 hover:bg-black/5 p-3 transition-colors"
              >
                <span className="text-xs font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                  {SHOWCASE_ARTICLES[2].kicker}
                </span>
                <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                  {SHOWCASE_ARTICLES[2].title}
                </h3>
                <div className="relative w-full h-44 bg-black border-2 border-[#1E293B] overflow-hidden mb-3">
                  <video
                    src={SHOWCASE_ARTICLES[2].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0A0E17] text-[10px] font-mono text-cyan-300 font-bold">
                    PLAY AD
                  </div>
                </div>
                <p className="text-xs font-serif text-[#374151] leading-relaxed">
                  <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[2].dateline}</strong>
                  {SHOWCASE_ARTICLES[2].col1}
                </p>
              </div>

              {/* SUB-STORY C: FESTIVAL REELS */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[3])}
                className="group cursor-pointer hover:bg-black/5 p-3 transition-colors"
              >
                <span className="text-xs font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                  {SHOWCASE_ARTICLES[3].kicker}
                </span>
                <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                  {SHOWCASE_ARTICLES[3].title}
                </h3>
                <div className="relative w-full h-44 bg-black border-2 border-[#1E293B] overflow-hidden mb-3">
                  <video
                    src={SHOWCASE_ARTICLES[3].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0A0E17] text-[10px] font-mono text-cyan-300 font-bold">
                    PLAY FEST
                  </div>
                </div>
                <p className="text-xs font-serif text-[#374151] leading-relaxed">
                  <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[3].dateline}</strong>
                  {SHOWCASE_ARTICLES[3].col1}
                </p>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 3. 3D MOTION & CINEMA ESSAYS (TWO-COLUMN SECTION)        */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-8 py-6 border-b-2 border-[#1E293B]">
              
              {/* Story 5: 3D Motion */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[4])}
                className="col-span-6 group cursor-pointer border-r-2 border-[#1E293B] pr-8 hover:bg-black/5 p-3 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-1">
                  <span>{SHOWCASE_ARTICLES[4].kicker}</span>
                  <span>60 FPS VECTOR</span>
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                  {SHOWCASE_ARTICLES[4].title}
                </h3>
                <div className="relative w-full h-56 bg-black border-2 border-[#1E293B] overflow-hidden mb-3">
                  <video
                    src={SHOWCASE_ARTICLES[4].mediaSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#0A0E17] text-xs font-mono text-cyan-300 font-bold">
                    ▶ PLAY 3D MOTION REEL
                  </div>
                </div>
                <p className="text-xs font-serif text-[#374151] leading-relaxed">
                  <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[4].dateline}</strong>
                  {SHOWCASE_ARTICLES[4].col1} {SHOWCASE_ARTICLES[4].col2}
                </p>
              </div>

              {/* Story 6: Cinematic Walk & Color Science */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[5])}
                className="col-span-6 group cursor-pointer hover:bg-black/5 p-3 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-1">
                    <span>{SHOWCASE_ARTICLES[5].kicker}</span>
                    <span>4K CINEMA</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[5].title}
                  </h3>
                  <div className="relative w-full h-56 bg-black border-2 border-[#1E293B] overflow-hidden mb-3">
                    <video
                      src={SHOWCASE_ARTICLES[5].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#0A0E17] text-xs font-mono text-cyan-300 font-bold">
                      ▶ PLAY CINEMA FILM
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#374151] leading-relaxed">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[5].dateline}</strong>
                    {SHOWCASE_ARTICLES[5].col1} {SHOWCASE_ARTICLES[5].col2}
                  </p>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 4. LUXURY ADVERTISEMENT & BRAND IDENTITY FEATURE         */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-8 py-6 border-b-2 border-[#1E293B]">
              
              {/* Luxury Wedding Jewelry Gazette Ad */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[6])}
                className="col-span-7 group cursor-pointer border-4 border-[#B45309] bg-[#FFFBEB] p-5 hover:bg-[#FEF3C7] transition-colors"
              >
                <div className="flex items-center justify-between border-b-2 border-[#B45309] pb-2 text-xs font-mono text-[#B45309] font-bold mb-3">
                  <span>★ OFFICIAL COMMERCIAL GAZETTE ADVERTISEMENT</span>
                  <span className="bg-[#B45309] text-white px-2 py-0.5">COUPON: NAVRA25</span>
                </div>
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-5 h-52 bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center">
                    <img
                      src={SHOWCASE_ARTICLES[6].mediaSrc}
                      alt="Jewelry Ad"
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="col-span-7 font-serif text-sm text-[#1F2937] leading-snug space-y-2">
                    <h4 className="text-2xl font-black uppercase text-[#92400E]">
                      {SHOWCASE_ARTICLES[6].title}
                    </h4>
                    <p className="text-xs text-[#4B5563]">
                      {SHOWCASE_ARTICLES[6].col1} {SHOWCASE_ARTICLES[6].col2}
                    </p>
                    <div className="text-xs font-mono text-[#B45309] font-bold pt-2">
                      ▶ CLICK TO VIEW FULL COMMERCIAL POSTER
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Design Standard Story */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[7])}
                className="col-span-5 group cursor-pointer hover:bg-black/5 p-4 transition-colors border-l-2 border-[#1E293B]"
              >
                <span className="text-xs font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                  {SHOWCASE_ARTICLES[7].kicker}
                </span>
                <h4 className="text-2xl font-black uppercase text-[#0A0E17] mb-2 group-hover:text-[#0284C7]">
                  {SHOWCASE_ARTICLES[7].title}
                </h4>
                <div className="h-44 bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center mb-2">
                  <img
                    src={SHOWCASE_ARTICLES[7].mediaSrc}
                    alt="Brand Identity"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-serif text-[#4B5563] leading-tight">
                  {SHOWCASE_ARTICLES[7].col1}
                </p>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 5. BOTTOM SECTION: PRESS CLASSIFIEDS & INQUIRY BUREAU    */}
            {/* ======================================================== */}
            <div className="border-4 border-[#1E293B] bg-[#E2E8F0]/40 p-8 my-4">
              <div className="flex items-center justify-between border-b-2 border-[#1E293B] pb-3 text-sm font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0284C7] animate-pulse" />
                  <span className="text-[#0A0E17] font-bold uppercase tracking-wider">
                    SECTION C // OFFICIAL PRESS CLASSIFIEDS & DISPATCH BUREAU
                  </span>
                </div>
                <Barcode className="w-10 h-6 text-[#1E293B]" />
              </div>

              <div className="grid grid-cols-12 gap-8 mt-5">
                <div className="col-span-5 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <h4 className="text-2xl font-black font-serif uppercase text-[#0A0E17] mb-2">
                      Commission a Media Production Sprint
                    </h4>
                    <p className="text-xs font-serif text-[#374151] leading-relaxed mb-4">
                      Direct inquiries for promotional reels, 3D CGI visuals, or complete brand identity systems.
                    </p>
                    <div className="space-y-2 text-xs">
                      <a href="mailto:harshjsh02@gmail.com" className="flex items-center gap-2.5 text-[#0284C7] font-bold hover:underline">
                        <Mail className="w-4 h-4" />
                        <span>harshjsh02@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-2.5 text-[#4B5563]">
                        <Sparkles className="w-4 h-4 text-[#0284C7]" />
                        <span>Designed & Built by Harsh Joshi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-[#F4F1EA] border-2 border-[#1E293B] p-5 shadow-inner">
                  {formSubmitted ? (
                    <div className="flex items-center justify-center p-6 text-center space-x-2 text-[#0284C7] font-mono text-sm font-bold">
                      <CheckCircle2 className="w-6 h-6 text-[#0284C7]" />
                      <span>DISPATCH TRANSMITTED // BUREAU WILL REPLY IN 24H</span>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3 text-xs font-mono">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Name / Organization"
                          className="w-full px-3 py-2 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-3 py-2 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                        />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Project Brief & Requirements..."
                        className="w-full px-3 py-2 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#0A0E17] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Transmit Project Dispatch</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-[#1E293B] pt-3 text-xs font-mono text-[#374151] font-bold">
            <span>THE NAVRA CHRONICLE // ALL RIGHTS RESERVED • HARSH JOSHI</span>
            <span className="text-[#0284C7] font-bold">PAGE 01 OF 01 • OFFICIAL PRESS BROADSHEET</span>
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
            className="relative w-full max-w-4xl bg-[#030D1E] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-100 font-sans"
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
