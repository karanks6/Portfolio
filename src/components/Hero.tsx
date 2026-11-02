import React from 'react';

interface HeroProps {
  onScrollCue: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollCue }) => {
  return (
    <section id="hero" className="hero">
      <div className="about">
        <div className="about-intro">
          <h1 className="about-title">About Karan</h1>
          <p className="about-body">
            I'm Karan — a Flutter + AI builder living where scalable code meets intelligent systems.
            MCA graduate passionate about crafting intuitive user experiences and engineering robust, high-performance systems from concept to deployment.
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
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </button>
    </section>
  );
};
