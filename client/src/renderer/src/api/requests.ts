import { authApi, api, apiNode, afipApi } from './axios'

/* Rutas usuarios */
export const reqUpdateUser = (data: any) => api.put('/user/update', data)
export const reqLoadUsersByIds = (data: any) => api.post('/user/get-by-ids', data)
export const reqLoadUserSessions = (data: any) => api.post('/user/get-user-sessions', data)
export const reqSearchUserByUsername = (username: string) => api.get(`/user/search-by-username/${username}`)

/* Rutas para manejar el auth */
export const reqAuthLogin = (data: any) => authApi.post('/auth/login', data)
export const reqAuthRegister = (data: any) => authApi.post('/auth/register', data)
export const reqAuthSendToken = (data: any) => authApi.post('/auth/request-password-reset', data)
export const reqAuthChangePassword = (data: any) => authApi.post('/auth/reset-password', data)
export const reqAuthLoadProfileByToken = (token: string) => authApi.get('/auth/load-user-by-token/' + token)

/* Rutas reportes */
export const reqGetTopSellers = (unitId: any) => api.get(`/report/get-top-sellers/${unitId}`)
export const reqGetSalesByMonth = (unitId: any) => api.get(`/report/get-sales-by-month/${unitId}`)
export const reqGetTopSellingProducts = (unitId: any) => api.get(`/report/get-top-selling-products/${unitId}`)

/* Rutas descuentos */
export const reqCreateDiscount = (unitId: any, data: any) => api.post(`/discount/create/${unitId}`, data)
export const reqEditDiscount = (discountId: string, data: any) => api.patch(`/discount/edit/${discountId}`, data)
export const reqFindDiscountByCode = (code: string) => api.get(`/discount/find-by-code/${code}`)
export const reqFindAllDiscountByUnitId = (unitId: any) => api.get(`/discount/find-all-by-unit-id/${unitId}`)
export const reqDeleteDiscount = (id: any) => api.delete(`/discount/delete-by-id/${id}`)

/* Rutas depositos */
export const reqEditDeposit = (id: any, data: any) => api.put(`/deposit/${id}`, data)
export const reqCreateDeposit = (data: any) => api.post('/deposit/create', data)
export const reqDeleteDeposit = (id: any) => api.delete(`/deposit/${id}`)
export const reqGetDepositByUnit = () => api.get('/deposit/get-by-unit-id')
export const reqAssingDepositToUnit = (depositId: any, unitId: any) => api.post(`/deposit/assign-deposit-to-unit/${depositId}/${unitId}`)
export const reqGetDepositsByCompany = (id: any) => api.get(`/deposit/get-by-company-id/${id}`)
export const reqUnlinkDepositFromUnit = (depositId: any, unitId: any) => api.delete(`/deposit/unlink-deposit-from-unit/${depositId}/${unitId}`)

/* Rutas compañias */
export const reqCreateCompany = (data: any) => api.post('/company/create', data)
export const reqDeleteCompany = (id: number) => api.delete(`/company/delete/${id}`)
export const reqGetCompanyById = (id: any) => api.get(`/company/get-by-id/${id}`)
export const reqGetCompanyByOwner = () => api.get('/company/get-by-owner')
export const findCompaniesWithUserAsOwnerOrEmployee = () => api.get('/company/find-companies-with-user-as-owner-or-employee')

