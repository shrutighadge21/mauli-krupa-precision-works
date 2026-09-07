import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ArrowRight, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // State for Interactive Identity Section (Section 4)
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);

  // State for Video Modal (Section 6)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Story Chapters for Section 2
  const storyChapters = [
    {
      number: '01',
      title: 'ENGINEERED WITH PURPOSE',
      text: 'Founded in 2015 in Bhosari MIDC, Pune, Mauli Krupa Precision Works is built around hands-on engineering discipline and uncompromising manufacturing standards.',
      image: '/images/about_workshop_indian.jpg',
      tag: 'ESTD. 2015 // BHOSARI MIDC'
    },
    {
      number: '02',
      title: 'BUILT FOR INDUSTRY',
      text: 'Specializing in custom jigs & fixtures, material handling systems, industrial transit trolleys, and turnkey special purpose machines (SPMs) for Tier-1 industrial manufacturers.',
      image: '/images/real_products_curated/01_fixture_making.jpg',
      tag: 'TOOLING & MACHINE BUILDING'
    },
    {
      number: '03',
      title: 'DESIGNED AROUND REAL REQUIREMENTS',
      text: 'Every component, fixture, and assembly is manufactured to exact drawing tolerances with in-house 400A MIG welding, machining, and chemical passivation facilities.',
      image: '/images/service_industrial_fabrication.jpg',
      tag: 'RIGOROUS QUALITY & FINISH'
    }
  ];

  // Active Story Chapter on scroll/click
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Interactive Identity items for Section 4
  const identityItems = [
    {
      id: 'precision',
      title: 'PRECISION',
      description: 'Attention to detail in every manufacturing requirement, held to tight drawing tolerances and micron-level concentricity standards.',
      image: '/images/real_products_curated/01_high_altitude_checking.jpg',
      spec: 'TOLERANCE // MICRON LEVEL'
    },
    {
      id: 'capability',
      title: 'CAPABILITY',
      description: 'Engineering solutions designed for practical industrial applications, from heavy hydraulic press structures to automated conveyor systems.',
      image: '/images/real_products_curated/05_hydraulic_press_structure.jpg',
      spec: 'HEAVY FABRICATION & ASSEMBLY'
    },
    {
      id: 'engineering',
      title: 'ENGINEERING',
      description: 'From technical drawing analysis to custom Special Purpose Machine (SPM) execution and precision fixture manufacturing.',
      image: '/images/real_products_curated/03_balance_straightening_press.jpg',
      spec: 'TURNKEY SPM & TOOLING'
    },
    {
      id: 'reliability',
      title: 'RELIABILITY',
      description: 'A practical approach built around continuous shop floor duty, robust load ratings, and long-term industrial reliability.',
      image: '/images/service_conveyors_handling.jpg',
      spec: 'PROVEN SHOPFLOOR RELIABILITY'
    }
  ];

  // Editorial Gallery Visuals for Section 3
  const galleryItems = [
    {
      title: 'PRECISION IN ACTION',
      subtitle: 'Custom Welding SPM Machine Assembly',
      image: '/images/real_products_curated/03_welding_spm.jpg',
      colSpan: 'span 7',
      height: 'clamp(280px, 32vw, 420px)'
    },
    {
      title: 'ENGINEERING DETAILS',
      subtitle: 'Multi-Point Concentricity Checking Fixture',
      image: '/images/real_products_curated/01_fixture_making.jpg',
      colSpan: 'span 5',
      height: 'clamp(280px, 32vw, 420px)'
    },
    {
      title: 'BUILT FOR INDUSTRY',
      subtitle: 'Heavy 400A MIG Welded Machine Bed Structure',
      image: '/images/service_industrial_fabrication.jpg',
      colSpan: 'span 5',
      height: 'clamp(260px, 28vw, 360px)'
    },
    {
      title: 'THE MAKING PROCESS',
      subtitle: 'Automated Fuel Sensor Testing & Calibration Station',
      image: '/images/gallery_testing_rig.jpg',
      colSpan: 'span 7',
      height: 'clamp(260px, 28vw, 360px)'
    }
  ];

  return (
    <div className="about-cinematic-page" style={{ backgroundColor: '#ffffff', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 1 – CINEMATIC ABOUT HERO (Full-Screen Immersive Visual)             */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(60px, 8vw, 100px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          overflow: 'hidden',
          backgroundColor: '#0c0e12'
        }}
      >
        {/* Real Industrial Workshop Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/about_workshop_indian.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            filter: 'brightness(0.55) contrast(1.1)',
            transform: 'scale(1.02)',
            transition: 'transform 10s ease-out'
          }}
        />

        {/* Subtle Gradient Scrim Overlay for Crisp Text Contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12,14,18,0.4) 0%, rgba(12,14,18,0.75) 70%, rgba(12,14,18,0.95) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Fine Blueprint Grid Texture Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '980px' }}>
          
          {/* Small Category Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              marginBottom: '24px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ef4444'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#f3f4f6',
                textTransform: 'uppercase'
              }}
            >
              ABOUT MAULI KRUPA
            </span>
          </div>

          {/* Main Statement (Bold, Cinematic Editorial Typography) */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5.2vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 24px 0',
              textTransform: 'uppercase'
            }}
          >
            PRECISION IS NOT JUST WHAT WE DO.{' '}
            <span
              style={{
                color: '#ef4444',
                display: 'block',
                marginTop: '4px'
              }}
            >
              IT'S HOW WE WORK.
            </span>
          </h1>

          {/* Short Supporting Description */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.65,
              color: '#d1d5db',
              maxWidth: '680px',
              margin: '0 auto 40px auto'
            }}
          >
            Established in Bhosari MIDC, Pune since 2015. We design, machine, and fabricate custom tooling, precision fixtures, and special purpose machinery built for demanding industrial applications.
          </p>

          {/* Subtle Scroll Down Prompt with Gentle Bobbing Animation */}
          <a
            href="#story-experience"
            className="explore-story-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-tech)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '10px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            <span>EXPLORE OUR STORY</span>
            <ArrowDown size={14} color="#ef4444" className="scroll-arrow-icon" />
          </a>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 – THE STORY AS A SCROLL EXPERIENCE (Sticky Visual & Narrative)    */}
      {/* ========================================================================= */}
      <section
        id="story-experience"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ maxWidth: '640px', marginBottom: 'clamp(44px, 5.5vw, 68px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#64748b',
                  textTransform: 'uppercase'
                }}
              >
                OUR HERITAGE & DISCIPLINE
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: '#111827',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              A DECADE OF{' '}
              <span style={{ color: '#c52227', fontFamily: 'var(--font-tech)' }}>
                MANUFACTURING FOCUS
              </span>
            </h2>
          </div>

          {/* 2-Column Sticky Storytelling Grid */}
          <div
            className="story-scroll-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'clamp(36px, 5.5vw, 72px)',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Interactive Visual Showcase Frame */}
            <div
              style={{
                position: 'sticky',
                top: '110px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#f8fafc'
              }}
              className="story-sticky-frame"
            >
              <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 36vw, 460px)' }}>
                {storyChapters.map((ch, idx) => (
                  <img
                    key={ch.number}
                    src={ch.image}
                    alt={ch.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: activeStoryIndex === idx ? 1 : 0,
                      transform: activeStoryIndex === idx ? 'scale(1)' : 'scale(1.04)',
                      transition: 'opacity 0.7s ease, transform 0.7s ease',
                      display: 'block'
                    }}
                  />
                ))}

                {/* Floating Tag */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(6px)',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 2
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <span>{storyChapters[activeStoryIndex].tag}</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Connected Story Beats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 48px)' }}>
              {storyChapters.map((chapter, idx) => {
                const isActive = activeStoryIndex === idx;
                return (
                  <div
                    key={chapter.number}
                    onClick={() => setActiveStoryIndex(idx)}
                    onMouseEnter={() => setActiveStoryIndex(idx)}
                    style={{
                      position: 'relative',
                      paddingLeft: '28px',
                      borderLeft: `2px solid ${isActive ? '#c52227' : '#e2e8f0'}`,
                      cursor: 'pointer',
                      transition: 'all 0.35s ease'
                    }}
                    className="story-chapter-card"
                  >
                    {/* Chapter Number */}
                    <div
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: isActive ? '#c52227' : '#94a3b8',
                        marginBottom: '6px',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      CHAPTER // {chapter.number}
                    </div>

                    {/* Chapter Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(20px, 1.8vw, 24px)',
                        fontWeight: 800,
                        lineHeight: 1.25,
                        color: isActive ? '#111827' : '#475569',
                        margin: '0 0 10px 0',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {chapter.title}
                    </h3>

                    {/* Chapter Text (1-2 crisp lines) */}
                    <p
                      style={{
                        fontSize: '14.5px',
                        lineHeight: 1.65,
                        color: isActive ? '#334155' : '#64748b',
                        margin: 0,
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {chapter.text}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 – INSIDE THE WORLD OF MAULI KRUPA (Editorial Asymmetric Gallery) */}
      {/* ========================================================================= */}
      <section
        id="inside-world"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#fafbfc',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: 'clamp(40px, 5vw, 60px)'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c52227' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}
                >
                  VISUAL EVIDENCE // SHOPFLOOR
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.6vw, 44px)',
                  fontWeight: 800,
                  lineHeight: 1.18,
                  letterSpacing: '-0.025em',
                  color: '#111827',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                INSIDE THE WORLD OF{' '}
                <span style={{ color: '#c52227' }}>MAULI KRUPA</span>
              </h2>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748b',
                letterSpacing: '0.08em'
              }}
            >
              GENUINE WORKSHOP PHOTOGRAPHY
            </span>
          </div>

          {/* Asymmetric Magazine-Style Image Grid */}
          <div
            className="editorial-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(20px, 3vw, 36px)'
            }}
          >
            {galleryItems.map((item, idx) => (
              <div
                key={item.title}
                className="editorial-gallery-item"
                style={{
                  gridColumn: item.colSpan,
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: item.height, overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="gallery-item-img"
                    loading="lazy"
                  />

                  {/* Frosted Metadata Label Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(12, 14, 18, 0.85) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px 24px',
                      color: '#ffffff'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#f8fafc',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 – INTERACTIVE IDENTITY SECTION (Precision, Capability, etc.)     */}
      {/* ========================================================================= */}
      <section
        id="interactive-identity"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ maxWidth: '640px', marginBottom: 'clamp(44px, 5.5vw, 68px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#64748b',
                  textTransform: 'uppercase'
                }}
              >
                CORE ATTRIBUTES
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: '#111827',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              THE FOUR PILLARS OF OUR IDENTITY
            </h2>
          </div>

          {/* Interactive Words & Companion Visual (Zero Boxes, Zero Generic Cards) */}
          <div
            className="identity-interactive-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: 'clamp(36px, 6vw, 72px)',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Large Vertical Interactive Words */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vw, 28px)' }}>
              {identityItems.map((item, idx) => {
                const isActive = activeIdentityIndex === idx;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIdentityIndex(idx)}
                    onClick={() => setActiveIdentityIndex(idx)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 0',
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'all 0.3s ease'
                    }}
                    className="identity-word-row"
                  >
                    {/* Word Typography */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: isActive ? '8px' : '0',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(28px, 3.8vw, 48px)',
                          fontWeight: 900,
                          letterSpacing: '-0.025em',
                          color: isActive ? '#c52227' : '#94a3b8',
                          transition: 'color 0.3s ease',
                          lineHeight: 1.1
                        }}
                      >
                        {item.title}
                      </span>
                      {isActive && (
                        <ArrowRight size={22} color="#c52227" className="identity-active-arrow" />
                      )}
                    </div>

                    {/* Short Explanation (Expands/Reveals when Active) */}
                    {isActive && (
                      <p
                        style={{
                          fontSize: '14.5px',
                          lineHeight: 1.6,
                          color: '#475569',
                          margin: '6px 0 0 0',
                          maxWidth: '460px',
                          animation: 'fadeIn 0.35s ease'
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Companion Visual Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                height: 'clamp(320px, 34vw, 440px)',
                backgroundColor: '#0c0e12'
              }}
              className="identity-visual-frame"
            >
              {identityItems.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: activeIdentityIndex === idx ? 1 : 0,
                    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Subtle Gradient & Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(12, 14, 18, 0.85) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '18px 22px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#ffffff',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.spec}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 – FULL-WIDTH VISUAL MOMENT (Cinematic Parallax Break)             */}
      {/* ========================================================================= */}
      <section
        id="visual-moment"
        style={{
          position: 'relative',
          paddingTop: 'clamp(100px, 12vw, 160px)',
          paddingBottom: 'clamp(100px, 12vw, 160px)',
          backgroundColor: '#0c0e12',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Full-bleed Real Industrial Workshop Visual */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero_industrial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.42) contrast(1.15)',
            transform: 'scale(1.02)'
          }}
        />

        {/* Scrim Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(12, 14, 18, 0.45)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '840px' }}>
          
          {/* Subtle Red Top Accent */}
          <div
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: '#ef4444',
              margin: '0 auto 24px auto',
              borderRadius: '2px'
            }}
          />

          {/* Statement Overlay */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(26px, 3.8vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.22,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 16px 0',
              textTransform: 'uppercase'
            }}
          >
            BEHIND EVERY PRECISION COMPONENT<br />
            <span style={{ color: '#ef4444' }}>IS A PROCESS BUILT WITH PURPOSE.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              lineHeight: 1.6,
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            From raw structural steel and precision billets to finished inspection-certified tooling.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 – STEP INSIDE OUR WORKSPACE (Video Focused Experience)           */}
      {/* ========================================================================= */}
      <section
        id="workspace-video"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(36px, 5vw, 56px) auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#64748b',
                  textTransform: 'uppercase'
                }}
              >
                FACILITY IMMERSION
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: '#111827',
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}
            >
              STEP INSIDE OUR WORKSPACE
            </h2>

            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Experience the machining, fabrication, and precision quality controls operating at our Bhosari facility.
            </p>
          </div>

          {/* Large Video / Workspace Thumbnail Frame with Play Button */}
          <div
            style={{
              position: 'relative',
              maxWidth: '960px',
              margin: '0 auto',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#0c0e12',
              cursor: 'pointer'
            }}
            onClick={() => setIsVideoModalOpen(true)}
            className="workspace-video-frame"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              {/* Real Workshop Thumbnail */}
              <img
                src="/images/about_workshop_indian.jpg"
                alt="Mauli Krupa Precision Works Bhosari Workshop"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.85) contrast(1.05)',
                  transition: 'transform 0.6s ease'
                }}
                className="video-thumb-img"
              />

              {/* Center Pulsing Play Button */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(12, 14, 18, 0.35)',
                  transition: 'background-color 0.3s ease'
                }}
                className="play-overlay"
              >
                <div
                  style={{
                    width: 'clamp(64px, 7vw, 84px)',
                    height: 'clamp(64px, 7vw, 84px)',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 0 0 12px rgba(197, 34, 39, 0.25)',
                    transition: 'all 0.3s ease'
                  }}
                  className="play-btn-circle"
                >
                  <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 24px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(12, 14, 18, 0.9) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600 }}>
                  BHOSARI MIDC WORKSHOP TOUR // PUNE
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#ef4444', fontWeight: 700, letterSpacing: '0.08em' }}>
                  WATCH FACILITY DEMO
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 – FINAL MINIMAL CTA                                             */}
      {/* ========================================================================= */}
      <section
        id="about-cta"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          backgroundColor: '#0c0e12',
          color: '#ffffff',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
          
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 16px 0',
              textTransform: 'uppercase'
            }}
          >
            LET'S BUILD SOMETHING{' '}
            <span style={{ color: '#ef4444' }}>PRECISE.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.6,
              color: '#94a3b8',
              margin: '0 auto 36px auto',
              maxWidth: '540px'
            }}
          >
            Discuss your manufacturing, precision tooling, or custom engineering requirements with our technical team in Bhosari, Pune.
          </p>

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

        </div>
      </section>

      {/* ========================================================================= */}
      {/* VIDEO MODAL (Opens Clean Lightbox on Click)                               */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 12, 16, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '24px'
          }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              backgroundColor: '#0c0e12',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #27272a',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c52227'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
            >
              <X size={20} />
            </button>

            {/* Video Container */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: '#000000' }}>
              <img
                src="/images/about_workshop_indian.jpg"
                alt="Workspace preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '24px',
                  textAlign: 'center',
                  color: '#ffffff'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0' }}>
                  Mauli Krupa Precision Works Workshop Footage
                </h3>
                <p style={{ fontSize: '13.5px', color: '#cbd5e1', margin: 0, maxWidth: '480px' }}>
                  Facility preview ready for high-definition shopfloor video broadcast.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Styles for Transitions and Responsive Layout */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .scroll-arrow-icon {
          animation: gentleBob 2s infinite ease-in-out;
        }

        @keyframes gentleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .explore-story-btn:hover {
          color: #ef4444 !important;
          border-bottom-color: #ef4444 !important;
        }

        .editorial-gallery-item:hover .gallery-item-img {
          transform: scale(1.04) !important;
        }

        .workspace-video-frame:hover .video-thumb-img {
          transform: scale(1.02) !important;
        }

        .workspace-video-frame:hover .play-btn-circle {
          transform: scale(1.08) !important;
          box-shadow: 0 0 0 16px rgba(197, 34, 39, 0.35) !important;
        }

        @media (max-width: 900px) {
          .story-scroll-grid {
            grid-template-columns: 1fr !important;
          }
          .story-sticky-frame {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 32px !important;
          }
          .editorial-gallery-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .editorial-gallery-item {
            grid-column: span 1 !important;
          }
          .identity-interactive-grid {
            grid-template-columns: 1fr !important;
          }
          .identity-visual-frame {
            order: -1 !important;
            margin-bottom: 24px !important;
          }
        }

        @media (max-width: 600px) {
          .editorial-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
