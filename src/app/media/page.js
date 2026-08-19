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
  ExternalLink,
  X
} from 'lucide-react';

const CATEGORIES = ['All Projects', 'Cinematic Reels', 'Brand Design', '3D & Motion', 'Commercials'];

const SHOWCASE_PROJECTS = [
  {
    id: 1,
    title: 'Navrang Navratri Event Reel',
    client: 'Festive & Cultural Experience',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navrang_navratri.mp4',
    posterSrc: '/show/edit_1.png',
    duration: '0:15',
    resolution: '1080p HD',
    tags: ['Event Reel', 'Motion Sync', 'Fast Pace'],
    stats: '150K+ Views',
    gradient: 'from-blue-600/30 to-cyan-500/20',
    description: 'High-energy cultural event promotional reel featuring dynamic music synchronization and festive visual pacing.',
  },
  {
    id: 2,
    title: 'Navratri Rangat Festival Promo',
    client: 'Live Stage & Event Management',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/navratri_rangat.mp4',
    posterSrc: '/show/edit_2.png',
    duration: '0:30',
    resolution: '1080p HD',
    tags: ['Color Grade', 'Audio Mastering', 'Event Promo'],
    stats: '280K+ Views',
    gradient: 'from-indigo-600/30 to-blue-500/20',
    description: 'Cinematic festival promotional video with festive color grading, rhythm cuts, and atmospheric sound design.',
  },
  {
    id: 3,
    title: 'Dynamic Motion Identity & Typography',
    client: 'Navra Studio Creative Lab',
    category: '3D & Motion',
    type: 'video',
    mediaSrc: '/show/motion_design.mp4',
    posterSrc: '/show/we_agency.png',
    duration: '0:20',
    resolution: 'Full HD 60FPS',
    tags: ['Motion Graphics', 'Kinetic Type', 'Visual ID'],
    stats: 'Viral Reach',
    gradient: 'from-cyan-600/30 to-teal-500/20',
    description: 'Modern kinetic typography motion reel with stylized visual transitions and fluid vector animations.',
  },
  {
    id: 4,
    title: 'Cinematic Sequence & Mood Film',
    client: 'Visual Storytelling',
    category: 'Cinematic Reels',
    type: 'video',
    mediaSrc: '/show/walk_cinematic.mov',
    posterSrc: '/show/wedding_collection.png',
    duration: '0:45',
    resolution: '4K Cinema',
    tags: ['Cinematic Film', 'Color Science', 'Pacing'],
    stats: 'Master Quality',
    gradient: 'from-blue-700/30 to-sky-600/20',
    description: 'Atmospheric narrative visual sequence with custom color treatment and cinematic wide-angle framing.',
  },
  {
    id: 5,
    title: 'Luxury Gold & Diamond Wedding Collection',
    client: 'Fine Jewelry Brand',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    duration: 'Poster / Ad',
    resolution: '1080x1080 HQ',
    tags: ['Social Ad', 'Jewelry Branding', 'Commercial Design'],
    stats: '+340% ROAS',
    gradient: 'from-amber-600/25 to-blue-600/20',
    description: 'Premium luxury commercial creative developed for high-converting social media advertising and campaign promotions.',
  },
  {
    id: 6,
    title: 'Creative Agency Brand Identity Design',
    client: 'Navra Studio Brand System',
    category: 'Brand Design',
    type: 'image',
    mediaSrc: '/show/we_agency.png',
    posterSrc: '/show/we_agency.png',
    duration: 'Visual ID',
    resolution: '1080x1080 HQ',
    tags: ['Brand Identity', 'Typography', 'Graphic Layout'],
    stats: 'Brand Standard',
    gradient: 'from-cyan-600/25 to-blue-800/20',
    description: 'Comprehensive agency visual identity artwork featuring modern typography hierarchy and brand color synergy.',
  },
  {
    id: 7,
    title: 'Commercial Digital Art & Visual Poster',
    client: 'Creative Visual Lab',
    category: 'Brand Design',
    type: 'image',
    mediaSrc: '/show/edit_1.png',
    posterSrc: '/show/edit_1.png',
    duration: 'Graphic Art',
    resolution: 'Poster HD',
    tags: ['Graphic Art', 'Photo Manipulation', 'Digital Edit'],
    stats: 'Featured Art',
    gradient: 'from-blue-600/25 to-indigo-600/20',
    description: 'Stylized character visual art and photo manipulation crafted for promotional storytelling and digital merchandise.',
  },
  {
    id: 8,
    title: 'Wide-Format Digital Banner & Header Design',
    client: 'Digital Marketing Campaign',
    category: 'Commercials',
    type: 'image',
    mediaSrc: '/show/edit_4.png',
    posterSrc: '/show/edit_4.png',
    duration: 'Web Banner',
    resolution: '2000x647 Ultra-Wide',
    tags: ['Web Banner', 'Advertising', 'Composition'],
    stats: '99.4% CTR',
    gradient: 'from-sky-600/25 to-teal-700/20',
    description: 'High-impact wide-format digital campaign header designed for multi-channel digital distribution.',
  },
];

