import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Play } from 'lucide-react';

export default function AboutPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 4 Horizontal Process Steps for Section 3
  const processSteps = [
    {
      step: '01',
      title: 'UNDERSTAND',
      desc: 'Requirement and application needs'
    },
    {
      step: '02',
      title: 'ENGINEER',
      desc: 'Design and develop the solution'
    },
    {
      step: '03',
      title: 'MANUFACTURE',
      desc: 'Precision machining and fabrication'
    },
    {
      step: '04',
      title: 'DELIVER',
      desc: 'Ready for industrial application'
    }
  ];

  // 4 Core Attributes for Section 5
  const attributes = [
    {
      title: 'PRECISION',
      desc: 'Built with attention to accuracy and application requirements.'
    },
    {
      title: 'CUSTOM ENGINEERING',
      desc: 'Solutions developed around specific manufacturing needs.'
    },
    {
      title: 'QUALITY FOCUS',
      desc: 'A disciplined approach throughout the manufacturing process.'
    },
    {
      title: 'PRACTICAL EXPERIENCE',
      desc: 'Engineering designed for real industrial environments.'
    }
  ];

  return (
    <div className="about-page-clean" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 1 — CINEMATIC HERO (75–85vh, Full-Width Real Workshop Photo)       */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        style={{
          position: 'relative',
          minHeight: 'clamp(560px, 80vh, 760px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(80px, 10vh, 120px) 0 clamp(60px, 8vh, 90px) 0',
          backgroundColor: '#0c0e12',
          overflow: 'hidden'
        }}
      >
        {/* Real Factory Background Photograph */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/about_workshop_indian.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.48) contrast(1.08)'
          }}
        />

        {/* Subtle Dark Overlay (No grid lines, no technical lines) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(12, 14, 18, 0.45)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
          
          {/* Small Category Label */}
          <div
            style={{
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#d1d5db',
              textTransform: 'uppercase',
              marginBottom: '18px'
            }}
          >
            ABOUT MAULI KRUPA
          </div>

          {/* Main Statement */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4.8vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 24px 0',
              textTransform: 'uppercase'
            }}
          >
            PRECISION IS NOT JUST<br />
            WHAT WE DO.<br />
            <span style={{ color: '#c52227' }}>IT'S HOW WE WORK.</span>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17.5px)',
              lineHeight: 1.65,
              color: '#d1d5db',
              maxWidth: '680px',
              margin: '0 auto clamp(32px, 4vw, 48px) auto'
            }}
          >
            Established in Bhosari MIDC, Pune since 2015. We design, machine and fabricate custom tooling, precision fixtures and special-purpose engineering solutions for demanding industrial applications.
          </p>

          {/* Simple Animated Scroll Indicator */}
          <a
            href="#story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'color 0.2s ease, border-color 0.2s ease'
            }}
            className="hero-scroll-link"
          >
            <span>EXPLORE OUR STORY</span>
            <ArrowDown size={14} color="#c52227" className="scroll-arrow-anim" />
          </a>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — THE STORY (Editorial Storytelling + Real Workshop Photo)       */}
      {/* ========================================================================= */}
      <section
        id="story"
        style={{
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-custom">
          
          <div
            className="story-editorial-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
              marginBottom: 'clamp(48px, 6vw, 72px)'
            }}
          >
            {/* Left Column: Large Heading */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 4.6vw, 60px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  color: '#111827',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                BUILT FOR<br />
                <span style={{ color: '#c52227' }}>PRECISION.</span>
              </h2>
            </div>

            {/* Right Column: Clean Editorial Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p
                style={{
                  fontSize: 'clamp(15.5px, 1.15vw, 17px)',
                  lineHeight: 1.75,
                  color: '#334155',
                  margin: 0
                }}
              >
                Established in 2015 in the industrial corridor of Bhosari MIDC, Pune, <strong style={{ color: '#111827' }}>Mauli Krupa Precision Works</strong> was founded with a singular purpose: delivering reliable, precision-engineered manufacturing solutions tailored to real shopfloor requirements.
              </p>

              <p
                style={{
                  fontSize: 'clamp(14.5px, 1.1vw, 16px)',
                  lineHeight: 1.75,
                  color: '#64748b',
                  margin: 0
                }}
              >
                Over the past decade, we have built proven capabilities in custom jigs & fixtures, concentricity checking tooling, heavy material handling trolleys, conveyor systems, and turnkey Special Purpose Machines (SPMs).
              </p>

              <p
                style={{
                  fontSize: 'clamp(14.5px, 1.1vw, 16px)',
                  lineHeight: 1.75,
                  color: '#64748b',
                  margin: 0
                }}
              >
                Our facility operates with in-house 400A heavy MIG/Arc welding stations, precision machining equipment, and dedicated surface polishing & chemical pickling facilities—ensuring drawing accuracy, robust weld integrity, and smooth delivery for automotive, railway, and manufacturing OEMs.
              </p>
            </div>
          </div>

          {/* Naturally Integrated Real Workshop Photograph */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '3px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)'
            }}
          >
            <img
              src="/images/real_products_curated/01_fixture_making.jpg"
              alt="Precision tooling and concentricity checking fixture assembly in Pune workshop"
              style={{
                width: '100%',
                height: 'clamp(280px, 34vw, 460px)',
                objectFit: 'cover',
                display: 'block'
              }}
              loading="lazy"
            />
            {/* Subtle caption bottom */}
            <div
              style={{
                padding: '12px 18px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '11.5px',
                color: '#64748b',
                letterSpacing: '0.06em'
              }}
            >
              <span style={{ fontWeight: 700, color: '#111827', textTransform: 'uppercase' }}>
                TOOLING & FIXTURE ASSEMBLY
              </span>
              <span>BHOSARI MIDC, PUNE FACILITY</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — FROM REQUIREMENT TO REALITY (Horizontal 4-Step Journey)        */}
      {/* ========================================================================= */}
      <section
        id="process"
        style={{
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#fafbfc',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ maxWidth: '640px', marginBottom: 'clamp(44px, 5.5vw, 68px)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#111827',
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}
            >
              FROM REQUIREMENT<br />
              <span style={{ color: '#c52227' }}>TO REALITY.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              A disciplined, engineering-first methodology driving every project from initial component drawing to shopfloor integration.
            </p>
          </div>

          {/* 4 Large Steps in Clean Horizontal Sequence */}
          <div
            className="process-steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              columnGap: 'clamp(24px, 3.5vw, 48px)',
              rowGap: '32px'
            }}
          >
            {processSteps.map((p) => (
              <div
                key={p.step}
                style={{
                  position: 'relative',
                  paddingTop: '18px',
                  borderTop: '2px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="process-step-item"
              >
                {/* Step Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: 'clamp(32px, 3.4vw, 44px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: '#c52227',
                    marginBottom: '12px'
                  }}
                >
                  {p.step}
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(16px, 1.25vw, 19px)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: '#111827',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase'
                  }}
                >
                  {p.title}
                </h3>

                {/* Step Description */}
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.55,
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — REAL WORK. REAL ENVIRONMENT. (Authentic Photo Sequence)       */}
      {/* ========================================================================= */}
      <section
        id="environment"
        style={{
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ maxWidth: '680px', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#111827',
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}
            >
              REAL WORK.{' '}
              <span style={{ color: '#c52227' }}>REAL ENVIRONMENT.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Photographs of actual manufactured fixtures, machines, and fabrication works from our facility.
            </p>
          </div>

          {/* Editorial Photo Sequence: 1 Large Landscape + 2 Supporting Below */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
            
            {/* 1 Dominant Landscape Photo */}
            <div
              className="photo-frame"
              style={{
                position: 'relative',
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
              }}
            >
              <img
                src="/images/real_products_curated/03_welding_spm.jpg"
                alt="Welding Special Purpose Machine manufactured at Mauli Krupa Precision Works"
                style={{
                  width: '100%',
                  height: 'clamp(300px, 38vw, 500px)',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="photo-hover-img"
                loading="lazy"
              />
              <div
                style={{
                  padding: '12px 18px',
                  backgroundColor: '#ffffff',
                  borderTop: '1px solid #e5e7eb',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                PRECISION MACHINING & CUSTOM SPM ASSEMBLY
              </div>
            </div>

            {/* 2 Carefully Positioned Supporting Photos Side-by-Side */}
            <div
              className="photo-supporting-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(20px, 3vw, 32px)'
              }}
            >
              {/* Supporting Photo 1 */}
              <div
                className="photo-frame"
                style={{
                  position: 'relative',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
                }}
              >
                <img
                  src="/images/service_jigs_fixtures.jpg"
                  alt="Precision jigs and fixtures manufacturing"
                  style={{
                    width: '100%',
                    height: 'clamp(220px, 26vw, 340px)',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease'
                  }}
                  className="photo-hover-img"
                  loading="lazy"
                />
                <div
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #e5e7eb',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  TOOLING & FIXTURES
                </div>
              </div>

              {/* Supporting Photo 2 */}
              <div
                className="photo-frame"
                style={{
                  position: 'relative',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
                }}
              >
                <img
                  src="/images/service_industrial_fabrication.jpg"
                  alt="Heavy industrial steel fabrication and welding"
                  style={{
                    width: '100%',
                    height: 'clamp(220px, 26vw, 340px)',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease'
                  }}
                  className="photo-hover-img"
                  loading="lazy"
                />
                <div
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #e5e7eb',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  IN-HOUSE ENGINEERING & FABRICATION
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — WHAT DEFINES OUR WORK (Bold Dark Industrial Section)           */}
      {/* ========================================================================= */}
      <section
        id="values"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          backgroundColor: '#0c0e12',
          color: '#ffffff'
        }}
      >
        <div className="container-custom">
          
          <div
            className="values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Large Heading */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 4.6vw, 60px)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                ENGINEERED<br />
                <span style={{ color: '#c52227' }}>WITH PURPOSE.</span>
              </h2>
            </div>

            {/* Right Column: 4 Clean Typography Qualities (No cards, no icons) */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {attributes.map((attr, idx) => (
                <div
                  key={attr.title}
                  style={{
                    padding: '24px 0',
                    borderTop: idx === 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(17px, 1.3vw, 20px)',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      color: '#ffffff',
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase'
                    }}
                  >
                    {attr.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14.5px',
                      lineHeight: 1.6,
                      color: '#94a3b8',
                      margin: 0,
                      maxWidth: '520px'
                    }}
                  >
                    {attr.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — OUR WORK IN MOTION (Cinematic Real Workshop Video Area)        */}
      {/* ========================================================================= */}
      <section
        id="motion"
        style={{
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Large Cinematic Video Area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#0c0e12',
              border: '1px solid #e5e7eb',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
              marginBottom: '28px'
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '560px' }}>
              {/* Authentic Factory Image */}
              <img
                src="/images/about_workshop_indian.jpg"
                alt="Mauli Krupa Precision Works Shopfloor Facility"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.72) contrast(1.05)'
                }}
              />

              {/* Minimal Dark Overlay with Center Play Symbol */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(12, 14, 18, 0.3)'
                }}
              >
                <div
                  style={{
                    width: 'clamp(64px, 7vw, 80px)',
                    height: 'clamp(64px, 7vw, 80px)',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(197, 34, 39, 0.45)',
                    cursor: 'default'
                  }}
                  title="Facility Preview"
                >
                  <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
                </div>
              </div>

              {/* Bottom Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(12, 14, 18, 0.85)',
                  padding: '6px 12px',
                  borderRadius: '2px'
                }}
              >
                FACILITY ENVIRONMENT // BHOSARI MIDC, PUNE
              </div>
            </div>
          </div>

          {/* Text Below Video */}
          <div style={{ maxWidth: '640px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#111827',
                margin: '0 0 8px 0',
                textTransform: 'uppercase'
              }}
            >
              OUR WORK<br />
              <span style={{ color: '#c52227' }}>IN MOTION.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              A closer look at the environment, processes and precision behind our work.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — CLOSING CTA (Full-Width Powerful Dark Industrial CTA)          */}
      {/* ========================================================================= */}
      <section
        id="about-cta"
        style={{
          position: 'relative',
          paddingTop: 'clamp(90px, 11vw, 140px)',
          paddingBottom: 'clamp(90px, 11vw, 140px)',
          backgroundColor: '#0c0e12',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Subtle Workshop Background Image Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero_industrial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.22) contrast(1.15)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          
          {/* Main Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.8vw, 60px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 20px 0',
              textTransform: 'uppercase'
            }}
          >
            LET'S BUILD<br />
            <span style={{ color: '#c52227' }}>SOMETHING PRECISE.</span>
          </h2>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17.5px)',
              lineHeight: 1.65,
              color: '#94a3b8',
              margin: '0 auto clamp(32px, 4vw, 44px) auto',
              maxWidth: '620px'
            }}
          >
            Have a tooling, fixture, machining or custom engineering requirement? Let's discuss how Mauli Krupa Precision Works can support your application.
          </p>

          {/* Two Simple Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Primary Action Button */}
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
                boxShadow: '0 6px 20px rgba(197, 34, 39, 0.35)',
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

            {/* Secondary Action Link */}
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
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
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>CONTACT US</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Embedded CSS for Micro-interactions */}
      <style>{`
        .scroll-arrow-anim {
          animation: gentleBob 2s infinite ease-in-out;
        }

        @keyframes gentleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .hero-scroll-link:hover {
          color: #c52227 !important;
          border-bottom-color: #c52227 !important;
        }

        .photo-frame:hover .photo-hover-img {
          transform: scale(1.02) !important;
        }

        @media (max-width: 900px) {
          .story-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .process-steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        @media (max-width: 640px) {
          .process-steps-grid {
            grid-template-columns: 1fr !important;
            row-gap: 24px !important;
          }
          .photo-supporting-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
