import React from 'react';

export default function Logo({ size = 48, className = '', theme = 'light', showText = true }) {
  const isDark = theme === 'dark';
  const frameColor = isDark ? '#ffffff' : '#111827';
  const titleColor = isDark ? '#ffffff' : '#111827';
  const subtitleColor = isDark ? '#9ca3af' : '#4b5563';

  return (
    <div 
      className={`mkp-brand-logo ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        userSelect: 'none'
      }}
      aria-label="Mauli Krupa Precision Works"
    >
      {/* Monogram Square Emblem */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          aspectRatio: '1 / 1',
          lineHeight: 0,
          flexShrink: 0
        }}
      >
        <svg 
          viewBox="0 0 1000 1000" 
          width="100%" 
          height="100%" 
          style={{ width: '100%', height: '100%', display: 'block' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Square Frame */}
          <rect x="95" y="90" width="810" height="810" stroke={frameColor} strokeWidth="28" fill="none" />

          {/* Left Red Vertical Line */}
          <rect x="170" y="150" width="28" height="545" fill="#c52227" />
          {/* Horizontal Bottom Red Baseline */}
          <rect x="170" y="675" width="625" height="28" fill="#c52227" />

          {/* Monogram MKPW Red Lettering */}
          {/* Letter M */}
          <g fill="#c52227">
            <path d="M 225 210 L 255 210 L 255 410 L 225 410 Z" />
            <path d="M 220 205 L 295 205 L 295 218 L 220 218 Z" />
            <path d="M 220 402 L 305 402 L 305 415 L 220 415 Z" />
            <path d="M 255 210 L 340 375 L 348 375 L 430 210 L 400 210 L 344 325 L 285 210 Z" />
            <path d="M 335 402 L 405 402 L 405 415 L 335 415 Z" />
          </g>

          {/* Letter K */}
          <g fill="#c52227">
            <path d="M 395 205 L 455 205 L 455 218 L 440 218 L 440 402 L 455 402 L 455 415 L 395 415 L 395 402 L 412 402 L 412 218 L 395 218 Z" />
            <path d="M 440 310 L 575 205 L 610 205 L 610 218 L 595 218 L 485 305 L 620 402 L 620 415 L 565 415 L 452 328 Z" />
          </g>

          {/* Letter P */}
          <g fill="#c52227">
            <path d="M 395 410 L 455 410 L 455 423 L 440 423 L 440 615 L 455 615 L 455 628 L 395 628 L 395 615 L 412 615 L 412 423 L 395 423 Z" />
            <path d="M 440 410 C 560 410 590 445 590 485 C 590 525 560 558 440 558 L 440 535 C 530 535 558 515 558 485 C 558 455 530 433 440 433 Z" />
          </g>

          {/* Letter W connected Chevron */}
          <g fill="#c52227">
            <path d="M 470 625 L 590 540 L 640 620 L 760 620 L 760 628 L 630 628 L 590 565 L 480 628 Z" />
          </g>

          {/* Letter I */}
          <g fill="#c52227">
            <rect x="675" y="402" width="85" height="15" />
            <rect x="705" y="415" width="26" height="200" />
            <rect x="675" y="615" width="85" height="15" />
          </g>

          {/* Two Green Accent Underline Bars */}
          <rect x="295" y="725" width="500" height="30" rx="2" fill="#0e8a44" />
          <rect x="420" y="774" width="375" height="30" rx="2" fill="#0e8a44" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.1 }}>
          <span 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: `${Math.round(size * 0.36)}px`,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: titleColor,
              textTransform: 'uppercase'
            }}
          >
            MAULI KRUPA
          </span>
          <span 
            style={{ 
              fontFamily: 'var(--font-tech)',
              fontSize: `${Math.round(size * 0.22)}px`,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: subtitleColor,
              textTransform: 'uppercase',
              marginTop: '2px'
            }}
          >
            PRECISION WORKS
          </span>
        </div>
      )}
    </div>
  );
}
