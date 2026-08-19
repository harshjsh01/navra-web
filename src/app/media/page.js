'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Play, 
  Sparkles, 
  Disc, 
  Film, 
  Sliders, 
  ArrowRight, 
  ArrowDown, 
  Eye, 
  Volume2, 
  Maximize2,
  X,
  Radio,
  Tv,
  Check
} from 'lucide-react';

const CATEGORIES = ['All Works', 'Cinematic Reels', 'Motion Design', 'Brand Posters', 'Commercials'];

const SHOWCASE_PROJECTS = [
  {
    id: 1,
    title: 'Navra Signature Brand Showreel',
    year: '1984 - 2026',
    format: 'CD-ROM MASTER',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/finalreel_navra.mp4',
    coverBg: 'from-blue-600 to-indigo-900',
    spineColor: 'bg-blue-600',
    tags: ['Master Showreel', 'Cinematic Edit', 'Motion VFX'],
    stats: 'Flagship Reel',
    description: 'The master creative showreel of Navra Studio showcasing high-end cinematic editing, sound design, and commercial storytelling.',
  },
  {
    id: 2,
    title: 'Exclusive Pre-Order Campaign Film',
    year: 'COMMERCIAL',
    format: 'DIGITAL CASSETTE',
    category: 'Commercials',
    type: 'video',
    mediaSrc: '/show/preorder_final_reel.mp4',
    coverBg: 'from-cyan-600 to-blue-800',
    spineColor: 'bg-cyan-500',
    tags: ['Pre-Order Launch', 'Hook Editing', 'Commercial Ad'],
    stats: 'High-Converting',
    description: 'High-conversion product pre-order commercial reel featuring energetic pacing and kinetic title overlays.',
  },
  {
    id: 3,
    title: 'Navrang Navratri Festival Reel',
    year: 'LIVE EVENT',
    format: 'VINYL SINGLE',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navrang_navratri.mp4',
    coverBg: 'from-fuchsia-700 to-indigo-950',
    spineColor: 'bg-pink-500',
    tags: ['Festival Reel', 'Music Sync', 'Fast Cut'],
    stats: '150K+ Views',
    description: 'High-energy cultural event promotional reel featuring dynamic music synchronization and festive visual pacing.',
  },
  {
    id: 4,
    title: 'Navratri Rangat Stage Promo',
    year: 'EVENT PROMO',
    format: 'CD AUDIO',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navratri_rangat.mp4',
    coverBg: 'from-sky-700 to-blue-900',
    spineColor: 'bg-sky-400',
    tags: ['Color Grade', 'Audio Master', 'Event Stage'],
    stats: '280K+ Views',
    description: 'Cinematic festival promotional video with festive color grading, rhythm cuts, and atmospheric sound design.',
  },
  {
    id: 5,
    title: 'Dynamic Motion & Kinetic Type',
    year: 'VECTOR LAB',
    format: 'FLOPPY DISK',
    category: 'Motion Design',
    type: 'video',
    mediaSrc: '/show/motion_design.mp4',
    coverBg: 'from-teal-700 to-slate-900',
    spineColor: 'bg-teal-400',
    tags: ['Kinetic Type', 'Vector Motion', 'Visual ID'],
    stats: 'Viral Motion',
    description: 'Modern kinetic typography motion reel with stylized visual transitions and fluid vector animations.',
  },
  {
    id: 6,
    title: 'Cinematic Sequence & Mood Film',
    year: '35MM FILM',
    format: 'ANAMORPHIC',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/walk_cinematic.mov',
    coverBg: 'from-blue-900 to-slate-950',
    spineColor: 'bg-blue-500',
    tags: ['Cinematic Film', 'Color Science', 'Pacing'],
    stats: 'Master Quality',
    description: 'Atmospheric narrative visual sequence with custom color treatment and cinematic wide-angle framing.',
  },
  {
    id: 7,
    title: 'Luxury Wedding Jewelry Campaign',
    year: 'COMMERCIAL',
    format: 'PRINT & POSTER',
    category: 'Brand Posters',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    coverBg: 'from-amber-600 to-blue-950',
    spineColor: 'bg-amber-400',
    tags: ['Social Ad', 'Jewelry Branding', 'Commercial Design'],
    stats: '+340% ROAS',
    description: 'Premium luxury commercial creative developed for high-converting social media advertising and campaign promotions.',
  },
  {
    id: 8,
    title: 'Agency Visual Identity Poster',
    year: 'BRAND SYSTEM',
    format: 'ART POSTER',
    category: 'Brand Posters',
    type: 'image',
    mediaSrc: '/show/we_agency.png',
    coverBg: 'from-cyan-800 to-indigo-950',
    spineColor: 'bg-cyan-400',
    tags: ['Brand Identity', 'Typography', 'Graphic Layout'],
    stats: 'Brand Standard',
    description: 'Comprehensive agency visual identity artwork featuring modern typography hierarchy and brand color synergy.',
  },
];

