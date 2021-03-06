import React from "react";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
// import { NextCookieProvider } from "next-universal-cookie";

import { Typography, Link } from "@mui/material";

import { NextSeo } from "next-seo";

import { Toaster } from "react-hot-toast";

import store from "@/global/index";

import InternalisationWrapper from "locales/index";

import ProgressLoad from "components/ProgressLoad";
import VerifiedAccountNotifier from "components/VerifiedAccountNotifier";
import IndonesianIndependenceEventLayout from "layouts/EventLayout";

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
    <>
      <NextSeo
        title="TechnoNatura App"
        description="The TechnoNatura Social Media and Dashboard"
        canonical="https://dashboard.technonatura.vercel.app"
      />
      <Provider store={store}>
        <Toaster />
        <ThemeConfig>
          <InternalisationWrapper>
            <IndonesianIndependenceEventLayout />

            <ScrollToTop />
            <ProgressLoad />
            <CookiesProvider>
              <DashboardLayout>
                {/* @ts-ignore */}
                <VerifiedAccountNotifier />

                <Component {...pageProps} />

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 5, paddingLeft: 2 }}
                >
                  {"Copyright © "}
                  <Link color="inherit" href="https://github.com/aldhanekaa">
                    Aldhanekaa
                  </Link>{" "}
                  {new Date().getFullYear()} - Present . MIT LICENSE
                </Typography>
              </DashboardLayout>
            </CookiesProvider>
          </InternalisationWrapper>
        </ThemeConfig>
      </Provider>
    </>
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
