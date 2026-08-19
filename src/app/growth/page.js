'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { 
  TrendingUp, 
  Sparkles, 
  Zap, 
  Target, 
  Rocket, 
  Volume2, 
  VolumeX, 
  Smile, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Mail, 
  Crown, 
  Flame, 
  MessageSquare, 
  DollarSign, 
  BarChart3, 
  MousePointerClick, 
  Play, 
  Share2, 
  Trophy, 
  Heart, 
  Move, 
  Candy,
  Pill,
  Ship,
  Compass,
  Anchor,
  Wind
} from 'lucide-react';

const CHOPPER_QUOTES = {
  pet: [
    "Shut up you jerk! Saying I'm cute doesn't make me happy at all, you bastard! 🌸 (blushes and wiggles!)",
    "Kono yaro~! Don't think flattering me will give you a discount on marketing! 💖 (happily dancing)",
    "Ehehehe... Stop petting me, I'm a fierce pirate doctor of growth! 🩺✨"
  ],
  poke_head: [
    "Ouch! Watch the antlers! Doctor Chopper is formulating a 500% ROAS cure! 🦌",
    "Hey! That tickled Dr. Hiriluk's hat! Let's conquer the Grand Line of Google Search! 👑",
    "Boink! Brain Point activated! Found 50 untapped viral ad angles! 🧠"
  ],
  poke_belly: [
    "Hehehe! Stop tickling! That's where I keep my emergency Cotton Candy supply! 🍭",
    "Giggle! Conversion rates are shooting up faster than the Knock Up Stream! 🌊",
    "Hahaha! If you tickle me again, I'll turn into Heavy Point and 10x your CTR! 🥊"
  ],
  drag: [
    "Wheeeeee! Are we flying to the Thousand Sunny? Watch out for the Navy funnels! ⛵",
    "Whoa whoa! Doctor Chopper is exploring the high seas of your marketing page! 🗺️",
    "Hold on tight! Luffy would love this revenue scaling! 🍖"
  ],
  cotton_candy: [
    "SUGOI!! COTTON CANDY!! 🍭✨ It's so fluffy and sweet! +10,000 Marketing XP!",
    "Cotton Candy Lover Chopper mode activated! Conversion energy at 1000%! 🌈",
    "OM NOM NOM! Delicious! Now let's crush Meta & TikTok ad algorithms! 🚀"
  ],
  rumble_ball: [
    "RUMBLE BALL!! 💊 TRANSFORMATION: MARKETING POINT ACTIVATED! ⚡",
    "POWER OVERWHELMING! ROAS Multiplier boosted to astronomical highs! 🌟",
    "Doctor Chopper's special prescription: Instant 4.5x conversion boost! 💥"
  ]
};

