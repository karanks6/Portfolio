import React from 'react';

interface HeroBackdropProps {
  scrollProgress: number;
}

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ scrollProgress }) => {
  // Hero graphics (sun halo and corner wave ribbons) fade out smoothly as user scrolls past hero
  const heroFade = Math.max(0, Math.min(1, 1 - scrollProgress * 5));

  // Alternate section backgrounds between #0F172A and #151F2C based on scroll position:
  // 0.00 - 0.16: Hero (#0F172A)
  // 0.16 - 0.38: Resume (#151F2C)
  // 0.38 - 0.66: Works (#0F172A)
  // 0.66 - 0.86: Skills (#151F2C)
  // 0.86 - 1.00: Contact (#0F172A)
  let currentBg = '#0F172A';
  if (scrollProgress >= 0.16 && scrollProgress < 0.38) {
    currentBg = '#151F2C';
  } else if (scrollProgress >= 0.38 && scrollProgress < 0.66) {
    currentBg = '#0F172A';
  } else if (scrollProgress >= 0.66 && scrollProgress < 0.86) {
    currentBg = '#151F2C';
  } else {
    currentBg = '#0F172A';
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: currentBg,
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Hero-specific graphics (Sun Spotlight + Corner Wave Ribbons) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: heroFade,
          transition: 'opacity 0.25s ease-out'
        }}
      >
        {/* Top-Left Organic Dark Wave Ribbon */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(340px, 36vw, 540px)',
            height: 'clamp(280px, 36vh, 460px)',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
          viewBox="0 0 540 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Front Wave Gradient */}
            <linearGradient id="tlFrontWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#162232" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
            </linearGradient>

            {/* Back Wave Gradient */}
            <linearGradient id="tlBackWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16202E" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#111824" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.1" />
            </linearGradient>

            {/* Delicate Ridge Highlight Gradient */}
            <linearGradient id="tlRidgeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(229, 231, 235, 0.4)" />
              <stop offset="40%" stopColor="rgba(148, 163, 184, 0.3)" />
              <stop offset="80%" stopColor="rgba(148, 163, 184, 0.12)" />
              <stop offset="100%" stopColor="rgba(148, 163, 184, 0)" />
            </linearGradient>
          </defs>

          {/* Secondary Back Dark Wave (sweeps wider) */}
          <path
            d="M -20 -20 L 420 -20 C 340 70, 260 170, 170 250 C 90 320, 30 370, -20 420 Z"
            fill="url(#tlBackWaveGrad)"
          />

          {/* Primary Wave Body (sweeping down-left from top edge to left edge with organic curve) */}
          <path
            d="M -20 -20 L 310 -20 C 270 70, 210 160, 130 230 C 65 285, 20 320, -20 360 Z"
            fill="url(#tlFrontWaveGrad)"
          />

          {/* Soft Glow behind Ridge Highlight */}
          <path
            d="M 310 -20 C 270 70, 210 160, 130 230 C 65 285, 20 320, -20 360"
            stroke="rgba(148, 163, 184, 0.25)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ filter: 'blur(5px)' }}
          />

          {/* Luminous Ridge Light along Primary Wave Crest */}
          <path
            d="M 310 -20 C 270 70, 210 160, 130 230 C 65 285, 20 320, -20 360"
            stroke="url(#tlRidgeGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 10px rgba(148, 163, 184, 0.3))' }}
          />
        </svg>

        {/* Bottom-Right Organic Wave Ribbon with Glowing Orange Accent */}
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 'clamp(320px, 34vw, 500px)',
            height: 'clamp(240px, 30vh, 400px)',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing Orange Gradient for Wave Ridge */}
            <linearGradient id="brOrangeGlow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="1" />
              <stop offset="35%" stopColor="#F5A623" stopOpacity="1" />
              <stop offset="75%" stopColor="#FF7A1A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#B84800" stopOpacity="0.2" />
            </linearGradient>

            {/* Subtle Gradient for Wave Bodies */}
            <linearGradient id="brBackWaveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#162232" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#101724" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="brFrontWaveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A202E" stopOpacity="0.98" />
              <stop offset="60%" stopColor="#141926" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0E121C" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Upper / Back Dark Slate Wave (bowing convex towards center) */}
          <path
            d="M 520 420 L 520 150 C 400 180, 260 250, 150 330 C 90 375, 40 405, 0 420 Z"
            fill="url(#brBackWaveGrad)"
          />

          {/* Crest Highlight on Back Wave */}
          <path
            d="M 520 150 C 400 180, 260 250, 150 330 C 90 375, 40 405, 0 420"
            stroke="rgba(148, 163, 184, 0.24)"
            strokeWidth="1.6"
          />

          {/* Lower / Front Wave Body (bowing convex towards center) */}
          <path
            d="M 520 420 L 520 240 C 420 260, 310 320, 220 375 C 180 400, 140 414, 110 420 Z"
            fill="url(#brFrontWaveGrad)"
          />

          {/* Outer Orange Ambient Glow */}
          <path
            d="M 520 240 C 420 260, 310 320, 220 375 C 180 400, 140 414, 110 420"
            stroke="url(#brOrangeGlow)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.4"
            style={{ filter: 'blur(6px)' }}
          />

          {/* Radiant Glowing Orange Edge */}
          <path
            d="M 520 240 C 420 260, 310 320, 220 375 C 180 400, 140 414, 110 420"
            stroke="url(#brOrangeGlow)"
            strokeWidth="3.8"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 16px rgba(255, 107, 0, 0.65))' }}
          />

          {/* Crisp Inner Golden-Amber Accent */}
          <path
            d="M 520 240 C 420 260, 310 320, 220 375 C 180 400, 140 414, 110 420"
            stroke="#FFAE53"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        {/* Character Spotlight: Subtle, warm illumination behind the character to separate from background */}
        <div
          style={{
            position: 'absolute',
            top: '44.5%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(310px, 38vw, 470px)',
            height: 'clamp(310px, 38vw, 470px)',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #9E4D1B 0%, #78350F 55%, #3D1706 100%)',
            boxShadow: '0 0 85px rgba(255, 107, 0, 0.16), 0 0 30px rgba(245, 166, 35, 0.12), inset 0 2px 12px rgba(245, 166, 35, 0.22)',
            border: '1px solid rgba(255, 107, 0, 0.15)'
          }}
        />
      </div>
    </div>
  );
};
