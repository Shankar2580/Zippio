import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false, onClick }) => {
  return (
    <div
      className={clsx(
        'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl',
        hover && 'hover:bg-slate-800/70 hover:border-slate-600/50 hover:shadow-2xl transform hover:-translate-y-1 transition-all cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;