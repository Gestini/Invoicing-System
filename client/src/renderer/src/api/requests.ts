import { authApi, api, apiNode, afipApi } from './axios'

/* Rutas usuarios */
export const reqSearchUserByUsername = (username: string) =>
  api.get(`/user/search-by-username/${username}`)
export const reqLoadUsersByIds = (data: any) => api.post('/user/get-by-ids', data)
export const reqLoadUserSessions = (data: any) => api.post('/user/get-user-sessions', data)
export const reqUpdateUser = (data: any) => api.put('/user/update', data);

/* Rutas para manejar el auth */
export const reqAuthLogin = async (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = async (data: any) => authApi.post('/auth/register', data)
export const reqAuthLoadProfileByToken = async (token: string) =>
  authApi.get('/auth/load-user-by-token/' + token)
export const reqAuthSendToken = async (data: any) =>
  authApi.post('/auth/request-password-reset', data)
export const reqAuthChangePassword = async (data: any) => authApi.post('/auth/reset-password', data)

/* Rutas compañias */
export const reqCreateCompany = async (data: any) => api.post('/company/create', data)
export const reqGetCompanyByOwner = async () => api.get('/company/get-by-owner')
export const reqGetCompanyById = async (id: any) => api.get(`/company/get-by-id/${id}`)
export const reqGetUnitByCompanyId = async(id:any) => api.get(`/company/get-unit-by-company/${id}`)

/* Rutas unidades */
export const reqCreateUnit = async (data: any) => api.post('/business-unit/save', data)
export const reqGetUnits = async () => api.get('/business-unit/get-all');
export const reqGetUnitById = async (id: any) => api.get('/business-unit/get/' + id)
export const reqGetUnitByOwner = async () => api.get('/business-unit/get-by-owner')
export const reqUpdateUnitById = async (id: any, data: any) => api.put(`/business-unit/update/${id}`, data)
export const reqGetUnitsByEcommerce = async () => api.get('/business-unit/get-all-ecommerce')
export const reqDeleteUnitById = async (id: any) => api.delete(`/business-unit/delete/${id}`)
export const reqGetUnitsByCompanyId = async (id: any) => api.get(`/business-unit/get-by-company-id/${id}`)

/* Rutas productos */
export const reqCreateProduct = async (data: any) => api.post('/products', data)
export const reqEditProduct = async (id: any, data: any) => api.put(`/products/${id}`, data)
export const reqDeleteProduct = async (id: any) => api.delete(`/products/${id}`)
export const reqGetProductByDeposit = async (id: any) => api.get(`/products/depositunit/${id}`)
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
export const reqGetDepositByUnit = async (id: any) => api.get(`/deposit/get-by-unit-id/${id}`)

/* Rutas clientes */
export const reqCreateClient = async (data: any) => api.post('/clients', data)
export const reqEditClient = async (id: any, data: any) => api.put(`/clients/${id}`, data)
export const reqDeleteClient = async (id: any) => api.delete(`/clients/${id}`)
export const reqGetClientByUnit = async (id: any) => api.get(`/clients/by-business-unit/${id}`)

/* Rutas roles */
export const reqCreateRole = async (data: any) => api.post('/role', data)
export const reqEditRole = async (id: any, data: any) => api.put(`/role/${id}`, data)
export const reqDeleteRole = async (id: any) => api.delete(`/role/${id}`)
export const reqGetRoletByUnit = async (id: any) => api.get(`/role/get-by-unit/${id}`)
export const reqAddPermissionRole = async (data: any) => api.post('/role/add-perms', data)
export const reqRemovePermissionRole = async (roleId: any, permissionId) =>
  api.post(`/role/remove-perms/${roleId}/${permissionId}`)
export const reqAddRoleUser = async (data: any) => api.post('/role/add-user', data)
export const reqRemoveRoleUser = async (roleId: any, userId: any) =>
  api.delete(`/role/remove-user/${roleId}/${userId}`)
export const reqUserHasPermissions = ({ unitId, permissionName }) =>
  api.get(`/role/has-permissions/${unitId}/${permissionName}`)

/* Rutas empleados */
export const reqCreateEmployee = async (data: any) => api.post('/employee', data)
export const reqGetEmployeesByUnit = async (id: any) => api.get(`/employee/get-by-unit/${id}`)
export const reqSearchEmployeeByName = (unitId: any, name: string) =>
  api.get(`/employee/get-by-name/${unitId}/${name}`)
export const reqLoadEmployeeByRole = (id: any) => api.get(`/role/get-employees/${id}`)
export const reqDeleteEmployee = (id: any) => api.delete(`/employee/delete/${id}`)
export const reqEditEmployee = (id: any, data: any) => api.put(`/employee/edit/${id}`, data)
export const reqLeaveUnit = (id: any) => api.delete(`/employee/leave-unit/${id}`)

/* Rutas planes */
export const reqGetAllPlans = () => api.get("/plan/get-all")
export const reqGetPlan = (planId: any) => api.get(`/plan/get/${planId}`)

/* Rutas AFIP */
export const reqCreateInvoiceAfip = async (data: any) => apiNode.post('/create-invoice', data)
export const reqCreateCreditInvoiceAfip = async (data: any) => apiNode.post('/create-credit-invoice', data)
export const reqCreateCreditNoteAfip = async (data: any) => apiNode.post('/create-credit-note', data)

/* Rutas INTEGRACIONES */
export const reqGenerateCert = async (connectionData) => afipApi.post('/generate-cert', connectionData);
export const reqGetIntegrationsByUnit = async (id: any) => api.get(`/integrations/${id}`)
export const reqGetConfigIntegrationsByUnit = async (id: any, idintegration: any) => api.get(`/integrations/${id}/config/${idintegration}`)
export const reqPatchConfigIntegrationsByUnit = async (id: any, payload: any) => api.patch(`/integrations/${id}/configure`, payload)

