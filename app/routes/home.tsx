import Social from "~/components/social";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Main } from "~/components/main";
import Projects from "~/components/projects";
import Local from "~/components/local";
import Actions from "~/components/actions";
import Profile from "~/components/profile";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen md:gap-4 gap-2 md:p-4 p-2">
      <div className="flex flex-col w-full lg:w-100 md:gap-y-4 gap-y-2">
        <Profile
          username={"origemjhanpoll"}
          name={"Jean Paul"}
          role={"Mobile Developer"}
          description={"Passionate developer with a love for creating innovative solutions."}
          tags={["28 y.o", "JavaScript", "TypeScript", "React", "Node.js"]}
          photoUrl={"https://avatars.githubusercontent.com/u/131689163?s=400&u=d07e3e813d2f38294a86809206dcc28f5bb41570&v=4"}
        />
        <Local
          address="São Luís - MA, Brasil"
        />
        <div className="hidden md:block">
          <Actions />
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
          projects={[
            {
              title: "E-commerce Dashboard",
              description: "A comprehensive dashboard for managing online store inventory and sales analytics.",
              liveUrl: "https://dashboard-demo.com",
              imageUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
            },
            {
              title: "Travel Companion",
              description: "Mobile-first application for planning trips and discovering local hidden gems.",
              liveUrl: "https://travel-app.com",
              imageUrl: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
            },
            {
              title: "AI Content Gen",
              description: "AI-powered tool that helps marketers generate creative copy in seconds.",
              liveUrl: "https://ai-content.com",
              imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
            },
            {
              title: "FitTrack Pro",
              description: "Health monitoring platform integrating with wearable devices for real-time stats.",
              liveUrl: "https://fittrack.com",
              imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
            },
          ]}
        />
      </div>
    </div>
  );
}
