import React from 'react';

interface LoaderProps {
  progress: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress }) => {
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="loader-overlay">
      <div className="loader-card">
        <div className="loader-brand">
          <span className="loader-dot" />
          <span className="loader-title">Karan S Suvarna</span>
        </div>

        <p className="loader-status">
          Loading 3D Experience...
        </p>

        <div className="loader-progress-track">
          <div
            className="loader-progress-bar"
            style={{ width: `${roundedProgress}%` }}
          />
        </div>

        <div className="loader-info">
          <span className="loader-label">Preparing 3D Avatar</span>
          <span className="loader-percent">{roundedProgress}%</span>
        </div>
      </div>
    </div>
  );
};
