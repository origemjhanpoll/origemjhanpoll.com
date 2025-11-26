import dataPt from "../assets/json/pt/data.json";
import dataEn from "../assets/json/en/data.json";
import dataCn from "../assets/json/cn/data.json";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
}

export const getProjectsService = async (locale: string = 'pt') => {
  let data;
  switch (locale) {
    case 'en':
      data = dataEn;
      break;
    case 'cn':
      data = dataCn;
      break;
    default:
      data = dataPt;
  }
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
