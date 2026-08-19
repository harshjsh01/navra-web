'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Play, 
  Sparkles, 
  Film, 
  Layers, 
  Zap, 
  ArrowRight, 
  Eye, 
  Volume2, 
  Image as ImageIcon,
  Barcode,
  X,
  Send,
  Mail,
  CheckCircle2,
  Move,
  Quote,
  Flame,
  Globe,
  Radio,
  Music,
  Tv,
  Maximize2
} from 'lucide-react';

const SHOWCASE_ARTICLES = [
  // 1. Master Showreel (9:16 Portrait Reel)
  {
    id: 1,
    title: 'CREATIVE AGENCY UNVEILS CINEMATIC MEDIA MATRIX',
    highlightWord: 'UNVEILED TODAY',
    kicker: 'FRONT PAGE LEAD // 4K MASTER CUT',
    client: 'NAVRA STUDIO LAB // 2026',
    byline: 'By Harsh Joshi, Chief Creative Director',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/finalreel_navra.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • VOL. XXVI',
    duration: '1:10',
    resolution: '4K CINEMA 9:16',
    caption: 'Fig 1.1 — Master 4K studio showreel showcasing dynamic speed ramps, anamorphic color grading, and commercial storytelling.',
    dateline: 'NEW DELHI — ',
    col1: 'In a major milestone for digital creative production, Navra Studio has officially unveiled its complete high-end media ecosystem. Merging high-velocity video editing with bespoke spatial sound engineering, the agency represents a new standard for brands seeking algorithmic dominance across digital feeds.',
    col2: 'The flagship showreel demonstrates intricate pacing algorithms, multi-cam synchronization, and proprietary LUT color grading engineered to hold audience attention within the first 3 seconds while driving retention past 85% on performance marketing campaigns.',
    col3: 'Industry observers note that the combination of custom typography motion and anamorphic framing delivers an unforgettable visual identity tailored for modern luxury, automotive, and tech leaders.',
    quote: 'We engineer visual identities and cinematic reels that command absolute authority in an overcrowded digital landscape.',
    tags: ['MASTER REEL', '4K CINEMA', 'COLOR SCIENCE']
  },
  // 2. Workshop Sessions (9:16 Portrait Reel)
  {
    id: 2,
    title: 'HANDS-ON MASTERCLASS WORKSHOPS EXPAND DIGITAL CRAFT',
    highlightWord: 'LIVE SESSIONS',
    kicker: 'EDUCATION WIRE // DESIGN LAB',
    client: 'NAVRA WORKSHOPS // LIVE',
    byline: 'By Editorial Training Bureau',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/workshop_promo.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 01 • EDUCATION',
    duration: '0:40',
    resolution: '1080P 60FPS',
    caption: 'Fig 1.2 — Live masterclass creative session demonstrating dynamic graphic workflows and software pipelines.',
    dateline: 'STUDIO DESK — ',
    col1: 'Navra Studio creative masterclasses provide interactive training in kinetic typography, software automation, and commercial video post-production pipelines.',
    col2: 'Participants engage in real-time project breakdowns, learning how to structure retention-optimized reels for high-impact brand campaigns and client deliverables.',
    quote: 'Bridging the gap between raw concept and finished broadcast masters.',
    tags: ['WORKSHOP', 'MOTION DESIGN', 'LIVE TRAINING']
  },
  // 3. Pre-Order Campaign (9:16 Portrait Reel)
  {
    id: 3,
    title: 'EXCLUSIVE PRE-ORDER CAMPAIGN ACHIEVES RECORD ROAS',
    highlightWord: 'HIGH CONVERSION',
    kicker: 'COMMERCIAL DISPATCH // AD SUITE',
    client: 'PRODUCT LAUNCH // COMMERCIAL',
    byline: 'By Commercial Analytics Desk',
    category: 'Commercials',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/preorder_final_reel.mp4',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 01 • COMMERCE',
    duration: '0:45',
    resolution: '4K ULTRA HD',
    caption: 'Fig 1.3 — High-conversion commercial ad reel featuring product launch overlays and retention hooks.',
    dateline: 'MARKETING WIRE — ',
    col1: 'Engineered specifically for paid social marketing funnels, the pre-order commercial video utilizes aggressive opening hooks and synchronized audio cues.',
    col2: 'Campaign analytics indicate a +340% increase in ROAS and unprecedented click-through rates across Instagram, TikTok, and YouTube Shorts.',
    quote: 'Every frame is engineered to hold attention and drive direct purchase intent.',
    tags: ['PRE-ORDER', 'COMMERCIAL', '+340% ROAS']
  },
  // 4. Indie Music Concert (Portrait Reel)
  {
    id: 4,
    title: 'INDIE MUSIC NIGHT CONCERT LAUNCHES LIVE STAGE PROMO',
    highlightWord: 'LIVE STAGE',
    kicker: 'MUSIC & ENTERTAINMENT // CONCERT WIRE',
    client: 'INDIE MUSIC NIGHT 2026',
    byline: 'By Entertainment Desk',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/indie_music_night.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 01 • CONCERT WIRE',
    duration: '0:35',
    resolution: '1080P 60FPS',
    caption: 'Fig 1.4 — High-voltage concert promo featuring dynamic audio waveforms and stage light sync.',
    dateline: 'LIVE DESK — ',
    col1: 'The Indie Music Night campaign features rhythm-locked video cuts, psychedelic neon typography overlays, and custom audio mixing designed for concert discovery feeds.',
    col2: 'Designed to boost ticket reservations across live ticketing platforms, the promotional video highlights the electrifying atmosphere of indie artists.',
    quote: 'Sound and motion unite to recreate raw concert adrenaline.',
    tags: ['LIVE MUSIC', 'STAGE LIGHTS', 'SOUND SYNC']
  },
  // 5. Navrang Navratri (16:9 Landscape)
  {
    id: 5,
    title: 'NAVRANG NAVRATRI STAGE CUT CAPTIVATES 150K+ AUDIENCES',
    highlightWord: 'VIRAL REEL',
    kicker: 'CULTURAL BROADSIDE // STAGE PRODUCTION',
    client: 'CULTURAL EXPERIENCE // 2026',
    byline: 'By Stage Production Desk',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'landscape',
    mediaSrc: '/show/navrang_navratri.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • EVENT WIRE',
    duration: '0:15',
    resolution: '1440x806 16:9',
    caption: 'Fig 1.5 — Festive promotional reel capturing live stage energy with precision music synchronization.',
    dateline: 'MUMBAI — ',
    col1: 'Navrang Navratri event coverage generated over 150,000 organic views within 48 hours of broadcast with high audience retention.',
    col2: 'Fast-cut editing paired with vibrant traditional color balance brought the raw energy of live stage performances directly to mobile screens.',
    quote: 'Preserving cultural grandeur through modern cinematic pacing.',
    tags: ['EVENT REEL', 'MUSIC SYNC', '150K+ VIEWS']
  },
  // 6. Traditional Navratri Animation (Portrait)
  {
    id: 6,
    title: 'TRADITIONAL NAVRATRI FESTIVAL GETS VIBRANT ANIMATION',
    highlightWord: 'FESTIVE ART',
    kicker: 'CULTURAL ANIMATION // PORTRAIT REEL',
    client: 'CULTURAL EXPERIENCE // 2026',
    byline: 'By Cultural Arts Correspondent',
    category: '3D Motion',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/navratri_portrait_anim.mp4',
    posterSrc: '/show/edit_1.png',
    edition: 'PAGE 01 • CULTURAL WIRE',
    duration: '0:20',
    resolution: 'PORTRAIT ANIMATION',
    caption: 'Fig 1.6 — Blue, orange, and yellow traditional festival animated motion graphic.',
    dateline: 'AHMEDABAD — ',
    col1: 'Combining intricate folk motifs with smooth 2D vector animation, this festive portrait reel celebrates the nine nights of Navratri with radiant warmth.',
    col2: 'Optimized for high-engagement mobile feeds with energetic percussion and fluid typography.',
    quote: 'Honoring sacred traditions through contemporary vector motion.',
    tags: ['ANIMATION', 'FESTIVAL', 'PORTRAIT REEL']
  },
  // 7. Navratri Rangat Promo (Portrait)
  {
    id: 7,
    title: 'NAVRATRI RANGAT DELIVERS HIGH-OCTANE STAGE PROMO',
    highlightWord: 'STAGE PROMO',
    kicker: 'FESTIVAL WIRE // LIVE AUDIO',
    client: 'STAGE & LIVE PRODUCTION',
    byline: 'By Live Production Reviewer',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/navratri_rangat.mp4',
    posterSrc: '/show/edit_2.png',
    edition: 'PAGE 01 • LIVE EVENTS',
    duration: '0:30',
    resolution: 'PORTRAIT HD',
    caption: 'Fig 1.7 — Live event promo with color grading and dynamic audio mastering.',
    dateline: 'SURAT — ',
    col1: 'An energetic broadcast cut featuring rapid transition pacing, live crowd atmosphere, and rich audio equalization.',
    col2: 'Elevates festival promotional storytelling to broadcast-tier production standards.',
    quote: 'Capturing the heartbeat of celebration.',
    tags: ['STAGE CUT', 'AUDIO MASTER', 'CROWD ENERGY']
  },
  // 8. Cinematic Walk (16:9 Landscape Cinema)
  {
    id: 8,
    title: 'ATMOSPHERIC CINEMATIC SEQUENCE CAPTURES VISUAL POETRY',
    highlightWord: 'CINEMA CRITIQUE',
    kicker: 'VISUAL ESSAY // COLOR SCIENCE',
    client: 'VISUAL STORYTELLING LAB',
    byline: 'By Film & Optics Reviewer',
    category: 'Cinematic Reels',
    type: 'video',
    aspect: 'landscape',
    mediaSrc: '/show/walk_cinematic.mov',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 02 • ARTS',
    duration: '0:45',
    resolution: '4K CINEMA 16:9',
    caption: 'Fig 2.1 — Anamorphic visual sequence showcasing bespoke LUT color grading and wide-angle framing.',
    dateline: 'CINEMA WIRE — ',
    col1: 'Exploring the subtle interplay between natural lighting and digital grading algorithms, this visual sequence demonstrates mood development.',
    col2: 'Anamorphic lens emulation paired with spatial audio design creates an immersive narrative experience suited for high-end brand films.',
    quote: 'Light, shadow, and pacing unite to form unforgettable visual stories.',
    tags: ['ANAMORPHIC', '4K CINEMA', 'LUT GRADING']
  },
  // 9. 3D Motion CGI (9:16 Portrait)
  {
    id: 9,
    title: '3D MOTION CGI & KINETIC TYPOGRAPHY REACH NEW FRONTIERS',
    highlightWord: 'DIGITAL INNOVATION',
    kicker: 'TECHNOLOGY REPORT // VECTOR LAB',
    client: 'NAVRA MOTION LAB',
    byline: 'By Tech & Motion Editor',
    category: '3D Motion',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/motion_design.mp4',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 02 • TECH DESK',
    duration: '0:20',
    resolution: 'VECTOR 60FPS 9:16',
    caption: 'Fig 2.2 — Kinetic typography motion reel with vector logo simulations and fluid transitions.',
    dateline: 'INNOVATION LAB — ',
    col1: 'By combining SVG vector math with 3D CGI simulations, Navra Studio produces digital motion identities that elevate web and software interfaces.',
    col2: 'Modern brands demand fluid kinetic systems that transition seamlessly from video advertising into live digital product environments.',
    quote: 'Typography in motion is the heartbeat of contemporary digital brand systems.',
    tags: ['3D MOTION', 'KINETIC TYPE', 'VECTOR CGI']
  },
  // 10. Agency Brand Identity (1:1 Square)
  {
    id: 10,
    title: 'AGENCY BRAND IDENTITY SYSTEM SETS NEW VISUAL STANDARD',
    highlightWord: 'BRAND ARCHIVE',
    kicker: 'GRAPHIC DESIGN // IDENTITY',
    client: 'NAVRA STUDIO BRAND ARCHIVE',
    byline: 'By Design Standards Bureau',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'square',
    mediaSrc: '/show/we_agency.png',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 02 • IDENTITY',
    duration: 'BRAND ID',
    resolution: '1080x1080 SQUARE',
    caption: 'Fig 2.3 — Comprehensive agency visual identity layout and typography hierarchy.',
    dateline: 'DESIGN ARCHIVE — ',
    col1: 'The Navra Studio brand identity system establishes a rigorous typographic hierarchy, balancing bold serif authority with clean monospaced precision.',
    col2: 'Applied across digital merchandise, print publications, and software HUD interfaces for complete brand consistency.',
    quote: 'Consistent identity architecture builds long-term brand equity.',
    tags: ['BRAND IDENTITY', 'TYPOGRAPHY', 'DESIGN SYSTEM']
  },
  // 11. Studio Software UI Interface (1:1 Square)
  {
    id: 11,
    title: 'STUDIO SOFTWARE UI & INTERACTION INTERFACE UNVEILED',
    highlightWord: 'WEB INTERFACE',
    kicker: 'SOFTWARE ENGINEERING // UI ARCHIVE',
    client: 'NAVRA ENGINE',
    byline: 'By Systems Architect',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'square',
    mediaSrc: '/show/screenshot_ui.png',
    posterSrc: '/show/screenshot_ui.png',
    edition: 'PAGE 02 • SOFTWARE DESK',
    duration: 'INTERFACE',
    resolution: 'SQUARE HQ',
    caption: 'Fig 2.4 — Live production viewport and HUD navigation architecture.',
    dateline: 'TECH WIRE — ',
    col1: 'A deep look into the bespoke engineering behind Navra Studio web applications, incorporating 3D Canvas rendering, GSAP timelines, and real-time state management.',
    col2: 'Designed for fluid interactions and zero layout shift.',
    quote: 'Where cinematic aesthetics meet high-performance software code.',
    tags: ['SOFTWARE UI', 'NEXT.JS', '3D CANVAS']
  },
  // 12. Graphic Design Poster (1:1 Square)
  {
    id: 20,
    title: 'EXPERIMENTAL GRAPHIC POSTER & TYPOGRAPHIC COLLAGE',
    highlightWord: 'POSTER ART',
    kicker: 'PRINT DESIGN // POSTER ART',
    client: 'NAVRA PRINT ARCHIVE',
    byline: 'By Print Master',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'square',
    mediaSrc: '/show/design_poster.png',
    posterSrc: '/show/design_poster.png',
    edition: 'PAGE 02 • POSTER ART',
    duration: 'POSTER ART',
    resolution: '2048x2048 SQUARE',
    caption: 'Fig 2.5 — Large-format typographic poster exploring layered geometry and contrast.',
    dateline: 'PRINT DESK — ',
    col1: 'An experimental print broadside testing the boundaries of negative space, bold geometric framing, and asymmetric layouts.',
    col2: 'Crafted for exhibition prints and collector broadsides.',
    quote: 'Pushing print typography into the digital future.',
    tags: ['POSTER ART', 'TYPOGRAPHY', 'PRINT DESIGN']
  },
  // 13. Studio Editorial Panorama Banner (Ultra-Wide 20:6)
  {
    id: 13,
    title: 'COMMERCIAL SHOOT EDITORIAL LOOKBOOK PANORAMA',
    highlightWord: 'STUDIO SHOOT',
    kicker: 'COMMERCIAL PHOTOGRAPHY // PANORAMA SUITE',
    client: 'NAVRA FASHION LAB',
    byline: 'By Fashion Editorial Team',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'banner',
    mediaSrc: '/show/edit_4.png',
    posterSrc: '/show/edit_4.png',
    edition: 'PAGE 02 • PANORAMA',
    duration: 'STUDIO EDIT',
    resolution: '2000x647 ULTRA-WIDE',
    caption: 'Fig 2.6 — Studio wide lighting and color pass for high-fashion commercial lookbook.',
    dateline: 'FASHION DESK — ',
    col1: 'Balancing skin tones with dramatic ambient backlighting to create a memorable luxury lookbook.',
    col2: 'Engineered for print catalogs and high-DPI digital storefronts.',
    quote: 'Flawless styling meets authentic emotional resonance.',
    tags: ['FASHION', 'COMMERCIAL', 'PANORAMA']
  },
  // 14. Concept Art 03 (9:16 Portrait)
  {
    id: 14,
    title: 'DIGITAL CONCEPT ARTWORK 03 // VECTOR ABSTRACT',
    highlightWord: 'CONCEPT ART',
    kicker: 'ART DIRECTION // VECTOR SUITE',
    client: 'NAVRA ART LAB',
    byline: 'By Concept Artist',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'portrait',
    mediaSrc: '/show/brand_art_3.png',
    posterSrc: '/show/brand_art_3.png',
    edition: 'PAGE 02 • ART DIRECTION',
    duration: 'CONCEPT ART',
    resolution: '1080x1920 PORTRAIT',
    caption: 'Fig 2.7 — Vector abstract concept artwork developed for brand moodboards.',
    dateline: 'ART WIRE — ',
    col1: 'Form exploration utilizing mathematical curves and gradient fills to establish visual motifs for client pitch decks.',
    col2: 'Serves as the foundation for multi-platform motion packages.',
    quote: 'Every concept begins with pure geometric experimentation.',
    tags: ['CONCEPT ART', 'ABSTRACT', 'MOODBOARD']
  },
  // 15. Logo Coming Soon Teaser (9:16 Portrait)
  {
    id: 15,
    title: 'STUDIO REVEALS HIGH-TECH KINETIC LOGO TEASER',
    highlightWord: 'COMING SOON',
    kicker: 'BRAND IDENTITY // LOGO MOTION',
    client: 'NAVRA STUDIO LAB',
    byline: 'By Visual Identity Unit',
    category: '3D Motion',
    type: 'video',
    aspect: 'portrait',
    mediaSrc: '/show/logo_coming_soon.mp4',
    posterSrc: '/show/we_agency.png',
    edition: 'PAGE 02 • LOGO WIRE',
    duration: '0:15',
    resolution: '1080x1920 PORTRAIT',
    caption: 'Fig 2.8 — Futuristic kinetic logo teaser utilizing glowing vector lines.',
    dateline: 'DESIGN LAB — ',
    col1: 'Featuring sleek cybernetic lighting and kinetic vector expansion, the upcoming studio logo identity teaser sets the tone for future digital releases.',
    col2: 'A masterclass in minimal tension building and high-contrast digital elegance.',
    quote: 'Minimalist geometry powered by dynamic motion.',
    tags: ['LOGO MOTION', 'TEASER', 'VECTOR CGI']
  },
  // 16. HaHa Pop-Culture Ad (Portrait Graphic)
  {
    id: 16,
    title: 'POP-CULTURE CREATIVE EXPERIMENT & HUMOR AD SUITE',
    highlightWord: 'POP ART',
    kicker: 'CREATIVE LAB // VIRAL CONTENT',
    client: 'NAVRA VIRAL LAB',
    byline: 'By Viral Content Lead',
    category: 'Brand & Print',
    type: 'image',
    aspect: 'portrait',
    mediaSrc: '/show/haha_creative.png',
    posterSrc: '/show/haha_creative.png',
    edition: 'PAGE 02 • POP CULTURE',
    duration: 'VIRAL AD',
    resolution: '856x1080 PORTRAIT',
    caption: 'Fig 2.9 — Playful pop-art creative experiment engineered for viral organic sharing.',
    dateline: 'CREATIVE WIRE — ',
    col1: 'Testing high-engagement humor formats that blend irreverent pop-art tropes with razor-sharp vector finishing.',
    col2: 'Demonstrates how brands can humanize their voice and build passionate communities.',
    quote: 'Humor and wit command viral brand loyalty.',
    tags: ['POP ART', 'VIRAL AD', 'CREATIVE LAB']
  },
  // 17. Luxury Wedding Jewelry Gazette Ad (1:1 Square)
  {
    id: 17,
    title: 'ROYAL WEDDING JEWELRY COLLECTION ANNOUNCES 25% SAVINGS',
    highlightWord: 'COMMERCIAL AD',
    kicker: 'SPECIAL COMMERCIAL GAZETTE',
    client: 'FINE JEWELRY BROADSIDE',
    byline: 'Sponsored Commercial Feature',
    category: 'Commercials',
    type: 'image',
    aspect: 'square',
    mediaSrc: '/show/wedding_collection.png',
    posterSrc: '/show/wedding_collection.png',
    edition: 'PAGE 02 • ADVERTISEMENT',
    duration: 'PRINT AD',
    resolution: '1080x1080 SQUARE',
    caption: 'Fig 2.10 — Commercial ad creative for the Luxury Gold & Diamond Wedding Collection.',
    dateline: 'COMMERCIAL DESK — ',
    col1: 'Explore our latest wedding collection in gold and diamond at an exclusive 25% discount available until 23rd November.',
    col2: 'Crafted with timeless elegance and certified purity. Visit authorized showrooms or reserve exclusive collection pieces online.',
    quote: 'Elegance refined. Tradition celebrated with royal gold craftsmanship.',
    tags: ['JEWELRY AD', '25% OFF', 'LUXURY BRAND']
  },
];

