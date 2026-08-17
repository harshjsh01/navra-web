'use client';

import Link from 'next/link';
import { ArrowUpRight, Film, TrendingUp, Cpu, Radio, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-black/40 backdrop-blur-2xl border-t border-white/10 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 flex flex-col items-start">
            <Link href="/" className="inline-block mb-4 group">
              <img
                src="/NAVRA text.png"
                alt="Navra Studio"
                className="h-10 w-auto object-contain brightness-110 group-hover:brightness-125 transition-all"
              />
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              Full-Stack Creative Agency & Software Development Studio. We engineer interactive vector motion, cinematic media, and intelligent digital architectures.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bring your design to the next level</span>
            </div>
          </div>

          {/* Column 2: Service Spectrum Links */}
          <div className="flex flex-col">
            <h5 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-4">
              Service Spectrum
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/media" className="hover:text-cyan-300 transition-colors flex items-center gap-2 group">
                  <Film className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span>Media Production</span>
                </Link>
              </li>
              <li>
                <Link href="/growth" className="hover:text-cyan-300 transition-colors flex items-center gap-2 group">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span>Digital Growth</span>
                </Link>
              </li>
              <li>
                <Link href="/tech" className="hover:text-cyan-300 transition-colors flex items-center gap-2 group">
                  <Cpu className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span>Tech & AI Engineering</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-300 transition-colors flex items-center gap-2 group">
                  <Radio className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span>Event Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & Connect */}
          <div className="flex flex-col">
            <h5 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-4">
              Studio & Direct
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/team" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Creative Team</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Initiate Project Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>contact@navrastudio.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Navra Studio. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            <span>Back to top</span>
            <span className="text-cyan-400 font-bold">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
