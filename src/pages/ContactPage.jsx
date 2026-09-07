import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import { ChevronRight, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number (min. 10 digits)';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your requirement or inquiry';
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

    // Process submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  const mapQuery = encodeURIComponent('Mauli Krupa Precision Works, Sector No. 3, Bhosari MIDC, Pune');
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Mauli Krupa Precision Works Sector No 3 Bhosari MIDC Pune')}`;

  return (
    <div className="contact-page-root" style={{ backgroundColor: '#fafbfc', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 01 — CONTACT HERO + ENQUIRY FORM (Minimal Industrial Layout)       */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(110px, 14vh, 145px)',
          paddingBottom: 'clamp(60px, 9vh, 96px)',
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
              marginBottom: '28px',
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
            className="contact-main-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'clamp(36px, 6vw, 84px)',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Heading, Description & Minimal Open Enquiry Form */}
            <div>
              {/* Eyebrow */}
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
                  marginBottom: '16px'
                }}
              >
                <span style={{ width: '16px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>CONTACT</span>
              </div>

              {/* Large Bold Heading with single red accent */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(38px, 5.2vw, 68px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#0a1128',
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase'
                }}
              >
                LET'S BUILD
                <br />
                WITH <span style={{ color: '#c52227' }}>PRECISION.</span>
              </h1>

              {/* Short Description */}
              <p
                style={{
                  fontSize: 'clamp(15.5px, 1.25vw, 18px)',
                  lineHeight: 1.65,
                  color: '#4b5563',
                  margin: '0 0 36px 0',
                  maxWidth: '540px'
                }}
              >
                Have a requirement? Let's discuss how our precision engineering and manufacturing capabilities can support your project.
              </p>

              {/* Minimal Open Enquiry Form */}
              <div style={{ maxWidth: '540px' }}>
                {submitted ? (
                  <div
                    style={{
                      padding: '32px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '2px',
                      textAlign: 'left'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: 'rgba(14, 138, 68, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}
                    >
                      <CheckCircle2 size={24} color="#0e8a44" />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 800,
                        color: '#0a1128',
                        margin: '0 0 8px 0',
                        textTransform: 'uppercase'
                      }}
                    >
                      Enquiry Received
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                      Thank you, <strong>{formData.name}</strong>. Our engineering team at Bhosari MIDC will review your specifications and get back to you shortly.
                    </p>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#0a1128',
                        color: '#ffffff',
                        fontFamily: 'var(--font-tech)',
                        fontSize: '12.5px',
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
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {/* Field 1: YOUR NAME */}
                    <div className="minimal-form-group">
                      <label className="minimal-form-label">
                        YOUR NAME <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Patil"
                        className={`minimal-form-input ${errors.name ? 'has-error' : ''}`}
                      />
                      {errors.name && <span className="minimal-form-error">{errors.name}</span>}
                    </div>

                    {/* 2-Col: EMAIL & PHONE */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                      }}
                    >
                      <div className="minimal-form-group">
                        <label className="minimal-form-label">
                          EMAIL ADDRESS <span style={{ color: '#c52227' }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. name@company.com"
                          className={`minimal-form-input ${errors.email ? 'has-error' : ''}`}
                        />
                        {errors.email && <span className="minimal-form-error">{errors.email}</span>}
                      </div>

                      <div className="minimal-form-group">
                        <label className="minimal-form-label">
                          PHONE NUMBER <span style={{ color: '#c52227' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 9876543210"
                          className={`minimal-form-input ${errors.phone ? 'has-error' : ''}`}
                        />
                        {errors.phone && <span className="minimal-form-error">{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Field 4: MESSAGE / REQUIREMENT */}
                    <div className="minimal-form-group">
                      <label className="minimal-form-label">
                        MESSAGE / REQUIREMENT <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your tooling, fixture, machining, conveyor, or fabrication requirement..."
                        className={`minimal-form-input minimal-form-textarea ${errors.message ? 'has-error' : ''}`}
                      />
                      {errors.message && <span className="minimal-form-error">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div style={{ paddingTop: '6px' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="minimal-submit-btn"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '15px 32px',
                          backgroundColor: '#c52227',
                          color: '#ffffff',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '13.5px',
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
                        <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND ENQUIRY'}</span>
                        <ArrowRight size={15} className="btn-arrow" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Authentic Industrial Photograph & Direct Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Editorial Industrial Image (No SaaS rounded cards) */}
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#0a1128',
                  aspectRatio: '4/3',
                  boxShadow: '0 16px 36px -12px rgba(10, 17, 40, 0.1)'
                }}
              >
                <img
                  src="/images/real_products_curated/01_fixture_making.jpg"
                  alt="Mauli Krupa Precision Works Tooling & Manufacturing Facility"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.025)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 17, 40, 0.65) 0%, rgba(10, 17, 40, 0) 45%)',
                    pointerEvents: 'none'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '16px',
                    right: '16px',
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
                  <span style={{ fontWeight: 700 }}>PRECISION MANUFACTURING WORKS</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>BHOSARI MIDC, PUNE</span>
                </div>
              </div>

              {/* Minimal Clean Technical Contacts */}
              <div
                style={{
                  padding: '22px 24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#9ca3af',
                    textTransform: 'uppercase'
                  }}
                >
                  DIRECT TECHNICAL INQUIRIES
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '13.5px', color: '#4b5563' }}>Abhishek Marotkar</span>
                    <a
                      href="tel:+919370741361"
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0a1128',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c52227'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#0a1128'}
                    >
                      +91 9370741361
                    </a>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '13.5px', color: '#4b5563' }}>Santos Marotkar</span>
                    <a
                      href="tel:+919822327460"
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0a1128',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c52227'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#0a1128'}
                    >
                      +91 9822327460
                    </a>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '13.5px', color: '#4b5563' }}>Email</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#c52227',
                        textDecoration: 'none'
                      }}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02 — LOCATION MAP (Minimal Find Us Section with Genuine Business Map)*/}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(50px, 7vh, 80px)',
          paddingBottom: 'clamp(60px, 8vh, 90px)',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          {/* Minimal Section Header */}
          <div style={{ marginBottom: 'clamp(24px, 3.5vw, 36px)' }}>
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
                marginBottom: '10px'
              }}
            >
              <span style={{ width: '14px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
              <span>LOCATION</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                color: '#0a1128',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              FIND US.
            </h2>
          </div>

          {/* Clean Google Map Embed targeting MAULI KRUPA PRECISION WORKS */}
          <div
            style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f1f5f9',
              height: 'clamp(360px, 46vh, 480px)',
              width: '100%',
              marginBottom: '24px'
            }}
          >
            <iframe
              title="Mauli Krupa Precision Works Location Map"
              src={googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Minimal Verified Address Bar (Directly below map, no extra cards) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '8px'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#0a1128', textTransform: 'uppercase', marginBottom: '2px' }}>
                MAULI KRUPA PRECISION WORKS
              </div>
              <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.5 }}>
                Sector No. 3, Bhosari MIDC, Pimpri-Chinchwad, Pune – 411026, Maharashtra, India
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 22px',
                backgroundColor: '#0a1128',
                color: '#ffffff',
                fontFamily: 'var(--font-tech)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0a1128';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>GET DIRECTIONS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Embedded Component Styles */}
      <style>{`
        .minimal-form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .minimal-form-label {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: '#4b5563';
          text-transform: uppercase;
        }
        .minimal-form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #cbd5e1;
          padding: 8px 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: #111827;
          outline: none;
          border-radius: 0;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .minimal-form-input:focus {
          border-bottom-color: #0a1128;
          box-shadow: 0 1px 0 0 #c52227;
        }
        .minimal-form-input.has-error {
          border-bottom-color: #dc2626 !important;
        }
        .minimal-form-error {
          font-family: var(--font-tech);
          font-size: 11px;
          color: #dc2626;
          margin-top: 3px;
        }
        .minimal-form-textarea {
          resize: vertical;
          min-height: 70px;
          line-height: 1.55;
        }
        .minimal-submit-btn:hover {
          background-color: #b31b20 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(197, 34, 39, 0.35) !important;
        }
        .minimal-submit-btn:hover .btn-arrow {
          transform: translateX(4px);
        }
        .btn-arrow {
          transition: transform 0.2s ease;
        }

        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
        }
      `}</style>
    </div>
  );
}
