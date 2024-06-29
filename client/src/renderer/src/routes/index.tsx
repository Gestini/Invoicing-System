import Home from '@renderer/pages/Home'

import Units from '@renderer/pages/Units'
import Login from '@renderer/pages/Auth/Login'
import Register from '@renderer/pages/Auth/Register'

import { SalesTable } from '@renderer/pages/SalesTable'
import { StockTable } from '@renderer/pages/StockTable'
import { SupplierTable } from '@renderer/pages/SupplierTable'
import { Route, Routes } from 'react-router-dom'

import SidebarMiddleware from './middlewares/SidebarMiddleware'
import ProtectedRouteAuth from './middlewares/ProtectedRouteAuth'
import ProtectedRouteSession from './middlewares/ProtectedRouteSession'

const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<h3>404</h3>} />
      <Route element={<ProtectedRouteSession />}>
        <Route path='/' element={<Units />} />
        <Route element={<SidebarMiddleware />}>
          <Route path='/general' element={<Home />} />
          <Route path='/stock' element={<StockTable />} />
          <Route path='/ventas' element={<SalesTable />} />
          <Route path='/proveedores' element={<SupplierTable />} />
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
