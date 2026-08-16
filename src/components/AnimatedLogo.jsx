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
      gsap.set('.three-man-layer', { scale: 0.8, y: -35, opacity: 0 });
      
      // Mask boxes for each letter (N, A, V, R, A)
      gsap.set('.mask-letter-n', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.mask-letter-a1', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.mask-letter-v', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.mask-letter-r', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.mask-letter-a2', { scale: 0, transformOrigin: 'center center' });
      
      // Studio cursive mask and pen spark
      gsap.set('.mask-studio', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.pen-spark', { left: '26%', opacity: 0 });
      gsap.set('.shimmer-flare', { xPercent: -180, opacity: 0 });

      // 2. SVGator Choreographed Animation Timeline
      tl
        // Phase 1: Electric Sapphire Aura Burst
        .to('.logo-glow-aura', {
          scale: 1.25,
          opacity: 0.75,
          duration: 1.0,
          ease: 'power2.out',
        })

        // Phase 2: Three Figures in the back drop & settle
        .to('.three-man-layer', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'elastic.out(1.15, 0.45)',
        }, '-=0.8')

        // Phase 3: "N" -> "A" -> "V" -> "R" -> "A" Pop Up Sequentially
        .to('.mask-letter-n', {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, '-=0.4')
        .to('.mask-letter-a1', {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, '-=0.32')
        .to('.mask-letter-v', {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, '-=0.32')
        .to('.mask-letter-r', {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, '-=0.32')
        .to('.mask-letter-a2', {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, '-=0.32')

        // Phase 4: "studio" in speed like someone is writing
        .to('.pen-spark', {
          opacity: 1,
          duration: 0.1,
        }, '+=0.05')
        .to('.mask-studio', {
          scaleX: 1,
          duration: 0.6, // Rapid handwriting speed
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
          left: '74%',
          duration: 0.6,
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
          opacity: 0,
          duration: 0.2,
        })

        // Phase 5: Metallic Shimmer Glint across the text
        .to('.shimmer-flare', {
          xPercent: 220,
          opacity: 0.85,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.2')
        .to('.shimmer-flare', {
          opacity: 0,
          duration: 0.25,
        })

        // Settle aura to ambient breathing pulse
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

          // Parallax depth separation between back figures and front text
          gsap.to('.three-man-layer', {
            x: -x * 12,
            y: -y * 8,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to('.text-svg-mask-wrap', {
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
          gsap.to('.text-svg-mask-wrap', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
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
          
          {/* Layer 1: The Three Men in the Back (Authentic source layer) */}
          <div className="three-man-layer absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/three_man.png"
              alt="Three Figures"
              className="w-[84%] h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(2,12,27,0.8)]"
            />
          </div>

          {/* Layer 2: The Official NAVRA text.png with Seamless SVG Mask Reveal */}
          <div className="text-svg-mask-wrap absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <svg
              viewBox="0 0 931 544"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Clean Non-Destructive SVG Mask */}
                <mask id="navraTextMask">
                  {/* Black Base (Hidden) */}
                  <rect width="931" height="544" fill="black" />

                  {/* Letter N Reveal Box */}
                  <rect className="mask-letter-n" x="120" y="90" width="165" height="230" rx="8" fill="white" />

                  {/* Letter A1 Reveal Box */}
                  <rect className="mask-letter-a1" x="270" y="90" width="165" height="230" rx="8" fill="white" />

                  {/* Letter V Reveal Box */}
                  <rect className="mask-letter-v" x="415" y="90" width="165" height="230" rx="8" fill="white" />

                  {/* Letter R Reveal Box */}
                  <rect className="mask-letter-r" x="560" y="90" width="165" height="230" rx="8" fill="white" />

                  {/* Letter A2 Reveal Box */}
                  <rect className="mask-letter-a2" x="700" y="90" width="165" height="230" rx="8" fill="white" />

                  {/* "studio" Cursive Handwriting Reveal Strip */}
                  <rect className="mask-studio" x="240" y="300" width="480" height="200" rx="4" fill="white" />
                </mask>
              </defs>

              {/* The 100% Authentic Single Un-sliced Image */}
              <image
                href="/NAVRA text.png"
                width="931"
                height="544"
                mask="url(#navraTextMask)"
              />
            </svg>

            {/* Shimmer Light Flare Glint */}
            <div
              className="shimmer-flare absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
            />
          </div>

          {/* Pen Tracer Glow Spark for "studio" */}
          <div className="pen-spark absolute bottom-[18%] w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8] pointer-events-none z-40" />

        </div>
      </div>
    </div>
  );
}
