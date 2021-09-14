import axios from "axios";

export default async function verifySomeUsers(
  selectedUsersId: Array<string>,
  authToken: string,
  selfId: string
): Promise<{
  message: string;
  status: "success" | "error" | "warning";
  title?: string;
}> {
  if (selectedUsersId.includes(selfId)) {
    return {
      title: "Refused to delete",
      message: "We are sorry but you can't delete your self.",
      status: "error",
    };
  }

  try {
    // console.log(authToken);
    // eslint-disable-next-line no-unused-vars
    const accUsers = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/deleteusers`,
      { usersId: selectedUsersId, authToken }
    );
    // console.log("accUsers", accUsers);
    return {
      title: "Success!",
      message: "Success deleted Users!",
      status: "success",
    };
  } catch (err) {
    return {
      title: "Err on Server",
      message: "err when requesting to server",
      status: "error",
    };
  }
}
