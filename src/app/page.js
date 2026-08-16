'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Play } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

const DOMAIN_SERVICES = [
  {
    title: 'Media Production',
    subtitle: 'Cinematic Motion',
    desc: 'Fluid, morphing organic SVG gradient reels and high-end video production.',
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

      // Staggered entrance for hero elements
      tl.from('.anim-logo-section', {
        scale: 0.9,
        y: 20,
        opacity: 0,
        duration: 1.2,
      })
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
      
      {/* 1. Top Hero Section: Centered Animated Logo */}
      <div className="anim-logo-section flex flex-col items-center justify-center pt-8 sm:pt-12 md:pt-16">
        <AnimatedLogo />
      </div>

      {/* Spacer allowing the animated train, viaduct bridge, and mountain ridges to be visible in midground */}
      <div className="h-32 sm:h-44 md:h-56 w-full pointer-events-none" />

      {/* 2. Lower Content Section (On the deep midnight navy base) */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        
        {/* Decorative Divider with Heading */}
        <div className="flex items-center gap-4 w-full justify-center mb-5">
          <div className="anim-divider h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyan-400/60" />
          <h2 className="anim-body text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow">
            Bring your design to the next level
          </h2>
          <div className="anim-divider h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </div>

        {/* Authentic Company Description */}
        <p className="anim-body text-slate-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl px-4 drop-shadow-sm">
          Navra Studio is an elite full-stack creative agency and software development studio. We merge high-performance interactive vector SVG motion, animated storytelling landscapes, and intelligent multi-page architectures into one seamless digital experience.
        </p>

        {/* Action Buttons with Brand Theme Gradients (Electric Sapphire & Ice Blue) */}
        <div className="anim-cta flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all duration-300 hover:scale-105"
          >
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md hover:border-cyan-400/40"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Explore Showcase</span>
          </Link>
        </div>
      </div>

      {/* 3. Service Domains Grid with Brand Theme Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {DOMAIN_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.href}
              className="anim-card group relative p-5 rounded-2xl bg-[#030D1E]/80 hover:bg-[#071933]/90 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full border border-blue-500/20 text-cyan-300 bg-blue-500/5">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">{service.title}</h3>
              <p className="text-xs text-cyan-300/80 font-mono mb-2">{service.subtitle}</p>
              <p className="text-xs text-slate-400 font-light leading-relaxed">{service.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
