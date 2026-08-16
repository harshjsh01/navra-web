'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial State
      gsap.set('.logo-glow-aura', { scale: 0.6, opacity: 0 });
      gsap.set('.three-man-layer', { scale: 0.75, y: -40, opacity: 0 });
      gsap.set('.navra-text-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.laser-tracer', { xPercent: -150, opacity: 0 });
      gsap.set('.shimmer-flare', { xPercent: -180, opacity: 0 });

      // 2. SVGator Choreographed Animation Sequence
      tl
        // Phase 1: Electric Sapphire Aura Burst
        .to('.logo-glow-aura', {
          scale: 1.25,
          opacity: 0.75,
          duration: 1.2,
          ease: 'power2.out',
        })

        // Phase 2: The Three Figures drop in with elastic spring bounce
        .to('.three-man-layer', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'elastic.out(1.15, 0.45)',
        }, '-=0.9')

        // Phase 3: "NAVRA text" Progressive Left-to-Right Laser Sweep & Reveal
        .to('.laser-tracer', {
          opacity: 1,
          duration: 0.2,
        }, '-=0.4')
        .to('.navra-text-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
        }, '-=0.3')
        .to('.laser-tracer', {
          xPercent: 240,
          duration: 1.4,
          ease: 'power2.inOut',
        }, '<')
        .to('.laser-tracer', {
          opacity: 0,
          duration: 0.3,
        })

        // Phase 4: Liquid metallic shimmer flare sweeps across the letters
        .to('.shimmer-flare', {
          xPercent: 220,
          opacity: 0.85,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=0.6')
        .to('.shimmer-flare', {
          opacity: 0,
          duration: 0.3,
        })

        // Phase 5: Settle glow to subtle ambient breathing pulse
        .to('.logo-glow-aura', {
          scale: 1.0,
          opacity: 0.45,
          duration: 0.8,
        });

      // 3. Interactive 3D Parallax & Hover Dynamics
      const stage = stageRef.current;
      if (stage) {
        const handleMouseMove = (e) => {
          const rect = stage.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(stage, {
            rotationY: x * 15,
            rotationX: -y * 15,
            transformPerspective: 900,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Parallax layer depth separation
          gsap.to('.three-man-layer', {
            x: -x * 14,
            y: -y * 10,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to('.navra-text-wrap', {
            x: x * 8,
            y: y * 6,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(stage, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
          gsap.to('.three-man-layer', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
          gsap.to('.navra-text-wrap', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
        };

        const handleMouseEnter = () => {
          gsap.to('.logo-glow-aura', {
            scale: 1.25,
            opacity: 0.7,
            duration: 0.3,
          });
        };

        stage.addEventListener('mousemove', handleMouseMove);
        stage.addEventListener('mouseleave', handleMouseLeave);
        stage.addEventListener('mouseenter', handleMouseEnter);

        return () => {
          stage.removeEventListener('mousemove', handleMouseMove);
          stage.removeEventListener('mouseleave', handleMouseLeave);
          stage.removeEventListener('mouseenter', handleMouseEnter);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-xl mx-auto py-2">
      {/* 3D Interactive Stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Multi-Layered Electric Sapphire Aura */}
        <div
          className="logo-glow-aura absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-sky-300/15 blur-3xl pointer-events-none -z-10"
        />

        {/* Master Logo Lockup Container */}
        <div className="relative w-72 sm:w-84 md:w-96 aspect-[16/10] flex items-center justify-center">
          
          {/* Layer 1: The Three Men in the Back (Authentic clean layer) */}
          <div className="three-man-layer absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/three_man.png"
              alt="Three Figures"
              className="w-[84%] h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(2,12,27,0.8)]"
            />
          </div>

          {/* Layer 2: The Official NAVRA text.png in Front (NAVRA + studio together) */}
          <div className="navra-text-wrap absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <img
              src="/navra_text.png"
              alt="NAVRA Studio"
              className="w-full h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
            />

            {/* Shimmer Light Flare Glint traversing across the text */}
            <div
              className="shimmer-flare absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
            />
          </div>

          {/* Laser Accent Beam Tracer */}
          <div className="laser-tracer absolute inset-x-0 bottom-[32%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-30 blur-[1px]" />

        </div>
      </div>
    </div>
  );
}
