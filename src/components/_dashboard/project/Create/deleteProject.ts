import axios from "axios";
import { ProjectPostInterface } from "@/types/models/project";

export default async function DeleteProject(
  projectName: string,
  authToken: string
): Promise<{
  message: string;
  status: "error" | "warning" | "success";
}> {
  try {
    const test = await axios.post<
      ProjectPostInterface,
      {
        data: {
          message: string;
          status: "error" | "warning" | "success";
        };
      }
    >(`${process.env.NEXT_PUBLIC_SERVER}/project/delete`, {
      authToken,
      projectName,
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
