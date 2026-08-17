'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Play, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

const SERVICE_SPECTRUM = [
  {
    title: 'Media Production',
    subtitle: 'Cinematic & Visuals',
    deliverables: 'Video editing, promotional reels, graphics design, and visual branding.',
    href: '/media',
    icon: Film,
    tag: 'PRODUCTION',
    color: 'from-blue-600/20 to-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    title: 'Digital Growth',
    subtitle: 'Campaigns & Reach',
    deliverables: 'End-to-end social media handling, campaign strategy, and influencer marketing.',
    href: '/growth',
    icon: TrendingUp,
    tag: 'ACQUISITION',
    color: 'from-blue-600/20 to-sky-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Tech & AI Engineering',
    subtitle: 'Software & Intelligence',
    deliverables: 'Custom web app development, mobile apps, custom AI/ML integration, and cloud backend solutions.',
    href: '/tech',
    icon: Cpu,
    tag: 'INTELLIGENCE',
    color: 'from-cyan-600/20 to-teal-500/10',
    borderColor: 'border-teal-500/30',
  },
  {
    title: 'Event Management',
    subtitle: 'Live Experiences',
    deliverables: 'Experiential brand activations, concert stage engineering, and live event ticketing metrics.',
    href: '/events',
    icon: Radio,
    tag: 'EXPERIENCES',
    color: 'from-indigo-600/20 to-blue-500/10',
    borderColor: 'border-indigo-500/30',
  },
];

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean hero entrance
      gsap.from('.hero-tagline', {
        y: 20,
        opacity: 0,
        duration: 1.0,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.scroll-hint', {
        y: -10,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutEl = document.getElementById('about-section');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="relative w-full flex flex-col items-center">
      
      {/* ======================================================== */}
      {/* SECTION 1: FIRST FOLD (Hero with Animated Logo & Tagline) */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-8 sm:pt-12 pb-6">
        
        {/* Top spacer */}
        <div className="h-2" />

        {/* Center: The Interactive Animated Logo */}
        <div className="flex flex-col items-center justify-center w-full my-auto">
          <AnimatedLogo />

          {/* Clean Subtitle Tagline below logo */}
          <div className="hero-tagline flex flex-col items-center text-center mt-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                Creative Vision • Intelligent Motion
              </span>
            </div>
            <p className="text-slate-300/90 text-xs sm:text-sm font-light tracking-wide max-w-md">
              Full-Stack Digital Agency & Custom Software Engineering Studio
            </p>
          </div>
        </div>

        {/* Bottom: Smooth Scroll Down Prompt */}
        <button
          onClick={scrollToAbout}
          className="scroll-hint group flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer select-none focus:outline-none mb-1"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300 transition-colors">
            Scroll to explore what we do
          </span>
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-cyan-300" />
          </div>
        </button>

      </section>

      {/* ======================================================== */}
      {/* SECTION 2: SCROLLED CONTENT (About Us, Spectrum & CTAs)  */}
      {/* ======================================================== */}
      <section id="about-section" className="relative z-10 w-full bg-[#020C1B] pt-20 pb-32 border-t border-cyan-500/10">
        
        {/* Subtle decorative ambient backdrop */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020C1B]/40 to-[#020C1B] pointer-events-none -z-10" />

        <div className="max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
          
          {/* Decorative Divider & Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="flex items-center gap-4 w-full justify-center mb-4">
              <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                Bring your design to the next level
              </h2>
              <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-l from-transparent to-cyan-400/60" />
            </div>
            <p className="text-xs sm:text-sm text-cyan-300/80 font-mono tracking-wider uppercase">
              What We Do • Full-Spectrum Agency Capabilities
            </p>
          </div>

          {/* Core Identity Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#051329] border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border border-blue-500/30 text-blue-300 bg-blue-500/10 uppercase">
                  Agency Arm
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">Navra Studio</h3>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono">
                  Core Identity: Full-Stack Creative Agency & Software Development Studio
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Navra Studio serves as your agency arm, handling complete digital management, creative production, and custom software engineering for external clients and internal brands.
            </p>
          </div>

          {/* Service Spectrum Heading */}
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Service Spectrum
            </h4>
            <span className="text-xs font-mono text-cyan-400/80">
              Capabilities & Deliverables
            </span>
          </div>

          {/* Service Spectrum 4-Domain Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {SERVICE_SPECTRUM.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className={`group relative p-7 rounded-2xl bg-gradient-to-br ${service.color} bg-[#041024] hover:bg-[#071938] border ${service.borderColor} transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center border border-cyan-400/25 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border border-cyan-400/20 text-cyan-300 bg-cyan-500/10">
                        {service.tag}
                      </span>
                    </div>

                    <h5 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                      {service.title}
                    </h5>
                    <p className="text-xs text-cyan-300 font-mono mb-3">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {service.deliverables}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end text-xs font-mono text-cyan-400 group-hover:text-cyan-200 gap-2 transition-colors">
                    <span>Explore Domain</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Action Buttons at the Bottom */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all duration-300 hover:scale-105"
            >
              <span>Initiate Project Brief</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md hover:border-cyan-400/40"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Explore Showcase</span>
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}
