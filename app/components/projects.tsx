import React, { useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { FaGithub } from "react-icons/fa";
import { useOgImage } from '~/hooks/use_og_image';
import ProjectsFilter, { type FilterKey, filterBrandLabels } from './projects-filter';

interface ProjectsProps {
  professionalProjects: Project[];
  personalProjects: Project[];
  titleProfessional: string;
  titlePersonal: string;
  allLabel: string;
  noResultsLabel: string;
  selectedProject?: Project | null;
  onClick?: (project: Project) => void;
}

interface Project {
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  github?: string | null;
  playstore?: string | null;
  appstore?: string | null;
  technologies?: string[];
  images?: string[];
  year?: number;
  types?: string[];
}

const matchesFilter = (project: Project, filter: FilterKey): boolean => {
  switch (filter) {
    case 'android':
      return !!project.playstore;
    case 'ios':
      return !!project.appstore;
    case 'github':
      return !!project.github;
    default:
      return true;
  }
};

const Projects: React.FC<ProjectsProps> = (props) => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const professionalProjects = props.professionalProjects.filter((project) => matchesFilter(project, filter));
  const personalProjects = props.personalProjects.filter((project) => matchesFilter(project, filter));
  const filteredProjects = [...professionalProjects, ...personalProjects];
  const hasResults = filteredProjects.length > 0;

  const headingLabel = filter === 'all' ? props.titleProfessional : filterBrandLabels[filter];

  return (
    <section id='project-section' className="flex flex-1 flex-col bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans overflow-hidden">
      <div className="scrollbar-custom flex flex-1 flex-col md:overflow-y-auto p-4 md:p-6 2xl:p-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-md font-medium text-[var(--color-text-secondary)]">
          {hasResults ? headingLabel : ''}
        </h2>
        <ProjectsFilter value={filter} onChange={setFilter} allLabel={props.allLabel} />
      </div>

      {filter === 'all' ? (
        <>
          {professionalProjects.length > 0 && (
            <div className="flex flex-col gap-2">
              {professionalProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  isSelected={props.selectedProject?.title === project.title}
                  onClick={() => props.onClick && props.onClick(project)}
                />
              ))}
            </div>
          )}

          {personalProjects.length > 0 && (
            <>
              <h3 className="text-md font-medium text-[var(--color-text-secondary)] mt-6 mb-4">{props.titlePersonal}</h3>
              <div className="flex flex-col gap-2">
                {personalProjects.map((project, index) => (
                  <ProjectCard
                    key={`personal-${index}`}
                    project={project}
                    isSelected={props.selectedProject?.title === project.title}
                    onClick={() => props.onClick && props.onClick(project)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isSelected={props.selectedProject?.title === project.title}
              onClick={() => props.onClick && props.onClick(project)}
            />
          ))}
        </div>
      )}

      {!hasResults && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-[var(--color-text-secondary)] text-center">{props.noResultsLabel}</p>
        </div>
      )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project, isSelected?: boolean, onClick?: () => void }> = ({ project, isSelected, onClick }) => {
  const { ogImage } = useOgImage(project.github || null);

  const getImageSrc = () => {
    if (ogImage) return ogImage;
    if (project.thumbnail) return project.thumbnail;
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <div
      onClick={onClick}
      className={`group flex flex-row items-center gap-4 p-2 transition hover:scale-105 active:scale-95 cursor-pointer duration-300 rounded-xl ${isSelected ? 'bg-[var(--color-tag-bg)] ring-2 ring-[var(--color-primary)]' : ''
        }`}
    >
      <div className="relative size-20 shrink-0">
        {(imageSrc) ?
          <img
            src={imageSrc}
            alt={project.title}
            className="size-20 object-cover rounded-xl"
          /> :
          <div className="w-full h-full shrink-0 bg-[var(--color-tag-bg)] rounded-xl flex items-center justify-center">
            <FaGithub size={48} />
          </div>
        }
        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <MdOpenInNew size={32} className="text-white transition-all duration-300 scale-75 group-hover:scale-100" />
        </div>
      </div>
      <div className="flex flex-col self-start">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] leading-tight">
          {project.title}
        </h3>
        <p className="font-light text-[var(--color-text-secondary)] line-clamp-3 leading-tight">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default Projects;
