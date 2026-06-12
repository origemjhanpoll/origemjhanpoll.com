import React from 'react';
import { GeometricBackground } from './geometric-background';

interface MainBannerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Main: React.FC<MainBannerProps> = (props: MainBannerProps) => {
  return (
    <section className="relative flex flex-1 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans overflow-hidden group">
      <GeometricBackground className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_2s_ease-in_forwards]" />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-card-bg)] to-transparent pointer-events-none"></div>

      <div className="absolute inset-0 opacity-0 min-[70rem]:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-end gap-2 p-6 2xl:p-8 pointer-events-none min-[70rem]:pointer-events-auto">
        <h1 className="text-2xl min-[80rem]:text-3xl font-bold text-white text-center tracking-tight animate-[slideUp_0.6s_ease-out] transition-all">
          {props.title}
        </h1>
        {props.description && (
          <p className="font-light text-sm min-[80rem]:text-lg text-[var(--color-text-secondary)] text-center max-w-3xl leading-tight animate-[slideUp_0.6s_ease-out_0.2s_backwards] trasation-all">
            {props.description}
          </p>
        )}
        {props.children && (
          <div className="mt-5 animate-[slideUp_0.6s_ease-out_0.3s_backwards]">
            {props.children}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Main;