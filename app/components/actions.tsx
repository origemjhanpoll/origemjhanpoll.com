import React from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";

export const Actions: React.FC = () => {
  return (
    <section className="flex flex-row gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] p-6 rounded-3xl font-sans">
      <button
        onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
        className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] text-[var(--color-card-bg)] text-lg font-semibold px-2 rounded-full transition hover:bg-neutral-200 hover:scale-105 active:scale-95 cursor-pointer duration-300">
        <FaWhatsapp size={24} />
        Entre em contato
      </button>
      <button className="flex items-center justify-center gap-2 bg-[var(--color-tag-bg)] text-[var(--color-primary)] text-lg font-semibold px-8 py-4 rounded-full transition hover:bg-neutral-600 hover:scale-105 active:scale-95 cursor-pointer duration-300">
        <MdOutlineFileDownload size={24} />
        CV
      </button>
    </section>
  );
}

export default Actions;