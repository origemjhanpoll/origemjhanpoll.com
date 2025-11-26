import dataPt from "../assets/json/pt/data.json";
import dataEn from "../assets/json/en/data.json";
import dataCn from "../assets/json/cn/data.json";

export const getProfileService = (locale: string = 'pt') => {
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
  return data.profile;
};
