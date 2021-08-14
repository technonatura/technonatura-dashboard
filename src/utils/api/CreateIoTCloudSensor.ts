import axios from "axios";

export default async function CreateIoTCloudApp(
  form: {
    sensorName: string;
    desc: string;
    dataType: "number" | "boolean";
  },
  authToken: string,
  appId: string
): Promise<{
  message: string;
  sensorId?: string;
  errors?: {
    sensorName: string;
  };
  status: "error" | "warning" | "success";
}> {
  try {
    const test = await axios.post<{
      message: string;

      sensorId?: string;

      status: "error" | "warning" | "success";
    }>(`${process.env.NEXT_PUBLIC_SERVER}/iot/add/sensor`, {
      ...form,
      appId,
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
