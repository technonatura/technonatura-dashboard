type checkRolesT = (
  // eslint-disable-next-line no-unused-vars
  roles: Array<string> | string,
  // eslint-disable-next-line no-unused-vars
  permission: string | Array<string>
) => boolean;

const checkRoles: checkRolesT = (roles, permission) => {
  if (typeof roles === "string") {
    if (permission.includes(roles) || permission === roles) {
      return true;
    }
  }

  if (Array.isArray(permission)) {
    for (let i: number = 0; i < roles.length; i += 1) {
      if (permission.includes(roles[i])) {
        // console.log(permission, permission.includes(roles[i]), roles[i]);
        return true;
      }
    }
  } else if (roles.includes(permission)) return true;

  return false;
};

export default checkRoles;
