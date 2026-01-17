import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-8 py-3 uppercase tracking-widest text-xs font-bold transition-all duration-300 ease-in-out';

  const variants = {
    primary:
      'bg-studio-black text-white hover:bg-studio-gold hover:text-white border border-transparent',
    outline:
      'bg-transparent text-studio-black border border-studio-black hover:bg-studio-black hover:text-white',
    ghost:
      'bg-transparent text-studio-black hover:text-studio-gold underline decoration-1 underline-offset-4',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
