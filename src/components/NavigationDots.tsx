import React from 'react';

interface NavigationDotsProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'resume', label: 'Résumé' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' }
];

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  activeSection,
  onNavigate
}) => {
  return (
    <nav className="nav-dots" aria-label="Page section navigation">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => onNavigate(sec.id)}
            className={`nav-dot-btn ${isActive ? 'is-active' : ''}`}
            aria-label={`Jump to ${sec.label}`}
            title={sec.label}
          >
            <span className="nav-dot-core" />
            {isActive && <span className="nav-dot-ring" />}
          </button>
        );
      })}
    </nav>
  );
};
