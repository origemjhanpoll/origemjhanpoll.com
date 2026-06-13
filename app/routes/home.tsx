import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import { Social, Main, Projects, Local, Profile, Details, Button, Experience } from "~/components";
import { getProfileService, getProjectsService, getMainService, getSocialService, getExperienceService } from "~/services";

import iconBR from "../assets/png/br.png";
import iconCN from "../assets/png/cn.png";
import iconUS from "../assets/png/us.png";
import Actions from "~/components/actions";


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
  const socialData = getSocialService(locale);
  const projectsData = getProjectsService(locale);
  const experienceData = getExperienceService(locale);

  const handleFlagClick = () => {
    const nextIndex = (currentFlagIndex + 1) % flags.length;
    setCurrentFlagIndex(nextIndex);
    setLocale(flags[nextIndex].locale);
  };

  return (
    <div className="flex flex-col md:flex-row 2xl:justify-center min-h-dvh md:h-screen gap-2 md:gap-4 p-2 md:p-5">
      <div className="flex flex-col md:w-100 lg:w-120 2xl:w-240 gap-2 md:gap-y-4 gap-y-2 transition-all duration-300">
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
        >
          {/* <Button
            onClick={() => window.open(profileData.buttons[0].url, '_blank')}
            icon={<FaWhatsapp size={24} />}
            label={profileData.buttons[0].text}
            isFull
          />
          <Button
            onClick={() => window.open(profileData.buttons[1].url, '_blank')}
            outline={true}
            icon={<MdOutlineFileDownload size={24} />}
          /> */}
        </Profile>
        {/* <Main
          title={mainData.title}
          description={mainData.description}
        /> */}
        {/* <Experience
          title={experienceData.title}
          yearLabel={experienceData.yearLabel}
          yearsLabel={experienceData.yearsLabel}
          items={experienceData.items}
        /> */}
        {/* <Local
          address={profileData.address}
          label={profileData.localTimeLabel}
        /> */}
        {/* <div className="hidden md:block lg:hidden">
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
        </div> */}
      </div>

      <div className="flex flex-col flex-1 gap-2 md:gap-4 transition-all duration-300">
        <Local
          address={profileData.address}
          label={profileData.localTimeLabel}
        />
        <Main
          title={mainData.title}
          description={mainData.description}
        >
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => window.open(profileData.buttons[0].url, '_blank')}
              icon={<FaWhatsapp size={24} />}
              label={profileData.buttons[0].text}
              collapseMobile={true}
            />
            <Button
              onClick={() => window.open(profileData.buttons[1].url, '_blank')}
              outline={true}
              color="bg-[var(--color-tag-bg)] text-[var(--color-text-primary)]"
              icon={<MdOutlineFileDownload size={24} />}
              collapseMobile={true}
            />
          </div>

        </Main>
        <Social
          icons={socialData.links.map((link: any) => {
            const iconMap: { [key: string]: React.ReactNode } = {
              'LinkedIn': <FaLinkedin className="size-12 " />,
              'GitHub': <FaGithub className="size-12" />,
              'Instagram': <FaInstagram className="size-12" />,
              'Telegram': <FaTelegram className="size-12" />,
            };
            return {
              icon: iconMap[link.name],
              href: link.url,
              label: link.label,
            };
          })} />
      </div>
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

      <div className="flex flex-col md:w-80 lg:w-110 2xl:w-240 gap-2 md:gap-4 pb-2 md:pb-0 transition-all duration-300">
        {/* <Social 
          icons={socialData.links.map((link: any) => {
            const iconMap: { [key: string]: React.ReactNode } = {
              'LinkedIn': <FaLinkedin className="size-12 " />,
              'GitHub': <FaGithub className="size-12" />,
              'Instagram': <FaInstagram className="size-12" />,
              'Telegram': <FaTelegram className="size-12" />,
            };
            return {
              icon: iconMap[link.name],
              href: link.url,
              label: link.label,
            };
          })} /> */}
        <Experience
          title={experienceData.title}
          yearLabel={experienceData.yearLabel}
          yearsLabel={experienceData.yearsLabel}
          items={experienceData.items}
        />
        <Projects
          titleProfessional={projectsData.professional.title}
          titlePersonal={projectsData.personal.title}
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
          selectedProject={selectedProject}
          onClick={(project) => {
            if (selectedProject === project) {
              setSelectedProject(null);
            } else {
              setSelectedProject(project);
            }
          }}
        />
      </div>
    </div>
  );
}