export default function DigitalGrowthPage() {
  const fullCanvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Chopper UI state
  const [speechBubble, setSpeechBubble] = useState("Konnichiwa! 🦌 I'm TONY TONY CHOPPER, your Pirate Doctor of Growth! Drag me, feed me cotton candy, or let's cure your ad spend!");
  const [mascotXP, setMascotXP] = useState(250);
  const [growthEnergy, setGrowthEnergy] = useState(95);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customTalkText, setCustomTalkText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBlushingDance, setIsBlushingDance] = useState(false);
  const [bubbleScreenPos, setBubbleScreenPos] = useState({ x: 300, y: 300 });

  // ROI Calculator state
  const [monthlySpend, setMonthlySpend] = useState(8000);
  const [aov, setAov] = useState(150);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Three.js world refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const chopperGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const mouthMeshRef = useRef(null);
  const tongueMeshRef = useRef(null);
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);
  const leftAntlerRef = useRef(null);
  const rightAntlerRef = useRef(null);
  const leftCheekRef = useRef(null);
  const rightCheekRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const auraLightRef = useRef(null);
  const sakuraPetalsRef = useRef([]);

  // Free Roaming & Drag & Physics State
  const mascotWorldPos = useRef({
    x: 1.5,
    y: 0.2,
    z: 0,
    targetX: 1.5,
    targetY: 0.2,
    targetZ: 0,
    isDragging: false,
    roamTimer: 0
  });

  const mouseScreenPos = useRef({ normX: 0, normY: 0 });
  const springPhysics = useRef({
    headBounce: 0,
    headBounceVel: 0,
    bodySquish: 1,
    bodySquishVel: 0,
    jawOpen: 0,
    mouthTarget: 0,
    earWiggle: 0,
    earWiggleVel: 0,
    danceWiggle: 0,
    superchargeFactor: 0,
    blinkTimer: 0,
    isBlinking: false
  });

  const addXP = (amt) => {
    setMascotXP((prev) => prev + amt);
  };

  // Sound effects generator
  const playSoundEffect = (type) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'cute_chirp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'giggle') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.08);
        osc.frequency.linearRampToValueAtTime(700, now + 0.15);
        osc.frequency.linearRampToValueAtTime(1050, now + 0.22);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'rumble') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Audio effect error:", e);
    }
  };

  // Cute Chopper speech synthesis
  const speakChopper = (text) => {
    setSpeechBubble(text);
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.98; // Very cute high-pitched Chopper voice
    utterance.rate = 1.25;  // Energetic anime cadence
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      springPhysics.current.mouthTarget = 0;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ==========================================
  // THREE.JS 3D CHOPPER PROCEDURAL MODEL
  // ==========================================
  useEffect(() => {
    const canvas = fullCanvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    // Anime Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.5);
    scene.add(ambientLight);

    const sunKey = new THREE.DirectionalLight(0xfff0aa, 3.8);
    sunKey.position.set(5, 7, 5);
    scene.add(sunKey);

    const cyanSkyRim = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanSkyRim.position.set(-5, 2, -3);
    scene.add(cyanSkyRim);

    const sakuraGlow = new THREE.PointLight(0xf472b6, 2.5, 8);
    sakuraGlow.position.set(0, 0, 2);
    scene.add(sakuraGlow);
    auraLightRef.current = sakuraGlow;

    // 3D Master Chopper Group
    const chopperGroup = new THREE.Group();
    chopperGroup.scale.set(0.85, 0.85, 0.85);
    scene.add(chopperGroup);
    chopperGroupRef.current = chopperGroup;

    // Material Palette (Authentic Chopper Colors)
    const furMat = new THREE.MeshStandardMaterial({
      color: 0x925838, // Tan Reindeer Fur
      roughness: 0.45,
      metalness: 0.05,
    });

    const muzzleMat = new THREE.MeshStandardMaterial({
      color: 0xfde047, // Light Cream/Pale Muzzle
      roughness: 0.5,
      metalness: 0.05
    });

    const blueNoseMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Iconic Bright Blue Reindeer Nose!
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3
    });

    const hatPinkMat = new THREE.MeshStandardMaterial({
      color: 0xec4899, // Hiriluk's Magenta/Pink Top Hat
      roughness: 0.35,
      metalness: 0.05
    });

    const hatBrimCyanMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan/Blue Hat Band & Rim
      roughness: 0.3,
      metalness: 0.1
    });

    const whiteCrossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const antlerMat = new THREE.MeshStandardMaterial({
      color: 0x543622, // Dark Woody Antlers
      roughness: 0.6,
      metalness: 0.05
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.75 });
    const maroonPantsMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 });
    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3 });

    // 1. Chubby Reindeer Body
    const bodyGeo = new THREE.SphereGeometry(0.85, 32, 32);
    bodyGeo.scale(1.0, 1.15, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, furMat);
    bodyMesh.position.set(0, -0.4, 0);
    chopperGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // Maroon Pants
    const pantsGeo = new THREE.CylinderGeometry(0.72, 0.75, 0.45, 24);
    const pantsMesh = new THREE.Mesh(pantsGeo, maroonPantsMat);
    pantsMesh.position.set(0, -0.75, 0);
    chopperGroup.add(pantsMesh);

    // Blue Doctor's Backpack on Back
    const packGeo = new THREE.BoxGeometry(0.7, 0.7, 0.35);
    const packMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
    const packMesh = new THREE.Mesh(packGeo, packMat);
    packMesh.position.set(0, -0.3, -0.6);
    chopperGroup.add(packMesh);

    // 2. Large Cute Chopper Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.85, 0);
    chopperGroup.add(headGroup);
    headGroupRef.current = headGroup;

    const headGeo = new THREE.SphereGeometry(0.95, 32, 32);
    headGeo.scale(1.15, 1.02, 1.05);
    const headMesh = new THREE.Mesh(headGeo, furMat);
    headGroup.add(headMesh);

    // Muzzle
    const muzzleGeo = new THREE.SphereGeometry(0.52, 24, 24);
    muzzleGeo.scale(1.1, 0.75, 0.75);
    const muzzleMesh = new THREE.Mesh(muzzleGeo, muzzleMat);
    muzzleMesh.position.set(0, -0.22, 0.7);
    headGroup.add(muzzleMesh);

    // Iconic Blue Reindeer Nose
    const noseGeo = new THREE.SphereGeometry(0.12, 16, 16);
    noseGeo.scale(1.2, 0.9, 1.0);
    const noseMesh = new THREE.Mesh(noseGeo, blueNoseMat);
    noseMesh.position.set(0, -0.06, 1.15);
    headGroup.add(noseMesh);

    // Blush Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.65, -0.16, 0.78);
    headGroup.add(leftCheek);
    leftCheekRef.current = leftCheek;

    const rightCheek = new THREE.Mesh(cheekGeo, blushMat);
    rightCheek.position.set(0.65, -0.16, 0.78);
    headGroup.add(rightCheek);
    rightCheekRef.current = rightCheek;

    // 3. Sparkling Anime Eyes
    const createEye = (isLeft) => {
      const eyeCont = new THREE.Group();
      eyeCont.position.set(isLeft ? -0.4 : 0.4, 0.16, 0.82);

      const white = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32), eyeWhiteMat);
      white.scale.set(1, 1.18, 0.55);
      eyeCont.add(white);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), pupilMat);
      pupil.scale.set(1, 1.12, 0.3);
      pupil.position.set(0, 0, 0.18);
      eyeCont.add(pupil);

      // Star Sparkle Glints
      const glint1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), eyeWhiteMat);
      glint1.position.set(0.06, 0.08, 0.28);
      eyeCont.add(glint1);

      const glint2 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), eyeWhiteMat);
      glint2.position.set(-0.06, -0.06, 0.28);
      eyeCont.add(glint2);

      return { cont: eyeCont, pupil };
    };

    const leftEye = createEye(true);
    const rightEye = createEye(false);
    headGroup.add(leftEye.cont);
    headGroup.add(rightEye.cont);
    leftEyeRef.current = leftEye.cont;
    rightEyeRef.current = rightEye.cont;
    leftPupilRef.current = leftEye.pupil;
    rightPupilRef.current = rightEye.pupil;

    // 4. Smiling Mouth & Tongue
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.34, 0.9);
    headGroup.add(mouthGroup);
    mouthMeshRef.current = mouthGroup;

    const mouthCavity = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x240612 })
    );
    mouthCavity.scale.set(1.2, 0.6, 0.45);
    mouthGroup.add(mouthCavity);

    const tongueMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e })
    );
    tongueMesh.scale.set(1.1, 0.4, 0.8);
    tongueMesh.position.set(0, -0.06, 0.06);
    mouthGroup.add(tongueMesh);
    tongueMeshRef.current = tongueMesh;

    // 5. ICONIC PINK DOCTOR'S HAT WITH WHITE CROSS & CYAN BRIM
    const hatGroup = new THREE.Group();
    hatGroup.position.set(0, 0.65, 0.05);
    headGroup.add(hatGroup);

    // Tall Pink Cylinder / Crown
    const hatCrownGeo = new THREE.CylinderGeometry(0.72, 0.78, 0.95, 32);
    const hatCrown = new THREE.Mesh(hatCrownGeo, hatPinkMat);
    hatGroup.add(hatCrown);

    // Cyan Brim
    const brimGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.08, 32);
    const brimMesh = new THREE.Mesh(brimGeo, hatBrimCyanMat);
    brimMesh.position.set(0, -0.45, 0);
    hatGroup.add(brimMesh);

    // White Medical Cross '+' on Front of Hat
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.08), whiteCrossMat);
    crossV.position.set(0, 0.05, 0.76);
    hatGroup.add(crossV);

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.08), whiteCrossMat);
    crossH.position.set(0, 0.05, 0.76);
    hatGroup.add(crossH);

    // 6. REINDEER ANTLERS
    const createAntler = (isLeft) => {
      const antlerGroup = new THREE.Group();
      antlerGroup.position.set(isLeft ? -0.85 : 0.85, 0.75, 0);
      antlerGroup.rotation.set(-0.1, 0, isLeft ? 0.45 : -0.45);

      // Main Stem
      const mainStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.85, 12), antlerMat);
      mainStem.position.set(0, 0.4, 0);
      antlerGroup.add(mainStem);

      // Front Branch
      const branch1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.45, 12), antlerMat);
      branch1.position.set(isLeft ? -0.15 : 0.15, 0.45, 0.15);
      branch1.rotation.set(0.4, 0, isLeft ? -0.6 : 0.6);
      antlerGroup.add(branch1);

      // Top Prongs
      const prong1 = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 12), antlerMat);
      prong1.position.set(isLeft ? 0.08 : -0.08, 0.85, 0);
      antlerGroup.add(prong1);

      return antlerGroup;
    };

    const leftAntler = createAntler(true);
    const rightAntler = createAntler(false);
    headGroup.add(leftAntler);
    headGroup.add(rightAntler);
    leftAntlerRef.current = leftAntler;
    rightAntlerRef.current = rightAntler;

    // 7. Fluffy Reindeer Ears
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(isLeft ? -0.75 : 0.75, 0.45, 0.1);
      earGroup.rotation.set(-0.2, 0, isLeft ? 0.55 : -0.55);

      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.65, 16), furMat);
      outer.scale.set(0.85, 1, 0.5);
      earGroup.add(outer);

      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 12), muzzleMat);
      inner.scale.set(0.75, 1, 0.35);
      inner.position.set(0, -0.05, 0.06);
      earGroup.add(inner);

      return earGroup;
    };

    const leftEar = createEar(true);
    const rightEar = createEar(false);
    headGroup.add(leftEar);
    headGroup.add(rightEar);
    leftEarRef.current = leftEar;
    rightEarRef.current = rightEar;

    // 8. Cute Hooves / Paws
    const hoofGeo = new THREE.SphereGeometry(0.24, 16, 16);
    hoofGeo.scale(1.1, 0.8, 1.2);
    const leftPaw = new THREE.Mesh(hoofGeo, hoofMat);
    leftPaw.position.set(-0.95, -0.4, 0.4);
    chopperGroup.add(leftPaw);

    const rightPaw = new THREE.Mesh(hoofGeo, hoofMat);
    rightPaw.position.set(0.95, -0.4, 0.4);
    chopperGroup.add(rightPaw);

    const leftFoot = new THREE.Mesh(hoofGeo, hoofMat);
    leftFoot.position.set(-0.45, -1.15, 0.25);
    chopperGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(hoofGeo, hoofMat);
    rightFoot.position.set(0.45, -1.15, 0.25);
    chopperGroup.add(rightFoot);

    // 9. Floating Sakura Petals (Drifting in the sea breeze)
    const petals = [];
    const petalGeo = new THREE.PlaneGeometry(0.18, 0.26);
    const petalMat = new THREE.MeshBasicMaterial({ color: 0xfb7185, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
    for (let i = 0; i < 18; i++) {
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      scene.add(petal);
      petals.push(petal);
    }
    sakuraPetalsRef.current = petals;

    // ==========================================
    // PROCEDURAL ANIMATION LOOP
    // ==========================================
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const mPos = mascotWorldPos.current;
      const sp = springPhysics.current;

      // Roaming logic across the living page
      if (!mPos.isDragging) {
        mPos.roamTimer += 0.016;
        if (mPos.roamTimer > 5.5) {
          mPos.roamTimer = 0;
          const rangeX = window.innerWidth > 1024 ? 3.0 : 1.6;
          mPos.targetX = (Math.random() - 0.5) * rangeX * 2;
          mPos.targetY = -0.3 + (Math.random() - 0.5) * 1.8;
        }
      }

      // Smooth Position Lerp
      mPos.x += (mPos.targetX - mPos.x) * 0.04;
      mPos.y += (mPos.targetY - mPos.y) * 0.04;
      mPos.z += (mPos.targetZ - mPos.z) * 0.04;

      // Floating bob & Chopper's Happy Shy Dance
      const floatOffset = Math.sin(time * 3.0) * 0.1;
      const danceOffset = isBlushingDance ? Math.sin(time * 12) * 0.3 : 0;
      chopperGroup.position.set(mPos.x + danceOffset, mPos.y + floatOffset, mPos.z);

      // Banking rotation
      const vx = mPos.targetX - mPos.x;
      chopperGroup.rotation.y = (isBlushingDance ? Math.sin(time * 10) * 0.5 : Math.sin(time * 1.5) * 0.12) + (vx * 0.35);
      chopperGroup.rotation.z = isBlushingDance ? Math.sin(time * 12) * 0.2 : -vx * 0.15;

      // 2D Screen Position for Floating Speech Bubble
      const screenV = new THREE.Vector3(mPos.x, mPos.y + 1.9 + floatOffset, mPos.z);
      screenV.project(camera);
      const screenX = ((screenV.x + 1) * width) / 2;
      const screenY = ((-screenV.y + 1) * height) / 2;
      setBubbleScreenPos({
        x: Math.max(120, Math.min(width - 120, screenX)),
        y: Math.max(80, Math.min(height - 120, screenY))
      });

      // Spring Physics
      sp.headBounceVel += (-sp.headBounce * 20 - sp.headBounceVel * 4) * 0.016;
      sp.headBounce += sp.headBounceVel * 0.016;

      sp.bodySquishVel += ((1 - sp.bodySquish) * 24 - sp.bodySquishVel * 5) * 0.016;
      sp.bodySquish += sp.bodySquishVel * 0.016;

      sp.earWiggleVel += (-sp.earWiggle * 28 - sp.earWiggleVel * 4) * 0.016;
      sp.earWiggle += sp.earWiggleVel * 0.016;

      // Blinking
      sp.blinkTimer += 0.016;
      if (sp.blinkTimer > 3.2 + Math.sin(time) * 1.5) {
        sp.isBlinking = true;
        if (sp.blinkTimer > 3.4) {
          sp.blinkTimer = 0;
          sp.isBlinking = false;
        }
      }

      // Breathing
      const breath = Math.sin(time * 3.5) * 0.035;
      if (bodyMeshRef.current) {
        bodyMeshRef.current.scale.set(1.0 + breath * 0.5, (1.15 + breath) * sp.bodySquish, 0.95 - breath * 0.3);
      }

      // Head cursor tracking
      if (headGroupRef.current) {
        const relMouseX = mouseScreenPos.current.normX - (mPos.x / 4);
        const relMouseY = mouseScreenPos.current.normY - (mPos.y / 3);
        headGroupRef.current.position.y = 0.85 + sp.headBounce + breath * 0.5;
        headGroupRef.current.rotation.y = relMouseX * 0.65;
        headGroupRef.current.rotation.x = -relMouseY * 0.45;
      }

      // Eye pupil tracking
      if (leftPupilRef.current && rightPupilRef.current) {
        const pupilX = mouseScreenPos.current.normX * 0.07;
        const pupilY = -mouseScreenPos.current.normY * 0.05;
        leftPupilRef.current.position.set(pupilX, pupilY, 0.18);
        rightPupilRef.current.position.set(pupilX, pupilY, 0.18);

        const blinkScaleY = sp.isBlinking ? 0.08 : 1;
        if (leftEyeRef.current) leftEyeRef.current.scale.set(1, blinkScaleY, 1);
        if (rightEyeRef.current) rightEyeRef.current.scale.set(1, blinkScaleY, 1);
      }

      // Ears & Antlers Twitch
      if (leftEarRef.current && rightEarRef.current) {
        leftEarRef.current.rotation.z = 0.55 + Math.sin(time * 4) * 0.08 + sp.earWiggle;
        rightEarRef.current.rotation.z = -0.55 - Math.sin(time * 4) * 0.08 - sp.earWiggle;
      }

      // Speech visemes
      if (mouthMeshRef.current) {
        if (isSpeaking) {
          const viseme = (Math.sin(time * 22) * 0.5 + 0.5) * 1.5;
          mouthMeshRef.current.scale.set(1.2 + viseme * 0.3, 0.6 + viseme * 1.2, 0.45);
          if (tongueMeshRef.current) tongueMeshRef.current.position.y = -0.06 + viseme * 0.04;
        } else {
          sp.jawOpen += (sp.mouthTarget - sp.jawOpen) * 0.15;
          mouthMeshRef.current.scale.set(1.2, 0.6 + sp.jawOpen * 0.8, 0.45);
        }
      }

      // Floating Sakura Petals
      sakuraPetalsRef.current.forEach((petal, idx) => {
        petal.position.x += Math.sin(time * 0.5 + idx) * 0.01 - 0.015;
        petal.position.y -= 0.012;
        petal.rotation.x += 0.02;
        petal.rotation.y += 0.03;
        if (petal.position.y < -5) petal.position.y = 5;
        if (petal.position.x < -7) petal.position.x = 7;
      });

      // Aura light follows Chopper
      if (auraLightRef.current) {
        auraLightRef.current.position.set(mPos.x, mPos.y + 0.5, mPos.z + 2);
        auraLightRef.current.intensity = 2.5 + Math.sin(time * 6) * 0.6 + sp.superchargeFactor * 4;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isSpeaking, isBlushingDance]);

  // Global mouse move & drag handling
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mouseScreenPos.current.normX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseScreenPos.current.normY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (mascotWorldPos.current.isDragging) {
        const aspect = window.innerWidth / window.innerHeight;
        mascotWorldPos.current.targetX = mouseScreenPos.current.normX * (aspect * 4.0);
        mascotWorldPos.current.targetY = mouseScreenPos.current.normY * 3.8;
      }
    };

    const handleGlobalMouseUp = () => {
      if (mascotWorldPos.current.isDragging) {
        mascotWorldPos.current.isDragging = false;
        springPhysics.current.bodySquish = 0.8;
        springPhysics.current.bodySquishVel = 12;
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Pick up Chopper
  const handleChopperMouseDown = (e) => {
    e.stopPropagation();
    mascotWorldPos.current.isDragging = true;
    playSoundEffect('giggle');
    springPhysics.current.bodySquish = 1.25;
    addXP(10);
    const line = CHOPPER_QUOTES.drag[Math.floor(Math.random() * CHOPPER_QUOTES.drag.length)];
    speakChopper(line);
  };

  // Pet Chopper -> Triggers his iconic happy shy blushing dance!
  const handlePetChopper = () => {
    setIsBlushingDance(true);
    playSoundEffect('cute_chirp');
    springPhysics.current.headBounce = 0.25;
    addXP(35);
    setGrowthEnergy((prev) => Math.min(100, prev + 15));

    confetti({
      particleCount: 40,
      spread: 80,
      origin: { x: bubbleScreenPos.x / window.innerWidth, y: bubbleScreenPos.y / window.innerHeight },
      colors: ['#f472b6', '#fbbf24', '#38bdf8']
    });

    const line = CHOPPER_QUOTES.pet[Math.floor(Math.random() * CHOPPER_QUOTES.pet.length)];
    speakChopper(line);
    setTimeout(() => setIsBlushingDance(false), 3500);
  };

  // Feed Cotton Candy
  const handleFeedCottonCandy = () => {
    playSoundEffect('giggle');
    springPhysics.current.headBounceVel = 18;
    addXP(50);
    setGrowthEnergy(100);

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#38bdf8', '#fbbf24']
    });

    const line = CHOPPER_QUOTES.cotton_candy[Math.floor(Math.random() * CHOPPER_QUOTES.cotton_candy.length)];
    speakChopper(line);
  };

  // Rumble Ball Transformation
  const handleRumbleBall = () => {
    playSoundEffect('rumble');
    springPhysics.current.superchargeFactor = 1;
    springPhysics.current.headBounceVel = 20;
    addXP(70);

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#00f2fe', '#ec4899']
    });

    const line = CHOPPER_QUOTES.rumble_ball[Math.floor(Math.random() * CHOPPER_QUOTES.rumble_ball.length)];
    speakChopper(line);
    setTimeout(() => {
      springPhysics.current.superchargeFactor = 0;
    }, 3000);
  };

  // Custom talk submit
  const handleCustomSpeechSubmit = (e) => {
    e.preventDefault();
    if (!customTalkText.trim()) return;
    speakChopper(customTalkText);
    setCustomTalkText('');
  };

  // Dynamic context-aware Chopper reactions when user plays with sliders!
  const handleSpendChange = (val) => {
    setMonthlySpend(val);
    if (Math.random() > 0.6) {
      if (val > 30000) {
        speakChopper(`WHOA! $${val.toLocaleString()}?! Are we buying the Thousand Sunny with that ad budget?! ⛵💰`);
      } else if (val < 5000) {
        speakChopper(`A lean budget of $${val.toLocaleString()}! Doctor Chopper will squeeze maximum ROAS out of every single Berry! 🩺`);
      }
    }
  };

  const handleAovChange = (val) => {
    setAov(val);
    if (Math.random() > 0.65) {
      speakChopper(`$${val} per order! Ka-ching! That's enough to buy a mountain of Cotton Candy! 🍭✨`);
    }
  };

  const handleCroChange = (val) => {
    setConversionRate(val);
    if (Math.random() > 0.65) {
      speakChopper(`${val}% conversion rate?! That's higher than the Knock Up Stream! We're sailing to the top of Google! 🌊🚀`);
    }
  };

  // ROI math
  const calculatedTraffic = Math.round(monthlySpend * 3.85);
  const calculatedConversions = Math.round(calculatedTraffic * (conversionRate / 100));
  const estimatedRevenue = Math.round(calculatedConversions * aov);
  const estimatedROAS = monthlySpend > 0 ? (estimatedRevenue / monthlySpend).toFixed(1) : 0;
  const netProfit = estimatedRevenue - monthlySpend;

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    playSoundEffect('cute_chirp');
    confetti({ particleCount: 80, spread: 100 });
    speakChopper("A new patient with low ROAS?! Stand back! Doctor Chopper's growth sprint will heal your business! 🩺💖");
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 selection:bg-pink-500 selection:text-black overflow-x-hidden font-sans pb-32">
      
      {/* ======================================================== */}
      {/* FULLSCREEN 3D CHOPPER CANVAS (LIVES ACROSS THE ENTIRE PAGE)*/}
      {/* ======================================================== */}
      <canvas 
        ref={fullCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Floating 2D Speech Bubble following Chopper */}
      <div 
        className="fixed z-30 pointer-events-none transition-all duration-150 -translate-x-1/2 -translate-y-full"
        style={{
          left: `${bubbleScreenPos.x}px`,
          top: `${bubbleScreenPos.y}px`,
        }}
      >
        <div className="max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl bg-gradient-to-r from-[#1e1b4b]/95 via-[#0f172a]/95 to-[#3b0764]/95 border-2 border-pink-400 text-pink-100 text-xs font-mono font-bold leading-tight shadow-[0_10px_35px_rgba(236,72,153,0.35)] backdrop-blur-xl text-center">
          <span>{speechBubble}</span>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-pink-400" />
        </div>
      </div>

      {/* Invisible Draggable Hitbox on Chopper */}
      <div
        onMouseDown={handleChopperMouseDown}
        onClick={handlePetChopper}
        title="Click & Drag TONY TONY CHOPPER!"
        className="fixed z-30 w-36 h-48 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing hover:bg-pink-400/10 rounded-full transition-colors pointer-events-auto"
        style={{
          left: `${bubbleScreenPos.x}px`,
          top: `${bubbleScreenPos.y + 110}px`,
        }}
      />

      {/* ======================================================== */}
      {/* THEME BACKGROUND: STRAW HAT SHIP (THOUSAND SUNNY) SCENERY */}
      {/* ======================================================== */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        
        {/* Sky Gradient matching Home Page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f244a] via-[#091833] to-[#020c1b]" />

        {/* Straw Hat Pirate Ship (Thousand Sunny / Going Merry Silhouette Sailing on Waves) */}
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-60">
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020c1b" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Distant Grand Line Island & Ocean Waves */}
          <path d="M-50 480 Q 250 380 600 450 T 1200 420 Q 1380 390 1500 480 L 1500 900 L -50 900 Z" fill="url(#oceanGrad)" />

          {/* STRAW HAT SHIP (THOUSAND SUNNY) SAILING */}
          <g transform="translate(180, 420) scale(0.65)">
            {/* Ship Hull */}
            <path d="M 0 60 Q 80 100 240 85 L 260 40 L 20 40 Z" fill="#78350f" stroke="#b45309" strokeWidth="4" />
            {/* Lion Figurehead / Sun Crest */}
            <circle cx="270" cy="35" r="24" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
            <circle cx="270" cy="35" r="14" fill="#f59e0b" />
            {/* Main Mast & Straw Hat Jolly Roger Sail */}
            <line x1="120" y1="40" x2="120" y2="-120" stroke="#451a03" strokeWidth="6" />
            <path d="M 30 -110 Q 120 -80 210 -110 L 195 -10 Q 120 15 45 -10 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            {/* Straw Hat Pirate Jolly Roger Skull */}
            <circle cx="120" cy="-55" r="16" fill="#0f172a" />
            <ellipse cx="120" cy="-68" rx="22" ry="6" fill="#fbbf24" />
            <rect x="110" y="-74" width="20" height="8" rx="3" fill="#fbbf24" />
            <rect x="110" y="-70" width="20" height="2" fill="#dc2626" />
            {/* Jolly Roger Crossed Bones */}
            <line x1="95" y1="-75" x2="145" y2="-35" stroke="#0f172a" strokeWidth="4" />
            <line x1="145" y1="-75" x2="95" y2="-35" stroke="#0f172a" strokeWidth="4" />
            {/* Ocean Wake Ripples */}
            <path d="M -20 75 Q 40 85 100 75 Q 160 85 220 75" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.7" />
          </g>

          {/* Drifting Cherry Blossom Petals from Drum Island */}
          {[120, 320, 560, 820, 1100, 1340].map((x, i) => (
            <circle key={i} cx={x} cy={180 + (i * 45) % 200} r="4" fill="#f472b6" opacity="0.6" />
          ))}
        </svg>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ======================================================== */}
        {/* TOP HERO & INTRO HEADER                                   */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-amber-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono font-bold mb-4 uppercase tracking-widest shadow-[0_0_25px_rgba(236,72,153,0.25)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>NAVRA GROWTH LAB // DOCTOR TONY TONY CHOPPER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans leading-tight">
            SCALE AT <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400">PIRATE-KING</span> VELOCITY
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            Meet <strong className="text-pink-300">Tony Tony Chopper</strong>, our Pirate Doctor of Digital Growth! Drag him around, feed him cotton candy, or watch him diagnose and scale your revenue funnels.
          </p>

          {/* Floating Action Pills (Cotton Candy, Rumble Ball, Pet) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleFeedCottonCandy}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-mono text-xs font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-1.5 cursor-pointer"
            >
              <Candy className="w-4 h-4 text-white" />
              <span>Feed Cotton Candy 🍭 (+50 XP)</span>
            </button>

            <button
              onClick={handleRumbleBall}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono text-xs font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-1.5 cursor-pointer"
            >
              <Pill className="w-4 h-4 text-white" />
              <span>Rumble Ball 💊 (Supercharge ROAS)</span>
            </button>

            <button
              onClick={handlePetChopper}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-white animate-pulse" />
              <span>Praise Chopper 🌸 (Happy Dance)</span>
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE ROI & GROWTH CALCULATOR                      */}
        {/* ======================================================== */}
        <div className="my-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2044]/95 via-[#08152e]/95 to-[#040b17]/95 border-2 border-cyan-400/50 shadow-[0_20px_60px_rgba(0,242,254,0.15)] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/15 pb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>CHOPPER'S REVENUE DIAGNOSIS SIMULATOR</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
                CALCULATE YOUR ESTIMATED REVENUE SCALING
              </h2>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-400 text-pink-300 text-xs font-mono font-bold w-max shadow-lg">
              ESTIMATED ROAS: <span className="text-xl text-white font-black">{estimatedROAS}x</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Monthly Ad Spend */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Monthly Ad Budget (Meta / Google / TikTok):</span>
                  <span className="text-cyan-300 font-black text-base">${monthlySpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="60000"
                  step="1000"
                  value={monthlySpend}
                  onChange={(e) => handleSpendChange(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>$1,000</span>
                  <span>$30,000</span>
                  <span>$60,000+ (Grand Line)</span>
                </div>
              </div>

              {/* AOV */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Average Order Value (AOV):</span>
                  <span className="text-amber-300 font-black text-base">${aov}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={aov}
                  onChange={(e) => handleAovChange(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>$20</span>
                  <span>$300</span>
                  <span>$600</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Optimized Conversion Rate (CRO):</span>
                  <span className="text-pink-300 font-black text-base">{conversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => handleCroChange(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>1.0% (Average)</span>
                  <span>3.5% (Optimized)</span>
                  <span>8.0% (Navra Funnel)</span>
                </div>
              </div>

            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 p-7 rounded-3xl bg-gradient-to-b from-[#091b38] to-[#040c1c] border-2 border-pink-400/40 flex flex-col justify-between space-y-5 shadow-2xl">
              <div className="space-y-3.5">
                <div className="flex justify-between text-xs font-mono text-slate-300 border-b border-white/10 pb-2.5">
                  <span>Projected Qualified Clicks</span>
                  <span className="text-white font-black">{calculatedTraffic.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-300 border-b border-white/10 pb-2.5">
                  <span>Estimated Customer Orders</span>
                  <span className="text-white font-black">{calculatedConversions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-emerald-300 border-b border-white/10 pb-2.5">
                  <span>Estimated Net Profit</span>
                  <span className="font-black text-sm">+${netProfit.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-300 block mb-1">Projected Gross Monthly Revenue</span>
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-300 to-white font-mono">
                    ${estimatedRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <a
                href="#consultation"
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-2xl text-center hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(236,72,153,0.3)]"
              >
                <span>Deploy This Growth Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* FULL-FUNNEL SERVICES                                     */}
        {/* ======================================================== */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
              DOCTOR CHOPPER'S GROWTH BLUEPRINT
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mt-1">
              FULL-FUNNEL GROWTH SERVICES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Paid Social */}
            <div 
              onClick={() => speakChopper("My Heavy Point ad creatives will crush Meta and TikTok algorithms! 🥊💥")}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-cyan-500/30 hover:border-pink-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mb-4 shadow-lg">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-2">Paid Social & Performance</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Algorithmic ad creatives on Meta, TikTok, and Google Ads designed with aggressive hooks and retention curves.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-cyan-300 font-bold">
                ★ +340% AVERAGE ROAS
              </div>
            </div>

            {/* Card 2: SEO */}
            <div 
              onClick={() => speakChopper("Brain Point activated! We found the secret high-volume keywords on Google! 🧠✨")}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-blue-500/30 hover:border-pink-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300 mb-4 shadow-lg">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-2">SEO & Organic Domination</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Technical SEO architecture, semantic keyword clusters, and programmatic indexing to rank #1 organically.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-blue-300 font-bold">
                ★ TOP 3 SEARCH POSITIONS
              </div>
            </div>

            {/* Card 3: CRO */}
            <div 
              onClick={() => speakChopper("Doctor Chopper diagnosis: Your checkout speed needs this Rumble Ball cure! 💊⚡")}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-emerald-500/30 hover:border-pink-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-4 shadow-lg">
                <Zap className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-2">CRO & Funnel Engineering</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Sub-second landing page speeds, A/B tested checkout flows, and psychology-backed conversion triggers.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-emerald-300 font-bold">
                ★ 2.8x HIGHER CONVERSIONS
              </div>
            </div>

            {/* Card 4: Viral UGC */}
            <div 
              onClick={() => speakChopper("Look at me, I'm a famous viral reindeer pirate! Let's make your brand viral! 🌸📹")}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-pink-500/30 hover:border-pink-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300 mb-4 shadow-lg">
                <Share2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-2">Viral UGC & Influencer Lab</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Direct creator whitelisting, viral reel scripting, and authentic creator testimonials that drive trust.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-pink-300 font-bold">
                ★ 4.2M+ ORGANIC VIEWS
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* CONSULTATION & DISPATCH INQUIRY FORM                     */}
        {/* ======================================================== */}
        <div id="consultation" className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a1e3f] to-[#040a17] border-2 border-pink-400/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                START A GROWTH SPRINT
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                SCALE YOUR REVENUE WITH NAVRA STUDIO
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
                Direct inquiries for performance marketing audits, funnel engineering, and algorithmic video campaigns.
              </p>
              <div className="pt-2 space-y-1.5 text-xs font-mono">
                <a href="mailto:harshjsh02@gmail.com" className="flex items-center gap-2 text-pink-300 font-bold hover:underline">
                  <Mail className="w-4 h-4" />
                  <span>harshjsh02@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Designed & Built by Harsh Joshi</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-black/60 border border-pink-400/40 rounded-3xl p-6 sm:p-8 shadow-inner">
              {formSubmitted ? (
                <div className="flex items-center justify-center p-6 text-center space-x-2 text-pink-300 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-6 h-6 text-pink-400" />
                  <span>GROWTH AUDIT DISPATCH TRANSMITTED // DOCTOR CHOPPER WILL REPLY IN 24H</span>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Your Name / Brand Name"
                      className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Business Email Address"
                      className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Current Website URL / Monthly Revenue Target..."
                    className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400 text-black font-black uppercase tracking-wider text-xs rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  >
                    <span>Request Free Digital Growth Audit</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
