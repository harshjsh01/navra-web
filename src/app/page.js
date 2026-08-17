'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Play, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_SPECTRUM = [
  {
    title: 'Media Production',
    subtitle: 'Video & Visual Branding',
    deliverables: 'Video editing, promotional reels, graphics design, and visual branding.',
    href: '/media',
    icon: Film,
    tag: 'PRODUCTION',
  },
  {
    title: 'Digital Growth',
    subtitle: 'Campaign Strategy & Reach',
    deliverables: 'End-to-end social media handling, campaign strategy, and influencer marketing.',
    href: '/growth',
    icon: TrendingUp,
    tag: 'GROWTH',
  },
  {
    title: 'Tech & AI Engineering',
    subtitle: 'Full-Stack Software & AI',
    deliverables: 'Custom web app development, mobile apps, custom AI/ML integration, and cloud backend solutions.',
    href: '/tech',
    icon: Cpu,
    tag: 'ENGINEERING',
  },
  {
    title: 'Event Management',
    subtitle: 'Experiential & Activations',
    deliverables: 'Experiential brand activations, concert stage AV engineering, and live event ticketing metrics.',
    href: '/events',
    icon: Radio,
    tag: 'EXPERIENCES',
  },
];

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Hero Subtle Fade In
      gsap.from('.hero-logo-wrap', {
        y: -15,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      // 2. Scroll-Triggered Entrance for the Lower Section
      gsap.from('.scrolled-heading-block', {
        scrollTrigger: {
          trigger: '#about-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      gsap.from('.about-intro-block', {
        scrollTrigger: {
          trigger: '.about-intro-block',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      gsap.from('.service-card-item', {
        scrollTrigger: {
          trigger: '.service-grid',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.bottom-cta-wrap', {
        scrollTrigger: {
          trigger: '.bottom-cta-wrap',
          start: 'top 92%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const aboutEl = document.getElementById('about-section');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="relative w-full flex flex-col items-center select-none">
      
      {/* ======================================================== */}
      {/* SECTION 1: FIRST FOLD (Clean Hero: Logo & Unobstructed Story Landscape) */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 sm:pt-24 pb-12">
        
        {/* Top Spacer */}
        <div className="h-4" />

        {/* Center: The Interactive Animated Logo */}
        <div className="hero-logo-wrap flex flex-col items-center justify-center w-full mt-4 sm:mt-8">
          <AnimatedLogo />
        </div>

        {/* Midground is left completely open for the animated train, viaduct bridge, swaying trees, and flowers */}
        <div className="flex-1 w-full pointer-events-none min-h-[140px] sm:min-h-[220px]" />

        {/* Subtle Scroll Down Prompt at the bottom of the first fold */}
        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer select-none focus:outline-none z-20"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300 transition-colors">
            Scroll to explore
          </span>
          <div className="w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/15 transition-all animate-bounce backdrop-blur-md">
            <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-cyan-300" />
          </div>
        </button>

      </section>

      {/* ======================================================== */}
      {/* SECTION 2: SCROLLED CONTENT (Lower Ground Section)      */}
      {/* ======================================================== */}
      <section 
        id="about-section" 
        className="about-section relative z-10 w-full bg-[#020C1B] border-t border-cyan-900/30 pt-24 pb-32 px-4 sm:px-6 lg:px-8 shadow-2xl"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* 1. Exact Reference Heading Placement with Offset Accent Lines */}
          <div className="scrolled-heading-block flex flex-col items-center mb-6">
            {/* Top-Left Offset Line */}
            <div className="w-full flex justify-center mb-3">
              <div className="h-[2px] w-24 sm:w-36 bg-white/80 rounded-full mr-24 sm:mr-32" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Bring your design to the next level
            </h2>

            {/* Bottom-Right Offset Line */}
            <div className="w-full flex justify-center mt-3">
              <div className="h-[2px] w-24 sm:w-36 bg-white/80 rounded-full ml-24 sm:mr-[-8rem] sm:ml-32" />
            </div>
          </div>

          {/* 2. Animation & Creative Statement */}
          <p className="max-w-2xl text-slate-300 text-sm sm:text-base font-normal leading-relaxed text-center mb-16 px-4">
            Want to learn how to create stunning web animations that will power up any website? SVG animations are constantly growing in popularity and they prevail against GIFs in so many ways. Join us to explore the latest trends and techniques in the field of web animations and become a pro in no time!
          </p>

          {/* 3. About Us & Core Identity (YDIX / Navra Studio) */}
          <div className="about-intro-block w-full p-6 sm:p-8 rounded-3xl bg-[#051329]/90 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] mb-14 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-500/10 uppercase font-semibold">
                  About Us • Agency Arm
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Navra Studio
                </h3>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono block">
                  Core Identity: Full-Stack Creative Agency & Software Studio
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Powered by YDIX Ecosystem
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-3">
              Navra Studio serves as your agency arm, handling complete digital management, creative production, and custom software engineering for external clients and internal brands.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We merge high-performance interactive vector SVG motion, animated storytelling landscapes, and intelligent multi-page architectures into one seamless digital experience.
            </p>
          </div>

          {/* 4. Service Spectrum Header */}
          <div className="w-full mb-6 flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Service Spectrum
            </h3>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Capabilities & Deliverables
            </span>
          </div>

          {/* 5. 4 Core Services Grid */}
          <div className="service-grid grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-16 text-left">
            {SERVICE_SPECTRUM.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="service-card-item group p-6 rounded-2xl bg-[#051329]/80 hover:bg-[#081F42] border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-blue-500/20 text-cyan-300 bg-blue-500/5 font-semibold">
                        {service.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-cyan-300/80 font-mono mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {service.deliverables}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-end text-xs font-mono text-cyan-400/80 group-hover:text-cyan-300 gap-1.5 transition-colors">
                    <span>Explore Domain</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 6. Action Buttons (Positioned at the bottom below everything) */}
          <div className="bottom-cta-wrap flex flex-wrap items-center justify-center gap-4">
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
      </section>

    </div>
  );
}
