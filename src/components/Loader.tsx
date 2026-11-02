import React from 'react';

interface LoaderProps {
  progress: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(5, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="loading-screen" role="progressbar" aria-valuenow={Math.round(progress)}>
      <div className="loading-ring">
        <svg viewBox="0 0 80 80">
          <circle
            className="lr-track"
            cx="40"
            cy="40"
            r={radius}
          />
          <circle
            className="lr-arc"
            cx="40"
            cy="40"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    </div>
  );
};
