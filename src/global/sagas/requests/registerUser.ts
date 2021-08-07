import axios from "axios";
import { RegisterUserForm } from "types/models/RegisterUserForm.model";

interface RegisterUserFuncI {
  errors?: { username: string; email: string };
  message?: string;
  status: string;
  error?: boolean;
}

// @ts-ignore
const RegisterUserFunc = (form: RegisterUserForm) =>
  function* (): Generator<any, RegisterUserFuncI, RegisterUserFuncI> {
    const copyOfForm = {
      ...form,
      birthDate: new Date(form.birthDate).getTime(),
    };

    try {
      console.log(form.birthDate);
      const registerUserRes = yield axios.post<{
        errors?: { username: string; email: string };
        message: string;
        status: string;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, copyOfForm);

      console.log(registerUserRes);

      // @ts-ignore
      return {
        // @ts-ignore
        status: "warning",

        // @ts-ignore
        ...registerUserRes.data,
      };
    } catch (err) {
      console.log(err);

      // @ts-ignore
      return { status: "error", message: "something went wrong!", error: true };
    }
  };

export default RegisterUserFunc;
