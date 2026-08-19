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
  Share2
} from 'lucide-react';

const VOICELINES = {
  poke_head: [
    "Ouch! Watch the hair! Let's optimize your CTR instead!",
    "Hey! That tickles my neural networks! +500% ROI incoming!",
    "Boink! You just activated our 10x algorithmic scaling mode!"
  ],
  poke_belly: [
    "Hehehe! ROAS is super ticklish! Conversions are shooting up!",
    "Giggle! That's where we store the secret viral marketing juice!",
    "Hahaha! Stop tickling and start spending ad budget profitably!"
  ],
  poke_foot: [
    "Oof! Hitting the ground running with 50,000 organic clicks!",
    "Hop hop! We're sprinting up Google Search Rank #1!",
    "Quick step! Retargeting funnel just locked in 4.8x ROAS!"
  ],
  pet: [
    "Purrr! Your digital growth score is through the roof!",
    "Aww yeah! Maximum audience engagement unlocked! Keep petting!",
    "Golden aura active! High-ticket leads flowing in automatically!"
  ],
  growth_juice: [
    "GULP! That Growth Potion gave me +1000% Marketing Power!",
    "SUPERCHARGED! Meta and Google Algorithms are bowing before us!",
    "ELECTRIFYING! Conversion rates just doubled across all funnels!"
  ],
  slingshot: [
    "BULLS-EYE! Sniped 10,000 high-intent buyers with zero ad waste!",
    "Target locked! Paid social funnel running with surgical precision!"
  ],
  rocket: [
    "3... 2... 1... BLAST OFF! Scaling revenue straight to the moon!",
    "HYPERSPEED! Organic reach breaking the sound barrier!"
  ]
};

