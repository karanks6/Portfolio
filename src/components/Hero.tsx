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
              About Karan
              {/* Three Radiating Orange Sparks / Flares above 'n' */}
              <svg
                className="about-sparks"
                viewBox="0 0 38 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M6 28 L2 14" stroke="#FF6B00" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M18 28 L22 8" stroke="#FF6B00" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M30 28 L36 16" stroke="#FF6B00" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </h1>

            {/* Orange Curved Underline Swoosh */}
            <svg
              className="about-swoosh"
              viewBox="0 0 180 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 7 C45 15, 125 15, 174 5"
                stroke="#FF6B00"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="about-body">
            I'm Karan — a Software Developer living where scalable code meets intelligent systems.
            MCA graduate passionate about crafting intuitive user experiences and engineering robust,
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
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 3L9 9L16 3"
            stroke="#FF6B00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};
