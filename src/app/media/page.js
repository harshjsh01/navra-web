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
  Radio,
  Clock,
  Sliders,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES = ['All Works', 'Cinematic Reels', 'Commercials', 'Brand & Print', '3D Motion'];

const SHOWCASE_PROJECTS = [
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
    stats: 'FLAGSHIP',
    accentColor: 'text-cyan-300',
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
    accentColor: 'text-blue-400',
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
    accentColor: 'text-cyan-400',
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
    accentColor: 'text-sky-300',
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
    accentColor: 'text-cyan-300',
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
    accentColor: 'text-blue-300',
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
    accentColor: 'text-sky-200',
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
    accentColor: 'text-amber-300',
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
    accentColor: 'text-cyan-300',
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
    accentColor: 'text-teal-300',
    description: 'High-impact wide-format digital campaign header designed for multi-channel digital distribution.',
  },
];

const EDITORIAL_ARTICLES = [
  {
    num: 'ARTICLE I',
    title: 'CINEMATIC VIDEO EDITING & COLOR',
    desc: 'Precision story pacing, multi-cam synchronization, and high-end narrative flow tailored for maximum audience retention.',
    tag: 'POST-PRODUCTION',
  },
  {
    num: 'ARTICLE II',
    title: '3D MOTION DESIGN & CGI',
    desc: 'Fluid simulations, 3D product renders, dynamic title sequences, and vector SVG motion systems.',
    tag: 'CGI & MOTION',
  },
  {
    num: 'ARTICLE III',
    title: 'RETENTION-HOOK COMMERCIAL ADS',
    desc: 'High-energy, short-form video creative built with algorithmic retention hooks for TikTok, IG, and YouTube Shorts.',
    tag: 'PERFORMANCE ADS',
  },
  {
    num: 'ARTICLE IV',
    title: 'SPATIAL AUDIO & SOUND DESIGN',
    desc: 'Immersive sound effects, bespoke musical rhythm synchronization, and broadcast-ready voice polish.',
    tag: 'AUDIO ENGINEERING',
  },
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const pageRef = useRef(null);

  const filteredProjects = activeCategory === 'All Works'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.newspaper-masthead', {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.editorial-headline-lead', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.newspaper-grid-item', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen text-slate-100 font-sans pb-28">
      
      {/* ======================================================== */}
      {/* 1. NEWSPAPER BROADSIDE MASTHEAD (Top Header Bar)         */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        
        {/* Top Technical Edition Bar */}
        <div className="newspaper-masthead border-b-2 border-cyan-400/40 pb-3 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cyan-300/80">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold">
              VOL. 26 // ISSUE 08
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline uppercase">INTERNATIONAL MEDIA PRESS</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>EDITION: GLOBAL BROADCAST</span>
            <span>LAT 28.61° N / 77.20° E</span>
            <span className="text-cyan-400 font-bold">NV® 2026</span>
          </div>
        </div>

        {/* Big Broadside Masthead Title */}
        <div className="text-center py-6 sm:py-10 border-b border-white/15">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black font-serif tracking-tight text-white uppercase drop-shadow-2xl leading-none">
            NAVRA CHRONICLE
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase">
            <span>★ MEDIA PRODUCTION</span>
            <span>★ CINEMATIC MOTION</span>
            <span>★ COMMERCIAL DIRECTION</span>
            <span>★ 3D CGI</span>
          </div>
        </div>

        {/* 2. EDITORIAL HERO STATEMENT (ClubRare Style: "We (Are) Creators, Not Consumers") */}
        <div className="editorial-headline-lead grid grid-cols-1 lg:grid-cols-12 border-b-2 border-cyan-400/40 my-8">
          
          {/* Left Main Editorial Statement */}
          <div className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/15 flex flex-col justify-between bg-black/30 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-600/20 border border-cyan-400/40 text-cyan-300 font-bold uppercase tracking-wider">
                  EDITORIAL STATEMENT // 01
                </span>
                <span className="text-xs font-mono text-slate-400">
                  (CR) SPECIAL ISSUE
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
                We (Are) <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
                  Creators,
                </span> Not Consumers
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Navra Studio operates at the intersection of cinematic storytelling, vector SVG motion systems, and high-conversion commercial advertising. We craft compelling visual assets that define modern brands.
              </p>
            </div>

            {/* Editorial Quick Numbers (01 02 03) */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-cyan-400 font-bold block mb-1">01 [CRAFT]</span>
                <p className="text-[11px] text-slate-400 leading-tight">4K Master Editing & Anamorphic Color</p>
              </div>
              <div>
                <span className="text-cyan-400 font-bold block mb-1">02 [DIRECT]</span>
                <p className="text-[11px] text-slate-400 leading-tight">Dynamic 3D CGI & Motion Graphics</p>
              </div>
              <div>
                <span className="text-cyan-400 font-bold block mb-1">03 [SCALE]</span>
                <p className="text-[11px] text-slate-400 leading-tight">High-Retention Viral Video Ads</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Stamp & Quick Spec */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-black/40 backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  STUDIO ARCHIVE
                </span>
                <Barcode className="w-8 h-8 text-slate-400" />
              </div>

              <div className="p-4 rounded-xl bg-blue-950/30 border border-cyan-500/20 mb-6">
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block mb-1">
                  CURRENT REPERTOIRE
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  10+ MASTER EDITS
                </span>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  Festive reels, commercial jewelry campaigns, workshop masterclasses & kinetic IDs.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="#newspaper-gallery"
                className="group flex items-center justify-between w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Explore Broadsheet Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. NEWSPAPER FILTER & SECTION CONTROLS                   */}
        {/* ======================================================== */}
        <div id="newspaper-gallery" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-white/15">
          <div className="flex items-center gap-3">
            <Film className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              BROADSHEET PORTFOLIO INDEX
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-black font-black shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-black/40 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-400/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MODULAR NEWSPAPER SHOWCASE GRID                       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedMedia(proj)}
              className="newspaper-grid-item group relative rounded-2xl bg-black/45 hover:bg-black/70 border border-white/15 hover:border-cyan-400/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col justify-between"
            >
              {/* Card Top Technical Metadata Bar */}
              <div className="px-4 py-2 bg-blue-950/40 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-cyan-300 font-bold tracking-wider">
                  [{proj.edition}]
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {proj.resolution}
                </span>
              </div>

              {/* Media Preview Box */}
              <div className="relative w-full h-56 bg-black flex items-center justify-center overflow-hidden">
                {proj.type === 'video' ? (
                  <>
                    <video
                      src={proj.mediaSrc}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                      onMouseEnter={(e) => e.target.play().catch(() => {})}
                      onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300 bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-cyan-300 text-cyan-300 ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={proj.mediaSrc}
                      alt={proj.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <ImageIcon className="w-5 h-5 text-cyan-300" />
                      </div>
                    </div>
                  </>
                )}

                {/* Duration Tag */}
                <div className="absolute bottom-3 left-3 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                    {proj.duration}
                  </span>
                </div>
                {/* Stats Tag */}
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600/90 border border-cyan-400/40 text-[10px] font-mono text-white font-bold backdrop-blur-md">
                    {proj.stats}
                  </span>
                </div>
              </div>

              {/* Card Editorial Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    {proj.client}
                  </span>
                  <h3 className="text-base font-bold font-sans uppercase text-white mb-2 group-hover:text-cyan-200 transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 border border-cyan-400/20 text-cyan-300 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {proj.type === 'video' ? 'Play' : 'Inspect'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 5. EDITORIAL ARTICLES / CAPABILITIES (Newspaper Columns) */}
        {/* ======================================================== */}
        <div className="border-t-2 border-b-2 border-cyan-400/40 py-12 mb-20 bg-black/30 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              SECTION B // PRODUCTION CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mt-1">
              Engineered for High-Retention Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {EDITORIAL_ARTICLES.map((art) => (
              <div key={art.num} className="p-5 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-cyan-400 font-bold">{art.num}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{art.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold uppercase text-white mb-2 leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {art.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. CALL TO ACTION BROADSIDE BLOCK                        */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/60 via-black/80 to-blue-950/60 border-2 border-cyan-400/40 backdrop-blur-2xl text-center flex flex-col items-center shadow-2xl">
          <Barcode className="w-16 h-10 text-cyan-400 mb-4" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold mb-2">
            PRESS DISPATCH // IMMEDIATE ACTION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mb-3">
            Commission Your Media Project
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mb-6 leading-relaxed">
            Collaborate with Navra Studio to produce cinematic promotional reels, commercial video ads, and dynamic motion branding.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-cyan-400 text-black font-mono font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:bg-cyan-300 transition-all hover:scale-105"
          >
            <span>Initiate Editorial Project Brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 7. INTERACTIVE VIDEO / IMAGE LIGHTBOX MODAL              */}
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

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shrink-0"
              >
                <span>Request Similar Edit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
