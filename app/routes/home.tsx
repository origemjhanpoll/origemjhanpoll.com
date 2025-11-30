import Social from "~/components/social";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { Main } from "~/components/main";
import Projects from "~/components/projects";
import Local from "~/components/local";
import Actions from "~/components/actions";
import Profile from "~/components/profile";
import { useState, useEffect } from "react";

import { getProfileService } from "~/services/profile_service";
import { getProjectsService } from "~/services/projects_service";
import { getMainService } from "~/services/main_service";
import { MdOutlineFileDownload } from "react-icons/md";

import iconBR from "../assets/png/br.png";
import iconCN from "../assets/png/cn.png";
import iconUS from "../assets/png/us.png";
import Details from "~/components/details";


export default function Home() {
  const [locale, setLocale] = useState('pt');
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      if (isMobile) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    }
  }, [isMobile, selectedProject]);

  const flags = [
    { icon: iconBR, locale: 'pt' },
    { icon: iconUS, locale: 'en' },
    { icon: iconCN, locale: 'cn' }
  ];

  const profileData = getProfileService(locale);
  const mainData = getMainService(locale);
  const [projectsData, setProjectsData] = useState<{
    professional: { title: string; items: any[] };
    personal: { title: string; items: any[] };
    translations: {
      availableInStores: string;
      screenshots: string;
      technologies: string;
      selectProject: string;
    };
  }>({
    professional: { title: "Projetos", items: [] },
    personal: { title: "Projetos Pessoais", items: [] },
    translations: {
      availableInStores: "Disponível nas lojas:",
      screenshots: "Screenshots",
      technologies: "Tecnologias",
      selectProject: "Selecione um projeto para ver os detalhes"
    }
  });

  useEffect(() => {
    getProjectsService(locale).then(data => setProjectsData(data));
  }, [locale]);

  const handleFlagClick = () => {
    const nextIndex = (currentFlagIndex + 1) % flags.length;
    setCurrentFlagIndex(nextIndex);
    setLocale(flags[nextIndex].locale);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:gap-4 gap-2 md:p-4 p-2">

      {!selectedProject && (
        <div className="flex flex-col w-full lg:w-100 2xl:w-125 md:gap-y-4 gap-y-2 transition-all">
          <Profile
            username={profileData.username}
            greeting={profileData.greeting}
            name={profileData.name}
            role={profileData.role}
            description={profileData.description}
            tags={profileData.tags}
            photoUrl={profileData.photo}
            buttons={profileData.buttons}
            flag={flags[currentFlagIndex].icon}
            onClickFlag={handleFlagClick}
          />
          <Local
            address={profileData.address}
            label={profileData.localTimeLabel}
          />
          <div className="hidden md:block">
            <Actions listActions={[
              {
                title: profileData.buttons[0].text,
                url: profileData.buttons[0].url,
                icon: <FaWhatsapp size={24} />,
                color: "bg-[var(--color-primary)]",
                isFull: true,
              },
              {
                title: profileData.buttons[1].text,
                url: profileData.buttons[1].url,
                icon: <MdOutlineFileDownload size={24} />,
                color: "bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]",
              }

            ]} />
          </div>
        </div>
      )}
      {!selectedProject && (
        <div className="hidden flex-1 lg:flex transition-all duration-300">
          <Main
            url={mainData.url}
            title={mainData.title}
            description={mainData.description}
            buttonText={mainData.buttonText}
          />
        </div>
      )}
      {selectedProject && (
        <div className={`${isModalOpen ? 'fixed inset-0 z-[9999] flex lg:hidden' : 'hidden lg:flex flex-1'}`}>
          <Details
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            availableInStores={projectsData.translations.availableInStores}
            screenshots={projectsData.translations.screenshots}
            technologies={projectsData.translations.technologies}
            selectProject={projectsData.translations.selectProject}
          />
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-col lg:w-100 2xl:w-125 w-full md:gap-4 gap-2">
        <Social
          icons={[
            { icon: <FaLinkedin size={32} />, href: "https://linkedin.com/in/origemjhanpoll", label: "LinkedIn" },
            { icon: <FaGithub size={32} />, href: "https://github.com/origemjhanpoll", label: "Github" },
            { icon: <FaInstagram size={32} />, href: "https://instagram.com/origemjhanpoll", label: "Instagram" },
            { icon: <FaTelegram size={32} />, href: "https://t.me/origemjhanpoll", label: "Telegram" },
          ]} />
        <Projects
          titleProfessional={projectsData.professional.title}
          titlePersonal={projectsData.personal.title}
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
          onClick={(project, isProfessional) => {
            if (isProfessional) {
              if (selectedProject === project) {
                setSelectedProject(null);
              } else {
                setSelectedProject(project);
              }
            } else {
              window.open(project.url, '_blank');
            }
          }}
        />
      </div>
    </div>
  );
}
