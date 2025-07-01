
import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg', color?: string }> = ({ size = 'md', color = 'border-brand-secondary' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex justify-center items-center my-4">
      <div 
        className={`animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]} ${color || 'border-[#004040]'}`}
        style={color ? {} : { borderColor: '#004040', borderTopColor: 'transparent' }} // Fallback if Tailwind purge removes dynamic class
      ></div>
    </div>
  );
};
