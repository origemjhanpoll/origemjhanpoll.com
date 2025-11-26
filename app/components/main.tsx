import React from 'react';

interface MainBannerProps {
  url: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}

export const Main: React.FC<MainBannerProps> = (props: MainBannerProps) => {
  return (
    <section className="relative flex flex-1 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans overflow-hidden group">
      <video
        src={props.url}
        className="w-full h-full object-cover opacity-0 animate-[fadeIn_2s_ease-in_forwards]"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-bg)] via-[var(--color-card-bg)]/60 to-[var(--color-card-bg)]/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight animate-[slideUp_0.6s_ease-out]">
          {props.title}
        </h1>
        {props.description && (
          <p className="text-lg md:text-xl font-light text-white text-center max-w-3xl animate-[slideUp_0.6s_ease-out_0.2s_backwards]">
            {props.description}
          </p>
        )}
        {props.buttonText && (
          <button
            onClick={props.onClick}
            className="px-8 py-3 mt-5 min-h-16 bg-white text-black rounded-full font-semibold text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer duration-300 animate-[slideUp_0.6s_ease-out_0.3s_backwards]">
            {props.buttonText}
          </button>
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