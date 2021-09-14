import axios from "axios";

export default async function verifySomeUsers(
  selectedUsersId: Array<string>,
  authToken: string
): Promise<{
  message: string;
  status: "success" | "error" | "warning";
}> {
  try {
    // eslint-disable-next-line no-unused-vars
    const accUsers = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/acceptusers`,
      { usersId: selectedUsersId, authToken }
    );
    return {
      message: "Success verified Users!",
      status: "success",
    };
  } catch (err) {
    return {
      message: "err when requesting to server",
      status: "error",
    };
  }
}
