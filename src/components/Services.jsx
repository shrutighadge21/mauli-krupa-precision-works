import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalService, setActiveModalService] = useState(null);

  // 6 Core Services using 100% authentic Indian manufacturing imagery & real product data
  const services = [
    {
      number: '01',
      id: 'jigs-fixtures',
      title: 'Jigs & Fixtures',
      description: 'Precision-engineered jigs and fixtures designed to improve accuracy, consistency and efficiency across industrial manufacturing processes.',
      image: '/images/real_products_curated/01_fixture_making.jpg',
      alt: 'Precision Jigs and Fixtures Tooling & Inspection in Pune Workshop',
      specs: [
        'Concentricity Checking Fixtures',
        'Grinding & Welding Fixtures',
        'Mechanical & Hydraulic Fixtures',
        'Inspection Master Tooling as per Drawing'
      ]
    },
    {
      number: '02',
      id: 'conveyors-material-handling',
      title: 'Conveyors & Material Handling',
      description: 'Reliable conveyor and material handling solutions designed for smooth, efficient and organised movement of industrial materials.',
      image: '/images/service_conveyors_handling.jpg',
      alt: 'Industrial Automated Conveyor Roller Systems and Material Handling Lines',
      specs: [
        'PVC & Rubber Belt Conveyors',
        'Z-Type Magnetic Incline Conveyors',
        'Bucket Elevators & Screw Conveyors',
        'Chain, Gravity & Trolleys Track Conveyors'
      ]
    },
    {
      number: '03',
      id: 'industrial-trolleys',
      title: 'Industrial Trolleys',
      description: 'Custom industrial trolleys designed for safe, efficient and practical movement of components, materials and equipment.',
      image: '/images/service_industrial_trolleys.jpg',
      alt: 'Heavy Duty Industrial Shopfloor Transit and Platform Trolleys',
      specs: [
        'Heavy Duty Platform Trolleys',
        'Wire Mesh Component Trolleys',
        'Hand Trolleys & Scrap Bin Carriers',
        'Custom Material Handling Transit Racks'
      ]
    },
    {
      number: '04',
      id: 'industrial-fabrication',
      title: 'Industrial Fabrication',
      description: 'Precision fabrication and engineered structural solutions developed to meet specific industrial and manufacturing requirements.',
      image: '/images/service_industrial_fabrication.jpg',
      alt: 'Heavy Industrial Metal Fabrication and Press Machinery Workshop',
      specs: [
        'Hydraulic Tool Pressing Machine Structures',
        'Heavy Machine Base Beds & Frames',
        '400A MIG & Arc Precision Welding',
        'Plate Cutting, Bending & Welded Frameworks'
      ]
    },
    {
      number: '05',
      id: 'custom-engineering',
      title: 'Custom Machines & Engineering Solutions',
      description: 'Special-purpose machines and customised engineering solutions developed according to client drawings and industrial requirements.',
      image: '/images/service_custom_machines_spm.jpg',
      alt: 'High-Precision 5-Axis CNC Milling Center and Custom Machine SPM',
      specs: [
        'Welding SPM Machines as per Drawing',
        'Balance Straightening Press Machines',
        'High Altitude Pressure Checking Rigs',
        'Fuel Sensor Automated Testing Rigs'
      ]
    },
    {
      number: '06',
      id: 'surface-finishing',
      title: 'Surface Finishing',
      description: 'Buffing, polishing and pickling facilities available to support high-quality surface finishing and industrial component requirements.',
      image: '/images/service_surface_finishing.jpg',
      alt: 'Industrial Buffing, Mirror Polishing and Pickling Facility',
      specs: [
        'Heavy Duty Metal Buffing & Polishing',
        'Chemical Pickling & Passivation Tanks',
        'Stainless Steel & Mild Steel Surface Treatment',
        'Corrosion Resistance & Mirror / Satin Finish'
      ]
    }
  ];

  const currentService = services[activeIndex];

  const handleReadMore = (e, service) => {
    e.preventDefault();
    setActiveModalService(service);
  };

  return (
    <section 
      id="services"
      style={{
        position: 'relative',
        paddingTop: 'clamp(70px, 8vw, 100px)',
        paddingBottom: 'clamp(70px, 8vw, 100px)',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f3f5',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
          <div style={{ maxWidth: '760px' }}>
            <div className="eyebrow-label" style={{ marginBottom: '14px' }}>
              <span className="eyebrow-dot" />
              <span>OUR CORE CAPABILITIES</span>
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#111827',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}
            >
              Engineering solutions built for industry.
            </h2>

            <p 
              style={{
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                lineHeight: 1.65,
                color: '#4b5563',
                margin: 0
              }}
            >
              From precision tooling and material handling systems to custom machines and industrial fabrication, we develop practical engineering solutions around real manufacturing requirements.
            </p>
          </div>

          {/* Minimal Link: VIEW SERVICES -> /services */}
          <Link 
            to="/services"
            className="minimal-text-link"
          >
            <span>VIEW SERVICES</span>
            <span className="read-more-arrow">→</span>
          </Link>
        </div>

        {/* Refined Minimal Editorial Service Navigation (01 to 06) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 2.2vw, 32px)',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '28px',
            borderBottom: '1px solid #e5e7eb',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="services-nav-strip"
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  padding: '8px 4px 12px',
                  cursor: 'pointer',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
                className={`service-tab-btn ${isActive ? 'active-tab' : ''}`}
                aria-selected={isActive}
              >
                <span 
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: isActive ? '#c52227' : '#9ca3af',
                    letterSpacing: '0.08em',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {service.number}
                </span>

                <span 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? '#111827' : '#6b7280',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {service.title}
                </span>

                {/* Active Underline Indicator */}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      backgroundColor: '#c52227',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ONE Large Cinematic Interactive Showcase Container (Lightened Overlays with High Machine Clarity) */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#1a1e24',
            minHeight: 'clamp(400px, 46vw, 520px)',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb'
          }}
          className="services-showcase-viewport"
        >
          {/* Smooth Crossfade Background Images — Lightened with High Clarity */}
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={service.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 45%',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'brightness(0.95) contrast(1.05) saturate(1.1)',
                  pointerEvents: 'none'
                }}
              />
            );
          })}

          {/* Subtle Directional Gradient: Lightened for maximum machine visibility */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(12, 14, 18, 0) 0%, rgba(12, 14, 18, 0.45) 55%, rgba(12, 14, 18, 0.88) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(12, 14, 18, 0.8) 0%, rgba(12, 14, 18, 0.3) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Active Service Content Information Area */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              padding: 'clamp(28px, 4vw, 48px)',
              maxWidth: '680px',
              width: '100%'
            }}
          >
            {/* Active Number & Category Tag */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#ef4444',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}
            >
              <span>{currentService.number}</span>
              <span>•</span>
              <span>CAPABILITY SPECIFICATION</span>
            </div>

            {/* Active Service Title */}
            <h3 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 2.6vw, 32px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
                marginBottom: '12px',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              {currentService.title}
            </h3>

            {/* Active Service Description */}
            <p 
              style={{
                fontSize: 'clamp(14.5px, 1.2vw, 16.5px)',
                lineHeight: 1.65,
                color: '#f1f5f9',
                marginBottom: '20px',
                maxWidth: '580px',
                textShadow: '0 1px 8px rgba(0,0,0,0.7)'
              }}
            >
              {currentService.description}
            </p>

            {/* View Specifications and Request Quote Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={(e) => handleReadMore(e, currentService)}
                className="service-showcase-rm-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: '#c52227',
                  padding: '10px 20px',
                  borderRadius: '3px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(197, 34, 39, 0.4)',
                  transition: 'all 0.25s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b31b20';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#c52227';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>VIEW SPECIFICATIONS</span>
                <ArrowRight size={14} />
              </button>

              <Link
                to="/services"
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>VIEW ALL SERVICES →</span>
              </Link>
            </div>

          </div>

          {/* Quick Indicator Dots on Bottom Right */}
          <div 
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 3
            }}
            className="showcase-dots"
          >
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select service ${idx + 1}`}
                style={{
                  width: activeIndex === idx ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activeIndex === idx ? '#c52227' : 'rgba(255, 255, 255, 0.65)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

        </div>

        {/* Bottom Clean Text CTA */}
        <div 
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              color: '#6b7280',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            CUSTOM FABRICATION & TOOLING AS PER CLIENT DRAWINGS
          </span>

          <Link 
            to="/services"
            className="minimal-text-link"
          >
            <span>EXPLORE ALL SERVICES & CAPABILITIES</span>
            <span className="read-more-arrow">→</span>
          </Link>
        </div>

      </div>

      {/* Service Detail Modal when clicking VIEW SPECIFICATIONS */}
      {activeModalService && (
        <div 
          onClick={() => setActiveModalService(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            backgroundColor: 'rgba(10, 12, 16, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none'
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Image with High Clarity */}
            <div style={{ height: '280px', width: '100%', position: 'relative', backgroundColor: '#0f1115' }}>
              <img 
                src={activeModalService.image} 
                alt={activeModalService.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Modal Details */}
            <div style={{ padding: '28px 32px 32px' }}>
              <div 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#c52227',
                  letterSpacing: '0.1em',
                  marginBottom: '4px'
                }}
              >
                SERVICE {activeModalService.number}
              </div>

              <h3 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#111827',
                  marginBottom: '12px'
                }}
              >
                {activeModalService.title}
              </h3>

              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.65, marginBottom: '20px' }}>
                {activeModalService.description}
              </p>

              {/* Manufacturing Capabilities */}
              <div>
                <span 
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#111827',
                    marginBottom: '10px'
                  }}
                >
                  Key Manufacturing Specifications:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                  {activeModalService.specs.map((spec) => (
                    <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#1f2937' }}>
                      <CheckCircle2 size={15} color="#0e8a44" style={{ flexShrink: 0 }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  to="/contact"
                  onClick={() => setActiveModalService(null)}
                  className="btn-primary-red"
                  style={{ padding: '10px 20px', fontSize: '14px', textDecoration: 'none' }}
                >
                  <span>Request RFQ for {activeModalService.title}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .services-nav-strip::-webkit-scrollbar {
          display: none;
        }
        .service-tab-btn:hover span {
          color: #111827 !important;
        }
        .active-tab span:first-child {
          color: #c52227 !important;
        }

        @media (max-width: 768px) {
          .services-showcase-viewport {
            min-height: 440px !important;
          }
          .showcase-dots {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
