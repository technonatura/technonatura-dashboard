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

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
