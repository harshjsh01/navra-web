'use client';

import { usePathname } from 'next/navigation';
import StorySvgBackground from './StorySvgBackground';
import MediaSvgBackground from './MediaSvgBackground';
import NavigationHUD from './NavigationHUD';
import Footer from './Footer';

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isMediaPage = pathname === '/media';

  return (
    <div className="relative min-h-screen w-full flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Route-Specific Interactive Storytelling SVG Landscapes */}
      {isMediaPage ? <MediaSvgBackground /> : <StorySvgBackground />}

      {/* Floating HUD Navigation */}
      <NavigationHUD />

      {/* Dynamic Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col pt-16">
        {children}
      </main>

      {/* Global Studio Footer */}
      <Footer />
    </div>
  );
}
