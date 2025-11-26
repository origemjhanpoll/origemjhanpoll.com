import Social from "~/components/social";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Main } from "~/components/main";
import Projects from "~/components/projects";
import Local from "~/components/local";
import Actions from "~/components/actions";
import Profile from "~/components/profile";
import { useState, useEffect } from "react";

import { getProfileService } from "~/services/profile_service";
import { getProjectsService } from "~/services/projects_service";
import { MdOutlineFileDownload } from "react-icons/md";

export default function Home() {
  const profileData = getProfileService();
  const [projectsData, setProjectsData] = useState<{
    professional: { title: string; items: any[] };
    personal: { title: string; items: any[] };
  }>({
    professional: { title: "Projetos", items: [] },
    personal: { title: "Projetos Pessoais", items: [] }
  });

  useEffect(() => {
    getProjectsService().then(data => setProjectsData(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen md:gap-4 gap-2 md:p-4 p-2">
      <div className="flex flex-col w-full lg:w-100 md:gap-y-4 gap-y-2">
        <Profile
          username={profileData.username}
          name={profileData.name}
          role={profileData.role}
          description={profileData.description}
          tags={profileData.tags}
          photoUrl={profileData.photo}
          buttons={profileData.buttons}
        />
        <Local
          address="São Luís - MA, Brasil"
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
      <div className="hidden flex-1 lg:flex">
        <Main
          url={"https://www.pexels.com/pt-br/download/video/12978459/"}
          title="Building the Future"
          buttonText="View Projects"
        />
      </div>
      <div className="flex flex-col-reverse md:flex-col lg:w-100 w-full md:gap-4 gap-2">
        <Social
          icons={[
            { icon: <FaLinkedin size={32} />, href: "https://linkedin.com/in/origemjhanpoll", label: "LinkedIn" },
            { icon: <FaGithub size={32} />, href: "https://github.com/origemjhanpoll", label: "Github" },
            { icon: <FaInstagram size={32} />, href: "https://instagram.com/origemjhanpoll", label: "Instagram" },
          ]} />
        <Projects
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
        />
      </div>
    </div>
  );
}
