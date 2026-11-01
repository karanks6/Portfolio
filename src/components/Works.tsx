import React from 'react';
import { PROJECTS, Project } from '../data/content';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface WorksProps {
  onSelectTool?: (toolId: string) => void;
}

const TOOL_META = {
  flutter: {
    name: 'Flutter',
    badge: 'Mobile & Multiplatform',
    color: '#02569B',
    accentBorder: 'rgba(2, 86, 155, 0.35)',
    description: 'Cross-platform mobile interfaces, computer vision integration, and native performance.'
  },
  python: {
    name: 'Python',
    badge: 'AI & Data Science',
    color: '#3776AB',
    accentBorder: 'rgba(55, 118, 171, 0.35)',
    description: 'Machine learning pipelines, facial analysis, color science, and intelligent backend services.'
  },
  react: {
    name: 'React.js',
    badge: '3D Web & Interactive',
    color: '#61DAFB',
    accentBorder: 'rgba(97, 218, 251, 0.35)',
    description: 'Rich client experiences, Three.js 3D web applications, and modular interfaces.'
  },
  nodejs: {
    name: 'Node.js',
    badge: 'Full Stack & APIs',
    color: '#339933',
    accentBorder: 'rgba(51, 153, 51, 0.35)',
    description: 'RESTful architectures, real-time messaging, database integrations, and cloud deployments.'
  }
};

export const Works: React.FC<WorksProps> = ({ onSelectTool }) => {
  const tools: Array<'flutter' | 'python' | 'react' | 'nodejs'> = [
    'flutter',
    'python',
    'react',
    'nodejs'
  ];

  return (
    <div id="works" className="works-container">
      {/* Works Intro Section */}
      <section id="works-intro" className="section-container works-intro-section">
        <div className="section-inner">
          <div className="section-label-pill">FEATURED WORK</div>
          <h2 className="section-heading">
            Organised by Tool &amp; Technology
          </h2>
          <p className="works-intro-text">
            Each project is grouped directly under the tool sticker baked onto the avatar's cheek.
            Explore the subsections below or tap a tool sticker on the model to glide straight to its projects.
          </p>

          <div className="tool-quick-nav">
            {tools.map((tool) => (
              <button
                key={tool}
                onClick={() => onSelectTool && onSelectTool(`works-${tool}`)}
                className="tool-nav-pill"
                style={{ borderColor: TOOL_META[tool].accentBorder }}
                aria-label={`Jump to ${TOOL_META[tool].name} projects`}
              >
                <span
                  className="tool-pill-dot"
                  style={{ backgroundColor: TOOL_META[tool].color }}
                />
                <span>{TOOL_META[tool].name}</span>
                <span className="tool-pill-count">{PROJECTS[tool].length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Subsections in exact required order: Flutter, Python, React.js, Node.js */}
      {tools.map((tool) => {
        const meta = TOOL_META[tool];
        const projectList = PROJECTS[tool];

        return (
          <section
            key={tool}
            id={`works-${tool}`}
            className={`section-container tool-section tool-section-${tool}`}
          >
            <div className="section-inner tool-section-inner">
              <div className="tool-header">
                <div
                  className="tool-badge-pill"
                  style={{
                    borderColor: meta.accentBorder,
                    color: meta.color
                  }}
                >
                  <Layers size={13} />
                  <span>{meta.badge}</span>
                </div>
                <h3 className="tool-section-title">
                  {meta.name} <span className="title-muted">Projects</span>
                </h3>
                <p className="tool-section-desc">{meta.description}</p>
              </div>

              <div className="projects-grid">
                {projectList.map((proj: Project, pIdx: number) => (
                  <article key={pIdx} className="project-card">
                    <div className="project-header">
                      <div className="project-title-row">
                        <Sparkles size={16} className="project-sparkle" />
                        <h4 className="project-title">{proj.title}</h4>
                      </div>
                      <span className="project-tool-tag">{meta.name}</span>
                    </div>

                    {proj.description && (
                      <p className="project-description">{proj.description}</p>
                    )}

                    {proj.stack && proj.stack.length > 0 && (
                      <div className="project-stack">
                        {proj.stack.map((item, sIdx) => (
                          <span key={sIdx} className="stack-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="project-actions">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project btn-github"
                        aria-label={`GitHub repository for ${proj.title}`}
                      >
                        <GithubIcon size={15} />
                        <span>GitHub</span>
                      </a>

                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-project btn-live"
                          aria-label={`Live Demo for ${proj.title}`}
                        >
                          <ExternalLink size={15} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