export default function DigitalGrowthPage() {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Character state
  const [characterMood, setCharacterMood] = useState('happy'); // 'happy', 'talking', 'dizzy', 'supercharged', 'laughing'
  const [speechBubble, setSpeechBubble] = useState("Hey! I'm NAVRO, your 3D Growth Mascot! Poke me, pet me, or make me talk!");
  const [growthEnergy, setGrowthEnergy] = useState(65);
  const [activeHat, setActiveHat] = useState('crown'); // 'crown', 'glasses', 'headphones', 'none'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customTalkText, setCustomTalkText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ROI Calculator state
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [aov, setAov] = useState(120);
  const [conversionRate, setConversionRate] = useState(2.8);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Three.js refs for procedural animation
  const sceneRef = useRef(null);
  const characterGroupRef = useRef(null);
  const headMeshRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const mouthMeshRef = useRef(null);
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const crownMeshRef = useRef(null);
  const glassesMeshRef = useRef(null);
  const headphonesMeshRef = useRef(null);
  const auraLightRef = useRef(null);

  // Mouse & physics tracking
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const springPhysics = useRef({
    headBounce: 0,
    headBounceVel: 0,
    bodySquish: 1,
    bodySquishVel: 0,
    jawOpen: 0,
    mouthTarget: 0,
    earWiggle: 0,
    earWiggleVel: 0,
    superchargeFactor: 0
  });

  // Synthesize Web Audio sound effects (Tom-style cartoon sounds)
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
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'giggle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.08);
        osc.frequency.linearRampToValueAtTime(620, now + 0.16);
        osc.frequency.linearRampToValueAtTime(920, now + 0.24);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'purr') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.1);
        osc.frequency.linearRampToValueAtTime(140, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'powerup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Audio effect error:", e);
    }
  };

  // High-pitched Talking Tom speech synthesis
  const speakText = (text) => {
    setSpeechBubble(text);
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.85; // High pitch like Talking Tom
    utterance.rate = 1.15;  // Slightly fast and energetic
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCharacterMood('talking');
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCharacterMood('happy');
      springPhysics.current.mouthTarget = 0;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCharacterMood('happy');
    };

    window.speechSynthesis.speak(utterance);
  };

  // ==========================================
  // THREE.JS 3D CHARACTER ENGINE INITIALIZATION
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    mainKeyLight.position.set(4, 5, 4);
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 3.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const auraLight = new THREE.PointLight(0x00f2ff, 1.5, 6);
    auraLight.position.set(0, 0, 1.5);
    scene.add(auraLight);
    auraLightRef.current = auraLight;

    // Character Group
    const charGroup = new THREE.Group();
    charGroup.position.set(0, -0.4, 0);
    scene.add(charGroup);
    characterGroupRef.current = charGroup;

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1d38,
      roughness: 0.35,
      metalness: 0.15,
    });

    const bellyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.3,
      metalness: 0.25,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    });

    const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const innerPupilMaterial = new THREE.MeshBasicMaterial({ color: 0x030712 });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.3
    });

    const cyberDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x030712,
      metalness: 0.9,
      roughness: 0.1
    });

    // 1. Body Mesh (Soft Cute Pear Shape)
    const bodyGeo = new THREE.SphereGeometry(1.05, 32, 32);
    bodyGeo.scale(1.0, 1.25, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, skinMaterial);
    bodyMesh.position.set(0, -0.4, 0);
    charGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // Belly Badge (Interactive poke area)
    const bellyGeo = new THREE.SphereGeometry(0.75, 32, 32);
    bellyGeo.scale(0.85, 1.0, 0.5);
    const bellyMesh = new THREE.Mesh(bellyGeo, bellyMaterial);
    bellyMesh.position.set(0, -0.35, 0.52);
    charGroup.add(bellyMesh);

    // Glowing Chest Core Symbol
    const coreGeo = new THREE.TorusGeometry(0.2, 0.04, 16, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0.05, 0.88);
    charGroup.add(coreMesh);

    // 2. Head Group & Mesh (Large cute head)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.15, 0);
    charGroup.add(headGroup);
    headMeshRef.current = headGroup;

    const headGeo = new THREE.SphereGeometry(0.95, 32, 32);
    headGeo.scale(1.15, 1.05, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(headMesh);

    // Cute Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const cheekMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.5 });
    const leftCheek = new THREE.Mesh(cheekGeo, cheekMat);
    leftCheek.position.set(-0.65, -0.15, 0.75);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, cheekMat);
    rightCheek.position.set(0.65, -0.15, 0.75);
    headGroup.add(rightCheek);

    // 3. Expressive Large Eyes & Pupils
    const createEye = (isLeft) => {
      const eyeContainer = new THREE.Group();
      eyeContainer.position.set(isLeft ? -0.38 : 0.38, 0.15, 0.8);

      const whiteGeo = new THREE.SphereGeometry(0.32, 32, 32);
      whiteGeo.scale(1, 1.15, 0.6);
      const whiteMesh = new THREE.Mesh(whiteGeo, eyeWhiteMaterial);
      eyeContainer.add(whiteMesh);

      const pupilGeo = new THREE.SphereGeometry(0.18, 24, 24);
      pupilGeo.scale(1, 1.1, 0.3);
      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMaterial);
      pupilMesh.position.set(0, 0, 0.18);
      eyeContainer.add(pupilMesh);

      const innerGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const innerMesh = new THREE.Mesh(innerGeo, innerPupilMaterial);
      innerMesh.position.set(0, 0, 0.24);
      eyeContainer.add(innerMesh);

      // Eye Glint (Shine)
      const glintGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const glintMesh = new THREE.Mesh(glintGeo, eyeWhiteMaterial);
      glintMesh.position.set(0.06, 0.06, 0.26);
      eyeContainer.add(glintMesh);

      return { container: eyeContainer, pupil: pupilMesh };
    };

    const leftEye = createEye(true);
    const rightEye = createEye(false);
    headGroup.add(leftEye.container);
    headGroup.add(rightEye.container);
    leftEyeRef.current = leftEye;
    rightEyeRef.current = rightEye;

    // 4. Animated Mouth (Jaw Viseme with Teeth)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.32, 0.85);
    headGroup.add(mouthGroup);
    mouthMeshRef.current = mouthGroup;

    const mouthGeo = new THREE.SphereGeometry(0.22, 24, 24);
    mouthGeo.scale(1.2, 0.6, 0.4);
    const mouthInnerMat = new THREE.MeshBasicMaterial({ color: 0x0b0f19 });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthInnerMat);
    mouthGroup.add(mouthMesh);

    // Cute White Tooth
    const toothGeo = new THREE.BoxGeometry(0.12, 0.08, 0.05);
    const toothMesh = new THREE.Mesh(toothGeo, eyeWhiteMaterial);
    toothMesh.position.set(0, 0.06, 0.08);
    mouthGroup.add(toothMesh);

    // 5. Ears (Bouncy Cat/Cyber Ears)
    const earGeo = new THREE.ConeGeometry(0.35, 0.7, 16);
    earGeo.scale(0.8, 1, 0.6);

    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.65, 0.95, 0.1);
    leftEar.rotation.set(-0.2, 0, 0.45);
    headGroup.add(leftEar);
    leftEarRef.current = leftEar;

    const rightEar = new THREE.Mesh(earGeo, skinMaterial);
    rightEar.position.set(0.65, 0.95, 0.1);
    rightEar.rotation.set(-0.2, 0, -0.45);
    headGroup.add(rightEar);
    rightEarRef.current = rightEar;

    // 6. Accessories
    // Gold ROI Crown
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.05, 0.1);
    const crownRingGeo = new THREE.CylinderGeometry(0.42, 0.35, 0.2, 16, 1, true);
    const crownRing = new THREE.Mesh(crownRingGeo, goldMaterial);
    crownGroup.add(crownRing);
    for (let i = 0; i < 5; i++) {
      const tipGeo = new THREE.ConeGeometry(0.08, 0.25, 8);
      const tipMesh = new THREE.Mesh(tipGeo, goldMaterial);
      const angle = (i / 5) * Math.PI * 2;
      tipMesh.position.set(Math.sin(angle) * 0.38, 0.2, Math.cos(angle) * 0.38);
      crownGroup.add(tipMesh);
    }
    headGroup.add(crownGroup);
    crownMeshRef.current = crownGroup;

    // Cyberpunk Shades
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.18, 0.95);
    const frameGeo = new THREE.BoxGeometry(1.2, 0.3, 0.08);
    const lensGeo = new THREE.BoxGeometry(1.15, 0.25, 0.1);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const frameMesh = new THREE.Mesh(frameGeo, cyberDarkMaterial);
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    glassesGroup.add(frameMesh);
    glassesGroup.add(lensMesh);
    headGroup.add(glassesGroup);
    glassesMeshRef.current = glassesGroup;
    glassesGroup.visible = false;

    // DJ Headphones
    const headphonesGroup = new THREE.Group();
    headphonesGroup.position.set(0, 0.3, 0);
    const bandGeo = new THREE.TorusGeometry(0.95, 0.06, 12, 32, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, cyberDarkMaterial);
    bandMesh.rotation.set(Math.PI, 0, 0);
    bandMesh.position.set(0, 0.3, 0);
    headphonesGroup.add(bandMesh);

    const cupGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    cupGeo.rotateZ(Math.PI / 2);
    const leftCup = new THREE.Mesh(cupGeo, goldMaterial);
    leftCup.position.set(-1.0, 0.1, 0);
    const rightCup = new THREE.Mesh(cupGeo, goldMaterial);
    rightCup.position.set(1.0, 0.1, 0);
    headphonesGroup.add(leftCup);
    headphonesGroup.add(rightCup);
    headGroup.add(headphonesGroup);
    headphonesMeshRef.current = headphonesGroup;
    headphonesGroup.visible = false;

    // 7. Paws / Hands & Feet
    const pawGeo = new THREE.SphereGeometry(0.28, 16, 16);
    pawGeo.scale(1.2, 0.8, 1.2);
    const leftHand = new THREE.Mesh(pawGeo, skinMaterial);
    leftHand.position.set(-1.15, -0.4, 0.4);
    charGroup.add(leftHand);

    const rightHand = new THREE.Mesh(pawGeo, skinMaterial);
    rightHand.position.set(1.15, -0.4, 0.4);
    charGroup.add(rightHand);

    const footGeo = new THREE.SphereGeometry(0.35, 16, 16);
    footGeo.scale(1.1, 0.7, 1.5);
    const leftFoot = new THREE.Mesh(footGeo, skinMaterial);
    leftFoot.position.set(-0.55, -1.65, 0.3);
    charGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, skinMaterial);
    rightFoot.position.set(0.55, -1.65, 0.3);
    charGroup.add(rightFoot);

    // ==========================================
    // RENDER & PROCEDURAL PHYSICS LOOP
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      // Spring physics updates
      const sp = springPhysics.current;
      sp.headBounceVel += (-sp.headBounce * 18 - sp.headBounceVel * 4) * 0.016;
      sp.headBounce += sp.headBounceVel * 0.016;

      sp.bodySquishVel += ((1 - sp.bodySquish) * 22 - sp.bodySquishVel * 5) * 0.016;
      sp.bodySquish += sp.bodySquishVel * 0.016;

      sp.earWiggleVel += (-sp.earWiggle * 25 - sp.earWiggleVel * 4) * 0.016;
      sp.earWiggle += sp.earWiggleVel * 0.016;

      // Breathing idle animation
      const breath = Math.sin(time * 3) * 0.04;
      if (bodyMeshRef.current) {
        bodyMeshRef.current.scale.set(1.0 + breath * 0.5, (1.25 + breath) * sp.bodySquish, 0.95 - breath * 0.3);
      }

      // Head tracking mouse + springs
      if (headMeshRef.current) {
        headMeshRef.current.position.y = 1.15 + sp.headBounce + breath * 0.5;
        headMeshRef.current.rotation.y = mousePos.current.x * 0.65;
        headMeshRef.current.rotation.x = -mousePos.current.y * 0.45;
        headMeshRef.current.rotation.z = Math.sin(time * 2) * 0.03 + sp.headBounce * 0.5;
      }

      // Eye pupil tracking
      if (leftEyeRef.current && rightEyeRef.current) {
        const pupilX = mousePos.current.x * 0.08;
        const pupilY = -mousePos.current.y * 0.06;
        leftEyeRef.current.pupil.position.set(pupilX, pupilY, 0.18);
        rightEyeRef.current.pupil.position.set(pupilX, pupilY, 0.18);
      }

      // Ears twitching
      if (leftEarRef.current && rightEarRef.current) {
        leftEarRef.current.rotation.z = 0.45 + Math.sin(time * 4) * 0.06 + sp.earWiggle;
        rightEarRef.current.rotation.z = -0.45 - Math.sin(time * 4) * 0.06 - sp.earWiggle;
      }

      // Talking mouth viseme animation
      if (mouthMeshRef.current) {
        if (isSpeaking) {
          const viseme = (Math.sin(time * 18) * 0.5 + 0.5) * 1.5;
          mouthMeshRef.current.scale.set(1.2 + viseme * 0.4, 0.6 + viseme * 1.2, 0.4);
        } else {
          sp.jawOpen += (sp.mouthTarget - sp.jawOpen) * 0.15;
          mouthMeshRef.current.scale.set(1.2, 0.6 + sp.jawOpen * 0.8, 0.4);
        }
      }

      // Supercharge aura glow
      if (auraLightRef.current) {
        auraLightRef.current.intensity = 1.5 + Math.sin(time * 6) * 0.6 + sp.superchargeFactor * 4;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isSpeaking]);

  // Handle Hat/Accessory changes
  useEffect(() => {
    if (crownMeshRef.current) crownMeshRef.current.visible = activeHat === 'crown';
    if (glassesMeshRef.current) glassesMeshRef.current.visible = activeHat === 'glasses';
    if (headphonesMeshRef.current) headphonesMeshRef.current.visible = activeHat === 'headphones';
  }, [activeHat]);

  // Mouse move listener for 3D cursor tracking
  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current.targetX = Math.max(-1, Math.min(1, x));
    mousePos.current.targetY = Math.max(-1, Math.min(1, y));
  };

  // Direct Tap / Poke on Head
  const handlePokeHead = () => {
    playSoundEffect('boing');
    springPhysics.current.headBounceVel = -12;
    springPhysics.current.earWiggleVel = 14;
    setGrowthEnergy((prev) => Math.min(100, prev + 5));
    const randomLine = VOICELINES.poke_head[Math.floor(Math.random() * VOICELINES.poke_head.length)];
    speakText(randomLine);
  };

  // Direct Tap / Poke on Belly
  const handlePokeBelly = () => {
    playSoundEffect('giggle');
    springPhysics.current.bodySquish = 0.75;
    springPhysics.current.bodySquishVel = 8;
    setGrowthEnergy((prev) => Math.min(100, prev + 8));

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 }
    });

    const randomLine = VOICELINES.poke_belly[Math.floor(Math.random() * VOICELINES.poke_belly.length)];
    speakText(randomLine);
  };

  // Petting / Stroking Mascot
  const handlePetMascot = () => {
    playSoundEffect('purr');
    springPhysics.current.bodySquish = 0.92;
    springPhysics.current.headBounce = 0.15;
    setGrowthEnergy((prev) => Math.min(100, prev + 12));

    const randomLine = VOICELINES.pet[Math.floor(Math.random() * VOICELINES.pet.length)];
    speakText(randomLine);
  };

  // Action Button: Feed Growth Juice
  const handleFeedJuice = () => {
    playSoundEffect('powerup');
    springPhysics.current.superchargeFactor = 1;
    springPhysics.current.headBounceVel = 10;
    setGrowthEnergy(100);

    confetti({
      particleCount: 75,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#00f2ff', '#3b82f6', '#f59e0b']
    });

    const randomLine = VOICELINES.growth_juice[Math.floor(Math.random() * VOICELINES.growth_juice.length)];
    speakText(randomLine);
    setTimeout(() => {
      springPhysics.current.superchargeFactor = 0;
    }, 2500);
  };

  // Action Button: Launch Rocket
  const handleLaunchRocket = () => {
    playSoundEffect('boing');
    springPhysics.current.headBounceVel = 15;
    confetti({
      particleCount: 90,
      angle: 90,
      spread: 70,
      origin: { y: 0.7 }
    });
    const randomLine = VOICELINES.rocket[Math.floor(Math.random() * VOICELINES.rocket.length)];
    speakText(randomLine);
  };

  // Action Button: Ad Slingshot
  const handleAdSlingshot = () => {
    playSoundEffect('boing');
    springPhysics.current.earWiggleVel = -18;
    const randomLine = VOICELINES.slingshot[Math.floor(Math.random() * VOICELINES.slingshot.length)];
    speakText(randomLine);
  };

  // Handle Custom Voice Input
  const handleCustomSpeechSubmit = (e) => {
    e.preventDefault();
    if (!customTalkText.trim()) return;
    speakText(customTalkText);
    setCustomTalkText('');
  };

  // ROI Calculator Math
  const calculatedTraffic = Math.round(monthlySpend * 3.8); // Est clicks
  const calculatedConversions = Math.round(calculatedTraffic * (conversionRate / 100));
  const estimatedRevenue = Math.round(calculatedConversions * aov);
  const estimatedROAS = monthlySpend > 0 ? (estimatedRevenue / monthlySpend).toFixed(1) : 0;

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({ particleCount: 50, spread: 80 });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030914] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans pb-24">
      
      {/* Ambient Cyber Neon Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ======================================================== */}
        {/* TOP HERO & INTRO HEADER                                   */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-4 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>INTERACTIVE DIGITAL GROWTH LAB // TALKING MASCOT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans leading-tight">
            ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">HYPER-GROWTH</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Meet <strong className="text-cyan-300">NAVRO</strong>, our interactive growth mascot. Tap his head, tickle his belly, or test your conversion funnels in real-time.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 3D TALKING TOM INTERACTIVE STAGE & CONTROLS              */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: Wardrobe & Interaction Tools */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            
            {/* Mascot Wardrobe / Costumes */}
            <div className="p-5 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Mascot Wardrobe</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveHat('crown')}
                  className={`p-3 rounded-2xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    activeHat === 'crown' 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span>ROI Crown</span>
                </button>

                <button
                  onClick={() => setActiveHat('glasses')}
                  className={`p-3 rounded-2xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    activeHat === 'glasses' 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Glasses className="w-5 h-5 text-cyan-400" />
                  <span>Cyber Shades</span>
                </button>

                <button
                  onClick={() => setActiveHat('headphones')}
                  className={`p-3 rounded-2xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    activeHat === 'headphones' 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-5 h-5 text-purple-400" />
                  <span>DJ Headset</span>
                </button>

                <button
                  onClick={() => setActiveHat('none')}
                  className={`p-3 rounded-2xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    activeHat === 'none' 
                      ? 'bg-white/20 border-white text-white' 
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smile className="w-5 h-5 text-slate-300" />
                  <span>Default</span>
                </button>
              </div>
            </div>

            {/* Growth Energy Battery Bar */}
            <div className="p-5 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold mb-2">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>Mascot Energy Level</span>
                </div>
                <span>{growthEnergy}%</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden p-0.5 border border-cyan-400/30">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${growthEnergy}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-2 italic">
                *Pet or feed Navro to recharge maximum conversion power!
              </p>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full py-3 px-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                <span>Voice & Sound FX</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${soundEnabled ? 'bg-cyan-500/20 text-cyan-300' : 'bg-red-500/20 text-red-300'}`}>
                {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

          </div>

          {/* CENTER: 3D TALKING TOM CANVAS & INTERACTIVE STAGE */}
          <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
            
            {/* Interactive Speech Bubble */}
            <div className="relative w-full max-w-md mb-3 px-5 py-3 rounded-2xl bg-[#0e2142] border-2 border-cyan-400/60 shadow-[0_10px_30px_rgba(0,242,254,0.15)] text-center text-sm font-mono text-cyan-200 font-bold leading-snug">
              <span>{speechBubble}</span>
              {/* Bubble pointer triangle */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#0e2142]" />
            </div>

            {/* 3D WebGL Canvas Container */}
            <div 
              onMouseMove={handleMouseMove}
              className="relative w-full h-[420px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-[#091833]/90 to-[#040a17]/95 border-2 border-cyan-500/40 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-pointer group"
            >
              <canvas ref={canvasRef} className="w-full h-full" />

              {/* Invisible Clickable Hitboxes for Direct Touch Reactions */}
              {/* Head Poke Target */}
              <div 
                onClick={handlePokeHead}
                title="Poke Head"
                className="absolute top-[18%] left-1/2 -translate-x-1/2 w-44 h-36 rounded-full cursor-pointer z-20 hover:bg-cyan-400/10 transition-colors"
              />

              {/* Belly Tickle Target */}
              <div 
                onClick={handlePokeBelly}
                title="Tickle Belly"
                className="absolute top-[52%] left-1/2 -translate-x-1/2 w-40 h-36 rounded-full cursor-pointer z-20 hover:bg-blue-400/10 transition-colors"
              />

              {/* Floating Touch Hint Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 pointer-events-none backdrop-blur-md">
                <MousePointerClick className="w-3 h-3 text-cyan-400 animate-bounce" />
                <span>TAP HEAD OR BELLY</span>
              </div>

              {/* Petting Button */}
              <button
                onClick={handlePetMascot}
                className="absolute bottom-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pet Navro</span>
              </button>
            </div>

            {/* Bottom Action Controls (Feed, Rocket, Slingshot) */}
            <div className="w-full grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={handleFeedJuice}
                className="py-3 px-2 rounded-2xl bg-[#0d2247] border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Feed Potion</span>
              </button>

              <button
                onClick={handleLaunchRocket}
                className="py-3 px-2 rounded-2xl bg-[#0d2247] border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span>Launch Rocket</span>
              </button>

              <button
                onClick={handleAdSlingshot}
                className="py-3 px-2 rounded-2xl bg-[#0d2247] border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
              >
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Ad Slingshot</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Voice Box ("Make Navro Talk") & Growth Audits */}
          <div className="lg:col-span-3 space-y-4 order-3">
            
            {/* Custom Voice Generator Box */}
            <div className="p-5 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Make Him Talk (Voice Box)</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mb-3">
                Type any text and Navro will repeat it with squeaky high-pitched audio!
              </p>

              <form onSubmit={handleCustomSpeechSubmit} className="space-y-2">
                <input
                  type="text"
                  value={customTalkText}
                  onChange={(e) => setCustomTalkText(e.target.value)}
                  placeholder="e.g. 10x ROAS or bust!"
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-xs font-mono font-bold text-black uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Make Him Speak</span>
                </button>
              </form>

              {/* Quick Preset Voice Lines */}
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Quick Presets:</span>
                {[
                  "We scale ROAS to the moon!",
                  "Stop burning money on bad ads!",
                  "Harsh Joshi builds the best websites!"
                ].map((txt) => (
                  <button
                    key={txt}
                    onClick={() => speakText(txt)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors truncate block cursor-pointer"
                  >
                    "{txt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Stats Pill */}
            <div className="p-4 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Total Tracked ROAS</div>
                  <div className="text-lg font-black text-white font-mono">4.82x AVG</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE ROI & GROWTH CALCULATOR                      */}
        {/* ======================================================== */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#08152e] to-[#040b17] border-2 border-cyan-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>REAL-TIME PERFORMANCE SIMULATOR</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
                CALCULATE YOUR ESTIMATED REVENUE SCALING
              </h2>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold w-max">
              PROJECTED ROAS: <span className="text-lg text-white font-black">{estimatedROAS}x</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sliders Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Monthly Ad Spend Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Monthly Ad Spend:</span>
                  <span className="text-cyan-300 font-bold text-sm">${monthlySpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>$1,000</span>
                  <span>$25,000</span>
                  <span>$50,000+</span>
                </div>
              </div>

              {/* Average Order Value (AOV) Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Average Order Value (AOV):</span>
                  <span className="text-cyan-300 font-bold text-sm">${aov}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>$20</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Conversion Rate Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Target Conversion Rate (CRO):</span>
                  <span className="text-cyan-300 font-bold text-sm">{conversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1.0% (Average)</span>
                  <span>4.0% (Optimized)</span>
                  <span>8.0% (Navra Funnel)</span>
                </div>
              </div>

            </div>

            {/* Results Display Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-cyan-400/30 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
                  <span>Projected Qualified Clicks</span>
                  <span className="text-white font-bold">{calculatedTraffic.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
                  <span>Estimated Customer Orders</span>
                  <span className="text-white font-bold">{calculatedConversions.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-400 block mb-1">Projected Monthly Revenue</span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 font-mono">
                    ${estimatedRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <a
                href="#consultation"
                className="w-full py-3 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl text-center hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Deploy This Growth Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* CORE DIGITAL GROWTH PILLARS                              */}
        {/* ======================================================== */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              SYSTEMATIC SCALING BLUEPRINT
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              FULL-FUNNEL GROWTH SERVICES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1 */}
            <div className="p-6 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-2">Paid Social & Performance</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Algorithmic ad creatives on Meta, TikTok, and Google Ads designed with aggressive hooks and retention curves.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-300 font-bold">
                +340% AVERAGE ROAS
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-6 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-2">SEO & Organic Domination</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Technical SEO architecture, semantic keyword clusters, and programmatic indexing to rank #1 organically.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-300 font-bold">
                TOP 3 SEARCH POSITIONS
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-6 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-2">CRO & Funnel Engineering</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Sub-second landing page speeds, A/B tested checkout flows, and psychology-backed conversion triggers.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-300 font-bold">
                2.8x HIGHER CHECKOUT RATE
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-6 rounded-3xl bg-[#09152b]/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group backdrop-blur-xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-2">Viral UGC & Influencer Lab</h4>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                Direct creator whitelisting, viral reel scripting, and authentic creator testimonials that drive trust.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-cyan-300 font-bold">
                4.2M+ IMPRESSIONS GENERATED
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* GROWTH CONSULTATION & DISPATCH INQUIRY FORM              */}
        {/* ======================================================== */}
        <div id="consultation" className="my-16 p-8 sm:p-10 rounded-3xl bg-[#08152e]/90 border-2 border-cyan-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
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

            <div className="lg:col-span-7 bg-[#040b17] border border-cyan-400/30 rounded-2xl p-6 shadow-inner">
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
                      className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Business Email"
                      className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Current Website URL / Monthly Revenue Target..."
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-black font-black uppercase tracking-wider text-xs rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Request Free Digital Growth Audit</span>
                    <Send className="w-3.5 h-3.5" />
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
