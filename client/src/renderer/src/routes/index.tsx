import Home from '@renderer/pages/Home'
import Login from '@renderer/pages/Auth/Login'
import Informes from '@renderer/pages/Informes'
import Register from '@renderer/pages/Auth/Register'
import Companies from '@renderer/pages/Companies/Companies'
import { Roles } from '@renderer/pages/Roles'
import { Warehouse } from '@renderer/pages/Warehouse'
import { SalesTable } from '@renderer/pages/SalesTable'
import { ClientTable } from '@renderer/pages/ClientTable'
import { SupplierTable } from '@renderer/pages/SupplierTable'
import { Route, Routes } from 'react-router-dom'
import { EmployeeTable } from '@renderer/pages/EmployeeTable'
import { InvoicingTable } from '@renderer/pages/InvoicingTable'
import { SidebarMiddleware } from './middlewares/SidebarMiddleware'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'
import RecoverPasswordEmail from '@renderer/pages/Auth/RecoverPasswordEmail'
import RecoverPasswordCode from '@renderer/pages/Auth/RecoverPasswordCode'
import RecoverPasswordChange from '@renderer/pages/Auth/RecoverPasswordChange'

const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<h1>ERROR 404</h1>} />
      <Route element={<ProtectedRouteSession />}>
        <Route path='/' element={<Companies />} />
        <Route element={<SidebarMiddleware />}>
          {/* DASHBOARD */}
          <Route path='/dashboard/:id' element={<Home />} />

          {/* WAREHOUSE */}
          <Route path='/warehouse/product-management/:id' element={<Warehouse />} />
          <Route path='/warehouse/price-management/:id' element={<Warehouse />} />
          <Route path='/warehouse/stock-management/:id' element={<Warehouse />} />
          <Route path='/warehouse/stock-movements/:id' element={<Warehouse />} />
          <Route path='/warehouse/inventory-list/:id' element={<Warehouse />} />
          <Route path='/warehouse/reception-management/:id' element={<Warehouse />} />
          <Route path='/warehouse/categories/:id' element={<Warehouse />} />
          <Route path='/warehouse/brands/:id' element={<Warehouse />} />
          <Route path='/warehouse/consumptions/:id' element={<Warehouse />} />
          <Route path='/warehouse/:id' element={<Warehouse />} />

          {/* HR */}
          <Route path='/hr/:id/user-management' element={<Roles />} />
          <Route path='/hr/:id/roles' element={<Roles />} />
          <Route path='/hr/roles/:id' element={<Roles />} />

          {/* POS */}
          <Route path='/pos/close-cash/:id' element={<Roles />} />
          <Route path='/pos/close-cash-history/:id' element={<Roles />} />
          <Route path='/pos/invoice-credit/:id' element={<Roles />} />
          <Route path='/pos/debit-note/:id' element={<Roles />} />
          <Route path='/pos/barcode-scanner/:id' element={<Roles />} />
          <Route path='/pos/email-sending/:id' element={<Roles />} />


          {/* OPERACIONES */}
          <Route path='/operations/sales/:id' element={<SalesTable />} />
          <Route path='/operations/invoicing/:id' element={<InvoicingTable />} />
          <Route path='/operations/clients/:id' element={<ClientTable />} />
          <Route path='/operations/reports/:id' element={<Informes />} />
          <Route path='/operations/orders/:id' element={<></>} />

          {/* ADMIN */}
          <Route path='/admin/suppliers/:id' element={<SupplierTable />} />
          <Route path='/admin/employees/:id' element={<EmployeeTable />} />
          <Route path='/admin/budgets/:id' element={<></>} />

          {/* CONTACT */}
          <Route path='/contact/' element={<></>} />
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/recovery-password/email' element={<RecoverPasswordEmail />} />
        <Route path='/recovery-password/code' element={<RecoverPasswordCode />} />
        <Route path='/recovery-password/change' element={<RecoverPasswordChange />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router
