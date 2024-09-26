export interface UserModel {
  id: number
  email: string
  username?: string
  lastname?: string
  firstname?: string
  country?: string
  jobposition?: string
  role: Role
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
