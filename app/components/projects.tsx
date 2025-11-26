import React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { FaGithub } from "react-icons/fa";


interface ProjectsProps {
  professionalProjects: Project[];
  personalProjects: Project[];
  titleProfessional: string;
  titlePersonal: string;
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

const Projects: React.FC<ProjectsProps> = ({ professionalProjects, personalProjects, titleProfessional, titlePersonal }) => {
  return (
    <section className="flex flex-1 flex-col bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-4 font-sans md:overflow-y-auto">
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{titleProfessional}</h2>
      <div className="flex flex-col gap-2">
        {professionalProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {personalProjects.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-6 mb-4">{titlePersonal}</h3>
          <div className="flex flex-col gap-2">
            {personalProjects.map((project, index) => (
              <ProjectCard key={`personal-${index}`} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div
      onClick={() => project.url && window.open(project.url, '_blank')}
      className="group flex flex-row items-center gap-4 p-2 transition hover:scale-105 active:scale-95 cursor-pointer duration-300 rounded-xl"
    >
      <div className="relative size-20 shrink-0">
        {(project.thumbnail) ?
          <img
            src={project.thumbnail}
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
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm font-light line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default Projects;
