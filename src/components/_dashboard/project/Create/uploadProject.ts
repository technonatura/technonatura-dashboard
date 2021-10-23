import axios from "axios";
import { ProjectPostInterface } from "@/types/models/project";
import { ProjectSchemaI } from "components/_dashboard/project/Create/CreateProjectSchema";

export default async function CreateIoTCloudApp(
  form: ProjectSchemaI & {},
  authToken: string
): Promise<{
  message: string;
  errors?: ProjectPostInterface;
  status: "error" | "warning" | "success";
}> {
  try {
    const test = await axios.post<
      ProjectPostInterface,
      {
        data: {
          message: string;
          errors?: ProjectPostInterface;
          status: "error" | "warning" | "success";
        };
      }
    >(`${process.env.NEXT_PUBLIC_SERVER}/project/add`, {
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
