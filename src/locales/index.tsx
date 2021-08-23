import { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";

import en from "./EN-GB";
import id from "./id";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en-gb",
  fallbackLng: ["en-gb", "id"], // languages to use
  lowerCaseLng: true,
  resources: {
    id: id,
    "en-gb": en,
  },
});

export default function InternalisationWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const LangState = useSelector((state: RootStore) => state.lang);

  useEffect(() => {
    i18next.changeLanguage(LangState.lang);
    // console.log('hey');
    console.log("i18next.languages", i18next);
  }, [LangState.lang]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