/* Rutas unidades */
export const reqGetUnits = () => api.get('/business-unit/get-all')
export const reqCreateUnit = (data: any) => api.post('/business-unit/save', data)
export const reqGetUnitById = (id: any) => api.get('/business-unit/get/' + id)
export const reqGetUnitByOwner = () => api.get('/business-unit/get-by-owner')
export const reqUpdateUnitById = (id: any, data: any) => api.put(`/business-unit/update/${id}`, data)
export const reqDeleteUnitById = (id: any) => api.delete(`/business-unit/delete/${id}`)
export const reqGetUnitsByEcommerce = () => api.get('/business-unit/get-all-ecommerce')
export const reqGetUnitsByCompanyId = (id: any) => api.get(`/business-unit/get-by-company-id/${id}`)
export const reqGetUnitsWithDeposit = (companyId: any, depositId: any) => api.get(`/business-unit/get-units-with-deposit/${companyId}/${depositId}`)
export const reqGetUnitsMissingDeposit = (companyId: any, depositId: any) => api.get(`/business-unit/get-units-missing-deposit/${companyId}/${depositId}`)
export const reqSearchUnitsMissingDeposit = (companyId: any, depositId: any, searchValue: any) => api.get(`/business-unit/search-units-missing-deposit/${companyId}/${depositId}/${searchValue}`)
export const reqGetBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee = (companyId: any) => api.get(`/business-unit/find-business-units-by-company-id-and-with-user-as-owner-or-employee/${companyId}`)

/* Rutas invitaciones */
export const reqAcceptInviteUnit = (token: string) => api.post(`/invitation/accept/${token}`)
export const reqGetInviteUnitByToken = (token: string) => api.get(`/invitation/get-by-token/${token}`)

/* Rutas inventario */
export const reqRemoveInventoryById = (inventoryId: any) => api.delete(`/inventory/remove-inventory-by-id/${inventoryId}`)
export const reqGetUnitInventoryById = () => api.get('/inventory/find-by-unit-id')
export const reqSearchInventoryProduct = (name: string) => api.get(`/inventory/search-product-by-name?name=${name}`)
export const reqAsingProductsToInventory = (data: any) => api.post('/inventory/asing-product-to-inventory', data)

/* Rutas productos */
export const reqEditProduct = (id: any, data: any) => api.put(`/product/edit/${id}`, data)
export const reqCreateProduct = (data: any) => api.post('/product', data)
export const reqDeleteProduct = (id: any) => api.delete(`/product/${id}`)
export const reqSearchProduct = (name: string) => api.get(`/product/by-name/${name}`)
export const reqGetProductByDeposit = (id: any) => api.get(`/product/get-by-deposit-id/${id}`)
export const reqSearchProductByNameAndUnit = (name: string, id: any) => api.get(`/product/search/${name}/${id}`)

/* Rutas categorías productos */
export const reqEditProductCategory = (id: any, data: any) => api.patch(`/category/edit/${id}`, data)
export const reqCreateProductCategory = (data: any) => api.post('/category/create', data)
export const reqDeleteProductCategory = (id: any) => api.delete(`/category/delete-by-id/${id}`)
export const reqFindAllProductCategoriesFromUnit = () => api.get('/category/find-all')
export const reqSearchProductCategoryByName = (name: string) => api.get(`/category/search-by-name?name=${name}`)

/* Rutas proveedores */
export const reqGetSupplier = (id: any) => api.get(`/supplier/by-business-unit/${id}`)
export const reqEditSupplier = (id: any, data: any) => api.put(`/supplier/edit/${id}`, data)
export const reqCreateSupplier = (unitId: any, data: any) => api.post(`/supplier/create/${unitId}`, data)
export const reqDeleteSupplier = (id: number) => api.delete(`/suppliers/delete/${id}`)

/* Rutas facturacion */
export const reqGetInvoiceId = (id: any) => api.get(`/invoicing/get/${id}`)
export const reqCreateInvoice = (data: any) => api.post('/invoicing/save', data)
export const reqDeleteInvoice = (id: any) => api.delete(`/invoicing/delete/${id}`)
export const reqUpdateInvoice = (id: any, data: any) => api.put(`/invoicing/${id}`, data)
export const reqGetAllInvoicesByUnit = (id: any) => api.get(`/invoicing/get-by-unit/${id}`)

/* Rutas clientes */
export const reqEditClient = (id: any, data: any) => api.put(`/clients/${id}`, data)
export const reqDeleteClient = (id: any) => api.delete(`/clients/${id}`)
export const reqCreateClient = (data: any) => api.post('/clients', data)
export const reqGetClientByUnit = () => api.get('/clients/by-business-unit')

