import { UserModel } from "./user"

export interface RoleModel {
  id: number
  name: string
  users: UserModel[]
  permissions: Permission[]
}

interface Permission {
  id: number
  name: string
}