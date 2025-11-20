import ProfileCard from "~/components/profile_card";
import SocialLinks from "~/components/social_links";
import { FaInstagram, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import MainBanner from "~/components/main_banner";
import Projects from "~/components/projects";
import Local from "~/components/local";
import Actions from "~/components/actions";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen md:gap-4 gap-2 md:p-4 p-2">
      <div className="flex flex-col w-full lg:w-100 md:gap-y-4 gap-y-2">
        <ProfileCard
          username={"origemjhanpoll"}
          name={"Jean Paul"}
          role={"Mobile Developer"}
          description={"Passionate developer with a love for creating innovative solutions."}

          tags={["28 y.o", "JavaScript", "TypeScript", "React", "Node.js"]}
          photoUrl={"https://avatars.githubusercontent.com/u/131689163?s=400&u=d07e3e813d2f38294a86809206dcc28f5bb41570&v=4"}
        />
        <Local
          address="São Luís - MA, Brasil"
          description={`${new Date().toLocaleTimeString()} GMT-3 (local time)`}
        />
        <div className="hidden md:block">
          <Actions />
        </div>
      </div>
      <div className="hidden flex-1 lg:flex">
        <MainBanner url={"https://images.pexels.com/photos/2842827/pexels-photo-2842827.jpeg"} />
      </div>
      <div className="flex flex-col-reverse md:flex-col lg:w-100 w-full md:gap-4 gap-2">
        <SocialLinks
          icons={[
            { icon: <FaYoutube />, href: "#", label: "YouTube" },
            { icon: <FaInstagram />, href: "#", label: "Instagram" },
            { icon: <FaTiktok />, href: "#", label: "TikTok" },
            { icon: <FaXTwitter />, href: "#", label: "X (Twitter)" },
            { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
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
