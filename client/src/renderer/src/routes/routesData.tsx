import Home from '@renderer/pages/Home'
import Login from '@renderer/pages/Auth/Login'
import Register from '@renderer/pages/Auth/Register'
import { Roles } from '@renderer/pages/Roles'
import { Warehouse } from '@renderer/pages/Warehouse'
import { SalesTable } from '@renderer/pages/SalesTable'
import { ClientTable } from '@renderer/pages/ClientTable'
import { ReactElement } from 'react'
import { SupplierTable } from '@renderer/pages/SupplierTable'
import { EmployeeTable } from '@renderer/pages/EmployeeTable'
import { InvoicingTable } from '@renderer/pages/InvoicingTable'
import RecoverPasswordChange from '@renderer/pages/Auth/RecoverPasswordChange'
import RecoverPasswordCode from '@renderer/pages/Auth/RecoverPasswordCode'
import RecoverPasswordEmail from '@renderer/pages/Auth/RecoverPasswordEmail'
import { BiBox, BiUser, BiLeaf, BiGroup, BiCalculator, BiSolidDashboard } from 'react-icons/bi'

interface Route {
  path: string
  element: ReactElement
  title: string
}

interface RouteSection {
  icon: ReactElement | null
  path: string
  section: string
  routes: Route[]
}

const generalRoutes: RouteSection = {
  icon: <BiSolidDashboard />,
  path: '/dashboard/:unitId',
  section: 'Dashboard',
  routes: [{ path: '', element: <Home />, title: 'tablero' }],
}

const warehouseRoutes: RouteSection = {
  icon: <BiBox />,
  path: '/warehouse/:unitId',
  section: 'Depósitos',
  routes: [
    { path: '/product-management', element: <Warehouse />, title: 'productos' },
    { path: '/price-management', element: <></>, title: 'precios' },
    { path: '/stock-management', element: <></>, title: 'inventario' },
    {
      path: '/stock-movements',
      element: <></>,
      title: 'movimientos de inventario',
    },
    { path: '/inventory-list', element: <></>, title: 'lista de inventario' },
    { path: '/reception-management', element: <></>, title: 'recepción' },
    { path: '/categories', element: <></>, title: 'categorías' },
    { path: '/brands', element: <></>, title: 'marcas' },
    { path: '/consumptions', element: <></>, title: 'consumos' },
  ],
}

const posRoutes: RouteSection = {
  icon: <BiLeaf />,
  path: '/pos/:unitId',
  section: 'Punto de Venta',
  routes: [
    { path: '/close-cash', element: <></>, title: 'cerrar caja' },
    {
      path: '/close-cash-history',
      element: <></>,
      title: 'historial de cierre de caja',
    },
    { path: '/invoice-credit', element: <></>, title: 'facturación a crédito' },
    { path: '/debit-note', element: <></>, title: 'nota de débito' },
    { path: '/barcode-scanner', element: <></>, title: 'escáner de código de barras' },
    { path: '/email-sending', element: <></>, title: 'envío de correos' },
  ],
}

const hrRoutes: RouteSection = {
  icon: <BiGroup />,
  path: '/hr/:unitId',
  section: 'Recursos Humanos',
  routes: [
    { path: '/employees', element: <EmployeeTable />, title: 'empleados' },
    { path: '/roles', element: <Roles />, title: 'roles' },
    { path: '/contacts', element: <></>, title: 'contactos' },
  ],
}

const adminRoutes: RouteSection = {
  icon: <BiCalculator />,
  path: '/admin/:unitId',
  section: 'Admin',
  routes: [
    { path: '/suppliers', element: <SupplierTable />, title: 'proveedores' },
    { path: '/budgets', element: <></>, title: 'presupuestos' },
  ],
}

const operationsRoutes: RouteSection = {
  icon: <BiUser />,
  path: '/operations/:unitId',
  section: 'Operaciones',
  routes: [
    { path: '/sales', element: <SalesTable />, title: 'ventas' },
    { path: '/invoicing', element: <InvoicingTable />, title: 'facturación' },
    { path: '/clients', element: <ClientTable />, title: 'clientes' },
    { path: '/reports', element: <></>, title: 'informes' },
    { path: '/orders', element: <></>, title: 'órdenes' },
  ],
}

export const authRoutes: RouteSection = {
  icon: null,
  section: 'Autenticación',
  path: '',
  routes: [
    { path: '/login', element: <Login />, title: 'iniciar sesión' },
    { path: '/register', element: <Register />, title: 'registrarse' },
    {
      path: '/recovery-password/email',
      element: <RecoverPasswordEmail />,
      title: 'recuperar contraseña - email',
    },
    {
      path: '/recovery-password/code',
      element: <RecoverPasswordCode />,
      title: 'recuperar contraseña - código',
    },
    {
      path: '/recovery-password/change',
      element: <RecoverPasswordChange />,
      title: 'recuperar contraseña - cambio',
    },
  ],
}

export const routes = [
  hrRoutes,
  posRoutes,
  adminRoutes,
  generalRoutes,
  warehouseRoutes,
  operationsRoutes,
].reduce(
  (acc: any, item: RouteSection) =>
    acc.concat(
      item.routes.map((route) => ({
        ...route,
        section: item.section,
        icon: item.icon,
        path: item.path + route.path,
        routesLength: item.routes.length,
      })),
    ),
  [],
)

export const sidebarRoutes: RouteSection[] = [
  generalRoutes,
  adminRoutes,
  warehouseRoutes,
  hrRoutes,
  operationsRoutes,
  posRoutes,
]
