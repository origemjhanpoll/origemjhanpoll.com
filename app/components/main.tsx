import React from 'react';
import { GeometricBackground } from './geometric-background';

interface MainBannerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Main: React.FC<MainBannerProps> = (props: MainBannerProps) => {
  return (
    <section className="flex flex-1 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans overflow-hidden group relative">
      <GeometricBackground className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_2s_ease-in_forwards]" />

      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-2 p-6 2xl:p-8 pointer-events-none">
        <h1 className="md:hidden lg:block text-2xl 2xl:text-4xl font-bold text-white text-center tracking-tight animate-[slideUp_0.6s_ease-out] transition-all">
          {props.title && props.title}
        </h1>
        {props.description && (
          <p className="md:hidden lg:block font-light text-sm min-[80rem]:text-lg text-[var(--color-text-secondary)] text-center max-w-3xl leading-tight animate-[slideUp_0.6s_ease-out_0.2s_backwards]">
            {props.description}
          </p>
        )}
        {props.children && (
          <div className="flex flex-wrap justify-center gap-4 mt-5 animate-[slideUp_0.6s_ease-out_0.3s_backwards] pointer-events-auto">
            {props.children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;