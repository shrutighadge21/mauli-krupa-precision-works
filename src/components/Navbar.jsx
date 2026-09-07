import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Requested Navigation Order: HOME -> ABOUT US -> SERVICES -> INDUSTRIES -> GALLERY -> CONTACT US
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'INDUSTRIES', path: '/industries' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'CONTACT US', path: '/contact' },
  ];

  const isItemActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
        transition: 'box-shadow 0.25s ease'
      }}
    >
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* MKP Company Logo Only (No text) */}
        <Link 
          to="/" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', padding: '2px 0' }}
          aria-label="Mauli Krupa Precision Works"
        >
          <Logo size={52} theme="light" showText={false} />
        </Link>

        {/* Center Desktop Navigation Links — Dark Charcoal Text */}
        <nav 
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          className="desktop-nav-links"
        >
          {navItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link-item ${active ? 'active' : ''}`}
                style={{
                  fontSize: '15px',
                  fontFamily: 'var(--font-tech)',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#c52227' : '#1f2937',
                  padding: '8px 14px',
                  borderRadius: '3px',
                  position: 'relative',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = '#1f2937';
                }}
              >
                {item.label}
                {active && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '14px',
                      right: '14px',
                      height: '2.5px',
                      backgroundColor: '#c52227',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button: GET IN TOUCH -> /contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            to="/contact"
            className="navbar-quote-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#c52227',
              color: '#ffffff',
              fontFamily: 'var(--font-tech)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '3px',
              boxShadow: '0 3px 10px rgba(197, 34, 39, 0.25)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b31b20';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 5px 14px rgba(197, 34, 39, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c52227';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(197, 34, 39, 0.25)';
            }}
          >
            <span>GET IN TOUCH</span>
            <ArrowRight size={15} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-menu-btn"
            style={{
              padding: '8px',
              color: '#111827',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            padding: '24px 24px 32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 99
          }}
        >
          {navItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-tech)',
                  fontWeight: 600,
                  color: active ? '#c52227' : '#1f2937',
                  padding: '12px 0',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} color={active ? '#c52227' : '#94a3b8'} />
              </Link>
            );
          })}

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: '#c52227',
              color: '#ffffff',
              fontFamily: 'var(--font-tech)',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '3px',
              marginTop: '12px'
            }}
          >
            <span>CONTACT US</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav-links { display: none !important; }
          .navbar-quote-btn { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
