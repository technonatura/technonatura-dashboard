import type { NextApiResponse } from "next";

import withSession, { NextIronRequest } from "@utils/session";

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

    if (!authToken) {
      res.json({
        isLoggedIn: false,
      });
      return;
    }
    // if (user) {
    //   // in a real world application you might read the user id from the session and then do a database request
    //   // to get more information on the user if needed
    //   res.json({
    //     isLoggedIn: true,
    //     // ...user,
    //   });
    // } else {
    res.json({
      isLoggedIn: false,
    });
    // }
  }
);
