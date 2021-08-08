import axios, { AxiosResponse } from "axios";

export default function fetchUsers(): Promise<AxiosResponse<{ b: string }>> {
  return axios.request<{ b: string }>({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SERVER}/api/users`,
  });
}
