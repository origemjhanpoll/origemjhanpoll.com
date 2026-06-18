import { useParams, useSearchParams } from "react-router";

import { Details } from "~/components";
import { getProjectBySlug } from "~/services";

export default function Project() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("lang") ?? "pt";

  const { project, translations } = getProjectBySlug(slug ?? "", locale);

  return (
    <main className="flex h-dvh w-full p-2 lg:p-4">
      <Details
        project={project}
        availableInStores={translations.availableInStores}
        screenshots={translations.screenshots}
        technologies={translations.technologies}
        selectProject={translations.selectProject}
      />
    </main>
  );
}
