import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Maximize2, X, Crosshair, Sparkles } from 'lucide-react';

export default function Gallery() {
  const scrollContainerRef = useRef(null);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 100% Real, Authentic Project Photographs extracted directly from Mauli Krupa Precision Works' Catalog
  const galleryItems = [
    {
      id: 'high-altitude',
      code: 'MKP-SPM-01',
      title: 'High Altitude Checking Machine',
      category: 'Special Purpose Machine',
      image: '/images/real_products_curated/01_high_altitude_checking.jpg',
      aspect: '4 / 3',
      description: 'Stainless steel manifold piping and pressure testing system manufactured strictly to client CAD drawings and ISO pressure tolerances.',
      specs: ['High-Pressure Manifold Testing', 'SS 304/316 Structural Tubing', 'Analog & Digital Sensor Integration']
    },
    {
      id: 'welding-spm',
      code: 'MKP-SPM-02',
      title: 'Automated Welding SPM',
      category: 'Custom Machinery',
      image: '/images/real_products_curated/03_welding_spm.jpg',
      aspect: '16 / 11',
      description: 'Custom welding special purpose machine featuring dual-axis motorized rotation, pneumatic clamping, and heavy machine bed.',
      specs: ['Motorized Workpiece Rotation', 'Pneumatic Job Clamping', 'Heavy Vibration-Damped Base']
    },
    {
      id: 'z-magnetic-conveyor',
      code: 'MKP-MAT-01',
      title: 'Z-Type Magnetic Incline Conveyor',
      category: 'Material Handling',
      image: '/images/real_products_curated/02_z_magnetic_conveyor.jpg',
      aspect: '3 / 4',
      description: 'High-flux magnetic scrap and stamped part incline conveyor designed for continuous shopfloor transit and chip extraction.',
      specs: ['Permanent High-Flux Magnets', 'Oil & Coolant Resistant SS Belt', 'Integrated Geared Motor Drive']
    },
    {
      id: 'balance-press',
      code: 'MKP-FAB-01',
      title: 'Balance Straightening Press Machine',
      category: 'Heavy Machinery',
      image: '/images/real_products_curated/03_balance_straightening_press.jpg',
      aspect: '4 / 3',
      description: 'Heavy lead-screw hydraulic press for shaft, rod, and structural beam straightening with micrometer alignment dial.',
      specs: ['Precision Hydraulic Ram Control', 'V-Block Shaft Support Tables', 'Heavy Steel Column Weldment']
    },
    {
      id: 'fixture-making',
      code: 'MKP-JIG-01',
      title: 'Concentricity Checking & Tooling Fixture',
      category: 'Jigs & Fixtures',
      image: '/images/real_products_curated/01_fixture_making.jpg',
      aspect: '16 / 10',
      description: 'Multi-point concentricity checking and clamping fixture machined to within ±0.01mm tolerance on precision surface plates.',
      specs: ['Ground Datum Bushings', 'Toggle & Screw Fast Clamping', 'Dial Indicator Mount Stations']
    },
    {
      id: 'fuel-sensor-rig',
      code: 'MKP-TST-01',
      title: 'Fuel Sensor Automated Testing Rig',
      category: 'Custom Test Benches',
      image: '/images/real_products_curated/03_fuel_sensor_testing_rig.jpg',
      aspect: '4 / 3',
      description: 'Automated fluid test bench with digital control panel for electronic automotive sensor calibration and leakage checking.',
      specs: ['Automated Cycle Controller', 'Leakage & Signal Calibration', 'Enclosed Acrylic Inspection Shield']
    },
    {
      id: 'material-trolley',
      code: 'MKP-TRL-01',
      title: 'Shopfloor Material Transit Trolley',
      category: 'Industrial Trolleys',
      image: '/images/real_products_curated/04_material_handling_trolley.jpg',
      aspect: '3 / 4',
      description: 'Ergonomic multi-tier component transit trolley equipped with heavy polyurethane caster wheels and vibration dampening.',
      specs: ['Heavy-Duty Tubular Frame', 'Anti-Static Polyurethane Wheels', 'Custom Component Part Racks']
    },
    {
      id: 'hydraulic-structure',
      code: 'MKP-FAB-02',
      title: 'Hydraulic Press Machine Structure',
      category: 'Heavy Fabrication',
      image: '/images/real_products_curated/05_hydraulic_press_structure.jpg',
      aspect: '16 / 11',
      description: 'Heavy-gauge steel C-frame machine structure fabricated with 400A MIG welding and stress-relieved machined bed plates.',
      specs: ['High-Strength Structural Steel', '400A Continuous MIG Welds', 'Precision CNC Milled Bolster Bed']
    },
    {
      id: 'pvc-conveyor',
      code: 'MKP-MAT-02',
      title: 'PVC Belt Production Line Conveyor',
      category: 'Material Handling',
      image: '/images/real_products_curated/02_pvc_belt_conveyor.jpg',
      aspect: '4 / 3',
      description: 'Continuous assembly line belt conveyor engineered for silent, high-durability transit across manufacturing stations.',
      specs: ['Food & Industrial Grade PVC Belt', 'Variable Speed Drive (VFD)', 'Modular Aluminum & Steel Frame']
    },
    {
      id: 'pneumatic-tackle',
      code: 'MKP-LFT-01',
      title: 'Pneumatic Job Lifting Tackle',
      category: 'Material Handling',
      image: '/images/real_products_curated/04_pneumatic_lifting_tackle.jpg',
      aspect: '3 / 4',
      description: 'Zero-gravity pneumatic job lifter designed for safe, effortless operator handling of heavy raw castings and machined parts.',
      specs: ['Pneumatic Counterbalance Cylinder', 'Safety Lock Interlock Valve', '360° Articulated Swivel Arm']
    }
  ];

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -420 : 420;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const onScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollPosition(progress);
  };

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        paddingTop: '110px',
        paddingBottom: '100px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Technical Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER & NAVIGATION CONTROLS                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '44px',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            {/* Eyebrow */}
            <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
              <span className="eyebrow-dot" />
              <span>SHOPFLOOR ARTIFACTS & REAL PROJECTS</span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#111827',
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}
            >
              ENGINEERING{' '}
              <span
                style={{
                  color: '#c52227',
                  fontFamily: 'var(--font-tech)',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                GALLERY
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(14.5px, 1.2vw, 16.5px)',
                lineHeight: 1.6,
                color: '#64748b',
                margin: 0
              }}
            >
              Photographs of actual precision fixtures, SPMs, conveyor systems, and industrial structures built at our Bhosari MIDC manufacturing facility.
            </p>
          </div>

          {/* Horizontal Navigation Control Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left in gallery"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '3px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e2e8f0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right in gallery"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '3px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e2e8f0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#c52227';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HORIZONTAL EDITORIAL PORTFOLIO RAIL (NO GENERIC BOXES)                  */}
      {/* ========================================================================= */}
      <div
        ref={scrollContainerRef}
        onScroll={onScrollUpdate}
        style={{
          display: 'flex',
          gap: 'clamp(20px, 3vw, 36px)',
          overflowX: 'auto',
          paddingLeft: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingRight: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingBottom: '24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x proximity',
          position: 'relative',
          zIndex: 2
        }}
        className="gallery-horizontal-rail"
      >
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            style={{
              flex: '0 0 auto',
              width: 'clamp(300px, 32vw, 420px)',
              cursor: 'pointer',
              position: 'relative',
              scrollSnapAlign: 'start',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="gallery-portfolio-item"
          >
            {/* Top Coordinate Identifier */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '8px',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Crosshair size={12} color="#c52227" />
                <span
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748b',
                    letterSpacing: '0.08em'
                  }}
                >
                  {item.code}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                {item.category}
              </span>
            </div>

            {/* Image Frame with Editorial Proportions */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: item.aspect,
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#f1f3f5',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
              }}
              className="gallery-img-container"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="gallery-main-photo"
              />

              {/* Hover Overlay with Expand Indicator */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.25s ease'
                }}
                className="gallery-hover-overlay"
              >
                <div
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#ffffff',
                    borderRadius: '2px',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <Maximize2 size={13} color="#c52227" />
                  <span>INSPECT SPEC</span>
                </div>
              </div>
            </div>

            {/* Caption & Specs */}
            <div style={{ marginTop: '14px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.3,
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.01em'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  color: '#64748b',
                  margin: 0
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM PROGRESS TRACK & SUMMARY                                        */}
      {/* ========================================================================= */}
      <div className="container-custom" style={{ marginTop: '28px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '2px',
            backgroundColor: '#e2e8f0',
            borderRadius: '1px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${Math.max(scrollPosition * 100, 15)}%`,
              backgroundColor: '#c52227',
              transition: 'width 0.2s linear'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            fontFamily: 'var(--font-tech)',
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <span>10 AUTHENTIC SHOPFLOOR PROJECTS</span>
          <span style={{ color: '#c52227', fontWeight: 600 }}>SWIPE / DRAG TO EXPLORE ALL WORKS</span>
          <span>BHOSARI MIDC, PUNE</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. HIGH-RESOLUTION INSPECTION MODAL                                       */}
      {/* ========================================================================= */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            backgroundColor: 'rgba(10, 12, 16, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '820px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              border: '1px solid #e5e7eb',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div style={{ maxHeight: '420px', width: '100%', overflow: 'hidden', backgroundColor: '#0f1115' }}>
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Modal Details */}
            <div style={{ padding: '32px 36px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#c52227',
                    letterSpacing: '0.1em'
                  }}
                >
                  [{activeModalItem.code}]
                </span>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <span
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  {activeModalItem.category}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#111827',
                  marginBottom: '14px',
                  letterSpacing: '-0.02em'
                }}
              >
                {activeModalItem.title}
              </h3>

              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.65, marginBottom: '22px' }}>
                {activeModalItem.description}
              </p>

              {/* Manufacturing Specs */}
              <div style={{ marginBottom: '28px' }}>
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
                  Manufacturing & Engineering Capabilities:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {activeModalItem.specs.map((spec) => (
                    <div
                      key={spec}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13.5px',
                        color: '#334155',
                        padding: '8px 12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '3px',
                        borderLeft: '2px solid #c52227'
                      }}
                    >
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RFQ Action */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href="#contact"
                  onClick={() => {
                    setActiveModalItem(null);
                    const target = document.querySelector('#contact');
                    if (target) {
                      const navOffset = 80;
                      const elementPosition = target.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="btn-primary-red"
                  style={{ padding: '11px 22px', fontSize: '14px' }}
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-horizontal-rail::-webkit-scrollbar {
          display: none;
        }
        .gallery-portfolio-item:hover {
          transform: translateY(-4px);
        }
        .gallery-portfolio-item:hover .gallery-main-photo {
          transform: scale(1.04);
        }
        .gallery-portfolio-item:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
