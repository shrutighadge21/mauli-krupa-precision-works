import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Cog,
  Boxes,
  Crosshair,
  Cpu,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  Headphones,
  ShieldCheck,
  Clock,
  Settings,
  ThumbsUp,
  X
} from 'lucide-react';

export default function ServicesPage() {
  // Navigation Selection State:
  // selectedMain: '01' | '02' | '03' | '04' | '05'
  // selectedSub: null | 'ss' | 'ms' | 'milling' | 'grinding'
  const [selectedMain, setSelectedMain] = useState('01');
  const [selectedSub, setSelectedSub] = useState(null);

  // Sidebar Accordion Expanded States
  const [openMainTree, setOpenMainTree] = useState({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
    '05': false
  });

  const [openSubTree, setOpenSubTree] = useState({
    'milling': false,
    'grinding': false
  });

  // Mobile Accordion state
  const [mobileExpandedMain, setMobileExpandedMain] = useState('01');

  // Modal State for Deep Inspection
  const [selectedDetailModal, setSelectedDetailModal] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDetailModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectMainCategory = (id) => {
    setSelectedMain(id);
    setSelectedSub(null);
    setOpenMainTree((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const selectSubCategory = (subKey, parentId) => {
    setSelectedMain(parentId);
    setSelectedSub(subKey);
  };

  const toggleSubTree = (subKey) => {
    setOpenSubTree((prev) => ({
      ...prev,
      [subKey]: !prev[subKey]
    }));
  };

  // Helper to build direct Contact URL with query parameter & state
  const getInquiryUrl = (serviceName) => `/contact?service=${encodeURIComponent(serviceName)}`;

  // =========================================================================
  // DATA DEFINITIONS (100% REAL MKP ASSETS & EXACT SPECIFICATIONS)
  // =========================================================================

  // 1. SS FABRICATION (9 Items)
  const SS_FABRICATION_SERVICES = [
    {
      id: 'ss-1',
      num: '01',
      name: 'Tube Structure & Channel Angle Fabrication',
      description:
        'Fabrication of stainless steel tube structures, channels and angle-based assemblies according to project requirements.',
      image: '/images/gallery_assets/structural_frame_01.jpg',
      tag: 'SS Structural',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-2',
      num: '02',
      name: 'SS Ducting Fabrication',
      description:
        'Fabrication of stainless steel ducting components for industrial air, process and material-handling applications.',
      image: '/images/gallery_assets/sheetmetal_ducts_12.jpg',
      tag: 'SS Ducting',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-3',
      num: '03',
      name: 'SS Tank Fabrication',
      description:
        'Fabrication of stainless steel tanks for industrial and process-related applications based on required design and usage.',
      image: '/images/gallery_assets/sheetmetal_hopper_10.jpg',
      tag: 'SS Vessels',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-4',
      num: '04',
      name: 'SS Pipeline Fabrication',
      description:
        'Stainless steel pipeline fabrication for industrial process and utility requirements.',
      image: '/images/gallery_assets/filtration_skid_20.jpg',
      tag: 'SS Piping',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-5',
      num: '05',
      name: 'Polishing & Buffing Work',
      description:
        'Surface finishing services for stainless steel components to achieve a clean and refined finish.',
      image: '/images/service_surface_finishing.jpg',
      tag: 'Finishing',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-6',
      num: '06',
      name: 'Passivation & Pickling Work',
      description:
        'Surface treatment processes for stainless steel components as required for fabrication and finishing applications.',
      image: '/images/gallery_assets/process_skid_19.jpg',
      tag: 'Chemical Treatment',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-7',
      num: '07',
      name: 'SS 3rd Party NDT Facility',
      description:
        'Third-party non-destructive testing support for applicable stainless steel fabrication and inspection requirements.',
      image: '/images/qc_measuring.jpg',
      tag: 'Quality & NDT',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-8',
      num: '08',
      name: 'Glass Blasting',
      description:
        'Glass blasting surface treatment for suitable stainless steel components and fabricated surfaces.',
      image: '/images/gallery_assets/vertical_ducts_17.jpg',
      tag: 'Surface Texture',
      discipline: 'Stainless Steel Fabrication'
    },
    {
      id: 'ss-9',
      num: '09',
      name: 'Laser Cutting',
      description:
        'Laser cutting for stainless steel sheets and components based on required shapes and fabrication requirements.',
      image: '/images/hero_welding_fabrication.jpg',
      tag: 'CNC Laser',
      discipline: 'Stainless Steel Fabrication'
    }
  ];

  // 2. MS FABRICATION (8 Items)
  const MS_FABRICATION_SERVICES = [
    {
      id: 'ms-1',
      num: '01',
      name: 'Square Tube, Channel & I-Beam Fabrication',
      description:
        'Heavy-gauge MS square tube, structural channels and heavy I-beam structural welding and robust frame assemblies.',
      image: '/images/gallery_assets/structural_frame_02.jpg',
      tag: 'MS Structural',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-2',
      num: '02',
      name: 'MS Ducting Work',
      description:
        'Fabrication of robust mild steel ducting, exhaust channels and industrial manifold systems.',
      image: '/images/gallery_assets/sheetmetal_ducts_14.jpg',
      tag: 'MS Ducting',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-3',
      num: '03',
      name: 'MS Tank Fabrication',
      description:
        'Heavy-duty mild steel storage tanks, pressure vessels and reservoir fabrication designed to operational specs.',
      image: '/images/gallery_assets/enclosure_cabinet_22.jpg',
      tag: 'MS Tanks',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-4',
      num: '04',
      name: 'MS Pipeline Fabrication',
      description:
        'Mild steel pipeline spools and utility distribution lines fabricated with certified weld integrity.',
      image: '/images/service_fabrication.jpg',
      tag: 'MS Piping',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-5',
      num: '05',
      name: 'Powder Coating',
      description:
        'Durable protective powder coating in standard industrial shades for long-term corrosion resistance.',
      image: '/images/gallery_assets/industrial_frame_15.jpg',
      tag: 'Surface Coating',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-6',
      num: '06',
      name: 'Sand Blasting & Painting',
      description:
        'Abrasive sand blasting surface preparation followed by multi-coat industrial epoxy primer and paint application.',
      image: '/images/service_sandblasting_painting.jpg',
      tag: 'Abrasive Blasting',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-7',
      num: '07',
      name: 'MS 3rd Party NDT Facility',
      description:
        'Comprehensive 3rd-party non-destructive testing (NDT), ultrasonic and radiographic weld verification.',
      image: '/images/precision_metrology_datum.jpg',
      tag: 'Quality & NDT',
      discipline: 'Mild Steel Fabrication'
    },
    {
      id: 'ms-8',
      num: '08',
      name: 'Laser Cutting & Forming',
      description:
        'High-precision CNC sheet metal laser cutting, plate profiling and hydraulic press brake forming.',
      image: '/images/hero_cnc_precision.jpg',
      tag: 'CNC Cutting',
      discipline: 'Mild Steel Fabrication'
    }
  ];

  // 3. MACHINING SUB-SERVICES
  const MILLING_SUB_SERVICES = [
    {
      id: 'mill-1',
      num: '01',
      name: 'Plano Milling',
      description:
        'Plano milling for machining larger components and heavy structural bed surfaces according to application requirements.',
      image: '/images/gallery_assets/structural_frame_08.jpg',
      tag: 'Heavy Beds',
      discipline: 'Milling Capabilities'
    },
    {
      id: 'mill-2',
      num: '02',
      name: 'VMC Milling',
      description:
        'VMC milling for precision components requiring controlled multi-axis CNC machining operations.',
      image: '/images/hero_cnc_precision.jpg',
      tag: 'CNC 3D Contours',
      discipline: 'Milling Capabilities'
    },
    {
      id: 'mill-3',
      num: '03',
      name: 'Universal Milling',
      description:
        'Universal milling for conventional machining requirements involving slots, keyways, and component features.',
      image: '/images/about_workshop_indian.jpg',
      tag: 'Toolroom Milling',
      discipline: 'Milling Capabilities'
    }
  ];

  const GRINDING_SUB_SERVICES = [
    {
      id: 'grind-1',
      num: '01',
      name: 'Cylindrical Grinding',
      description:
        'Cylindrical grinding for suitable round components, precision spindles, and shaft-related finishing requirements.',
      image: '/images/gallery_assets/rotary_airlock_16.jpg',
      tag: 'OD/ID Grinding',
      discipline: 'Grinding & Finishing'
    },
    {
      id: 'grind-2',
      num: '02',
      name: 'Surface Grinding',
      description:
        'Surface grinding for suitable flat surfaces, plates, guideways, and component finishing to tight tolerances.',
      image: '/images/service_surface_grinding_precision.jpg',
      tag: 'Datum Faces',
      discipline: 'Grinding & Finishing'
    }
  ];

  // 4. CONVEYOR & MATERIAL HANDLING
  const CONVEYOR_ITEMS = [
    {
      id: 'conv-1',
      num: '01',
      name: 'Belt Conveyor',
      description:
        'Smooth and continuous part movement engineered for shopfloor line transit, assembly stations, and packaging operations.',
      image: '/images/gallery_products/02_pvc_belt_conveyor.png',
      tag: 'Transit Line',
      discipline: 'Conveyor Systems'
    },
    {
      id: 'conv-2',
      num: '02',
      name: 'Flat Conveyor',
      description:
        'Heavy-duty flat slat and modular conveyors tailored for stable mechanical component handling and accumulation.',
      image: '/images/service_conveyors.jpg',
      tag: 'Modular Systems',
      discipline: 'Conveyor Systems'
    },
    {
      id: 'conv-3',
      num: '03',
      name: 'Magnetic Conveyor',
      description:
        'Incline and horizontal magnetic chip and part conveyors for automated scrap collection and press tool lines.',
      image: '/images/gallery_products/02_z_magnetic_conveyor.png',
      tag: 'Chip Extraction',
      discipline: 'Conveyor Systems'
    },
    {
      id: 'mh-1',
      num: '04',
      name: 'Industrial Trolleys',
      description:
        'Ergonomic shopfloor transit trolleys, component carriers, and bin racks with heavy-duty caster systems.',
      image: '/images/service_trolleys.jpg',
      tag: 'Floor Transit',
      discipline: 'Material Handling'
    },
    {
      id: 'mh-2',
      num: '05',
      name: 'Industrial Pallets',
      description:
        'Heavy fabricated steel pallets and storage stillages engineered for safe high-density warehouse racking.',
      image: '/images/gallery_products/04_material_handling_trolley.png',
      tag: 'Storage Pallets',
      discipline: 'Material Handling'
    }
  ];

  // 5. JIGS & FIXTURES (5 Items)
  const JIGS_FIXTURES_SERVICES = [
    {
      id: 'jig-1',
      num: '01',
      name: 'Welding Jigs & Fixtures',
      description:
        'Rigid clamping and locating fixtures designed to eliminate weld distortion and ensure batch consistency.',
      image: '/images/gallery_assets/structural_frame_04.jpg',
      tag: 'Welding Tooling',
      discipline: 'Jigs & Fixtures'
    },
    {
      id: 'jig-2',
      num: '02',
      name: 'Machining Fixtures',
      description:
        'High-rigidity VMC and milling fixtures ensuring quick part changeovers and repeatable datum referencing.',
      image: '/images/service_jigs_fixtures.jpg',
      tag: 'VMC Tooling',
      discipline: 'Jigs & Fixtures'
    },
    {
      id: 'jig-3',
      num: '03',
      name: 'Assembly Fixtures',
      description:
        'Custom assembly fixtures facilitating ergonomic part insertion, mechanical fastening, and alignment.',
      image: '/images/gallery_products/01_fixture_making.png',
      tag: 'Assembly Line',
      discipline: 'Jigs & Fixtures'
    },
    {
      id: 'jig-4',
      num: '04',
      name: 'Inspection Fixtures',
      description:
        'Precision checking gauges and dial-indicator inspection fixtures for rapid quality assurance.',
      image: '/images/gallery_products/01_high_altitude_checking.png',
      tag: 'Inspection QA',
      discipline: 'Jigs & Fixtures'
    },
    {
      id: 'jig-5',
      num: '05',
      name: 'Custom Component Holding Fixtures',
      description:
        'Bespoke mechanical, pneumatic, or manual component clamping fixtures tailored to client part geometries.',
      image: '/images/about_cad_precision.png',
      tag: 'Clamping Tooling',
      discipline: 'Jigs & Fixtures'
    }
  ];

  // 6. SPECIAL PURPOSE MACHINES (6 Items)
  const SPM_SERVICES = [
    {
      id: 'spm-1',
      num: '01',
      name: 'Customized Special Purpose Machines',
      description:
        'Bespoke industrial machines designed around dedicated production steps, cycle times, and output targets.',
      image: '/images/service_custom_spm.jpg',
      tag: 'Turnkey SPM',
      discipline: 'Special Purpose Machines'
    },
    {
      id: 'spm-2',
      num: '02',
      name: 'Automated Production Machines',
      description:
        'Specialized automated machinery combining mechanical actuation, indexing, and process monitoring.',
      image: '/images/gallery_welding_spm.jpg',
      tag: 'Automated Cells',
      discipline: 'Special Purpose Machines'
    },
    {
      id: 'spm-3',
      num: '03',
      name: 'Material Handling & Transfer Mechanisms',
      description:
        'Automated pick-and-place transfer units, indexing turntables, and part orienting systems.',
      image: '/images/service_material_transfer_mechanisms.jpg',
      tag: 'Transfer Automation',
      discipline: 'Special Purpose Machines'
    },
    {
      id: 'spm-4',
      num: '04',
      name: 'Custom Machine Structures',
      description:
        'High-rigidity, vibration-dampened machine frames and gantry structures fabricated from stress-relieved steel.',
      image: '/images/gallery_assets/structural_frame_08.jpg',
      tag: 'Machine Bases',
      discipline: 'Special Purpose Machines'
    },
    {
      id: 'spm-5',
      num: '05',
      name: 'Component Positioning & Clamping Systems',
      description:
        'Integrated multi-axis pneumatic and hydraulic clamping units built into automated production cells.',
      image: '/images/gallery_products/04_pneumatic_lifting_tackle.png',
      tag: 'Clamping Systems',
      discipline: 'Special Purpose Machines'
    },
    {
      id: 'spm-6',
      num: '06',
      name: 'Application-Specific Automation Solutions',
      description:
        'Dedicated custom automation setups developed to resolve bottlenecks in specialized manufacturing processes.',
      image: '/images/service_custom_machines_spm.jpg',
      tag: 'Custom Engineering',
      discipline: 'Special Purpose Machines'
    }
  ];

  // Reusable visual capability card with direct INQUIRE NOW action
  const renderEditorialCard = (item) => (
    <div
      key={item.id}
      className="split-editorial-card"
      onClick={() => setSelectedDetailModal(item)}
    >
      <div className="split-card-media">
        <img
          src={item.image}
          alt={item.name}
          className="split-card-img"
          loading="lazy"
        />
        {item.tag && <span className="split-card-tag">{item.tag}</span>}
      </div>

      <div className="split-card-meta">
        <div className="split-card-meta-left">
          <span className="split-card-num">{item.num}</span>
          <h5 className="split-card-title">{item.name}</h5>
          {item.description && (
            <p className="split-card-desc">{item.description}</p>
          )}
        </div>

        {/* Direct Inquire Now CTA */}
        <div className="split-card-action-bar">
          <Link
            to={getInquiryUrl(item.name)}
            state={{ service: item.name }}
            onClick={(e) => e.stopPropagation()}
            className="split-card-inquire-link"
          >
            <span>INQUIRE NOW</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // RENDER RIGHT CONTENT AREA
  // =========================================================================
  const renderRightContentArea = () => {
    // -------------------------------------------------------------
    // 01 — INDUSTRIAL FABRICATION
    // -------------------------------------------------------------
    if (selectedMain === '01') {
      const isSS = selectedSub === 'ss';
      const isMS = selectedSub === 'ms';

      // 1A. SS FABRICATION DIRECT VIEW
      if (isSS) {
        return (
          <div className="split-right-view">
            <div className="split-hero-banner">
              <div className="split-hero-overlay" />
              <img
                src="/images/service_industrial_fabrication.jpg"
                alt="Stainless Steel Fabrication"
                className="split-hero-bg-img"
              />
              <div className="split-hero-content">
                <span className="split-eyebrow-tag">01.A — STAINLESS STEEL FABRICATION</span>
                <h2 className="split-hero-title">STAINLESS STEEL FABRICATION</h2>
                <p className="split-hero-desc">
                  We work with standard grades of stainless steel for fabrication requirements across multiple industrial applications, including pharmaceutical, chemical, oil &amp; gas and other process industries.
                </p>

                <div className="split-hero-inquire-wrap">
                  <Link
                    to={getInquiryUrl('SS Fabrication')}
                    state={{ service: 'SS Fabrication' }}
                    className="split-hero-inquire-btn"
                  >
                    <span>INQUIRE FOR SS FABRICATION</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="split-capabilities-section">
              <div className="split-section-header">
                <div>
                  <span className="split-sub-tag">STAINLESS STEEL DISCIPLINES</span>
                  <h3 className="split-section-title">SS Fabrication Capabilities</h3>
                </div>
                <span className="split-count-badge">9 Services</span>
              </div>

              <div className="split-cards-grid">
                {SS_FABRICATION_SERVICES.map((s) => renderEditorialCard(s))}
              </div>
            </div>
          </div>
        );
      }

      // 1B. MS FABRICATION DIRECT VIEW
      if (isMS) {
        return (
          <div className="split-right-view">
            <div className="split-hero-banner">
              <div className="split-hero-overlay" />
              <img
                src="/images/service_fabrication.jpg"
                alt="Mild Steel Fabrication"
                className="split-hero-bg-img"
              />
              <div className="split-hero-content">
                <span className="split-eyebrow-tag">01.B — MILD STEEL FABRICATION</span>
                <h2 className="split-hero-title">MILD STEEL FABRICATION</h2>
                <p className="split-hero-desc">
                  Heavy-duty mild steel structural fabrication with precision welding, surface finishing, sand blasting, powder coating and third-party inspection compliance.
                </p>

                <div className="split-hero-inquire-wrap">
                  <Link
                    to={getInquiryUrl('MS Fabrication')}
                    state={{ service: 'MS Fabrication' }}
                    className="split-hero-inquire-btn"
                  >
                    <span>INQUIRE FOR MS FABRICATION</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="split-capabilities-section">
              <div className="split-section-header">
                <div>
                  <span className="split-sub-tag">MILD STEEL DISCIPLINES</span>
                  <h3 className="split-section-title">MS Fabrication Capabilities</h3>
                </div>
                <span className="split-count-badge">8 Services</span>
              </div>

              <div className="split-cards-grid">
                {MS_FABRICATION_SERVICES.map((s) => renderEditorialCard(s))}
              </div>
            </div>
          </div>
        );
      }

      // 1C. INDUSTRIAL FABRICATION MAIN VIEW (DIRECTLY SHOWS BOTH SS & MS CONTENT)
      return (
        <div className="split-right-view">
          <div className="split-hero-banner">
            <div className="split-hero-overlay" />
            <img
              src="/images/service_industrial_fabrication.jpg"
              alt="Industrial Fabrication"
              className="split-hero-bg-img"
            />
            <div className="split-hero-content">
              <span className="split-eyebrow-tag">01. INDUSTRIAL FABRICATION</span>
              <h2 className="split-hero-title">INDUSTRIAL FABRICATION</h2>
              <p className="split-hero-desc">
                We provide fabrication solutions in stainless steel and mild steel for a wide range of industrial applications, with a focus on quality workmanship, durability and practical fabrication requirements.
              </p>

              <div className="split-hero-inquire-wrap">
                <Link
                  to={getInquiryUrl('Industrial Fabrication')}
                  state={{ service: 'Industrial Fabrication' }}
                  className="split-hero-inquire-btn"
                >
                  <span>INQUIRE FOR INDUSTRIAL FABRICATION</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* SS Fabrication Section */}
          <div className="split-capabilities-section">
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">01.A — STAINLESS STEEL</span>
                <h3 className="split-section-title">SS Fabrication</h3>
              </div>
              <span className="split-count-badge">9 Services</span>
            </div>

            <div className="split-cards-grid">
              {SS_FABRICATION_SERVICES.map((s) => renderEditorialCard(s))}
            </div>
          </div>

          {/* MS Fabrication Section */}
          <div className="split-capabilities-section" style={{ marginTop: '28px' }}>
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">01.B — MILD STEEL</span>
                <h3 className="split-section-title">MS Fabrication</h3>
              </div>
              <span className="split-count-badge">8 Services</span>
            </div>

            <div className="split-cards-grid">
              {MS_FABRICATION_SERVICES.map((s) => renderEditorialCard(s))}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 02 — MACHINING
    // -------------------------------------------------------------
    if (selectedMain === '02') {
      const isMilling = selectedSub === 'milling';
      const isGrinding = selectedSub === 'grinding';

      // 2A. MILLING DIRECT VIEW
      if (isMilling) {
        return (
          <div className="split-right-view">
            <div className="split-hero-banner">
              <div className="split-hero-overlay" />
              <img
                src="/images/hero_cnc_precision.jpg"
                alt="Milling Capabilities"
                className="split-hero-bg-img"
              />
              <div className="split-hero-content">
                <span className="split-eyebrow-tag">02.A — MILLING PROCESSES</span>
                <h2 className="split-hero-title">MILLING</h2>
                <p className="split-hero-desc">
                  Machining operations covering Plano Milling, VMC Milling and Universal Milling requirements for high-precision components.
                </p>

                <div className="split-hero-inquire-wrap">
                  <Link
                    to={getInquiryUrl('Milling')}
                    state={{ service: 'Milling' }}
                    className="split-hero-inquire-btn"
                  >
                    <span>INQUIRE FOR MILLING</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="split-capabilities-section">
              <div className="split-section-header">
                <div>
                  <span className="split-sub-tag">CNC &amp; CONVENTIONAL MILLING</span>
                  <h3 className="split-section-title">Milling Capabilities</h3>
                </div>
                <span className="split-count-badge">3 Subtypes</span>
              </div>
              <div className="split-cards-grid">
                {MILLING_SUB_SERVICES.map((m) => renderEditorialCard(m))}
              </div>
            </div>
          </div>
        );
      }

      // 2B. GRINDING DIRECT VIEW
      if (isGrinding) {
        return (
          <div className="split-right-view">
            <div className="split-hero-banner">
              <div className="split-hero-overlay" />
              <img
                src="/images/service_surface_grinding_precision.jpg"
                alt="Grinding & Finishing"
                className="split-hero-bg-img"
              />
              <div className="split-hero-content">
                <span className="split-eyebrow-tag">02.B — FINISHING PROCESSES</span>
                <h2 className="split-hero-title">GRINDING &amp; FINISHING</h2>
                <p className="split-hero-desc">
                  Finishing and grinding operations for components requiring surface and dimensional finishing to tight tolerances.
                </p>

                <div className="split-hero-inquire-wrap">
                  <Link
                    to={getInquiryUrl('Grinding & Finishing')}
                    state={{ service: 'Grinding & Finishing' }}
                    className="split-hero-inquire-btn"
                  >
                    <span>INQUIRE FOR GRINDING &amp; FINISHING</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="split-capabilities-section">
              <div className="split-section-header">
                <div>
                  <span className="split-sub-tag">PRECISION FINISHING</span>
                  <h3 className="split-section-title">Grinding Subtypes</h3>
                </div>
                <span className="split-count-badge">2 Subtypes</span>
              </div>
              <div className="split-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {GRINDING_SUB_SERVICES.map((g) => renderEditorialCard(g))}
              </div>
            </div>
          </div>
        );
      }

      // 2C. MACHINING MAIN VIEW (COMPLETE CAPABILITIES ON RIGHT SIDE)
      return (
        <div className="split-right-view">
          <div className="split-hero-banner">
            <div className="split-hero-overlay" />
            <img
              src="/images/hero_cnc_precision.jpg"
              alt="Precision Machining"
              className="split-hero-bg-img"
            />
            <div className="split-hero-content">
              <span className="split-eyebrow-tag">02. PRECISION MACHINING</span>
              <h2 className="split-hero-title">MACHINING</h2>
              <p className="split-hero-desc">
                Machining capabilities covering cutting, milling, drilling, turning, forming and finishing requirements for industrial components.
              </p>

              <div className="split-hero-inquire-wrap">
                <Link
                  to={getInquiryUrl('Precision Machining')}
                  state={{ service: 'Precision Machining' }}
                  className="split-hero-inquire-btn"
                >
                  <span>INQUIRE FOR MACHINING</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="split-machining-composite-flow">
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">MACHINING DISCIPLINE</span>
                <h3 className="split-section-title">Machining Services</h3>
              </div>
              <span className="split-count-badge">8 Disciplines</span>
            </div>

            {/* 01. Laser Cutting */}
            <div className="split-cards-grid" style={{ marginBottom: '16px' }}>
              {renderEditorialCard({
                id: 'mach-laser',
                num: '01',
                name: 'Laser Cutting',
                description: 'High-precision 2D CNC laser profiling for mild steel, stainless steel, and aluminum plates with clean edge finish.',
                image: '/images/hero_welding_fabrication.jpg',
                tag: 'CNC Laser',
                discipline: 'Precision Machining'
              })}
            </div>

            {/* 02. Milling (Nested Sub-Services Box) */}
            <div className="split-nested-sub-container">
              <div className="nested-sub-header">
                <div className="nested-sub-header-title">
                  <span className="nested-sub-num">02</span>
                  <div>
                    <h4 className="nested-title">Milling</h4>
                    <p className="nested-desc">Plano Milling • VMC Milling • Universal Milling</p>
                  </div>
                </div>
                <Link
                  to={getInquiryUrl('Milling')}
                  state={{ service: 'Milling' }}
                  className="nested-sub-inquire-btn"
                >
                  <span>Inquire for Milling</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
              <div className="split-cards-grid">
                {MILLING_SUB_SERVICES.map((m) => renderEditorialCard(m))}
              </div>
            </div>

            {/* 03-07. Simple Services (Drilling, Turning, Jig-Fixture, Tool-Room, Forming) */}
            <div className="split-cards-grid" style={{ margin: '16px 0' }}>
              {renderEditorialCard({
                id: 'mach-drilling',
                num: '03',
                name: 'Drilling',
                description: 'Radial and multi-spindle drilling, tapping, counterboring, and precision reaming for accurate hole patterns.',
                image: '/images/service_custom_machines_spm.jpg',
                tag: 'Drilling',
                discipline: 'Precision Machining'
              })}

              {renderEditorialCard({
                id: 'mach-turning',
                num: '04',
                name: 'Turning',
                description: 'Precision lathe turning, facing, threading, and boring for cylindrical pins, shafts, rollers, and flanges.',
                image: '/images/gallery_assets/rotary_airlock_16.jpg',
                tag: 'Lathe Turning',
                discipline: 'Precision Machining'
              })}

              {renderEditorialCard({
                id: 'mach-jig-fixture',
                num: '05',
                name: 'Jig-Fixture Work',
                description: 'Specialized toolroom machining of locating pins, clamp plates, and guide blocks to strict dimensional tolerances.',
                image: '/images/service_jigs_fixtures.jpg',
                tag: 'Toolroom Tooling',
                discipline: 'Precision Machining'
              })}

              {renderEditorialCard({
                id: 'mach-toolroom',
                num: '06',
                name: 'Tool-Room Work',
                description: 'Custom precision tooling, die repair, gauge fabrication, and precision one-off prototype development.',
                image: '/images/about_workshop_indian.jpg',
                tag: 'Prototype Tooling',
                discipline: 'Precision Machining'
              })}

              {renderEditorialCard({
                id: 'mach-forming',
                num: '07',
                name: 'Forming',
                description: 'Heavy hydraulic pressing, sheet metal bending, and section forming to specified radius profiles.',
                image: '/images/gallery_products/05_hydraulic_press_structure.png',
                tag: 'Press Forming',
                discipline: 'Precision Machining'
              })}
            </div>

            {/* 08. Grinding & Finishing (Nested Sub-Services Box) */}
            <div className="split-nested-sub-container">
              <div className="nested-sub-header">
                <div className="nested-sub-header-title">
                  <span className="nested-sub-num">08</span>
                  <div>
                    <h4 className="nested-title">Grinding &amp; Finishing</h4>
                    <p className="nested-desc">Cylindrical Grinding • Surface Grinding</p>
                  </div>
                </div>
                <Link
                  to={getInquiryUrl('Grinding & Finishing')}
                  state={{ service: 'Grinding & Finishing' }}
                  className="nested-sub-inquire-btn"
                >
                  <span>Inquire for Grinding</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
              <div className="split-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {GRINDING_SUB_SERVICES.map((g) => renderEditorialCard(g))}
              </div>
            </div>

          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 03 — CONVEYOR & MATERIAL HANDLING
    // -------------------------------------------------------------
    if (selectedMain === '03') {
      return (
        <div className="split-right-view">
          <div className="split-hero-banner">
            <div className="split-hero-overlay" />
            <img
              src="/images/service_conveyors.jpg"
              alt="Conveyor & Material Handling"
              className="split-hero-bg-img"
            />
            <div className="split-hero-content">
              <span className="split-eyebrow-tag">03. MATERIAL MOVEMENT</span>
              <h2 className="split-hero-title">CONVEYOR &amp; MATERIAL HANDLING</h2>
              <p className="split-hero-desc">
                Solutions for conveying and handling industrial materials according to application and operational requirements.
              </p>

              <div className="split-hero-inquire-wrap">
                <Link
                  to={getInquiryUrl('Conveyor & Material Handling')}
                  state={{ service: 'Conveyor & Material Handling' }}
                  className="split-hero-inquire-btn"
                >
                  <span>INQUIRE FOR CONVEYORS &amp; HANDLING</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="split-capabilities-section">
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">TRANSIT NETWORKS &amp; SHOPFLOOR HANDLING</span>
                <h3 className="split-section-title">Conveyor &amp; Material Handling Equipment</h3>
              </div>
              <span className="split-count-badge">5 Solutions</span>
            </div>
            <div className="split-cards-grid">
              {CONVEYOR_ITEMS.map((c) => renderEditorialCard(c))}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 04 — JIGS & FIXTURES
    // -------------------------------------------------------------
    if (selectedMain === '04') {
      return (
        <div className="split-right-view">
          <div className="split-hero-banner">
            <div className="split-hero-overlay" />
            <img
              src="/images/service_jigs_fixtures.jpg"
              alt="Jigs & Fixtures"
              className="split-hero-bg-img"
            />
            <div className="split-hero-content">
              <span className="split-eyebrow-tag">04. TOOLING &amp; FIXTURES</span>
              <h2 className="split-hero-title">JIGS &amp; FIXTURES</h2>
              <p className="split-hero-desc">
                We design and fabricate application-specific jigs and fixtures to support accurate, repeatable and efficient manufacturing operations. Our solutions are developed according to component geometry, production requirements and assembly needs, helping improve positioning, clamping and process consistency.
              </p>

              <div className="split-hero-inquire-wrap">
                <Link
                  to={getInquiryUrl('Jigs & Fixtures')}
                  state={{ service: 'Jigs & Fixtures' }}
                  className="split-hero-inquire-btn"
                >
                  <span>INQUIRE FOR JIGS &amp; FIXTURES</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="split-capabilities-section">
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">APPLICATION-SPECIFIC TOOLING</span>
                <h3 className="split-section-title">Dedicated Fixtures</h3>
              </div>
              <span className="split-count-badge">5 Fixtures</span>
            </div>
            <div className="split-cards-grid">
              {JIGS_FIXTURES_SERVICES.map((j) => renderEditorialCard(j))}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 05 — SPECIAL PURPOSE MACHINES (SPM)
    // -------------------------------------------------------------
    if (selectedMain === '05') {
      return (
        <div className="split-right-view">
          <div className="split-hero-banner">
            <div className="split-hero-overlay" />
            <img
              src="/images/service_custom_spm.jpg"
              alt="Special Purpose Machines"
              className="split-hero-bg-img"
            />
            <div className="split-hero-content">
              <span className="split-eyebrow-tag">05. CUSTOM AUTOMATION</span>
              <h2 className="split-hero-title">SPECIAL PURPOSE MACHINES</h2>
              <p className="split-hero-desc">
                We develop customized Special Purpose Machines (SPMs) designed for specific industrial operations and production requirements. Our approach combines mechanical fabrication, component integration and application-focused engineering to deliver machines tailored to individual processes.
              </p>

              <div className="split-hero-inquire-wrap">
                <Link
                  to={getInquiryUrl('Special Purpose Machines (SPM)')}
                  state={{ service: 'Special Purpose Machines (SPM)' }}
                  className="split-hero-inquire-btn"
                >
                  <span>INQUIRE FOR SPECIAL PURPOSE MACHINES</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="split-capabilities-section">
            <div className="split-section-header">
              <div>
                <span className="split-sub-tag">TURNKEY AUTOMATION</span>
                <h3 className="split-section-title">SPM Capabilities</h3>
              </div>
              <span className="split-count-badge">6 Capabilities</span>
            </div>
            <div className="split-cards-grid">
              {SPM_SERVICES.map((s) => renderEditorialCard(s))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="services-page-root">
      
      {/* ========================================================================= */}
      {/* 1. SERVICES HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="services-hero-top">
        <div className="services-hero-overlay" />

        <div className="services-full-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="services-hero-inner">
            <div className="services-hero-badge-row">
              <span className="services-hero-badge">SERVICES</span>
              <span className="services-hero-badge-line" />
            </div>

            <h1 className="services-hero-title">
              ENGINEERING &amp; MANUFACTURING
              <br />
              <span className="services-hero-accent">CAPABILITIES</span>
            </h1>

            <p className="services-hero-text">
              Mauli Krupa Precision Works provides industrial fabrication, machining, material handling, jigs &amp; fixtures and special-purpose machine capabilities.
            </p>

            <div className="services-hero-action-row">
              <Link to="/contact" className="services-hero-btn">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FULL-WIDTH TWO-COLUMN SERVICES CATALOGUE (DESKTOP)                     */}
      {/* ========================================================================= */}
      <section className="services-catalogue-section">
        <div className="services-full-container">
          
          <div className="services-catalogue-layout">
            
            {/* =================================================================== */}
            {/* LEFT SIDEBAR: 25–28% CLEAN & REFINED SERVICE NAVIGATION             */}
            {/* =================================================================== */}
            <aside className="services-catalogue-sidebar">
              <div className="sidebar-sticky-wrapper">
                <div className="sidebar-tree-header">
                  <span className="sidebar-tree-eyebrow">CAPABILITY INDEX</span>
                  <h3 className="sidebar-tree-heading">Our Services</h3>
                </div>

                <div className="sidebar-tree-nav">
                  
                  {/* ---------------- 01 INDUSTRIAL FABRICATION ---------------- */}
                  <div className={`nav-tree-item ${selectedMain === '01' ? 'is-active-main' : ''}`}>
                    <div
                      className="nav-tree-header"
                      onClick={() => selectMainCategory('01')}
                    >
                      <div className="nav-tree-header-left">
                        <span className="nav-tree-num">01</span>
                        <Factory size={16} className="nav-tree-icon" />
                        <span className="nav-tree-label">Industrial Fabrication</span>
                      </div>
                      <div className="nav-tree-chevron">
                        {openMainTree['01'] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                      </div>
                    </div>

                    {/* ONLY SHOW SS FABRICATION & MS FABRICATION */}
                    {openMainTree['01'] && (
                      <div className="nav-tree-sub-container">
                        <div
                          className={`nav-sub-leaf ${selectedMain === '01' && selectedSub === 'ss' ? 'active-leaf' : ''}`}
                          onClick={() => selectSubCategory('ss', '01')}
                        >
                          <span className="sub-bullet" />
                          <span className="sub-text">SS Fabrication</span>
                          <ChevronRight size={13} className="sub-arrow" />
                        </div>

                        <div
                          className={`nav-sub-leaf ${selectedMain === '01' && selectedSub === 'ms' ? 'active-leaf' : ''}`}
                          onClick={() => selectSubCategory('ms', '01')}
                        >
                          <span className="sub-bullet" />
                          <span className="sub-text">MS Fabrication</span>
                          <ChevronRight size={13} className="sub-arrow" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ---------------- 02 MACHINING ---------------- */}
                  <div className={`nav-tree-item ${selectedMain === '02' ? 'is-active-main' : ''}`}>
                    <div
                      className="nav-tree-header"
                      onClick={() => selectMainCategory('02')}
                    >
                      <div className="nav-tree-header-left">
                        <span className="nav-tree-num">02</span>
                        <Cog size={16} className="nav-tree-icon" />
                        <span className="nav-tree-label">Machining</span>
                      </div>
                      <div className="nav-tree-chevron">
                        {openMainTree['02'] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                      </div>
                    </div>

                    {/* ONLY SHOW MEANINGFUL MACHINING CATEGORIES */}
                    {openMainTree['02'] && (
                      <div className="nav-tree-sub-container">
                        {/* Milling */}
                        <div className="nav-nested-group">
                          <div
                            className={`nav-sub-leaf ${selectedMain === '02' && selectedSub === 'milling' ? 'active-leaf' : ''}`}
                            onClick={() => {
                              selectSubCategory('milling', '02');
                              toggleSubTree('milling');
                            }}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-text">Milling</span>
                            {openSubTree.milling ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </div>

                          {openSubTree.milling && (
                            <div className="nav-inner-leaf-box">
                              <div className="nav-inner-leaf" onClick={() => selectSubCategory('milling', '02')}>
                                Plano Milling
                              </div>
                              <div className="nav-inner-leaf" onClick={() => selectSubCategory('milling', '02')}>
                                VMC Milling
                              </div>
                              <div className="nav-inner-leaf" onClick={() => selectSubCategory('milling', '02')}>
                                Universal Milling
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="nav-sub-leaf simple" onClick={() => selectMainCategory('02')}>
                          <span className="sub-bullet" />
                          <span className="sub-text">Drilling</span>
                        </div>

                        <div className="nav-sub-leaf simple" onClick={() => selectMainCategory('02')}>
                          <span className="sub-bullet" />
                          <span className="sub-text">Turning</span>
                        </div>

                        <div className="nav-sub-leaf simple" onClick={() => selectMainCategory('02')}>
                          <span className="sub-bullet" />
                          <span className="sub-text">Jig-Fixture Work</span>
                        </div>

                        <div className="nav-sub-leaf simple" onClick={() => selectMainCategory('02')}>
                          <span className="sub-bullet" />
                          <span className="sub-text">Tool-Room Work</span>
                        </div>

                        <div className="nav-sub-leaf simple" onClick={() => selectMainCategory('02')}>
                          <span className="sub-bullet" />
                          <span className="sub-text">Forming</span>
                        </div>

                        {/* Grinding & Finishing */}
                        <div className="nav-nested-group">
                          <div
                            className={`nav-sub-leaf ${selectedMain === '02' && selectedSub === 'grinding' ? 'active-leaf' : ''}`}
                            onClick={() => {
                              selectSubCategory('grinding', '02');
                              toggleSubTree('grinding');
                            }}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-text">Grinding &amp; Finishing</span>
                            {openSubTree.grinding ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </div>

                          {openSubTree.grinding && (
                            <div className="nav-inner-leaf-box">
                              <div className="nav-inner-leaf" onClick={() => selectSubCategory('grinding', '02')}>
                                Cylindrical Grinding
                              </div>
                              <div className="nav-inner-leaf" onClick={() => selectSubCategory('grinding', '02')}>
                                Surface Grinding
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* ---------------- 03 CONVEYOR & MATERIAL HANDLING ---------------- */}
                  <div className={`nav-tree-item ${selectedMain === '03' ? 'is-active-main' : ''}`}>
                    <div
                      className="nav-tree-header"
                      onClick={() => selectMainCategory('03')}
                    >
                      <div className="nav-tree-header-left">
                        <span className="nav-tree-num">03</span>
                        <Boxes size={16} className="nav-tree-icon" />
                        <span className="nav-tree-label">Conveyor &amp; Material Handling</span>
                      </div>
                      <div className="nav-tree-chevron">
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* ---------------- 04 JIGS & FIXTURES ---------------- */}
                  <div className={`nav-tree-item ${selectedMain === '04' ? 'is-active-main' : ''}`}>
                    <div
                      className="nav-tree-header"
                      onClick={() => selectMainCategory('04')}
                    >
                      <div className="nav-tree-header-left">
                        <span className="nav-tree-num">04</span>
                        <Crosshair size={16} className="nav-tree-icon" />
                        <span className="nav-tree-label">Jigs &amp; Fixtures</span>
                      </div>
                      <div className="nav-tree-chevron">
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* ---------------- 05 SPECIAL PURPOSE MACHINES ---------------- */}
                  <div className={`nav-tree-item ${selectedMain === '05' ? 'is-active-main' : ''}`}>
                    <div
                      className="nav-tree-header"
                      onClick={() => selectMainCategory('05')}
                    >
                      <div className="nav-tree-header-left">
                        <span className="nav-tree-num">05</span>
                        <Cpu size={16} className="nav-tree-icon" />
                        <span className="nav-tree-label">Special Purpose Machines</span>
                      </div>
                      <div className="nav-tree-chevron">
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Compact Sidebar Support Box */}
                <div className="sidebar-support-box">
                  <div className="support-box-icon">
                    <Headphones size={18} color="#800e13" />
                  </div>
                  <div>
                    <h5 className="support-box-heading">Custom Requirement?</h5>
                    <p className="support-box-desc">Share CAD or technical specs.</p>
                    <Link to="/contact" className="support-box-link">
                      <span>Contact Us</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>

              </div>
            </aside>

            {/* =================================================================== */}
            {/* RIGHT COLUMN: 72–75% FULL-WIDTH RICH CONTENT                        */}
            {/* =================================================================== */}
            <main className="services-catalogue-content">
              {renderRightContentArea()}
            </main>

          </div>

          {/* =================================================================== */}
          {/* MOBILE ACCORDION (FALLBACK FOR VIEWPORTS < 900PX)                   */}
          {/* =================================================================== */}
          <div className="services-mobile-accordion">
            {['01', '02', '03', '04', '05'].map((mId) => {
              const isOpen = mobileExpandedMain === mId;
              const titleMap = {
                '01': '01 Industrial Fabrication',
                '02': '02 Machining',
                '03': '03 Conveyor & Material Handling',
                '04': '04 Jigs & Fixtures',
                '05': '05 Special Purpose Machines'
              };

              return (
                <div key={mId} className={`mobile-nav-block ${isOpen ? 'is-open' : ''}`}>
                  <div
                    className="mobile-nav-block-header"
                    onClick={() => {
                      setMobileExpandedMain(isOpen ? null : mId);
                      setSelectedMain(mId);
                      setSelectedSub(null);
                    }}
                  >
                    <h4 className="mobile-nav-title">{titleMap[mId]}</h4>
                    <div className="mobile-nav-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mobile-nav-block-body">
                      {renderRightContentArea()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BOTTOM COMPACT INDUSTRIAL CTA BANNER                                   */}
      {/* ========================================================================= */}
      <section className="services-bottom-cta">
        <div className="bottom-cta-overlay" />
        
        <div className="services-full-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="bottom-cta-inner">
            <div className="bottom-cta-copy">
              <span className="bottom-cta-eyebrow">HAVE A SPECIFIC REQUIREMENT?</span>
              <h2 className="bottom-cta-heading">Let's discuss your fabrication, machining or custom engineering requirement.</h2>
            </div>

            <div className="bottom-cta-action">
              <Link to="/contact" className="bottom-cta-button">
                <span>INQUIRE NOW</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM TRUST BAR                                                       */}
      {/* ========================================================================= */}
      <section className="services-trust-bar">
        <div className="services-full-container">
          <div className="trust-bar-flex">
            <div className="trust-item">
              <ShieldCheck size={18} color="#800e13" />
              <span>Quality Workmanship</span>
            </div>
            <div className="trust-divider" />

            <div className="trust-item">
              <Clock size={18} color="#800e13" />
              <span>On-Time Delivery</span>
            </div>
            <div className="trust-divider" />

            <div className="trust-item">
              <Settings size={18} color="#800e13" />
              <span>Custom Solutions</span>
            </div>
            <div className="trust-divider" />

            <div className="trust-item">
              <ThumbsUp size={18} color="#800e13" />
              <span>Trusted by Industries</span>
            </div>

            <div className="trust-tagline">
              <span>Precision • Reliability • Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICE DETAIL MODAL                                                   */}
      {/* ========================================================================= */}
      {selectedDetailModal && (
        <div className="service-modal-backdrop" onClick={() => setSelectedDetailModal(null)}>
          <div className="service-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="service-modal-close"
              onClick={() => setSelectedDetailModal(null)}
              aria-label="Close modal"
            >
              <X size={18} color="#111827" />
            </button>

            <div className="service-modal-grid">
              <div className="service-modal-media">
                <img
                  src={selectedDetailModal.image}
                  alt={selectedDetailModal.name}
                  className="service-modal-img"
                />
                <span className="service-modal-badge">{selectedDetailModal.tag}</span>
              </div>

              <div className="service-modal-body">
                <span className="service-modal-discipline">{selectedDetailModal.discipline}</span>
                <h3 className="service-modal-title">{selectedDetailModal.name}</h3>
                <p className="service-modal-text">{selectedDetailModal.description}</p>

                <div className="service-modal-actions">
                  <Link
                    to={getInquiryUrl(selectedDetailModal.name)}
                    state={{ service: selectedDetailModal.name }}
                    className="service-modal-inquire-btn"
                    onClick={() => setSelectedDetailModal(null)}
                  >
                    <span>INQUIRE NOW</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STYLES (FULL-WIDTH, HIGH UTILIZATION, NO EXCESSIVE MARGINS)               */}
      {/* ========================================================================= */}
      <style>{`
        .services-page-root {
          background-color: #ffffff;
          color: #111827;
          min-height: 100vh;
        }

        /* FULL-WIDTH CONTAINER UTILIZATION */
        .services-full-container {
          width: 100%;
          max-width: 1720px;
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(16px, 2.5vw, 36px);
          padding-right: clamp(16px, 2.5vw, 36px);
        }

        /* 1. HERO SECTION */
        .services-hero-top {
          position: relative;
          padding-top: clamp(96px, 10vw, 126px);
          padding-bottom: clamp(36px, 4.5vw, 54px);
          background-image: url('/images/hero_welding_fabrication.jpg');
          background-size: cover;
          background-position: center 35%;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .services-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 11, 18, 0.95) 0%, rgba(15, 23, 42, 0.88) 100%);
          pointer-events: none;
        }

        .services-hero-inner {
          max-width: 880px;
          position: relative;
          z-index: 2;
        }

        .services-hero-badge-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .services-hero-badge {
          font-family: var(--font-tech);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #f1f5f9;
          text-transform: uppercase;
        }

        .services-hero-badge-line {
          width: 28px;
          height: 2px;
          background-color: #800e13;
          border-radius: 1px;
        }

        .services-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(30px, 3.8vw, 48px);
          font-weight: 800;
          line-height: 1.14;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0 0 12px 0;
        }

        .services-hero-accent {
          color: #e03137;
        }

        .services-hero-text {
          font-size: clamp(14px, 1.1vw, 15.5px);
          line-height: 1.55;
          color: #cbd5e1;
          margin: 0 0 20px 0;
          max-width: 680px;
        }

        .services-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background-color: #800e13;
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(128, 14, 19, 0.35);
        }

        .services-hero-btn:hover {
          background-color: #670b10;
          transform: translateY(-2px);
          color: #ffffff;
        }

        /* 2. CATALOGUE SECTION & FULL-WIDTH 2-COLUMN LAYOUT */
        .services-catalogue-section {
          padding: 28px 0 54px;
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .services-catalogue-layout {
          display: grid;
          grid-template-columns: minmax(260px, 26%) 1fr;
          gap: 28px;
          align-items: start;
        }

        /* SIDEBAR STYLES */
        .services-catalogue-sidebar {
          position: sticky;
          top: 90px;
        }

        .sidebar-sticky-wrapper {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .sidebar-tree-header {
          padding: 14px 16px 10px;
          background-color: #0f172a;
          border-bottom: 3px solid #800e13;
        }

        .sidebar-tree-eyebrow {
          font-family: var(--font-tech);
          font-size: 9.5px;
          font-weight: 700;
          color: #e03137;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }

        .sidebar-tree-heading {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .sidebar-tree-nav {
          display: flex;
          flex-direction: column;
        }

        .nav-tree-item {
          border-bottom: 1px solid #f1f5f9;
        }

        .nav-tree-item:last-child {
          border-bottom: none;
        }

        .nav-tree-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          cursor: pointer;
          background-color: #ffffff;
          transition: background-color 0.15s ease;
        }

        .nav-tree-header:hover {
          background-color: #f8fafc;
        }

        .nav-tree-item.is-active-main > .nav-tree-header {
          background-color: #fff8f8;
          border-left: 3.5px solid #800e13;
        }

        .nav-tree-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .nav-tree-num {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 800;
          color: #800e13;
        }

        .nav-tree-icon {
          color: #64748b;
        }

        .nav-tree-item.is-active-main .nav-tree-icon {
          color: #800e13;
        }

        .nav-tree-label {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: #111827;
        }

        .nav-tree-item.is-active-main .nav-tree-label {
          color: #800e13;
        }

        .nav-tree-chevron {
          color: #94a3b8;
        }

        /* Sub-Level Sidebar Items */
        .nav-tree-sub-container {
          background-color: #fafbfc;
          padding: 4px 8px 6px 14px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-sub-leaf {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
        }

        .nav-sub-leaf:hover {
          background-color: #f1f5f9;
          color: #800e13;
        }

        .nav-sub-leaf.active-leaf {
          background-color: #fff1f1;
          color: #800e13;
          font-weight: 700;
        }

        .nav-sub-leaf .sub-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #cbd5e1;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .nav-sub-leaf.active-leaf .sub-bullet {
          background-color: #800e13;
        }

        .nav-sub-leaf .sub-text {
          flex: 1;
        }

        .nav-sub-leaf .sub-arrow {
          color: #94a3b8;
        }

        .nav-sub-leaf.simple {
          justify-content: flex-start;
        }

        .nav-inner-leaf-box {
          padding-left: 18px;
          margin: 2px 0 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-inner-leaf {
          padding: 3px 6px;
          font-size: 11px;
          color: #64748b;
          cursor: pointer;
          border-radius: 2px;
        }

        .nav-inner-leaf:hover {
          color: #800e13;
          background-color: #fff1f1;
        }

        /* Sidebar Support Box */
        .sidebar-support-box {
          margin: 10px;
          padding: 10px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 3px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .support-box-icon {
          width: 28px;
          height: 28px;
          border-radius: 3px;
          background-color: #fff1f1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .support-box-heading {
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 1px 0;
        }

        .support-box-desc {
          font-size: 10px;
          color: #64748b;
          margin: 0 0 3px 0;
        }

        .support-box-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-tech);
          font-size: 9.5px;
          font-weight: 700;
          color: #800e13;
          text-transform: uppercase;
          text-decoration: none;
        }

        /* RIGHT CONTENT PANEL (FULL-WIDTH USAGE & HIGH IMPACT) */
        .services-catalogue-content {
          background-color: #ffffff;
          width: 100%;
        }

        .split-right-view {
          display: flex;
          flex-direction: column;
          animation: serviceFade 0.2s ease;
          width: 100%;
        }

        /* Large Full-Width Right Banner */
        .split-hero-banner {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background-color: #0f172a;
          width: 100%;
          min-height: clamp(240px, 20vw, 300px);
          display: flex;
          align-items: flex-end;
          margin-bottom: 22px;
        }

        .split-hero-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.72;
        }

        .split-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 11, 18, 0.96) 0%, rgba(15, 23, 42, 0.65) 60%, rgba(15, 23, 42, 0.15) 100%);
        }

        .split-hero-content {
          position: relative;
          z-index: 2;
          padding: 24px 28px;
          width: 100%;
        }

        .split-eyebrow-tag {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 800;
          color: #e03137;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .split-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }

        .split-hero-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: #e2e8f0;
          margin: 0 0 16px 0;
          max-width: 900px;
        }

        .split-hero-inquire-wrap {
          display: flex;
        }

        .split-hero-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background-color: #800e13;
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .split-hero-inquire-btn:hover {
          background-color: #670b10;
          transform: translateY(-1px);
          color: #ffffff;
        }

        /* Section Headers */
        .split-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 8px;
          margin-bottom: 16px;
          border-bottom: 2px solid #0f172a;
        }

        .split-sub-tag {
          font-family: var(--font-tech);
          font-size: 10px;
          font-weight: 800;
          color: #800e13;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }

        .split-section-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        .split-count-badge {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          color: #800e13;
        }

        /* Full Width Substantial Cards Grid */
        .split-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }

        .split-editorial-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .split-editorial-card:hover {
          transform: translateY(-3px);
          border-color: #800e13;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.07);
        }

        .split-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background-color: #0f172a;
          overflow: hidden;
        }

        .split-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .split-editorial-card:hover .split-card-img {
          transform: scale(1.05);
        }

        .split-card-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 2px;
          border-left: 2px solid #800e13;
          text-transform: uppercase;
        }

        .split-card-meta {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #ffffff;
          flex: 1;
        }

        .split-card-meta-left {
          flex: 1;
          margin-bottom: 12px;
        }

        .split-card-num {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 800;
          color: #800e13;
          display: block;
          margin-bottom: 2px;
        }

        .split-card-title {
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px 0;
          line-height: 1.35;
        }

        .split-card-desc {
          font-size: 11.5px;
          line-height: 1.45;
          color: #64748b;
          margin: 0;
        }

        .split-card-action-bar {
          border-top: 1px solid #f1f5f9;
          padding-top: 9px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .split-card-inquire-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #800e13;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.15s ease, gap 0.15s ease;
        }

        .split-card-inquire-link:hover {
          color: #e03137;
          gap: 7px;
        }

        /* Nested Sub-Container for Milling & Grinding */
        .split-nested-sub-container {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #800e13;
          border-radius: 4px;
          padding: 16px;
          margin-bottom: 18px;
          width: 100%;
        }

        .nested-sub-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .nested-sub-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nested-sub-num {
          font-family: var(--font-tech);
          font-size: 12.5px;
          font-weight: 800;
          color: #800e13;
          background-color: #fff1f1;
          padding: 2px 6px;
          border-radius: 2px;
        }

        .nested-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        .nested-desc {
          font-size: 11.5px;
          color: #64748b;
          margin: 0;
        }

        .nested-sub-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          color: #800e13;
          text-transform: uppercase;
          text-decoration: none;
          padding: 4px 10px;
          border-radius: 2px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          transition: all 0.15s ease;
        }

        .nested-sub-inquire-btn:hover {
          background-color: #800e13;
          border-color: #800e13;
          color: #ffffff;
        }

        /* MOBILE ACCORDION */
        .services-mobile-accordion {
          display: none;
        }

        .mobile-nav-block {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          margin-bottom: 8px;
          overflow: hidden;
        }

        .mobile-nav-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 15px;
          cursor: pointer;
        }

        .mobile-nav-block.is-open .mobile-nav-block-header {
          background-color: #800e13;
          color: #ffffff;
        }

        .mobile-nav-title {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: inherit;
          margin: 0;
        }

        .mobile-nav-block-body {
          padding: 14px 10px;
          border-top: 1px solid #f1f5f9;
        }

        /* 3. BOTTOM COMPACT CTA */
        .services-bottom-cta {
          position: relative;
          padding: 44px 0;
          background-image: url('/images/hero_welding_fabrication.jpg');
          background-size: cover;
          background-position: center 30%;
          overflow: hidden;
        }

        .bottom-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 11, 18, 0.94) 0%, rgba(103, 11, 16, 0.88) 100%);
        }

        .bottom-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .bottom-cta-eyebrow {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 700;
          color: #e03137;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .bottom-cta-heading {
          font-family: var(--font-heading);
          font-size: clamp(19px, 2.5vw, 28px);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          max-width: 760px;
          line-height: 1.25;
        }

        .bottom-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background-color: #ffffff;
          color: #800e13;
          font-family: var(--font-tech);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          white-space: nowrap;
        }

        .bottom-cta-button:hover {
          background-color: #f1f5f9;
          transform: translateY(-2px);
          color: #670b10;
        }

        /* 4. BOTTOM TRUST BAR */
        .services-trust-bar {
          padding: 18px 0;
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .trust-bar-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }

        .trust-divider {
          width: 1px;
          height: 16px;
          background-color: #e2e8f0;
        }

        .trust-tagline {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.04em;
        }

        /* 5. MODAL STYLES */
        .service-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(10, 14, 22, 0.75);
          backdrop-filter: blur(5px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: serviceFade 0.2s ease;
        }

        .service-modal-card {
          background-color: #ffffff;
          border-radius: 4px;
          max-width: 720px;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
        }

        .service-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f1f5f9;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .service-modal-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
        }

        .service-modal-media {
          position: relative;
          background-color: #0f172a;
          min-height: 250px;
        }

        .service-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .service-modal-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 2px;
          border-left: 2px solid #800e13;
        }

        .service-modal-body {
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
        }

        .service-modal-discipline {
          font-family: var(--font-tech);
          font-size: 10px;
          font-weight: 700;
          color: #800e13;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .service-modal-title {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 6px 0;
        }

        .service-modal-text {
          font-size: 12.5px;
          line-height: 1.5;
          color: #4b5563;
          margin: 0 0 14px 0;
        }

        .service-modal-actions {
          margin-top: auto;
        }

        .service-modal-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background-color: #800e13;
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
        }

        @keyframes serviceFade {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1200px) {
          .split-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .services-catalogue-layout {
            display: none;
          }
          .services-mobile-accordion {
            display: block;
          }
          .split-cards-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .bottom-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .trust-bar-flex {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .trust-divider {
            display: none;
          }
          .service-modal-grid {
            grid-template-columns: 1fr;
          }
          .service-modal-media {
            aspect-ratio: 16 / 10;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}
