import React from 'react';

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface ExperienceItem {
  year: number;
  period: string;
  company: string;
  companyFull?: string;
  current?: boolean;
  url: string;
  logo: string;
  roles: ExperienceRole[];
}

interface ExperienceProps {
  title: string;
  yearLabel: string;
  yearsLabel: string;
  items: ExperienceItem[];
}

// A duração e o intervalo são derivados dos cargos (fonte de verdade),
// não do campo `period` da empresa — que pode estar desatualizado.
const getTenure = (item: ExperienceItem) => {
  const currentYear = new Date().getFullYear();
  const starts: number[] = [];
  const endYears: number[] = [];
  let presentLabel: string | null = null;

  for (const role of item.roles) {
    const [startRaw, endRaw] = role.period.split(/[–-]/).map((part) => part.trim());
    const start = parseInt(startRaw, 10);
    if (!Number.isNaN(start)) starts.push(start);

    const end = parseInt(endRaw ?? '', 10);
    if (Number.isNaN(end)) {
      if (endRaw) presentLabel = endRaw; // ex.: "Atual" / "Present" / "至今"
    } else {
      endYears.push(end);
    }
  }

  if (starts.length === 0) return null;

  const isCurrent = item.current || presentLabel != null;
  const start = Math.min(...starts);
  const endYear = isCurrent ? currentYear : Math.max(...endYears);
  const endLabel = isCurrent ? (presentLabel ?? String(currentYear)) : String(endYear);

  return { start, endLabel, years: Math.max(endYear - start, 1) };
};

export const Experience: React.FC<ExperienceProps> = ({ title, yearLabel, yearsLabel, items }) => {
  return (
    <section id='experience-section' className="scrollbar-custom flex flex-1 flex-col bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-4 md:p-6 2xl:p-8 md:overflow-y-auto">
      <h2 className="text-md font-medium text-[var(--color-text-secondary)] mb-6">
        {title}
      </h2>
      <ol className="relative flex flex-col">
        {[...items].reverse().map((item, index, ordered) => {
          const isLast = index === ordered.length - 1;
          const tenure = getTenure(item);
          return (
            <li
              key={item.company}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute top-14 bottom-2 left-6 -ml-px w-0 border-l-2 border-dotted border-[var(--color-text-tertiary)]"
                />
              )}

              <div className="relative z-10 shrink-0">
                <img
                  src={item.logo}
                  alt={`Logo ${item.company}`}
                  loading="lazy"
                  className="size-12 aspect-square shrink-0 rounded-xl bg-white object-contain p-1"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-t gap-x-2 gap-y-1">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold leading-tight text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-secondary)]"
                  >
                    {item.companyFull ?? item.company}
                  </a>
                </div>
                {tenure && (
                  <p className="text-sm font-light text-[var(--color-text-secondary)]">
                    {`${tenure.start} – ${tenure.endLabel}`}
                    <span className="text-[var(--color-text-tertiary)]">
                      {` · ${tenure.years} ${tenure.years === 1 ? yearLabel : yearsLabel}`}
                    </span>
                  </p>
                )}

                <ul className="mt-2 flex flex-col gap-1.5">
                  {[...item.roles].reverse().map((role) => (
                    <li key={role.period} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      {item.roles.length > 1 && <span className="shrink-0 text-sm font-light tabular-nums whitespace-nowrap text-[var(--color-text-tertiary)]">
                        {role.period}
                      </span>}
                      <span className="text-sm font-light text-[var(--color-text-secondary)]">
                        {role.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Experience;
