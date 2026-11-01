import React from 'react';
import { PERSONAL_INFO } from '../data/content';
import { Code2, Server, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-container about-section">
      <div className="section-inner about-inner">
        <div className="section-label-pill">ABOUT</div>
        
        <h2 className="section-heading">
          Engineering Scalable Code &amp; Intelligent Experiences
        </h2>

        <p className="about-text">
          {PERSONAL_INFO.about}
        </p>

        <div className="about-pillars">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Code2 size={20} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Client &amp; Mobile Systems</h3>
              <p className="pillar-desc">
                High-performance Flutter apps and modern web interfaces engineered with fluid reactivity.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Server size={20} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Robust Backend Architecture</h3>
              <p className="pillar-desc">
                Scalable APIs, database schemas, and microservices in Python, Node.js, and Spring Boot.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Cpu size={20} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Applied AI &amp; Vision</h3>
              <p className="pillar-desc">
                Computer vision, classification models, colour science, and ML pipelines integrated into production workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
