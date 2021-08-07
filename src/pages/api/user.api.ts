import type { NextApiResponse } from "next";
import axios from "axios";

import withSession, { NextIronRequest } from "@utils/session";

import { UserInterface } from "types/models/User.model";

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    console.log(req.query);
    if (req.query.pass !== process.env.SECRET_COOKIE_PASSWORD) {
      res.json({
        isLoggedIn: true,
      });
      return;
    }
    const authToken = req.session.get<string | undefined>("authToken");

    console.log("authToken", authToken);
    if (!authToken) {
      res.json({
        isLoggedIn: false,
      });
      return;
    }

    try {
      const checkTokenRes = await axios.post<
        | { status: "warning" | "error"; message: string }
        | { status: "success"; user: UserInterface; message: "string" }
      >(`${process.env.NEXT_PUBLIC_SERVER}/auth/checkJWT`, {
        token: authToken,
      });

      const checkTokenResData = checkTokenRes.data;

      if (checkTokenResData.status === "success") {
        res.json({
          token: authToken,
          user: checkTokenResData.user,
          message: "success login",
          status: "success",
        });
        return;
      }
    } catch (err) {
      console.error(err);
      res.json({
        message: "Error when login please check console",
        status: "success",
      });
      return;
    }

    res.json({
      message: "invalid parameters",
      status: "error",
    });
  }
);
