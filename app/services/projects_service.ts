import dataPt from "../assets/json/pt/data.json";
import dataEn from "../assets/json/en/data.json";
import dataCn from "../assets/json/cn/data.json";

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
    professional: data.projects.professional,
    personal: data.projects.personal,
    translations: data.projects.translations
  };
};
