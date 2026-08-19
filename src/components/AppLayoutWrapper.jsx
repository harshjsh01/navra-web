'use client';

import { usePathname } from 'next/navigation';
import StorySvgBackground from './StorySvgBackground';
import NewspaperMediaBackground from './NewspaperMediaBackground';
import NavigationHUD from './NavigationHUD';
import Footer from './Footer';

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isMediaPage = pathname === '/media';

  return (
    <div className={`relative ${isMediaPage ? 'h-screen overflow-hidden' : 'min-h-screen'} w-full flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-black`}>
      {/* Route-Specific Background Landscape for other pages */}
      {!isMediaPage && <StorySvgBackground />}

      {/* Floating HUD Navigation */}
      <NavigationHUD />

      {/* Dynamic Content */}
      <main className={`relative z-10 w-full flex-1 flex flex-col ${isMediaPage ? 'h-full pt-0' : 'pt-16'}`}>
        {children}
      </main>

      {/* Global Studio Footer for other pages */}
      {!isMediaPage && <Footer />}
    </div>
  );
}
