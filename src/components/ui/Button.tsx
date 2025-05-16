import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };
  
  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 disabled:bg-purple-800/50',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 disabled:bg-teal-800/50',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 disabled:bg-emerald-800/50',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 disabled:bg-rose-800/50',
    outline: 'border border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-500',
  };
  
  const classes = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    ${className}
  `;
  
  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

export default Button