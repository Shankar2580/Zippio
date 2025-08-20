import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showLabel = true,
  animated = true
}) => {
  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-300">Progress</span>
          <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={clsx(
            'h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 ease-out',
            animated && 'animate-pulse'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;