'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial State for all elements
      gsap.set('.glow-aura', { scale: 0.5, opacity: 0 });
      gsap.set('.sil-center', { scale: 0, y: -50, opacity: 0 });
      gsap.set('.sil-left', { x: -60, scale: 0.5, opacity: 0 });
      gsap.set('.sil-right', { x: 60, scale: 0.5, opacity: 0 });
      
      gsap.set('.letter-item', { scale: 0, y: 40, rotation: -12, opacity: 0 });
      gsap.set('.studio-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.laser-tracer', { xPercent: -120, opacity: 0 });
      gsap.set('.pen-spark', { xPercent: -100, opacity: 0 });

      // 2. SVGator-Style Choreographed Animation Sequence
      tl
        // Step 1: Ambient Electric Sapphire Aura burst
        .to('.glow-aura', {
          scale: 1.2,
          opacity: 0.75,
          duration: 1.2,
          ease: 'power2.out',
        })

        // Step 2: Center figure drops in with an elastic spring bounce
        .to('.sil-center', {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'elastic.out(1.1, 0.4)',
        }, '-=0.9')

        // Step 3: Left & Right figures slide in from sides and link arms
        .to('.sil-left', {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',
        }, '-=0.7')
        .to('.sil-right', {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',
        }, '-=0.8')

        // Step 4: Glowing laser streak dashes across the baseline
        .to('.laser-tracer', {
          opacity: 1,
          duration: 0.2,
        }, '-=0.4')
        .to('.laser-tracer', {
          xPercent: 220,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.3')

        // Step 5: "NAVRA" Letters pop up sequentially with snappy bounce
        .to('.letter-item', {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.09,
          ease: 'elastic.out(1.2, 0.45)',
        }, '-=0.9')

        // Step 6: "studio" cursive handwritten pen trace from left to right
        .to('.pen-spark', {
          opacity: 1,
          duration: 0.2,
        }, '-=0.3')
        .to('.studio-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.1,
          ease: 'power1.inOut',
        }, '-=0.2')
        .to('.pen-spark', {
          xPercent: 120,
          duration: 1.1,
          ease: 'power1.inOut',
        }, '<')
        .to('.pen-spark', {
          opacity: 0,
          duration: 0.3,
        })

        // Settle ambient glow to breathing pulse
        .to('.glow-aura', {
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
            rotationY: x * 18,
            rotationX: -y * 18,
            transformPerspective: 800,
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
        };

        const handleMouseEnter = () => {
          // Playful letter wave on hover
          gsap.to('.letter-item', {
            y: -8,
            stagger: 0.05,
            duration: 0.25,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
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
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-xl mx-auto py-4">
      {/* 3D Interactive Stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Multi-Layered Electric Sapphire Aura */}
        <div
          className="glow-aura absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-sky-300/10 blur-3xl pointer-events-none -z-10"
        />

        {/* Master Logo Container */}
        <div className="relative w-72 sm:w-84 md:w-96 aspect-[16/10] flex items-center justify-center">
          
          {/* Layer 1: The Three Silhouettes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {/* Left Figure */}
            <img
              src="/sil_left.png"
              alt="Left Figure"
              className="sil-left absolute w-[35%] left-[2%] bottom-[12%] object-contain filter drop-shadow-[0_4px_12px_rgba(2,12,27,0.8)]"
            />
            {/* Center Figure */}
            <img
              src="/sil_center.png"
              alt="Center Figure"
              className="sil-center absolute w-[36%] left-[32%] bottom-[14%] object-contain filter drop-shadow-[0_4px_16px_rgba(29,78,216,0.6)]"
            />
            {/* Right Figure */}
            <img
              src="/sil_right.png"
              alt="Right Figure"
              className="sil-right absolute w-[35%] right-[2%] bottom-[12%] object-contain filter drop-shadow-[0_4px_12px_rgba(2,12,27,0.8)]"
            />
          </div>

          {/* Layer 2: The NAVRA Letters (Pop up one by one) */}
          <div className="absolute inset-x-0 bottom-[26%] flex items-center justify-between px-2 z-20 pointer-events-none">
            {/* N */}
            <div className="letter-item w-[20%] flex items-center justify-center">
              <img src="/letter_n.png" alt="N" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" />
            </div>
            {/* A */}
            <div className="letter-item w-[20%] flex items-center justify-center -ml-1">
              <img src="/letter_a1.png" alt="A" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" />
            </div>
            {/* V */}
            <div className="letter-item w-[20%] flex items-center justify-center -ml-1">
              <img src="/letter_v.png" alt="V" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" />
            </div>
            {/* R */}
            <div className="letter-item w-[20%] flex items-center justify-center -ml-1">
              <img src="/letter_r.png" alt="R" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" />
            </div>
            {/* A */}
            <div className="letter-item w-[18%] flex items-center justify-center -ml-1">
              <img src="/letter_a2.png" alt="A" className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" />
            </div>

            {/* Glowing Laser Streak across the baseline */}
            <div className="laser-tracer absolute -bottom-1 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" />
          </div>

          {/* Layer 3: The Cursive "studio" Wordmark */}
          <div className="studio-wrap absolute bottom-[6%] inset-x-0 flex items-center justify-center z-30 pointer-events-none px-6">
            <img
              src="/word_studio.png"
              alt="studio"
              className="w-[85%] h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(56,189,248,0.7)]"
            />
            {/* Tracing Pen Spark Sparkle */}
            <div className="pen-spark absolute left-0 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#38BDF8]" />
          </div>

        </div>
      </div>
    </div>
  );
}
