'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Draw the silhouette strokes
      tl.to('.silhouette-path', {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: 0.1,
      })
      // Fill the silhouettes and drop shadow
      .to('.silhouette-path', {
        fill: '#080B1E', // Very dark navy
        strokeOpacity: 0,
        duration: 0.8,
        filter: 'drop-shadow(0px 0px 15px rgba(37, 99, 235, 0.3))',
        ease: 'power2.out',
      }, "-=0.5")
      // Draw NAVRA
      .to('.navra-outline', {
        strokeDashoffset: 0,
        duration: 1.8,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, "-=0.5")
      // Fill NAVRA
      .to('.navra-outline', {
        fill: '#F8FAFC',
        strokeOpacity: 0,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.8")
      // Draw studio
      .to('.studio-outline', {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      }, "-=1.0")
      // Fill studio
      .to('.studio-outline', {
        fill: '#E0E7FF',
        strokeOpacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-lg mx-auto p-4 aspect-video">
      <svg
        viewBox="0 0 500 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-2xl"
      >
        {/* Silhouette Figures Background */}
        <g transform="translate(0, -20)">
           {/* Center Figure */}
           <circle className="silhouette-path" cx="250" cy="110" r="28" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
           <path className="silhouette-path" d="M 210 160 Q 250 140 290 160 L 310 260 L 190 260 Z" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" />
           
           {/* Left Figure */}
           <circle className="silhouette-path" cx="170" cy="125" r="24" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
           <path className="silhouette-path" d="M 100 170 Q 150 150 200 170 L 220 260 L 80 260 Z" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" />
           
           {/* Right Figure */}
           <circle className="silhouette-path" cx="330" cy="125" r="24" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
           <path className="silhouette-path" d="M 300 170 Q 350 150 400 170 L 420 260 L 280 260 Z" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" />
        </g>

        {/* Text with GSAP Animation on Stroke */}
        <g transform="translate(100, 195)">
           <text 
             className="navra-outline font-rye" 
             x="0" 
             y="0" 
             fontSize="85" 
             fontWeight="400"
             letterSpacing="-1"
             fill="none" 
             stroke="#F8FAFC" 
             strokeWidth="1.5" 
             strokeDasharray="800" 
             strokeDashoffset="800"
           >
             NAVRA
           </text>
        </g>
        
        <g transform="translate(195, 240)">
           <text 
             className="studio-outline font-great-vibes" 
             x="0" 
             y="0" 
             fontSize="55" 
             fill="none" 
             stroke="#93C5FD" 
             strokeWidth="1.5" 
             strokeDasharray="500" 
             strokeDashoffset="500"
           >
             studio
           </text>
        </g>
      </svg>
    </div>
  );
}
