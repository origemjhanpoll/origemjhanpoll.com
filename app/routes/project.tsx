import { useNavigate, useParams, useSearchParams } from "react-router";

import { Details } from "~/components";
import { getProjectBySlug } from "~/services";

export default function Project() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("lang") ?? "pt";

  const { project, translations } = getProjectBySlug(slug ?? "", locale);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="flex h-dvh w-full p-2 lg:p-4">
      <Details
        project={project}
        onBack={handleBack}
        backLabel={translations.back}
        availableInStores={translations.availableInStores}
        screenshots={translations.screenshots}
        technologies={translations.technologies}
        selectProject={translations.selectProject}
      />
    </main>
  );
}
