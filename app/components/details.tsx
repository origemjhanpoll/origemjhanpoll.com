import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { FaGooglePlay, FaAppStore, FaExternalLinkAlt } from "react-icons/fa";
import playstoreDark from "../assets/svg/playstore_dark.svg";
import applestoreDark from "../assets/svg/applestore_dark.svg";

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
  availableInStores: string;
  screenshots: string;
  technologies: string;
  selectProject: string;
}

const Details: React.FC<DetailsProps> = ({ project, onClose, availableInStores, screenshots, technologies, selectProject }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (project) {
      setTimeout(() => setShowContent(true), 10);
    } else {
      setShowContent(false);
    }
  }, [project]);

  return (
    <section className={`flex flex-1 bg-[var(--color-card-bg)] rounded-3xl flex-col transition-all duration-500 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex self-end bg-[var(--color-card-bg)] z-10 p-4 md:p-6 2xl:p-8 rounded-3xl">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-[var(--color-button-bg)] min-h-16 items-center justify-center gap-2 px-4 py-3 hover:scale-115 active:scale-100 duration-300 cursor-pointer"
          aria-label="Fechar"
        >
          <MdClose size={32} className="text-[var(--color-button-text)]" />
        </button>
      </div>
      {project ? (
        <div className="flex flex-col overflow-y-auto gap-6">
          <div className="flex flex-col items-center justify-start md:items-center md:flex-row gap-6 px-4 md:px-6 2xl:px-8">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="size-42 object-cover rounded-xl"
              />
            )}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-4xl font-bold text-[var(--color-text-primary)] pb-2">{project.title}</h1>
              <p className="text-lg font-light text-center md:text-left text-[var(--color-text-secondary)] leading-relaxed">{project.description}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium inline-flex items-center gap-2 mt-2 text-blue-400 hover:underline"
                >
                  <FaExternalLinkAlt size={18} />
                  {project.url}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="hidden md:flex text-2xl font-semibold gap-6 px-4 md:px-6 2xl:px-8 mb-3">
              <h1>{availableInStores}</h1>
            </div>
            <div className="flex flex-row gap-4 px-4 md:px-6 2xl:px-8 justify-center md:justify-start">
              {project.playstore && (
                <a
                  href={project.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={playstoreDark} alt="Play Store" className="h-18" />
                </a>
              )}
              {project.appstore && (
                <a
                  href={project.appstore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={applestoreDark} alt="App Store" className="h-18" />
                </a>
              )}
            </div>
          </div>

          {project.images && project.images.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3 px-4 md:px-6 2xl:px-8">{screenshots}</h3>
              <div className="flex flex-row gap-4 overflow-x-auto pb-2 px-4 md:px-6 2xl:px-8">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto rounded-3xl object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3 px-4 md:px-6 2xl:px-8">{technologies}</h3>
              <div className="flex flex-wrap gap-2 px-4 md:px-6 2xl:px-8">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="border border-[var(--color-text-secondary)]/30 font-light px-4 py-1.5 rounded-full text-sm backdrop-blur-sm text-[var(--color-text-secondary)] transition hover:scale-105 active:scale-95 cursor-pointer duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-[var(--color-text-secondary)] text-center">
            {selectProject}
          </p>
        </div>
      )}
    </section>
  );
};

export default Details;