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
      gsap.set('.navra-text-layer', { scale: 0.85, y: 35, opacity: 0 });
      gsap.set('.laser-beam', { scaleX: 0, opacity: 0 });
      gsap.set('.shimmer-flare', { xPercent: -150, opacity: 0 });

      // 2. SVGator Choreographed Animation Timeline
      tl
        // Phase 1: Electric Sapphire Aura Burst
        .to('.logo-glow-aura', {
          scale: 1.25,
          opacity: 0.75,
          duration: 1.2,
          ease: 'power2.out',
        })

        // Phase 2: The Three Figures drop in with elastic bounce
        .to('.three-man-layer', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'elastic.out(1.1, 0.45)',
        }, '-=0.9')

        // Phase 3: Laser Beam Flash across the baseline
        .to('.laser-beam', {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }, '-=0.4')
        .to('.laser-beam', {
          opacity: 0,
          duration: 0.5,
        })

        // Phase 4: The NAVRA Text rises up into crisp lockup
        .to('.navra-text-layer', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'back.out(1.5)',
        }, '-=0.7')

        // Phase 5: Liquid metallic light shimmer traverses across the text
        .to('.shimmer-flare', {
          xPercent: 180,
          opacity: 0.9,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=0.5')
        .to('.shimmer-flare', {
          opacity: 0,
          duration: 0.3,
        })

        // Phase 6: Settle glow to subtle ambient breathing pulse
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
            rotationY: x * 16,
            rotationX: -y * 16,
            transformPerspective: 900,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Subtle parallax layer separation between text and background figures
          gsap.to('.three-man-layer', {
            x: -x * 12,
            y: -y * 8,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to('.navra-text-layer', {
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
          gsap.to('.navra-text-layer', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
        };

        const handleMouseEnter = () => {
          gsap.to('.navra-text-layer', {
            scale: 1.04,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to('.logo-glow-aura', {
            scale: 1.2,
            opacity: 0.65,
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
        <div className="relative w-72 sm:w-84 md:w-96 aspect-[16/11] flex items-center justify-center">
          
          {/* Layer 1: The Three Men in the Back (Authentic clean layer) */}
          <div className="three-man-layer absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/three_man.png"
              alt="Three Figures"
              className="w-[82%] h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(2,12,27,0.75)]"
            />
          </div>

          {/* Laser Accent Beam Flash */}
          <div className="laser-beam absolute inset-x-4 top-[58%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-25 blur-[1px]" />

          {/* Layer 2: The NAVRA Text in Front (Authentic clean layer with Shimmer Flare) */}
          <div className="navra-text-layer absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
            <img
              src="/navra_text.png"
              alt="NAVRA Studio Text"
              className="w-full h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
            />

            {/* Shimmer Light Flare Glint traversing across the text */}
            <div
              className="shimmer-flare absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
