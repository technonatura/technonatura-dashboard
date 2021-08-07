import type { NextApiResponse } from "next";

import withSession, { NextIronRequest } from "@utils/session";

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    console.log(req.query);

    if (req.method === "POST") {
      if (req.body.token !== process.env.SECRET_COOKIE_PASSWORD) {
        res.send("forbidden");
        return;
      }

      if (!req.body.authToken) {
        res.send("fill the authToken please.");
        return;
      }

      req.session.set("authToken", req.body.authToken);
      await req.session.save();

      res.json({
        status: "success",
      });
      return;
    }
    res.send("forbidden");
  }
);
