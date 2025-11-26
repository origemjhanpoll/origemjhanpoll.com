import React from 'react';
import { MdOpenInNew } from 'react-icons/md';

interface ProjectsProps {
  projects: Project[];
}

interface Project {
  title: string;
  description: string;
  liveUrl?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="flex flex-1 flex-col bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-4 font-sans md:overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="flex flex-col gap-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div
      onClick={project.onClick}
      className="group flex flex-row items-center gap-2 p-2 hover:bg-[var(--color-tag-bg)]/80 transition-colors rounded-lg cursor-pointer"
    >
      {project.imageUrl && (
        <div className="relative size-20 shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="size-20 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <MdOpenInNew size={32} className="text-white transition-all duration-300 scale-75 group-hover:scale-100" />
          </div>
        </div>
      )}
      <div className="flex flex-col self-start">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default Projects;
