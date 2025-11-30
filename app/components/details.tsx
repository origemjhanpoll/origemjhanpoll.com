import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { FaGithub, FaGooglePlay, FaAppStore, FaExternalLinkAlt } from "react-icons/fa";

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

interface DetailsProps {
  project: Project | null;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ project, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (project) {
      setTimeout(() => setShowContent(true), 10);
    } else {
      setShowContent(false);
    }
  }, [project]);

  return (
    <section className={`flex flex-1 bg-[var(--color-card-bg)] rounded-3xl flex-col overflow-hidden transition-all duration-500 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {project ? (
        <>
          <div className="sticky top-0 bg-[var(--color-card-bg)] z-10 p-6 2xl:px-8 2xl:p-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{project.title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[var(--color-button-bg)] min-h-16 items-center justify-center gap-2 px-4 py-3 cursor-pointer"
                aria-label="Fechar"
              >
                <MdClose size={32} className="text-[var(--color-button-text)]" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto px-6 pb-6 2xl:px-8 2xl:pb-8">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {project.types?.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[var(--color-tag-bg)] text-[var(--color-tag-text)] rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
              {project.year && (
                <span className="px-3 py-1 bg-[var(--color-tag-bg)] text-[var(--color-tag-text)] rounded-full text-sm">
                  {project.year}
                </span>
              )}
            </div>

            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Screenshots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-auto">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <FaExternalLinkAlt size={16} />
                  Visitar Website
                </a>
              )}
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-tag-bg)] text-[var(--color-text-primary)] rounded-lg hover:opacity-80 transition-opacity duration-200"
                  >
                    <FaGithub size={20} />
                    GitHub
                  </a>
                )}
                {project.playstore && (
                  <a
                    href={project.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-tag-bg)] text-[var(--color-text-primary)] rounded-lg hover:opacity-80 transition-opacity duration-200"
                  >
                    <FaGooglePlay size={20} />
                    Play Store
                  </a>
                )}
                {project.appstore && (
                  <a
                    href={project.appstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-tag-bg)] text-[var(--color-text-primary)] rounded-lg hover:opacity-80 transition-opacity duration-200"
                  >
                    <FaAppStore size={20} />
                    App Store
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-[var(--color-text-secondary)] text-center">
            Selecione um projeto para ver os detalhes
          </p>
        </div>
      )}
    </section>
  );
};

export default Details;