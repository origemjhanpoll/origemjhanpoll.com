import React from 'react';

export const Actions: React.FC = () => {
  return (
    <section className="flex flex-row gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] p-4 rounded-3xl font-sans">
      <button className="w-full bg-white text-black font-semibold px-8 rounded-full transition hover:bg-neutral-200 cursor-pointer">
        Contact me
      </button>
      <button className="bg-neutral-700 text-white font-semibold px-8 py-4 rounded-full transition hover:bg-neutral-600 cursor-pointer">
        CV
      </button>
    </section>
  );
}

export default Actions;