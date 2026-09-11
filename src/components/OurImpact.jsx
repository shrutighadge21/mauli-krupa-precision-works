import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function OurImpact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  // Exactly 3 genuine, verified metrics requested by the user
  const metrics = [
    {
      id: 'projects',
      target: 50,
      suffix: '+',
      padZero: false,
      delay: 0,
      title: 'Projects Completed',
      detail: 'Custom jigs, welding fixtures, SPMs and handling systems delivered across India.'
    },
    {
      id: 'sectors',
      target: 5,
      suffix: '',
      padZero: true,
      delay: 100,
      title: 'Industrial Sectors Served',
      detail: 'Automotive, railways, automated production, heavy fabrication & defense.'
    },
    {
      id: 'experience',
      target: 10,
      suffix: '+',
      padZero: false,
      delay: 200,
      title: 'Years of Experience',
      detail: 'Established in Bhosari MIDC, Pune in 2015 with in-house design, machining & fabrication.'
    }
  ];

  // Viewport IntersectionObserver — Activates on viewport entry, resets on exit to replay on scroll back
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset when scrolled out of view so animation replays upon return
          setIsVisible(false);
          setCounts([0, 0, 0]);
        }
      },
      { threshold: 0.25 }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Smooth, ease-out count-up animation with staggered start
  useEffect(() => {
    if (!isVisible) {
      setCounts([0, 0, 0]);
      return;
    }

    let animationFrameId;
    const duration = 1800; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTotal = currentTime - startTime;

      const newCounts = metrics.map((m) => {
        const elapsed = Math.max(0, elapsedTotal - m.delay);
        const progress = Math.min(elapsed / (duration - m.delay), 1);
        // Smooth ease-out cubic (slows down naturally towards the end)
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(ease * m.target);
        return Math.min(currentVal, m.target);
      });

      setCounts(newCounts);

      if (elapsedTotal < duration + 200) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Stop exactly at final values
        setCounts(metrics.map((m) => m.target));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Formats numbers cleanly: 50+ (adds + on finish), 05 (preserves leading zero), 10+ (adds + on finish)
  const formatNumber = (metric, index) => {
    const val = counts[index];
    if (metric.padZero) {
      return val < 10 ? `0${val}` : `${val}`;
    }
    const isFinished = val >= metric.target;
    return isFinished ? `${val}${metric.suffix}` : `${val}`;
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        padding: 'clamp(72px, 8vw, 110px) 0',
        overflow: 'hidden'
      }}
    >
      {/* Background Precision Engineering Blueprint Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.018) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* ========================================================================= */}
        {/* TOP SECTION HEADER (Clean Typography & Strong Hierarchy) */}
        {/* ========================================================================= */}
        <div style={{ maxWidth: '780px', marginBottom: 'clamp(44px, 5.5vw, 68px)' }}>
          {/* Small Category Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#c52227'
              }}
            />
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
              PROVEN TRACK RECORD & CAPACITY
            </span>
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#111827',
              margin: '0 0 12px 0',
              textTransform: 'uppercase'
            }}
          >
            MEASURED IMPACT &{' '}
            <span
              style={{
                color: '#c52227',
                fontFamily: 'var(--font-tech)',
                fontWeight: 800,
                letterSpacing: '0.02em'
              }}
            >
              SCALE
            </span>
          </h2>

          {/* Short Description */}
          <p
            style={{
              fontSize: 'clamp(14.5px, 1.15vw, 16.5px)',
              lineHeight: 1.6,
              color: '#64748b',
              margin: 0
            }}
          >
            A growing record of precision tooling, custom machinery and industrial fabrication solutions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL ASYMMETRICAL COMPOSITION (Connected with Hairline Precision Guides) */}
        {/* ========================================================================= */}
        <div className="impact-editorial-container" style={{ position: 'relative', width: '100%' }}>
          
          {/* Thin Horizontal Connecting Baseline Top */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '1px',
              backgroundColor: '#e2e8f0',
              marginBottom: 'clamp(36px, 4.5vw, 54px)'
            }}
          >
            {/* Subtle red progress line across top guide */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: isVisible ? '100%' : '0%',
                backgroundColor: '#c52227',
                opacity: 0.35,
                transition: 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>

          {/* Top Tier: Metric 01 (Left) & Metric 02 (Offset Right) */}
          <div
            className="impact-top-tier"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              columnGap: 'clamp(24px, 4vw, 48px)',
              rowGap: '40px',
              marginBottom: 'clamp(44px, 5.5vw, 68px)',
              alignItems: 'start'
            }}
          >
            {/* METRIC 01: 50+ (Positioned Left Anchor, Span 5) */}
            <div
              className="impact-metric-block"
              style={{
                gridColumn: 'span 5',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '0.1s'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 5.8vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#111827',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'baseline',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <span>{formatNumber(metrics[0], 0)}</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    marginLeft: '6px',
                    marginBottom: '8px'
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(17px, 1.35vw, 20px)',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.25,
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.015em'
                }}
              >
                {metrics[0].title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  color: '#64748b',
                  margin: 0,
                  maxWidth: '300px'
                }}
              >
                {metrics[0].detail}
              </p>
            </div>

            {/* Middle Spacer / Subtle Vertical Line on Desktop (Span 2) */}
            <div
              className="impact-tier-divider hidden lg:flex"
              style={{
                gridColumn: 'span 1',
                justifyContent: 'center',
                height: '100%',
                paddingTop: '8px'
              }}
            >
              <div
                style={{
                  width: '1px',
                  height: '80px',
                  backgroundColor: '#e2e8f0'
                }}
              />
            </div>

            {/* METRIC 02: 05 (Positioned Offset Right, Span 6) */}
            <div
              className="impact-metric-block"
              style={{
                gridColumn: 'span 6',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '0.25s',
                paddingLeft: 'clamp(0px, 2vw, 24px)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 5.8vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#111827',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'baseline',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <span>{formatNumber(metrics[1], 1)}</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    marginLeft: '6px',
                    marginBottom: '8px'
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(17px, 1.35vw, 20px)',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.25,
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.015em'
                }}
              >
                {metrics[1].title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  color: '#64748b',
                  margin: 0,
                  maxWidth: '320px'
                }}
              >
                {metrics[1].detail}
              </p>
            </div>
          </div>

          {/* Lower Tier: Integrated Real Workshop Visual (Left/Center) & Metric 03 (Right Anchor) */}
          <div
            className="impact-lower-tier"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              columnGap: 'clamp(24px, 4vw, 48px)',
              rowGap: '32px',
              alignItems: 'center',
              paddingTop: 'clamp(20px, 3vw, 36px)',
              borderTop: '1px solid #f1f5f9'
            }}
          >
            {/* SUBTLE REAL INDUSTRIAL / WORKSHOP PHOTOGRAPH (Clean, bright, non-dominant, real Indian tooling) */}
            <div
              className="impact-visual-frame"
              style={{
                gridColumn: 'span 7',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '0.35s'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Real Workshop Fixture Photo */}
                <img
                  src="/images/real_products_curated/01_fixture_making.jpg"
                  alt="Precision tooling and machining fixture at Mauli Krupa Precision Works Bhosari facility"
                  style={{
                    width: '100%',
                    height: 'clamp(140px, 14vw, 190px)',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(1.02) contrast(1.02)'
                  }}
                  loading="lazy"
                />

                {/* Subtle Clean Bottom Tag (No dark heavy shadows) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#c52227'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-tech)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#334155',
                      textTransform: 'uppercase'
                    }}
                  >
                    PRECISION TOOLING ASSEMBLY // BHOSARI FACILITY
                  </span>
                </div>
              </div>
            </div>

            {/* METRIC 03: 10+ (Positioned Right Side Opposite, Span 5) */}
            <div
              className="impact-metric-block"
              style={{
                gridColumn: 'span 5',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '0.45s',
                paddingLeft: 'clamp(0px, 2vw, 16px)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 5.8vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#111827',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'baseline',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <span>{formatNumber(metrics[2], 2)}</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#c52227',
                    marginLeft: '6px',
                    marginBottom: '8px'
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(17px, 1.35vw, 20px)',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.25,
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.015em'
                }}
              >
                {metrics[2].title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  color: '#64748b',
                  margin: 0,
                  maxWidth: '320px'
                }}
              >
                {metrics[2].detail}
              </p>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CTA: Subtle Text Link -> EXPLORE OUR WORK -> /gallery */}
        {/* ========================================================================= */}
        <div
          style={{
            marginTop: 'clamp(44px, 5vw, 60px)',
            paddingTop: '20px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Link
            to="/gallery"
            className="explore-work-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-tech)',
              fontSize: '13.5px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#c52227',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s ease, transform 0.2s ease'
            }}
          >
            <span>EXPLORE OUR WORK</span>
            <span className="explore-arrow" style={{ transition: 'transform 0.2s ease' }}>→</span>
          </Link>
        </div>

      </div>

      <style>{`
        .explore-work-link:hover {
          color: #a8191e !important;
        }
        .explore-work-link:hover .explore-arrow {
          transform: translateX(4px) !important;
        }

        @media (max-width: 900px) {
          .impact-top-tier {
            grid-template-columns: 1fr 1fr !important;
          }
          .impact-top-tier > div:first-child {
            grid-column: span 1 !important;
          }
          .impact-top-tier > div:nth-child(3) {
            grid-column: span 1 !important;
            padding-left: 0 !important;
          }
          .impact-tier-divider {
            display: none !important;
          }
          .impact-lower-tier {
            grid-template-columns: 1fr 1fr !important;
          }
          .impact-visual-frame {
            grid-column: span 1 !important;
          }
          .impact-lower-tier > div:last-child {
            grid-column: span 1 !important;
            padding-left: 0 !important;
          }
        }

        @media (max-width: 640px) {
          .impact-top-tier {
            grid-template-columns: 1fr !important;
            row-gap: 32px !important;
            margin-bottom: 36px !important;
          }
          .impact-top-tier > div:first-child,
          .impact-top-tier > div:nth-child(3) {
            grid-column: span 1 !important;
          }
          .impact-lower-tier {
            grid-template-columns: 1fr !important;
            row-gap: 28px !important;
          }
          .impact-visual-frame,
          .impact-lower-tier > div:last-child {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
