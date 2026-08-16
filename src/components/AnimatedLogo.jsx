'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial State
      gsap.set('.logo-aura', { scale: 0.7, opacity: 0 });
      gsap.set('.logo-main-img', { scale: 0.88, opacity: 0, y: 20 });
      gsap.set('.logo-shimmer', { xPercent: -200, opacity: 0 });

      // 2. Cinematic Entrance Sequence
      tl
        // Electric Sapphire & Ice Blue ambient glow expands
        .to('.logo-aura', {
          scale: 1.2,
          opacity: 0.65,
          duration: 1.4,
          ease: 'power2.out',
        })
        // Transparent logo smoothly reveals
        .to('.logo-main-img', {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'back.out(1.2)',
        }, '-=1.0')
        // Light flare glint sweeps across the silver/white letters
        .to('.logo-shimmer', {
          xPercent: 220,
          opacity: 0.85,
          duration: 1.3,
          ease: 'power2.inOut',
        }, '-=0.6')
        // Settle aura to subtle ambient breathing level
        .to('.logo-aura', {
          scale: 1.0,
          opacity: 0.4,
          duration: 0.8,
        });

      // 3. 3D Mouse Parallax Tilt
      const card = cardRef.current;
      if (card) {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotationY: x * 16,
            rotationX: -y * 16,
            transformPerspective: 900,
            duration: 0.4,
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
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-lg mx-auto py-2">
      {/* 3D Tilt Wrapper */}
      <div
        ref={cardRef}
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Electric Sapphire & Ice Blue Ambient Glow */}
        <div
          className="logo-aura absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/25 to-transparent blur-3xl pointer-events-none -z-10"
        />

        {/* Clean Transparent Logo Image */}
        <div className="relative w-64 sm:w-80 md:w-96 overflow-hidden rounded-2xl p-2">
          <img
            src="/navra_logo_perfect.png"
            alt="NAVRA Studio"
            className="logo-main-img w-full h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
          />

          {/* Shimmer Light Glint Layer */}
          <div
            className="logo-shimmer absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent transform -skew-x-25 pointer-events-none blur-sm"
          />
        </div>
      </div>
    </div>
  );
}
