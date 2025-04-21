//create roles

export const    systemRole = {
    ADMIN: 'admin',
    USER: 'user'  // Add other roles as needed.
}

const { ADMIN, USER } = systemRole;
export const role = {
  USER_ROLES: [USER],
  USER_ADMIN_ROLES:[USER,ADMIN],
  ADMIN_ROLES:[ADMIN]
};

