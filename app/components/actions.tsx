import React from 'react';

export const Actions: React.FC = () => {
  return (
    <section className="flex flex-row gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] p-6 rounded-3xl font-sans">
      <button className="w-full bg-[var(--color-primary)] text-[var(--color-card-bg)] text-lg font-semibold px-8 rounded-full transition hover:bg-neutral-200 hover:scale-105 active:scale-95 cursor-pointer duration-300">
        Contact me
      </button>
      <button className="bg-[var(--color-tag-bg)] text-[var(--color-primary)] text-lg font-semibold px-8 py-4 rounded-full transition hover:bg-neutral-600 hover:scale-105 active:scale-95 cursor-pointer duration-300">
        CV
      </button>
    </section>
  );
}

export default Actions;