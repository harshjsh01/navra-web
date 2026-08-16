'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, TrendingUp, Cpu, Radio, Users, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Media Production', href: '/media', icon: Film },
  { name: 'Digital Growth', href: '/growth', icon: TrendingUp },
  { name: 'Tech & AI', href: '/tech', icon: Cpu },
  { name: 'Event Management', href: '/events', icon: Radio },
  { name: 'Team', href: '/team', icon: Users },
];

export default function NavigationHUD() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        className="w-full max-w-5xl px-6 py-3 flex items-center justify-between rounded-full glass-hud shadow-2xl transition-all duration-300"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-gradient-to-tr from-blue-600 via-cyan-400 to-sky-300 p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
             <div className="w-full h-full bg-[#020C1B] rounded-full flex items-center justify-center p-1">
                <img src="/navra_logo_perfect.png" alt="NAVRA" className="w-full h-full object-contain" />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-[0.2em] font-bold text-white group-hover:text-cyan-300 transition-colors">NAVRA</span>
            <span className="font-mono text-[9px] tracking-widest text-cyan-400 uppercase font-semibold">Studio</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1.5 bg-black/25 p-1 rounded-full border border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  isActive ? 'text-white bg-gradient-to-r from-blue-600/40 to-cyan-500/40 border border-cyan-400/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="absolute top-20 left-4 right-4 glass-hud rounded-3xl p-4 flex flex-col gap-2 lg:hidden">
          {NAV_ITEMS.map((item) => {
             const isActive = pathname === item.href;
             return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl flex items-center gap-3 text-sm transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                  {item.name}
                </Link>
             )
          })}
        </div>
      )}
    </header>
  );
}
