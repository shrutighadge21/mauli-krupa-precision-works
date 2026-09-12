import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Requested Navigation Order: HOME -> ABOUT US -> SERVICES -> GALLERY -> CONTACT US
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SERVICES', path: '/services' },
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
        
        {/* MKP Company Logo Only (Slightly increased size for prominence, perfectly centered) */}
        <Link 
          to="/" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', padding: '2px 0' }}
          aria-label="Mauli Krupa Precision Works"
        >
          <Logo size={58} theme="light" showText={false} />
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
                  fontFamily: 'var(--font-heading)',
                  fontWeight: active ? 700 : 600,
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

        {/* Right Phone Contact Link: Direct Tel Call */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="tel:+919370741361"
            className="navbar-phone-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              color: '#111827',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c52227';
              e.currentTarget.style.color = '#c52227';
              e.currentTarget.style.backgroundColor = '#fef2f2';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#111827';
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Phone size={15} color="#c52227" strokeWidth={2.2} />
            <span>+91 93707 41361</span>
          </a>

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
          className="mobile-drawer-menu"
          style={{
            position: 'fixed',
            top: 'var(--nav-height, 80px)',
            left: 0,
            right: 0,
            maxHeight: 'calc(100dvh - var(--nav-height, 80px))',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            padding: '20px 20px 32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
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
                  fontSize: '15px',
                  fontFamily: 'var(--font-heading)',
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

          <a
            href="tel:+919370741361"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 20px',
              backgroundColor: '#c52227',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: '14.5px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '4px',
              marginTop: '8px'
            }}
          >
            <Phone size={16} color="#ffffff" />
            <span>+91 93707 41361</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav-links { display: none !important; }
          .navbar-phone-btn { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
