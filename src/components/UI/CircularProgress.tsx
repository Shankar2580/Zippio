import React from 'react';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-700/50"
        />
        
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))'
          }}
        />
      </svg>
      
      {/* Percentage text with glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-2xl font-bold text-white drop-shadow-lg transition-transform duration-300"
          style={{
            transform: `scale(${1 + (progress / 100) * 0.1})`
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Animated glow effect when progress is high */}
      {progress > 80 && (
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" />
      )}
    </div>
  );
};

export default CircularProgress;