const CAPABILITIES = [
  {
    icon: Film,
    title: 'Cinematic Video Editing',
    desc: 'Precision story pacing, multi-cam synchronization, and high-end narrative flow tailored for maximum audience retention.',
    tag: 'EDITING',
  },
  {
    icon: Layers,
    title: '3D Motion Design & VFX',
    desc: 'Fluid simulations, 3D product renders, dynamic title sequences, and vector SVG motion systems.',
    tag: 'CGI & MOTION',
  },
  {
    icon: Zap,
    title: 'Viral Social Reels & Ads',
    desc: 'High-energy, short-form video creative built with algorithmic retention hooks for TikTok, IG, and YouTube Shorts.',
    tag: 'SHORT FORM',
  },
  {
    icon: Volume2,
    title: 'Sound Design & Audio Mastering',
    desc: 'Immersive sound effects, bespoke musical rhythm synchronization, and broadcast-ready voice polish.',
    tag: 'AUDIO FX',
  },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Creative Brief & Concept', desc: 'Moodboards, visual references, audio curation, and script breakdown.' },
  { num: '02', title: 'Production & Asset Crafting', desc: 'Filming, 3D asset modeling, motion vector setup, and visual staging.' },
  { num: '03', title: 'Post-Production & VFX', desc: 'Precision editing, anamorphic color grading, sound design, and typography.' },
  { num: '04', title: 'Final Master Delivery', desc: 'High-bitrate exports optimized for broadcast, YouTube, Instagram, and web.' },
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const pageRef = useRef(null);

  const filteredProjects = activeCategory === 'All Projects'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.showcase-card', {
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
    <div ref={pageRef} className="relative w-full min-h-screen text-white">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Over the Animated SVGator Gradient Canvas) */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24 sm:pt-28 pb-16">
        
        <div className="media-hero-content flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Accent Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/30 backdrop-blur-xl shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-semibold">
              Media Production & Visual Branding
            </span>
          </div>

          {/* Master Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-xl leading-tight mb-6">
            Cinematic Motion, <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
              Visual Identity & Digital Craft
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
            From high-energy promotional reels and 3D visual identities to commercial ad campaigns and post-production workflows — explore authentic works crafted by Navra Studio.
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#showcase-grid"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105"
            >
              <span>Explore My Edits & Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white font-medium text-sm transition-all duration-300 backdrop-blur-xl hover:border-cyan-400/40"
            >
              <span>Book a Production Sprint</span>
            </Link>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. AUTHENTIC SHOWCASE & MEDIA GALLERY                    */}
      {/* ======================================================== */}
      <section id="showcase-grid" className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto pt-8 pb-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                Authentic Portfolio Works
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Showcase of Edits, Videos & Graphic Campaigns
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedMedia(proj)}
              className="showcase-card group relative rounded-3xl bg-black/45 hover:bg-black/65 border border-white/10 hover:border-cyan-400/50 backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)] cursor-pointer flex flex-col justify-between"
            >
              {/* Card Media Preview Header */}
              <div className="relative w-full h-64 bg-slate-950 flex items-center justify-center overflow-hidden">
                
                {proj.type === 'video' ? (
                  <>
                    {/* Video element on hover */}
                    <video
                      src={proj.mediaSrc}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                      onMouseEnter={(e) => e.target.play().catch(() => {})}
                      onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                    />

                    {/* Centered Glowing Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300 bg-black/30">
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 fill-cyan-300 text-cyan-300 ml-1" />
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
                      <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-xl">
                        <ImageIcon className="w-6 h-6 text-cyan-300" />
                      </div>
                    </div>
                  </>
                )}

                {/* Duration / Resolution Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/15 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                    {proj.resolution}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/15 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                    {proj.duration}
                  </span>
                </div>

                {/* Metric Badge */}
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-blue-600/80 border border-cyan-400/40 text-[10px] font-mono text-white font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3 h-3 text-cyan-200" />
                    {proj.stats}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {proj.client}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded border border-white/10">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                {/* Deliverable Tags */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-cyan-400/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {proj.type === 'video' ? 'Play Video' : 'View Design'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. CORE CAPABILITIES (4-Grid Breakdown)                  */}
        {/* ======================================================== */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              Full-Spectrum Deliverables
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">
              Capabilities Engineered for Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl bg-black/40 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-cyan-400/25 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <span className="text-[9px] font-mono text-cyan-300 tracking-widest uppercase px-2 py-0.5 rounded bg-blue-500/10 border border-cyan-400/20">
                      {cap.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-3 mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. PRODUCTION TIMELINE & WORKFLOW                        */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-black/40 border border-cyan-500/25 backdrop-blur-2xl shadow-2xl mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                How We Produce Media Assets
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              End-to-End Creative Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-black font-mono text-cyan-400/40 mb-2">
                  {step.num}
                </span>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. CALL TO ACTION BANNER                                 */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-6 shadow-lg">
            <Sparkles className="w-7 h-7 text-cyan-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Elevate Your Visual Content?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mb-8">
            Let us craft high-impact promotional videos, CGI animations, and visual branding engineered for your growth targets.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] transition-all duration-300 hover:scale-105"
          >
            <span>Initiate Media Project Brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 6. INTERACTIVE MEDIA LIGHTBOX / VIDEO PLAYER MODAL       */}
      {/* ======================================================== */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-4xl rounded-3xl bg-[#041024] border border-cyan-400/40 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  {selectedMedia.client}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs font-mono shadow-md hover:scale-105 transition-transform shrink-0"
              >
                <span>Request Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
