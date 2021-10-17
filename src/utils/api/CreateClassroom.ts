import axios from "axios";
import { ClassroomInterface } from "@/types/models/classroom.model";

export default async function CreateIoTCloudApp(
  form: ClassroomInterface,
  authToken: string
): Promise<{
  message: string;
  errors?: ClassroomInterface;
  status: "error" | "warning" | "success";
}> {
  try {
    const test = await axios.post<
      ClassroomInterface,
      {
        data: {
          message: string;
          errors?: ClassroomInterface;
          status: "error" | "warning" | "success";
        };
      }
    >(`${process.env.NEXT_PUBLIC_SERVER}/classroom/add`, {
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
