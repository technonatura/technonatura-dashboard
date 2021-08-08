import axios from "axios";

export default async function verifySomeUsers(
  selectedUsersId: Array<string>,
  authToken: string
): Promise<{
  message: string;
  status: "success" | "error" | "warning";
}> {
  try {
    console.log(authToken);
    const accUsers = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/acceptusers`,
      { usersId: selectedUsersId, authToken }
    );
    console.log("accUsers", accUsers);
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
