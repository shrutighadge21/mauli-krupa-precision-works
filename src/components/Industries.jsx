import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Crosshair } from 'lucide-react';

export default function Industries() {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const sectionRef = useRef(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  // 5 Clear Industry Stages based on Mauli Krupa Precision Works capabilities
  const industries = [
    {
      number: '01',
      id: 'railways',
      title: 'Railways',
      subtitle: 'Rolling Stock & Heavy Tooling',
      stageName: 'Stage 01 — Fully Assembled Machine System',
      stageDesc: 'Complete, locked industrial engineering system',
      description: 'Heavy structural tooling, bogie fabrication fixtures and high-load assemblies built to strict railway engineering standards.',
      highlights: [
        'Bogie fabrication & structural tooling',
        'High-tonnage hydraulic press structures'
      ],
      targetScroll: 0.10
    },
    {
      number: '02',
      id: 'automotive',
      title: 'Automotive',
      subtitle: 'BIW Fixtures & Assembly Jigs',
      stageName: 'Stage 02 — Precision Clamping Units',
      stageDesc: 'Modular BIW clamping fixtures separate outward',
      description: 'Precision Body-In-White (BIW) clamping frames, welding jigs and datum-aligned tooling for Tier-1 automotive manufacturing.',
      highlights: [
        'Robotic welding & BIW clamping jigs',
        'Concentricity checking & WIP transit racks'
      ],
      targetScroll: 0.30
    },
    {
      number: '03',
      id: 'manufacturing-automation',
      title: 'Manufacturing & Automation',
      subtitle: 'Custom Machinery & Automation',
      stageName: 'Stage 03 — Servo Gantry & Linear Actuation',
      stageDesc: 'Servo gantry & linear guide actuators lift upward',
      description: 'Turnkey Special Purpose Machines (SPMs), automated straightening presses and digital test rigs engineered to client drawings.',
      highlights: [
        'Automated Welding SPM machinery',
        'Shaft straightening presses & testing rigs'
      ],
      targetScroll: 0.50
    },
    {
      number: '04',
      id: 'heavy-engineering',
      title: 'Heavy Engineering',
      subtitle: 'Fabricated Structures & Machine Bases',
      stageName: 'Stage 04 — Milled T-Slot Base Bed',
      stageDesc: 'Milled T-slot foundation base plate moves downward',
      description: 'Stress-relieved ground base tables, heavy equipment weldments and precision-machined structures built for dynamic load.',
      highlights: [
        'Precision T-slot machine bases & beds',
        'Heavy structural tooling & 400A MIG welding'
      ],
      targetScroll: 0.70
    },
    {
      number: '05',
      id: 'industrial-production',
      title: 'Industrial Production',
      subtitle: 'Material Handling & Conveyor Lines',
      stageName: 'Stage 05 — Exploded Engineering View',
      stageDesc: 'Complete balanced CAD architecture & material flow',
      description: 'Continuous conveyor networks, magnetic scrap discharge systems and pneumatic zero-gravity lifting tackles.',
      highlights: [
        'Z-type magnetic & PVC belt conveyors',
        'Pneumatic lifting tackles & track conveyors'
      ],
      targetScroll: 0.90
    }
  ];

  // Physics-based lerp scroll loop for liquid-smooth continuous scrubbing
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      targetProgressRef.current = rawProgress;
    };

    const updateSmoothLoop = () => {
      // Smooth lerp easing factor for fluid cinematic scrubbing
      const diff = targetProgressRef.current - smoothProgressRef.current;
      smoothProgressRef.current += diff * 0.085;

      setSmoothProgress(smoothProgressRef.current);
      animationFrameId = requestAnimationFrame(updateSmoothLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(updateSmoothLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const p = smoothProgress;

  // 5 Defined Stages across 650vh runway
  let activeIndustryIdx = 0;
  if (p < 0.20) {
    activeIndustryIdx = 0; // Stage 1: Railways (0% to 20%) - 100% Solid Assembled System Hold
  } else if (p < 0.40) {
    activeIndustryIdx = 1; // Stage 2: Automotive (20% to 40%) - Clamps exploration
  } else if (p < 0.60) {
    activeIndustryIdx = 2; // Stage 3: Manufacturing & Automation (40% to 60%) - Internal Gantry
  } else if (p < 0.80) {
    activeIndustryIdx = 3; // Stage 4: Heavy Engineering (60% to 80%) - Base separation
  } else {
    activeIndustryIdx = 4; // Stage 5: Industrial Production (80% to 100%) - Full Exploded CAD View
  }

  const activeIndustry = industries[activeIndustryIdx];

  // Smooth, gradual separation curve:
  // p: 0.00 - 0.20 -> 100% Solid Assembled System (sep = 0.0, zero movement)
  // p: 0.20 - 0.80 -> Slow, continuous gradual separation (sep = 0.0 -> 1.0)
  // p: 0.80 - 1.00 -> Complete stable exploded architecture (sep = 1.0)
  let rawSep = 0;
  if (p > 0.20 && p < 0.80) {
    rawSep = (p - 0.20) / (0.80 - 0.20);
  } else if (p >= 0.80) {
    rawSep = 1.0;
  }
  // Smooth cubic ease for natural mechanical motion
  const sep = rawSep * rawSep * (3 - 2 * rawSep);

  // Solid Assembled Image Opacity: 1.0 during Stage 1, smoothly crossfades
  const solidAssembledOpacity = Math.max(0, 1 - sep * 1.6);
  const explodedLayersOpacity = Math.min(1, sep * 2.0);

  const isFullyAssembled = p < 0.20;
  const isFullyExploded = p >= 0.80;

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

  const getStageWeight = (idx) => {
    const stageFloat = Math.min(Math.max(p * 5, 0), 4.999);
    const dist = Math.abs(stageFloat - idx);
    return Math.max(0, 1 - dist * 1.25);
  };

  const weight01 = getStageWeight(0);
  const weight02 = getStageWeight(1);
  const weight03 = getStageWeight(2);
  const weight04 = getStageWeight(3);
  const weight05 = getStageWeight(4);

  return (
    <section
      id="industries"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        color: '#111827',
        minHeight: '650vh', // Extended 650vh runway for slow, deliberate, scroll-controlled pacing
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      {/* Pinned Sticky Viewport: Remains locked on screen while user scrubs through the 5-stage story */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0 16px 0',
          backgroundColor: '#ffffff',
          zIndex: 2
        }}
      >
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (CLEAN & MINIMAL + EXPLORE INDUSTRIES LINK)             */}
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
                Precision engineering and manufacturing systems applied across critical industrial sectors.
              </p>
            </div>

            {/* Minimal Link: EXPLORE INDUSTRIES -> /industries */}
            <Link
              to="/industries"
              className="minimal-text-link"
            >
              <span>EXPLORE INDUSTRIES</span>
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
            width: '100%'
          }}
        >
          <div
            className="industries-three-col-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(210px, 1.1fr) minmax(540px, 3.4fr) minmax(230px, 1.3fr)',
              gap: 'clamp(20px, 3.5vw, 52px)',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {/* ===================================================================== */}
            {/* LEFT COLUMN: ALL 5 INDUSTRIES PERMANENTLY VISIBLE & READABLE          */}
            {/* ===================================================================== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="left-industry-nav">
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: '2px'
                }}
              >
                INDUSTRIES SERVED
              </div>

              {industries.map((ind, idx) => {
                const itemWeight = getStageWeight(idx);

                return (
                  <div
                    key={ind.id}
                    onClick={() => scrollToIndustry(idx)}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      paddingLeft: '14px',
                      borderLeft: `2.5px solid ${itemWeight > 0.25 ? '#c52227' : 'transparent'}`,
                      transition: 'border-color 0.25s ease, transform 0.25s ease',
                      opacity: 0.55 + itemWeight * 0.45,
                      transform: `translateX(${itemWeight * 4}px)`
                    }}
                    className="industry-nav-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-tech)',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: itemWeight > 0.35 ? '#c52227' : '#64748b',
                          letterSpacing: '0.08em',
                          transition: 'color 0.25s ease'
                        }}
                      >
                        {ind.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '14px',
                          fontWeight: itemWeight > 0.35 ? 800 : 600,
                          color: itemWeight > 0.35 ? '#111827' : '#334155',
                          letterSpacing: '0.01em',
                          transition: 'color 0.25s ease'
                        }}
                      >
                        — {ind.title}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '11px',
                        color: itemWeight > 0.35 ? '#4b5563' : '#64748b',
                        marginTop: '2px',
                        lineHeight: 1.35,
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {ind.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===================================================================== */}
            {/* CENTER COLUMN: ONE COMPLETE FULLY ASSEMBLED SYSTEM (HERO)             */}
            {/* ===================================================================== */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px'
              }}
            >
              {/* Engineering System Status Tag */}
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Crosshair size={12} style={{ color: '#c52227' }} />
                <span>MKP PRECISION ENGINEERING SYSTEM</span>
                <span style={{ color: '#c52227' }}>•</span>
                <span style={{ color: isFullyAssembled ? '#111827' : '#c52227', transition: 'color 0.3s ease' }}>
                  {activeIndustry.stageName}
                </span>
              </div>

              {/* Main Visual Stage (Occupies ~60% of Visual Center) */}
              <div
                className="main-engineering-canvas"
                style={{
                  position: 'relative',
                  width: 'min(660px, 100%)',
                  height: 'clamp(330px, 37vw, 420px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  perspective: '1200px'
                }}
              >
                {/* 1. Soft Ambient Ground Floor Shadow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8%',
                    width: '88%',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0) 70%)',
                    transform: `scale(${1 + sep * 0.1})`,
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* ================================================================= */}
                {/* 2. SOLID COMPLETE ASSEMBLED HERO MACHINE (100% IN INITIAL STATE)  */}
                {/* ================================================================= */}
                <div
                  style={{
                    position: 'absolute',
                    width: '95%',
                    opacity: solidAssembledOpacity,
                    pointerEvents: sep > 0.3 ? 'none' : 'auto',
                    transition: 'opacity 0.08s linear',
                    zIndex: 10,
                    filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.08))'
                  }}
                >
                  <img
                    src="/images/cad_fixture/fixture_assembled.png"
                    alt="Mauli Krupa Precision Works Complete Assembled Engineering System"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                {/* ================================================================= */}
                {/* 3. PHYSICAL CONSTITUENT LAYERS (SEPARATE SLOWLY ONLY WHEN SCROLLING)*/}
                {/* ================================================================= */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: explodedLayersOpacity,
                    pointerEvents: sep > 0.1 ? 'auto' : 'none',
                    transition: 'opacity 0.08s linear',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* COMPONENT A: REACTION T-SLOT BASE PLATE (Moves Downward) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: `${8 - sep * 3}%`,
                      width: '85%',
                      transform: `translate3d(0, ${sep * 32}px, 0)`,
                      zIndex: weight04 > 0.3 ? 15 : 2,
                      filter: weight04 > 0.3
                        ? `drop-shadow(0 16px 26px rgba(197, 34, 39, ${weight04 * 0.35}))`
                        : 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08))'
                    }}
                  >
                    <img
                      src="/images/cad_fixture/part_base_plate.png"
                      alt="Reaction T-Slot Base Plate Structure"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* COMPONENT B: CENTER WORKPIECE SUBSTRATE (Floats in Central Machining Datum) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '32%',
                      width: '44%',
                      transform: `translate3d(0, ${-sep * 8}px, ${sep * 14}px)`,
                      zIndex: weight05 > 0.3 ? 15 : 4,
                      filter: weight05 > 0.3
                        ? `drop-shadow(0 14px 26px rgba(197, 34, 39, ${weight05 * 0.35}))`
                        : 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12))'
                    }}
                  >
                    <img
                      src="/images/cad_fixture/part_center_workpiece.png"
                      alt="Precision Workpiece Substrate & Alignment Stops"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* COMPONENT C: LEFT MODULAR CLAMPING JIG & TOGGLE CLAMPS (Moves Outward to Left) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '26%',
                      left: `${-sep * 14}%`,
                      width: '42%',
                      transform: `translate3d(${-sep * 38}px, ${sep * 5}px, ${sep * 18}px)`,
                      zIndex: weight02 > 0.3 ? 15 : 5,
                      filter: weight02 > 0.3
                        ? `drop-shadow(0 16px 28px rgba(197, 34, 39, ${weight02 * 0.35}))`
                        : 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.1))'
                    }}
                  >
                    <img
                      src="/images/cad_fixture/part_left_clamps.png"
                      alt="Modular BIW Clamping Jigs"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* COMPONENT D: RIGHT LINEAR GUIDE RAIL & SERVO DRIVE (Moves Outward to Right) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '28%',
                      right: `${-sep * 12}%`,
                      width: '42%',
                      transform: `translate3d(${sep * 36}px, ${sep * 7}px, ${sep * 18}px)`,
                      zIndex: weight03 > 0.3 ? 15 : 5,
                      filter: weight03 > 0.3
                        ? `drop-shadow(0 16px 28px rgba(197, 34, 39, ${weight03 * 0.35}))`
                        : 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.1))'
                    }}
                  >
                    <img
                      src="/images/cad_fixture/part_right_slide.png"
                      alt="Linear Guide Rail & Servo Drive"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* COMPONENT E: TOP STRUCTURAL BRIDGE & GANTRY COLUMN (Lifts Upward along Z/Y-axis) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: `${-sep * 14}%`,
                      width: '56%',
                      transform: `translate3d(0, ${-sep * 44}px, ${sep * 30}px)`,
                      zIndex: weight01 > 0.3 ? 15 : 6,
                      filter: weight01 > 0.3
                        ? `drop-shadow(0 18px 30px rgba(197, 34, 39, ${weight01 * 0.35}))`
                        : 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.12))'
                    }}
                  >
                    <img
                      src="/images/cad_fixture/part_top_bridge.png"
                      alt="Top Heavy Structural Bridge Column"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </div>
              </div>

              {/* Minimal Bottom Dynamic Prompt */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '12px',
                  textAlign: 'center'
                }}
              >
                {isFullyAssembled ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#c52227',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>SCROLL TO EXPLORE THE SYSTEM</span>
                    <ChevronDown size={14} className="cad-chevron-pulse" />
                  </div>
                ) : isFullyExploded ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#0e8a44',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>SCROLL UP TO REASSEMBLE</span>
                    <ChevronUp size={14} className="cad-chevron-pulse" />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#4b5563',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>SCROLL TO EXPLODE THE SYSTEM</span>
                    <span style={{ color: '#c52227' }}>•</span>
                    <span>{Math.round(sep * 100)}% EXPLODED</span>
                  </div>
                )}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: ACTIVE INDUSTRY INFORMATION & CAPABILITIES              */}
            {/* ===================================================================== */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                position: 'relative',
                minHeight: '260px'
              }}
              className="right-industry-detail"
            >
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}
              >
                ACTIVE INDUSTRY
              </div>

              {/* Stack of 5 industries with smooth continuous opacity crossfades */}
              <div style={{ position: 'relative', width: '100%', minHeight: '220px' }}>
                {industries.map((ind, idx) => {
                  const itemWeight = getStageWeight(idx);
                  const isVisible = itemWeight > 0.05;

                  return (
                    <div
                      key={ind.id}
                      style={{
                        position: idx === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: itemWeight,
                        transform: `translateY(${(1 - itemWeight) * 6}px)`,
                        transition: 'opacity 0.25s linear, transform 0.25s linear',
                        pointerEvents: isVisible && itemWeight > 0.5 ? 'auto' : 'none',
                        visibility: isVisible ? 'visible' : 'hidden'
                      }}
                    >
                      {/* Active Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(18px, 1.8vw, 22px)',
                          fontWeight: 800,
                          lineHeight: 1.2,
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
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#4b5563',
                          marginBottom: '10px'
                        }}
                      >
                        {ind.subtitle}
                      </div>

                      {/* Concise 1-2 Line Description */}
                      <p
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.55,
                          color: '#64748b',
                          margin: '0 0 14px 0'
                        }}
                      >
                        {ind.description}
                      </p>

                      {/* 2 Clean Bullet Highlights */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          marginBottom: '18px'
                        }}
                      >
                        {ind.highlights.map((item, hIdx) => (
                          <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: '#c52227',
                                flexShrink: 0
                              }}
                            />
                            <span style={{ fontSize: '12px', color: '#334155', fontWeight: 600 }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Direct Link to Contact for this Sector */}
                      <Link
                        to="/contact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#c52227',
                          textDecoration: 'none'
                        }}
                      >
                        <span>INQUIRE FOR {ind.title}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM SCRUBBER & STATUS TRACK                                         */}
        {/* ========================================================================= */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid #f1f3f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-tech)',
              fontSize: '10.5px',
              color: '#94a3b8',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            <div>[01] FULLY ASSEMBLED</div>
            <div style={{ color: '#c52227', fontWeight: 700 }}>
              {activeIndustry.stageName}
            </div>
            <div>[05] EXPLODED CAD ARCHITECTURE</div>
          </div>
        </div>
      </div>

      <style>{`
        .cad-chevron-pulse {
          animation: chevronBounce 1.8s infinite ease-in-out;
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        @media (max-width: 992px) {
          .industries-three-col-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .left-industry-nav {
            display: none !important;
          }
          .right-industry-detail {
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
