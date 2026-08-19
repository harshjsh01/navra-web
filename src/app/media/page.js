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
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Volume2, 
  Maximize2 
} from 'lucide-react';

const CATEGORIES = ['All Projects', 'Cinematic Reels', 'Brand Films', '3D & Motion', 'Commercials'];

const SHOWCASE_PROJECTS = [
  {
    id: 1,
    title: 'Hyperion Velocity Reel',
    client: 'Hyperion Motors',
    category: 'Cinematic Reels',
    duration: '0:45',
    resolution: '4K Ultra HD',
    tags: ['VFX', 'Color Grade', 'Speed Ramp'],
    stats: '2.4M Views',
    gradient: 'from-blue-600/30 to-cyan-500/20',
    description: 'High-octane commercial reel engineered with dynamic speed ramps and cinematic anamorphic color grade.',
  },
  {
    id: 2,
    title: 'AeroPulse Brand Identity Film',
    client: 'AeroPulse Audio',
    category: 'Brand Films',
    duration: '1:20',
    resolution: '4K 60FPS',
    tags: ['Brand Story', 'Sound Design', 'CGI'],
    stats: '98% Retention',
    gradient: 'from-indigo-600/30 to-blue-500/20',
    description: 'Immersive brand launch film combining 3D acoustic product visualization with studio-grade spatial audio design.',
  },
  {
    id: 3,
    title: 'Nexus Fluid Morph Motion ID',
    client: 'Nexus AI Ecosystem',
    category: '3D & Motion',
    duration: '0:30',
    resolution: '8K Vector Render',
    tags: ['Vector SVG', 'Fluid Sim', 'Logo Motion'],
    stats: '1.1M Impressions',
    gradient: 'from-cyan-600/30 to-teal-500/20',
    description: 'Organic vector morphing logo reveal and animated design system created for digital product interfaces.',
  },
  {
    id: 4,
    title: 'Vanguard Cybernetic Campaign',
    client: 'Vanguard Tech',
    category: 'Commercials',
    duration: '1:00',
    resolution: '4K Cinema',
    tags: ['Social Ad', 'VFX', 'Hook Strategy'],
    stats: '+320% ROI',
    gradient: 'from-sky-600/30 to-blue-700/20',
    description: 'Multi-platform social advertisement suite engineered for high-retention performance marketing campaigns.',
  },
];

const CAPABILITIES = [
  {
    icon: Film,
    title: 'Cinematic Video Editing',
    desc: 'Precision story pacing, multi-cam synchronization, and high-end narrative flow tailored for maximum retention.',
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
    desc: 'Immersive sound effects, foley design, bespoke musical rhythm synchronization, and crystal-clear voice polish.',
    tag: 'AUDIO FX',
  },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Creative Brief & Concept', desc: 'Moodboards, visual references, and script breakdown.' },
  { num: '02', title: 'Production & Asset Crafting', desc: 'Filming, 3D asset modeling, and motion vector setup.' },
  { num: '03', title: 'Post-Production & VFX', desc: 'Editing, color grading, sound design, and animated typography.' },
  { num: '04', title: 'Final Master Delivery', desc: 'High-bitrate 4K exports optimized for broadcast and digital platforms.' },
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedVideo, setSelectedVideo] = useState(null);
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
        stagger: 0.12,
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
            From high-energy promotional reels and 3D visual identities to full-scale post-production workflows — we engineer visual storytelling that commands attention.
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#showcase-grid"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105"
            >
              <span>Explore Media Showcase</span>
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
      {/* 2. INTERACTIVE MEDIA SHOWCASE GRID                       */}
      {/* ======================================================== */}
      <section id="showcase-grid" className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto pt-8 pb-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                Featured Portfolio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Selected Works & Video Showcase
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

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedVideo(proj)}
              className="showcase-card group relative rounded-3xl bg-black/45 hover:bg-black/65 border border-white/10 hover:border-cyan-400/50 backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col justify-between"
            >
              {/* Card Media Preview Header */}
              <div className={`relative w-full h-56 bg-gradient-to-br ${proj.gradient} flex items-center justify-center overflow-hidden`}>
                
                {/* Ambient Grid overlay in preview */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                {/* Centered Play Button */}
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-xl z-10">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>

                {/* Duration & Resolution Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                    {proj.resolution}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                    {proj.duration}
                  </span>
                </div>

                {/* Metric Badge */}
                <div className="absolute bottom-4 right-4">
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
                    Watch <ArrowRight className="w-3 h-3" />
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
      {/* 6. INTERACTIVE VIDEO PREVIEW MODAL                       */}
      {/* ======================================================== */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-3xl rounded-3xl bg-[#041024] border border-cyan-400/40 p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  {selectedVideo.client}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Frame Mockup */}
            <div className={`relative w-full aspect-video rounded-2xl bg-gradient-to-br ${selectedVideo.gradient} flex flex-col items-center justify-center p-6 border border-white/10 mb-4 overflow-hidden`}>
              <div className="w-20 h-20 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-2xl animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="mt-4 text-xs font-mono text-cyan-200 tracking-wider">
                [ Interactive 4K Stream Simulation • {selectedVideo.resolution} ]
              </p>
            </div>

            {/* Modal Info */}
            <p className="text-sm text-slate-300 font-light mb-4">
              {selectedVideo.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                {selectedVideo.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/10 border border-cyan-400/20 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="text-xs font-mono font-bold text-cyan-300 hover:underline flex items-center gap-1"
              >
                Request Similar Project →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
