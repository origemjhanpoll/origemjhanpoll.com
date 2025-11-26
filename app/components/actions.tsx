import React from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";

interface ListActionsProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  isFull?: boolean;
  color?: string;
}

interface ActionsProps {
  listActions: ListActionsProps[];

}

export const Actions: React.FC<ActionsProps> = ({ listActions }) => {
  return (
    <section className="flex flex-row gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans p-6">
      {listActions.map((action, index) => (
        <button
          key={index}
          onClick={() => window.open(action.url, '_blank')}
          className={`${action.isFull && 'w-full'} ${action.color || 'bg-[var(--color-primary)]'} flex min-h-16 items-center justify-center gap-2 px-6 py-3 text-[var(--color-card-bg)] text-lg font-semibold rounded-full transition hover:scale-105 active:scale-95 cursor-pointer duration-300 whitespace-nowrap`}>
          {action.icon}
          <span className="leading-tight">{action.title}</span>
        </button>
      ))}
    </section>
  );
}

export default Actions;