import React from 'react';
import { MdGridView } from 'react-icons/md';
import { FaGithub, FaAndroid, FaApple } from "react-icons/fa";

export type FilterKey = 'all' | 'android' | 'ios' | 'github';

export const filterBrandLabels: Record<Exclude<FilterKey, 'all'>, string> = {
  android: 'Android',
  ios: 'iOS',
  github: 'GitHub',
};

interface ProjectsFilterProps {
  value: FilterKey;
  onChange: (filter: FilterKey) => void;
  allLabel: string;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ value, onChange, allLabel }) => {
  const options: { key: FilterKey; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: allLabel, icon: <MdGridView size={20} /> },
    { key: 'android', label: filterBrandLabels.android, icon: <FaAndroid size={20} /> },
    { key: 'ios', label: filterBrandLabels.ios, icon: <FaApple size={20} /> },
    { key: 'github', label: filterBrandLabels.github, icon: <FaGithub size={20} /> },
  ];

  return (
    <div
      role="tablist"
      className="flex w-fit max-w-full items-center gap-1 rounded-2xl bg-[var(--color-tag-bg)]/40 p-1"
    >
      {options.map((option) => {
        const isActive = value === option.key;
        return (
          <button
            key={option.key}
            role="tab"
            aria-selected={isActive}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.key)}
            className={`flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 cursor-pointer ${isActive
              ? 'bg-[var(--color-button-bg)] text-[var(--color-button-text)] shadow-sm'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectsFilter;
