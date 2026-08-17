'use client';

import StorySvgBackground from './StorySvgBackground';
import NavigationHUD from './NavigationHUD';
import Footer from './Footer';

export default function AppLayoutWrapper({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Interactive Storytelling SVG Vector Landscape */}
      <StorySvgBackground />

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
