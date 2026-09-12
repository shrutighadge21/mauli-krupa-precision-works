import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Crosshair } from 'lucide-react';

const TOTAL_FRAMES = 60;
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => 
  `/images/cad_dense_sequence/frame_${String(i).padStart(2, '0')}.png`
);

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  // 5 Clear Industry Stages based on Mauli Krupa Precision Works capabilities
  const industries = [
    {
      number: '01',
      id: 'railways',
      title: 'Railways',
      subtitle: 'Rolling Stock & Heavy Tooling',
      stageTag: 'Stage 01 — Fully Assembled Machine System',
      statusText: 'ASSEMBLED',
      image: '/images/cad_fixture/fixture_assembled.png',
      imageAlt: 'Mauli Krupa Precision Works Fully Assembled Machine System',
      description: 'Heavy structural tooling, bogie fabrication fixtures and high-load assemblies built strictly to Indian Railways & defense engineering standards.',
      highlights: [
        'Bogie fabrication & structural welding tooling',
        'High-tonnage hydraulic press weldment structures'
      ],
      targetScroll: 0.05
    },
    {
      number: '02',
      id: 'automotive',
      title: 'Automotive',
      subtitle: 'BIW Fixtures & Assembly Jigs',
      stageTag: 'Stage 02 — Early Component Separation',
      statusText: 'EARLY SEPARATION',
      image: '/images/cad_fixture/part_left_clamps.png',
      imageAlt: 'Precision Modular Clamping Jigs and BIW Fixture Tooling',
      description: 'Precision Body-In-White (BIW) clamping frames, datum-aligned welding jigs and concentricity inspection gauges for automotive Tier-1 OEMs.',
      highlights: [
        'Robotic welding & modular BIW toggle jigs',
        'Concentricity checking & WIP transit racks'
      ],
      targetScroll: 0.25
    },
    {
      number: '03',
      id: 'manufacturing-automation',
      title: 'Manufacturing & Automation',
      subtitle: 'Custom Machinery & SPMs',
      stageTag: 'Stage 03 — Partial Sub-Assembly Explosion',
      statusText: 'PARTIAL EXPLOSION',
      image: '/images/cad_fixture/part_right_slide.png',
      imageAlt: 'Linear Actuation, Servo Gantry & Precision Slide Drive',
      description: 'Turnkey Special Purpose Machines (SPMs), automated straightening presses and calibrated fluid test benches built strictly to customer drawings.',
      highlights: [
        'Automated Welding SPM machines & jigs',
        'Shaft straightening presses & digital test rigs'
      ],
      targetScroll: 0.50
    },
    {
      number: '04',
      id: 'heavy-engineering',
      title: 'Heavy Engineering',
      subtitle: 'Fabricated Structures & Machine Beds',
      stageTag: 'Stage 04 — Advanced Disassembly Stage',
      statusText: 'MOSTLY EXPLODED',
      image: '/images/cad_fixture/part_base_plate.png',
      imageAlt: 'Heavy Duty Ground Milled T-Slot Base Bed Structure',
      description: 'Stress-relieved ground base tables, heavy equipment weldments and precision-machined structures built with 400A MIG welding capacity.',
      highlights: [
        'Precision T-slot machine beds & base tables',
        'Heavy structural tooling & 400A MIG weldments'
      ],
      targetScroll: 0.75
    },
    {
      number: '05',
      id: 'industrial-production',
      title: 'Industrial Production',
      subtitle: 'Material Handling & Conveyors',
      stageTag: 'Stage 05 — Complete Exploded Engineering View',
      statusText: 'FULLY EXPLODED',
      image: '/images/cad_fixture/fixture_exploded.png',
      imageAlt: 'Complete 3D Exploded Engineering Assembly View',
      description: 'Continuous conveyor networks, magnetic scrap discharge systems and heavy-duty shopfloor transit trolleys built for continuous operations.',
      highlights: [
        'Z-type magnetic & PVC heavy belt conveyors',
        'Multi-tier transit trolleys & material racks'
      ],
      targetScroll: 0.95
    }
  ];

  const stageStatusLabels = [
    'STAGE 01 — ASSEMBLED',
    'STAGE 02 — EARLY SEPARATION',
    'STAGE 03 — PARTIAL EXPLOSION',
    'STAGE 04 — MOSTLY EXPLODED',
    'STAGE 05 — FULLY EXPLODED'
  ];

  // Preload all 60 dense CAD sequence frames into memory
  useEffect(() => {
    const loadedImages = [];
    FRAME_PATHS.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        // Render initial frame 0 on load
        if (idx === 0 && canvasRef.current && currentProgressRef.current <= 0.01) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, 1376, 768);
          ctx.globalAlpha = 1;
          ctx.drawImage(img, 0, 0, 1376, 768);
        }
      };
      loadedImages[idx] = img;
    });
    imagesRef.current = loadedImages;
  }, []);

  // Dedicated 60fps RAF loop with continuous sub-frame scrubbing
  useEffect(() => {
    let isRunning = true;

    const renderFrame = (progressVal) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const images = imagesRef.current;
      if (!images || images.length !== TOTAL_FRAMES) return;

      const floatIndex = progressVal * (TOTAL_FRAMES - 1);
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(floatIndex)));

      const currentImg = images[frameIdx];

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.clearRect(0, 0, 1376, 768);
        ctx.globalAlpha = 1;
        ctx.drawImage(currentImg, 0, 0, 1376, 768);
      }
    };

    const updateLoop = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        // Fluid physical dampening (lerp factor: 0.20 for responsive, silky-smooth scrubbing)
        const next = current + diff * 0.20;
        currentProgressRef.current = next;
        setScrollProgress(next);
        renderFrame(next);

        // Smooth milestone sync for right-side description & left directory (no jumping)
        let newIndex = 0;
        if (next < 0.20) {
          newIndex = 0;
        } else if (next < 0.40) {
          newIndex = 1;
        } else if (next < 0.60) {
          newIndex = 2;
        } else if (next < 0.80) {
          newIndex = 3;
        } else {
          newIndex = 4;
        }
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
      } else if (current !== target) {
        currentProgressRef.current = target;
        setScrollProgress(target);
        renderFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // High-performance scroll listener updating normalized target progress
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable > 0) {
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      targetProgressRef.current = progress;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth programmatic scroll when clicking any industry in the list or scrubber
  const scrollToIndustry = (index) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;
    const targetP = industries[index].targetScroll;
    const targetScroll = sectionTop + targetP * totalScrollable;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const activeIndustry = industries[activeIndex];
  const initialPromptOpacity = Math.max(0, 1 - scrollProgress * 12);
  const p = scrollProgress;

  return (
    <section
      id="industries"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        color: '#111827',
        minHeight: '380vh', // Generous runway for intentional, smooth engineering storytelling
        borderTop: '1px solid #f1f3f5',
        borderBottom: '1px solid #f1f3f5'
      }}
    >
      {/* Pinned Sticky Viewport: Remains firmly locked while user scrolls through the continuous explosion */}
      <div
        className="industries-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3vh, 32px) 0 clamp(16px, 2.4vh, 24px) 0',
          backgroundColor: '#ffffff',
          zIndex: 2
        }}
      >
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#c52227',
                  marginBottom: '4px'
                }}
              >
                WHERE WE DELIVER VALUE
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase'
                }}
              >
                INDUSTRIES WE SERVE
              </h2>

              <p
                style={{
                  fontSize: 'clamp(13.5px, 1.1vw, 15px)',
                  color: '#64748b',
                  margin: 0
                }}
              >
                Precision engineering and custom manufacturing systems applied across critical industrial sectors.
              </p>
            </div>

            {/* Minimal Link: EXPLORE ALL SECTORS -> /industries */}
            <Link
              to="/industries"
              className="minimal-text-link"
            >
              <span>EXPLORE ALL SECTORS</span>
              <span className="read-more-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN 3-COLUMN STAGE (LEFT LIST + CENTER VISUAL + RIGHT INFO)           */}
        {/* ========================================================================= */}
        <div
          className="container-custom"
          style={{
            position: 'relative',
            zIndex: 5,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            minHeight: 0
          }}
        >
          <div
            className="industries-three-col-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 0.95fr) minmax(580px, 3.8fr) minmax(250px, 1.15fr)',
              gap: 'clamp(16px, 2.5vw, 40px)',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {/* ===================================================================== */}
            {/* LEFT COLUMN: 5 SECTOR ITEMS WITH SMOOTH SLIDING RED ACTIVE BAR        */}
            {/* ===================================================================== */}
            <div className="left-industry-nav" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                SECTOR DIRECTORY
              </div>

              {/* Relative Nav Item List */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Smooth Animated Active Red Indicator Bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '44px',
                    backgroundColor: '#c52227',
                    borderRadius: '2px',
                    transform: `translateY(${activeIndex * 56}px)`,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2
                  }}
                />

                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <div
                      key={ind.id}
                      onClick={() => scrollToIndustry(idx)}
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        paddingLeft: '16px',
                        height: '44px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        opacity: isActive ? 1 : 0.45,
                        transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="industry-nav-item"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-tech)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: isActive ? '#c52227' : '#64748b',
                            letterSpacing: '0.08em',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {ind.number}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '14px',
                            fontWeight: isActive ? 800 : 600,
                            color: isActive ? '#111827' : '#475569',
                            letterSpacing: '0.01em',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          — {ind.title}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '11px',
                          color: isActive ? '#4b5563' : '#94a3b8',
                          marginTop: '2px',
                          lineHeight: 1.25,
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {ind.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* CENTER COLUMN: HIGH-PRECISION CAD CANVAS EXPLODED ENGINE              */}
            {/* ===================================================================== */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              {/* Engineering Status Tag with Dynamic Stage Name */}
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Crosshair size={13} color="#c52227" />
                <span style={{ color: '#111827', fontWeight: 800 }}>MKP PRECISION ASSEMBLY</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ color: '#c52227', fontWeight: 700 }}>
                  {stageStatusLabels[activeIndex]}
                </span>
              </div>

              {/* Main Visual Stage: Centered, Camera-Locked Engineering Canvas */}
              <div
                className="main-engineering-canvas"
                style={{
                  position: 'relative',
                  width: 'min(860px, 100%)',
                  height: 'clamp(340px, 44vh, 470px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible'
                }}
              >
                {/* Dynamic Radial Ambient Ground Shadow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '3%',
                    width: '84%',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transform: `scale(${1 + p * 0.10}) translateY(${p * 16}px)`,
                    opacity: Math.max(0.08, 0.18 - p * 0.06),
                    transition: 'transform 0.05s linear, opacity 0.05s linear'
                  }}
                />

                {/* Hardware-Accelerated 1376x768 Engineering Canvas */}
                <canvas
                  ref={canvasRef}
                  width={1376}
                  height={768}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.08))',
                    zIndex: 4
                  }}
                />
              </div>

              {/* =================================================================== */}
              {/* SUBTLE PROGRESS INDICATOR: 01 — 02 — 03 — 04 — 05                   */}
              {/* =================================================================== */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '10px',
                  userSelect: 'none'
                }}
                className="industries-stage-progress-bar"
              >
                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <React.Fragment key={ind.id}>
                      {idx > 0 && (
                        <span
                          style={{
                            color: idx <= activeIndex ? '#c52227' : '#e2e8f0',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            transition: 'color 0.35s ease'
                          }}
                        >
                          —
                        </span>
                      )}

                      <button
                        onClick={() => scrollToIndustry(idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'none',
                          border: 'none',
                          padding: '4px 6px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '12px',
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? '#c52227' : '#94a3b8',
                          letterSpacing: '0.06em',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          transform: isActive ? 'scale(1.08)' : 'scale(1)'
                        }}
                        aria-label={`Go to Stage ${ind.number} - ${ind.title}`}
                      >
                        {isActive && (
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#c52227',
                              display: 'inline-block',
                              boxShadow: '0 0 8px rgba(197, 34, 39, 0.6)'
                            }}
                          />
                        )}
                        <span>{ind.number}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Initial "Scroll to Explore" Prompt (Smoothly fades out on initial scroll) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  opacity: initialPromptOpacity,
                  pointerEvents: 'none',
                  transition: 'opacity 0.25s ease'
                }}
              >
                <span>SCROLL TO EXPLORE ASSEMBLY</span>
                <ChevronDown size={13} />
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: SYNCHRONIZED INDUSTRY INFORMATION (ZERO LAYOUT SHIFT)  */}
            {/* ===================================================================== */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                position: 'relative',
                minHeight: '290px'
              }}
              className="right-industry-detail"
            >
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                INDUSTRY APPLICATION
              </div>

              {/* Stacked 5-Stage Industry Content Layers (Clean smooth crossfade without unmounting) */}
              <div style={{ position: 'relative', width: '100%', minHeight: '250px' }}>
                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;

                  return (
                    <div
                      key={ind.id}
                      style={{
                        position: idx === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? 'translateY(0)'
                          : isPast
                          ? 'translateY(-12px)'
                          : 'translateY(12px)',
                        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isActive ? 'auto' : 'none',
                        visibility: isActive ? 'visible' : 'hidden'
                      }}
                    >
                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(20px, 2vw, 24px)',
                          fontWeight: 800,
                          lineHeight: 1.18,
                          color: '#111827',
                          margin: '0 0 4px 0',
                          textTransform: 'uppercase'
                        }}
                      >
                        {ind.number} / {ind.title}
                      </h3>

                      {/* Subtitle */}
                      <div
                        style={{
                          fontFamily: 'var(--font-tech)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#4b5563',
                          marginBottom: '12px'
                        }}
                      >
                        {ind.subtitle}
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '13.5px',
                          lineHeight: 1.6,
                          color: '#64748b',
                          margin: '0 0 16px 0'
                        }}
                      >
                        {ind.description}
                      </p>

                      {/* 2 Clean Bullet Highlights with subtle red accent dots */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          marginBottom: '20px'
                        }}
                      >
                        {ind.highlights.map((item, hIdx) => (
                          <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: '#c52227',
                                marginTop: '6px',
                                flexShrink: 0
                              }}
                            />
                            <span style={{ fontSize: '12.5px', color: '#1f2937', fontWeight: 600, lineHeight: 1.4 }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Direct CTA Link */}
                      <Link
                        to="/contact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#c52227',
                          textDecoration: 'none',
                          padding: '6px 0',
                          borderBottom: '1.5px solid rgba(197, 34, 39, 0.3)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderBottomColor = '#c52227';
                          e.currentTarget.style.color = '#b31b20';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderBottomColor = 'rgba(197, 34, 39, 0.3)';
                          e.currentTarget.style.color = '#c52227';
                        }}
                      >
                        <span>INQUIRE FOR {ind.title}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM STATUS BAR                                                      */}
        {/* ========================================================================= */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div
            className="industries-bottom-status-row"
            style={{
              paddingTop: '10px',
              borderTop: '1px solid #f1f3f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-tech)',
              fontSize: '11px',
              color: '#94a3b8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <div className="status-bracket-left">[01] FULLY ASSEMBLED</div>
            <div className="status-center-tag" style={{ color: '#c52227', fontWeight: 700, textAlign: 'center' }}>
              {activeIndustry.stageTag}
            </div>
            <div className="status-bracket-right">[05] COMPLETE EXPLODED CAD VIEW</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .industries-sticky-viewport * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media (max-width: 992px) {
          .industries-sticky-viewport {
            height: 100vh !important;
            height: 100dvh !important;
            padding: clamp(12px, 2vh, 20px) 0 !important;
          }
          .industries-three-col-layout {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .left-industry-nav {
            display: none !important;
          }
          .main-engineering-canvas {
            height: clamp(200px, 32vh, 320px) !important;
          }
          .right-industry-detail {
            min-height: auto !important;
            text-align: center !important;
            align-items: center !important;
          }
          .right-industry-detail h3 {
            font-size: 19px !important;
          }
          .right-industry-detail p {
            font-size: 13px !important;
            margin-bottom: 10px !important;
            max-width: 480px !important;
          }
          .industries-stage-progress-bar {
            margin-top: 6px !important;
          }
        }

        @media (max-width: 768px) {
          .status-bracket-left,
          .status-bracket-right {
            display: none !important;
          }
          .industries-bottom-status-row {
            justify-content: center !important;
          }
          .status-center-tag {
            font-size: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}



