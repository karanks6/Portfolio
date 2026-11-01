import React from 'react';
import { SKILLS } from '../data/content';
import { Code, Wrench, Database } from 'lucide-react';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-container skills-section">
      <div className="section-inner skills-inner">
        <div className="section-label-pill">CAPABILITIES</div>
        
        <h2 className="section-heading">
          Technical Skills &amp; Stack
        </h2>
        <p className="skills-subtitle">
          Core proficiencies spanning system programming, full-stack frameworks, machine learning tools, and database systems.
        </p>

        <div className="skills-groups">
          {/* Languages */}
          <div className="skills-group-row">
            <div className="skills-group-header">
              <Code size={16} className="skills-group-icon" />
              <span className="skills-group-title">Languages</span>
            </div>
            <div className="skills-tags-line">
              {SKILLS.languages.map((lang, idx) => (
                <span key={idx} className="skill-pill">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Frameworks & Tools */}
          <div className="skills-group-row">
            <div className="skills-group-header">
              <Wrench size={16} className="skills-group-icon" />
              <span className="skills-group-title">Frameworks &amp; Tools</span>
            </div>
            <div className="skills-tags-line">
              {SKILLS.frameworks.map((fw, idx) => (
                <span key={idx} className="skill-pill skill-pill-framework">
                  {fw}
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="skills-group-row">
            <div className="skills-group-header">
              <Database size={16} className="skills-group-icon" />
              <span className="skills-group-title">Databases</span>
            </div>
            <div className="skills-tags-line">
              {SKILLS.databases.map((db, idx) => (
                <span key={idx} className="skill-pill skill-pill-database">
                  {db}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
