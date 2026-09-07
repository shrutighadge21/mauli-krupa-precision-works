import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ArrowUpRight, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export default function WhyUs() {
  return (
    <section 
      id="why-us"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        background: '#08090b',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden'
      }}
    >
      <div className="container-custom">
        
        {/* Eyebrow & Main Title */}
        <div style={{ maxWidth: '880px', marginBottom: '64px' }}>
          <div className="eyebrow-label">
            <span className="eyebrow-dot" />
            <span>VALUE PROPOSITION & CLIENT TRUST</span>
          </div>

          <h2 className="section-headline">
            WHY INDUSTRY LEADERS<br />
            <span style={{ color: '#ffffff' }}>CHOOSE MAULI KRUPA.</span>
          </h2>
        </div>

        {/* Large Typographic Statement Pillars (Without Boxes) */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            marginBottom: '80px'
          }}
        >
          {COMPANY_INFO.whyUsPoints.map((point, index) => (
            <div
              key={point.keyword}
              style={{
                paddingTop: '40px',
                paddingBottom: '40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'baseline',
                transition: 'background 0.3s ease'
              }}
              className="why-us-row"
            >
              {/* Keyword Headline */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span 
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '15px',
                    color: '#ef4444',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                >
                  0{index + 1}
                </span>

                <h3 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    textTransform: 'uppercase'
                  }}
                >
                  {point.keyword}
                </h3>
              </div>

              {/* Description from PDF */}
              <div style={{ maxWidth: '560px' }}>
                <div 
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    letterSpacing: '0.04em'
                  }}
                >
                  {point.title}
                </div>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {point.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Dedicated Clients Section from PDF Page 9 */}
        <div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            <div>
              <span 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  color: '#ef4444',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                WE ARE DEDICATED TO
              </span>
              <h3 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginTop: '4px'
                }}
              >
                TRUSTED BY INDUSTRY LEADERS
              </h3>
            </div>

            <span 
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              OFFICIAL CLIENT PORTFOLIO (PDF VERIFIED)
            </span>
          </div>

          {/* Client Names Display Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {COMPANY_INFO.dedicatedClients.map((client) => (
              <div
                key={client.name}
                style={{
                  padding: '24px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197, 34, 39, 0.5)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                  {client.name}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', fontFamily: 'var(--font-tech)' }}>
                  {client.role}
                </div>
              </div>
            ))}

            {/* "And Many More" Tag */}
            <div
              style={{
                padding: '24px 20px',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '14px',
                  color: '#94a3b8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                + AND MANY MORE ACROSS MIDC PUNE
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
