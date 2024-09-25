import { BusinessUnitModel } from './businessUnit'

export interface SupplierModel {
  id: number
  name: string
  description?: string
  phone?: string
  email?: string
  website?: string
  supplierType?: string
  reasonSocial?: string
  address?: string
  dni?: string
  saleCondition?: string
  businessUnit: BusinessUnitModel
}
