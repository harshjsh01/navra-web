'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Film, TrendingUp, Cpu, Radio, Play, ChevronDown } from 'lucide-react';
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
      // 1. First Fold Entrance
      gsap.from('.first-fold-heading-wrap', {
        y: 25,
        opacity: 0,
        duration: 1.0,
        delay: 0.3,
        ease: 'power3.out',
      });

      // 2. Scroll Triggered Entrance for Scrolled Content
      gsap.from('.scrolled-content-heading', {
        scrollTrigger: {
          trigger: '#about-section',
          start: 'top 80%',
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
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
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
    <div ref={pageRef} className="relative w-full flex flex-col items-center select-none">
      
      {/* ======================================================== */}
      {/* SECTION 1: FIRST FOLD (Initial Screen with Animated Logo) */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 sm:pt-20 pb-8">
        
        {/* Top Spacer */}
        <div className="h-2" />

        {/* Center: The Interactive Animated Logo */}
        <div className="flex flex-col items-center justify-center w-full my-auto">
          <AnimatedLogo />
        </div>

        {/* Bottom of First Fold: Exact Reference Heading Placement */}
        <div 
          onClick={scrollToAbout}
          className="first-fold-heading-wrap flex flex-col items-center text-center cursor-pointer group mt-4 mb-2"
        >
          {/* Top-Left Offset Accent Line */}
          <div className="w-full flex justify-center mb-2.5">
            <div className="h-[2px] w-24 sm:w-32 bg-white/70 rounded-full mr-24 group-hover:w-36 group-hover:bg-cyan-300 transition-all duration-300" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:text-cyan-200 transition-colors">
            Bring your design to the next level
          </h1>

          {/* Bottom-Right Offset Accent Line */}
          <div className="w-full flex justify-center mt-2.5">
            <div className="h-[2px] w-24 sm:w-32 bg-white/70 rounded-full ml-24 group-hover:w-36 group-hover:bg-cyan-300 transition-all duration-300" />
          </div>

          <div className="flex items-center gap-1 mt-3 text-slate-400 group-hover:text-cyan-300 transition-colors text-xs font-mono">
            <span>Scroll down</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
          </div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* SECTION 2: SCROLLED CONTENT (Dark Background Section)   */}
      {/* ======================================================== */}
      <section 
        id="about-section" 
        className="about-section relative z-10 w-full bg-[#020C1B] border-t border-cyan-900/20 py-20 px-4 sm:px-6 lg:px-8 shadow-2xl"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Scrolled Section Heading with Accent Lines */}
          <div className="scrolled-content-heading flex flex-col items-center mb-8">
            <div className="w-full flex justify-center mb-2.5">
              <div className="h-[2px] w-24 sm:w-32 bg-white/70 rounded-full mr-20" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow">
              Bring your design to the next level
            </h2>

            <div className="w-full flex justify-center mt-2.5">
              <div className="h-[2px] w-24 sm:w-32 bg-white/70 rounded-full ml-20" />
            </div>
          </div>

          {/* About Us & Agency Core Identity Description */}
          <div className="max-w-2xl text-slate-300 text-sm sm:text-base font-normal leading-relaxed text-center mb-12">
            <p className="mb-4">
              <strong className="text-white font-semibold">Navra Studio</strong> serves as your agency arm, handling complete digital management, creative production, and custom software engineering for external clients and internal brands.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We merge high-performance interactive vector SVG motion, animated storytelling landscapes, and intelligent multi-page architectures into one seamless digital experience.
            </p>
          </div>

          {/* Service Spectrum Heading */}
          <div className="w-full mb-6 flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Service Spectrum
            </h3>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Capabilities & Deliverables
            </span>
          </div>

          {/* 4 Core Services Grid */}
          <div className="service-grid grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-14 text-left">
            {SERVICE_SPECTRUM.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="service-card-item group p-6 rounded-2xl bg-[#051329]/85 hover:bg-[#091E3D] border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-blue-500/20 text-cyan-300 bg-blue-500/5">
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

          {/* Call to Action Buttons */}
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
