export interface UserModel {
  id: number
  role: Role
  email: string
  name?: string
  country?: string
  username?: string
  lastname?: string
  firstname?: string
  jobposition?: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
