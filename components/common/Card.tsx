
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', titleClassName = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl ${className}`}>
      {title && <h3 className={`text-xl font-semibold mb-4 text-[#004040] ${titleClassName}`}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
};
