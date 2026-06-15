import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isFull?: boolean;
  color?: string;
  label?: string;
  outline?: boolean; // If true, renders a transparent button with a border instead of a filled background
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  isFull,
  color = 'bg-[var(--color-primary)]',
  label,
  outline = false,
  ...props
}) => {
  const variant = outline
    ? 'border border-[var(--color-text-secondary)]/30 backdrop-blur-sm text-[var(--color-text-secondary)]'
    : `${color} text-[var(--color-card-bg)]`;

  return (
    <button
      className={`${isFull ? 'w-full' : ''} ${variant} flex min-h-16 items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition hover:scale-105 active:scale-95 cursor-pointer duration-300 whitespace-nowrap`}
      {...props}
    >
      {icon}
      {label && <span className="md:hidden lg:block">{label}</span>}
    </button>
  );
};

export default Button;
