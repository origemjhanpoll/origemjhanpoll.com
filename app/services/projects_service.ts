import data from "../assets/json/pt/data.json";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
}

export const getProjectsService = async () => {
  try {
    const response = await fetch('https://api.github.com/users/origemjhanpoll/repos');
    const githubRepos: GitHubRepo[] = await response.json();

    const githubProjects = githubRepos
      .filter(repo => repo.description && repo.topics.includes('origemjhanpoll'))
      .map(repo => ({
        title: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        github: repo.html_url,
        technologies: repo.language ? [repo.language, ...repo.topics] : repo.topics,
        types: ['Open Source']
      }));

    return {
      professional: {
        title: data.projects.title,
        items: data.projects.items
      },
      personal: {
        title: data.projects.title2,
        items: githubProjects
      }
    };
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return {
      professional: {
        title: data.projects.title,
        items: data.projects.items
      },
      personal: {
        title: data.projects.title2,
        items: []
      }
    };
  }
};
