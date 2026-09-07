import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Clock, ChevronRight, Check, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [selectedRequirement, setSelectedRequirement] = useState('01 PRECISION TOOLING');
  const [hoveredRequirement, setHoveredRequirement] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '01 PRECISION TOOLING',
    details: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formSectionRef = useRef(null);
  const requirementSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const requirementOptions = [
    {
      id: '01',
      title: 'PRECISION TOOLING',
      subtitle: 'Inspection gauges, concentricity checking tooling & custom jigs',
      tag: 'GAUGES & TOOLING'
    },
    {
      id: '02',
      title: 'CUSTOM FIXTURES',
      subtitle: 'Welding fixtures, hydraulic clamping & grinding holding fixtures',
      tag: 'HYDRAULIC & WELD FIXTURES'
    },
    {
      id: '03',
      title: 'MACHINING',
      subtitle: 'High-precision turning, milling, drilling & precision components',
      tag: 'PRECISION MACHINING'
    },
    {
      id: '04',
      title: 'FABRICATION',
      subtitle: 'Heavy structural steel frames, machine beds & 400A MIG assemblies',
      tag: 'HEAVY FABRICATION'
    },
    {
      id: '05',
      title: 'OTHER REQUIREMENT',
      subtitle: 'Industrial conveyors, transit trolleys, custom SPM machines & testing rigs',
      tag: 'SPM & MATERIAL HANDLING'
    }
  ];

  const handleSelectRequirement = (opt) => {
    const value = `${opt.id} ${opt.title}`;
    setSelectedRequirement(value);
    setFormData((prev) => ({ ...prev, requirement: value }));
    if (errors.requirement) {
      setErrors((prev) => ({ ...prev, requirement: '' }));
    }
    // Smoothly reveal / scroll down slightly to the enquiry form
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }
    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Please select or specify your requirement';
    }
    if (!formData.details.trim()) {
      newErrors.details = 'Please describe your project specifications or requirement details';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate authentic submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 650);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      requirement: selectedRequirement || '01 PRECISION TOOLING',
      details: ''
    });
    setErrors({});
  };

  const scrollToRequirement = () => {
    if (requirementSectionRef.current) {
      requirementSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="contact-editorial-root" style={{ backgroundColor: '#ffffff', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 01 — MINIMAL CONTACT HERO (Editorial Typography & Authentic Image) */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(110px, 14vh, 150px)',
          paddingBottom: 'clamp(60px, 8vh, 90px)',
          backgroundColor: '#fafbfc',
          borderBottom: '1px solid #e5e7eb',
          position: 'relative'
        }}
      >
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              color: '#6b7280',
              letterSpacing: '0.06em'
            }}
          >
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>HOME</Link>
            <ChevronRight size={13} color="#9ca3af" />
            <span style={{ color: '#c52227', fontWeight: 700 }}>CONTACT US</span>
          </div>

          <div
            className="contact-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'clamp(36px, 6vw, 80px)',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Asymmetrical Typography & Heading */}
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  marginBottom: '20px'
                }}
              >
                <span style={{ width: '18px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>CONTACT MAULI KRUPA</span>
              </div>

              {/* Large Editorial Heading */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(38px, 5.2vw, 68px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#0a1128',
                  margin: '0 0 24px 0',
                  textTransform: 'uppercase'
                }}
              >
                HAVE A{' '}
                <span style={{ color: '#c52227', position: 'relative', display: 'inline-block' }}>
                  REQUIREMENT?
                </span>
                <br />
                LET'S START
                <br />
                WITH THE DETAILS.
              </h1>

              {/* Subtitle Description */}
              <p
                style={{
                  fontSize: 'clamp(16px, 1.35vw, 19px)',
                  lineHeight: 1.65,
                  color: '#4b5563',
                  maxWidth: '560px',
                  margin: '0 0 36px 0',
                  fontWeight: 400
                }}
              >
                Have a tooling, fixture, machining or engineering requirement? Tell us what you are looking to build and start the conversation with our team.
              </p>

              {/* Interactive Quick Trigger */}
              <button
                onClick={scrollToRequirement}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 28px',
                  backgroundColor: '#0a1128',
                  color: '#ffffff',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c52227';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a1128';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>SELECT REQUIREMENT TYPE</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Column: Editorial Authentic Industrial Photograph */}
            <div style={{ position: 'relative' }}>
              <div
                className="hero-image-frame"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#0a1128',
                  aspectRatio: '4/3',
                  boxShadow: '0 20px 40px -15px rgba(10, 17, 40, 0.12)'
                }}
              >
                <img
                  src="/images/real_products_curated/01_fixture_making.jpg"
                  alt="Mauli Krupa Precision Works Workshop & Tooling"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 17, 40, 0.7) 0%, rgba(10, 17, 40, 0) 50%)',
                    pointerEvents: 'none'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '18px',
                    right: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    fontFamily: 'var(--font-tech)',
                    color: '#ffffff',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>PRECISION MANUFACTURING FACILITY</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>BHOSARI MIDC, PUNE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02 — DIRECT CONTACT STRIP (Clean 3-Column Editorial Strip)         */}
      {/* ========================================================================= */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          position: 'relative'
        }}
      >
        <div className="container-custom" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div
            className="contact-strip-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderLeft: '1px solid #e5e7eb',
              borderRight: '1px solid #e5e7eb'
            }}
          >
            {/* 01 CALL */}
            <div
              className="contact-strip-cell"
              style={{
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 36px)',
                borderRight: '1px solid #e5e7eb',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              <div className="cell-accent-line" />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                <span className="strip-num" style={{ color: '#111827', fontSize: '14px', transition: 'color 0.2s ease' }}>01</span>
                <span>CALL DIRECT</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                <a
                  href="tel:+919370741361"
                  className="strip-link"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(17px, 1.4vw, 20px)',
                    fontWeight: 700,
                    color: '#111827',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span>+91 9370741361</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-tech)', color: '#6b7280', fontWeight: 500 }}>Abhishek M.</span>
                </a>
                <a
                  href="tel:+919822327460"
                  className="strip-link"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(17px, 1.4vw, 20px)',
                    fontWeight: 700,
                    color: '#111827',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span>+91 9822327460</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-tech)', color: '#6b7280', fontWeight: 500 }}>Santos M.</span>
                </a>
              </div>

              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                Speak directly with our technical team about your requirement.
              </p>
            </div>

            {/* 02 EMAIL */}
            <div
              className="contact-strip-cell"
              style={{
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 36px)',
                borderRight: '1px solid #e5e7eb',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              <div className="cell-accent-line" />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                <span className="strip-num" style={{ color: '#111827', fontSize: '14px', transition: 'color 0.2s ease' }}>02</span>
                <span>EMAIL SPECIFICATIONS</span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <a
                  href="mailto:Smauli.krupa@gmail.com"
                  className="strip-link"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(17px, 1.4vw, 20px)',
                    fontWeight: 700,
                    color: '#111827',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                    display: 'inline-block',
                    transition: 'color 0.2s ease'
                  }}
                >
                  Smauli.krupa@gmail.com
                </a>
              </div>

              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                Send CAD drawings (.dwg, .step, .pdf) and project specifications.
              </p>
            </div>

            {/* 03 VISIT */}
            <div
              className="contact-strip-cell"
              style={{
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 36px)',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              <div className="cell-accent-line" />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                <span className="strip-num" style={{ color: '#111827', fontSize: '14px', transition: 'color 0.2s ease' }}>03</span>
                <span>WORKS FACILITY</span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(16px, 1.3vw, 18px)',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.35
                  }}
                >
                  Sector No. 3, Bhosari MIDC,
                  <br />
                  Pimpri-Chinchwad, Pune – 411026
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                Visit our manufacturing workshop for technical project alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03 — START WITH YOUR REQUIREMENT (Interactive Requirement Selector)*/}
      {/* ========================================================================= */}
      <section
        ref={requirementSectionRef}
        id="requirement-selector"
        style={{
          paddingTop: 'clamp(70px, 9vh, 100px)',
          paddingBottom: 'clamp(60px, 8vh, 90px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-custom">
          {/* Section Header */}
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(36px, 5vw, 54px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#c52227',
                marginBottom: '14px'
              }}
            >
              <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
              <span>STEP 01 — IDENTIFY YOUR PROJECT</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(30px, 4vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: '#0a1128',
                margin: '0 0 16px 0',
                textTransform: 'uppercase'
              }}
            >
              WHAT ARE YOU
              <br />
              LOOKING TO BUILD?
            </h2>

            <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
              Select the area closest to your requirement. This helps us understand how we can support your project and pre-configures your technical enquiry.
            </p>
          </div>

          {/* Interactive Requirement List (Large Editorial Typography Stack) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            {requirementOptions.map((opt) => {
              const isSelected = selectedRequirement.startsWith(opt.id);
              const isHovered = hoveredRequirement === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectRequirement(opt)}
                  onMouseEnter={() => setHoveredRequirement(opt.id)}
                  onMouseLeave={() => setHoveredRequirement(null)}
                  style={{
                    position: 'relative',
                    padding: 'clamp(22px, 3.2vw, 34px) 0',
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* Left Animated Red Accent Bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: '#c52227',
                      transform: isSelected ? 'scaleY(1)' : isHovered ? 'scaleY(0.6)' : 'scaleY(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Number & Title Group */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'clamp(18px, 3vw, 36px)',
                      paddingLeft: isSelected || isHovered ? '16px' : '0px',
                      transition: 'padding-left 0.25s ease'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: 'clamp(16px, 1.6vw, 22px)',
                        fontWeight: 800,
                        color: isSelected ? '#c52227' : isHovered ? '#c52227' : '#9ca3af',
                        letterSpacing: '0.04em',
                        transition: 'color 0.25s ease',
                        flexShrink: 0
                      }}
                    >
                      {opt.id}
                    </span>

                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(20px, 2.8vw, 36px)',
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          color: isSelected ? '#0a1128' : isHovered ? '#0a1128' : '#374151',
                          margin: '0 0 6px 0',
                          textTransform: 'uppercase',
                          transition: 'color 0.25s ease'
                        }}
                      >
                        {opt.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 'clamp(13px, 1.1vw, 15px)',
                          color: '#6b7280',
                          margin: 0,
                          lineHeight: 1.5
                        }}
                      >
                        {opt.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Status / Indicator Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexShrink: 0
                    }}
                  >
                    {isSelected ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          backgroundColor: 'rgba(197, 34, 39, 0.08)',
                          color: '#c52227',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          borderRadius: '2px',
                          border: '1px solid rgba(197, 34, 39, 0.2)'
                        }}
                      >
                        <Check size={13} strokeWidth={2.5} />
                        <span>ACTIVE SELECTION</span>
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: isHovered ? '#c52227' : '#9ca3af',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          transition: 'all 0.2s ease',
                          transform: isHovered ? 'translateX(4px)' : 'none'
                        }}
                      >
                        <span>SELECT</span>
                        <ArrowRight size={13} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — ENQUIRY FORM (Engineering Requirement Sheet)                 */}
      {/* ========================================================================= */}
      <section
        ref={formSectionRef}
        id="enquiry-form"
        style={{
          paddingTop: 'clamp(60px, 8vh, 90px)',
          paddingBottom: 'clamp(70px, 10vh, 110px)',
          backgroundColor: '#fafbfc',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          <div
            className="contact-form-layout-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start'
            }}
          >
            {/* Left Context & Engineering Notes */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  marginBottom: '14px'
                }}
              >
                <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>STEP 02 — SPECIFICATION SHEET</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.6vw, 44px)',
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  color: '#0a1128',
                  margin: '0 0 18px 0',
                  textTransform: 'uppercase'
                }}
              >
                TELL US
                <br />
                ABOUT THE PROJECT.
              </h2>

              <p style={{ fontSize: '15.5px', color: '#4b5563', lineHeight: 1.65, margin: '0 0 28px 0' }}>
                Fill in the details of your component, batch volume, tolerance standards, or drawing requirements. Our engineering team reviews all technical submissions strictly as per drawing parameters.
              </p>

              {/* Requirement Summary Pill */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '18px 20px',
                  borderRadius: '2px',
                  marginBottom: '28px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}
                >
                  CONFIGURED REQUIREMENT
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#c52227',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{selectedRequirement}</span>
                  <button
                    type="button"
                    onClick={scrollToRequirement}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-tech)',
                      color: '#4b5563',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: 0
                    }}
                  >
                    CHANGE
                  </button>
                </div>
              </div>

              {/* Technical Assurance Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <ShieldCheck size={17} color="#0e8a44" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13.5px', color: '#4b5563' }}>
                    <strong>Confidential Drawing Handling:</strong> All CAD files and proprietary drawings are protected under technical non-disclosure standards.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={17} color="#6b7280" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13.5px', color: '#4b5563' }}>
                    <strong>Technical Review:</strong> Direct evaluation by Abhishek Marotkar or Santos Marotkar within 24 business hours.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Open Engineering Requirement Sheet Form */}
            <div style={{ position: 'relative' }}>
              {submitted ? (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    padding: 'clamp(36px, 5vw, 56px)',
                    borderRadius: '2px',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(14, 138, 68, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    <CheckCircle2 size={26} color="#0e8a44" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#0a1128',
                      margin: '0 0 10px 0',
                      textTransform: 'uppercase'
                    }}
                  >
                    REQUIREMENT LOGGED SUCCESSFULLY
                  </h3>

                  <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                    Thank you, <strong>{formData.name}</strong>. Your requirement for <strong>{formData.requirement}</strong> has been logged. Our engineering team at Bhosari MIDC will review your specifications and contact you shortly.
                  </p>

                  <div
                    style={{
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e5e7eb',
                      padding: '16px 20px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '12.5px',
                      color: '#4b5563',
                      marginBottom: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div><strong>CLIENT:</strong> {formData.name} {formData.company ? `(${formData.company})` : ''}</div>
                    <div><strong>CONTACT:</strong> {formData.email} | {formData.phone}</div>
                    <div><strong>PROJECT CATEGORY:</strong> {formData.requirement}</div>
                  </div>

                  <button
                    onClick={handleResetForm}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#0a1128',
                      color: '#ffffff',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c52227'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0a1128'}
                  >
                    SUBMIT ANOTHER REQUIREMENT
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  {/* Field 1: YOUR NAME */}
                  <div className="open-form-group">
                    <label className="open-form-label">
                      YOUR NAME <span style={{ color: '#c52227' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Patil"
                      className={`open-form-input ${errors.name ? 'has-error' : ''}`}
                    />
                    {errors.name && <span className="open-form-error">{errors.name}</span>}
                  </div>

                  {/* Field 2: COMPANY NAME */}
                  <div className="open-form-group">
                    <label className="open-form-label">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Precision Components Pvt Ltd"
                      className="open-form-input"
                    />
                  </div>

                  {/* 2-Col Grid: EMAIL ADDRESS & PHONE NUMBER */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '24px'
                    }}
                  >
                    <div className="open-form-group">
                      <label className="open-form-label">
                        EMAIL ADDRESS <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@company.com"
                        className={`open-form-input ${errors.email ? 'has-error' : ''}`}
                      />
                      {errors.email && <span className="open-form-error">{errors.email}</span>}
                    </div>

                    <div className="open-form-group">
                      <label className="open-form-label">
                        PHONE NUMBER <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 9876543210"
                        className={`open-form-input ${errors.phone ? 'has-error' : ''}`}
                      />
                      {errors.phone && <span className="open-form-error">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Field 5: SELECTED REQUIREMENT (Dropdown / Synchronized with Section 03) */}
                  <div className="open-form-group">
                    <label className="open-form-label">
                      SELECTED REQUIREMENT <span style={{ color: '#c52227' }}>*</span>
                    </label>
                    <select
                      name="requirement"
                      value={formData.requirement}
                      onChange={(e) => {
                        handleInputChange(e);
                        setSelectedRequirement(e.target.value);
                      }}
                      className="open-form-input open-form-select"
                      style={{ cursor: 'pointer' }}
                    >
                      {requirementOptions.map((opt) => (
                        <option key={opt.id} value={`${opt.id} ${opt.title}`}>
                          {opt.id} — {opt.title} ({opt.tag})
                        </option>
                      ))}
                    </select>
                    {errors.requirement && <span className="open-form-error">{errors.requirement}</span>}
                  </div>

                  {/* Field 6: PROJECT / REQUIREMENT DETAILS */}
                  <div className="open-form-group">
                    <label className="open-form-label">
                      PROJECT / REQUIREMENT DETAILS <span style={{ color: '#c52227' }}>*</span>
                    </label>
                    <textarea
                      name="details"
                      rows={4}
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Specify tooling dimensions, material grades (e.g. EN8, Mild Steel, SS304), required tolerances, batch quantity, or CAD drawing reference..."
                      className={`open-form-input open-form-textarea ${errors.details ? 'has-error' : ''}`}
                    />
                    {errors.details && <span className="open-form-error">{errors.details}</span>}
                  </div>

                  {/* Submit Action Button */}
                  <div style={{ paddingTop: '8px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-enquiry-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '16px 36px',
                        backgroundColor: '#c52227',
                        color: '#ffffff',
                        fontFamily: 'var(--font-tech)',
                        fontSize: '14.5px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 4px 14px rgba(197, 34, 39, 0.25)'
                      }}
                    >
                      <span>{isSubmitting ? 'TRANSMITTING SPECIFICATION...' : 'SEND ENQUIRY'}</span>
                      <ArrowRight size={16} className="btn-arrow-icon" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — VISIT OUR FACILITY (Wide Map & Dark Editorial Panel)          */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(70px, 9vh, 100px)',
          paddingBottom: 'clamp(70px, 9vh, 100px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-custom">
          {/* Section Heading */}
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(32px, 4.5vw, 48px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#c52227',
                marginBottom: '14px'
              }}
            >
              <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
              <span>FACILITY & WORKS LOCATION</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(30px, 4vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: '#0a1128',
                margin: '0 0 14px 0',
                textTransform: 'uppercase'
              }}
            >
              VISIT US
              <br />
              WHERE INDUSTRY{' '}
              <span style={{ color: '#c52227' }}>MOVES FORWARD.</span>
            </h2>

            <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
              Located in Bhosari MIDC, Pune, at the centre of one of Maharashtra's important industrial areas.
            </p>
          </div>

          {/* Large Wide Map Container with Overlapping Dark Navy Editorial Panel */}
          <div
            className="facility-map-wrapper"
            style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f1f3f5'
            }}
          >
            {/* Real Interactive Google Maps Embed */}
            <div style={{ height: 'clamp(380px, 50vh, 520px)', width: '100%' }}>
              <iframe
                title="Mauli Krupa Precision Works Bhosari Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.96213038674!2d73.8427771!3d18.6253457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8003666d9c7%3A0x6fbdb1ecbe44f776!2sBhosari%20MIDC%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(15%) contrast(1.02)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Dark Navy Overlapping Editorial Information Panel */}
            <div
              className="facility-editorial-panel"
              style={{
                position: 'absolute',
                bottom: 'clamp(16px, 2.5vw, 32px)',
                left: 'clamp(16px, 2.5vw, 32px)',
                maxWidth: '440px',
                backgroundColor: '#0a1128',
                color: '#ffffff',
                padding: 'clamp(24px, 3vw, 36px)',
                borderRadius: '2px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                MANUFACTURING FACILITY
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase'
                }}
              >
                MAULI KRUPA PRECISION WORKS
              </h3>

              <div
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: '#cbd5e1',
                  marginBottom: '20px'
                }}
              >
                {COMPANY_INFO.address.line1}
                <br />
                {COMPANY_INFO.address.line2}
                <br />
                {COMPANY_INFO.address.line3} {COMPANY_INFO.address.state}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'Intelligent Cadet International School Vaishno Mata Marg Sector No 3 Bhosari Pimpri-Chinchwad Pune 411026'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#c52227',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#c52227';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — CLOSING SECTION (From Requirement to Reality)                */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(80px, 11vh, 120px)',
          paddingBottom: 'clamp(80px, 11vh, 120px)',
          backgroundColor: '#0a1128',
          color: '#ffffff',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <div className="container-custom" style={{ maxWidth: '820px' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#c52227',
              marginBottom: '18px'
            }}
          >
            <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
            <span>START THE CONVERSATION</span>
            <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
          </div>

          {/* Large Centered Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.8vw, 58px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 18px 0',
              textTransform: 'uppercase'
            }}
          >
            FROM REQUIREMENT
            <br />
            TO REALITY.
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.65,
              color: '#94a3b8',
              maxWidth: '560px',
              margin: '0 auto 36px auto'
            }}
          >
            Every project begins with a requirement. Share yours and let's start the conversation.
          </p>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={scrollToRequirement}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 32px',
                backgroundColor: '#c52227',
                color: '#ffffff',
                fontFamily: 'var(--font-tech)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 16px rgba(197, 34, 39, 0.35)'
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
              <span>START YOUR ENQUIRY</span>
              <ArrowRight size={15} />
            </button>

            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 30px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontFamily: 'var(--font-tech)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>VIEW OUR SERVICES</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Custom CSS for Contact Page Interactions */}
      <style>{`
        /* Contact Strip Hover Micro-interactions */
        .contact-strip-cell:hover {
          background-color: #fafbfc;
          transform: translateY(-2px);
        }
        .contact-strip-cell .cell-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #c52227;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-strip-cell:hover .cell-accent-line {
          transform: scaleX(1);
        }
        .contact-strip-cell:hover .strip-num {
          color: #c52227 !important;
        }
        .contact-strip-cell:hover .strip-link {
          color: #c52227 !important;
        }

        /* Open Engineering Sheet Input Styling */
        .open-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
        }
        .open-form-label {
          font-family: var(--font-tech);
          font-size: 11.5px;
          font-weight: 700;
          letterSpacing: 0.1em;
          color: #4b5563;
          text-transform: uppercase;
        }
        .open-form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #cbd5e1;
          padding: 10px 0;
          font-family: var(--font-body);
          font-size: 15.5px;
          color: #111827;
          outline: none;
          border-radius: 0;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .open-form-input:focus {
          border-bottom-color: #0a1128;
          box-shadow: 0 1px 0 0 #c52227;
        }
        .open-form-input.has-error {
          border-bottom-color: #dc2626 !important;
        }
        .open-form-error {
          font-family: var(--font-tech);
          font-size: 11px;
          color: #dc2626;
          margin-top: 4px;
        }
        .open-form-textarea {
          resize: vertical;
          min-height: 85px;
          line-height: 1.6;
        }
        .open-form-select {
          background-color: transparent;
        }

        /* Button Hover Arrow */
        .submit-enquiry-btn:hover {
          background-color: #b31b20 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(197, 34, 39, 0.35) !important;
        }
        .submit-enquiry-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }
        .btn-arrow-icon {
          transition: transform 0.2s ease;
        }

        /* Responsive Layouts */
        @media (max-width: 900px) {
          .contact-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .contact-strip-grid {
            grid-template-columns: 1fr !important;
            border-left: none !important;
            border-right: none !important;
          }
          .contact-strip-cell {
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb;
          }
          .contact-form-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .facility-editorial-panel {
            position: static !important;
            max-width: 100% !important;
            margin-top: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
