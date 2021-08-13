import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// eslint-disable-next-line no-unused-vars
export default async function fetchUsers(
  // eslint-disable-next-line no-unused-vars
  setData: (users: any) => void,
  isAccountVerified?: boolean
) {
  const users = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER}/api/users${
      isAccountVerified ? "?isAccountVerified=true" : ""
    }`
  );

  if (setData) {
    setData(users);
  }

  return users;
}
