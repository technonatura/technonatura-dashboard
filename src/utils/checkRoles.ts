type checkRolesT = (
  // eslint-disable-next-line no-unused-vars
  roles: Array<string>,
  // eslint-disable-next-line no-unused-vars
  permission: string | Array<string>
) => boolean;

export const checkRoles: checkRolesT = (roles, permission) => {
  if (Array.isArray(permission)) {
    for (let i: number = 0; i < roles.length; i += 1) {
      if (permission.includes(roles[i])) {
        return true;
      }
    }
  } else if (roles.includes(permission)) return true;

  return false;
};

export default checkRoles;
