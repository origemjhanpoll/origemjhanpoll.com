import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isFull?: boolean;
  color?: string;
  label?: string;
  collapseMobile?: boolean; // If true, changes shape to circle on screens < 80rem
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  isFull,
  color = 'bg-[var(--color-primary)]',
  className = '',
  label,
  collapseMobile = false,
  ...props
}) => {
  return (
    <button
      className={`${isFull ? (collapseMobile ? 'min-[80rem]:w-full' : 'w-full') : ''} ${color} flex min-h-16 items-center justify-center gap-2 ${collapseMobile ? 'w-16 p-0 min-[80rem]:w-auto min-[80rem]:px-6 min-[80rem]:py-3' : 'px-6 py-3'} text-[var(--color-card-bg)] text-lg font-semibold rounded-full transition hover:scale-105 active:scale-95 cursor-pointer duration-300 whitespace-nowrap ${className}`}
      {...props}
    >
      {icon}
      {label && <span className={`leading-tight ${collapseMobile ? 'hidden min-[80rem]:block' : ''}`}>{label}</span>}
    </button>
  );
};

export default Button;
