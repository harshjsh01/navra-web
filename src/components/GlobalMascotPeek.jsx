'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, X, ArrowRight, Heart } from 'lucide-react';

const CHOPPER_PEEK_MESSAGES = [
  "Psst! I was waiting for you! 🦌 Come visit me in the Digital Growth Lab!",
  "Hey! 🍭 Want to see how much Cotton Candy we can buy with your ROAS?",
  "I formulated a special Rumble Ball! Come test your marketing funnels! ✨",
  "Don't leave me alone! Come pet me in the Digital Growth Lab! 💖"
];

export default function GlobalMascotPeek() {
  const pathname = usePathname();
  const router = useRouter();
  const canvasRef = useRef(null);

  const [isPeeking, setIsPeeking] = useState(false);
  const [peekMessage, setPeekMessage] = useState(CHOPPER_PEEK_MESSAGES[0]);
  const [dismissed, setDismissed] = useState(false);

  const isGrowthPage = pathname === '/growth';

  // Three.js scene refs
  const sceneRef = useRef(null);
  const chopperGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);
  const wavingPawRef = useRef(null);

  const mousePos = useRef({ normX: 0, normY: 0 });

  // Autonomous Peeking Timer
  useEffect(() => {
    if (isGrowthPage) {
      setIsPeeking(false);
      return;
    }

    const initialTimer = setTimeout(() => {
      if (!dismissed && !isGrowthPage) {
        const randomMsg = CHOPPER_PEEK_MESSAGES[Math.floor(Math.random() * CHOPPER_PEEK_MESSAGES.length)];
        setPeekMessage(randomMsg);
        setIsPeeking(true);
      }
    }, 10000);

    const intervalTimer = setInterval(() => {
      if (!dismissed && !isGrowthPage) {
        const randomMsg = CHOPPER_PEEK_MESSAGES[Math.floor(Math.random() * CHOPPER_PEEK_MESSAGES.length)];
        setPeekMessage(randomMsg);
        setIsPeeking(true);

        setTimeout(() => {
          setIsPeeking(false);
        }, 8000);
      }
    }, 32000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [pathname, dismissed, isGrowthPage]);

  // Mini 3D Chopper for Peeking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isGrowthPage) return;

    const width = 160;
    const height = 160;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0aa, 3.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 3.5);
    cyanRim.position.set(-3, 1, -2);
    scene.add(cyanRim);

    const chopperGroup = new THREE.Group();
    chopperGroup.position.set(0, -0.3, 0);
    scene.add(chopperGroup);
    chopperGroupRef.current = chopperGroup;

    // Materials
    const furMat = new THREE.MeshStandardMaterial({ color: 0x925838, roughness: 0.45 });
    const muzzleMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.5 });
    const blueNoseMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 });
    const hatPinkMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.35 });
    const hatBrimMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3 });
    const whiteCrossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const antlerMat = new THREE.MeshStandardMaterial({ color: 0x543622, roughness: 0.6 });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.75 });

    // Head
    const headGroup = new THREE.Group();
    chopperGroup.add(headGroup);
    headGroupRef.current = headGroup;

    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.95, 32, 32), furMat);
    headMesh.scale.set(1.15, 1.02, 1.05);
    headGroup.add(headMesh);

    // Muzzle & Blue Nose
    const muzzleMesh = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 20), muzzleMat);
    muzzleMesh.scale.set(1.1, 0.75, 0.75);
    muzzleMesh.position.set(0, -0.2, 0.7);
    headGroup.add(muzzleMesh);

    const noseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), blueNoseMat);
    noseMesh.position.set(0, -0.06, 1.12);
    headGroup.add(noseMesh);

    // Blush Cheeks
    const leftCheek = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), blushMat);
    leftCheek.position.set(-0.65, -0.15, 0.78);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), blushMat);
    rightCheek.position.set(0.65, -0.15, 0.78);
    headGroup.add(rightCheek);

    // Eyes
    const createMiniEye = (isLeft) => {
      const eyeCont = new THREE.Group();
      eyeCont.position.set(isLeft ? -0.38 : 0.38, 0.16, 0.82);

      const white = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), eyeWhiteMat);
      white.scale.set(1, 1.15, 0.55);
      eyeCont.add(white);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 20), pupilMat);
      pupil.scale.set(1, 1.1, 0.3);
      pupil.position.set(0, 0, 0.18);
      eyeCont.add(pupil);

      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), eyeWhiteMat);
      glint.position.set(0.05, 0.07, 0.26);
      eyeCont.add(glint);

      return { cont: eyeCont, pupil };
    };

    const leftEye = createMiniEye(true);
    const rightEye = createMiniEye(false);
    headGroup.add(leftEye.cont);
    headGroup.add(rightEye.cont);
    leftEyeRef.current = leftEye.cont;
    rightEyeRef.current = rightEye.cont;
    leftPupilRef.current = leftEye.pupil;
    rightPupilRef.current = rightEye.pupil;

    // Pink Hat with White Cross & Cyan Brim
    const hatGroup = new THREE.Group();
    hatGroup.position.set(0, 0.65, 0.05);
    headGroup.add(hatGroup);

    const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.78, 0.9, 24), hatPinkMat);
    hatGroup.add(hatCrown);

    const brimMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.08, 24), hatBrimMat);
    brimMesh.position.set(0, -0.42, 0);
    hatGroup.add(brimMesh);

    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.08), whiteCrossMat);
    crossV.position.set(0, 0.05, 0.76);
    hatGroup.add(crossV);

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.08), whiteCrossMat);
    crossH.position.set(0, 0.05, 0.76);
    hatGroup.add(crossH);

    // Antlers
    const createAntler = (isLeft) => {
      const antlerGroup = new THREE.Group();
      antlerGroup.position.set(isLeft ? -0.85 : 0.85, 0.7, 0);
      antlerGroup.rotation.set(-0.1, 0, isLeft ? 0.45 : -0.45);

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 10), antlerMat);
      stem.position.set(0, 0.38, 0);
      antlerGroup.add(stem);

      const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.4, 10), antlerMat);
      branch.position.set(isLeft ? -0.15 : 0.15, 0.42, 0.15);
      branch.rotation.set(0.4, 0, isLeft ? -0.6 : 0.6);
      antlerGroup.add(branch);

      return antlerGroup;
    };

    headGroup.add(createAntler(true));
    headGroup.add(createAntler(false));

    // Ears
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(isLeft ? -0.75 : 0.75, 0.45, 0.1);
      earGroup.rotation.set(-0.2, 0, isLeft ? 0.55 : -0.55);

      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 16), furMat);
      outer.scale.set(0.85, 1, 0.5);
      earGroup.add(outer);

      return earGroup;
    };

    const leftEar = createEar(true);
    const rightEar = createEar(false);
    headGroup.add(leftEar);
    headGroup.add(rightEar);
    leftEarRef.current = leftEar;
    rightEarRef.current = rightEar;

    // Waving Hoof / Paw
    const pawGroup = new THREE.Group();
    pawGroup.position.set(0.95, 0.1, 0.4);
    const pawMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), new THREE.MeshStandardMaterial({ color: 0x18181b }));
    pawGroup.add(pawMesh);
    chopperGroup.add(pawGroup);
    wavingPawRef.current = pawGroup;

    // Animation
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = mousePos.current.normX * 0.4;
        headGroupRef.current.rotation.x = -mousePos.current.normY * 0.3;
        headGroupRef.current.position.y = 0.05 + Math.sin(t * 3) * 0.04;
      }

      if (leftPupilRef.current && rightPupilRef.current) {
        const px = mousePos.current.normX * 0.07;
        const py = -mousePos.current.normY * 0.05;
        leftPupilRef.current.position.set(px, py, 0.2);
        rightPupilRef.current.position.set(px, py, 0.2);
      }

      if (wavingPawRef.current) {
        wavingPawRef.current.rotation.z = Math.sin(t * 8) * 0.45;
        wavingPawRef.current.position.y = 0.1 + Math.sin(t * 4) * 0.05;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mousePos.current.normX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.normY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, [isGrowthPage]);

  const handleVisitGrowth = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.88, y: 0.88 },
      colors: ['#f472b6', '#38bdf8', '#fbbf24']
    });
    router.push('/growth');
  };

  if (isGrowthPage) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isPeeking ? 'translate-y-0 opacity-100' : 'translate-y-48 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-end">
        
        {/* Floating Speech Bubble */}
        <div 
          onClick={handleVisitGrowth}
          className="mb-2 max-w-xs p-3.5 rounded-2xl bg-gradient-to-r from-[#1e1b4b]/95 via-[#0f172a]/95 to-[#3b0764]/95 border-2 border-pink-400 text-pink-200 text-xs font-mono font-bold leading-tight shadow-[0_10px_30px_rgba(236,72,153,0.35)] backdrop-blur-xl cursor-pointer hover:border-amber-400 hover:scale-105 transition-all group"
        >
          <div className="flex items-center justify-between gap-2 mb-1 text-[10px] text-amber-400 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400 animate-spin" />
              <span>DOCTOR TONY TONY CHOPPER</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPeeking(false);
                setDismissed(true);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-100 group-hover:text-pink-200 transition-colors">
            {peekMessage}
          </p>
          <div className="mt-2 pt-1.5 border-t border-pink-400/30 flex items-center justify-between text-[10px] text-pink-300 font-mono">
            <span className="font-bold">VISIT CHOPPER IN GROWTH</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3D Mini Chopper Canvas */}
        <div 
          onClick={handleVisitGrowth}
          className="relative w-36 h-36 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_15px_30px_rgba(236,72,153,0.4)]"
        >
          <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
