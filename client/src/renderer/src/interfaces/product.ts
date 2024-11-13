import { WarehouseModel } from './warehouse'
import { SupplierModel } from './supplier'

export interface ProductModel {
  id: number
  codigo1: string
  codigo2: string
  barcode: string
  image: string
  price: number
  cardPrice: number
  financedPrice: number
  friendPrice: number
  purchasePrice: number
  priceCalculation: string
  costPrice: number
  quantity: number
  category?: ProductCategoryModel,
  name: string
  description: string
  createdAt: string
  updatedAt: string
  status: boolean
  supplierUnit?: SupplierModel
  deposit?: WarehouseModel
  pricePolicy: string
  inventoryQuantity: number
  net1: number
  net2: number
  net3: number
  net4: number
  taxType: string
  referenceCode: string
  packageProduct: boolean
  quantityPerPackage: number
}

export interface ProductCategoryModel {
  id: string
  name: string
}