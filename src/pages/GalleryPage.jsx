import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, X, Crosshair, Filter, CheckCircle2, ChevronRight } from 'lucide-react';
import ContactCTA from '../components/ContactCTA';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 100% Real, Authentic Project Photographs extracted directly from Mauli Krupa Precision Works' Catalog
  const galleryItems = [
    {
      id: 'high-altitude',
      code: 'MKP-SPM-01',
      title: 'High Altitude Checking Machine',
      category: 'Custom Machines',
      image: '/images/real_products_curated/01_high_altitude_checking.jpg',
      aspect: '4 / 3',
      featured: true,
      description: 'Stainless steel manifold piping and pressure testing system manufactured strictly to client CAD drawings and ISO pressure tolerances.',
      specs: ['High-Pressure Manifold Testing', 'SS 304/316 Structural Tubing', 'Analog & Digital Sensor Integration', 'Leak-proof Pressure Chamber']
    },
    {
      id: 'welding-spm',
      code: 'MKP-SPM-02',
      title: 'Automated Welding SPM Machine',
      category: 'Custom Machines',
      image: '/images/real_products_curated/03_welding_spm.jpg',
      aspect: '16 / 11',
      featured: true,
      description: 'Custom welding special purpose machine featuring dual-axis motorized rotation, pneumatic clamping, and heavy machine bed.',
      specs: ['Motorized Workpiece Rotation', 'Pneumatic Job Clamping', 'Heavy Vibration-Damped Base', 'Automatic Welding Torch Guide']
    },
    {
      id: 'z-magnetic-conveyor',
      code: 'MKP-MAT-01',
      title: 'Z-Type Magnetic Incline Conveyor',
      category: 'Conveyors',
      image: '/images/real_products_curated/02_z_magnetic_conveyor.jpg',
      aspect: '3 / 4',
      featured: false,
      description: 'High-flux magnetic scrap and stamped part incline conveyor designed for continuous shopfloor transit and chip extraction.',
      specs: ['Permanent High-Flux Magnets', 'Oil & Coolant Resistant SS Belt', 'Integrated Geared Motor Drive', 'Adjustable Discharge Chute']
    },
    {
      id: 'balance-press',
      code: 'MKP-FAB-01',
      title: 'Balance Straightening Press Machine',
      category: 'Heavy Machinery',
      image: '/images/real_products_curated/03_balance_straightening_press.jpg',
      aspect: '4 / 3',
      featured: false,
      description: 'Heavy lead-screw hydraulic press for shaft, rod, and structural beam straightening with micrometer alignment dial.',
      specs: ['Precision Hydraulic Ram Control', 'V-Block Shaft Support Tables', 'Heavy Steel Column Weldment', 'Micrometer Deflection Gauge']
    },
    {
      id: 'fixture-making',
      code: 'MKP-JIG-01',
      title: 'Concentricity Checking & Tooling Fixture',
      category: 'Jigs & Fixtures',
      image: '/images/real_products_curated/01_fixture_making.jpg',
      aspect: '16 / 10',
      featured: true,
      description: 'Multi-point concentricity checking and clamping fixture machined to within ±0.01mm tolerance on precision surface plates.',
      specs: ['Ground Datum Bushings', 'Toggle & Screw Fast Clamping', 'Dial Indicator Mount Stations', 'Hardened Wear Pads']
    },
    {
      id: 'fuel-sensor-rig',
      code: 'MKP-TST-01',
      title: 'Fuel Sensor Automated Testing Rig',
      category: 'Custom Machines',
      image: '/images/real_products_curated/03_fuel_sensor_testing_rig.jpg',
      aspect: '4 / 3',
      featured: false,
      description: 'Automated fluid test bench with digital control panel for electronic automotive sensor calibration and leakage checking.',
      specs: ['Automated Cycle Controller', 'Leakage & Signal Calibration', 'Enclosed Acrylic Inspection Shield', 'Real-time Flow Sensor']
    },
    {
      id: 'material-trolley',
      code: 'MKP-TRL-01',
      title: 'Shopfloor Material Transit Trolley',
      category: 'Industrial Trolleys',
      image: '/images/real_products_curated/04_material_handling_trolley.jpg',
      aspect: '3 / 4',
      featured: false,
      description: 'Ergonomic multi-tier component transit trolley equipped with heavy polyurethane caster wheels and vibration dampening.',
      specs: ['Heavy-Duty Tubular Frame', 'Anti-Static Polyurethane Wheels', 'Custom Component Part Racks', 'Locking Floor Brakes']
    },
    {
      id: 'hydraulic-structure',
      code: 'MKP-FAB-02',
      title: 'Hydraulic Press Machine Structure',
      category: 'Heavy Fabrication',
      image: '/images/real_products_curated/05_hydraulic_press_structure.jpg',
      aspect: '16 / 11',
      featured: true,
      description: 'Heavy-gauge steel C-frame machine structure fabricated with 400A MIG welding and stress-relieved machined bed plates.',
      specs: ['High-Strength Structural Steel', '400A Continuous MIG Welds', 'Precision CNC Milled Bolster Bed', 'Heavy Reinforced Ribs']
    },
    {
      id: 'pvc-conveyor',
      code: 'MKP-MAT-02',
      title: 'PVC Belt Production Line Conveyor',
      category: 'Conveyors',
      image: '/images/real_products_curated/02_pvc_belt_conveyor.jpg',
      aspect: '4 / 3',
      featured: false,
      description: 'Continuous assembly line belt conveyor engineered for silent, high-durability transit across manufacturing stations.',
      specs: ['Food & Industrial Grade PVC Belt', 'Variable Speed Drive (VFD)', 'Modular Aluminum & Steel Frame', 'Height-Adjustable Legs']
    },
    {
      id: 'pneumatic-tackle',
      code: 'MKP-LFT-01',
      title: 'Pneumatic Job Lifting Tackle',
      category: 'Material Handling',
      image: '/images/real_products_curated/04_pneumatic_lifting_tackle.jpg',
      aspect: '3 / 4',
      featured: false,
      description: 'Zero-gravity pneumatic job lifter designed for safe, effortless operator handling of heavy raw castings and machined parts.',
      specs: ['Pneumatic Counterbalance Cylinder', 'Safety Lock Interlock Valve', '360° Articulated Swivel Arm', 'Custom Jaw Grippers']
    }
  ];

  const categories = ['ALL', 'Jigs & Fixtures', 'Custom Machines', 'Conveyors', 'Heavy Fabrication', 'Industrial Trolleys'];

  const filteredItems = selectedCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory || (selectedCategory === 'Material Handling' && (item.category === 'Conveyors' || item.category === 'Industrial Trolleys')));

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '110px', paddingBottom: '100px' }}>
      
      {/* Background CAD Grid */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--font-tech)', fontSize: '12px', color: '#64748b' }}>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>HOME</Link>
          <ChevronRight size={13} color="#94a3b8" />
          <span style={{ color: '#c52227', fontWeight: 700 }}>GALLERY</span>
        </div>

        {/* Page Header */}
        <div style={{ maxWidth: '820px', marginBottom: '44px' }}>
          <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
            <span className="eyebrow-dot" />
            <span>AUTHENTIC SHOPFLOOR WORKS & ARTIFACTS</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#111827',
              margin: '0 0 14px 0',
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
              PORTFOLIO
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.65,
              color: '#4b5563',
              margin: 0
            }}
          >
            Explore actual precision fixtures, special purpose machines, conveyors, and industrial fabrications designed, machined, and assembled at our facility in Bhosari MIDC, Pune.
          </p>
        </div>

        {/* Category Filter Buttons Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            paddingBottom: '20px',
            marginBottom: '40px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px', color: '#94a3b8', fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
            <Filter size={13} color="#c52227" />
            <span>FILTER:</span>
          </div>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '3px',
                  backgroundColor: isActive ? '#111827' : '#f8f9fa',
                  color: isActive ? '#ffffff' : '#475569',
                  border: `1px solid ${isActive ? '#111827' : '#e2e8f0'}`,
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Asymmetrical Grid Layout (Varying proportions, zero card boxes) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(20px, 3vw, 36px)',
            alignItems: 'start'
          }}
          className="gallery-editorial-grid"
        >
          {filteredItems.map((item, index) => {
            // Span 6 columns for normal, 8 or 4 for asymmetrical editorial variation
            const colSpan = item.featured ? 6 : 6;

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                style={{
                  gridColumn: `span ${colSpan}`,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.3s ease'
                }}
                className="gallery-item-node"
              >
                {/* Top Identification Line */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '10px'
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

                {/* Main Photo Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: item.aspect,
                    borderRadius: '3px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f3f5',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)'
                  }}
                  className="gallery-frame"
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
                    className="gallery-img"
                  />

                  {/* Hover Inspect Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.25s ease'
                    }}
                    className="gallery-hover-veil"
                  >
                    <div
                      style={{
                        padding: '8px 16px',
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
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Maximize2 size={13} color="#c52227" />
                      <span>INSPECT SPECIFICATION</span>
                    </div>
                  </div>
                </div>

                {/* Caption Details */}
                <div style={{ marginTop: '12px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(16px, 1.4vw, 19px)',
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
                      fontSize: '13px',
                      lineHeight: 1.55,
                      color: '#64748b',
                      margin: 0
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact CTA Banner */}
        <div style={{ marginTop: '60px' }}>
          <ContactCTA />
        </div>

      </div>

      {/* Full-Screen Specification & High-Res Inspection Lightbox Modal */}
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
              maxWidth: '860px',
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
            <div style={{ maxHeight: '460px', width: '100%', overflow: 'hidden', backgroundColor: '#0f1115' }}>
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                style={{ width: '100%', maxHeight: '460px', objectFit: 'contain', display: 'block' }}
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
                        borderLeft: '2.5px solid #c52227'
                      }}
                    >
                      <CheckCircle2 size={15} color="#0e8a44" style={{ flexShrink: 0 }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RFQ Action */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    backgroundColor: '#c52227',
                    color: '#ffffff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(197, 34, 39, 0.35)'
                  }}
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-item-node:hover {
          transform: translateY(-4px);
        }
        .gallery-item-node:hover .gallery-img {
          transform: scale(1.04);
        }
        .gallery-item-node:hover .gallery-hover-veil {
          opacity: 1 !important;
        }

        @media (max-width: 860px) {
          .gallery-editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-item-node {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
