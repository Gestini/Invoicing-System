import { UserModel } from "./user"
import { EmployeeModel } from "./employee"
import { BusinessUnitModel } from "./businessUnit"

export interface unitInviteModel {
  id: number
  token: string
  inviter: UserModel
  accepted: boolean
  employee: EmployeeModel
  businessUnit: BusinessUnitModel
}