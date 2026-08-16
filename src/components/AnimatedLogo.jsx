'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Draw strokes of the serif text "NAVRA"
      tl.to('.navra-text path', {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power3.inOut',
      })
      // 2. Fill the serif text
      .to('.navra-text path', {
        fillOpacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.5")
      // 3. Draw cursive "studio"
      .to('.studio-text path', {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.inOut',
      }, "-=1.0")
      // 4. Fill cursive "studio"
      .to('.studio-text path', {
        fillOpacity: 1,
        duration: 0.8,
        ease: 'power1.out',
      }, "-=0.5")
      // 5. Fade in the background silhouette figures with a sapphire drop-shadow
      .to('.silhouette-group', {
        opacity: 0.15,
        filter: 'drop-shadow(0px 0px 20px #2563EB)',
        duration: 2,
        ease: 'power2.out',
      }, "-=1.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-lg mx-auto p-8 aspect-video">
      <svg
        viewBox="0 0 500 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="sapphire-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The 3 Silhouette Figures */}
        <g className="silhouette-group opacity-0">
          <circle cx="250" cy="150" r="100" fill="url(#sapphire-glow)" />
          {/* Center Figure */}
          <circle cx="250" cy="90" r="20" fill="#F8FAFC" />
          <path d="M 220 140 Q 250 110 280 140 L 280 260 L 220 260 Z" fill="#F8FAFC" />
          {/* Left Figure */}
          <circle cx="180" cy="100" r="18" fill="#F8FAFC" />
          <path d="M 150 150 Q 180 120 210 150 L 210 260 L 150 260 Z" fill="#F8FAFC" />
          {/* Right Figure */}
          <circle cx="320" cy="100" r="18" fill="#F8FAFC" />
          <path d="M 290 150 Q 320 120 350 150 L 350 260 L 290 260 Z" fill="#F8FAFC" />
        </g>

        {/* NAVRA Serif Text */}
        <g className="navra-text" transform="translate(100, 190) scale(3)">
          {/* Simplified SVG paths representing NAVRA in a serif-style font */}
          {/* Letter N */}
          <path
            d="M 5 0 L 15 0 L 30 20 L 30 0 L 40 0 L 40 30 L 30 30 L 15 10 L 15 30 L 5 30 Z"
            fill="#F8FAFC"
            fillOpacity="0"
            stroke="#F8FAFC"
            strokeWidth="0.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Letter A */}
          <path
            d="M 45 30 L 55 0 L 65 0 L 75 30 L 65 30 L 62 20 L 52 20 L 49 30 Z M 55 12 L 59 12 L 57 5 Z"
            fill="#F8FAFC"
            fillOpacity="0"
            stroke="#F8FAFC"
            strokeWidth="0.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Letter V */}
          <path
            d="M 80 0 L 90 0 L 100 25 L 110 0 L 120 0 L 105 35 L 95 35 Z"
            fill="#F8FAFC"
            fillOpacity="0"
            stroke="#F8FAFC"
            strokeWidth="0.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Letter R */}
          <path
            d="M 125 0 L 145 0 Q 155 0 155 10 Q 155 18 145 20 L 155 30 L 145 30 L 138 20 L 135 20 L 135 30 L 125 30 Z M 135 12 L 142 12 Q 145 12 145 7 Q 145 2 142 2 L 135 2 Z"
            fill="#F8FAFC"
            fillOpacity="0"
            stroke="#F8FAFC"
            strokeWidth="0.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Letter A */}
          <path
            d="M 160 30 L 170 0 L 180 0 L 190 30 L 180 30 L 177 20 L 167 20 L 164 30 Z M 170 12 L 174 12 L 172 5 Z"
            fill="#F8FAFC"
            fillOpacity="0"
            stroke="#F8FAFC"
            strokeWidth="0.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </g>

        {/* studio cursive script */}
        <g className="studio-text" transform="translate(230, 230) scale(1.5)">
          <path
            d="M 0 0 C 10 -5 15 5 20 0 C 25 -10 30 5 35 -5 C 40 5 45 -5 50 0 C 55 5 60 -5 65 0 C 70 5 75 -5 80 0"
            fill="none"
            stroke="#00F5FF"
            strokeWidth="2"
            strokeDasharray="150"
            strokeDashoffset="150"
            strokeLinecap="round"
          />
          <text x="5" y="0" fontFamily="cursive" fontSize="24" fill="#0EA5E9" fillOpacity="0">studio</text>
        </g>
      </svg>
    </div>
  );
}
