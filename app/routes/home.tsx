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


export default function Home() {
  const [locale, setLocale] = useState('pt');
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
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
  }>({
    professional: { title: "Projetos", items: [] },
    personal: { title: "Projetos Pessoais", items: [] }
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
      <div className="flex flex-col w-full lg:w-100 md:gap-y-4 gap-y-2 transition-all">
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
      <div className="hidden flex-1 lg:flex transition-all duration-300">
        <Main
          url={mainData.url}
          title={mainData.title}
          description={mainData.description}
          buttonText={mainData.buttonText}
          onClick={() => {
            window.location.href = '/simulate';
          }}
        />
      </div>
      <div className="flex flex-col-reverse md:flex-col lg:w-100 w-full md:gap-4 gap-2">
        <Social
          icons={[
            { icon: <FaLinkedin size={32} />, href: "https://linkedin.com/in/origemjhanpoll", label: "LinkedIn" },
            { icon: <FaGithub size={32} />, href: "https://github.com/origemjhanpoll", label: "Github" },
            { icon: <FaInstagram size={32} />, href: "https://instagram.com/origemjhanpoll", label: "Instagram" },
            { icon: <FaTelegram size={32} />, href: "https://t.me/origemjhanpoll", label: "Telegram" },
          ]} />
        <Projects
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
          titleProfessional={projectsData.professional.title}
          titlePersonal={projectsData.personal.title}
        />
      </div>
    </div>
  );
}
