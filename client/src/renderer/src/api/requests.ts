import { authApi, api } from './axios'

/* Rutas para manejar el auth */
export const reqAuthLogin = async (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = async (data: any) => authApi.post('/auth/register', data)
export const reqAuthLoadProfileByToken = async (token: string) =>
  authApi.get('/auth/load-user-by-token/' + token)

/* Rutas unidades */
export const reqCreateUnit = async (data: any) => api.post('/business-unit/save', data)
export const reqGetUnitByOwner = async () => api.get('/business-unit/get-by-owner')
export const reqDeleteUnitById = async (id: any) => api.post(`/business-unit/delete/${id}`)

/* Rutas productos */
export const reqCreateProduct = async (data: any) => api.post('/products', data)
export const reqGetProductByUnit = async (id: any) => api.get(`/products/by-business-unit/${id}`)
