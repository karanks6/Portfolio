import React from 'react';

interface HeroBackdropProps {
  scrollProgress: number;
}

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ scrollProgress }) => {
  // Hero graphics fade out smoothly as user scrolls past hero into timeline
  const heroFade = Math.max(0, Math.min(1, 1 - scrollProgress * 5));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#0F172A'
      }}
    >
      {/* Hero-specific graphics (Sun Halo + Organic Wave Ribbons) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: heroFade,
          transition: 'opacity 0.25s ease-out'
        }}
      >
        {/* Top-Left Smooth Organic Dark Wave Ribbons */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(320px, 42vw, 620px)',
            height: 'clamp(260px, 40vh, 540px)',
            overflow: 'visible'
          }}
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outermost gentle dark wave */}
          <path
            d="M-20 -20 L420 -20 C320 160 180 260 0 320 L-20 320 Z"
            fill="#1E293B"
            opacity="0.55"
          />
          {/* Primary wave layer */}
          <path
            d="M-20 -20 L320 -20 C240 130 140 210 -20 260 Z"
            fill="#182232"
            opacity="0.8"
          />
          {/* Subtle wave ridge edge highlight */}
          <path
            d="M420 -20 C320 160 180 260 0 320"
            stroke="rgba(148, 163, 184, 0.12)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Bottom-Right Organic Wave Ribbon with Glowing Orange Accent */}
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 'clamp(380px, 54vw, 820px)',
            height: 'clamp(300px, 46vh, 620px)',
            overflow: 'visible'
          }}
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing Orange/Amber Gradient for Wave Ridge */}
            <linearGradient id="waveOrangeGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A380A" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#FF6B00" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF852A" stopOpacity="0.3" />
            </linearGradient>

            {/* Subtle Surface Gradient for Wave Body */}
            <linearGradient id="waveDarkBody" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#1E293B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#152030" stopOpacity="0.95" />
            </linearGradient>

            {/* Secondary lower dark wave layer */}
            <linearGradient id="waveLowerDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B1120" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#131B28" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Deeper lower wave */}
          <path
            d="M840 640 L840 290 C660 380 490 470 240 550 C140 580 40 600 -30 610 Z"
            fill="url(#waveLowerDark)"
          />

          {/* Primary Wave Body with organic S-curve */}
          <path
            d="M840 640 L840 160 C640 240 500 370 280 460 C180 500 70 540 -30 580 Z"
            fill="url(#waveDarkBody)"
          />

          {/* Radiant Glowing Orange Edge (curved S-swoop) */}
          <path
            d="M840 160 C640 240 500 370 280 460 C180 500 70 540 -30 580"
            stroke="url(#waveOrangeGlow)"
            strokeWidth="7"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 16px rgba(255, 107, 0, 0.45))' }}
          />

          {/* Crisp Inner Amber Accent */}
          <path
            d="M840 160 C640 240 500 370 280 460 C180 500 70 540 -30 580"
            stroke="#FFA84A"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        {/* Center Warm Sun / Halo Badge (Directly behind Karan's head) */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(310px, 39vw, 480px)',
            height: 'clamp(310px, 39vw, 480px)',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #A8521B 0%, #7A350F 55%, #3D1706 100%)',
            boxShadow: '0 0 65px rgba(255, 107, 0, 0.12), inset 0 2px 10px rgba(255, 166, 35, 0.2)',
            border: '1px solid rgba(255, 107, 0, 0.14)'
          }}
        />
      </div>
    </div>
  );
};
