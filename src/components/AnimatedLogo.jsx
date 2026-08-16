'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // 1. Initial State
      gsap.set('.logo-glow', { scale: 0.6, opacity: 0 });
      gsap.set('.logo-silhouettes', { scale: 0.9, opacity: 0, y: 20 });
      gsap.set('.logo-navra-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.logo-studio-wrap', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 });
      gsap.set('.logo-flare', { xPercent: -150, opacity: 0 });

      // 2. Timeline Sequence
      tl
        // Ambient sapphire aura burst
        .to('.logo-glow', {
          scale: 1.2,
          opacity: 0.7,
          duration: 1.8,
          ease: 'power2.out',
        })
        // Silhouettes smoothly emerge with depth
        .to('.logo-silhouettes', {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'back.out(1.4)',
        }, '-=1.2')
        // NAVRA letters progressive left-to-right laser sweep
        .to('.logo-navra-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        }, '-=0.8')
        // Light flare glints across the letters
        .to('.logo-flare', {
          xPercent: 250,
          opacity: 0.9,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=1.1')
        // "studio" handwritten cursive pen-trace from left to right
        .to('.logo-studio-wrap', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power1.inOut',
        }, '-=0.6')
        // Settle glowing aura into an ambient breathing pulse
        .to('.logo-glow', {
          scale: 1.0,
          opacity: 0.45,
          duration: 1.0,
        });

      // Subtle ambient hover & 3D tilt tracking
      const card = cardRef.current;
      if (card) {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(card, {
            rotationY: x * 15,
            rotationX: -y * 15,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-xl mx-auto py-6">
      {/* 3D Interactive Card Wrapper */}
      <div 
        ref={cardRef} 
        className="relative flex items-center justify-center w-full cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Multi-Layer Glow */}
        <div 
          className="logo-glow absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-500/20 to-transparent blur-3xl pointer-events-none -z-10"
        />

        {/* Outer Logo Container */}
        <div className="relative w-72 sm:w-96 md:w-[420px] aspect-[4/3] flex items-center justify-center">
          
          {/* Layer 1: The Three Authentic Silhouettes */}
          <img
            src="/navra_sil_only.png"
            alt="Navra Silhouettes"
            className="logo-silhouettes absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(29,78,216,0.5)] z-10"
          />

          {/* Layer 2: The Authentic NAVRA Wordmark with Liquid Light Sweep */}
          <div className="logo-navra-wrap absolute inset-0 w-full h-full z-20 overflow-hidden">
            <img
              src="/navra_text_only.png"
              alt="NAVRA"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
            {/* Shimmer Light Glint */}
            <div className="logo-flare absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent transform -skew-x-25 pointer-events-none blur-sm" />
          </div>

          {/* Layer 3: The Authentic Studio Cursive Text with Stroke Reveal */}
          <div className="logo-studio-wrap absolute inset-0 w-full h-full z-30 overflow-hidden">
            <img
              src="/navra_studio_hd.png"
              alt="Studio Script"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_15px_rgba(56,189,248,0.6)]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
