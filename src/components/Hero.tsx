import React from 'react';

interface HeroProps {
  onScrollCue: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollCue }) => {
  return (
    <section id="hero" className="hero">
      <div className="about">
        <div className="about-intro">
          <div className="about-title-container">
            <h1 className="about-title">
              <span className="title-word-about">About</span>{' '}
              <span className="title-word-karan">
                Karan
                {/* Three Radiating Orange Sparks / Flares above 'n' in Karan */}
                <svg
                  className="about-sparks"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M4 24 L2 12" stroke="#FF6B00" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M15 24 L18 6" stroke="#FF6B00" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M26 25 L30 14" stroke="#FF6B00" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
                {/* Single Smooth Hand-Drawn Underline Stroke under Karan matching reference */}
                <svg
                  className="about-underline"
                  viewBox="0 0 170 18"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 6 8 C 50 13, 115 13, 164 6"
                    stroke="#FF6B00"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </div>

          <p className="about-body">
            I'm Karan — a Software Developer living where scalable code meets intelligent systems.{' '}
            <br className="hero-br" />
            MCA graduate passionate about crafting intuitive user experiences and engineering robust,{' '}
            <br className="hero-br" />
            high-performance systems from concept to deployment.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="scroll-cue"
        onClick={onScrollCue}
        aria-label="Scroll down to explore"
      >
        <span className="scroll-cue-label">SCROLL</span>
        <svg
          className="scroll-cue-chevron"
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2.5L8 7.5L14 2.5"
            stroke="#FF6B00"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};
