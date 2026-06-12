import dataPt from "../assets/json/pt/data.json";
import dataEn from "../assets/json/en/data.json";
import dataCn from "../assets/json/cn/data.json";

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  language: string | null;
  topics: string[];
}

const getData = (locale: string) => {
  switch (locale) {
    case 'en':
      return dataEn;
    case 'cn':
      return dataCn;
    default:
      return dataPt;
  }
};

export const getProjectsService = (locale: string = 'pt') => {
  const data = getData(locale);

  return {
    professional: {
      title: data.projects.title,
      items: data.projects.items
    },
    personal: {
      title: data.projects.title2,
      items: [] as any[]
    },
    translations: {
      availableInStores: data.projects.availableInStores,
      screenshots: data.projects.screenshots,
      technologies: data.projects.technologies,
      selectProject: data.projects.selectProject
    }
  };
};

export const getPersonalProjectsService = async () => {
  try {
    const response = await fetch('https://api.github.com/users/origemjhanpoll/repos', {
      signal: AbortSignal.timeout(8000)
    });
    const githubRepos: GitHubRepo[] = await response.json();

    return githubRepos
      .filter(repo => repo.description && repo.topics.includes('origemjhanpoll'))
      .map(repo => ({
        title: repo.name.replace(/-/g, ' '),
        description: repo.description || '',
        url: repo.html_url,
        github: repo.html_url,
        markdown: `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`,
        technologies: repo.language ? [repo.language, ...repo.topics] : repo.topics,
        types: ['Open Source']
      }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};
