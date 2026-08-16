'use client';

import AnimatedGradientBackground from './AnimatedGradientBackground';
import NavigationHUD from './NavigationHUD';

export default function AppLayoutWrapper({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Global CSS Animated Gradient Mesh */}
      <AnimatedGradientBackground />

      {/* Floating HUD Navigation */}
      <NavigationHUD />

      {/* Dynamic Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col pt-20">
        {children}
      </main>
    </div>
  );
}
