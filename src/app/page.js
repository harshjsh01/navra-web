'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import VantaBackground from '@/components/VantaBackground';
import Prism from '@/components/Prism';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-ink-violet">
      <VantaBackground>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="mb-4">
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-widest font-bold">NAVRA</h1>
            <p className="text-center text-gray-300 tracking-[0.3em] uppercase mt-4 text-sm font-light">Studio</p>
          </div>
        </div>
        
        <div className="absolute inset-0 z-20">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <Prism />
            </Suspense>
          </Canvas>
        </div>
      </VantaBackground>
    </main>
  );
}
