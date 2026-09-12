import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Factory,
  Cog,
  Boxes,
  Crosshair,
  Cpu,
  ChevronRight,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

// =========================================================================
// SERVICES COMPACT DATA REPOSITORY (MINIMAL, CLEAN, VISUAL)
// =========================================================================
const SERVICES_DATA = {
  // ---------------- SS FABRICATION (9 Items) ----------------
  'ss-tube-structure': {
    id: 'ss-tube-structure',
    name: 'Tube Structure & Channel Angle Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/structural_frame_01.jpg',
    description: 'Custom stainless-steel structural fabrication for industrial machine frames, equipment support stands and cleanroom structures, fabricated to project specifications and structural load requirements.',
    highlights: ['Custom Fabrication', 'Structural Support', 'Industrial Framing'],
    idealFor: 'Machine base frames, structural platforms and cleanroom equipment supports.'
  },
  'ss-ducting': {
    id: 'ss-ducting',
    name: 'SS Ducting Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/sheetmetal_ducts_12.jpg',
    description: 'Corrosion-resistant stainless-steel ducting lines, transitions and manifolds engineered for industrial ventilation, fume extraction and clean air distribution systems.',
    highlights: ['Custom Ducting', 'Ventilation Systems', 'Stainless Steel'],
    idealFor: 'Industrial exhaust, cleanroom airflow and chemical fume extraction.'
  },
  'ss-tank': {
    id: 'ss-tank',
    name: 'SS Tank Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/sheetmetal_hopper_10.jpg',
    description: 'Custom stainless-steel tank fabrication developed for industrial process, storage and equipment requirements. Fabrication is tailored to project-specific capacity and dimensional parameters.',
    highlights: ['Custom Fabrication', 'Stainless Steel', 'Industrial Applications'],
    idealFor: 'Industrial process liquids, chemical storage and plant utility tanks.'
  },
  'ss-pipeline': {
    id: 'ss-pipeline',
    name: 'SS Pipeline Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/filtration_skid_20.jpg',
    description: 'Precision stainless-steel pipeline spools and utility manifolds fabricated with high-integrity TIG welding for reliable plant fluid transfer and process distribution.',
    highlights: ['Process Piping', 'TIG Welded', 'Utility Lines'],
    idealFor: 'Industrial fluid transfer, process distribution and utility pipelines.'
  },
  'ss-polishing': {
    id: 'ss-polishing',
    name: 'Polishing & Buffing Work',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_surface_finishing.jpg',
    description: 'Precision mechanical polishing and buffing treatments for stainless-steel fabrications to achieve required surface roughness values from fine satin to mirror finishes.',
    highlights: ['Surface Finishing', 'Satin & Mirror Finish', 'Sanitary Profile'],
    idealFor: 'Sanitary process equipment, architectural components and exposed surfaces.'
  },
  'ss-passivation': {
    id: 'ss-passivation',
    name: 'Passivation & Pickling Work',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/process_skid_19.jpg',
    description: 'Chemical pickling and passivation treatments to eliminate weld heat tints, surface contaminants and restore the protective chromium oxide layer across stainless fabrications.',
    highlights: ['Surface Treatment', 'Oxide Restoration', 'Corrosion Protection'],
    idealFor: 'Post-weld restoration, chemical-grade fabrications and corrosive environments.'
  },
  'ss-ndt': {
    id: 'ss-ndt',
    name: 'SS 3rd Party NDT Facility',
    categoryLabel: 'SS FABRICATION',
    image: '/images/qc_measuring.jpg',
    description: 'Coordination and facilitation of third-party non-destructive testing including dye penetrant, radiography and ultrasonic inspection for certified weld and structural integrity.',
    highlights: ['Quality Inspection', 'Weld Verification', 'NDT Testing'],
    idealFor: 'Critical industrial fabrications, pressure components and compliance verification.'
  },
  'ss-glass-blasting': {
    id: 'ss-glass-blasting',
    name: 'Glass Blasting',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/vertical_ducts_17.jpg',
    description: 'Specialized glass bead abrasive blasting for stainless-steel components to deliver a uniform, clean matte texture while removing micro-burrs and surface discoloration.',
    highlights: ['Matte Finish', 'Abrasive Blasting', 'Surface Cleaning'],
    idealFor: 'Clean visual finishes, uniform matte profiles and component descaling.'
  },
  'ss-laser-cutting': {
    id: 'ss-laser-cutting',
    name: 'Laser Cutting',
    categoryLabel: 'SS FABRICATION',
    image: '/images/hero_welding_fabrication.jpg',
    description: 'High-precision CNC fiber laser cutting for stainless-steel sheet and plate materials, delivering burr-free edges, tight tolerances and accurate complex profiles.',
    highlights: ['CNC Laser Cutting', 'Clean Edges', 'Sheet Profiling'],
    idealFor: 'Precision sheet metal parts, mounting brackets and intricate profiles.'
  },

  // ---------------- MS FABRICATION (8 Items) ----------------
  'ms-tube-channel': {
    id: 'ms-tube-channel',
    name: 'Square Tube, Channel & I-Beam Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/gallery_assets/structural_frame_02.jpg',
    description: 'Heavy structural mild-steel fabrication utilizing square tubes, channels and I-beams to construct rigid machine bases, structural framing and heavy-duty shopfloor fixtures.',
    highlights: ['Heavy Structural', 'Machine Bases', 'Robust Frames'],
    idealFor: 'Heavy machine chassis, plant structural frames and equipment skids.'
  },
  'ms-ducting': {
    id: 'ms-ducting',
    name: 'MS Ducting Work',
    categoryLabel: 'MS FABRICATION',
    image: '/images/gallery_assets/sheetmetal_ducts_14.jpg',
    description: 'Robust mild-steel ducting lines, dust collector ducts and exhaust channels fabricated for factory ventilation, flue gas exhaust and high-volume industrial airflow.',
    highlights: ['Industrial Ducting', 'Plant Ventilation', 'Exhaust Channels'],
    idealFor: 'Factory exhaust lines, dust extraction systems and heavy airflow ducts.'
  },
  'ms-tank': {
    id: 'ms-tank',
    name: 'MS Tank Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/gallery_assets/enclosure_cabinet_22.jpg',
    description: 'Custom mild-steel tanks, hydraulic oil reservoirs and process vessels built with reinforced welding to handle demanding industrial storage and fluid containment.',
    highlights: ['Storage Tanks', 'Oil Reservoirs', 'Custom Welded'],
    idealFor: 'Hydraulic power packs, coolant reservoirs and general plant storage.'
  },
  'ms-pipeline': {
    id: 'ms-pipeline',
    name: 'MS Pipeline Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_fabrication.jpg',
    description: 'Heavy-duty mild-steel pipeline spools, compressed air lines and cooling water distribution headers fabricated to required pressure ratings and welding standards.',
    highlights: ['Plant Piping', 'Utility Distribution', 'Certified Welding'],
    idealFor: 'Cooling water loops, compressed air lines and utility piping spools.'
  },
  'ms-powder-coating': {
    id: 'ms-powder-coating',
    name: 'Powder Coating',
    categoryLabel: 'MS FABRICATION',
    image: '/images/gallery_assets/industrial_frame_15.jpg',
    description: 'Industrial electrostatic powder coating and oven curing for mild-steel fabrications, providing long-lasting corrosion protection, impact durability and uniform color finish.',
    highlights: ['Powder Coating', 'Corrosion Resistance', 'Durable Finish'],
    idealFor: 'Machine enclosures, electrical panels, brackets and structural assemblies.'
  },
  'ms-sand-blasting': {
    id: 'ms-sand-blasting',
    name: 'Sand Blasting & Painting',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_sandblasting_painting.jpg',
    description: 'Thorough abrasive grit/sand blasting to remove rust, scale and mill contaminants, followed by application of industrial epoxy primer and protective polyurethane topcoats.',
    highlights: ['Grit Blasting', 'Epoxy Primer', 'Protective Coating'],
    idealFor: 'Heavy structural assemblies, plant equipment bases and outdoor installations.'
  },
  'ms-ndt': {
    id: 'ms-ndt',
    name: 'MS 3rd Party NDT Facility',
    categoryLabel: 'MS FABRICATION',
    image: '/images/precision_metrology_datum.jpg',
    description: 'Facilitation of third-party NDT quality testing for structural mild-steel weldments, ensuring adherence to industrial quality standards and load-bearing integrity.',
    highlights: ['Weld Inspection', 'NDT Verification', 'Quality Assurance'],
    idealFor: 'Load-bearing frames, crane structures and certified industrial weldments.'
  },
  'ms-laser-forming': {
    id: 'ms-laser-forming',
    name: 'Laser Cutting & Forming',
    categoryLabel: 'MS FABRICATION',
    image: '/images/hero_cnc_precision.jpg',
    description: 'Integrated CNC laser profile cutting and hydraulic press-brake bending for mild-steel plates, producing accurate bent sections, covers, guards and brackets.',
    highlights: ['Laser Cutting', 'Press Brake Bending', 'Custom Forming'],
    idealFor: 'Machine guards, chassis covers, structural brackets and sheet components.'
  },

  // ---------------- MACHINING SERVICES (11 Items) ----------------
  'mach-laser-cutting': {
    id: 'mach-laser-cutting',
    name: 'Laser Cutting',
    categoryLabel: 'MACHINING',
    image: '/images/hero_welding_fabrication.jpg',
    description: 'Precision 2D CNC laser cutting services delivering clean edge definition, tight tolerances and accurate repeatable cutouts across a variety of industrial metals.',
    highlights: ['CNC Laser Profiling', 'Clean Edge Quality', 'Sheet Profiling'],
    idealFor: 'Rapid prototype parts, precision sheet metal profiles and production batches.'
  },
  'mach-plano-milling': {
    id: 'mach-plano-milling',
    name: 'Plano Milling',
    categoryLabel: 'MACHINING',
    image: '/images/gallery_assets/structural_frame_08.jpg',
    description: 'Heavy-capacity plano milling for machining oversized component faces, long machine beds, die blocks and large fabrication datum surfaces with high flatness.',
    highlights: ['Large Bed Milling', 'Face Machining', 'Heavy Structures'],
    idealFor: 'Large machine base datum faces, heavy press platens and long slides.'
  },
  'mach-vmc-milling': {
    id: 'mach-vmc-milling',
    name: 'VMC Milling',
    categoryLabel: 'MACHINING',
    image: '/images/hero_cnc_precision.jpg',
    description: 'Multi-axis vertical machining center (VMC) CNC milling for complex components requiring high dimensional accuracy, fine surface finishes and consistent batch repeatability.',
    highlights: ['CNC Milling', 'Component Machining', 'Precision Work'],
    idealFor: 'Complex tooling blocks, precision mechanical parts and machined housings.'
  },
  'mach-universal-milling': {
    id: 'mach-universal-milling',
    name: 'Universal Milling',
    categoryLabel: 'MACHINING',
    image: '/images/about_workshop_indian.jpg',
    description: 'Flexible universal milling for toolroom operations, keyway cutting, gear slotting, spline milling and custom component modifications with precision setup.',
    highlights: ['Keyway & Slots', 'Toolroom Machining', 'Helical Milling'],
    idealFor: 'Shaft keyways, slotting, toolroom maintenance and one-off mechanical parts.'
  },
  'mach-drilling': {
    id: 'mach-drilling',
    name: 'Drilling',
    categoryLabel: 'MACHINING',
    image: '/images/service_custom_machines_spm.jpg',
    description: 'Heavy radial and multi-spindle drilling, precision boring and thread tapping operations across thick steel plates, flanges and structural fabrications.',
    highlights: ['Radial Drilling', 'Hole Tapping', 'Precision Reaming'],
    idealFor: 'Flange bolt patterns, structural base holes and threaded assembly plates.'
  },
  'mach-turning': {
    id: 'mach-turning',
    name: 'Turning',
    categoryLabel: 'MACHINING',
    image: '/images/gallery_assets/rotary_airlock_16.jpg',
    description: 'Precision lathe turning, facing, boring and threading operations for cylindrical shafts, rollers, bushings, pins and precision turned assemblies.',
    highlights: ['Lathe Turning', 'Shafts & Pins', 'Precision Threading'],
    idealFor: 'Conveyor rollers, drive shafts, precision bushings and turned fasteners.'
  },
  'mach-jig-fixture-work': {
    id: 'mach-jig-fixture-work',
    name: 'Jig-Fixture Work',
    categoryLabel: 'MACHINING',
    image: '/images/service_jigs_fixtures.jpg',
    description: 'High-precision toolroom machining of locating pins, resting pads, clamp jaws and guide blocks specifically built for custom manufacturing jigs and fixtures.',
    highlights: ['Toolroom Machining', 'Locating Pins', 'Fixture Blocks'],
    idealFor: 'Assembly line fixtures, welding fixture parts and precision clamping tools.'
  },
  'mach-toolroom-work': {
    id: 'mach-toolroom-work',
    name: 'Tool-Room Work',
    categoryLabel: 'MACHINING',
    image: '/images/about_workshop_indian.jpg',
    description: 'Dedicated toolroom manufacturing services including die modifications, prototype component machining, gauge manufacturing and custom tooling solutions.',
    highlights: ['Custom Tooling', 'Gauge Fabrication', 'Prototype Work'],
    idealFor: 'Tooling rework, prototype development, go/no-go gauges and custom dies.'
  },
  'mach-forming': {
    id: 'mach-forming',
    name: 'Forming',
    categoryLabel: 'MACHINING',
    image: '/images/gallery_products/05_hydraulic_press_structure.png',
    description: 'Hydraulic press and bending operations to shape sheet metal and plate sections into accurate channels, angles, curved covers and custom structural profiles.',
    highlights: ['Hydraulic Press', 'Sheet Metal Bending', 'Section Forming'],
    idealFor: 'Custom channel sections, curved panels, heavy enclosures and bent brackets.'
  },
  'mach-cylindrical-grinding': {
    id: 'mach-cylindrical-grinding',
    name: 'Cylindrical Grinding',
    categoryLabel: 'MACHINING',
    image: '/images/gallery_assets/rotary_airlock_16.jpg',
    description: 'High-precision outer (OD) and inner (ID) diameter cylindrical grinding to achieve micron-level concentricity, fine surface finishes and strict shaft tolerances.',
    highlights: ['OD/ID Grinding', 'Shaft Finishing', 'Concentricity'],
    idealFor: 'Bearing journals, precision guide pins, spindle components and rollers.'
  },
  'mach-surface-grinding': {
    id: 'mach-surface-grinding',
    name: 'Surface Grinding',
    categoryLabel: 'MACHINING',
    image: '/images/service_surface_grinding_precision.jpg',
    description: 'Precision surface grinding to produce ultra-flat datum faces, parallel guideways, spacer plates and tool steel blocks with mirror-grade surface finishes.',
    highlights: ['Surface Flatness', 'Parallel Datum', 'Precision Finishing'],
    idealFor: 'Tool steel plates, machine slide guideways, precision shims and dies.'
  },

  // ---------------- CONVEYOR & MATERIAL HANDLING (5 Items) ----------------
  'conv-belt': {
    id: 'conv-belt',
    name: 'Belt Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/gallery_products/02_pvc_belt_conveyor.png',
    description: 'Industrial belt conveyor systems engineered for smooth, reliable material transfer across production, packaging and handling lines with custom widths and lengths.',
    highlights: ['Material Handling', 'Industrial Conveying', 'Custom Solutions'],
    idealFor: 'Packaging lines, assembly operations and intra-plant material transit.'
  },
  'conv-flat': {
    id: 'conv-flat',
    name: 'Flat Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/service_conveyors.jpg',
    description: 'Modular flat slat and roller conveyor solutions designed for stable component movement, inline buffering and seamless integration with production machinery.',
    highlights: ['Flat Conveyors', 'Component Transit', 'Assembly Lines'],
    idealFor: 'Component transit, assembly workstations and continuous part feeding.'
  },
  'conv-magnetic': {
    id: 'conv-magnetic',
    name: 'Magnetic Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/gallery_products/02_z_magnetic_conveyor.png',
    description: 'Specialized magnetic conveyors designed for automatic chip evacuation, scrap metal transit and elevating ferrous components from machining centers.',
    highlights: ['Magnetic Conveying', 'Chip Extraction', 'Scrap Removal'],
    idealFor: 'CNC chip evacuation, stamping scrap handling and ferrous part elevation.'
  },
  'conv-trolleys': {
    id: 'conv-trolleys',
    name: 'Industrial Trolleys',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/service_trolleys.jpg',
    description: 'Ergonomic shopfloor transit trolleys, component picking carts and heavy-duty transport dollies built with industrial-grade casters and robust steel frames.',
    highlights: ['Floor Transit', 'Heavy-Duty Casters', 'Custom Racks'],
    idealFor: 'Shopfloor part transit, material handling and raw material transport.'
  },
  'conv-pallets': {
    id: 'conv-pallets',
    name: 'Industrial Pallets',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/gallery_products/04_material_handling_trolley.png',
    description: 'Heavy-gauge steel fabricated storage pallets and stackable stillages engineered for safe warehouse racking, heavy component storage and transport durability.',
    highlights: ['Steel Pallets', 'Stacking Stillages', 'Warehouse Storage'],
    idealFor: 'Heavy inventory racking, warehouse stacking and component shipping.'
  },

  // ---------------- JIGS & FIXTURES (STANDALONE SERVICE) ----------------
  'jigs-fixtures': {
    id: 'jigs-fixtures',
    name: 'Jigs & Fixtures',
    categoryLabel: 'JIGS & FIXTURES',
    image: '/images/service_jigs_fixtures.jpg',
    description: 'Custom-designed manufacturing jigs and holding fixtures engineered to ensure accurate part positioning, repeatable clamping and efficient assembly or welding operations.',
    highlights: ['Custom Fixtures', 'Component Holding', 'Process Support'],
    idealFor: 'Welding setups, production line assembly and precision machining operations.'
  },

  // ---------------- SPECIAL PURPOSE MACHINES (STANDALONE SERVICE) ----------------
  'spm-service': {
    id: 'spm-service',
    name: 'Special Purpose Machines',
    categoryLabel: 'SPM',
    image: '/images/service_custom_spm.jpg',
    description: 'Custom Special Purpose Machines (SPM) designed and built for dedicated industrial processes, automated operations and project-specific manufacturing requirements.',
    highlights: ['Custom Automation', 'Machine Integration', 'Industrial Applications'],
    idealFor: 'Dedicated production operations, automated tasks and custom machine needs.'
  }
};

