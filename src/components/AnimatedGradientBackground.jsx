'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimatedGradientBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Set speeds and amplitudes based on the active route
    switch (pathname) {
      case '/media':
        root.style.setProperty('--gradient-speed', '12s');
        root.style.setProperty('--gradient-color-1', '#1D4ED8'); // Sapphire
        root.style.setProperty('--gradient-color-2', '#0EA5E9'); // Ice Blue
        root.style.setProperty('--gradient-color-3', '#312E81');
        break;
      case '/growth':
        root.style.setProperty('--gradient-speed', '10s');
        root.style.setProperty('--gradient-color-1', '#4338CA');
        root.style.setProperty('--gradient-color-2', '#0284C7');
        root.style.setProperty('--gradient-color-3', '#1E1B4B');
        break;
      case '/tech':
        root.style.setProperty('--gradient-speed', '8s');
        root.style.setProperty('--gradient-color-1', '#0369A1');
        root.style.setProperty('--gradient-color-2', '#38BDF8');
        root.style.setProperty('--gradient-color-3', '#0C4A6E');
        break;
      case '/events':
        root.style.setProperty('--gradient-speed', '14s');
        root.style.setProperty('--gradient-color-1', '#BE123C');
        root.style.setProperty('--gradient-color-2', '#E11D48');
        root.style.setProperty('--gradient-color-3', '#4C0519');
        break;
      case '/team':
        root.style.setProperty('--gradient-speed', '20s');
        root.style.setProperty('--gradient-color-1', '#334155');
        root.style.setProperty('--gradient-color-2', '#64748B');
        root.style.setProperty('--gradient-color-3', '#0F172A');
        break;
      default: // Home
        root.style.setProperty('--gradient-speed', '15s');
        root.style.setProperty('--gradient-color-1', '#1D4ED8'); // Electric Sapphire
        root.style.setProperty('--gradient-color-2', '#0EA5E9'); // Soft Ice Blue
        root.style.setProperty('--gradient-color-3', '#020C1B'); // Midnight Navy
    }
  }, [pathname]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#020C1B]">
      {/* CSS Mesh Gradients rendered via custom CSS in globals.css */}
      <div className="absolute inset-0 w-full h-full gradient-mesh">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
    </div>
  );
}
