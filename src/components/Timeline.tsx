import React from 'react';
import { TIMELINE } from '../data/content';

export const Timeline: React.FC = () => {
  return (
    <section id="resume" className="resume">
      <h2 className="resume-title">Résumé</h2>

      <div className="timeline">
        {TIMELINE.map((entry, idx) => {
          // Split description sentences into clean bullet points
          const bulletPoints = entry.description
            ? entry.description
                .split(/\.\s+/)
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

          return (
            <div key={idx} className="tl-entry">
              <div className="tl-dot" />

              <div className="tl-period">{entry.period}</div>

              <div className="tl-head">
                <h3 className="tl-place">{entry.institution}</h3>
              </div>

              <div className="tl-role">{entry.title}</div>

              {bulletPoints.length > 0 && (
                <ul className="tl-points">
                  {bulletPoints.map((pt, pIdx) => {
                    const formatted = pt.endsWith('.') ? pt : `${pt}.`;
                    return <li key={pIdx}>{formatted}</li>;
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
