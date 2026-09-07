import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Wrench, Award, Compass, Cpu, Users } from 'lucide-react';
import ContactCTA from '../components/ContactCTA';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="about-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
      
      {/* ========================================================================= */}
      {/* 1. TOP SECTION: BUILT AROUND PRACTICAL ENGINEERING (MATCHING REFERENCE)   */}
      {/* ========================================================================= */}
      <section 
        style={{
          position: 'relative',
          paddingTop: 'clamp(90px, 10vw, 130px)',
          paddingBottom: 'clamp(60px, 7vw, 90px)',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)',
              gap: 'clamp(36px, 5.5vw, 70px)',
              alignItems: 'center'
            }}
            className="about-top-grid"
          >
            {/* Left Column: Story & Introduction */}
            <div>
              {/* Red Eyebrow */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#c52227',
                  marginBottom: '16px'
                }}
              >
                <span style={{ display: 'inline-block', width: '22px', height: '2px', backgroundColor: '#c52227' }} />
                <span>ABOUT MAULI KRUPA</span>
              </div>

              {/* Main Headline */}
              <h1 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 4.2vw, 54px)',
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  color: '#111827',
                  marginBottom: '20px'
                }}
              >
                Built Around Practical<br />
                <span style={{ color: '#c52227' }}>Engineering.</span>
              </h1>

              {/* Description Paragraph */}
              <p 
                style={{
                  fontSize: 'clamp(15.5px, 1.25vw, 17.5px)',
                  lineHeight: 1.75,
                  color: '#4b5563',
                  marginBottom: '24px'
                }}
              >
                Established in 2015 in Bhosari MIDC, Pune, <strong style={{ color: '#111827' }}>Mauli Krupa Precision Works</strong> is a specialized precision manufacturing and engineering company delivering end-to-end design, fabrication, jigs, fixtures, and custom tooling solutions for leading industrial OEMs.
              </p>

              {/* In-House Finishing Facility Box */}
              <div 
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#ffffff',
                  borderLeft: '3px solid #c52227',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  borderRadius: '0 4px 4px 0',
                  marginBottom: '28px',
                  border: '1px solid #f3f4f6',
                  borderLeftColor: '#c52227',
                  borderLeftWidth: '3px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Sparkles size={16} color="#c52227" />
                  <span 
                    style={{
                      fontFamily: 'var(--font-tech)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#111827'
                    }}
                  >
                    IN-HOUSE FINISHING FACILITY
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Buffing or polishing and pickling facility available. Equipped for heavy metal buffing, mirror/satin polishing and chemical passivation.
                </p>
              </div>

              {/* Minimal Text Link: OUR STORY -> /contact */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <a 
                  href="#heritage"
                  className="minimal-text-link"
                >
                  <span style={{ display: 'inline-block', width: '16px', height: '1.5px', backgroundColor: '#111827' }} />
                  <span>OUR STORY</span>
                  <span className="read-more-arrow">→</span>
                </a>

                <Link
                  to="/contact"
                  className="minimal-text-link"
                  style={{ color: '#c52227' }}
                >
                  <span>CONNECT WITH US</span>
                  <span className="read-more-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Authentic Indian Workshop Photography */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <img 
                  src="/images/about_workshop_indian.jpg" 
                  alt="Engineers inspecting precision tooling in Bhosari MIDC workshop"
                  style={{
                    width: '100%',
                    height: 'clamp(340px, 38vw, 460px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Caption */}
              <div 
                style={{
                  marginTop: '12px',
                  textAlign: 'right',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#9ca3af',
                  textTransform: 'uppercase'
                }}
              >
                PEOPLE / PROCESS / PRECISION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MIDDLE SECTION: OUR APPROACH (MATCHING REFERENCE IMAGE)                 */}
      {/* ========================================================================= */}
      <section 
        style={{
          position: 'relative',
          paddingTop: 'clamp(60px, 7vw, 90px)',
          paddingBottom: 'clamp(70px, 8vw, 100px)',
          backgroundColor: '#fafbfc',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
              gap: 'clamp(36px, 5.5vw, 70px)',
              alignItems: 'center',
              marginBottom: 'clamp(48px, 6vw, 70px)'
            }}
            className="about-approach-grid"
          >
            {/* Left Content */}
            <div>
              {/* Red Eyebrow */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#c52227',
                  marginBottom: '16px'
                }}
              >
                <span style={{ display: 'inline-block', width: '22px', height: '2px', backgroundColor: '#c52227' }} />
                <span>OUR APPROACH</span>
              </div>

              {/* Headline */}
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.6vw, 46px)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  marginBottom: '18px'
                }}
              >
                Engineered With Purpose.<br />
                <span style={{ color: '#c52227' }}>Built For Precision.</span>
              </h2>

              {/* Subtext */}
              <p 
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  lineHeight: 1.7,
                  color: '#4b5563',
                  marginBottom: '24px'
                }}
              >
                We combine practical engineering, skilled craftsmanship and modern manufacturing capabilities to deliver reliable solutions for real industrial needs.
              </p>

              {/* Minimal Arrow Link */}
              <Link 
                to="/services"
                className="minimal-text-link"
              >
                <span>EXPLORE CAPABILITIES</span>
                <span className="read-more-arrow">→</span>
              </Link>
            </div>

            {/* Right Visual: CNC Machining with Coolant */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <img 
                  src="/images/precision_metrology_datum.jpg" 
                  alt="Precision CNC milling and fixture machining in Pune"
                  style={{
                    width: '100%',
                    height: 'clamp(300px, 34vw, 400px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Watermark Tag */}
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(17, 24, 39, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  textTransform: 'uppercase'
                }}
              >
                PRECISION IN EVERY MOVEMENT
              </div>
            </div>
          </div>

          {/* Connected 3 Process Circles — Exact Match to Reference Image */}
          <div 
            style={{
              paddingTop: '36px',
              borderTop: '1px solid #e5e7eb',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr auto 1fr',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 24px)'
            }}
            className="about-circles-track"
          >
            {/* Step 1: PRECISION */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2.5px solid #c52227',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              </div>
              <div>
                <div 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#111827',
                    textTransform: 'uppercase'
                  }}
                >
                  PRECISION
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  IN PROCESS
                </div>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div style={{ width: 'clamp(30px, 8vw, 100px)', height: '1px', backgroundColor: '#cbd5e1' }} className="circle-conn-line" />

            {/* Step 2: ENGINEERING */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2.5px solid #c52227',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              </div>
              <div>
                <div 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#111827',
                    textTransform: 'uppercase'
                  }}
                >
                  ENGINEERING
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  IN SOLUTIONS
                </div>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div style={{ width: 'clamp(30px, 8vw, 100px)', height: '1px', backgroundColor: '#cbd5e1' }} className="circle-conn-line" />

            {/* Step 3: MANUFACTURING */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2.5px solid #c52227',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c52227' }} />
              </div>
              <div>
                <div 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#111827',
                    textTransform: 'uppercase'
                  }}
                >
                  MANUFACTURING
                </div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  IN PROGRESS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DETAILED HERITAGE, LEADERSHIP & INFRASTRUCTURE                         */}
      {/* ========================================================================= */}
      <section id="heritage" style={{ padding: 'clamp(70px, 8vw, 100px) 0', backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          
          <div style={{ maxWidth: '780px', marginBottom: '48px' }}>
            <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
              <span className="eyebrow-dot" />
              <span>FACILITY & INFRASTRUCTURE</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: '14px' }}>
              Over a Decade of Industrial Commitment in Bhosari MIDC.
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7 }}>
              Guided by proprietor Santos Marotkar and operations lead Abhishek Marotkar, Mauli Krupa Precision Works maintains rigorous in-house tooling, fabrication, and metrology standards to ensure exact alignment with client drawings.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '56px'
            }}
          >
            {/* Box 1: Machining Infrastructure */}
            <div 
              style={{
                padding: '28px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Wrench size={20} color="#c52227" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Machining Capacity
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>Heavy Lathe Machines (Bed 4.5ft to 8ft)</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>Industrial Drilling & Boring Units</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>Milling, T-Slot Bed Planing & Tooling</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Fabrication & Welding */}
            <div 
              style={{
                padding: '28px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Cpu size={20} color="#c52227" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Fabrication & Welding
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>400A High-Capacity MIG Welding</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>Precision Arc & TIG Joint Systems</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0 }} />
                  <span>Hydraulic Press Structures & Machine Beds</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Quality & Inspection */}
            <div 
              style={{
                padding: '28px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <ShieldCheck size={20} color="#0e8a44" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Metrology & Inspection
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#0e8a44" style={{ flexShrink: 0 }} />
                  <span>Granite Surface Plate Datum Inspection</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#0e8a44" style={{ flexShrink: 0 }} />
                  <span>Calibrated Verniers, Bore Gauges & Micrometers</span>
                </li>
                <li style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#0e8a44" style={{ flexShrink: 0 }} />
                  <span>Run-out & Concentricity Checking Fixtures</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Details Strip */}
          <div 
            style={{
              padding: '24px 32px',
              backgroundColor: '#111318',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              color: '#ffffff'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                REGISTERED OFFICE & WORKS
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>
                {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, Maharashtra {COMPANY_INFO.address.pincode}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  GSTIN
                </div>
                <div style={{ fontSize: '14px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#ffffff' }}>
                  {COMPANY_INFO.taxIdentifiers.gstin}
                </div>
              </div>

              <Link 
                to="/contact"
                className="btn-primary-red"
                style={{ padding: '10px 22px', fontSize: '13.5px', textDecoration: 'none' }}
              >
                <span>Request Facility Visit</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION SECTION ABOVE FOOTER                                    */}
      {/* ========================================================================= */}
      <ContactCTA />

      <style>{`
        @media (max-width: 860px) {
          .about-top-grid, .about-approach-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .about-circles-track {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .circle-conn-line {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
