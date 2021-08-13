import axios from "axios";

export default async function CreateIoTCloudApp(
  form: {
    name: string;
    visibility: string;
    desc: string;
    isTeam: boolean;
    team: Array<{
      username: string;
      name: string;
      id: string;
      role: "admin" | "viewer";
    }>;
  },
  authToken: string
): Promise<{
  message: string;
  AppToken?: string;
  AppId?: string;
  errors?: {
    name: string;
  };
  status: "error" | "warning" | "success";
}> {
  try {
    const test = await axios.post<{
      message: string;
      AppToken?: string;
      AppId?: string;
      errors?: {
        name: string;
      };
      status: "error" | "warning" | "success";
    }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/add`, {
      ...form,
      authToken,
    });

    return test.data;
  } catch (err) {
    console.log(err);

    // @ts-ignore
    return new Error({
      status: "error",
      message: "error has occured please check console.",
    });
  }
}
