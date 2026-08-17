'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StorySvgBackground() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous train animation across the viaduct bridge
      gsap.to('.animated-train', {
        x: '1400',
        duration: 15,
        repeat: -1,
        ease: 'none',
      });

      // 2. Gentle swaying motion for stylized vector trees
      gsap.to('.sway-tree-left', {
        rotation: 2.5,
        transformOrigin: 'bottom center',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.sway-tree-right', {
        rotation: -3,
        transformOrigin: 'bottom center',
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // 3. Pulsing organic flowers & glowing node blossoms
      gsap.to('.flower-glow', {
        scale: 1.3,
        opacity: 1,
        duration: 2.0,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'power1.inOut',
        transformOrigin: 'center center',
      });

      // 4. Floating atmospheric light particles / cyan sparks
      gsap.to('.floating-spark', {
        y: '-=35',
        x: '+=15',
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: 'sine.inOut',
      });

      // 5. Mouse Parallax for layered depth
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const moveX = (e.clientX / innerWidth - 0.5) * 30;
        const moveY = (e.clientY / innerHeight - 0.5) * 15;

        gsap.to('.parallax-bg', { x: moveX * 0.2, y: moveY * 0.2, duration: 1.2, ease: 'power2.out' });
        gsap.to('.parallax-mid', { x: moveX * 0.5, y: moveY * 0.5, duration: 1.0, ease: 'power2.out' });
        gsap.to('.parallax-fore', { x: moveX * 0.9, y: moveY * 0.9, duration: 0.8, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={svgRef} className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none bg-[#020C1B]">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brand Theme Sky Gradient (Electric Sapphire -> Ice Blue -> Midnight Navy) */}
          <linearGradient id="brandSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />    {/* Deep Royal Blue */}
            <stop offset="25%" stopColor="#1D4ED8" />   {/* Electric Sapphire */}
            <stop offset="50%" stopColor="#0284C7" />   {/* Ice Sky Blue */}
            <stop offset="75%" stopColor="#075985" />   {/* Ocean Deep */}
            <stop offset="100%" stopColor="#020C1B" />  {/* Deep Midnight Navy */}
          </linearGradient>

          {/* Far Hills Gradient */}
          <linearGradient id="hillFarBrand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Mid Hills Gradient */}
          <linearGradient id="hillMidBrand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Bridge & Viaduct Gradient */}
          <linearGradient id="bridgeBrand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Foreground Deep Hills Gradient */}
          <linearGradient id="hillForeBrand1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#020C1B" />
          </linearGradient>

          <linearGradient id="hillForeBrand2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="100%" stopColor="#020C1B" />
          </linearGradient>

          {/* Tree Leaf Gradient */}
          <linearGradient id="treeBrand1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="treeBrand2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#020C1B" />
          </linearGradient>

          {/* Glowing Blossom Radial */}
          <radialGradient id="cyanBlossomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020C1B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Sky Base with Brand Navy/Sapphire Gradient */}
        <rect width="1440" height="900" fill="url(#brandSkyGrad)" opacity="0.95" />

        {/* Ambient Cyan & Sapphire Sparks / Fireflies */}
        <g className="floating-sparks" opacity="0.75">
          <circle className="floating-spark" cx="220" cy="160" r="3" fill="#38BDF8" />
          <circle className="floating-spark" cx="380" cy="110" r="2" fill="#67E8F9" />
          <circle className="floating-spark" cx="740" cy="140" r="3.5" fill="#38BDF8" />
          <circle className="floating-spark" cx="910" cy="95" r="2.5" fill="#93C5FD" />
          <circle className="floating-spark" cx="1140" cy="170" r="3" fill="#38BDF8" />
          <circle className="floating-spark" cx="1290" cy="120" r="2" fill="#67E8F9" />
        </g>

        {/* 2. Parallax Far Mountain Ridges (Layer 1) */}
        <g className="parallax-bg">
          {/* Distant Ridge 1 */}
          <path
            d="M-50 420 Q 240 280 500 360 T 1100 310 Q 1300 270 1500 380 L 1500 900 L -50 900 Z"
            fill="url(#hillFarBrand)"
            opacity="0.8"
          />
          {/* Distant Ridge 2 */}
          <path
            d="M-50 460 Q 350 330 750 420 T 1500 390 L 1500 900 L -50 900 Z"
            fill="url(#hillMidBrand)"
            opacity="0.75"
          />
          {/* Stylized Mountain Pine Trees */}
          <polygon points="1200,310 1215,350 1185,350" fill="#0369A1" />
          <polygon points="1215,300 1230,345 1200,345" fill="#0284C7" />
          <polygon points="1240,320 1255,360 1225,360" fill="#0369A1" />
          <polygon points="260,330 275,370 245,370" fill="#0369A1" />
          <polygon points="285,320 300,365 270,365" fill="#0284C7" />
        </g>

        {/* 3. Viaduct Bridge with Animated Futuristic Train (Layer 2) */}
        <g className="parallax-mid">
          {/* Viaduct Arch Bridge */}
          <g opacity="0.95">
            {/* Bridge Deck */}
            <rect x="-100" y="440" width="1640" height="24" rx="4" fill="url(#bridgeBrand)" />
            <rect x="-100" y="442" width="1640" height="2" fill="#38BDF8" opacity="0.7" />

            {/* Bridge Arches */}
            {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((x, i) => (
              <g key={i} transform={`translate(${x - 40}, 464)`}>
                <rect x="0" y="0" width="18" height="90" fill="#0F172A" />
                <path d="M 18 0 Q 75 0 75 70 L 75 90 L 18 90 Z" fill="#1E293B" opacity="0.85" />
                <path d="M 75 70 Q 75 0 132 0 L 132 90 L 75 90 Z" fill="#0F172A" opacity="0.9" />
                <rect x="132" y="0" width="18" height="90" fill="#0F172A" />
              </g>
            ))}
          </g>

          {/* Animated Train Gliding along the Bridge */}
          <g className="animated-train" transform="translate(-400, 418)">
            {/* Train Engine Body */}
            <path d="M 280 18 Q 320 18 335 22 L 345 28 L 345 38 L 0 38 L 0 18 Z" fill="#FFFFFF" />
            <path d="M 285 22 Q 320 22 332 25 L 332 30 L 285 30 Z" fill="#0284C7" opacity="0.9" />
            <rect x="0" y="24" width="270" height="8" fill="#2563EB" />
            {/* Illuminated Windows */}
            {[20, 50, 80, 110, 140, 170, 200, 230].map((wx, idx) => (
              <rect key={idx} x={wx} y="22" width="20" height="7" rx="2" fill="#38BDF8" opacity="0.9" />
            ))}
            {/* Cyan Headlight Beam */}
            <polygon points="345,26 450,18 450,38 345,32" fill="#38BDF8" opacity="0.5" />
          </g>
        </g>

        {/* 4. Midground Rolling Hills (Layer 3) */}
        <g className="parallax-mid">
          <path
            d="M-50 510 Q 220 420 540 480 T 1150 460 Q 1350 440 1500 520 L 1500 900 L -50 900 Z"
            fill="url(#hillForeBrand1)"
          />
        </g>

        {/* 5. Foreground Rolling Hills with Stylized Trees & Glowing Flora (Layer 4) */}
        <g className="parallax-fore">
          {/* Main Foreground Rolling Hill Wave Sweep */}
          <path
            d="M-50 620 Q 220 520 540 630 T 1150 590 Q 1350 560 1500 650 L 1500 1200 L -50 1200 Z"
            fill="url(#hillForeBrand1)"
          />
          <path
            d="M-50 670 Q 280 560 660 670 T 1280 630 Q 1420 600 1500 700 L 1500 1200 L -50 1200 Z"
            fill="url(#hillForeBrand2)"
          />

          {/* Left Stylized Tree */}
          <g className="sway-tree-left" transform="translate(180, 640)">
            <line x1="0" y1="0" x2="0" y2="-180" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />
            <line x1="0" y1="-70" x2="-35" y2="-110" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <line x1="0" y1="-90" x2="35" y2="-130" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="0" cy="-190" rx="65" ry="95" fill="url(#treeBrand1)" />
            <ellipse cx="-40" cy="-140" rx="45" ry="65" fill="url(#treeBrand2)" opacity="0.85" />
            <ellipse cx="45" cy="-160" rx="40" ry="60" fill="url(#treeBrand1)" opacity="0.9" />
          </g>

          {/* Right Stylized Tree */}
          <g className="sway-tree-right" transform="translate(1260, 620)">
            <line x1="0" y1="0" x2="0" y2="-200" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />
            <line x1="0" y1="-80" x2="40" y2="-125" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <line x1="0" y1="-110" x2="-35" y2="-150" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="0" cy="-210" rx="70" ry="105" fill="url(#treeBrand2)" />
            <ellipse cx="50" cy="-160" rx="48" ry="70" fill="url(#treeBrand1)" opacity="0.85" />
            <ellipse cx="-45" cy="-175" rx="42" ry="65" fill="url(#treeBrand2)" opacity="0.9" />
          </g>

          {/* Glowing Ice-Blue & Sapphire Flora blooming along the organic curve */}
          {[
            { cx: 120, cy: 690, color: '#38BDF8' },
            { cx: 160, cy: 670, color: '#0EA5E9' },
            { cx: 200, cy: 695, color: '#60A5FA' },
            { cx: 380, cy: 720, color: '#38BDF8' },
            { cx: 420, cy: 700, color: '#2563EB' },
            { cx: 460, cy: 715, color: '#67E8F9' },
            { cx: 980, cy: 710, color: '#38BDF8' },
            { cx: 1020, cy: 690, color: '#0EA5E9' },
            { cx: 1060, cy: 705, color: '#60A5FA' },
            { cx: 1320, cy: 680, color: '#2563EB' },
            { cx: 1360, cy: 670, color: '#38BDF8' },
          ].map((flower, idx) => (
            <g key={idx} transform={`translate(${flower.cx}, ${flower.cy})`}>
              <line x1="0" y1="0" x2="0" y2="-35" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
              <path d="M -8 -35 Q -12 -50 -6 -52 Q 0 -42 0 -35 Q 0 -42 6 -52 Q 12 -50 8 -35 Z" fill={flower.color} />
              <circle className="flower-glow" cx="0" cy="-45" r="5" fill="url(#cyanBlossomGlow)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
