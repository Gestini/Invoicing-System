import { UserModel } from "./user"
import { BusinessUnitModel } from "./businessUnit"

export interface EmployeeModel {
  id: number
  user: UserModel
  name: string
  email: string
  status: EmployeeStatus
  lastname: string
  businessUnit: BusinessUnitModel
}

enum EmployeeStatus {
  PENDING,
  ACTIVE
}