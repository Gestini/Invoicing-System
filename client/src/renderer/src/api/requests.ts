import { authApi, api } from './axios'

/* Rutas para manejar el auth */
export const reqAuthLogin = async (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = async (data: any) => authApi.post('/auth/register', data)
export const reqAuthLoadProfileByToken = async (token: string) =>
  authApi.get('/auth/load-user-by-token/' + token)

/* Rutas unidades */
export const reqCreateUnit = async (data: any) => api.post('/business-unit/save', data)
export const reqGetUnitById = async (id: any) => api.get('/business-unit/get/' + id)
export const reqGetUnitByOwner = async () => api.get('/business-unit/get-by-owner')
export const reqDeleteUnitById = async (id: any) => api.delete(`/business-unit/delete/${id}`)

/* Rutas productos */
export const reqCreateProduct = async (data: any) => api.post('/products', data)
export const reqEditProduct = async (id: any, data: any) => api.put(`/products/${id}`, data)
export const reqDeleteProduct = async (id: any) => api.delete(`/products/${id}`)
export const reqGetProductByUnit = async (id: any) => api.get(`/products/by-business-unit/${id}`)
export const reqSearchProduct = async (name: string) => api.get(`/products/by-name/${name}`)
export const reqSearchProductByNameAndUnit = async (name: string, id: any) =>
  api.get(`/products/search/${name}/${id}`)

/* Rutas proveedores */
export const reqCreateSupplier = async (data: any) => api.post('/suppliers', data)
export const reqGetSupplier = async (id: any) => api.get(`/suppliers/by-business-unit/${id}`)
export const reqEditSupplier = async (id: any, data: any) => api.put(`/suppliers/${id}`, data)

/* Rutas facturacion */
export const reqGetInvoiceId = async (id: any) => api.get(`/invoicing/get/${id}`)
export const reqCreateInvoice = async (data: any) => api.post('/invoicing/save', data)
export const reqDeleteInvoice = async (id: any) => api.delete(`/invoicing/delete/${id}`)
export const reqUpdateInvoice = async (id: any, data: any) => api.put(`/invoicing/${id}`, data)
export const reqGetAllInvoicesByUnit = async (id: any) => api.get(`/invoicing/get-by-unit/${id}`)

/* Rutas depositos */
export const reqCreateDeposit = async (data: any) => api.post('/deposit/save', data)
export const reqEditDeposit = async (id: any, data: any) => api.put(`/deposit/${id}`, data)
export const reqDeleteDeposit = async (id: any) => api.delete(`/deposit/${id}`)
export const reqGetDepositByUnit = async () => api.get('/deposit/by-owner/')
