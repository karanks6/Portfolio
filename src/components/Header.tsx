import React from 'react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { PERSONAL_INFO } from '../data/content';

interface HeaderProps {
  onScrollToTop: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToTop }) => {
  return (
    <header className="fixed-header">
      <div className="header-container">
        <button
          onClick={onScrollToTop}
          className="header-logo"
          aria-label="Scroll to top"
        >
          <span className="logo-name">{PERSONAL_INFO.name}</span>
          <span className="logo-badge">Portfolio</span>
        </button>

        <div className="header-actions">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn"
            aria-label="GitHub profile"
            id="nav-github"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn"
            aria-label="LinkedIn profile"
            id="nav-linkedin"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn"
            aria-label="Instagram profile"
            id="nav-instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};
