import React from "react";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
// import { NextCookieProvider } from "next-universal-cookie";

import { ChakraProvider } from "@chakra-ui/react";
import { Typography, Link } from "@material-ui/core";

import { NextSeo } from "next-seo";

import store from "@/global/index";

import ProgressLoad from "components/ProgressLoad";
import VerifiedAccountNotifier from "components/VerifiedAccountNotifier";

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
        <ChakraProvider>
          <ThemeConfig>
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
                  <Link color="inherit" href="https://github.com/aldhanekaaa">
                    Aldhanekaa
                  </Link>{" "}
                  {new Date().getFullYear()} - Present . MIT LICENSE
                </Typography>
              </DashboardLayout>
            </CookiesProvider>
          </ThemeConfig>
        </ChakraProvider>
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
