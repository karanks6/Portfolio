import React from 'react';
import { MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/content';

interface HeroProps {
  onScrollCue: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollCue }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <MapPin size={13} className="hero-badge-icon" />
          <span>{PERSONAL_INFO.location}</span>
          <span className="hero-badge-separator">•</span>
          <span className="hero-status">
            <span className="status-dot"></span> Available for Hire
          </span>
        </div>

        <h1 className="hero-title">{PERSONAL_INFO.name}</h1>

        <div className="hero-role-wrapper">
          <Sparkles size={16} className="role-sparkle" />
          <h2 className="hero-role">{PERSONAL_INFO.role}</h2>
        </div>

        <p className="hero-intro">{PERSONAL_INFO.subtitle}</p>

        <div className="hero-cue-wrapper">
          <button
            onClick={onScrollCue}
            className="scroll-cue-btn"
            aria-label="Scroll down to explore"
            id="hero-scroll-cue"
          >
            <span className="scroll-cue-text">SCROLL TO EXPLORE</span>
            <span className="scroll-cue-icon">
              <ChevronDown size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
