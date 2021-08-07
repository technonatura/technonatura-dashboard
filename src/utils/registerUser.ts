import axios from "axios";

import { RegisterUserForm } from "types/models/RegisterUserForm.model";

// @ts-ignore
const RegisterUserFunc = async (
  form: RegisterUserForm
): Promise<
  | {
      errors?: { username: string; email: string };
      message?: string;
      status: "warning" | "error";
      error?: boolean;
    }
  | { status: "success"; user: any; token: string }
> => {
  const copyOfForm = {
    ...form,
    birthDate: new Date(form.birthDate).getTime(),
  };

  try {
    const registerUserRes = await axios.post<
      | {
          errors?: { username: string; email: string };
          message: string;
          status: "error" | "warning";
        }
      | { status: "success"; user: any; token: string }
    >(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, copyOfForm);

    return {
      ...registerUserRes.data,
    };
  } catch (err) {
    console.log(err);

    return { status: "error", message: "something went wrong!" };
  }
};

export default RegisterUserFunc;