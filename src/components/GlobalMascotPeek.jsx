'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, X, ArrowRight, Heart } from 'lucide-react';

const PEEK_MESSAGES = [
  "Psst! I was waiting for you! 🐾 Come check out our Digital Growth Lab!",
  "Hey! 🚀 Want to see the 10x ROAS Simulator in Digital Growth?",
  "I made you a special growth potion! Come play with me in Digital Growth! ✨",
  "I missed you! Come pet me in the Digital Growth Lab! 💖"
];

export default function GlobalMascotPeek() {
  const pathname = usePathname();
  const router = useRouter();
  const canvasRef = useRef(null);

  const [isPeeking, setIsPeeking] = useState(false);
  const [peekMessage, setPeekMessage] = useState(PEEK_MESSAGES[0]);
  const [dismissed, setDismissed] = useState(false);

  // If on /growth page, we don't peek (because full mascot is already active there!)
  const isGrowthPage = pathname === '/growth';

  // Three.js scene refs
  const sceneRef = useRef(null);
  const charGroupRef = useRef(null);
  const headMeshRef = useRef(null);
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

    // Initial peek after 10 seconds
    const initialTimer = setTimeout(() => {
      if (!dismissed && !isGrowthPage) {
        const randomMsg = PEEK_MESSAGES[Math.floor(Math.random() * PEEK_MESSAGES.length)];
        setPeekMessage(randomMsg);
        setIsPeeking(true);
      }
    }, 10000);

    // Recurring peek every 32 seconds
    const intervalTimer = setInterval(() => {
      if (!dismissed && !isGrowthPage) {
        const randomMsg = PEEK_MESSAGES[Math.floor(Math.random() * PEEK_MESSAGES.length)];
        setPeekMessage(randomMsg);
        setIsPeeking(true);

        // Automatically hide after 8 seconds if ignored
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

  // Mini Three.js Mascot for Peeking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isGrowthPage) return;

    const width = 160;
    const height = 160;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

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

    const keyLight = new THREE.DirectionalLight(0xffb703, 3.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f2fe, 3.5);
    cyanRim.position.set(-3, 1, -2);
    scene.add(cyanRim);

    const charGroup = new THREE.Group();
    charGroup.position.set(0, -0.35, 0);
    scene.add(charGroup);
    charGroupRef.current = charGroup;

    // Materials
    const furMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.3, metalness: 0.12 });
    const muzzleMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.45 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.2 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x030712 });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.7 });

    // Head
    const headGroup = new THREE.Group();
    charGroup.add(headGroup);
    headMeshRef.current = headGroup;

    const headGeo = new THREE.SphereGeometry(0.95, 32, 32);
    headGeo.scale(1.15, 1.05, 1.05);
    const headMesh = new THREE.Mesh(headGeo, furMat);
    headGroup.add(headMesh);

    // Muzzle & Nose
    const muzzleMesh = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), muzzleMat);
    muzzleMesh.scale.set(1.05, 0.7, 0.7);
    muzzleMesh.position.set(0, -0.2, 0.72);
    headGroup.add(muzzleMesh);

    const noseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pupilMat);
    noseMesh.position.set(0, -0.06, 1.05);
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
      white.scale.set(1, 1.15, 0.6);
      eyeCont.add(white);

      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 20), irisMat);
      iris.scale.set(1, 1.1, 0.3);
      iris.position.set(0, 0, 0.18);
      eyeCont.add(iris);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), pupilMat);
      pupil.position.set(0, 0, 0.22);
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

    // Ears
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(isLeft ? -0.65 : 0.65, 0.95, 0.1);
      earGroup.rotation.set(-0.15, 0, isLeft ? 0.45 : -0.45);

      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.72, 16), furMat);
      outer.scale.set(0.85, 1, 0.55);
      earGroup.add(outer);

      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.52, 12), pinkMat);
      inner.scale.set(0.75, 1, 0.4);
      inner.position.set(0, -0.05, 0.08);
      earGroup.add(inner);

      return earGroup;
    };

    const leftEar = createEar(true);
    const rightEar = createEar(false);
    headGroup.add(leftEar);
    headGroup.add(rightEar);
    leftEarRef.current = leftEar;
    rightEarRef.current = rightEar;

    // Crown
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.05, 0.1);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.35, 0.2, 16, 1, true), goldMat);
    crownGroup.add(ring);
    for (let i = 0; i < 4; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), goldMat);
      const ang = (i / 4) * Math.PI * 2;
      cone.position.set(Math.sin(ang) * 0.38, 0.2, Math.cos(ang) * 0.38);
      crownGroup.add(cone);
    }
    headGroup.add(crownGroup);

    // Waving Paw
    const pawGroup = new THREE.Group();
    pawGroup.position.set(1.05, 0.2, 0.5);
    const pawMesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), furMat);
    pawGroup.add(pawMesh);
    charGroup.add(pawGroup);
    wavingPawRef.current = pawGroup;

    // Animation loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Head mouse tracking
      if (headMeshRef.current) {
        headMeshRef.current.rotation.y = mousePos.current.normX * 0.4;
        headMeshRef.current.rotation.x = -mousePos.current.normY * 0.3;
        headMeshRef.current.position.y = 0.05 + Math.sin(t * 3) * 0.04;
      }

      // Eye tracking
      if (leftPupilRef.current && rightPupilRef.current) {
        const px = mousePos.current.normX * 0.07;
        const py = -mousePos.current.normY * 0.05;
        leftPupilRef.current.position.set(px, py, 0.22);
        rightPupilRef.current.position.set(px, py, 0.22);
      }

      // Ear wiggle
      if (leftEarRef.current && rightEarRef.current) {
        leftEarRef.current.rotation.z = 0.45 + Math.sin(t * 4) * 0.08;
        rightEarRef.current.rotation.z = -0.45 - Math.sin(t * 4) * 0.08;
      }

      // Waving Paw
      if (wavingPawRef.current) {
        wavingPawRef.current.rotation.z = Math.sin(t * 8) * 0.45;
        wavingPawRef.current.position.y = 0.2 + Math.sin(t * 4) * 0.05;
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

  // Click on Mascot Peek -> Go to /growth
  const handleVisitGrowth = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.88, y: 0.88 }
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
          className="mb-2 max-w-xs p-3.5 rounded-2xl bg-gradient-to-r from-[#0e254d]/95 via-[#091b38]/95 to-[#132c57]/95 border-2 border-cyan-400 text-cyan-200 text-xs font-mono font-bold leading-tight shadow-[0_10px_30px_rgba(0,242,254,0.35)] backdrop-blur-xl cursor-pointer hover:border-amber-400 hover:scale-105 transition-all group"
        >
          <div className="flex items-center justify-between gap-2 mb-1 text-[10px] text-amber-400 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              <span>NAVRO THE GROWTH MASCOT</span>
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
          <p className="text-slate-100 group-hover:text-cyan-200 transition-colors">
            {peekMessage}
          </p>
          <div className="mt-2 pt-1.5 border-t border-cyan-400/30 flex items-center justify-between text-[10px] text-cyan-300 font-mono">
            <span className="font-bold">CLICK TO VISIT DIGITAL GROWTH</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3D Mini Mascot Canvas */}
        <div 
          onClick={handleVisitGrowth}
          className="relative w-36 h-36 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_15px_30px_rgba(0,242,254,0.4)]"
        >
          <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
