import { CompanyModel } from './company'

export interface WarehouseModel {
  id: number
  name: string
  company: CompanyModel
}
