import { useNavigate, useSearchParams } from "react-router";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import { Social, Main, Projects, Local, Profile, Button, Experience } from "~/components";
import { getProfileService, getProjectsService, getMainService, getSocialService, getExperienceService } from "~/services";
import { slugify } from "~/utils/slugify";

import iconBR from "../assets/png/br.png";
import iconCN from "../assets/png/cn.png";
import iconUS from "../assets/png/us.png";
import Actions from "~/components/actions";


export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const flags = [
    { icon: iconBR, locale: 'pt' },
    { icon: iconUS, locale: 'en' },
    { icon: iconCN, locale: 'cn' }
  ];

  const localeFromUrl = searchParams.get('lang') ?? 'pt';
  const currentFlagIndex = Math.max(0, flags.findIndex((flag) => flag.locale === localeFromUrl));
  const locale = flags[currentFlagIndex].locale;

  const profileData = getProfileService(locale);
  const mainData = getMainService(locale);
  const socialData = getSocialService(locale);
  const projectsData = getProjectsService(locale);
  const experienceData = getExperienceService(locale);

  const handleFlagClick = () => {
    const nextIndex = (currentFlagIndex + 1) % flags.length;
    setSearchParams({ lang: flags[nextIndex].locale }, { replace: true });
  };

  return (
    <div className="home-grid-container">
      <div id="home-grid-content-1">
        <Profile
          username={profileData.username}
          greeting={profileData.greeting}
          name={profileData.name}
          role={profileData.role}
          description={profileData.description}
          tags={profileData.tags}
          skills={profileData.skills}
          skillsTitle={profileData.skillsTitle}
          photoUrl={profileData.photo}
          buttons={profileData.buttons}
          flag={flags[currentFlagIndex].icon}
          onClickFlag={handleFlagClick}
        >
          <Button
            onClick={() => window.open(profileData.buttons[0].url, '_blank')}
            icon={<FaWhatsapp size={24} />}
            label={profileData.buttons[0].text}
            isFull
          />
          <Button
            onClick={() => window.open(profileData.buttons[1].url, '_blank')}
            outline={true}
            icon={<MdOutlineFileDownload size={24} />}
          />
        </Profile>
      </div>

      <div id="home-grid-content-2">
        <Local
          address={profileData.address}
          label={profileData.localTimeLabel}
        />
        <Main
          title={mainData.title}
          description={mainData.description}
        >
          <Button
            onClick={() => window.open(profileData.buttons[0].url, '_blank')}
            icon={<FaWhatsapp size={24} />}
            label={profileData.buttons[0].text}
          />
          <Button
            onClick={() => window.open(profileData.buttons[1].url, '_blank')}
            outline={true}
            icon={<MdOutlineFileDownload size={24} />}
          />
        </Main>
        <Social
          icons={socialData.links.map((link: any) => {
            const iconMap: { [key: string]: React.ReactNode } = {
              'LinkedIn': <FaLinkedin className="size-12" />,
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

      <div id="home-grid-content-3">
        <Experience
          title={experienceData.title}
          yearLabel={experienceData.yearLabel}
          yearsLabel={experienceData.yearsLabel}
          items={experienceData.items}
        />
        <Projects
          titleProfessional={projectsData.professional.title}
          titlePersonal={projectsData.personal.title}
          allLabel={projectsData.translations.filterAll}
          noResultsLabel={projectsData.translations.noProjectsFound}
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
          onClick={(project) => {
            navigate(`/projects/${slugify(project.title)}?lang=${locale}`);
          }}
        />
      </div>
    </div>
  );
}
