interface Relation {
    id: number | string
}

export interface NewProductModel {
    name: string
    net1: number | null
    net2: number | null
    net3: number | null
    net4: number | null
    status: boolean
    deposit: Relation | null
    codigo1: string | null
    codigo2: string | null
    barcode: string | null
    taxType: string
    category: string | null
    quantity: number | null
    costPrice: number | null
    cardPrice: number | null
    pricePolicy: string
    friendPrice: number | null
    supplierUnit: Relation | null
    purchasePrice: number | null
    financedPrice: number | null
    priceCalculation: string
}

export type ProductErrors = {
    [K in keyof NewProductModel]?: string; // Permite que cada clave de ProductInfo tenga un valor de tipo string o sea undefined
};