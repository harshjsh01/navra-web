'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial State for all layers
      gsap.set('.logo-glow-aura', { scale: 0.6, opacity: 0 });
      gsap.set('.three-man-layer', { scale: 0.8, y: -45, opacity: 0 });
      gsap.set('.navra-word-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.studio-script-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.laser-tracer', { xPercent: -150, opacity: 0 });
      gsap.set('.pen-spark', { left: '15%', opacity: 0 });

      // 2. SVGator Choreographed Animation Timeline
      tl
        // Phase 1: Electric Sapphire Aura Burst
        .to('.logo-glow-aura', {
          scale: 1.3,
          opacity: 0.8,
          duration: 1.2,
          ease: 'power2.out',
        })

        // Phase 2: The Three Figures drop in with elastic spring bounce
        .to('.three-man-layer', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'elastic.out(1.15, 0.45)',
        }, '-=0.9')

        // Phase 3: "NAVRA" Progressive Left-to-Right Laser Reveal
        .to('.laser-tracer', {
          opacity: 1,
          duration: 0.2,
        }, '-=0.4')
        .to('.navra-word-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.3,
          ease: 'power2.inOut',
        }, '-=0.3')
        .to('.laser-tracer', {
          xPercent: 250,
          duration: 1.3,
          ease: 'power2.inOut',
        }, '<')
        .to('.laser-tracer', {
          opacity: 0,
          duration: 0.3,
        })

        // Phase 4: "studio" Progressive Cursive Pen-Trace with glowing spark
        .to('.pen-spark', {
          opacity: 1,
          duration: 0.2,
        }, '-=0.4')
        .to('.studio-script-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power1.inOut',
        }, '-=0.2')
        .to('.pen-spark', {
          left: '85%',
          duration: 1.2,
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
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

          // Subtle parallax layer depth separation between text and background figures
          gsap.to('.three-man-layer', {
            x: -x * 14,
            y: -y * 10,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to('.navra-word-wrap, .studio-script-wrap', {
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
          gsap.to('.navra-word-wrap, .studio-script-wrap', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
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
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-3xl mx-auto py-2">
      {/* 3D Interactive Stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Multi-Layered Electric Sapphire Aura */}
        <div
          className="logo-glow-aura absolute -inset-14 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-sky-300/15 blur-3xl pointer-events-none -z-10"
        />

        {/* Increased Size Master Logo Lockup Container */}
        <div className="relative w-84 sm:w-[460px] md:w-[540px] lg:w-[600px] aspect-[16/10] flex items-center justify-center">
          
          {/* Layer 1: The Three Men in the Back (Authentic source layer) */}
          <div className="three-man-layer absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/three_man.png"
              alt="Three Figures"
              className="w-[84%] h-auto object-contain filter drop-shadow-[0_10px_24px_rgba(2,12,27,0.8)]"
            />
          </div>

          {/* Layer 2: The NAVRA Serif Wordmark with Left-to-Right Laser Sweep */}
          <div className="navra-word-wrap absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <img
              src="/navra_word_only.png"
              alt="NAVRA"
              className="w-full h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
            />

            {/* Laser Flare Streak traversing across the letters */}
            <div
              className="laser-tracer absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
            />
          </div>

          {/* Layer 3: The Cursive "studio" Wordmark with Pen Trace Reveal */}
          <div className="studio-script-wrap absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
            <img
              src="/studio_script_only.png"
              alt="studio"
              className="w-full h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(56,189,248,0.7)]"
            />
          </div>

          {/* Pen Tracer Glow Spark for "studio" */}
          <div className="pen-spark absolute bottom-[18%] w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8] pointer-events-none z-40" />

        </div>
      </div>
    </div>
  );
}
