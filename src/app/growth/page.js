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
  Award, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Mail, 
  Crown, 
  Glasses, 
  Headphones, 
  Flame, 
  MessageSquare, 
  DollarSign, 
  BarChart3, 
  Layers, 
  MousePointerClick, 
  RefreshCw, 
  Play, 
  Share2, 
  Trophy, 
  Heart, 
  Move, 
  Compass, 
  Feather,
  Stars,
  Radio,
  Eye
} from 'lucide-react';

const VOICELINES = {
  poke_head: [
    "Ouch! Careful with the fluff! Let's scale your CTR by 400% instead! 🚀",
    "Boink! You just activated my 10x viral algorithm mode! ✨",
    "Hey! That tickled my antennas! Ready to dominate Google Organic? 👑"
  ],
  poke_belly: [
    "Hehehe! Stop tickling! That's where we store our secret high-ROAS formulas! 💰",
    "Giggle! ROAS is super ticklish! Conversion rates are skyrocketing! 📈",
    "Hahaha! Keep tickling and we'll unlock the CMO Unicorn rank! 🦄"
  ],
  drag: [
    "Wheeeeee! Where are we flying next? Let's check the ROI calculator! 🌌",
    "Whoa! Flying across the page! Watch out for the conversion funnels! ✈️",
    "Hold tight! Navro is exploring new market territory! 🗺️"
  ],
  pet: [
    "Purrrrrr! ✨ Your engagement scores are through the roof! Loving this page!",
    "Awww yeah! Golden growth aura fully active! Inbound leads flowing in! 💖",
    "Purr... Maximum algorithmic favor achieved! Keep petting for +100 XP!"
  ],
  growth_potion: [
    "SLURP! 🧃 Growth Potion absorbed! +1,000% Marketing Superpower activated!",
    "SUPERCHARGED! ⚡ Meta and TikTok algorithms are giving us priority reach!",
    "POWER OVERWHELMING! 🌟 Paid ads ROAS hitting astronomical highs!"
  ],
  rocket: [
    "3... 2... 1... BLAST OFF! 🚀 Scaling your revenue straight past the stratosphere!",
    "HYPERSPEED ENGAGED! 🌌 Organic viral distribution breaking records!"
  ],
  slingshot: [
    "BULLSEYE! 🎯 Sniped 10,000 high-ticket buyers with zero ad spend waste!",
    "Surgical precision targeting locked! Cost per acquisition dropped by 65%!"
  ]
};

const GROWTH_LEVELS = [
  { level: 1, title: 'Ad Spend Explorer', xpRequired: 100 },
  { level: 2, title: 'CTR Alchemist', xpRequired: 250 },
  { level: 3, title: 'Funnel Sorcerer', xpRequired: 500 },
  { level: 4, title: 'Algorithm Whisperer', xpRequired: 850 },
  { level: 5, title: 'CMO Unicorn', xpRequired: 1300 },
];

