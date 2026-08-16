'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Sparkles } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

const DOMAIN_CARDS = [
  {
    title: 'Media Production',
    subtitle: 'Vector Motion SVGs',
    desc: 'Fluid, morphing organic SVG gradient blobs behind glassmorphic video showcase panels.',
    href: '/media',
    themeColor: '#1D4ED8',
    icon: Film,
    tag: 'CINEMATIC',
  },
  {
    title: 'Digital Growth',
    subtitle: 'AR/VR Dials',
    desc: 'Spinning concentric vector wheels, glowing data lines, and hover spotlights.',
    href: '/growth',
    themeColor: '#0EA5E9',
    icon: TrendingUp,
    tag: 'ACQUISITION',
  },
  {
    title: 'Tech & AI',
    subtitle: 'Node Network',
    desc: 'Glowing node network tracing pathways and shooting bright data pulses.',
    href: '/tech',
    themeColor: '#38BDF8',
    icon: Cpu,
    tag: 'INTELLIGENCE',
  },
  {
    title: 'Event Management',
    subtitle: 'Concert Grid',
    desc: 'Responsive concert stage grid and live ticketing metrics.',
    href: '/events',
    themeColor: '#2563EB',
    icon: Radio,
    tag: 'EXPERIENCES',
  },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation for hero typography & CTAs
      gsap.from('.hero-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from('.card-anim', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center pt-24 md:pt-32">
      
      {/* Hero Content HTML Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Property.ai-Style Animated Vector Logo */}
        <div className="relative z-0 w-full flex items-center justify-center mb-8 pointer-events-none">
          <AnimatedLogo />
        </div>

        <div className="hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-300 text-[10px] font-mono tracking-widest uppercase mb-6 bg-blue-500/10 backdrop-blur-sm -mt-10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Vector Motion • CSS Gradients v4.0</span>
        </div>

        <p className="hero-anim text-slate-300 max-w-2xl text-sm sm:text-base md:text-lg font-light tracking-wide mt-2 leading-relaxed">
          Elite full-stack creative agency and software development studio. We merge high-performance CSS animated gradients with fluid vector SVGs for an unparalleled digital experience.
        </p>

        {/* Primary Call-to-Actions */}
        <div className="hero-anim flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105"
          >
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Interactive Service Domains Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-24">
        {DOMAIN_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="card-anim group glass-hud rounded-2xl p-6 flex flex-col justify-between hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest px-2 py-1 rounded-full border border-blue-500/20 text-cyan-300 bg-blue-500/5">
                    {card.tag}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white mb-1">{card.title}</h2>
                <h3 className="text-xs font-mono text-cyan-400/80 mb-3">{card.subtitle}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{card.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