export default function MediaPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const containerRef = useRef(null);
  const broadsheetRef = useRef(null);

  // Drag physics refs
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: -400, y: 0, rotX: 0, rotY: 0 });
  const targetPos = useRef({ x: -400, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const sheet = broadsheetRef.current;
    if (!sheet) return;

    let animationFrameId;
    const renderLoop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;
      currentPos.current.rotX += (targetPos.current.rotX - currentPos.current.rotX) * 0.12;
      currentPos.current.rotY += (targetPos.current.rotY - currentPos.current.rotY) * 0.12;

      if (sheet) {
        sheet.style.transform = `
          translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)
          rotateX(${currentPos.current.rotX}deg)
          rotateY(${currentPos.current.rotY}deg)
        `;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);

    const handleMouseDown = (e) => {
      if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) {
        return;
      }
      isDragging.current = true;
      dragMoved.current = false;
      startPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragMoved.current = true;
        }
        targetPos.current.x += dx * 1.25;
        targetPos.current.y += dy * 1.25;
        startPos.current = { x: e.clientX, y: e.clientY };
      } else {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        targetPos.current.rotY = xNorm * 3;
        targetPos.current.rotX = -yNorm * 3;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Trackpad & Mousewheel support for pan in both X and Y
    const handleWheel = (e) => {
      targetPos.current.x -= e.deltaX * 0.9;
      targetPos.current.y -= e.deltaY * 0.9;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1 && !e.target.closest('input') && !e.target.closest('textarea')) {
        isDragging.current = true;
        dragMoved.current = false;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startPos.current.x;
        const dy = e.touches[0].clientY - startPos.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragMoved.current = true;
        }
        targetPos.current.x += dx * 1.4;
        targetPos.current.y += dy * 1.4;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleArticleClick = (article) => {
    if (dragMoved.current) return;
    setSelectedArticle(article);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#071120] select-none cursor-grab active:cursor-grabbing font-serif"
      style={{ perspective: '1400px' }}
    >
      {/* Ambient Deep Studio Lighting */}
      <div className="absolute inset-0 bg-[#071120] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#030812_90%)] pointer-events-none z-10" />

      {/* Floating HUD Instruction Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#111827]/95 border border-cyan-400/50 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-bold tracking-wider uppercase font-mono">
            DRAG TO PAN BROADSHEET • CLICK ANY ARTICLE TO READ & PLAY FULLSCREEN
          </span>
          <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2-PAGE SPREAD AUTHENTIC NEWSPAPER BROADSHEET CANVAS (3D) */}
      {/* ======================================================== */}
      <div
        ref={broadsheetRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3100px] h-[2550px] will-change-transform flex gap-10 p-6"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* PAGE 1: FRONT PAGE BROADSHEET (LEFT NEWSPAPER SHEET)         */}
        {/* ============================================================ */}
        <div 
          className="w-[1500px] h-full bg-[#F4F1EA] text-[#111827] border-4 border-[#1E293B] p-8 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          style={{
            transform: 'translateZ(45px)',
            backgroundImage: 'radial-gradient(#111827 0.75px, transparent 0.75px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div>
            {/* Top Newspaper Issue Bar */}
            <div className="flex items-center justify-between border-b-2 border-[#1E293B] pb-2 text-xs font-mono text-[#1E293B] font-bold">
              <span>VOL. XXVI // NO. 8802</span>
              <span>WEDNESDAY, AUGUST 19, 2026</span>
              <span>PRICE: COMPLETE MEDIA ARCHIVE</span>
              <span>WEATHER: 60FPS CINEMA // LAT 28.61° N</span>
            </div>

            {/* Grand Newspaper Masthead */}
            <div className="py-5 text-center border-b-4 border-double border-[#1E293B] my-2">
              <h1 className="text-7xl sm:text-8xl font-black uppercase tracking-tight text-[#0A0E17] leading-none">
                THE NAVRA CHRONICLE
              </h1>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1E293B]/40 text-xs font-mono text-[#374151] uppercase tracking-widest font-bold">
                <span>★ CINEMATIC REELS</span>
                <span>★ 3D MOTION CGI</span>
                <span>★ BRAND IDENTITIES</span>
                <span>★ FESTIVAL BROADCASTS</span>
                <span>★ LIVE CONCERTS</span>
                <span>★ COMMERCIAL SUITES</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 1. TOP SECTION: LEAD MASTER SHOWREEL (PORTRAIT 9:16)     */}
            {/* ======================================================== */}
            <div 
              onClick={() => handleArticleClick(SHOWCASE_ARTICLES[0])}
              className="group cursor-pointer border-b-2 border-[#1E293B] pb-6 my-4 transition-colors hover:bg-black/5 p-4 -mx-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-1.5">
                <span className="bg-[#E0F2FE] px-2 py-0.5 border border-[#0284C7]/40 uppercase tracking-wider">
                  {SHOWCASE_ARTICLES[0].kicker}
                </span>
                <span className="text-[#4B5563]">{SHOWCASE_ARTICLES[0].byline}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0A0E17] leading-tight mb-3 group-hover:text-[#0284C7] transition-colors">
                {SHOWCASE_ARTICLES[0].title}{' '}
                <span className="bg-[#0284C7] text-white px-2.5 py-0.5 font-mono text-2xl align-middle font-bold">
                  {SHOWCASE_ARTICLES[0].highlightWord}
                </span>
              </h2>

              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Master Reel (Exact Vertical 9:16 Portrait Frame) */}
                <div className="col-span-5">
                  <div className="relative w-full aspect-[9/16] max-h-[480px] bg-black border-2 border-[#1E293B] overflow-hidden shadow-2xl mx-auto">
                    <video
                      src={SHOWCASE_ARTICLES[0].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1.5 bg-[#0A0E17]/90 border border-cyan-400 text-xs font-mono text-cyan-300 font-bold flex items-center justify-center gap-2">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY MASTER 4K REEL</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-[#4B5563] mt-2 italic leading-tight text-center">
                    {SHOWCASE_ARTICLES[0].caption}
                  </p>
                </div>

                {/* Lead Article Multi-Column Story Text */}
                <div className="col-span-7 flex flex-col justify-between text-sm text-[#1F2937] leading-relaxed space-y-3 font-serif">
                  <p className="text-base leading-normal">
                    <strong className="text-[#0284C7] font-bold font-mono uppercase">{SHOWCASE_ARTICLES[0].dateline}</strong>
                    {SHOWCASE_ARTICLES[0].col1}
                  </p>
                  <p className="text-[#374151]">
                    {SHOWCASE_ARTICLES[0].col2}
                  </p>
                  <p className="text-[#4B5563] text-xs font-mono">
                    {SHOWCASE_ARTICLES[0].col3}
                  </p>
                  <div className="p-4 bg-[#E0F2FE]/60 border-l-4 border-[#0284C7] text-sm italic font-serif text-[#0C4A6E]">
                    "{SHOWCASE_ARTICLES[0].quote}"
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 2. MIDDLE SECTION: 3 VERTICAL PORTRAIT REEL COLUMNS      */}
            {/* ======================================================== */}
            <div className="grid grid-cols-3 gap-6 py-4 border-b-2 border-[#1E293B]">
              
              {/* WORKSHOP PROMO (Portrait 9:16) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[1])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-4 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[1].kicker}
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[1].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[300px] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[1].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 py-1 bg-[#0A0E17]/90 text-[10px] font-mono text-cyan-300 font-bold text-center">
                      ▶ PLAY WORKSHOP
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#374151] leading-snug">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[1].dateline}</strong>
                    {SHOWCASE_ARTICLES[1].col1}
                  </p>
                </div>
              </div>

              {/* PRE-ORDER AD (Portrait 9:16) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[2])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-4 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[2].kicker}
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[2].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[300px] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[2].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 py-1 bg-[#0A0E17]/90 text-[10px] font-mono text-cyan-300 font-bold text-center">
                      ▶ PLAY PRE-ORDER AD
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#374151] leading-snug">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[2].dateline}</strong>
                    {SHOWCASE_ARTICLES[2].col1}
                  </p>
                </div>
              </div>

              {/* INDIE MUSIC NIGHT (Portrait Reel) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[3])}
                className="group cursor-pointer hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[3].kicker}
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[3].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[300px] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[3].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 py-1 bg-[#0A0E17]/90 text-[10px] font-mono text-cyan-300 font-bold text-center">
                      ▶ PLAY CONCERT REEL
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#374151] leading-snug">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[3].dateline}</strong>
                    {SHOWCASE_ARTICLES[3].col1}
                  </p>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 3. LOWER SECTION: FESTIVALS (WIDE 16:9 + PORTRAIT REELS)  */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-6 py-4">
              
              {/* NAVRANG NAVRATRI (EXACT WIDE 16:9 LANDSCAPE FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[4])}
                className="col-span-6 group cursor-pointer border-r-2 border-[#1E293B] pr-5 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[4].kicker}
                  </span>
                  <h3 className="text-base font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[4].title}
                  </h3>
                  <div className="relative w-full aspect-[16/9] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[4].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-[#0A0E17] text-[9px] font-mono text-cyan-300 font-bold">
                      ▶ PLAY 16:9 STAGE CUT
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#4B5563] leading-snug">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[4].dateline}</strong>
                    {SHOWCASE_ARTICLES[4].col1}
                  </p>
                </div>
              </div>

              {/* TRADITIONAL ANIMATION (PORTRAIT 9:16) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[5])}
                className="col-span-3 group cursor-pointer border-r-2 border-[#1E293B] pr-3 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-1.5 py-0.5 w-max truncate">
                    {SHOWCASE_ARTICLES[5].kicker}
                  </span>
                  <h3 className="text-xs font-black uppercase text-[#0A0E17] leading-tight mb-1.5 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[5].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[190px] bg-black border-2 border-[#1E293B] overflow-hidden mb-1.5 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[5].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-[10px] font-serif text-[#4B5563] leading-tight line-clamp-3">
                    {SHOWCASE_ARTICLES[5].col1}
                  </p>
                </div>
              </div>

              {/* NAVRATRI RANGAT (PORTRAIT 9:16) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[6])}
                className="col-span-3 group cursor-pointer hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-1.5 py-0.5 w-max truncate">
                    {SHOWCASE_ARTICLES[6].kicker}
                  </span>
                  <h3 className="text-xs font-black uppercase text-[#0A0E17] leading-tight mb-1.5 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[6].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[190px] bg-black border-2 border-[#1E293B] overflow-hidden mb-1.5 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[6].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-[10px] font-serif text-[#4B5563] leading-tight line-clamp-3">
                    {SHOWCASE_ARTICLES[6].col1}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Page 1 Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-[#1E293B] pt-2.5 text-xs font-mono text-[#374151] font-bold">
            <span>THE NAVRA CHRONICLE // FRONT PAGE</span>
            <span className="text-[#0284C7] font-bold">PAGE 01 • CONTINUED ON PAGE 02 →</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PAGE 2: SECTION B (TECHNOLOGY, COMMERCE, ART & CLASSIFIEDS)  */}
        {/* ============================================================ */}
        <div 
          className="w-[1500px] h-full bg-[#F4F1EA] text-[#111827] border-4 border-[#1E293B] p-8 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          style={{
            transform: 'translateZ(45px)',
            backgroundImage: 'radial-gradient(#111827 0.75px, transparent 0.75px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div>
            {/* Section B Header Bar */}
            <div className="flex items-center justify-between border-b-2 border-[#1E293B] pb-2 text-xs font-mono text-[#1E293B] font-bold">
              <span>SECTION B // ARTS, TECHNOLOGY, POP-CULTURE & COMMERCE</span>
              <span>NAVRA STUDIO INTERNATIONAL EDITION</span>
              <span>PAGE 02 • VOL. XXVI</span>
            </div>

            {/* Top Banner */}
            <div className="py-3 text-center border-b-2 border-[#1E293B] my-2">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A0E17] leading-none">
                TECHNOLOGY, VISUAL ARTS & COMMERCIAL COMMERCE
              </h2>
            </div>

            {/* ======================================================== */}
            {/* 1. TOP ROW: CINEMA (16:9 WIDE) + 3D MOTION (9:16 PORTRAIT) */}
            {/* ======================================================== */}
            <div className="grid grid-cols-12 gap-6 my-2 border-b-2 border-[#1E293B] pb-4">
              
              {/* CINEMATIC WALK (EXACT 16:9 WIDESCREEN CINEMA FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[7])}
                className="col-span-8 group cursor-pointer border-r-2 border-[#1E293B] pr-6 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-1">
                    <span>{SHOWCASE_ARTICLES[7].kicker}</span>
                    <span>4K CINEMA 16:9</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[7].title}
                  </h3>
                  <div className="relative w-full aspect-[16/9] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-xl">
                    <video
                      src={SHOWCASE_ARTICLES[7].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 left-2 px-3 py-1 bg-[#0A0E17] text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY 16:9 CINEMA FILM</span>
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#374151] leading-relaxed">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[7].dateline}</strong>
                    {SHOWCASE_ARTICLES[7].col1}
                  </p>
                </div>
              </div>

              {/* 3D MOTION CGI (EXACT 9:16 PORTRAIT FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[8])}
                className="col-span-4 group cursor-pointer hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold mb-1">
                    <span>{SHOWCASE_ARTICLES[8].kicker}</span>
                    <span>60 FPS</span>
                  </div>
                  <h3 className="text-lg font-black uppercase text-[#0A0E17] leading-tight mb-2 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[8].title}
                  </h3>
                  <div className="relative w-full aspect-[9/16] max-h-[300px] bg-black border-2 border-[#1E293B] overflow-hidden mb-2 shadow-md">
                    <video
                      src={SHOWCASE_ARTICLES[8].mediaSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 py-1 bg-[#0A0E17]/90 text-[10px] font-mono text-cyan-300 font-bold text-center">
                      ▶ PLAY 3D MOTION
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#4B5563] leading-snug">
                    <strong className="text-[#0284C7] font-mono font-bold">{SHOWCASE_ARTICLES[8].dateline}</strong>
                    {SHOWCASE_ARTICLES[8].col1}
                  </p>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 2. MIDDLE ROW: EXACT 1:1 SQUARE BRAND DESIGN & UI ARCHIVE */}
            {/* ======================================================== */}
            <div className="grid grid-cols-3 gap-6 my-2 border-b-2 border-[#1E293B] pb-4">
              
              {/* AGENCY BRAND DESIGN (EXACT 1:1 SQUARE FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[9])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-4 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[9].kicker}
                  </span>
                  <h4 className="text-base font-black uppercase text-[#0A0E17] mb-1.5 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[9].title}
                  </h4>
                  <div className="w-full aspect-square bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center mb-1.5 shadow-md">
                    <img
                      src={SHOWCASE_ARTICLES[9].mediaSrc}
                      alt="Brand Identity"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-xs font-serif text-[#4B5563] leading-tight">
                    {SHOWCASE_ARTICLES[9].col1}
                  </p>
                </div>
              </div>

              {/* STUDIO SOFTWARE UI (EXACT 1:1 SQUARE FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[10])}
                className="group cursor-pointer border-r-2 border-[#1E293B] pr-4 hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[10].kicker}
                  </span>
                  <h4 className="text-base font-black uppercase text-[#0A0E17] mb-1.5 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[10].title}
                  </h4>
                  <div className="w-full aspect-square bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center mb-1.5 shadow-md">
                    <img
                      src={SHOWCASE_ARTICLES[10].mediaSrc}
                      alt="Studio UI"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-xs font-serif text-[#4B5563] leading-tight">
                    {SHOWCASE_ARTICLES[10].col1}
                  </p>
                </div>
              </div>

              {/* GRAPHIC DESIGN POSTER (EXACT 1:1 SQUARE FRAME) */}
              <div 
                onClick={() => handleArticleClick(SHOWCASE_ARTICLES[11])}
                className="group cursor-pointer hover:bg-black/5 p-2 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold block mb-1 uppercase bg-[#E0F2FE] px-2 py-0.5 w-max">
                    {SHOWCASE_ARTICLES[11].kicker}
                  </span>
                  <h4 className="text-base font-black uppercase text-[#0A0E17] mb-1.5 group-hover:text-[#0284C7]">
                    {SHOWCASE_ARTICLES[11].title}
                  </h4>
                  <div className="w-full aspect-square bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center mb-1.5 shadow-md">
                    <img
                      src={SHOWCASE_ARTICLES[11].mediaSrc}
                      alt="Graphic Poster"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-xs font-serif text-[#4B5563] leading-tight">
                    {SHOWCASE_ARTICLES[11].col1}
                  </p>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 3. PANORAMA BANNER (EXACT ULTRA-WIDE 2000x647 BANNER)    */}
            {/* ======================================================== */}
            <div 
              onClick={() => handleArticleClick(SHOWCASE_ARTICLES[12])}
              className="group cursor-pointer border-b-2 border-[#1E293B] pb-3 my-2 hover:bg-black/5 p-2 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#0284C7] font-bold mb-1">
                <span>{SHOWCASE_ARTICLES[12].kicker}</span>
                <span>PANORAMA VIEW</span>
              </div>
              <div className="w-full aspect-[20/6] bg-black border-2 border-[#1E293B] overflow-hidden mb-1 shadow-md">
                <img
                  src={SHOWCASE_ARTICLES[12].mediaSrc}
                  alt="Panorama Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[11px] font-mono text-[#4B5563] text-center italic">
                {SHOWCASE_ARTICLES[12].caption}
              </p>
            </div>

            {/* ======================================================== */}
            {/* 4. LUXURY JEWELRY GAZETTE AD BOX (EXACT 1:1 SQUARE AD)   */}
            {/* ======================================================== */}
            <div 
              onClick={() => handleArticleClick(SHOWCASE_ARTICLES[16])}
              className="group cursor-pointer border-4 border-[#B45309] bg-[#FFFBEB] p-4 my-2 hover:bg-[#FEF3C7] transition-colors"
            >
              <div className="flex items-center justify-between border-b-2 border-[#B45309] pb-1.5 text-xs font-mono text-[#B45309] font-bold mb-2">
                <span>★ OFFICIAL COMMERCIAL GAZETTE ADVERTISEMENT</span>
                <span className="bg-[#B45309] text-white px-2 py-0.5">COUPON: NAVRA25</span>
              </div>
              <div className="grid grid-cols-12 gap-5 items-center">
                <div className="col-span-4 aspect-square bg-black border-2 border-[#1E293B] overflow-hidden flex items-center justify-center shadow-md">
                  <img
                    src={SHOWCASE_ARTICLES[16].mediaSrc}
                    alt="Jewelry Ad"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="col-span-8 font-serif text-xs text-[#1F2937] leading-snug space-y-1.5">
                  <h4 className="text-xl font-black uppercase text-[#92400E]">
                    {SHOWCASE_ARTICLES[16].title}
                  </h4>
                  <p className="text-xs text-[#4B5563]">
                    {SHOWCASE_ARTICLES[16].col1}
                  </p>
                  <div className="text-xs font-mono text-[#B45309] font-bold pt-1">
                    ▶ CLICK TO VIEW FULL COMMERCIAL POSTER
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 5. BOTTOM: PRESS CLASSIFIEDS & INQUIRY BUREAU (SECTION C)*/}
            {/* ======================================================== */}
            <div className="border-4 border-[#1E293B] bg-[#E2E8F0]/40 p-4 my-2">
              <div className="flex items-center justify-between border-b-2 border-[#1E293B] pb-1.5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse" />
                  <span className="text-[#0A0E17] font-bold uppercase tracking-wider">
                    SECTION C // OFFICIAL PRESS CLASSIFIEDS & DISPATCH BUREAU
                  </span>
                </div>
                <Barcode className="w-8 h-4 text-[#1E293B]" />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2.5">
                <div className="col-span-5 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <h4 className="text-base font-black font-serif uppercase text-[#0A0E17] mb-1">
                      Commission a Media Production Sprint
                    </h4>
                    <p className="text-[11px] font-serif text-[#374151] leading-relaxed mb-2">
                      Direct inquiries for promotional reels, 3D CGI visuals, or complete brand identity systems.
                    </p>
                    <div className="space-y-1 text-xs">
                      <a href="mailto:harshjsh02@gmail.com" className="flex items-center gap-2 text-[#0284C7] font-bold hover:underline">
                        <Mail className="w-3.5 h-3.5" />
                        <span>harshjsh02@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-2 text-[#4B5563]">
                        <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Designed & Built by Harsh Joshi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-[#F4F1EA] border-2 border-[#1E293B] p-3 shadow-inner">
                  {formSubmitted ? (
                    <div className="flex items-center justify-center p-3 text-center space-x-2 text-[#0284C7] font-mono text-xs font-bold">
                      <CheckCircle2 className="w-5 h-5 text-[#0284C7]" />
                      <span>DISPATCH TRANSMITTED // BUREAU WILL REPLY IN 24H</span>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-1.5 text-xs font-mono">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          required
                          type="text"
                          placeholder="Name / Organization"
                          className="w-full px-2 py-1 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-2 py-1 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                        />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Project Brief & Requirements..."
                        className="w-full px-2 py-1 bg-white border border-[#1E293B] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#0284C7]"
                      />
                      <button
                        type="submit"
                        className="w-full py-1.5 bg-[#0A0E17] text-white font-black uppercase tracking-wider text-[11px] hover:bg-[#0284C7] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>Transmit Project Dispatch</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page 2 Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-[#1E293B] pt-2.5 text-xs font-mono text-[#374151] font-bold">
            <span>NAVRA CHRONICLE // ALL RIGHTS RESERVED • HARSH JOSHI</span>
            <span className="text-[#0284C7] font-bold">PAGE 02 • END OF SPECIAL EDITION</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULL-SCREEN ARTICLE & VIDEO CINEMA MODAL                 */}
      {/* ======================================================== */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#030D1E] border-2 border-cyan-400/50 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-100 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-white/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  [{selectedArticle.edition}] // {selectedArticle.kicker}
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-serif uppercase text-white mt-0.5">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center border border-white/15 mb-4 overflow-hidden">
              {selectedArticle.type === 'video' ? (
                <video
                  src={selectedArticle.mediaSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedArticle.mediaSrc}
                  alt={selectedArticle.title}
                  className="w-full h-full object-contain p-2"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono mb-2">
                  <strong className="text-cyan-300">{selectedArticle.dateline}</strong>
                  {selectedArticle.col1} {selectedArticle.col2}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedArticle.tags?.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-cyan-400/20 text-cyan-300 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shrink-0 cursor-pointer"
              >
                <span>Back to Broadsheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
