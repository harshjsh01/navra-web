'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Sparkles, Play } from 'lucide-react';

const DOMAIN_SERVICES = [
  {
    title: 'Media Production',
    subtitle: 'Cinematic Motion',
    desc: 'Fluid, morphing organic SVG gradient reels and video production.',
    href: '/media',
    icon: Film,
    tag: 'PRODUCTION',
  },
  {
    title: 'Digital Growth',
    subtitle: 'AR/VR Dials',
    desc: 'Spinning concentric vector graphics, analytics, and funnel optimization.',
    href: '/growth',
    icon: TrendingUp,
    tag: 'GROWTH',
  },
  {
    title: 'Tech & AI Hub',
    subtitle: 'Node Networks',
    desc: 'Intelligent full-stack architectures and real-time algorithmic pipelines.',
    href: '/tech',
    icon: Cpu,
    tag: 'INTELLIGENCE',
  },
  {
    title: 'Event Management',
    subtitle: 'Stage Grids',
    desc: 'Interactive concert stage experiences and live event ticketing.',
    href: '/events',
    icon: Radio,
    tag: 'EXPERIENCES',
  },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered cinematic entrance
      tl.from('.anim-eyebrow', {
        y: -20,
        opacity: 0,
        duration: 1.0,
      })
      .from('.anim-title', {
        scale: 0.92,
        y: 30,
        opacity: 0,
        duration: 1.2,
      }, '-=0.6')
      .from('.anim-tagline', {
        y: 20,
        opacity: 0,
        duration: 1.0,
      }, '-=0.6')
      .from('.anim-divider', {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      }, '-=0.5')
      .from('.anim-body', {
        y: 25,
        opacity: 0,
        duration: 1.0,
      }, '-=0.5')
      .from('.anim-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      }, '-=0.4')
      .from('.anim-card', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
      }, '-=0.4');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
      
      {/* 1. Top Hero Section (Positioned in the Sky area) */}
      <div className="flex flex-col items-center text-center pt-8 sm:pt-14 md:pt-20">
        
        {/* Eyebrow badge */}
        <p className="anim-eyebrow font-sans text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#3B0764] sm:text-[#4A044E] drop-shadow-sm mb-3">
          CREATIVE ANIMATION JOURNEY
        </p>

        {/* Main Headline styled exactly like the SVGator reference */}
        <h1 className="anim-title font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#4C0519] sm:text-[#581C87] drop-shadow-md uppercase leading-none">
          BEYOND LIMITS
        </h1>

        {/* Subtitle brand tag */}
        <div className="anim-tagline flex items-center gap-2 mt-4 px-4 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
          <span className="font-serif font-bold text-xs tracking-widest text-[#2E1065] uppercase">
            NAVRA STUDIO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
          <span className="font-mono text-[10px] text-[#4C1D95] font-semibold">
            Interactive SVG Experience
          </span>
        </div>
      </div>

      {/* Spacer allowing the animated train, mountains, and viaduct bridge to be clearly visible in midground */}
      <div className="h-40 sm:h-56 md:h-72 w-full pointer-events-none" />

      {/* 2. Lower Hero Content (Positioned on the dark violet/indigo foreground base) */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-4">
        
        {/* Decorative Divider with Tagline */}
        <div className="flex items-center gap-4 w-full justify-center mb-6">
          <div className="anim-divider h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/60" />
          <h2 className="anim-body text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow">
            Bring your design to the next level
          </h2>
          <div className="anim-divider h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/60" />
        </div>

        {/* Descriptive Body Paragraph */}
        <p className="anim-body text-slate-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl px-4 drop-shadow-sm">
          Want to discover how to create stunning web experiences that power up any digital presence?
          Navra Studio merges high-speed vector SVG motion, liquid storytelling landscapes, and intelligent multi-page architectures into one seamless ecosystem.
        </p>

        {/* Action Buttons */}
        <div className="anim-cta flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] transition-all duration-300 hover:scale-105"
          >
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Explore Showcase</span>
          </Link>
        </div>
      </div>

      {/* 3. Service Domains Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
        {DOMAIN_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.href}
              className="anim-card group relative p-5 rounded-2xl bg-[#0B032D]/70 hover:bg-[#1E1B4B]/80 border border-white/10 hover:border-pink-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-500/20 transition-colors">
                  <Icon className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full border border-pink-500/20 text-pink-300 bg-pink-500/5">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-pink-200 transition-colors">{service.title}</h3>
              <p className="text-xs text-purple-300/80 font-mono mb-2">{service.subtitle}</p>
              <p className="text-xs text-slate-400 font-light leading-relaxed">{service.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