export default function DigitalGrowthPage() {
  const fullCanvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Mascot UI state
  const [speechBubble, setSpeechBubble] = useState("Hey there, Legend! 🐾 I'm NAVRO! I live across this entire page! Drag me anywhere, pet me, or make me talk!");
  const [mascotXP, setMascotXP] = useState(160);
  const [growthEnergy, setGrowthEnergy] = useState(90);
  const [activeHat, setActiveHat] = useState('crown'); // 'crown', 'glasses', 'headphones', 'none'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customTalkText, setCustomTalkText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleScreenPos, setBubbleScreenPos] = useState({ x: 300, y: 300, visible: true });

  // ROI Calculator state
  const [monthlySpend, setMonthlySpend] = useState(8000);
  const [aov, setAov] = useState(150);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Three.js world refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const characterGroupRef = useRef(null);
  const headMeshRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const mouthMeshRef = useRef(null);
  const tongueMeshRef = useRef(null);
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);
  const tailMeshRef = useRef(null);
  const leftCheekRef = useRef(null);
  const rightCheekRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const crownMeshRef = useRef(null);
  const glassesMeshRef = useRef(null);
  const headphonesMeshRef = useRef(null);
  const auraLightRef = useRef(null);
  const orbitingStarsRef = useRef([]);

  // Free Roaming & Drag & Physics State
  const mascotWorldPos = useRef({
    x: 0,
    y: 0.5,
    z: 0,
    targetX: 0,
    targetY: 0.5,
    targetZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    vx: 0,
    vy: 0,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    mode: 'roam', // 'roam', 'follow', 'drag', 'flight'
    roamTimer: 0
  });

  const mouseScreenPos = useRef({ x: 0, y: 0, normX: 0, normY: 0 });
  const springPhysics = useRef({
    headBounce: 0,
    headBounceVel: 0,
    bodySquish: 1,
    bodySquishVel: 0,
    jawOpen: 0,
    mouthTarget: 0,
    earWiggle: 0,
    earWiggleVel: 0,
    superchargeFactor: 0,
    blinkTimer: 0,
    isBlinking: false
  });

  // Calculate level
  const currentLevelInfo = GROWTH_LEVELS.reduce((acc, curr) => {
    if (mascotXP >= curr.xpRequired) return curr;
    return acc;
  }, GROWTH_LEVELS[0]);

  const nextLevel = GROWTH_LEVELS.find(l => l.level === currentLevelInfo.level + 1) || currentLevelInfo;
  const xpProgress = Math.min(100, Math.round(((mascotXP - (GROWTH_LEVELS[currentLevelInfo.level - 1]?.xpRequired || 0)) / (nextLevel.xpRequired - (GROWTH_LEVELS[currentLevelInfo.level - 1]?.xpRequired || 0))) * 100));

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

      if (type === 'boing') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.28);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'giggle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.linearRampToValueAtTime(860, now + 0.08);
        osc.frequency.linearRampToValueAtTime(580, now + 0.15);
        osc.frequency.linearRampToValueAtTime(960, now + 0.22);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'purr') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(210, now + 0.1);
        osc.frequency.linearRampToValueAtTime(140, now + 0.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'powerup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Audio effect error:", e);
    }
  };

  // High-pitched speech synthesis
  const speakText = (text) => {
    setSpeechBubble(text);
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.95; // Squeaky Talking Tom pitch
    utterance.rate = 1.2;
    
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
  // FULLSCREEN THREE.JS 3D LIVING WORLD CANVAS
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
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0xfff1e6, 1.4);
    scene.add(ambientLight);

    const sunKey = new THREE.DirectionalLight(0xffb703, 3.8);
    sunKey.position.set(6, 6, 5);
    scene.add(sunKey);

    const cyanRim = new THREE.DirectionalLight(0x00f2fe, 4.2);
    cyanRim.position.set(-6, -2, -3);
    scene.add(cyanRim);

    const magentaFill = new THREE.PointLight(0xf43f5e, 2.5, 12);
    magentaFill.position.set(0, -3, 3);
    scene.add(magentaFill);

    const auraLight = new THREE.PointLight(0x38bdf8, 3.0, 8);
    auraLight.position.set(0, 0.5, 2);
    scene.add(auraLight);
    auraLightRef.current = auraLight;

    // 3D Master Character Group
    const charGroup = new THREE.Group();
    charGroup.scale.set(0.85, 0.85, 0.85);
    scene.add(charGroup);
    characterGroupRef.current = charGroup;

    // Materials Palette (Velvet / Claymorphism)
    const primaryFurMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9, // Electric Sky Cyan Fur
      roughness: 0.3,
      metalness: 0.12,
    });

    const warmChestMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5, // Soft Cream Belly
      roughness: 0.45,
      metalness: 0.05
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0xd97706,
      emissiveIntensity: 0.4
    });

    const pinkEarMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.5,
      metalness: 0.1
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050b14 });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 1. Chubby Body
    const bodyGeo = new THREE.SphereGeometry(1.08, 36, 36);
    bodyGeo.scale(1.02, 1.22, 0.96);
    const bodyMesh = new THREE.Mesh(bodyGeo, primaryFurMat);
    bodyMesh.position.set(0, -0.35, 0);
    charGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // Belly Patch
    const bellyGeo = new THREE.SphereGeometry(0.78, 32, 32);
    bellyGeo.scale(0.9, 1.05, 0.55);
    const bellyMesh = new THREE.Mesh(bellyGeo, warmChestMat);
    bellyMesh.position.set(0, -0.3, 0.52);
    charGroup.add(bellyMesh);

    // Glowing Chest Core Emblem
    const emblemGeo = new THREE.TorusGeometry(0.22, 0.045, 16, 32);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 1.4
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.position.set(0, 0.12, 0.86);
    charGroup.add(emblemMesh);

    // 2. Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.18, 0);
    charGroup.add(headGroup);
    headMeshRef.current = headGroup;

    const headGeo = new THREE.SphereGeometry(0.98, 36, 36);
    headGeo.scale(1.18, 1.04, 1.06);
    const headMesh = new THREE.Mesh(headGeo, primaryFurMat);
    headGroup.add(headMesh);

    // Soft Muzzle & Nose
    const muzzleGeo = new THREE.SphereGeometry(0.48, 24, 24);
    muzzleGeo.scale(1.05, 0.72, 0.7);
    const muzzleMesh = new THREE.Mesh(muzzleGeo, warmChestMat);
    muzzleMesh.position.set(0, -0.22, 0.72);
    headGroup.add(muzzleMesh);

    const noseGeo = new THREE.SphereGeometry(0.1, 16, 16);
    noseGeo.scale(1.2, 0.8, 0.9);
    const noseMesh = new THREE.Mesh(noseGeo, new THREE.MeshBasicMaterial({ color: 0x030712 }));
    noseMesh.position.set(0, -0.08, 1.08);
    headGroup.add(noseMesh);

    // Blush Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const cheekMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.65 });
    const leftCheek = new THREE.Mesh(cheekGeo, cheekMat);
    leftCheek.position.set(-0.68, -0.16, 0.78);
    headGroup.add(leftCheek);
    leftCheekRef.current = leftCheek;

    const rightCheek = new THREE.Mesh(cheekGeo, cheekMat);
    rightCheek.position.set(0.68, -0.16, 0.78);
    headGroup.add(rightCheek);
    rightCheekRef.current = rightCheek;

    // 3. Anime Eyes with Star Sparkles
    const createEye = (isLeft) => {
      const eyeContainer = new THREE.Group();
      eyeContainer.position.set(isLeft ? -0.4 : 0.4, 0.16, 0.82);

      const whiteGeo = new THREE.SphereGeometry(0.34, 32, 32);
      whiteGeo.scale(1, 1.18, 0.6);
      const whiteMesh = new THREE.Mesh(whiteGeo, eyeWhiteMat);
      eyeContainer.add(whiteMesh);

      const irisGeo = new THREE.SphereGeometry(0.22, 24, 24);
      irisGeo.scale(1, 1.15, 0.3);
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.position.set(0, 0, 0.18);
      eyeContainer.add(irisMesh);

      const pupilGeo = new THREE.SphereGeometry(0.13, 16, 16);
      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
      pupilMesh.position.set(0, 0, 0.23);
      eyeContainer.add(pupilMesh);

      const glint1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), glintMat);
      glint1.position.set(0.06, 0.08, 0.27);
      eyeContainer.add(glint1);

      const glint2 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), glintMat);
      glint2.position.set(-0.06, -0.06, 0.27);
      eyeContainer.add(glint2);

      return { container: eyeContainer, iris: irisMesh, pupil: pupilMesh };
    };

    const leftEye = createEye(true);
    const rightEye = createEye(false);
    headGroup.add(leftEye.container);
    headGroup.add(rightEye.container);
    leftEyeRef.current = leftEye.container;
    rightEyeRef.current = rightEye.container;
    leftPupilRef.current = leftEye.pupil;
    rightPupilRef.current = rightEye.pupil;

    // 4. Smiling Mouth & Tongue
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.34, 0.9);
    headGroup.add(mouthGroup);
    mouthMeshRef.current = mouthGroup;

    const mouthCavityGeo = new THREE.SphereGeometry(0.24, 24, 24);
    mouthCavityGeo.scale(1.2, 0.6, 0.45);
    const mouthCavity = new THREE.Mesh(mouthCavityGeo, new THREE.MeshBasicMaterial({ color: 0x1f0910 }));
    mouthGroup.add(mouthCavity);

    const tongueGeo = new THREE.SphereGeometry(0.14, 16, 16);
    tongueGeo.scale(1.1, 0.4, 0.8);
    const tongueMesh = new THREE.Mesh(tongueGeo, new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
    tongueMesh.position.set(0, -0.06, 0.06);
    mouthGroup.add(tongueMesh);
    tongueMeshRef.current = tongueMesh;

    // 5. Fluffy Ears
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(isLeft ? -0.68 : 0.68, 0.95, 0.1);
      earGroup.rotation.set(-0.15, 0, isLeft ? 0.48 : -0.48);

      const outerGeo = new THREE.ConeGeometry(0.38, 0.78, 20);
      outerGeo.scale(0.85, 1, 0.55);
      const outerEar = new THREE.Mesh(outerGeo, primaryFurMat);
      earGroup.add(outerEar);

      const innerGeo = new THREE.ConeGeometry(0.26, 0.58, 16);
      innerGeo.scale(0.75, 1, 0.4);
      const innerEar = new THREE.Mesh(innerGeo, pinkEarMat);
      innerEar.position.set(0, -0.05, 0.08);
      earGroup.add(innerEar);

      return earGroup;
    };

    const leftEar = createEar(true);
    const rightEar = createEar(false);
    headGroup.add(leftEar);
    headGroup.add(rightEar);
    leftEarRef.current = leftEar;
    rightEarRef.current = rightEar;

    // 6. Tail with Gold Tip
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.9, -0.7);
    const tailGeo = new THREE.SphereGeometry(0.42, 24, 24);
    tailGeo.scale(0.9, 1.4, 0.9);
    const tailMesh = new THREE.Mesh(tailGeo, primaryFurMat);
    tailMesh.rotation.set(0.6, 0, 0);
    tailGroup.add(tailMesh);

    const tipMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), goldMat);
    tipMesh.position.set(0, 0.45, 0.2);
    tailGroup.add(tipMesh);

    charGroup.add(tailGroup);
    tailMeshRef.current = tailGroup;

    // 7. Paws
    const pawGeo = new THREE.SphereGeometry(0.32, 20, 20);
    pawGeo.scale(1.15, 0.85, 1.25);
    const leftPaw = new THREE.Mesh(pawGeo, primaryFurMat);
    leftPaw.position.set(-1.18, -0.4, 0.45);
    charGroup.add(leftPaw);

    const rightPaw = new THREE.Mesh(pawGeo, primaryFurMat);
    rightPaw.position.set(1.18, -0.4, 0.45);
    charGroup.add(rightPaw);

    const footGeo = new THREE.SphereGeometry(0.38, 20, 20);
    footGeo.scale(1.1, 0.75, 1.4);
    const leftFoot = new THREE.Mesh(footGeo, primaryFurMat);
    leftFoot.position.set(-0.58, -1.65, 0.35);
    charGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, primaryFurMat);
    rightFoot.position.set(0.58, -1.65, 0.35);
    charGroup.add(rightFoot);

    // 8. Costumes
    // Crown
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.08, 0.1);
    const crownRing = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.36, 0.22, 16, 1, true), goldMat);
    crownGroup.add(crownRing);
    for (let i = 0; i < 5; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.28, 8), goldMat);
      const ang = (i / 5) * Math.PI * 2;
      cone.position.set(Math.sin(ang) * 0.4, 0.22, Math.cos(ang) * 0.4);
      crownGroup.add(cone);
    }
    headGroup.add(crownGroup);
    crownMeshRef.current = crownGroup;

    // Glasses
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.18, 0.98);
    const visorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.32, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.8, metalness: 0.9 })
    );
    glassesGroup.add(visorMesh);
    headGroup.add(glassesGroup);
    glassesMeshRef.current = glassesGroup;
    glassesGroup.visible = false;

    // Headphones
    const headphonesGroup = new THREE.Group();
    headphonesGroup.position.set(0, 0.3, 0);
    const bandMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.02, 0.07, 12, 32, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8 })
    );
    bandMesh.rotation.set(Math.PI, 0, 0);
    bandMesh.position.set(0, 0.35, 0);
    headphonesGroup.add(bandMesh);

    const cupMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x9333ea, emissiveIntensity: 0.4 });
    const leftCup = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16), cupMat);
    leftCup.rotateZ(Math.PI / 2);
    leftCup.position.set(-1.08, 0.12, 0);
    const rightCup = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16), cupMat);
    rightCup.rotateZ(Math.PI / 2);
    rightCup.position.set(1.08, 0.12, 0);
    headphonesGroup.add(leftCup);
    headphonesGroup.add(rightCup);
    headGroup.add(headphonesGroup);
    headphonesMeshRef.current = headphonesGroup;
    headphonesGroup.visible = false;

    // 9. Orbiting Floating Stars / Coins
    const stars = [];
    const starGeo = new THREE.OctahedronGeometry(0.14, 0);
    for (let i = 0; i < 5; i++) {
      const star = new THREE.Mesh(starGeo, goldMat);
      scene.add(star);
      stars.push(star);
    }
    orbitingStarsRef.current = stars;

    // ==========================================
    // PROCEDURAL LIVING WORLD ANIMATION LOOP
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const mPos = mascotWorldPos.current;
      const sp = springPhysics.current;

      // AUTONOMOUS ROAMING LOGIC (Lives in its own world on the page!)
      if (!mPos.isDragging) {
        mPos.roamTimer += 0.016;
        if (mPos.roamTimer > 4.5) {
          mPos.roamTimer = 0;
          // Pick a fun spot on the page (scaled to 3D world coordinates)
          const rangeX = (window.innerWidth > 1024 ? 3.2 : 1.8);
          mPos.targetX = (Math.random() - 0.5) * rangeX * 2;
          mPos.targetY = -0.5 + (Math.random() - 0.5) * 2.2;
        }
      }

      // Smooth World Position Lerp
      mPos.x += (mPos.targetX - mPos.x) * 0.05;
      mPos.y += (mPos.targetY - mPos.y) * 0.05;
      mPos.z += (mPos.targetZ - mPos.z) * 0.05;

      // Gentle floating bob
      const floatOffset = Math.sin(time * 2.8) * 0.12;
      charGroup.position.set(mPos.x, mPos.y + floatOffset, mPos.z);

      // Banking rotation when moving
      const vx = mPos.targetX - mPos.x;
      charGroup.rotation.y = Math.sin(time * 1.5) * 0.15 + (vx * 0.4);
      charGroup.rotation.z = -vx * 0.2;

      // Calculate 2D Screen Position for Floating Speech Bubble
      const screenV = new THREE.Vector3(mPos.x, mPos.y + 1.8 + floatOffset, mPos.z);
      screenV.project(camera);
      const screenX = ((screenV.x + 1) * width) / 2;
      const screenY = ((-screenV.y + 1) * height) / 2;
      setBubbleScreenPos({
        x: Math.max(120, Math.min(width - 120, screenX)),
        y: Math.max(80, Math.min(height - 120, screenY)),
        visible: true
      });

      // Spring Physics Updates
      sp.headBounceVel += (-sp.headBounce * 20 - sp.headBounceVel * 4) * 0.016;
      sp.headBounce += sp.headBounceVel * 0.016;

      sp.bodySquishVel += ((1 - sp.bodySquish) * 24 - sp.bodySquishVel * 5) * 0.016;
      sp.bodySquish += sp.bodySquishVel * 0.016;

      sp.earWiggleVel += (-sp.earWiggle * 28 - sp.earWiggleVel * 4) * 0.016;
      sp.earWiggle += sp.earWiggleVel * 0.016;

      // Natural Blinking
      sp.blinkTimer += 0.016;
      if (sp.blinkTimer > 3.5 + Math.sin(time) * 1.5) {
        sp.isBlinking = true;
        if (sp.blinkTimer > 3.7) {
          sp.blinkTimer = 0;
          sp.isBlinking = false;
        }
      }

      // Breathing
      const breath = Math.sin(time * 3.2) * 0.04;
      if (bodyMeshRef.current) {
        bodyMeshRef.current.scale.set(1.02 + breath * 0.6, (1.22 + breath) * sp.bodySquish, 0.96 - breath * 0.4);
      }

      // Head cursor tracking (relative to mascot position)
      if (headMeshRef.current) {
        const relMouseX = mouseScreenPos.current.normX - (mPos.x / 4);
        const relMouseY = mouseScreenPos.current.normY - (mPos.y / 3);
        headMeshRef.current.position.y = 1.18 + sp.headBounce + breath * 0.6;
        headMeshRef.current.rotation.y = relMouseX * 0.65;
        headMeshRef.current.rotation.x = -relMouseY * 0.45;
        headMeshRef.current.rotation.z = Math.sin(time * 2) * 0.03 + sp.headBounce * 0.4;
      }

      // Eye pupil tracking & blinking
      if (leftPupilRef.current && rightPupilRef.current) {
        const pupilX = mouseScreenPos.current.normX * 0.08;
        const pupilY = -mouseScreenPos.current.normY * 0.06;
        leftPupilRef.current.position.set(pupilX, pupilY, 0.23);
        rightPupilRef.current.position.set(pupilX, pupilY, 0.23);

        const blinkScaleY = sp.isBlinking ? 0.08 : 1;
        if (leftEyeRef.current) leftEyeRef.current.scale.set(1, blinkScaleY, 1);
        if (rightEyeRef.current) rightEyeRef.current.scale.set(1, blinkScaleY, 1);
      }

      // Ears & Tail
      if (leftEarRef.current && rightEarRef.current) {
        leftEarRef.current.rotation.z = 0.48 + Math.sin(time * 4) * 0.08 + sp.earWiggle;
        rightEarRef.current.rotation.z = -0.48 - Math.sin(time * 4) * 0.08 - sp.earWiggle;
      }

      if (tailMeshRef.current) {
        tailMeshRef.current.rotation.y = Math.sin(time * 5) * 0.5;
        tailMeshRef.current.rotation.z = Math.sin(time * 2.5) * 0.25;
      }

      // Speech visemes
      if (mouthMeshRef.current) {
        if (isSpeaking) {
          const viseme = (Math.sin(time * 20) * 0.5 + 0.5) * 1.6;
          mouthMeshRef.current.scale.set(1.2 + viseme * 0.4, 0.6 + viseme * 1.3, 0.45);
          if (tongueMeshRef.current) tongueMeshRef.current.position.y = -0.06 + viseme * 0.04;
        } else {
          sp.jawOpen += (sp.mouthTarget - sp.jawOpen) * 0.15;
          mouthMeshRef.current.scale.set(1.2, 0.6 + sp.jawOpen * 0.8, 0.45);
        }
      }

      // Orbiting Stars
      orbitingStarsRef.current.forEach((star, idx) => {
        const offset = (idx / orbitingStarsRef.current.length) * Math.PI * 2;
        const orbitRadius = 1.7 + Math.sin(time * 2 + idx) * 0.2;
        star.position.x = mPos.x + Math.sin(time * 1.6 + offset) * orbitRadius;
        star.position.z = mPos.z + Math.cos(time * 1.6 + offset) * orbitRadius;
        star.position.y = mPos.y + floatOffset + 0.2 + Math.sin(time * 3 + offset) * 0.4;
        star.rotation.y += 0.05;
        star.rotation.x += 0.03;
      });

      // Aura light tracks mascot
      if (auraLightRef.current) {
        auraLightRef.current.position.set(mPos.x, mPos.y + 0.5, mPos.z + 2);
        auraLightRef.current.intensity = 3.0 + Math.sin(time * 6) * 0.8 + sp.superchargeFactor * 5;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isSpeaking]);

  // Handle Hat changes
  useEffect(() => {
    if (crownMeshRef.current) crownMeshRef.current.visible = activeHat === 'crown';
    if (glassesMeshRef.current) glassesMeshRef.current.visible = activeHat === 'glasses';
    if (headphonesMeshRef.current) headphonesMeshRef.current.visible = activeHat === 'headphones';
  }, [activeHat]);

  // Global mouse move & drag handling across the entire page
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mouseScreenPos.current.x = e.clientX;
      mouseScreenPos.current.y = e.clientY;
      mouseScreenPos.current.normX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseScreenPos.current.normY = -(e.clientY / window.innerHeight) * 2 + 1;

      // If dragging mascot
      if (mascotWorldPos.current.isDragging) {
        const aspect = window.innerWidth / window.innerHeight;
        const targetWorldX = mouseScreenPos.current.normX * (aspect * 4.2);
        const targetWorldY = mouseScreenPos.current.normY * 4.0;
        mascotWorldPos.current.targetX = targetWorldX;
        mascotWorldPos.current.targetY = targetWorldY;
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

  // Direct Pick Up & Drag Mascot
  const handleMascotMouseDown = (e) => {
    e.stopPropagation();
    mascotWorldPos.current.isDragging = true;
    playSoundEffect('giggle');
    springPhysics.current.bodySquish = 1.25;
    addXP(10);
    const line = VOICELINES.drag[Math.floor(Math.random() * VOICELINES.drag.length)];
    speakText(line);
  };

  // Direct Tap Head
  const handlePokeHead = () => {
    playSoundEffect('boing');
    springPhysics.current.headBounceVel = -16;
    springPhysics.current.earWiggleVel = 20;
    addXP(20);
    setGrowthEnergy((prev) => Math.min(100, prev + 5));

    const line = VOICELINES.poke_head[Math.floor(Math.random() * VOICELINES.poke_head.length)];
    speakText(line);
  };

  // Direct Tap Belly
  const handlePokeBelly = () => {
    playSoundEffect('giggle');
    springPhysics.current.bodySquish = 0.7;
    springPhysics.current.bodySquishVel = 12;
    addXP(25);
    setGrowthEnergy((prev) => Math.min(100, prev + 8));

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x: bubbleScreenPos.x / window.innerWidth, y: bubbleScreenPos.y / window.innerHeight },
      colors: ['#fbbf24', '#00f2fe', '#f43f5e']
    });

    const line = VOICELINES.poke_belly[Math.floor(Math.random() * VOICELINES.poke_belly.length)];
    speakText(line);
  };

  // Pet Mascot
  const handlePetMascot = () => {
    playSoundEffect('purr');
    springPhysics.current.bodySquish = 0.88;
    springPhysics.current.headBounce = 0.22;
    addXP(30);
    setGrowthEnergy((prev) => Math.min(100, prev + 15));

    const line = VOICELINES.pet[Math.floor(Math.random() * VOICELINES.pet.length)];
    speakText(line);
  };

  // Action: Feed Growth Juice
  const handleFeedPotion = () => {
    playSoundEffect('powerup');
    springPhysics.current.superchargeFactor = 1;
    springPhysics.current.headBounceVel = 16;
    addXP(60);
    setGrowthEnergy(100);

    // Fly in loop!
    mascotWorldPos.current.targetY = 2.0;
    setTimeout(() => {
      mascotWorldPos.current.targetY = -0.5;
    }, 1200);

    confetti({
      particleCount: 90,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#00f2fe', '#38bdf8', '#fbbf24', '#f43f5e']
    });

    const line = VOICELINES.growth_potion[Math.floor(Math.random() * VOICELINES.growth_potion.length)];
    speakText(line);
    setTimeout(() => {
      springPhysics.current.superchargeFactor = 0;
    }, 3000);
  };

  // Action: Launch Rocket
  const handleLaunchRocket = () => {
    playSoundEffect('boing');
    springPhysics.current.headBounceVel = 20;
    addXP(40);

    mascotWorldPos.current.targetY = 3.5;
    setTimeout(() => {
      mascotWorldPos.current.targetY = 0.5;
    }, 1500);

    confetti({
      particleCount: 100,
      angle: 90,
      spread: 80,
      origin: { y: 0.8 }
    });

    const line = VOICELINES.rocket[Math.floor(Math.random() * VOICELINES.rocket.length)];
    speakText(line);
  };

  // Action: Ad Slingshot
  const handleAdSlingshot = () => {
    playSoundEffect('boing');
    springPhysics.current.earWiggleVel = -25;
    addXP(35);

    const line = VOICELINES.slingshot[Math.floor(Math.random() * VOICELINES.slingshot.length)];
    speakText(line);
  };

  // Summon Mascot to Center Viewport
  const handleSummonMascot = () => {
    mascotWorldPos.current.targetX = 0;
    mascotWorldPos.current.targetY = 0;
    playSoundEffect('boing');
    speakText("I'm right here with you! Let's conquer the market! 🐾✨");
  };

  // Custom speech input
  const handleCustomSpeechSubmit = (e) => {
    e.preventDefault();
    if (!customTalkText.trim()) return;
    speakText(customTalkText);
    setCustomTalkText('');
  };

  // ROI Calculator
  const calculatedTraffic = Math.round(monthlySpend * 3.85);
  const calculatedConversions = Math.round(calculatedTraffic * (conversionRate / 100));
  const estimatedRevenue = Math.round(calculatedConversions * aov);
  const estimatedROAS = monthlySpend > 0 ? (estimatedRevenue / monthlySpend).toFixed(1) : 0;
  const netProfit = estimatedRevenue - monthlySpend;

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    playSoundEffect('powerup');
    confetti({ particleCount: 80, spread: 100 });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans pb-32">
      
      {/* ======================================================== */}
      {/* FULLSCREEN LIVING WORLD 3D CANVAS OVERLAY (NO BOX/FRAME) */}
      {/* ======================================================== */}
      <canvas 
        ref={fullCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Floating 2D Speech Bubble that tracks Navro everywhere */}
      <div 
        className="fixed z-30 pointer-events-none transition-all duration-150 -translate-x-1/2 -translate-y-full"
        style={{
          left: `${bubbleScreenPos.x}px`,
          top: `${bubbleScreenPos.y}px`,
        }}
      >
        <div className="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0e254d]/95 via-[#0a1c3d]/95 to-[#132c57]/95 border-2 border-cyan-400 text-cyan-200 text-xs font-mono font-bold leading-tight shadow-[0_10px_35px_rgba(0,242,254,0.35)] backdrop-blur-xl text-center">
          <span>{speechBubble}</span>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-cyan-400" />
        </div>
      </div>

      {/* Invisible Draggable Hitbox that follows Mascot */}
      <div
        onMouseDown={handleMascotMouseDown}
        onClick={handlePokeBelly}
        title="Click & Drag NAVRO anywhere!"
        className="fixed z-30 w-36 h-48 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing hover:bg-cyan-400/5 rounded-full transition-colors pointer-events-auto"
        style={{
          left: `${bubbleScreenPos.x}px`,
          top: `${bubbleScreenPos.y + 120}px`,
        }}
      />

      {/* Dynamic Ambient Background Nebulas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-transparent rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/15 via-cyan-500/10 to-transparent rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ======================================================== */}
        {/* TOP HERO & INTRO HEADER (VIBRANT COLORS)                 */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-amber-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold mb-4 uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>NAVRA DIGITAL GROWTH // LIVING 3D MASCOT WORLD</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans leading-tight">
            SCALE AT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400">UNPRECEDENTED</span> VELOCITY
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            Meet <strong className="text-cyan-300">NAVRO</strong>, our living growth mascot roaming this page. Drag him around, pet him, test conversion funnels, and watch your business scale.
          </p>

          {/* Gamified Level & XP Banner */}
          <div className="mt-6 inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#091833]/90 border border-cyan-400/40 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300">LEVEL {currentLevelInfo.level}:</span>
              <span className="text-white uppercase">{currentLevelInfo.title}</span>
            </div>
            <div className="w-32 h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/20 p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 transition-all duration-500" style={{ width: `${xpProgress}%` }} />
            </div>
            <span className="text-[11px] font-mono text-cyan-300 font-bold">{mascotXP} XP</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* MASCOT COMPANION CONTROL DOCK (FLOATING PLAYGROUND)      */}
        {/* ======================================================== */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c2044]/90 via-[#08152e]/90 to-[#040b17]/90 border-2 border-cyan-400/40 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>NAVRO'S INTERACTIVE PLAYGROUND DOCK</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                INTERACT, DRESS UP & MAKE HIM TALK
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSummonMascot}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Move className="w-3.5 h-3.5" />
                <span>Summon to Center</span>
              </button>

              <button
                onClick={handlePetMascot}
                className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400 text-rose-300 font-mono text-xs font-bold hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Pet Navro (+30 XP)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Wardrobe Selector */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase block mb-3">
                👑 Costume & Hats:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveHat('crown')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeHat === 'crown' 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>ROI Crown</span>
                </button>

                <button
                  onClick={() => setActiveHat('glasses')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeHat === 'glasses' 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Glasses className="w-4 h-4 text-cyan-400" />
                  <span>Cyber Shades</span>
                </button>

                <button
                  onClick={() => setActiveHat('headphones')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeHat === 'headphones' 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-4 h-4 text-purple-400" />
                  <span>DJ Headset</span>
                </button>

                <button
                  onClick={() => setActiveHat('none')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeHat === 'none' 
                      ? 'bg-white/20 border-white text-white' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smile className="w-4 h-4 text-slate-300" />
                  <span>Natural Fluff</span>
                </button>
              </div>
            </div>

            {/* Actions: Potion, Rocket, Slingshot */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase block mb-3">
                ⚡ Growth Superpowers:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleFeedPotion}
                  className="p-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400 hover:text-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Feed Potion</span>
                </button>

                <button
                  onClick={handleLaunchRocket}
                  className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  <span>Launch Rocket</span>
                </button>

                <button
                  onClick={handleAdSlingshot}
                  className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-400 hover:text-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Ad Slingshot</span>
                </button>
              </div>
            </div>

            {/* Voice Box Input */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase block mb-2">
                🎙️ Make Navro Speak:
              </span>
              <form onSubmit={handleCustomSpeechSubmit} className="space-y-2">
                <input
                  type="text"
                  value={customTalkText}
                  onChange={(e) => setCustomTalkText(e.target.value)}
                  placeholder="e.g. 10x ROAS scaling mode!"
                  className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl text-xs font-mono font-bold text-black uppercase hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Make Him Talk (High-Pitch)</span>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE ROI & GROWTH CALCULATOR (COLORFUL THEME)     */}
        {/* ======================================================== */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2044] via-[#08152e] to-[#040b17] border-2 border-cyan-400/50 shadow-[0_20px_60px_rgba(0,242,254,0.15)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/15 pb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>REAL-TIME PERFORMANCE SIMULATOR</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
                CALCULATE YOUR ESTIMATED REVENUE SCALING
              </h2>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold w-max shadow-lg">
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
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>$1,000</span>
                  <span>$30,000</span>
                  <span>$60,000+</span>
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
                  onChange={(e) => setAov(Number(e.target.value))}
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
                  <span className="text-emerald-300 font-black text-base">{conversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>1.0% (Generic Store)</span>
                  <span>3.5% (Optimized)</span>
                  <span>8.0% (Navra Funnel)</span>
                </div>
              </div>

            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 p-7 rounded-3xl bg-gradient-to-b from-[#091b38] to-[#040c1c] border-2 border-cyan-400/40 flex flex-col justify-between space-y-5 shadow-2xl">
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
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-300 to-white font-mono">
                    ${estimatedRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <a
                href="#consultation"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-black font-mono font-black text-xs uppercase tracking-wider rounded-2xl text-center hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(6,182,212,0.3)]"
              >
                <span>Deploy This Growth Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* FULL-FUNNEL GROWTH SERVICES (COLORFUL CARDS)             */}
        {/* ======================================================== */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
              SYSTEMATIC SCALING BLUEPRINT
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mt-1">
              FULL-FUNNEL GROWTH SERVICES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Paid Social */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-cyan-500/30 hover:border-cyan-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl">
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
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-blue-500/30 hover:border-blue-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl">
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
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-emerald-500/30 hover:border-emerald-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl">
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
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0e2142]/90 to-[#071328]/90 border-2 border-pink-500/30 hover:border-pink-400 hover:scale-105 transition-all group backdrop-blur-xl shadow-xl">
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
        <div id="consultation" className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a1e3f] to-[#040a17] border-2 border-cyan-400/50 shadow-2xl">
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
                <a href="mailto:harshjsh02@gmail.com" className="flex items-center gap-2 text-cyan-300 font-bold hover:underline">
                  <Mail className="w-4 h-4" />
                  <span>harshjsh02@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Designed & Built by Harsh Joshi</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-black/60 border border-cyan-400/40 rounded-3xl p-6 sm:p-8 shadow-inner">
              {formSubmitted ? (
                <div className="flex items-center justify-center p-6 text-center space-x-2 text-cyan-300 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  <span>GROWTH AUDIT DISPATCH TRANSMITTED // BUREAU WILL REPLY IN 24H</span>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Your Name / Brand Name"
                      className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Business Email Address"
                      className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Current Website URL / Monthly Revenue Target..."
                    className="w-full px-4 py-3 bg-[#08152e] border border-white/15 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 text-black font-black uppercase tracking-wider text-xs rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.4)]"
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
