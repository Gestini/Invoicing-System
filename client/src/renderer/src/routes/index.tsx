import Home from '@renderer/pages/Home'
import Login from '@renderer/pages/Auth/Login'
import Informes from '@renderer/pages/Informes'
import Register from '@renderer/pages/Auth/Register'

import Companies from '@renderer/pages/Companies/Companies'
import Prueba from '@renderer/pages/Prueba'
import Deposito from "@renderer/pages/Deposito"
import { SalesTable } from '@renderer/pages/SalesTable'
import { StockTable } from '@renderer/pages/StockTable'
import { InvoicingTable } from '@renderer/pages/InvoicingTable'
import { SupplierTable } from '@renderer/pages/SupplierTable'
import { Route, Routes } from 'react-router-dom'

import { SidebarMiddleware } from './middlewares/SidebarMiddleware'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'

const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<h1>ERROR 404</h1>} />
      <Route element={<ProtectedRouteSession />}>
        <Route path='/' element={<div className='unidadeseccion'><Companies /></div>} />
        <Route path='/prueba' element={<Prueba />} />
        <Route path='/depositos' element={<Deposito />} />

        <Route element={<SidebarMiddleware />}>
          <Route path='/general/:id' element={<Home />} />
          <Route path='/stock/:id' element={<StockTable />} />
          <Route path='/ventas/:id' element={<SalesTable />} />
          <Route path='/facturar/:id' element={<InvoicingTable />} />
          <Route path='/informes/:id' element={<Informes />} />
          <Route path='/pedidos/:id' element={<></>} />
          <Route path='/proveedores/:id' element={<SupplierTable />} />
          <Route path='/presupuestos/:id' element={<></>} />
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router
