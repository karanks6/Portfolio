import React from 'react';
import { Mail, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/content';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="section-container contact-section">
      <div className="section-inner contact-inner">
        <div className="section-label-pill">GET IN TOUCH</div>

        <h2 className="section-heading">
          Let's Build Something Exceptional
        </h2>

        <p className="contact-subtitle">
          Open for software engineering opportunities, AI-driven applications, and full-stack backend development.
          Connect directly via any of the links below or tap the stickers on the model's cheek.
        </p>

        {/* 4 Primary destinations matching the social cheek stickers: GitHub, Instagram, Mail, Resume */}
        <div className="social-cheek-links-grid">
          {/* 1. GitHub */}
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-github"
            aria-label="GitHub profile"
          >
            <div className="contact-card-icon-box">
              <GithubIcon size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">GitHub</span>
              <span className="contact-card-val">@karanks6</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* 2. Instagram */}
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-instagram"
            aria-label="Instagram profile"
          >
            <div className="contact-card-icon-box">
              <InstagramIcon size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">Instagram</span>
              <span className="contact-card-val">@_karan_suvarna_</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* 3. Mail */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="contact-card contact-card-mail"
            aria-label={`Send email to ${PERSONAL_INFO.email}`}
          >
            <div className="contact-card-icon-box">
              <Mail size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">Email</span>
              <span className="contact-card-val">{PERSONAL_INFO.email}</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* 4. Resume */}
          <a
            href={PERSONAL_INFO.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-resume"
            aria-label="View Resume PDF"
          >
            <div className="contact-card-icon-box">
              <FileText size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">Resume</span>
              <span className="contact-card-val">Resume.pdf</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>
        </div>

        {/* Additional Profile: LinkedIn */}
        <div className="contact-secondary-row">
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-pill-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={16} />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="footer-tech">
            <Sparkles size={14} className="footer-sparkle" />
            <span>Built with React and Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