export default function RetroMediaPage() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedPaintColor, setSelectedPaintColor] = useState('#38BDF8');
  const pageRef = useRef(null);

  const filteredProjects = activeCategory === 'All Works'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline entrance
      gsap.from('.retro-hero-anim', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // CD cases floating animation
      gsap.from('.retro-cd-case', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen text-slate-100 font-sans">
      
      {/* ======================================================== */}
      {/* 1. RETRO 80s/90s HERO SECTION (Inspired by Reference Video) */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-24 sm:pt-32 pb-16 text-center">
        
        {/* Monospace Sub-header */}
        <div className="retro-hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-cyan-400/30 backdrop-blur-md mb-6">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-300 uppercase font-semibold">
            ANIMATION & EFFECTS
          </span>
        </div>

        {/* Master Serif Headline (Retro 80s Editorial Typography) */}
        <h1 className="retro-hero-anim text-4xl sm:text-6xl md:text-7xl font-serif text-[#F8FAFC] tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
          Scrolling into the Future <br />
          <span className="font-serif italic font-normal text-cyan-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            with Retro '80s Vibes
          </span>
        </h1>

        {/* Subtitle */}
        <p className="retro-hero-anim text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-2xl leading-relaxed mb-10">
          Discover a decade of creative innovation, high-energy edits, and groundbreaking visual designs that left an enduring impact and shaped the future.
        </p>

        {/* Retro Down-Arrow Scroll Pill */}
        <div className="retro-hero-anim flex flex-col items-center gap-4">
          <a
            href="#cd-showcase"
            className="w-12 h-12 rounded-full bg-cyan-400/20 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-110"
          >
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. THE CD JEWEL CASE & VINYL MEDIA SHOWCASE (Your Edits!) */}
      {/* ======================================================== */}
      <section id="cd-showcase" className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto pt-16 pb-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Disc className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
              <span>THE ARCHIVE & COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
              Selected Works on CD & Tape
            </h2>
          </div>

          {/* Category Filter Pills (Retro 90s Button Style) */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-black font-bold border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                    : 'bg-black/60 text-slate-300 border-white/15 hover:border-cyan-400/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CD Jewel Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedMedia(proj)}
              className="retro-cd-case group relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-black/60 border border-cyan-500/30 backdrop-blur-2xl hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* CD Jewel Case Mockup Container */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
                
                {/* Transparent Acrylic CD Case Frame */}
                <div className="relative w-44 h-44 rounded-xl bg-slate-900 border-2 border-white/30 shadow-2xl overflow-hidden flex flex-col justify-between p-3 group-hover:scale-105 transition-transform duration-500">
                  
                  {/* CD Spine bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-3 ${proj.spineColor} opacity-90`} />

                  {/* Plastic Shine Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 pointer-events-none" />

                  {/* Artwork Preview inside case */}
                  <div className={`w-full h-full rounded-lg bg-gradient-to-br ${proj.coverBg} flex flex-col justify-between p-3 ml-1`}>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-200 uppercase bg-black/40 px-1.5 py-0.5 rounded">
                        {proj.format}
                      </span>
                      <span className="text-[9px] font-mono text-white/80">
                        {proj.year}
                      </span>
                    </div>

                    {/* Centered CD Hole / Play icon */}
                    <div className="w-12 h-12 rounded-full border-2 border-white/60 bg-black/60 backdrop-blur-md self-center flex items-center justify-center shadow-lg group-hover:bg-cyan-400 group-hover:text-black group-hover:border-white transition-colors">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>

                    <p className="text-xs font-bold text-white line-clamp-1">
                      {proj.title}
                    </p>
                  </div>
                </div>

                {/* Disc Sliding out on Hover */}
                <div className="absolute right-0 w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-900 border-2 border-white/50 shadow-2xl flex items-center justify-center translate-x-3 group-hover:translate-x-10 transition-transform duration-500 -z-10 group-hover:rotate-45">
                  <div className="w-12 h-12 rounded-full bg-black/80 border border-white/60 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-cyan-300" />
                  </div>
                </div>

              </div>

              {/* Case Details / Info */}
              <div className="flex flex-col justify-between flex-1 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                      {proj.format}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400">
                      {proj.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 border border-cyan-400/25 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Play Track <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. RETRO CLASSIC OS / MS-PAINT CREATIVE WORKSPACE        */}
        {/* ======================================================== */}
        <div className="mb-24">
          
          {/* Classic 90s Window Wrapper */}
          <div className="rounded-2xl bg-[#CBD5E1] border-4 border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] shadow-2xl overflow-hidden text-slate-900">
            
            {/* Retro Window Title Bar */}
            <div className="bg-gradient-to-r from-[#1E40AF] to-[#38BDF8] px-4 py-2 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-cyan-200" />
                <span className="text-xs font-mono font-bold tracking-wider">
                  NAVRA_MEDIA_STUDIO_V1.0.EXE
                </span>
              </div>
              
              {/* Window Controls [ - ] [ □ ] [ X ] */}
              <div className="flex items-center gap-1">
                <button className="w-5 h-5 bg-[#CBD5E1] text-black border border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] text-xs font-mono font-bold flex items-center justify-center active:scale-95">_</button>
                <button className="w-5 h-5 bg-[#CBD5E1] text-black border border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] text-xs font-mono font-bold flex items-center justify-center active:scale-95">□</button>
                <button className="w-5 h-5 bg-[#CBD5E1] text-black border border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] text-xs font-mono font-bold flex items-center justify-center active:scale-95">✕</button>
              </div>
            </div>

            {/* Menu Bar (File, Edit, View, Render, Help) */}
            <div className="bg-[#E2E8F0] px-4 py-1 border-b border-[#94A3B8] flex items-center gap-6 text-xs font-mono text-slate-700">
              <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">File</span>
              <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">Edit</span>
              <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">View</span>
              <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">Special VFX</span>
              <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">Master 4K</span>
            </div>

            {/* Workspace Body */}
            <div className="p-4 sm:p-6 bg-[#020C1B] text-white flex flex-col lg:flex-row gap-6">
              
              {/* Left Toolbox */}
              <div className="w-full lg:w-48 bg-[#0F172A] border border-cyan-500/30 p-3 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block mb-3 font-semibold">
                    CREATIVE TOOLBOX
                  </span>
                  
                  {/* Tool Icons Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {['4K Edit', 'Color Grade', '3D Motion', 'VFX Synth', 'Audio Sync', 'Hook Script'].map((tool, idx) => (
                      <div
                        key={tool}
                        className={`p-2 rounded bg-black/60 border text-[10px] font-mono text-center cursor-pointer transition-all ${
                          idx === 0 ? 'border-cyan-400 text-cyan-300 bg-blue-900/40' : 'border-white/10 text-slate-300 hover:border-cyan-400/40'
                        }`}
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block mb-2">
                    BRAND PALETTE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['#38BDF8', '#2563EB', '#1D4ED8', '#F472B6', '#FBBF24', '#06B6D4'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedPaintColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-6 h-6 rounded-md border transition-transform ${
                          selectedPaintColor === c ? 'scale-110 border-white ring-2 ring-cyan-400' : 'border-black'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Monitor Display inside Retro Window */}
              <div className="flex-1 rounded-xl bg-black border border-cyan-500/30 overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video bg-gradient-to-br from-blue-950 to-slate-950 flex items-center justify-center p-4">
                  <video
                    src="/show/finalreel_navra.mp4"
                    controls
                    loop
                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
                
                {/* Timeline status bar */}
                <div className="p-3 bg-[#0A192F] border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-cyan-300 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>REC • 4K ULTRA HD MASTER RENDER</span>
                  </div>
                  <span className="text-slate-400">FPS: 60.00 • BITRATE: 120 Mbps</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. CASCADING RETRO POP-UP WINDOWS (From the Video Ending) */}
        {/* ======================================================== */}
        <div className="relative py-16 flex flex-col items-center justify-center overflow-hidden">
          
          <div className="relative w-full max-w-2xl min-h-[380px] flex items-center justify-center">
            
            {/* Background Cascading Shadow Windows (The Windows 95 Cascade Stack) */}
            <div className="absolute top-0 right-4 sm:right-12 w-64 p-3 rounded-lg bg-[#CBD5E1] border-2 border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] shadow-lg opacity-40 -rotate-3 pointer-events-none">
              <div className="bg-blue-800 text-white text-[10px] font-mono px-2 py-0.5 mb-2">Reminder</div>
              <p className="text-xs font-mono text-slate-800">Be creative & innovate.</p>
            </div>

            <div className="absolute top-8 left-2 sm:left-8 w-64 p-3 rounded-lg bg-[#CBD5E1] border-2 border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] shadow-lg opacity-60 rotate-2 pointer-events-none">
              <div className="bg-pink-600 text-white text-[10px] font-mono px-2 py-0.5 mb-2">Inspiration</div>
              <p className="text-xs font-mono text-slate-800">Elevate your visual brand.</p>
            </div>

            {/* Foreground Master Dialog Window */}
            <div className="relative z-20 w-full p-6 sm:p-8 rounded-2xl bg-[#E2E8F0] border-4 border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-slate-900 text-center">
              
              {/* Window Header */}
              <div className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#F472B6] px-4 py-2 rounded-t-lg -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold tracking-wider">
                  EXPLORE • NAVRA STUDIO
                </span>
                <span className="text-xs font-mono">✕</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
                So what's next? It's your turn to shape the future.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto mb-8">
                Partner with Navra Studio for custom media production, commercial edits, and digital storytelling campaigns.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-lg bg-[#1E293B] hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-widest border-2 border-t-[#64748B] border-l-[#64748B] border-r-black border-b-black shadow-lg hover:scale-105 transition-all"
                >
                  START CREATING →
                </Link>

                <a
                  href="#cd-showcase"
                  className="px-6 py-3.5 rounded-lg bg-[#CBD5E1] hover:bg-[#94A3B8] text-slate-900 font-mono text-xs uppercase tracking-wider border-2 border-t-white border-l-white border-r-[#64748B] border-b-[#64748B] transition-all"
                >
                  REPLAY SHOWCASE
                </a>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE VIDEO PLAYER LIGHTBOX MODAL               */}
      {/* ======================================================== */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-4xl rounded-3xl bg-[#041024] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  {selectedMedia.format} • {selectedMedia.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
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
            <div className="relative w-full aspect-video rounded-2xl bg-black flex items-center justify-center border border-white/10 mb-4 overflow-hidden">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.mediaSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <img
                  src={selectedMedia.mediaSrc}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain rounded-2xl p-2"
                />
              )}
            </div>

            {/* Modal Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-light mb-2">
                  {selectedMedia.description}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedMedia.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 border border-cyan-400/20 text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-400 text-black font-mono font-bold text-xs uppercase shadow-md hover:scale-105 transition-transform shrink-0"
              >
                <span>Request Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
