'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MediaSvgBackground() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous Organic Morphing of the Fluid Gradient Blobs
      gsap.to('.blob-morph-1', {
        scaleX: 1.12,
        scaleY: 0.92,
        rotation: 8,
        transformOrigin: '50% 50%',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.blob-morph-2', {
        scaleX: 0.9,
        scaleY: 1.15,
        rotation: -10,
        transformOrigin: '50% 50%',
        duration: 6.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Dynamic Gradient Color Stops Cycling (SVGator Style)
      gsap.to('.grad-stop-1', {
        stopColor: '#2563EB',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.grad-stop-2', {
        stopColor: '#38BDF8',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.grad-stop-3', {
        stopColor: '#06B6D4',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Character 1 (Right Puller): Pulling motion with rhythmic tension
      gsap.to('.char-puller', {
        x: 15,
        rotation: -4,
        transformOrigin: 'bottom center',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to('.pull-tether', {
        attr: { x2: 1040, y2: 360 },
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // 4. Character 2 (Left Node Slider): Sliding the color node back and forth
      gsap.to('.char-slider', {
        x: 35,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      gsap.to('.slider-node', {
        cx: 485,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      // 5. Character 3 (Top Stylus Operator): Bobbing and projecting energy beam
      gsap.to('.char-operator', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.stylus-beam', {
        scaleY: 1.25,
        opacity: 0.9,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 6. Floating color particles and glow nodes
      gsap.to('.color-particle', {
        y: '-=40',
        x: '+=15',
        opacity: 'random(0.3, 0.9)',
        duration: 'random(3, 5)',
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 7. Interactive Cursor Parallax & Dynamic Gradient Shift
      const svg = svgRef.current;
      if (svg) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xRatio = clientX / innerWidth;
          const yRatio = clientY / innerHeight;

          // Parallax shift layers
          gsap.to('.parallax-gradient-core', {
            x: (xRatio - 0.5) * 40,
            y: (yRatio - 0.5) * 30,
            duration: 0.8,
            ease: 'power2.out',
          });

          gsap.to('.parallax-crew', {
            x: (xRatio - 0.5) * -25,
            y: (yRatio - 0.5) * -20,
            duration: 0.8,
            ease: 'power2.out',
          });

          // Shift gradient focal center based on mouse
          const fx = 40 + xRatio * 25;
          const fy = 40 + yRatio * 25;
          gsap.to('#mediaFluidRadial', {
            attr: { cx: `${fx}%`, cy: `${fy}%`, fx: `${fx}%`, fy: `${fy}%` },
            duration: 0.6,
            ease: 'power1.out',
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020C1B]"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 900"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Navy Sky Backdrop */}
          <linearGradient id="mediaBaseSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020C1B" />
            <stop offset="50%" stopColor="#061A3D" />
            <stop offset="100%" stopColor="#020C1B" />
          </linearGradient>

          {/* Master Liquid Fluid Gradient (Animated SVGator Stops) */}
          <radialGradient id="mediaFluidRadial" cx="50%" cy="50%" r="65%" fx="50%" fy="50%">
            <stop className="grad-stop-1" offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop className="grad-stop-2" offset="45%" stopColor="#2563EB" stopOpacity="0.75" />
            <stop className="grad-stop-3" offset="80%" stopColor="#1D4ED8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020C1B" stopOpacity="0" />
          </radialGradient>

          {/* Secondary Accent Gradient for Blob Layer 2 */}
          <linearGradient id="mediaFluidLinear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter for control nodes */}
          <filter id="cyanGlowNode" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Neon Handle Gradient */}
          <linearGradient id="neonHandle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* 1. Deep Space Midnight Canvas */}
        <rect width="1440" height="900" fill="url(#mediaBaseSky)" />

        {/* Ambient Grid Lines (Digital Creative Canvas Grid) */}
        <g opacity="0.12" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4,8">
          <line x1="0" y1="200" x2="1440" y2="200" />
          <line x1="0" y1="450" x2="1440" y2="450" />
          <line x1="0" y1="700" x2="1440" y2="700" />
          <line x1="360" y1="0" x2="360" y2="900" />
          <line x1="720" y1="0" x2="720" y2="900" />
          <line x1="1080" y1="0" x2="1080" y2="900" />
        </g>

        {/* 2. Central Morphing Fluid Gradient Canvas (Layer 1) */}
        <g className="parallax-gradient-core" transform="translate(0, 0)">
          
          {/* Main Giant Liquid Blob */}
          <path
            className="blob-morph-1"
            d="M 720 200 C 950 180, 1100 300, 1050 480 C 1000 660, 850 720, 680 700 C 500 680, 380 560, 420 380 C 460 220, 550 210, 720 200 Z"
            fill="url(#mediaFluidRadial)"
            filter="drop-shadow(0px 20px 60px rgba(37,99,235,0.4))"
          />

          {/* Secondary Organic Accent Fluid Shape */}
          <path
            className="blob-morph-2"
            d="M 700 240 C 900 220, 1020 340, 980 470 C 940 600, 820 650, 690 630 C 540 610, 450 510, 480 370 C 510 250, 580 250, 700 240 Z"
            fill="url(#mediaFluidLinear)"
            opacity="0.75"
          />

          {/* Bezier Tangent Construction Lines (SVGator UI Style) */}
          <g opacity="0.4" stroke="#38BDF8" strokeWidth="1.5">
            {/* Horizontal Control Spline */}
            <line x1="420" y1="380" x2="1050" y2="480" strokeDasharray="3,3" />
            <line x1="500" y1="580" x2="950" y2="280" strokeDasharray="3,3" />

            {/* Bezier Handles with End Circles */}
            <circle cx="420" cy="380" r="4" fill="#38BDF8" />
            <circle cx="1050" cy="480" r="4" fill="#38BDF8" />
            <circle cx="500" cy="580" r="4" fill="#2563EB" />
            <circle cx="950" cy="280" r="4" fill="#2563EB" />
          </g>

          {/* Main Gradient Bar Slider UI (Bottom Center of Blob) */}
          <g transform="translate(450, 620)">
            {/* Slider Track */}
            <rect x="0" y="0" width="540" height="8" rx="4" fill="#0A1E44" stroke="#38BDF8" strokeWidth="1.5" opacity="0.85" />
            
            {/* Gradient Fill Preview on Track */}
            <rect x="2" y="2" width="536" height="4" rx="2" fill="url(#neonHandle)" />

            {/* Stop Node 1 (Left) */}
            <circle cx="60" cy="4" r="9" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#cyanGlowNode)" />
            {/* Stop Node 2 (Mid-Left - Dynamic) */}
            <circle className="slider-node" cx="220" cy="4" r="11" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" filter="url(#cyanGlowNode)" />
            {/* Stop Node 3 (Right) */}
            <circle cx="460" cy="4" r="9" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#cyanGlowNode)" />
          </g>

        </g>

        {/* 3. The Creative Crew Characters (Actively Pulling & Manipulating the Gradient) */}
        <g className="parallax-crew">
          
          {/* ======================================================== */}
          {/* CHARACTER 1: The Puller (Right Side - Pulling Handle)     */}
          {/* ======================================================== */}
          <g className="char-puller" transform="translate(1080, 420)">
            {/* Floating Tech Platform */}
            <ellipse cx="60" cy="180" rx="70" ry="16" fill="#0A1E44" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
            <ellipse cx="60" cy="180" rx="40" ry="8" fill="#38BDF8" opacity="0.25" />

            {/* Pulling Figure Body */}
            {/* Shadow */}
            <ellipse cx="55" cy="175" rx="28" ry="7" fill="#020C1B" opacity="0.7" />

            {/* Legs (Leaning Back in Pulling Stance) */}
            <line x1="45" y1="120" x2="30" y2="175" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
            <line x1="65" y1="120" x2="85" y2="175" stroke="#0F172A" strokeWidth="9" strokeLinecap="round" />

            {/* Torso (Leaning Back) */}
            <path d="M 40 120 L 55 65 L 75 68 L 65 120 Z" fill="#2563EB" />
            
            {/* Head with Stylized Visor */}
            <circle cx="62" cy="45" r="16" fill="#0F172A" />
            <path d="M 52 44 Q 65 40 76 45" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

            {/* Arms Holding Tension Tether */}
            <line x1="55" y1="72" x2="-20" y2="90" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
            <line x1="65" y1="75" x2="-10" y2="98" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />

            {/* Glowing Hands / Grip */}
            <circle cx="-20" cy="90" r="6" fill="#38BDF8" filter="url(#cyanGlowNode)" />
          </g>

          {/* Glowing Tension Tether connecting Character 1 to Blob Handle */}
          <line
            className="pull-tether"
            x1="1060"
            y1="510"
            x2="1010"
            y2="420"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#cyanGlowNode)"
          />

          {/* ======================================================== */}
          {/* CHARACTER 2: The Node Slider (Left Side - Pushing Stop)  */}
          {/* ======================================================== */}
          <g className="char-slider" transform="translate(340, 560)">
            {/* Floating Tech Platform */}
            <ellipse cx="60" cy="140" rx="60" ry="14" fill="#0A1E44" stroke="#06B6D4" strokeWidth="1.5" opacity="0.8" />
            
            {/* Legs */}
            <line x1="50" y1="90" x2="40" y2="135" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            <line x1="68" y1="90" x2="78" y2="135" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />

            {/* Torso */}
            <path d="M 45 90 L 52 40 L 72 42 L 68 90 Z" fill="#0284C7" />

            {/* Head */}
            <circle cx="58" cy="24" r="14" fill="#0F172A" />
            <path d="M 52 24 Q 60 20 68 24" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />

            {/* Arms pushing forward onto the gradient track */}
            <line x1="56" y1="48" x2="110" y2="58" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
            <circle cx="110" cy="58" r="5" fill="#67E8F9" filter="url(#cyanGlowNode)" />
          </g>

          {/* ======================================================== */}
          {/* CHARACTER 3: The Stylus Operator (Top Center)            */}
          {/* ======================================================== */}
          <g className="char-operator" transform="translate(680, 80)">
            {/* Floating Digital Capsule */}
            <ellipse cx="40" cy="90" rx="45" ry="12" fill="#0A1E44" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
            
            {/* Sitting / Floating Character */}
            <circle cx="40" cy="30" r="15" fill="#0F172A" />
            <path d="M 32 30 Q 42 26 50 30" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            
            <path d="M 28 45 L 36 78 L 48 78 L 52 45 Z" fill="#1D4ED8" />

            {/* Arm holding stylus */}
            <line x1="45" y1="52" x2="40" y2="85" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            
            {/* Digital Stylus Device */}
            <line x1="40" y1="85" x2="40" y2="115" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="115" r="4" fill="#38BDF8" filter="url(#cyanGlowNode)" />

            {/* Stylus Energy Light Cone projecting onto the Gradient Blob */}
            <path
              className="stylus-beam"
              d="M 38 115 L 0 240 L 80 240 Z"
              fill="url(#mediaFluidRadial)"
              opacity="0.65"
              style={{ transformOrigin: '40px 115px' }}
            />
          </g>

          {/* ======================================================== */}
          {/* Floating Color Particles & Sparkles                      */}
          {/* ======================================================== */}
          <g>
            {[
              { cx: 300, cy: 300, r: 4, fill: '#38BDF8' },
              { cx: 480, cy: 210, r: 5, fill: '#60A5FA' },
              { cx: 880, cy: 190, r: 4, fill: '#67E8F9' },
              { cx: 1120, cy: 290, r: 6, fill: '#38BDF8' },
              { cx: 620, cy: 720, r: 5, fill: '#06B6D4' },
              { cx: 960, cy: 680, r: 4, fill: '#3B82F6' },
              { cx: 250, cy: 520, r: 3.5, fill: '#93C5FD' },
            ].map((pt, i) => (
              <circle
                key={i}
                className="color-particle"
                cx={pt.cx}
                cy={pt.cy}
                r={pt.r}
                fill={pt.fill}
                filter="url(#cyanGlowNode)"
                opacity="0.7"
              />
            ))}
          </g>

        </g>
      </svg>
    </div>
  );
}
