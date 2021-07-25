import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// theme
import ThemeConfig from "../theme";
// components
import ScrollToTop from "../components/ScrollToTop";
import DashboardLayout from "../layouts/dashboard";

// const loadLocaleData = (locale: string) => {
//   switch (locale) {
//     default:
//       return import("../locales/en/index.json");
//   }
// };

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    console.log(window.navigator.userAgent);
  });

  return (
    <ThemeConfig>
      <ScrollToTop />
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </ThemeConfig>
  );
}
export default MyApp;
