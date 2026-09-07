import React, { useEffect } from 'react';
import Services from '../components/Services';
import ContactCTA from '../components/ContactCTA';
import { ShieldCheck, FileCheck, Layers, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="services-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
      
      {/* Page Header Banner */}
      <section 
        style={{
          paddingTop: 'clamp(80px, 9vw, 120px)',
          paddingBottom: 'clamp(40px, 5vw, 60px)',
          backgroundColor: '#fafbfc',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div className="container-custom">
          <div style={{ maxWidth: '820px' }}>
            <div className="eyebrow-label" style={{ marginBottom: '14px' }}>
              <span className="eyebrow-dot" />
              <span>PRECISION MANUFACTURING & TOOLING</span>
            </div>

            <h1 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.4vw, 54px)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: '#111827',
                marginBottom: '18px',
                textTransform: 'uppercase'
              }}
            >
              Full-Spectrum Engineering Capabilities.
            </h1>

            <p 
              style={{
                fontSize: 'clamp(16px, 1.25vw, 18px)',
                lineHeight: 1.7,
                color: '#4b5563',
                margin: 0
              }}
            >
              From custom jigs and fixtures to continuous conveyor networks, heavy industrial fabrication, and turnkey special purpose machines (SPMs) built to client drawings.
            </p>
          </div>

          {/* Quick Pillars Row */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginTop: '40px',
              paddingTop: '28px',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck size={18} color="#c52227" />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#374151' }}>
                Manufactured to 2D / 3D CAD Drawings
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#0e8a44" />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#374151' }}>
                100% In-House Quality & Metrology
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={18} color="#c52227" />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#374151' }}>
                In-House Polishing & Buffing Facility
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive 6-Service Capabilities Showcase */}
      <Services />

      {/* Engineering Delivery Process Strip */}
      <section style={{ padding: '60px 0 30px', backgroundColor: '#fafbfc', borderTop: '1px solid #e5e7eb' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', fontWeight: 700, color: '#c52227', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CUSTOM TOOLING & FABRICATION
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '4px 0 0 0' }}>
                Have a customized drawing or assembly requirement?
              </h3>
            </div>

            <Link
              to="/contact"
              className="btn-primary-red"
              style={{ textDecoration: 'none' }}
            >
              <span>Submit RFQ & CAD Files</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <ContactCTA />
    </div>
  );
}
