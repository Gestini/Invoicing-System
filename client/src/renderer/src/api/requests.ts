import { authApi, api } from './axios'

/* Rutas para manejar el auth */
export const reqAuthLogin = async (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = async (data: any) => authApi.post('/auth/register', data)
export const reqAuthLoadProfileByToken = async (token: string) =>
  authApi.get('/auth/load-user-by-token/' + token)

/* Rutas para crear unidades */
export const reqCreateUnit = async (data: any) => api.post('/business-unit/save', data)

/* Rutas productos */
export const reqCreateProduct = async (data: any) => api.post('/products', data)
export const reqGetProductByUnit = async (id: any) => api.get(`/products/by-business-unit/${id}`)
