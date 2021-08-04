/* eslint-disable no-unused-vars */
// import { GetServerSideProps } from "next";
// import { applyServerSideCookie } from "next-universal-cookie";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
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

      const originalRenderPage = ctx.renderPage;
      // console.log(originalRenderPage)

      // @ts-ignore
      ctx.renderPage = () => ({
        // useful for wrapping the whole react tree
        enhanceApp: (App: any) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component: any) => Component,
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
