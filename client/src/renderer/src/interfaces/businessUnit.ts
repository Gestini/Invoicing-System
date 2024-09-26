import { CompanyModel } from './company'

export interface BusinessUnitModel {
  id: number
  name: string
  description: string
  link: string
  image: string
  address: string
  ecommerce: boolean
  company: CompanyModel
  plan?: PlanModel
}

interface PlanModel {
  id: number
  name: string
  description: string
  price: number
  isPopular: boolean
}
