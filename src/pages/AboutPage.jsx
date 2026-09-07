import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function AboutPage() {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Active Stage state for Section 3 Process Journey
  const [activeStage, setActiveStage] = useState(0);

  // 4 Process Stages for Section 3
  const stages = [
    {
      step: '01',
      title: 'UNDERSTAND',
      desc: 'Understand the requirement, application and manufacturing need through detailed technical analysis of drawing tolerances, operational duty, and functional specifications.',
      image: '/images/real_products_curated/01_high_altitude_checking.jpg',
      label: 'TECHNICAL DRAWING & SPECIFICATION'
    },
    {
      step: '02',
      title: 'ENGINEER',
      desc: 'Develop the tooling, fixture or engineering solution around the specific requirement, establishing rigid datum points, clamping mechanisms, and structural integrity.',
      image: '/images/service_jigs_fixtures.jpg',
      label: 'TOOLING & FIXTURE DESIGN'
    },
    {
      step: '03',
      title: 'MANUFACTURE',
      desc: 'Precision machining and fabrication transform the concept into a physical solution using in-house 400A MIG welding, precision lathes, drilling setups, and rigid assembly.',
      image: '/images/real_products_curated/03_welding_spm.jpg',
      label: 'MACHINING & 400A WELD FABRICATION'
    },
    {
      step: '04',
      title: 'DELIVER',
      desc: 'The completed solution is verified, surface finished with in-house buffing or chemical pickling, and prepared for seamless industrial shopfloor integration.',
      image: '/images/real_products_curated/05_hydraulic_press_structure.jpg',
      label: 'FINAL INSPECTION & SHOPFLOOR DELIVERY'
    }
  ];

  // 4 Qualities for Section 6: WHAT DEFINES OUR WORK
  const qualities = [
    {
      number: '01',
      title: 'PRECISION',
      desc: 'Attention to detail in every component, held strictly to drawing tolerances and concentricity standards.'
    },
    {
      number: '02',
      title: 'CUSTOM ENGINEERING',
      desc: 'Solutions developed around specific manufacturing needs and special-purpose machinery requirements.'
    },
    {
      number: '03',
      title: 'RELIABILITY',
      desc: 'A practical and consistent approach to manufacturing engineered for continuous industrial duty.'
    },
    {
      number: '04',
      title: 'COMMITMENT',
      desc: 'Focused on delivering dependable engineering solutions on time and built to last.'
    }
  ];

  return (
    <div className="about-editorial-root" style={{ backgroundColor: '#ffffff', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 01 — HERO (Cinematic Full-Width Authentic Workshop Visual)         */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 80vh, 760px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(90px, 12vh, 130px) 0 clamp(60px, 8vh, 90px) 0',
          backgroundColor: '#0a1128',
          overflow: 'hidden'
        }}
      >
        {/* Real Workshop Background Image with Slow Subtle Ambient Zoom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/about_workshop_indian.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.42) contrast(1.1)',
            transform: 'scale(1.02)',
            transition: 'transform 7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="hero-bg-zoom"
        />

        {/* Subtle Dark Navy Gradient Overlay (No Grid Lines, No Blueprint Tech Lines) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 17, 40, 0.65) 0%, rgba(10, 17, 40, 0.88) 100%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '960px' }}>
          
          {/* Eyebrow Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              animation: 'fadeInUp 0.6s ease forwards'
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

          {/* Main Statement */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5.4vw, 70px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
              animation: 'fadeInUp 0.7s 0.1s ease forwards'
            }}
          >
            WHERE <span style={{ color: '#c52227' }}>PRECISION</span><br />
            TAKES SHAPE.
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.65,
              color: '#cbd5e1',
              maxWidth: '680px',
              margin: '0 auto clamp(36px, 4.5vw, 52px) auto',
              animation: 'fadeInUp 0.7s 0.2s ease forwards'
            }}
          >
            Precision tooling, custom fixtures and engineering solutions built for demanding industrial applications in Bhosari MIDC, Pune since 2015.
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
              transition: 'color 0.2s ease, border-color 0.2s ease',
              animation: 'fadeInUp 0.7s 0.3s ease forwards'
            }}
            className="hero-scroll-link"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} color="#c52227" className="scroll-arrow-bob" />
          </a>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02 — OUR STORY / BUILT ON PRACTICAL ENGINEERING                   */}
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
            {/* LEFT SIDE: Heading & Genuine Company Story */}
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

              {/* Genuine Story Paragraphs */}
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

            {/* RIGHT SIDE: Real Workshop Photograph + Clean Editorial Caption */}
            <div style={{ position: 'relative' }}>
              
              {/* Large Real Workshop Image (No rounded cards, natural crisp integration) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)'
                }}
                className="story-image-container"
              >
                <img
                  src="/images/real_products_curated/01_fixture_making.jpg"
                  alt="Precision fixture tooling and assembly at Mauli Krupa Precision Works"
                  style={{
                    width: '100%',
                    height: 'clamp(320px, 38vw, 480px)',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease'
                  }}
                  className="story-img-reveal"
                  loading="lazy"
                />
              </div>

              {/* Editorial Caption Panel Below Image */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '20px 24px',
                  backgroundColor: '#0a1128',
                  color: '#ffffff',
                  borderRadius: '2px',
                  borderLeft: '4px solid #c52227',
                  boxShadow: '0 10px 25px rgba(10, 17, 40, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(16px, 1.6vw, 20px)',
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
                  EST. 2015 // BHOSARI MIDC · PUNE
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03 — HOW WE TURN AN IDEA INTO PRECISION (Signature Journey)       */}
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
                SIGNATURE PROCESS JOURNEY
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

          {/* Refined Vertical Process Journey: Connecting Progress Line + 4 Stages */}
          <div
            className="journey-two-col-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: 'clamp(36px, 5.5vw, 72px)',
              alignItems: 'start'
            }}
          >
            {/* LEFT COLUMN: Vertical Timeline Stages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.5vw, 28px)' }}>
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
                      borderRadius: '0 3px 3px 0',
                      boxShadow: isActive ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.35s ease',
                      overflow: 'hidden'
                    }}
                    className="stage-row-card"
                  >
                    {/* Large Subtle Background Number */}
                    <div
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: 'var(--font-tech)',
                        fontSize: 'clamp(60px, 6.5vw, 90px)',
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

                    {/* Step Title & Content */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '8px'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-tech)',
                            fontSize: '12.5px',
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
                            fontSize: 'clamp(19px, 1.7vw, 23px)',
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

            {/* RIGHT COLUMN: Sticky Real Workshop Visual Frame */}
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
              className="journey-sticky-image"
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
      {/* SECTION 04 — WHERE PRECISION TAKES SHAPE (Editorial Real Facility Visuals) */}
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
                  BHOSARI MIDC · PUNE FACILITY
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

          {/* 3 Supporting Manufacturing Photographs in Clean Rectangular Sequence (No Bento, No Rounding) */}
          <div
            className="editorial-gallery-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px, 2.5vw, 28px)'
            }}
          >
            {/* Supporting Photo 1: [ MACHINING ] */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-box"
            >
              <img
                src="/images/real_products_curated/03_balance_straightening_press.jpg"
                alt="Precision straightening press machine assembly"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-sub-img"
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
                [ MACHINING ]
              </div>
            </div>

            {/* Supporting Photo 2: [ TOOLING ] */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-box"
            >
              <img
                src="/images/real_products_curated/04_material_handling_trolley.jpg"
                alt="Industrial component handling trolley"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-sub-img"
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
                [ TOOLING ]
              </div>
            </div>

            {/* Supporting Photo 3: [ FABRICATION ] */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0c1222'
              }}
              className="editorial-photo-box"
            >
              <img
                src="/images/service_industrial_fabrication.jpg"
                alt="Heavy industrial steel fabrication and welding"
                style={{
                  width: '100%',
                  height: 'clamp(200px, 22vw, 280px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-sub-img"
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
                [ FABRICATION ]
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — EXPERIENCE / FACTS (Verified Transitional Editorial Facts)    */}
      {/* ========================================================================= */}
      <section
        id="experience-facts"
        style={{
          paddingTop: 'clamp(64px, 8vw, 100px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
          backgroundColor: '#fafbfc',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          <div
            className="facts-editorial-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              gap: 'clamp(36px, 5vw, 68px)',
              alignItems: 'center'
            }}
          >
            {/* Left: Heading */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
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
                  TRACK RECORD
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.6vw, 46px)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                ENGINEERED WITH<br />
                <span style={{ color: '#c52227' }}>EXPERIENCE.</span>
              </h2>
            </div>

            {/* Right: Verified Facts & Summary */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'clamp(20px, 3vw, 36px)',
                paddingLeft: 'clamp(0px, 2vw, 24px)'
              }}
              className="verified-facts-grid"
            >
              {/* Fact 1 */}
              <div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 900, color: '#111827', lineHeight: 1 }}>
                  2015
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', fontWeight: 700, color: '#c52227', letterSpacing: '0.08em', marginTop: '6px', textTransform: 'uppercase' }}>
                  ESTD. YEAR
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Bhosari MIDC, Pune
                </div>
              </div>

              {/* Fact 2 */}
              <div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 900, color: '#111827', lineHeight: 1 }}>
                  10+
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', fontWeight: 700, color: '#c52227', letterSpacing: '0.08em', marginTop: '6px', textTransform: 'uppercase' }}>
                  YEARS EXPERIENCE
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Precision Toolmaking
                </div>
              </div>

              {/* Fact 3 */}
              <div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 900, color: '#111827', lineHeight: 1 }}>
                  400A
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', fontWeight: 700, color: '#c52227', letterSpacing: '0.08em', marginTop: '6px', textTransform: 'uppercase' }}>
                  HEAVY WELDING
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  MIG & Arc Fabrication
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — WHAT DEFINES OUR WORK (Numbered Editorial Principles)         */}
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

          {/* 4 Numbered Editorial Qualities with Subtle Line Expansion on Hover */}
          <div
            className="qualities-numbered-grid"
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
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease'
                }}
                className="quality-numbered-col"
              >
                {/* Number & Accent Line */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-tech)',
                      fontSize: '14px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: '#c52227'
                    }}
                    className="quality-num"
                  >
                    {q.number}
                  </span>
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      backgroundColor: '#c52227',
                      transition: 'width 0.3s ease'
                    }}
                    className="quality-line"
                  />
                </div>

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
      {/* SECTION 07 — FINAL CTA (Cinematic Full-Width Dark Navy CTA)               */}
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
        {/* Darkened Real Machining Photograph Overlay */}
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-arrow-bob {
          animation: slowBob 2s infinite ease-in-out;
        }

        @keyframes slowBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .hero-scroll-link:hover {
          color: #c52227 !important;
          border-bottom-color: #c52227 !important;
        }

        .story-image-container:hover .story-img-reveal {
          transform: scale(1.02) !important;
        }

        .editorial-photo-box:hover .gallery-sub-img {
          transform: scale(1.03) !important;
        }

        .quality-numbered-col:hover {
          transform: translateY(-3px) !important;
        }

        .quality-numbered-col:hover .quality-line {
          width: 32px !important;
        }

        @media (max-width: 960px) {
          .story-split-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .journey-two-col-layout {
            grid-template-columns: 1fr !important;
          }
          .journey-sticky-image {
            position: relative !important;
            top: 0 !important;
            order: -1 !important;
            margin-bottom: 24px !important;
          }
          .facts-editorial-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .verified-facts-grid {
            padding-left: 0 !important;
          }
          .qualities-numbered-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 32px !important;
          }
          .quality-numbered-col {
            padding-left: 0 !important;
            border-left: none !important;
          }
        }

        @media (max-width: 640px) {
          .editorial-gallery-row {
            grid-template-columns: 1fr !important;
          }
          .verified-facts-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .qualities-numbered-grid {
            grid-template-columns: 1fr !important;
            row-gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
