'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial States
      gsap.set('.logo-glow-aura', { scale: 0.6, opacity: 0 });
      gsap.set('.three-man-layer', { scale: 0.8, y: -35, opacity: 0 });
      gsap.set('.letter-pop', { scale: 0, y: 45, opacity: 0 });
      gsap.set('.studio-writing-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.pen-spark', { left: '10%', opacity: 0 });
      gsap.set('.shimmer-flare', { xPercent: -180, opacity: 0 });

      // 2. Choreographed Animation Timeline
      tl
        // Phase 1: Electric Sapphire Ambient Glow
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
          ease: 'elastic.out(1.1, 0.5)',
        }, '-=0.8')

        // Phase 3: "N" -> "A" -> "V" -> "R" -> "A" Pop Up Sequentially
        .to('.letter-pop', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12, // Distinct sequential pops: N, then A, then V, then R, then A
          ease: 'back.out(2.0)',
        }, '-=0.4')

        // Phase 4: "studio" in speed like someone is writing
        .to('.pen-spark', {
          opacity: 1,
          duration: 0.1,
        }, '+=0.05')
        .to('.studio-writing-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 0.65, // Swift handwriting speed
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
          left: '90%',
          duration: 0.65,
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
          opacity: 0,
          duration: 0.2,
        })

        // Phase 5: Metallic Shimmer Glint across the finished lockup
        .to('.shimmer-flare', {
          xPercent: 220,
          opacity: 0.85,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.3')
        .to('.shimmer-flare', {
          opacity: 0,
          duration: 0.25,
        })

        // Settle aura to gentle ambient breathing pulse
        .to('.logo-glow-aura', {
          scale: 1.0,
          opacity: 0.45,
          duration: 0.8,
        });

      // 3. Interactive 3D Parallax & Hover Wave
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

          // Parallax depth separation
          gsap.to('.three-man-layer', {
            x: -x * 12,
            y: -y * 8,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to('.letters-row, .studio-writing-wrap', {
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
          gsap.to('.letters-row, .studio-writing-wrap', { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
        };

        const handleMouseEnter = () => {
          // Playful ripple wave across the letters on hover
          gsap.to('.letter-pop', {
            y: -6,
            stagger: 0.04,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          });
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
          
          {/* Layer 1: The Three Men in the Back */}
          <div className="three-man-layer absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img
              src="/three_man.png"
              alt="Three Figures"
              className="w-[84%] h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(2,12,27,0.8)]"
            />
          </div>

          {/* Layer 2: NAVRA Letters popping up sequentially (N -> A -> V -> R -> A) */}
          <div className="letters-row absolute inset-x-4 top-[24%] flex items-center justify-center gap-[1%] z-20 pointer-events-none">
            {/* N */}
            <div className="letter-pop w-[18%] flex items-center justify-center">
              <img src="/letter_n.png" alt="N" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]" />
            </div>
            {/* A */}
            <div className="letter-pop w-[20%] flex items-center justify-center -ml-[2%]">
              <img src="/letter_a1.png" alt="A" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]" />
            </div>
            {/* V */}
            <div className="letter-pop w-[20%] flex items-center justify-center -ml-[2%]">
              <img src="/letter_v.png" alt="V" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]" />
            </div>
            {/* R */}
            <div className="letter-pop w-[20%] flex items-center justify-center -ml-[2%]">
              <img src="/letter_r.png" alt="R" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]" />
            </div>
            {/* A */}
            <div className="letter-pop w-[19%] flex items-center justify-center -ml-[2%]">
              <img src="/letter_a2.png" alt="A" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]" />
            </div>

            {/* Shimmer Light Flare */}
            <div
              className="shimmer-flare absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
            />
          </div>

          {/* Layer 3: The Cursive "studio" Writing Out Rapidly */}
          <div className="studio-writing-wrap absolute inset-x-0 bottom-[8%] flex items-center justify-center z-30 pointer-events-none overflow-hidden px-8">
            <img
              src="/word_studio.png"
              alt="studio"
              className="w-[50%] sm:w-[48%] h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(56,189,248,0.8)]"
            />
          </div>

          {/* Glowing Pen Tracer Spark */}
          <div className="pen-spark absolute bottom-[19%] w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_14px_#38BDF8] pointer-events-none z-40" />

        </div>
      </div>
    </div>
  );
}
