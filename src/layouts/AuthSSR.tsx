/* eslint-disable no-unused-vars */
// import { GetServerSideProps } from "next";
// import { applyServerSideCookie } from "next-universal-cookie";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

import React from "react";
// // @ts-ignore
// const AuthSSR: NextPage<{ stars: number }> =
//   // @ts-ignore

//   (p) => "";

// AuthSSR.getInitialProps = async (ctx) => {
//   console.log(ctx);
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
// };
// export default AuthSSR;

const AuthSSR = <T extends Object>(
  C: React.ComponentClass<T> | React.Component<T> | React.FunctionComponent<T>
) =>
  class AuthComponent extends Document<T> {
    static async getInitialProps(ctx: DocumentContext) {
      const res = await fetch("https://api.github.com/repos/vercel/next.js");

      // @ts-ignore
      const json = await res.json();
      // ctx.
      //       // // @ts-ignore
      // return { stars: json.stargazers_count };

      // return { ...initialProps };

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      // return {};

      const sheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage;

      // @ts-ignore
      ctx.renderPage = () => ({
        // @ts-ignore
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return { ...initialProps, stars: json.stargazers_count };
    }

    render() {
      // @ts-ignore
      return <C {...this.props} />;
    }
  };
export default AuthSSR;
