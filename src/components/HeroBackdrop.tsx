import React from 'react';

interface HeroBackdropProps {
  scrollProgress: number;
}

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ scrollProgress }) => {
  // Hero graphics fade out smoothly as user scrolls past hero
  const heroFade = Math.max(0, Math.min(1, 1 - scrollProgress * 5));

  // Subtle alternation between deep charcoal/navy #0B1118 and secondary #101923
  let currentBg = '#0B1118';
  if (scrollProgress >= 0.16 && scrollProgress < 0.38) {
    currentBg = '#101923';
  } else if (scrollProgress >= 0.38 && scrollProgress < 0.66) {
    currentBg = '#0B1118';
  } else if (scrollProgress >= 0.66 && scrollProgress < 0.86) {
    currentBg = '#101923';
  } else {
    currentBg = '#0B1118';
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
        backgroundImage:
          currentBg === '#0B1118'
            ? 'radial-gradient(110% 85% at 50% 38%, #131E2A 0%, #0E1620 48%, #0B1118 100%)'
            : 'none',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Hero-specific graphics (Ambient Spotlight + Understated Corner Wave Ribbons) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: heroFade,
          transition: 'opacity 0.25s ease-out'
        }}
      >
        {/* Upper-Left: Large, soft, curved dark teal/navy shape with subtle boundary */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(360px, 38vw, 580px)',
            height: 'clamp(300px, 38vh, 480px)',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
          viewBox="0 0 540 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Dark Teal/Navy Front Wave Gradient */}
            <linearGradient id="tlTealFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14242F" stopOpacity="0.82" />
              <stop offset="45%" stopColor="#101D27" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#0C141C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0B1118" stopOpacity="0" />
            </linearGradient>

            {/* Understated Deep Charcoal/Navy Back Wave Gradient */}
            <linearGradient id="tlTealBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0E1722" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#0A111A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0B1118" stopOpacity="0" />
            </linearGradient>

            {/* Subtle, Low-Opacity Curved Boundary Highlight */}
            <linearGradient id="tlTealRidge" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(94, 234, 212, 0.26)" />
              <stop offset="35%" stopColor="rgba(56, 189, 248, 0.18)" />
              <stop offset="75%" stopColor="rgba(148, 163, 184, 0.10)" />
              <stop offset="100%" stopColor="rgba(148, 163, 184, 0)" />
            </linearGradient>
          </defs>

          {/* Secondary Back Dark Wave (sweeps wider, gentle curvature) */}
          <path
            d="M -20 -20 L 440 -20 C 350 70, 260 170, 165 255 C 85 330, 25 380, -20 430 Z"
            fill="url(#tlTealBackGrad)"
          />

          {/* Primary Curved Dark Teal/Navy Shape */}
          <path
            d="M -20 -20 L 320 -20 C 275 75, 205 165, 125 240 C 60 295, 15 330, -20 370 Z"
            fill="url(#tlTealFrontGrad)"
          />

          {/* Soft Blur Glow along Boundary */}
          <path
            d="M 320 -20 C 275 75, 205 165, 125 240 C 60 295, 15 330, -20 370"
            stroke="rgba(94, 234, 212, 0.14)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ filter: 'blur(5px)' }}
          />

          {/* Subtle Curved Boundary with Low Opacity */}
          <path
            d="M 320 -20 C 275 75, 205 165, 125 240 C 60 295, 15 330, -20 370"
            stroke="url(#tlTealRidge)"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.16))' }}
          />
        </svg>

        {/* Lower-Right: Overlapping organic curved shapes in dark brown/charcoal with thin subtle orange accent */}
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 'clamp(360px, 40vw, 620px)',
            height: 'clamp(280px, 38vh, 500px)',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
          viewBox="0 0 520 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Thin, Elegant Orange Highlight Gradient */}
            <linearGradient id="brSubtleOrange" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#F5A623" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#D95B00" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8A380A" stopOpacity="0.05" />
            </linearGradient>

            {/* Largest Background Wave: Dark Charcoal blending naturally */}
            <linearGradient id="brLargeShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B1F28" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#141820" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#0E1218" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0B1118" stopOpacity="0" />
            </linearGradient>

            {/* Middle Wave: Dark Charcoal-Brown */}
            <linearGradient id="brMidShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F1A1B" stopOpacity="0.92" />
              <stop offset="60%" stopColor="#151214" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0D0C0E" stopOpacity="0.5" />
            </linearGradient>

            {/* Front Wave: Deep Warm Charcoal */}
            <linearGradient id="brFrontShapeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1D1615" stopOpacity="0.96" />
              <stop offset="60%" stopColor="#140F0E" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#0B0909" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* 1. Largest Dark Wave (blends naturally into background) */}
          <path
            d="M 540 440 L 540 100 C 390 145, 240 230, 110 335 C 55 380, 15 415, -20 440 Z"
            fill="url(#brLargeShapeGrad)"
          />

          {/* Faint Boundary on Largest Wave */}
          <path
            d="M 540 100 C 390 145, 240 230, 110 335 C 55 380, 15 415, -20 440"
            stroke="rgba(148, 163, 184, 0.12)"
            strokeWidth="1.2"
          />

          {/* 2. Middle Curved Shape in Dark Brown/Charcoal */}
          <path
            d="M 540 440 L 540 160 C 400 195, 275 275, 170 355 C 115 395, 70 420, 20 440 Z"
            fill="url(#brMidShapeGrad)"
          />

          {/* 3. Front Lower Shape in Deep Charcoal-Brown */}
          <path
            d="M 540 440 L 540 215 C 410 245, 290 320, 195 380 C 145 410, 105 428, 65 440 Z"
            fill="url(#brFrontShapeGrad)"
          />

          {/* Soft Subtle Ambient Glow for Thin Orange Accent */}
          <path
            d="M 540 215 C 410 245, 290 320, 195 380 C 145 410, 105 428, 65 440"
            stroke="url(#brSubtleOrange)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.32"
            style={{ filter: 'blur(4px)' }}
          />

          {/* Thin, Elegant Orange Highlight along Curved Boundary */}
          <path
            d="M 540 215 C 410 245, 290 320, 195 380 C 145 410, 105 428, 65 440"
            stroke="url(#brSubtleOrange)"
            strokeWidth="2.0"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.35))' }}
          />
        </svg>

        {/* Character Lighting: Soft, Warm Ambient Radial Spotlight (Cinematic Studio Lighting) */}
        {/* Outer diffused warm illumination fading into dark background */}
        <div
          style={{
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(480px, 52vw, 720px)',
            height: 'clamp(480px, 52vw, 720px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(194, 91, 34, 0.48) 0%, rgba(150, 72, 30, 0.32) 26%, rgba(115, 56, 30, 0.22) 48%, rgba(60, 35, 28, 0.05) 68%, rgba(11, 17, 24, 0) 86%)',
            filter: 'blur(34px)',
            pointerEvents: 'none'
          }}
        />

        {/* Inner softer warm core for subtle silhouette separation */}
        <div
          style={{
            position: 'absolute',
            top: '33.5%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(340px, 36vw, 500px)',
            height: 'clamp(340px, 36vw, 500px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(194, 91, 34, 0.36) 0%, rgba(115, 56, 30, 0.18) 42%, rgba(60, 35, 28, 0.04) 66%, rgba(11, 17, 24, 0) 84%)',
            filter: 'blur(18px)',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};
