
import React from 'react';
import { ErrorIcon, SuccessIcon, InfoIcon } from './Icons.tsx';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className = '' }) => {
  const baseStyles = 'p-4 rounded-md flex items-center';
  const typeStyles = {
    success: 'bg-green-100 border border-green-400 text-green-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700',
  };
  
  const Icon = type === 'success' ? SuccessIcon : type === 'error' ? ErrorIcon : InfoIcon;

  if (!message) return null;

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${className}`} role="alert">
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};