// =========================================================================
// MAIN SERVICES PAGE COMPONENT
// =========================================================================
export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Selected single service ID to display on the right (DEFAULT: first item)
  const [selectedServiceId, setSelectedServiceId] = useState('ss-tube-structure');

  // Sidebar expansion states
  const [openFabrication, setOpenFabrication] = useState(true);
  const [openSS, setOpenSS] = useState(true);
  const [openMS, setOpenMS] = useState(false);
  const [openMachining, setOpenMachining] = useState(false);
  const [openMilling, setOpenMilling] = useState(false);
  const [openGrinding, setOpenGrinding] = useState(false);
  const [openConveyors, setOpenConveyors] = useState(false);

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Handle direct deep-linking via query params (?service=... or ?id=...)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const idParam = searchParams.get('id');

    if (idParam && SERVICES_DATA[idParam]) {
      setSelectedServiceId(idParam);
      expandTreeForService(idParam);
    } else if (serviceParam) {
      const match = Object.values(SERVICES_DATA).find(
        (s) => s.name.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setSelectedServiceId(match.id);
        expandTreeForService(match.id);
      }
    }
  }, [searchParams]);

  // Helper to expand sidebar tree for a given service
  const expandTreeForService = (id) => {
    if (id.startsWith('ss-')) {
      setOpenFabrication(true);
      setOpenSS(true);
    } else if (id.startsWith('ms-')) {
      setOpenFabrication(true);
      setOpenMS(true);
    } else if (id.startsWith('mach-')) {
      setOpenMachining(true);
      if (id.includes('milling')) setOpenMilling(true);
      if (id.includes('grinding')) setOpenGrinding(true);
    } else if (id.startsWith('conv-')) {
      setOpenConveyors(true);
    }
  };

  // Handler to select an individual item
  const handleSelectService = (id) => {
    setSelectedServiceId(id);
    setMobileMenuOpen(false);

    // Smooth scroll to detail area on mobile
    if (window.innerWidth < 992) {
      const anchor = document.getElementById('catalogue-detail-content-area');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handler for INQUIRE NOW
  const handleInquireNow = (serviceName) => {
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`, {
      state: { service: serviceName }
    });
  };

  // Active service object
  const currentService = SERVICES_DATA[selectedServiceId] || SERVICES_DATA['ss-tube-structure'];

  return (
    <div className="services-page-root">
      
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL BANNER                                                   */}
      {/* ========================================================================= */}
      <section className="services-top-hero">
        <div className="top-hero-overlay" />
        <div className="services-full-container">
          <div className="top-hero-content">
            <div className="hero-badge-wrap">
              <span className="hero-badge-text">MAULI KRUPA PRECISION WORKS</span>
              <span className="hero-badge-line" />
            </div>
            <h1 className="hero-title">
              SERVICES <span className="hero-title-accent">CATALOGUE</span>
            </h1>
            <p className="hero-subtitle">
              Select any capability from the index below to explore our industrial manufacturing and engineering services.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FULL-WIDTH INDUSTRIAL CATALOGUE: LEFT SIDEBAR + RIGHT DETAIL           */}
      {/* ========================================================================= */}
      <section className="services-main-layout-section">
        <div className="services-full-container">

          {/* MOBILE ACCORDION SELECTOR BAR (< 992px) */}
          <div className="mobile-category-bar">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-category-btn"
            >
              <div className="mobile-btn-copy">
                <span className="mobile-btn-tag">CURRENTLY VIEWING:</span>
                <span className="mobile-btn-title">{currentService.name}</span>
              </div>
              <ChevronDown
                size={18}
                className={`mobile-chevron ${mobileMenuOpen ? 'open' : ''}`}
              />
            </button>
          </div>

          <div className="services-catalogue-grid">
            
            {/* =================================================================== */}
            {/* LEFT SIDEBAR: EXPANDABLE INDUSTRIAL SERVICE TREE NAVIGATION         */}
            {/* =================================================================== */}
            <aside className={`services-sidebar-column ${mobileMenuOpen ? 'mobile-visible' : ''}`}>
              <div className="sidebar-container-box">
                {/* Sidebar Header */}
                <div className="sidebar-top-bar">
                  <span className="sidebar-eyebrow">CAPABILITY INDEX</span>
                  <h3 className="sidebar-title">Our Services</h3>
                </div>

                {/* Sidebar Navigation Tree */}
                <nav className="sidebar-tree-navigation">

                  {/* ---------------- 1. INDUSTRIAL FABRICATION ---------------- */}
                  <div className="sidebar-tree-group">
                    <div
                      className={`tree-group-header ${selectedServiceId.startsWith('ss-') || selectedServiceId.startsWith('ms-') ? 'active-parent' : ''}`}
                      onClick={() => setOpenFabrication(!openFabrication)}
                    >
                      <div className="header-left-col">
                        <span className="tree-num">01</span>
                        <Factory size={16} className="tree-icon" />
                        <span className="tree-text">Industrial Fabrication</span>
                      </div>
                      <ChevronDown size={15} className={`tree-chevron ${openFabrication ? 'open' : ''}`} />
                    </div>

                    {/* EXPANDS TO: SS Fabrication & MS Fabrication ONLY */}
                    {openFabrication && (
                      <div className="tree-sub-branches">
                        
                        {/* SS FABRICATION */}
                        <div className="sub-category-group">
                          <div
                            className={`sub-category-header ${selectedServiceId.startsWith('ss-') ? 'active-sub' : ''}`}
                            onClick={() => setOpenSS(!openSS)}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-title">SS Fabrication</span>
                            <ChevronDown size={13} className={`sub-chevron ${openSS ? 'open' : ''}`} />
                          </div>

                          {openSS && (
                            <div className="leaf-items-list">
                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-tube-structure' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-tube-structure')}
                              >
                                <span className="leaf-indicator" />
                                <span>Tube Structure &amp; Channel Angle Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-ducting' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-ducting')}
                              >
                                <span className="leaf-indicator" />
                                <span>SS Ducting Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-tank' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-tank')}
                              >
                                <span className="leaf-indicator" />
                                <span>SS Tank Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-pipeline' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-pipeline')}
                              >
                                <span className="leaf-indicator" />
                                <span>SS Pipeline Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-polishing' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-polishing')}
                              >
                                <span className="leaf-indicator" />
                                <span>Polishing &amp; Buffing Work</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-passivation' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-passivation')}
                              >
                                <span className="leaf-indicator" />
                                <span>Passivation &amp; Pickling Work</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-ndt' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-ndt')}
                              >
                                <span className="leaf-indicator" />
                                <span>SS 3rd Party NDT Facility</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-glass-blasting' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-glass-blasting')}
                              >
                                <span className="leaf-indicator" />
                                <span>Glass Blasting</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ss-laser-cutting' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ss-laser-cutting')}
                              >
                                <span className="leaf-indicator" />
                                <span>Laser Cutting</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* MS FABRICATION */}
                        <div className="sub-category-group">
                          <div
                            className={`sub-category-header ${selectedServiceId.startsWith('ms-') ? 'active-sub' : ''}`}
                            onClick={() => setOpenMS(!openMS)}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-title">MS Fabrication</span>
                            <ChevronDown size={13} className={`sub-chevron ${openMS ? 'open' : ''}`} />
                          </div>

                          {openMS && (
                            <div className="leaf-items-list">
                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-tube-channel' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-tube-channel')}
                              >
                                <span className="leaf-indicator" />
                                <span>Square Tube, Channel &amp; I-Beam Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-ducting' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-ducting')}
                              >
                                <span className="leaf-indicator" />
                                <span>MS Ducting Work</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-tank' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-tank')}
                              >
                                <span className="leaf-indicator" />
                                <span>MS Tank Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-pipeline' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-pipeline')}
                              >
                                <span className="leaf-indicator" />
                                <span>MS Pipeline Fabrication</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-powder-coating' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-powder-coating')}
                              >
                                <span className="leaf-indicator" />
                                <span>Powder Coating</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-sand-blasting' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-sand-blasting')}
                              >
                                <span className="leaf-indicator" />
                                <span>Sand Blasting &amp; Painting</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-ndt' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-ndt')}
                              >
                                <span className="leaf-indicator" />
                                <span>MS 3rd Party NDT Facility</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'ms-laser-forming' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('ms-laser-forming')}
                              >
                                <span className="leaf-indicator" />
                                <span>Laser Cutting &amp; Forming</span>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* ---------------- 2. MACHINING ---------------- */}
                  <div className="sidebar-tree-group">
                    <div
                      className={`tree-group-header ${selectedServiceId.startsWith('mach-') ? 'active-parent' : ''}`}
                      onClick={() => setOpenMachining(!openMachining)}
                    >
                      <div className="header-left-col">
                        <span className="tree-num">02</span>
                        <Cog size={16} className="tree-icon" />
                        <span className="tree-text">Machining</span>
                      </div>
                      <ChevronDown size={15} className={`tree-chevron ${openMachining ? 'open' : ''}`} />
                    </div>

                    {openMachining && (
                      <div className="tree-sub-branches">
                        {/* Laser Cutting */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-laser-cutting' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-laser-cutting')}
                        >
                          <span className="leaf-indicator" />
                          <span>Laser Cutting</span>
                        </div>

                        {/* Milling (Expandable -> Plano, VMC, Universal) */}
                        <div className="sub-category-group">
                          <div
                            className={`sub-category-header ${selectedServiceId.includes('milling') ? 'active-sub' : ''}`}
                            onClick={() => setOpenMilling(!openMilling)}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-title">Milling</span>
                            <ChevronDown size={13} className={`sub-chevron ${openMilling ? 'open' : ''}`} />
                          </div>

                          {openMilling && (
                            <div className="leaf-items-list">
                              <div
                                className={`leaf-item ${selectedServiceId === 'mach-plano-milling' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('mach-plano-milling')}
                              >
                                <span className="leaf-indicator" />
                                <span>Plano Milling</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'mach-vmc-milling' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('mach-vmc-milling')}
                              >
                                <span className="leaf-indicator" />
                                <span>VMC Milling</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'mach-universal-milling' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('mach-universal-milling')}
                              >
                                <span className="leaf-indicator" />
                                <span>Universal Milling</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Drilling */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-drilling' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-drilling')}
                        >
                          <span className="leaf-indicator" />
                          <span>Drilling</span>
                        </div>

                        {/* Turning */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-turning' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-turning')}
                        >
                          <span className="leaf-indicator" />
                          <span>Turning</span>
                        </div>

                        {/* Jig-Fixture Work */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-jig-fixture-work' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-jig-fixture-work')}
                        >
                          <span className="leaf-indicator" />
                          <span>Jig-Fixture Work</span>
                        </div>

                        {/* Tool-Room Work */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-toolroom-work' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-toolroom-work')}
                        >
                          <span className="leaf-indicator" />
                          <span>Tool-Room Work</span>
                        </div>

                        {/* Forming */}
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'mach-forming' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('mach-forming')}
                        >
                          <span className="leaf-indicator" />
                          <span>Forming</span>
                        </div>

                        {/* Grinding & Finishing (Expandable -> Cylindrical, Surface) */}
                        <div className="sub-category-group">
                          <div
                            className={`sub-category-header ${selectedServiceId.includes('grinding') ? 'active-sub' : ''}`}
                            onClick={() => setOpenGrinding(!openGrinding)}
                          >
                            <span className="sub-bullet" />
                            <span className="sub-title">Grinding &amp; Finishing</span>
                            <ChevronDown size={13} className={`sub-chevron ${openGrinding ? 'open' : ''}`} />
                          </div>

                          {openGrinding && (
                            <div className="leaf-items-list">
                              <div
                                className={`leaf-item ${selectedServiceId === 'mach-cylindrical-grinding' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('mach-cylindrical-grinding')}
                              >
                                <span className="leaf-indicator" />
                                <span>Cylindrical Grinding</span>
                              </div>

                              <div
                                className={`leaf-item ${selectedServiceId === 'mach-surface-grinding' ? 'is-selected' : ''}`}
                                onClick={() => handleSelectService('mach-surface-grinding')}
                              >
                                <span className="leaf-indicator" />
                                <span>Surface Grinding</span>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* ---------------- 3. CONVEYOR & MATERIAL HANDLING (STANDALONE CATEGORY) ---------------- */}
                  <div className="sidebar-tree-group">
                    <div
                      className={`tree-group-header ${selectedServiceId.startsWith('conv-') ? 'active-parent' : ''}`}
                      onClick={() => setOpenConveyors(!openConveyors)}
                    >
                      <div className="header-left-col">
                        <span className="tree-num">03</span>
                        <Boxes size={16} className="tree-icon" />
                        <span className="tree-text">Conveyor &amp; Material Handling</span>
                      </div>
                      <ChevronDown size={15} className={`tree-chevron ${openConveyors ? 'open' : ''}`} />
                    </div>

                    {openConveyors && (
                      <div className="tree-sub-branches">
                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'conv-belt' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('conv-belt')}
                        >
                          <span className="leaf-indicator" />
                          <span>Belt Conveyor</span>
                        </div>

                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'conv-flat' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('conv-flat')}
                        >
                          <span className="leaf-indicator" />
                          <span>Flat Conveyor</span>
                        </div>

                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'conv-magnetic' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('conv-magnetic')}
                        >
                          <span className="leaf-indicator" />
                          <span>Magnetic Conveyor</span>
                        </div>

                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'conv-trolleys' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('conv-trolleys')}
                        >
                          <span className="leaf-indicator" />
                          <span>Industrial Trolleys</span>
                        </div>

                        <div
                          className={`leaf-item-direct ${selectedServiceId === 'conv-pallets' ? 'is-selected' : ''}`}
                          onClick={() => handleSelectService('conv-pallets')}
                        >
                          <span className="leaf-indicator" />
                          <span>Industrial Pallets</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ---------------- 4. JIGS & FIXTURES (STANDALONE — NO SUBTYPES) ---------------- */}
                  <div className="sidebar-tree-group">
                    <div
                      className={`tree-group-header standalone-item ${selectedServiceId === 'jigs-fixtures' ? 'is-selected' : ''}`}
                      onClick={() => handleSelectService('jigs-fixtures')}
                    >
                      <div className="header-left-col">
                        <span className="tree-num">04</span>
                        <Crosshair size={16} className="tree-icon" />
                        <span className="tree-text">Jigs &amp; Fixtures</span>
                      </div>
                      <ChevronRight size={14} className="tree-standalone-chevron" />
                    </div>
                  </div>

                  {/* ---------------- 5. SPECIAL PURPOSE MACHINES (SPM) (STANDALONE — NO SUBTYPES) ---------------- */}
                  <div className="sidebar-tree-group">
                    <div
                      className={`tree-group-header standalone-item ${selectedServiceId === 'spm-service' ? 'is-selected' : ''}`}
                      onClick={() => handleSelectService('spm-service')}
                    >
                      <div className="header-left-col">
                        <span className="tree-num">05</span>
                        <Cpu size={16} className="tree-icon" />
                        <span className="tree-text">Special Purpose Machines (SPM)</span>
                      </div>
                      <ChevronRight size={14} className="tree-standalone-chevron" />
                    </div>
                  </div>

                </nav>

              </div>
            </aside>

            {/* =================================================================== */}
            {/* RIGHT SIDE: BALANCED 2-COLUMN DETAIL LAYOUT                         */}
            {/* [IMAGE (45%)] + [CATEGORY, TITLE, DESCRIPTION, SERVICE FOCUS, CTA (55%)] */}
            {/* =================================================================== */}
            <main
              id="catalogue-detail-content-area"
              className="services-detail-main-content"
            >
              <div key={currentService.id} className="selected-service-card animate-detail-fade">
                
                {/* LEFT: SERVICE IMAGE (45%) */}
                <div className="service-detail-image-col">
                  <div className="detail-image-box">
                    <img
                      src={currentService.image}
                      alt={currentService.name}
                      className="detail-featured-img"
                    />
                  </div>
                </div>

                {/* RIGHT: SERVICE INFORMATION (55%) */}
                <div className="service-detail-info-col">
                  
                  {/* 1. Small Category Label */}
                  <div className="service-category-label">
                    {currentService.categoryLabel}
                  </div>

                  {/* 2. Service Name */}
                  <h2 className="service-title">
                    {currentService.name}
                  </h2>

                  {/* 3. Short Description (2–3 lines, approx 25–40 words) */}
                  <p className="service-description">
                    {currentService.description}
                  </p>

                  {/* 4. KEY HIGHLIGHTS (Max 3 Short Points) */}
                  {currentService.highlights && currentService.highlights.length > 0 && (
                    <div className="service-highlights-block">
                      <span className="service-section-eyebrow">KEY HIGHLIGHTS</span>
                      <ul className="service-highlights-list">
                        {currentService.highlights.map((point, idx) => (
                          <li key={idx} className="highlight-item">
                            <span className="highlight-dot" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 5. One Short "Ideal for" Line */}
                  {currentService.idealFor && (
                    <div className="service-ideal-for-wrap">
                      <span className="ideal-for-label">Ideal for:</span>{' '}
                      <span className="ideal-for-text">{currentService.idealFor}</span>
                    </div>
                  )}

                  {/* 6. INQUIRE NOW Action Button */}
                  <div className="service-action-wrap">
                    <button
                      onClick={() => handleInquireNow(currentService.name)}
                      className="service-inquire-btn"
                      id="service-inquire-now-btn"
                    >
                      <span>INQUIRE NOW</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                </div>

              </div>
            </main>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STYLES: CLEAN EDITORIAL VISUAL COMPOSITION, FULL-WIDTH, MAROON ACCENTS */}
      {/* ========================================================================= */}
      <style>{`
        .services-page-root {
          background-color: #ffffff;
          color: #111827;
          min-height: 100vh;
          width: 100%;
        }

        /* Container using full viewport width with clean spacing */
        .services-full-container {
          width: 100%;
          max-width: 1780px;
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(16px, 2.2vw, 36px);
          padding-right: clamp(16px, 2.2vw, 36px);
        }

        /* 1. TOP HERO SECTION */
        .services-top-hero {
          position: relative;
          padding-top: clamp(92px, 8.5vw, 116px);
          padding-bottom: clamp(24px, 3vw, 36px);
          background-image: url('/images/hero_welding_fabrication.jpg');
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .top-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 12, 24, 0.96) 0%, rgba(15, 23, 42, 0.88) 100%);
          pointer-events: none;
        }

        .top-hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }

        .hero-badge-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .hero-badge-text {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #f1f5f9;
          text-transform: uppercase;
        }

        .hero-badge-line {
          width: 24px;
          height: 2px;
          background-color: #800e13;
          border-radius: 1px;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 6px 0;
        }

        .hero-title-accent {
          color: #e03137;
        }

        .hero-subtitle {
          font-size: clamp(13.5px, 0.95vw, 15px);
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
          max-width: 600px;
        }

        /* 2. SPLIT LAYOUT SECTION */
        .services-main-layout-section {
          padding: 24px 0 54px;
          background-color: #ffffff;
        }

        .services-catalogue-grid {
          display: grid;
          grid-template-columns: minmax(280px, 26%) 1fr;
          gap: 32px;
          align-items: start;
        }

        /* SIDEBAR STYLES */
        .services-sidebar-column {
          position: sticky;
          top: 88px;
          width: 100%;
        }

        .sidebar-container-box {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.03);
        }

        .sidebar-top-bar {
          padding: 14px 16px 10px;
          background-color: #0f172a;
          border-bottom: 3px solid #800e13;
        }

        .sidebar-eyebrow {
          font-family: var(--font-tech);
          font-size: 9.5px;
          font-weight: 700;
          color: #e03137;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }

        .sidebar-title {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .sidebar-tree-navigation {
          display: flex;
          flex-direction: column;
        }

        .sidebar-tree-group {
          border-bottom: 1px solid #f1f5f9;
          margin: 0;
          padding: 0;
        }

        .sidebar-tree-group:last-child {
          border-bottom: none;
        }

        .tree-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          cursor: pointer;
          background-color: #ffffff;
          transition: background-color 0.15s ease, border-color 0.15s ease;
          border-left: 3.5px solid transparent;
          margin: 0;
        }

        .tree-group-header:hover {
          background-color: #f8fafc;
        }

        .tree-group-header.active-parent {
          background-color: #fff9f9;
          border-left: 3.5px solid #800e13;
        }

        .tree-group-header.standalone-item {
          cursor: pointer;
          border-left: 3.5px solid transparent;
        }

        .tree-group-header.standalone-item:hover {
          background-color: #f8fafc;
        }

        .tree-group-header.standalone-item.is-selected {
          background-color: #800e13;
          color: #ffffff;
          border-left: 3.5px solid #0f172a;
        }

        .tree-group-header.standalone-item.is-selected .tree-num,
        .tree-group-header.standalone-item.is-selected .tree-icon,
        .tree-group-header.standalone-item.is-selected .tree-text {
          color: #ffffff;
        }

        .tree-standalone-chevron {
          color: #94a3b8;
          opacity: 0.6;
          transition: color 0.15s ease, opacity 0.15s ease;
        }

        .tree-group-header.standalone-item.is-selected .tree-standalone-chevron {
          color: #ffffff;
          opacity: 1;
        }

        .header-left-col {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .tree-num {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 800;
          color: #800e13;
        }

        .tree-icon {
          color: #64748b;
        }

        .tree-group-header.active-parent .tree-icon {
          color: #800e13;
        }

        .tree-text {
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 700;
          color: #111827;
        }

        .tree-group-header.active-parent .tree-text {
          color: #800e13;
        }

        .tree-chevron {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .tree-chevron.open {
          transform: rotate(180deg);
        }

        /* Sub branches */
        .tree-sub-branches {
          background-color: #fafbfc;
          border-top: 1px solid #f1f5f9;
          padding: 4px 6px 6px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sub-category-group {
          margin: 2px 0;
        }

        .sub-category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          cursor: pointer;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 700;
          color: #334155;
          transition: all 0.15s ease;
        }

        .sub-category-header:hover {
          background-color: #f1f5f9;
          color: #800e13;
        }

        .sub-category-header.active-sub {
          color: #800e13;
          background-color: #fff1f1;
        }

        .sub-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #800e13;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .sub-title {
          flex: 1;
        }

        .sub-chevron {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .sub-chevron.open {
          transform: rotate(180deg);
        }

        /* Leaf Items */
        .leaf-items-list {
          padding-left: 14px;
          margin: 2px 0 4px;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .leaf-item,
        .leaf-item-direct {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 8px;
          font-size: 11.5px;
          color: #475569;
          font-weight: 500;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.15s ease;
          line-height: 1.35;
        }

        .leaf-item:hover,
        .leaf-item-direct:hover {
          background-color: #f1f5f9;
          color: #800e13;
        }

        .leaf-item.is-selected,
        .leaf-item-direct.is-selected {
          background-color: #800e13;
          color: #ffffff;
          font-weight: 700;
        }

        .leaf-indicator {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #cbd5e1;
          flex-shrink: 0;
        }

        .leaf-item.is-selected .leaf-indicator,
        .leaf-item-direct.is-selected .leaf-indicator {
          background-color: #ffffff;
        }

        /* ========================================================================= */
        /* RIGHT SIDE: BALANCED TWO-COLUMN DETAIL SHOWCASE (MEDIUM-SIZED BALANCED)   */
        /* ========================================================================= */
        .services-detail-main-content {
          width: 100%;
        }

        .animate-detail-fade {
          animation: detailFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes detailFadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .selected-service-card {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: clamp(32px, 3.2vw, 44px);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          display: grid;
          grid-template-columns: minmax(0, 45%) minmax(0, 55%);
          gap: clamp(32px, 3.5vw, 46px);
          align-items: center;
          min-height: 480px;
        }

        /* LEFT: SERVICE IMAGE (45%) */
        .service-detail-image-col {
          width: 100%;
        }

        .detail-image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 430px;
          min-height: 310px;
          background-color: #0f172a;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 14px rgba(15, 23, 42, 0.05);
        }

        .detail-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* RIGHT: SERVICE INFORMATION (55%) */
        .service-detail-info-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        /* 1. Small Category Label */
        .service-category-label {
          font-family: var(--font-tech);
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #800e13;
          text-transform: uppercase;
        }

        /* 2. Service Title */
        .service-title {
          font-family: var(--font-heading);
          font-size: clamp(24px, 2.5vw, 32px);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.22;
          letter-spacing: -0.015em;
        }

        /* 3. Short 1-Sentence Description */
        .service-description {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
          margin: 0;
          max-width: 580px;
        }

        /* 4. Key Highlights Block */
        .service-highlights-block {
          margin-top: 2px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .service-section-eyebrow {
          font-family: var(--font-tech);
          font-size: 10.5px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Highlights List */
        .service-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .highlight-dot {
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background-color: #800e13;
          flex-shrink: 0;
        }

        /* 5. Ideal for Line */
        .service-ideal-for-wrap {
          font-size: 13.5px;
          line-height: 1.55;
          margin-top: 2px;
          padding-top: 4px;
          border-top: 1px dashed #e2e8f0;
        }

        .ideal-for-label {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-right: 4px;
        }

        .ideal-for-text {
          font-size: 13.5px;
          color: #475569;
          font-weight: 500;
        }

        /* 6. Inquire Button */
        .service-action-wrap {
          padding-top: 4px;
        }

        .service-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          background-color: #800e13;
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 3px 14px rgba(128, 14, 19, 0.24);
        }

        .service-inquire-btn:hover {
          background-color: #670b10;
          transform: translateY(-2px);
        }

        /* MOBILE BAR (< 992px) */
        .mobile-category-bar {
          display: none;
          margin-bottom: 18px;
        }

        .mobile-category-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .mobile-btn-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .mobile-btn-tag {
          font-family: var(--font-tech);
          font-size: 9px;
          font-weight: 700;
          color: #e03137;
          letter-spacing: 0.1em;
        }

        .mobile-btn-title {
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 700;
        }

        .mobile-chevron {
          transition: transform 0.2s ease;
        }

        .mobile-chevron.open {
          transform: rotate(180deg);
        }

        /* ========================================================================= */
        /* RESPONSIVE BREAKPOINTS                                                    */
        /* ========================================================================= */
        @media (max-width: 991px) {
          .services-catalogue-grid {
            grid-template-columns: 1fr;
          }

          .services-sidebar-column {
            display: none;
          }

          .services-sidebar-column.mobile-visible {
            display: block;
            position: static;
            margin-bottom: 20px;
          }

          .services-sidebar-column.mobile-visible .sidebar-container-box {
            max-height: 65vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .mobile-category-bar {
            display: block;
          }

          .selected-service-card {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 22px;
            min-height: auto;
          }

          .detail-image-box {
            max-height: 320px;
            min-height: auto;
            aspect-ratio: 16 / 10;
          }
        }

        @media (max-width: 640px) {
          .service-title {
            font-size: 21px;
          }

          .service-inquire-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .selected-service-card {
            padding: 16px;
            gap: 16px;
          }
          .detail-image-box {
            max-height: 230px;
          }
          .service-title {
            font-size: 19px;
          }
          .service-description {
            font-size: 14px;
          }
          .highlight-item {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

