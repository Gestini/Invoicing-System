import { UserModel } from './user'

export interface CompanyModel {
  id: number
  name: string
  image: string
  owner: UserModel
  description: string
}