/* Rutas roles */
export const reqEditRole = (id: any, data: any) => api.put(`/role/${id}`, data)
export const reqCreateRole = (data: any) => api.post('/role', data)
export const reqDeleteRole = (id: any) => api.delete(`/role/${id}`)
export const reqAddRoleUser = (data: any) => api.post('/role/add-user', data)
export const reqRemoveRoleUser = (roleId: any, userId: any) => api.delete(`/role/remove-user/${roleId}/${userId}`)
export const reqGetRolesByUnit = (id: any) => api.get(`/role/get-by-unit/${id}`)
export const reqAddPermissionRole = (data: any) => api.post('/role/add-perms', data)
export const reqUserHasPermissions = ({ unitId, permissionName }) => api.get(`/role/has-permissions/${unitId}/${permissionName}`)
export const reqRemovePermissionRole = (roleId: any, permissionId) => api.post(`/role/remove-perms/${roleId}/${permissionId}`)
export const reqUserHasPermissionsMap = ({ unitId, data }) => api.post(`/role/has-permissions/${unitId}`, data)

/* Rutas empleados */
export const reqLeaveUnit = (id: any) => api.delete(`/employee/leave-unit/${id}`)
export const reqEditEmployee = (id: any, data: any) => api.put(`/employee/edit/${id}`, data)
export const reqCreateEmployee = (data: any, unitId: any) => api.post(`/employee/create/${unitId}`, data)
export const reqDeleteEmployee = (id: any) => api.delete(`/employee/delete/${id}`)
export const reqGetEmployeesByUnit = (id: any) => api.get(`/employee/get-by-unit/${id}`)
export const reqLoadEmployeeByRole = (id: any) => api.get(`/role/get-employees/${id}`)
export const reqSearchEmployeeByName = (unitId: any, name: string) => api.get(`/employee/get-by-name/${unitId}/${name}`)

export const reqGetActiveEmployeesByUnitId = (unitId: any) =>
    api.get(`/employee/get-active-employees-by-unit-id/${unitId}`, {
        headers: { 'X-UnitId': unitId },
    })

/* Rutas planes */
export const reqGetPlan = (planId: any) => api.get(`/plan/get/${planId}`)
export const reqGetAllPlans = () => api.get('/plan/get-all')

/* Rutas AFIP */
export const reqCreateInvoiceAfip = (data: any) => apiNode.post('/create-invoice', data)
export const reqCreateCreditNoteAfip = (data: any) => apiNode.post('/create-credit-note', data)
export const reqCreateCreditInvoiceAfip = (data: any) => apiNode.post('/create-credit-invoice', data)

/* Rutas INTEGRACIONES */
export const reqGenerateCert = (connectionData) => afipApi.post('/generate-cert', connectionData)
export const reqGetIntegrationsByUnit = (id: any) => api.get(`/integrations/${id}`)
export const reqGetConfigIntegrationsByUnit = (id: any, idintegration: any) => api.get(`/integrations/${id}/config/${idintegration}`)
export const reqPatchConfigIntegrationsByUnit = (id: any, payload: any) => api.patch(`/integrations/${id}/configure`, payload)

/* Rutas archivos */
export const reqGetFiles = () => api.get('/files/find-all')
export const reqCreateFile = (data: any, initalPath: string) => api.post(`/files/create?initalPath=${initalPath}`, data)
export const reqRenameFile = (id: number, data: any) => api.put(`/files/rename/${id}`, data)
export const reqDeleteFile = (id: number) => api.delete(`/files/delete/${id}`)
export const reqGetFileById = (id: any) => api.get(`/files/find-by-id/${id}`)
export const reqGetFileByPath = (path: any) => api.get(`/files/find-by-path?path=${path}`)
export const reqGetFilesByParentId = (id: any) => api.get(`/files/find-files-by-parent-id/${id}`)
export const reqGetFilesByParentPath = (path: any) => api.get(`/files/find-files-by-parent-path?path=${path}`)