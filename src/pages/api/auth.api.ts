import type { NextApiResponse } from "next";

import withSession, { NextIronRequest } from "@utils/session";

export default withSession((req: NextIronRequest, res: NextApiResponse) => {
  // @ts-ignore
  console.log(req.query);
  const user = req.session.get("user");
  console.log(user);
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
});
