import { BusinessUnitModel } from "./businessUnit"

export interface DiscountModel {
  id: number
  code: string
  type: DiscountType
  value: number
  maxUsages: number
  bussinessUnit: BusinessUnitModel
}

export enum DiscountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}