import axios from "axios";

import { UserInterface } from "types/models/User.model";

// @ts-ignore
const UserLoginFunc = async (form: {
  email: string;
  password: string;
}): Promise<
  | {
      errors?: { password: string; email: string };
      message?: string;
      status: "warning" | "error";
      error?: boolean;
    }
  | { status: "success"; user: UserInterface; token: string }
> => {
  try {
    const registerUserRes = await axios.post<
      | {
          errors?: { password: string; email: string };
          message: string;
          status: "error" | "warning";
        }
      | { status: "success"; user: UserInterface; token: string }
    >(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
      ...form,
      system: window.navigator.userAgent,
      date: new Date(),
    });

    return {
      ...registerUserRes.data,
    };
  } catch (err) {
    console.log(err);

    return { status: "error", message: "something went wrong!" };
  }
};

export default UserLoginFunc;
