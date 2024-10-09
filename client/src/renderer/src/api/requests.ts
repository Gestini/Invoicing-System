import { authApi, api, apiNode, afipApi } from './axios'

/* Rutas usuarios */
export const reqUpdateUser = (data: any) => api.put('/user/update', data)
export const reqLoadUsersByIds = (data: any) => api.post('/user/get-by-ids', data)
export const reqLoadUserSessions = (data: any) => api.post('/user/get-user-sessions', data)
export const reqSearchUserByUsername = (username: string) => api.get(`/user/search-by-username/${username}`)

/* Rutas para manejar el auth */
export const reqAuthLogin = async (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = async (data: any) => authApi.post('/auth/register', data)
export const reqAuthSendToken = async (data: any) => authApi.post('/auth/request-password-reset', data)
export const reqAuthChangePassword = async (data: any) => authApi.post('/auth/reset-password', data)
export const reqAuthLoadProfileByToken = async (token: string) => authApi.get('/auth/load-user-by-token/' + token)

/* Rutas compañias */
export const reqCreateCompany = async (data: any) => api.post('/company/create', data)
export const reqDeleteCompany = async (id: number) => api.delete(`/company/delete/${id}`)
export const reqGetCompanyById = async (id: any) => api.get(`/company/get-by-id/${id}`)
export const reqGetCompanyByOwner = async () => api.get('/company/get-by-owner')
export const findCompaniesWithUserAsOwnerOrEmployee = async () => api.get('/company/find-companies-with-user-as-owner-or-employee')

/* Rutas unidades */
export const reqGetUnits = async () => api.get('/business-unit/get-all')
export const reqCreateUnit = async (data: any) => api.post('/business-unit/save', data)
export const reqGetUnitById = async (id: any) => api.get('/business-unit/get/' + id)
export const reqGetUnitByOwner = async () => api.get('/business-unit/get-by-owner')
export const reqUpdateUnitById = async (id: any, data: any) => api.put(`/business-unit/update/${id}`, data)
export const reqDeleteUnitById = async (id: any) => api.delete(`/business-unit/delete/${id}`)
export const reqGetUnitsByEcommerce = async () => api.get('/business-unit/get-all-ecommerce')
export const reqGetUnitsByCompanyId = async (id: any) => api.get(`/business-unit/get-by-company-id/${id}`)
export const reqGetUnitsWithDeposit = async (companyId: any, depositId: any) => api.get(`/business-unit/get-units-with-deposit/${companyId}/${depositId}`)
export const reqGetUnitsMissingDeposit = async (companyId: any, depositId: any) => api.get(`/business-unit/get-units-missing-deposit/${companyId}/${depositId}`)
export const reqSearchUnitsMissingDeposit = async (companyId: any, depositId: any, searchValue: any) => api.get(`/business-unit/search-units-missing-deposit/${companyId}/${depositId}/${searchValue}`)
export const reqGetBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee = async (companyId: any) => api.get(`/business-unit/find-business-units-by-company-id-and-with-user-as-owner-or-employee/${companyId}`)

/* Rutas invitaciones */
export const reqAcceptInviteUnit = async (token: string) => api.post(`/invitations/accept/${token}`)
export const reqGetInviteUnitByToken = async (token: string) => api.get(`/invitations/get-by-token/${token}`)

/* Rutas inventario */
export const reqRemoveInventoryById = async (inventoryId: any) => api.delete(`/inventory/remove-inventory-by-id/${inventoryId}`)
export const reqGetUnitInventoryById = async (unitId: any) => api.get(`/inventory/find-by-unit-id/${unitId}`)
export const reqSearchInventoryProduct = async (name: string, unitId: number) => api.get(`/inventory/search-product-by-name-and-unit/${unitId}?name=${name}`)
export const reqAsingProductsToInventory = async (data: any) => api.post('/inventory/asing-product-to-inventory', data)

/* Rutas productos */
export const reqEditProduct = async (id: any, data: any) => api.put(`/products/edit/${id}`, data)
export const reqCreateProduct = async (data: any) => api.post('/products', data)
export const reqDeleteProduct = async (id: any) => api.delete(`/products/${id}`)
export const reqSearchProduct = async (name: string) => api.get(`/products/by-name/${name}`)
export const reqGetProductByUnit = async (id: any) => api.get(`/products/by-business-unit/${id}`)
export const reqGetProductByDeposit = async (id: any) => api.get(`/products/depositunit/${id}`)
export const reqSearchProductByNameAndUnit = async (name: string, id: any) => api.get(`/products/search/${name}/${id}`)

/* Rutas proveedores */
export const reqGetSupplier = async (id: any) => api.get(`/suppliers/by-business-unit/${id}`)
export const reqEditSupplier = async (id: any, data: any) => api.put(`/suppliers/${id}`, data)
export const reqCreateSupplier = async (data: any) => api.post('/suppliers', data)

/* Rutas facturacion */
export const reqGetInvoiceId = async (id: any) => api.get(`/invoicing/get/${id}`)
export const reqCreateInvoice = async (data: any) => api.post('/invoicing/save', data)
export const reqDeleteInvoice = async (id: any) => api.delete(`/invoicing/delete/${id}`)
export const reqUpdateInvoice = async (id: any, data: any) => api.put(`/invoicing/${id}`, data)
export const reqGetAllInvoicesByUnit = async (id: any) => api.get(`/invoicing/get-by-unit/${id}`)

/* Rutas depositos */
export const reqEditDeposit = async (id: any, data: any) => api.put(`/deposit/${id}`, data)
export const reqCreateDeposit = async (data: any) => api.post('/deposit/create', data)
export const reqDeleteDeposit = async (id: any) => api.delete(`/deposit/${id}`)
export const reqGetDepositByUnit = async (id: any) => api.get(`/deposit/get-by-unit-id/${id}`)
export const reqAssingDepositToUnit = async (depositId: any, unitId: any) => api.post(`/deposit/assign-deposit-to-unit/${depositId}/${unitId}`)
export const reqGetDepositsByCompany = async (id: any) => api.get(`/deposit/get-by-company-id/${id}`)
export const reqUnlinkDepositFromUnit = async (depositId: any, unitId: any) => api.delete(`/deposit/unlink-deposit-from-unit/${depositId}/${unitId}`)

/* Rutas clientes */
export const reqEditClient = async (id: any, data: any) => api.put(`/clients/${id}`, data)
export const reqDeleteClient = async (id: any) => api.delete(`/clients/${id}`)
export const reqCreateClient = async (data: any) => api.post('/clients', data)
export const reqGetClientByUnit = async (id: any) => api.get(`/clients/by-business-unit/${id}`)

/* Rutas roles */
export const reqEditRole = async (id: any, data: any) => api.put(`/role/${id}`, data)
export const reqCreateRole = async (data: any) => api.post('/role', data)
export const reqDeleteRole = async (id: any) => api.delete(`/role/${id}`)
export const reqAddRoleUser = async (data: any) => api.post('/role/add-user', data)
export const reqRemoveRoleUser = async (roleId: any, userId: any) => api.delete(`/role/remove-user/${roleId}/${userId}`)
export const reqGetRoletByUnit = async (id: any) => api.get(`/role/get-by-unit/${id}`)
export const reqAddPermissionRole = async (data: any) => api.post('/role/add-perms', data)
export const reqUserHasPermissions = ({ unitId, permissionName }) => api.get(`/role/has-permissions/${unitId}/${permissionName}`)
export const reqRemovePermissionRole = async (roleId: any, permissionId) => api.post(`/role/remove-perms/${roleId}/${permissionId}`)
export const reqUserHasPermissionsMap = ({ unitId, data }) => api.post(`/role/has-permissions/${unitId}`, data)

/* Rutas empleados */
export const reqLeaveUnit = (id: any) => api.delete(`/employee/leave-unit/${id}`)
export const reqEditEmployee = (id: any, data: any) => api.put(`/employee/edit/${id}`, data)
export const reqCreateEmployee = async (data: any) => api.post('/employee', data)
export const reqDeleteEmployee = (id: any) => api.delete(`/employee/delete/${id}`)
export const reqGetEmployeesByUnit = async (id: any) => api.get(`/employee/get-by-unit/${id}`)
export const reqLoadEmployeeByRole = (id: any) => api.get(`/role/get-employees/${id}`)
export const reqSearchEmployeeByName = (unitId: any, name: string) => api.get(`/employee/get-by-name/${unitId}/${name}`)

/* Rutas planes */
export const reqGetPlan = (planId: any) => api.get(`/plan/get/${planId}`)
export const reqGetAllPlans = () => api.get('/plan/get-all')

/* Rutas AFIP */
export const reqCreateInvoiceAfip = async (data: any) => apiNode.post('/create-invoice', data)
export const reqCreateCreditNoteAfip = async (data: any) => apiNode.post('/create-credit-note', data)
export const reqCreateCreditInvoiceAfip = async (data: any) => apiNode.post('/create-credit-invoice', data)

/* Rutas INTEGRACIONES */
export const reqGenerateCert = async (connectionData) => afipApi.post('/generate-cert', connectionData)
export const reqGetIntegrationsByUnit = async (id: any) => api.get(`/integrations/${id}`)
export const reqGetConfigIntegrationsByUnit = async (id: any, idintegration: any) => api.get(`/integrations/${id}/config/${idintegration}`)
export const reqPatchConfigIntegrationsByUnit = async (id: any, payload: any) => api.patch(`/integrations/${id}/configure`, payload)

/* Rutas archivos */
export const reqGetFiles = async () => api.get('/files/find-all')
export const reqCreateFile = async (data: any, initalPath: string) => api.post(`/files/create?initalPath=${initalPath}`, data)
export const reqRenameFile = async (id: number, data: any) => api.put(`/files/rename/${id}`, data)
export const reqDeleteFile = async (id: number) => api.delete(`/files/delete/${id}`)
export const reqGetFileById = async (id: any) => api.get(`/files/find-by-id/${id}`)
export const reqGetFileByPath = async (path: any) => api.get(`/files/find-by-path?path=${path}`)
export const reqGetFilesByParentId = async (id: any) => api.get(`/files/find-files-by-parent-id/${id}`)
export const reqGetFilesByParentPath = async (path: any) => api.get(`/files/find-files-by-parent-path?path=${path}`)