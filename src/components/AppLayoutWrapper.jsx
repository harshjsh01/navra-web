'use client';

import StorySvgBackground from './StorySvgBackground';
import NavigationHUD from './NavigationHUD';

export default function AppLayoutWrapper({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col text-slate-100 selection:bg-fuchsia-600 selection:text-white">
      {/* Interactive Storytelling SVG Vector Landscape */}
      <StorySvgBackground />

      {/* Floating HUD Navigation */}
      <NavigationHUD />

      {/* Dynamic Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col pt-16">
        {children}
      </main>
    </div>
  );
}
