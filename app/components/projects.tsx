import React from 'react';

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
      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div onClick={project.onClick} className="flex flex-row items-center gap-2 p-2 hover:bg-[var(--color-tag-bg)]/80 transition-colors rounded-lg cursor-pointer">
    {project.imageUrl && (
      <img
        src={project.imageUrl}
        alt={project.title}
        className="size-20 object-cover rounded-xl shrink-0"
      />
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

export default Projects;
