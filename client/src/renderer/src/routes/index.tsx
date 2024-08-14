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
          <Route path='/general/:id' element={<Home />} />

          {/* DEPOSIT */}
          <Route path='/deposit/:id' element={<Warehouse />} />
          <Route path='/deposit/:id/product-management' element={<Warehouse />} />
          <Route path='/deposit/:id/price-management' element={<Warehouse />} />
          <Route path='/deposit/:id/stock-management' element={<Warehouse />} />
          <Route path='/deposit/:id/stock-movements' element={<Warehouse />} />
          <Route path='/deposit/:id/inventory-list' element={<Warehouse />} />
          <Route path='/deposit/:id/reception-management' element={<Warehouse />} />
          <Route path='/deposit/:id/categories' element={<Warehouse />} />
          <Route path='/deposit/:id/brands' element={<Warehouse />} />
          <Route path='/deposit/:id/consumptions' element={<Warehouse />} />

          {/* RRHH */}
          <Route path='/hr/:id/user-management' element={<Roles />} />
          <Route path='/hr/:id/roles' element={<Roles />} />
          <Route path='/roles/:id' element={<Roles />} />

          {/* POS */}
          <Route path='/pos/:id/close-cash' element={<Roles />} />
          <Route path='/pos/:id/close-cash-history' element={<Roles />} />
          <Route path='/pos/:id/invoice-credit' element={<Roles />} />
          <Route path='/pos/:id/debit-note' element={<Roles />} />
          <Route path='/pos/:id/barcode-scanner' element={<Roles />} />
          <Route path='/pos/:id/email-sending' element={<Roles />} />

          <Route path='/ventas/:id' element={<SalesTable />} />
          <Route path='/facturar/:id' element={<InvoicingTable />} />
          <Route path='/clientes/:id' element={<ClientTable />} />
          <Route path='/informes/:id' element={<Informes />} />
          <Route path='/pedidos/:id' element={<></>} />

          <Route path='/proveedores/:id' element={<SupplierTable />} />
          <Route path='/empleados/:id' element={<EmployeeTable />} />
          <Route path='/presupuestos/:id' element={<></>} />
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
