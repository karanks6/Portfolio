import React from 'react';
import { Mail, FileText } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/content';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="resume" style={{ paddingTop: '10vh', paddingBottom: '18vh' }}>
      <h2 className="resume-title">Contact</h2>

      <div className="timeline" style={{ marginTop: '5vh' }}>
        <div className="tl-entry" style={{ paddingBottom: '6vh' }}>
          <div className="tl-dot" />
          <div className="tl-period">LET'S CONNECT</div>
          <div className="tl-head">
            <h3 className="tl-place">Get In Touch</h3>
          </div>
          <div className="tl-role" style={{ color: 'var(--muted)', marginTop: '8px', lineHeight: 1.6 }}>
            {PERSONAL_INFO.about}
          </div>

          <div className="tl-logos" style={{ marginTop: '24px' }}>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tl-logo"
              title="GitHub"
              aria-label="GitHub profile"
            >
              <GithubIcon size={20} />
            </a>

            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tl-logo"
              title="LinkedIn"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={19} />
            </a>

            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="tl-logo"
              title="Instagram"
              aria-label="Instagram profile"
            >
              <InstagramIcon size={19} />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="tl-logo"
              title="Email"
              aria-label={`Send email to ${PERSONAL_INFO.email}`}
            >
              <Mail size={19} />
            </a>

            <a
              href={PERSONAL_INFO.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="tl-logo"
              title="Resume PDF"
              aria-label="Download Resume"
            >
              <FileText size={19} />
            </a>
          </div>

          <div style={{ marginTop: '28px', fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.04em' }}>
            Email:{' '}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="about-link"
              style={{ color: '#ffd9b3', marginLeft: '6px' }}
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="tl-entry" style={{ paddingBottom: '0' }}>
          <div className="tl-dot" />
          <div className="tl-period">LOCATION &amp; COPYRIGHT</div>
          <div className="tl-head">
            <h3 className="tl-place">{PERSONAL_INFO.location}</h3>
          </div>
          <div className="tl-role" style={{ marginTop: '8px', fontSize: '13px', color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
