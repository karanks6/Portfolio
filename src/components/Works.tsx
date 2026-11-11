import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, Project } from '../data/content';
import { ExternalLink, X } from 'lucide-react';
import { GithubIcon } from './Icons';

interface WorksProps {
  onSelectTool?: (toolId: string) => void;
}

interface EnrichedProject extends Project {
  cardNo: string;
  category: string;
  metric?: string;
  tag: string;
}

const CARDS_DATA = [
  {
    no: '01',
    title: 'Flutter & Mobile',
    tagline: 'Cross-platform mobile apps, computer vision integration & native performance.',
    projects: [
      {
        ...PROJECTS.flutter[0],
        cardNo: '01',
        category: 'Flutter & Mobile AI',
        metric: '89.95% Acc',
        tag: 'Computer Vision & AR'
      },
      {
        ...PROJECTS.flutter[1],
        cardNo: '01',
        category: 'Vedic Astrology & Numerology',
        metric: 'Swiss Ephemeris',
        tag: 'Flutter & Dart'
      }
    ]
  },
  {
    no: '02',
    title: 'AI & Vision',
    tagline: 'Monk skin tone analysis, facial masking, GMM & colour science.',
    projects: [
      {
        ...PROJECTS.python[0],
        cardNo: '02',
        category: 'Applied AI & Python',
        metric: 'Monk Scale 1-10',
        tag: 'MediaPipe & GMM'
      }
    ]
  },
  {
    no: '03',
    title: '3D & Web',
    tagline: 'WebGL 3D experiences, Three.js shaders & interactive client interfaces.',
    projects: [
      {
        ...PROJECTS.react[0],
        cardNo: '03',
        category: 'Interactive 3D Web & Configurator',
        metric: 'Real-time WebGL',
        tag: 'Three.js & React'
      },
      {
        ...PROJECTS.react[1],
        cardNo: '03',
        category: 'Astronomical & 3D Web Experience',
        metric: 'Keplerian Physics',
        tag: 'WebGL & GLSL Shaders'
      }
    ]
  },
  {
    no: '04',
    title: 'Full Stack & APIs',
    tagline: 'MERN stack carpooling platform, database schemas & cloud architecture.',
    projects: [
      {
        ...PROJECTS.nodejs[0],
        cardNo: '04',
        category: 'Full Stack MERN',
        metric: 'Smart Matching',
        tag: 'Node.js & MongoDB'
      }
    ]
  }
];

export const Works: React.FC<WorksProps> = () => {
  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);

  // Measure track width to compute total horizontal scroll distance
  useEffect(() => {
    const updateDimensions = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const winWidth = window.innerWidth;
      const distance = Math.max(0, trackWidth - winWidth);
      setScrollDistance(distance);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Update horizontal translation and progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current || !trackRef.current) return;
      const rect = galleryRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // When the top of gallery hits 0, it scrolls until rect.bottom reaches winHeight
      const totalScrollable = Math.max(1, galleryRef.current.offsetHeight - winHeight);
      const scrolled = Math.max(0, -rect.top);
      const rawProgress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      setTrackProgress(rawProgress);

      if (window.innerWidth > 640) {
        const xOffset = rawProgress * scrollDistance;
        trackRef.current.style.transform = `translateX(-${xOffset}px)`;
      } else {
        trackRef.current.style.transform = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDistance]);

  // Modal ESC handler & body lock
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject]);

  return (
    <section id="works" className="works">
      <div
        className="wk-gallery"
        ref={galleryRef}
        style={{
          height:
            typeof window !== 'undefined' && window.innerWidth > 640
              ? `calc(100vh + ${scrollDistance}px)`
              : 'auto'
        }}
      >
        <div className="wk-gallery-sticky">
          <span className="wk-gallery-title">Works</span>

          <div className="wk-track" ref={trackRef}>
            {CARDS_DATA.map((card) => (
              <div key={card.no} className="wk-card">
                <div className="wk-card-head">
                  <span className="wk-card-no">{card.no}</span>
                  <h3 className="wk-card-title">{card.title}</h3>
                  <span className="wk-card-tagline">{card.tagline}</span>
                </div>

                <div className="wk-card-body">
                  <ul className="wk-list">
                    {card.projects.map((proj, pIdx) => (
                      <li key={pIdx} className="wk-line">
                        <button
                          type="button"
                          className="wk-line-btn"
                          onClick={() => setSelectedProject(proj)}
                          aria-label={`View details for ${proj.title}`}
                        >
                          <span className="wk-line-name">{proj.title}</span>
                          <div className="wk-line-meta">
                            {proj.metric && (
                              <span className="wk-line-num">{proj.metric}</span>
                            )}
                            <span className="wk-line-tag">{proj.tag}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Progress Bar */}
          <div className="wk-progress" aria-hidden="true">
            <div
              className="wk-progress-fill"
              style={{
                transform: `scaleX(${trackProgress})`
              }}
            />
          </div>

          {/* Keep Scrolling hint */}
          <span className="wk-hint" aria-hidden="true">
            KEEP SCROLLING
          </span>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject &&
        createPortal(
          <>
            <div
              className="wk-detail-backdrop"
              onClick={() => setSelectedProject(null)}
            />
            <div
              className="wk-detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wk-modal-title"
            >
              <button
                type="button"
                className="wk-detail-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>

              <div className="wk-detail-banner is-ph">
                <span className="wk-detail-ph-text">{selectedProject.title}</span>
              </div>

              <article className="wk-detail-article">
                <header className="wk-detail-head">
                  <h3 id="wk-modal-title" className="wk-detail-title">
                    {selectedProject.title}
                  </h3>
                  <div className="wk-detail-sub">{selectedProject.category}</div>

                  {selectedProject.stack && selectedProject.stack.length > 0 && (
                    <div className="wk-detail-tags">
                      {selectedProject.stack.map((item, sIdx) => (
                        <span key={sIdx} className="wk-badge">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div className="wk-detail-desc">
                  {selectedProject.description ||
                    'Specialized engineering project focused on high performance, clean architecture, and intuitive user experiences.'}
                </div>

                <div className="wk-detail-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wk-detail-link"
                  >
                    <GithubIcon size={16} />
                    <span>View Repository</span>
                  </a>

                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wk-detail-link"
                      style={{ borderColor: 'rgba(244, 241, 234, 0.4)', color: 'var(--ink)' }}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </article>
            </div>
          </>,
          document.body
        )}
    </section>
  );
};
