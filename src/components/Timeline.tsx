import React from 'react';
import { TIMELINE } from '../data/content';
import { Calendar, GraduationCap, Briefcase } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="section-container timeline-section">
      <div className="section-inner timeline-inner">
        <div className="section-label-pill">JOURNEY</div>
        
        <h2 className="section-heading">
          Education &amp; Experience
        </h2>

        <div className="timeline-track">
          {TIMELINE.map((entry, idx) => {
            const isInternship = entry.title.toLowerCase().includes('intern');
            return (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot">
                    {isInternship ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                  </div>
                  {idx < TIMELINE.length - 1 && <div className="timeline-line" />}
                </div>

                <div className="timeline-body">
                  <div className="timeline-date-badge">
                    <Calendar size={12} />
                    <span>{entry.period}</span>
                  </div>

                  <h3 className="timeline-title">{entry.title}</h3>
                  <h4 className="timeline-institution">{entry.institution}</h4>

                  {entry.description && (
                    <p className="timeline-desc">{entry.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
