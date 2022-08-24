export interface User {
  userId: string;
  userName: string;
  userRole: Role;
}

interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
  all_permissions: boolean;
}

interface Permission {
  _id: string;
  name: string;
}
