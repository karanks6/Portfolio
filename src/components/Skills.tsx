import React from 'react';
import { SKILLS } from '../data/content';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="resume" style={{ paddingTop: '12vh', paddingBottom: '16vh' }}>
      <h2 className="resume-title">Skills &amp; Tech</h2>

      <div className="timeline" style={{ marginTop: '5vh' }}>
        {/* Languages */}
        <div className="tl-entry" style={{ paddingBottom: '8vh' }}>
          <div className="tl-dot" />
          <div className="tl-period">CORE PROFICIENCIES</div>
          <div className="tl-head">
            <h3 className="tl-place">Programming Languages</h3>
          </div>
          <div className="tl-role" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {SKILLS.languages.map((lang, idx) => (
              <span key={idx} className="wk-badge">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks & Tools */}
        <div className="tl-entry" style={{ paddingBottom: '8vh' }}>
          <div className="tl-dot" />
          <div className="tl-period">SYSTEMS &amp; LIBS</div>
          <div className="tl-head">
            <h3 className="tl-place">Frameworks &amp; Tools</h3>
          </div>
          <div className="tl-role" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {SKILLS.frameworks.map((fw, idx) => (
              <span key={idx} className="wk-badge">
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="tl-entry" style={{ paddingBottom: '4vh' }}>
          <div className="tl-dot" />
          <div className="tl-period">STORAGE &amp; CLOUD</div>
          <div className="tl-head">
            <h3 className="tl-place">Databases &amp; Services</h3>
          </div>
          <div className="tl-role" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {SKILLS.databases.map((db, idx) => (
              <span key={idx} className="wk-badge">
                {db}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
