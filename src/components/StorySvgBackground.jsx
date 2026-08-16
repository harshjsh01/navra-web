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
        duration: 16,
        repeat: -1,
        ease: 'none',
      });

      // 2. Gentle swaying motion for stylized vector trees
      gsap.to('.sway-tree-left', {
        rotation: 3,
        transformOrigin: 'bottom center',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.sway-tree-right', {
        rotation: -4,
        transformOrigin: 'bottom center',
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // 3. Pulsing organic flowers & glowing node blossoms
      gsap.to('.flower-glow', {
        scale: 1.25,
        opacity: 1,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'power1.inOut',
        transformOrigin: 'center center',
      });

      // 4. Floating atmospheric light particles / embers
      gsap.to('.floating-ember', {
        y: '-=40',
        x: '+=20',
        opacity: 0.8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
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
    <div ref={svgRef} className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none bg-[#0B032D]">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Twilight Sunset Gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />    {/* Warm Golden Amber */}
            <stop offset="25%" stopColor="#F43F5E" />   {/* Rose Pink */}
            <stop offset="55%" stopColor="#8B5CF6" />   {/* Violet */}
            <stop offset="85%" stopColor="#2E1065" />   {/* Deep Indigo */}
            <stop offset="100%" stopColor="#0B032D" />  {/* Midnight Navy */}
          </linearGradient>

          {/* Far Hills Gradient */}
          <linearGradient id="hillFarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>

          {/* Mid Hills Gradient */}
          <linearGradient id="hillMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Bridge & Viaduct Gradient */}
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Foreground Deep Hills Gradient */}
          <linearGradient id="hillForeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="100%" stopColor="#0F0728" />
          </linearGradient>

          <linearGradient id="hillForeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B0764" />
            <stop offset="100%" stopColor="#030014" />
          </linearGradient>

          {/* Tree Leaf Gradient */}
          <linearGradient id="treeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#3B0764" />
          </linearGradient>
          <linearGradient id="treeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* Glowing Blossom Radial */}
          <radialGradient id="blossomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
            <stop offset="60%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Sky Base with Twilight Gradient */}
        <rect width="1440" height="900" fill="url(#skyGrad)" opacity="0.9" />

        {/* Ambient Floating Embers / Fireflies in the Sky */}
        <g className="floating-embers" opacity="0.6">
          <circle className="floating-ember" cx="200" cy="180" r="3" fill="#FDE047" />
          <circle className="floating-ember" cx="350" cy="120" r="2" fill="#F472B6" />
          <circle className="floating-ember" cx="720" cy="160" r="4" fill="#FDE047" />
          <circle className="floating-ember" cx="890" cy="110" r="2.5" fill="#67E8F9" />
          <circle className="floating-ember" cx="1120" cy="190" r="3" fill="#FDE047" />
          <circle className="floating-ember" cx="1280" cy="140" r="2" fill="#F472B6" />
        </g>

        {/* 2. Parallax Far Mountain Ridges (Layer 1) */}
        <g className="parallax-bg">
          {/* Distant Ridge 1 */}
          <path
            d="M-50 420 Q 240 280 500 360 T 1100 310 Q 1300 270 1500 380 L 1500 900 L -50 900 Z"
            fill="url(#hillFarGrad)"
            opacity="0.8"
          />
          {/* Distant Ridge 2 */}
          <path
            d="M-50 460 Q 350 330 750 420 T 1500 390 L 1500 900 L -50 900 Z"
            fill="url(#hillMidGrad)"
            opacity="0.75"
          />
          {/* Stylized Mountain Pine Trees on the ridge */}
          <polygon points="1200,310 1215,350 1185,350" fill="#7E22CE" />
          <polygon points="1215,300 1230,345 1200,345" fill="#6B21A8" />
          <polygon points="1240,320 1255,360 1225,360" fill="#7E22CE" />
          <polygon points="260,330 275,370 245,370" fill="#9333EA" />
          <polygon points="285,320 300,365 270,365" fill="#7E22CE" />
        </g>

        {/* 3. Viaduct Bridge with Animated Futuristic High-Speed Train (Layer 2) */}
        <g className="parallax-mid">
          {/* Viaduct Arch Bridge */}
          <g opacity="0.95">
            {/* Bridge Deck */}
            <rect x="-100" y="440" width="1640" height="24" rx="4" fill="url(#bridgeGrad)" />
            <rect x="-100" y="442" width="1640" height="2" fill="#E879F9" opacity="0.6" />

            {/* Bridge Arches */}
            {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((x, i) => (
              <g key={i} transform={`translate(${x - 40}, 464)`}>
                <rect x="0" y="0" width="18" height="90" fill="#2E1065" />
                <path d="M 18 0 Q 75 0 75 70 L 75 90 L 18 90 Z" fill="#3B0764" opacity="0.85" />
                <path d="M 75 70 Q 75 0 132 0 L 132 90 L 75 90 Z" fill="#2E1065" opacity="0.9" />
                <rect x="132" y="0" width="18" height="90" fill="#2E1065" />
              </g>
            ))}
          </g>

          {/* Animated Train Gliding along the Bridge */}
          <g className="animated-train" transform="translate(-400, 418)">
            {/* Train Engine Head */}
            <path d="M 280 18 Q 320 18 335 22 L 345 28 L 345 38 L 0 38 L 0 18 Z" fill="#FFFFFF" />
            <path d="M 285 22 Q 320 22 332 25 L 332 30 L 285 30 Z" fill="#0EA5E9" opacity="0.9" />
            <rect x="0" y="24" width="270" height="8" fill="#F43F5E" />
            {/* Windows */}
            {[20, 50, 80, 110, 140, 170, 200, 230].map((wx, idx) => (
              <rect key={idx} x={wx} y="22" width="20" height="7" rx="2" fill="#38BDF8" opacity="0.9" />
            ))}
            {/* Glow Headlight Beam */}
            <polygon points="345,26 440,20 440,36 345,32" fill="#FDE047" opacity="0.4" />
          </g>
        </g>

        {/* 4. Midground Rolling Hills with Organic Curves (Layer 3) */}
        <g className="parallax-mid">
          <path
            d="M-50 510 Q 220 420 540 480 T 1150 460 Q 1350 440 1500 520 L 1500 900 L -50 900 Z"
            fill="url(#hillForeGrad1)"
          />
        </g>

        {/* 5. Foreground Rolling Hills with Stylized Trees & Glowing Flora (Layer 4) */}
        <g className="parallax-fore">
          {/* Main Foreground Hill Sweep */}
          <path
            d="M-50 580 Q 280 480 620 580 T 1250 560 Q 1400 540 1500 640 L 1500 900 L -50 900 Z"
            fill="url(#hillForeGrad2)"
          />

          {/* Left Stylized Botanical Tree Group */}
          <g className="sway-tree-left" transform="translate(180, 600)">
            {/* Trunk */}
            <line x1="0" y1="0" x2="0" y2="-180" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" />
            <line x1="0" y1="-70" x2="-35" y2="-110" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
            <line x1="0" y1="-90" x2="35" y2="-130" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
            {/* Main Oval Foliage */}
            <ellipse cx="0" cy="-190" rx="65" ry="95" fill="url(#treeGrad1)" />
            <ellipse cx="-40" cy="-140" rx="45" ry="65" fill="url(#treeGrad2)" opacity="0.85" />
            <ellipse cx="45" cy="-160" rx="40" ry="60" fill="url(#treeGrad1)" opacity="0.9" />
          </g>

          {/* Right Stylized Botanical Tree Group */}
          <g className="sway-tree-right" transform="translate(1260, 580)">
            {/* Trunk */}
            <line x1="0" y1="0" x2="0" y2="-200" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" />
            <line x1="0" y1="-80" x2="40" y2="-125" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
            <line x1="0" y1="-110" x2="-35" y2="-150" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
            {/* Oval Foliage */}
            <ellipse cx="0" cy="-210" rx="70" ry="105" fill="url(#treeGrad2)" />
            <ellipse cx="50" cy="-160" rx="48" ry="70" fill="url(#treeGrad1)" opacity="0.85" />
            <ellipse cx="-45" cy="-175" rx="42" ry="65" fill="url(#treeGrad2)" opacity="0.9" />
          </g>

          {/* Glowing Sprouting Flowers / Tulip Nodes across the foreground */}
          {[
            { cx: 120, cy: 640, color: '#FB7185' },
            { cx: 160, cy: 625, color: '#F43F5E' },
            { cx: 200, cy: 650, color: '#FDE047' },
            { cx: 380, cy: 680, color: '#FB7185' },
            { cx: 420, cy: 660, color: '#F97316' },
            { cx: 460, cy: 675, color: '#FDE047' },
            { cx: 980, cy: 670, color: '#FB7185' },
            { cx: 1020, cy: 650, color: '#F43F5E' },
            { cx: 1060, cy: 665, color: '#FDE047' },
            { cx: 1320, cy: 640, color: '#F97316' },
            { cx: 1360, cy: 630, color: '#FB7185' },
          ].map((flower, idx) => (
            <g key={idx} transform={`translate(${flower.cx}, ${flower.cy})`}>
              {/* Stem */}
              <line x1="0" y1="0" x2="0" y2="-35" stroke="#2E1065" strokeWidth="3" strokeLinecap="round" />
              {/* Tulip Cup Petals */}
              <path d="M -8 -35 Q -12 -50 -6 -52 Q 0 -42 0 -35 Q 0 -42 6 -52 Q 12 -50 8 -35 Z" fill={flower.color} />
              {/* Glowing Center Bulb */}
              <circle className="flower-glow" cx="0" cy="-45" r="5" fill="url(#blossomGlow)" />
            </g>
          ))}

          {/* Deep Navy/Black Bottom Vignette Base to guarantee 100% legibility */}
          <rect x="0" y="650" width="1440" height="250" fill="url(#hillForeGrad2)" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}
