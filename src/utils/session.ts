import type { NextApiRequest } from "next";

// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession, Session } from "next-iron-session";
import isDev from "./isDev";

export default function withSession<T>(handler: T) {
  return withIronSession(handler, {
    // @ts-ignore
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "AuthCookie",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: !isDev(),
    },
  });
}

export type NextIronRequest = NextApiRequest & { session: Session };
