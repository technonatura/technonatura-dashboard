import { TeammateInterface } from "types/models/IoT/IoTApp.model";
import CheckRoles from "./checkRoles";

type checkMeInTeammatesT = (
  // eslint-disable-next-line no-unused-vars
  teammates: Array<TeammateInterface>,
  myId: string,
  permissions: Array<string>
) => boolean;

const checkMeInTeammates: checkMeInTeammatesT = (
  teammates,
  myId,
  permissions
) => {
  const myRole = teammates.find((teammate) => teammate.userId === myId)?.role;
  if (!myRole) {
    return false;
  }
  return CheckRoles(myRole, permissions);
};

export default checkMeInTeammates;
