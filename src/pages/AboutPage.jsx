import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function AboutPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Interactive State for Section 3: "HOW WE WORK"
  const [activeStage, setActiveStage] = useState(0);

  // 4 Stages for Section 3: HOW WE TURN AN IDEA INTO PRECISION
  const stages = [
    {
      step: '01',
      title: 'UNDERSTAND',
      desc: 'Understand the requirement, application and manufacturing need through detailed technical analysis of drawing tolerances, operating duty, and functional specifications.',
      image: '/images/real_products_curated/01_high_altitude_checking.jpg',
      label: 'TECHNICAL DRAWING & SPECIFICATION'
    },
    {
      step: '02',
      title: 'ENGINEER',
      desc: 'Develop the tooling, fixture or engineering solution around the specific requirement, establishing datum references, clamping mechanisms, and structural rigidity.',
      image: '/images/service_jigs_fixtures.jpg',
      label: 'TOOLING & FIXTURE DESIGN'
    },
    {
      step: '03',
      title: 'MANUFACTURE',
      desc: 'Precision machining and fabrication transform the concept into a physical solution using in-house 400A MIG welding, lathes, drilling, and precision assembly.',
      image: '/images/real_products_curated/03_welding_spm.jpg',
      label: 'MACHINING & 400A WELD FABRICATION'
    },
    {
      step: '04',
      title: 'DELIVER',
      desc: 'The completed solution is inspected, surface finished with polishing or chemical pickling, and prepared for seamless integration onto the industrial shop floor.',
      image: '/images/real_products_curated/05_hydraulic_press_structure.jpg',
      label: 'FINAL INSPECTION & SHOPFLOOR DISPATCH'
    }
  ];

  // 4 Qualities for Section 5: WHAT DEFINES OUR WORK
  const qualities = [
    {
      title: 'PRECISION',
      desc: 'Attention to detail in every component, held strictly to drawing tolerances and concentricity standards.'
    },
    {
      title: 'CUSTOM ENGINEERING',
      desc: 'Solutions developed around specific industrial requirements and custom machine requirements.'
    },
    {
      title: 'RELIABILITY',
      desc: 'A practical and consistent approach to manufacturing engineered for continuous duty.'
    },
    {
      title: 'COMMITMENT',
      desc: 'Focused on delivering dependable engineering solutions on time and built to last.'
    }
  ];

  return (
    <div className="about-editorial-page" style={{ backgroundColor: '#ffffff', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 1 — CINEMATIC HERO (Versatile Enterprises Inspired Dark Navy Hero) */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 82vh, 780px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(90px, 12vh, 130px) 0 clamp(60px, 8vh, 90px) 0',
          backgroundColor: '#0a1128',
          overflow: 'hidden'
        }}
      >
        {/* Full-width Real Precision Machining Background Photograph */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/about_workshop_indian.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.42) contrast(1.1)'
          }}
        />

        {/* Subtle Dark Navy Overlay (No grid lines, no artificial technical lines) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 17, 40, 0.65) 0%, rgba(10, 17, 40, 0.88) 100%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '960px' }}>
          
          {/* Small Category Label with Red Accent Line */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            <span style={{ width: '20px', height: '2px', backgroundColor: '#c52227' }} />
            <span
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#e2e8f0',
                textTransform: 'uppercase'
              }}
            >
              ABOUT MAULI KRUPA
            </span>
          </div>

          {/* Main Statement in Very Large Bold Typography */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 5.2vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 0 24px 0',
              textTransform: 'uppercase'
            }}
          >
            ENGINEERING<br />
            <span style={{ color: '#c52227' }}>PRECISION</span><br />
            FOR A STRONGER<br />
            INDUSTRY.
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.65,
              color: '#cbd5e1',
              maxWidth: '640px',
              margin: '0 auto clamp(36px, 4.5vw, 52px) auto'
            }}
          >
            Precision tooling, custom fixtures and engineering solutions built for demanding industrial applications.
          </p>

          {/* Minimal SCROLL TO EXPLORE Indicator */}
          <a
            href="#our-story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
              transition: 'color 0.2s ease, border-color 0.2s ease'
            }}
            className="hero-scroll-prompt"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} color="#c52227" className="scroll-bobbing-arrow" />
          </a>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — OUR STORY (Editorial Split Layout + Navy Quote Panel)          */}
      {/* ========================================================================= */}
      <section
        id="our-story"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-custom">
          
          <div
            className="story-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
              gap: 'clamp(40px, 6vw, 84px)',
              alignItems: 'center'
            }}
          >
            {/* LEFT SIDE: Heading & Authentic Company Narrative */}
            <div>
              {/* Red Line and Label */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                <span style={{ width: '18px', height: '2px', backgroundColor: '#c52227' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#c52227',
                    textTransform: 'uppercase'
                  }}
                >
                  OUR STORY
                </span>
              </div>

              {/* Large Heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 4.5vw, 58px)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: '#111827',
                  margin: '0 0 24px 0',
                  textTransform: 'uppercase'
                }}
              >
                BUILT ON<br />
                PRACTICAL<br />
                <span style={{ color: '#c52227' }}>ENGINEERING.</span>
              </h2>

              {/* Company Narrative */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p
                  style={{
                    fontSize: 'clamp(15px, 1.15vw, 17px)',
                    lineHeight: 1.75,
                    color: '#334155',
                    margin: 0
                  }}
                >
                  Established in Bhosari MIDC, Pune, <strong style={{ color: '#111827' }}>Mauli Krupa Precision Works</strong> focuses on precision tooling, custom fixtures, machining and engineering solutions designed around real industrial requirements.
                </p>

                <p
                  style={{
                    fontSize: 'clamp(14.5px, 1.1vw, 16px)',
                    lineHeight: 1.75,
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  From concentricity inspection fixtures and welding SPMs to heavy material handling transit trolleys, our operations are driven by hands-on engineering discipline, high-grade steel fabrication, and direct technical collaboration with industrial clients.
                </p>

                <p
                  style={{
                    fontSize: 'clamp(14.5px, 1.1vw, 16px)',
                    lineHeight: 1.75,
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  Our workshop is fully equipped with in-house 400A heavy MIG/Arc welding units, precision lathes, and dedicated surface polishing & chemical pickling facilities—ensuring drawing compliance, structural durability, and corrosion resistance.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Real Workshop Photograph + Dark Navy Editorial Panel */}
            <div style={{ position: 'relative' }}>
              
              {/* Large Real Workshop Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)'
                }}
              >
                <img
                  src="/images/real_products_curated/01_fixture_making.jpg"
                  alt="Precision fixture tooling and assembly at Mauli Krupa Precision Works"
                  style={{
                    width: '100%',
                    height: 'clamp(320px, 38vw, 480px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  loading="lazy"
                />
              </div>

              {/* Dark Navy Editorial Panel */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '24px 28px',
                  backgroundColor: '#0a1128',
                  color: '#ffffff',
                  borderRadius: '2px',
                  borderLeft: '4px solid #c52227',
                  boxShadow: '0 10px 25px rgba(10, 17, 40, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: 900,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    SIMPLE SOLUTIONS.<br />
                    <span style={{ color: '#c52227' }}>STRONGER INDUSTRIES.</span>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11px',
                    color: '#94a3b8',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  ESTD. 2015 // BHOSARI MIDC, PUNE
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — HOW WE WORK (Interactive Editorial Engineering Journey)        */}
      {/* ========================================================================= */}
      <section
        id="how-we-work"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          backgroundColor: '#fafbfc',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ maxWidth: '720px', marginBottom: 'clamp(48px, 6vw, 76px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              <span style={{ width: '18px', height: '2px', backgroundColor: '#c52227' }} />
              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  textTransform: 'uppercase'
                }}
              >
                ENGINEERING JOURNEY
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              HOW WE TURN AN IDEA<br />
              <span style={{ color: '#c52227' }}>INTO PRECISION.</span>
            </h2>
          </div>

          {/* Interactive Editorial 2-Column Composition (Sticky Left Narrative + Dynamic Right Visual) */}
          <div
            className="how-we-work-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: 'clamp(36px, 5.5vw, 72px)',
              alignItems: 'start'
            }}
          >
            {/* LEFT COLUMN: Vertical Storytelling Stages with Large Background Numbers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div
                    key={stage.step}
                    onClick={() => setActiveStage(idx)}
                    onMouseEnter={() => setActiveStage(idx)}
                    style={{
                      position: 'relative',
                      padding: '24px 28px',
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      borderLeft: `3px solid ${isActive ? '#c52227' : '#e2e8f0'}`,
                      borderRadius: '0 4px 4px 0',
                      boxShadow: isActive ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.35s ease',
                      overflow: 'hidden'
                    }}
                    className="stage-interactive-card"
                  >
                    {/* Huge Subtle Background Number */}
                    <div
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: 'var(--font-tech)',
                        fontSize: 'clamp(64px, 7vw, 96px)',
                        fontWeight: 900,
                        color: isActive ? 'rgba(197, 34, 39, 0.06)' : 'rgba(0, 0, 0, 0.03)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        lineHeight: 1,
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {stage.step}
                    </div>

                    {/* Step Number + Title */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '8px'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-tech)',
                            fontSize: '13px',
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            color: isActive ? '#c52227' : '#94a3b8',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          STAGE {stage.step}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(20px, 1.8vw, 24px)',
                            fontWeight: 800,
                            color: isActive ? '#111827' : '#475569',
                            margin: 0,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {stage.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '14.5px',
                          lineHeight: 1.65,
                          color: isActive ? '#334155' : '#64748b',
                          margin: 0,
                          maxWidth: '480px',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Sticky Changing Image Visual Frame */}
            <div
              style={{
                position: 'sticky',
                top: '110px',
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.07)',
                backgroundColor: '#0a1128'
              }}
              className="how-we-work-sticky-image"
            >
              <div style={{ position: 'relative', width: '100%', height: 'clamp(360px, 38vw, 500px)' }}>
                {stages.map((st, idx) => (
                  <img
                    key={st.step}
                    src={st.image}
                    alt={st.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: activeStage === idx ? 1 : 0,
                      transform: activeStage === idx ? 'scale(1)' : 'scale(1.03)',
                      transition: 'opacity 0.6s ease, transform 0.6s ease',
                      display: 'block'
                    }}
                  />
                ))}

                {/* Bottom Active Stage Metadata Bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 20px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 17, 40, 0.92) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ffffff',
                    zIndex: 3
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff' }}>
                    {stages[activeStage].label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', fontWeight: 800, color: '#c52227' }}>
                    {stages[activeStage].step} / 04
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — WHERE PRECISION TAKES SHAPE (Dark Navy Editorial Sequence)     */}
      {/* ========================================================================= */}
      <section
        id="facility-visuals"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          backgroundColor: '#0a1128',
          color: '#ffffff'
        }}
      >
        <div className="container-custom">
          
          {/* Main Large Dominant Photograph with Statement Overlay */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
              marginBottom: 'clamp(28px, 4vw, 44px)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 44vw, 540px)' }}>
              <img
                src="/images/about_workshop_indian.jpg"
                alt="Mauli Krupa Precision Works Bhosari Facility"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.55) contrast(1.1)'
                }}
              />

              {/* Dominant Text Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(24px, 4vw, 48px)',
                  background: 'linear-gradient(180deg, transparent 40%, rgba(10, 17, 40, 0.9) 100%)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#c52227',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  BHOSARI MIDC, PUNE FACILITY
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4.2vw, 54px)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    margin: 0,
                    textTransform: 'uppercase'
                  }}
                >
                  WHERE PRECISION<br />
                  <span style={{ color: '#c52227' }}>TAKES SHAPE.</span>
                </h2>
              </div>
            </div>
          </div>

          {/* 3 Supporting Manufacturing Photographs (Asymmetrical Editorial Layout, NOT Bento Grid) */}
          <div
            className="supporting-photos-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px, 2.5vw, 28px)'
            }}
          >
            {/* Supporting Photo 1: Precision Machining */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-card"
            >
              <img
                src="/images/real_products_curated/03_balance_straightening_press.jpg"
                alt="Precision straightening press machine assembly"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                className="sub-photo-img"
                loading="lazy"
              />
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 17, 40, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#e2e8f0',
                  textTransform: 'uppercase'
                }}
              >
                PRECISION MACHINING
              </div>
            </div>

            {/* Supporting Photo 2: Tooling & Fixtures */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-card"
            >
              <img
                src="/images/real_products_curated/04_material_handling_trolley.jpg"
                alt="Industrial component handling trolley"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                className="sub-photo-img"
                loading="lazy"
              />
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 17, 40, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#e2e8f0',
                  textTransform: 'uppercase'
                }}
              >
                TOOLING & FIXTURES
              </div>
            </div>

            {/* Supporting Photo 3: Engineering Support & Fabrication */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-card"
            >
              <img
                src="/images/service_industrial_fabrication.jpg"
                alt="Heavy industrial steel fabrication and welding"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                className="sub-photo-img"
                loading="lazy"
              />
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 17, 40, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#e2e8f0',
                  textTransform: 'uppercase'
                }}
              >
                ENGINEERING SUPPORT
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — WHAT DEFINES OUR WORK (Clean Light Editorial Section)          */}
      {/* ========================================================================= */}
      <section
        id="what-defines-us"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Heading */}
          <div style={{ maxWidth: '640px', marginBottom: 'clamp(44px, 5.5vw, 68px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              <span style={{ width: '18px', height: '2px', backgroundColor: '#c52227' }} />
              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  textTransform: 'uppercase'
                }}
              >
                CORE PRINCIPLES
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              WHAT DEFINES<br />
              <span style={{ color: '#c52227' }}>OUR WORK.</span>
            </h2>
          </div>

          {/* 4 Qualities Arranged Horizontally with Subtle Vertical Separators */}
          <div
            className="qualities-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(24px, 3.5vw, 44px)'
            }}
          >
            {qualities.map((q, idx) => (
              <div
                key={q.title}
                style={{
                  paddingLeft: idx > 0 ? 'clamp(16px, 2vw, 28px)' : '0',
                  borderLeft: idx > 0 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="quality-col"
              >
                {/* Small Red Accent Line */}
                <span
                  style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: '#c52227',
                    marginBottom: '16px'
                  }}
                />

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(17px, 1.3vw, 20px)',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    color: '#111827',
                    margin: '0 0 10px 0',
                    textTransform: 'uppercase'
                  }}
                >
                  {q.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  {q.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — FINAL CTA (Full-Width Dark Navy Industrial CTA)                */}
      {/* ========================================================================= */}
      <section
        id="about-cta"
        style={{
          position: 'relative',
          paddingTop: 'clamp(90px, 11vw, 140px)',
          paddingBottom: 'clamp(90px, 11vw, 140px)',
          backgroundColor: '#0a1128',
          color: '#ffffff',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Subtle Dark Real Machining Photograph Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero_industrial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.18) contrast(1.2)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          
          {/* Main Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.8vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 20px 0',
              textTransform: 'uppercase'
            }}
          >
            LET'S BUILD<br />
            SOMETHING <span style={{ color: '#c52227' }}>PRECISE.</span>
          </h2>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.65,
              color: '#cbd5e1',
              margin: '0 auto clamp(36px, 4.5vw, 48px) auto',
              maxWidth: '620px'
            }}
          >
            Have a tooling, fixture, machining or custom engineering requirement? Let's discuss how we can support your application.
          </p>

          {/* Two Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Primary Action Button (Brand Red) */}
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                backgroundColor: '#c52227',
                color: '#ffffff',
                fontFamily: 'var(--font-tech)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '3px',
                boxShadow: '0 6px 20px rgba(197, 34, 39, 0.4)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b31b20';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={16} />
            </Link>

            {/* Secondary Action Button (Transparent with Subtle White Border) */}
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontFamily: 'var(--font-tech)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '3px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>VIEW OUR SERVICES</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* Embedded Styles for Micro-interactions and Responsive Design */}
      <style>{`
        .scroll-bobbing-arrow {
          animation: slowBob 2s infinite ease-in-out;
        }

        @keyframes slowBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .hero-scroll-prompt:hover {
          color: #c52227 !important;
          border-bottom-color: #c52227 !important;
        }

        .editorial-photo-card:hover .sub-photo-img {
          transform: scale(1.03) !important;
        }

        @media (max-width: 960px) {
          .story-split-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .how-we-work-grid {
            grid-template-columns: 1fr !important;
          }
          .how-we-work-sticky-image {
            position: relative !important;
            top: 0 !important;
            order: -1 !important;
            margin-bottom: 24px !important;
          }
          .qualities-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 32px !important;
          }
          .quality-col {
            padding-left: 0 !important;
            border-left: none !important;
          }
        }

        @media (max-width: 640px) {
          .supporting-photos-grid {
            grid-template-columns: 1fr !important;
          }
          .qualities-grid {
            grid-template-columns: 1fr !important;
            row-gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
