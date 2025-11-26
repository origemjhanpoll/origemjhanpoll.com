import dataPt from "../assets/json/pt/data.json";
import dataEn from "../assets/json/en/data.json";
import dataCn from "../assets/json/cn/data.json";

export const getProfileService = (locale: string = 'pt') => {
  const data = locale === 'en' ? dataEn : locale === 'cn' ? dataCn : dataPt;
  return data.profile;
};
