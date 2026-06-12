import React from 'react';

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface ExperienceItem {
  year: string;
  period: string;
  company: string;
  companyFull?: string;
  current?: boolean;
  url: string;
  logo: string;
  roles: ExperienceRole[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

const Tooltip: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <div className="pointer-events-none absolute top-[calc(100%+0.625rem)] left-1/2 z-20 w-max max-w-64 -translate-x-1/2 -translate-y-2 scale-95 rounded-2xl border border-white/10 bg-[var(--color-tag-bg)] px-5 py-4 opacity-0 shadow-2xl shadow-black/60 transition-all duration-300 ease-out group-hover/item:translate-y-0 group-hover/item:scale-100 group-hover/item:opacity-100">
    <p className="text-sm font-semibold leading-tight">
      {item.companyFull ?? item.company}
    </p>
    <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3">{item.period}</p>
    <ul className="flex flex-col gap-1.5">
      {item.roles.map((role) => (
        <li key={role.period} className="flex items-baseline gap-2">
          <span className="text-[10px] tabular-nums whitespace-nowrap text-[var(--color-text-tertiary)]">
            {role.period}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {role.title}
          </span>
        </li>
      ))}
    </ul>
    <span className="absolute left-1/2 bottom-full -mb-[5px] size-2.5 -translate-x-1/2 rotate-45 border-t border-l border-white/10 bg-[var(--color-tag-bg)]" />
  </div>
);

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  return (
    <section className="@container flex items-center bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-4 md:p-6 2xl:p-8">
      <div className="flex w-full flex-row">
        {items.map((item, index) => {
          const lastRole = item.roles[item.roles.length - 1];
          return (
            <div
              key={item.company}
              className="group/item relative flex flex-1 flex-col items-center cursor-default"
            >
              <Tooltip item={item} />

              <div className="min-[80rem]:mb-2 flex w-full items-center">
                <span
                  className={`h-px flex-1 ${index === 0 ? 'bg-transparent' : 'bg-white/15'}`}
                />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.companyFull ?? item.company}
                  className="relative mx-2 flex shrink-0 items-center transition-transform duration-300 group-hover/item:scale-110"
                >
                  <span className="block min-[70rem]:hidden size-2.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  <img
                    src={item.logo}
                    alt={`Logo ${item.company}`}
                    loading="lazy"
                    className="hidden min-[70rem]:block size-7 min-[80rem]:size-9 @3xl:size-10 shrink-0 aspect-square rounded-full bg-white object-contain p-1"
                  />
                </a>
                <span
                  className={`h-px flex-1 ${index === items.length - 1 ? 'bg-transparent' : 'bg-white/15'}`}
                />
              </div>

              <span className="hidden min-[80rem]:block px-1 text-center text-sm font-bold leading-tight">
                {item.company}
              </span>
              <span className="hidden min-[80rem]:block mt-0.5 px-1 text-center text-xs font-light leading-tight text-[var(--color-text-secondary)]">
                {lastRole?.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
