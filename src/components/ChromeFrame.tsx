import React from 'react';
import { PERSONAL_INFO } from '../data/content';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { NavigationDots } from './NavigationDots';
import { FileText } from 'lucide-react';

interface ChromeFrameProps {
  activeSection: string;
  scrollProgress: number;
  onNavigate: (sectionId: string) => void;
}

export const ChromeFrame: React.FC<ChromeFrameProps> = ({
  activeSection,
  scrollProgress,
  onNavigate
}) => {
  // Fade out corner frame and corner text as user scrolls past hero into resume
  const chromeFade = Math.max(0, Math.min(1, 1 - scrollProgress * 8));

  return (
    <div className="hero-chrome" aria-hidden="false">
      {/* Outer hairline frame (fades on scroll) */}
      <div className="hero-frame" style={{ opacity: chromeFade, transition: 'opacity 0.2s ease' }} />

      {/* Corner + marks (fade on scroll) */}
      <span className="hero-mark tl" style={{ opacity: chromeFade }}>+</span>
      <span className="hero-mark tr" style={{ opacity: chromeFade }}>+</span>
      <span className="hero-mark bl" style={{ opacity: chromeFade }}>+</span>
      <span className="hero-mark br" style={{ opacity: chromeFade }}>+</span>

      {/* Top-Left metadata (fades on scroll) */}
      <div
        className="hero-meta hm-tl"
        style={{ opacity: chromeFade, transition: 'opacity 0.2s ease', pointerEvents: 'none' }}
      >
        <span className="hm-name">{PERSONAL_INFO.name}</span>
        <span>{PERSONAL_INFO.role}</span>
      </div>

      {/* Bottom-Left metadata (fades on scroll) */}
      <div className="hero-meta hm-bl" style={{ opacity: chromeFade, transition: 'opacity 0.2s ease' }}>
        <span>CODE <span className="hm-orange-dot">•</span> AI <span className="hm-orange-dot">•</span> SYSTEMS</span>
      </div>

      {/* Right-Edge vertical metadata (fades on scroll) */}
      <div className="hero-meta hm-right" style={{ opacity: chromeFade, transition: 'opacity 0.2s ease' }}>
        <span className="hm-right-top-line" />
        <span className="hm-location-dot" />
        <span className="hm-location-text">BASED IN MANGALORE</span>
        <span className="hm-right-bottom-line" />
      </div>

      {/* Top-Right action links (always accessible) */}
      <div className="chrome-actions">
        <a
          href={PERSONAL_INFO.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label="GitHub Profile"
          title="GitHub Profile"
        >
          <GithubIcon size={16} />
        </a>

        <a
          href={PERSONAL_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-circle-link"
          aria-label="LinkedIn Profile"
          title="LinkedIn Profile"
        >
          <LinkedinIcon size={15} />
        </a>

        <a
          href={PERSONAL_INFO.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="social-circle-link"
          aria-label="Instagram Profile"
          title="Instagram Profile"
        >
          <InstagramIcon size={15} />
        </a>

        <a
          href={PERSONAL_INFO.socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="lang-toggle resume-toggle-btn"
          aria-label="View Resume PDF"
          title="View Resume PDF"
        >
          <FileText size={12} style={{ display: 'inline', marginRight: 4 }} />
          RESUME
        </a>
      </div>

      {/* Right-Edge vertical navigation dots (fades in as user scrolls into sections) */}
      <div style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.05) * 10)), transition: 'opacity 0.2s ease', pointerEvents: scrollProgress > 0.06 ? 'auto' : 'none' }}>
        <NavigationDots
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
