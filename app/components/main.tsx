import React from 'react';

interface MainBannerProps {
  url: string;
  title?: string;
  buttonText?: string;
}

export const Main: React.FC<MainBannerProps> = ({
  url,
  title = "Welcome",
  buttonText = "Explore",
}) => {
  return (
    <section className="relative flex flex-1 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans overflow-hidden group">
      <video
        src={url}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[var(--color-tag-bg)] opacity-20 duration-300"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight">
          {title}
        </h1>
        <button className="px-8 py-3 bg-white text-black rounded-full font-semibold text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Main;