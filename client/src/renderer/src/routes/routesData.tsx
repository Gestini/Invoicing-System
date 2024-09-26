import Login from '@renderer/pages/Auth/Login'
import RecoverPasswordChange from '@renderer/pages/Auth/RecoverPasswordChange'
import RecoverPasswordCode from '@renderer/pages/Auth/RecoverPasswordCode'
import RecoverPasswordEmail from '@renderer/pages/Auth/RecoverPasswordEmail'
import Register from '@renderer/pages/Auth/Register'
import { ClientTable } from '@renderer/pages/ClientTable'
import { EmployeeTable } from '@renderer/pages/EmployeeTable'
import Facturation from '../pages/Facturation/index'
import Home from '@renderer/pages/Home'
import { InvoicingTable } from '@renderer/pages/InvoicingTable'
import Plans from '@renderer/pages/PaymentGateway/Plans'
import { Roles } from '@renderer/pages/Roles'
import { permissions } from '@renderer/pages/Roles/Permissions'
import { SalesTable } from '@renderer/pages/SalesTable'
import Settings from '@renderer/pages/Settings'
import { SupplierTable } from '@renderer/pages/SupplierTable'
import { Warehouse } from '@renderer/pages/Warehouse'
import Products from '@renderer/pages/Products'
import Documents from '@renderer/pages/Documents'
import { ReactElement } from 'react'
import Shops from '@renderer/pages/Settings/Shops'

import {
  MdAdminPanelSettings,
  MdAssessment,
  MdAttachMoney,
  MdDashboard,
  MdPeople,
  MdPointOfSale,
  MdShoppingCart,
  MdWarehouse,
  MdFolder  
} from 'react-icons/md'

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
  permission?: string | undefined
}

const generalRoutes: RouteSection = {
  icon: <MdDashboard />,
  path: '/dashboard/:companyId/:unitId?',
  section: 'Dashboard',
  routes: [{ path: '', element: <Home />, title: 'tablero' }],
}

const plansRoutes: RouteSection = {
  icon: <MdAssessment />,
  path: '/plans/:companyId/:unitId',
  section: 'Planes',
  routes: [{ path: '', element: <Plans />, title: 'tablero' }],
  permission: permissions.admin.permission,
}

const warehouseRoutes: RouteSection = {
  icon: <MdWarehouse />,
  path: '/warehouse/:companyId/:unitId',
  section: 'Depósitos',
  permission: permissions.warehouse.permission,
  routes: [
    { path: '/product-management', element: <Warehouse />, title: 'Depositos' },
    { path: '/brands', element: <Products />, title: 'productos' },
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
    { path: '/consumptions', element: <></>, title: 'consumos' },
  ],
}

const documentsRoutes: RouteSection = {
  icon: <MdFolder />,
  path: '/documents/:unitId',
  section: 'Documentos',
  permission: permissions.documents.permission,
  routes: [
    { path: '/general', element: <Documents />, title: 'Documentos' },
  ],
}

const posRoutes: RouteSection = {
  icon: <MdPointOfSale />,
  path: '/pos/:companyId/:unitId',
  section: 'Punto de Venta',
  permission: permissions.pos.permission,
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
  icon: <MdPeople />,
  path: '/hr/:companyId/:unitId',
  section: 'Recursos Humanos',
  permission: permissions.hr.permission,
  routes: [
    { path: '/employees', element: <EmployeeTable />, title: 'empleados' },
    { path: '/roles', element: <Roles />, title: 'roles' },
    { path: '/contacts', element: <></>, title: 'contactos' },
  ],
}

const adminRoutes: RouteSection = {
  icon: <MdAdminPanelSettings />,
  path: '/admin/:companyId/:unitId',
  section: 'Admin',
  permission: permissions.admin.permission,
  routes: [
    { path: '/suppliers', element: <SupplierTable />, title: 'proveedores' },
    { path: '/budgets', element: <></>, title: 'presupuestos' },
  ],
}

const operationsRoutes: RouteSection = {
  icon: <MdAttachMoney />,
  path: '/operations/:companyId/:unitId',
  section: 'Operaciones',
  permission: permissions.operations.permission,
  routes: [
    { path: '/sales', element: <SalesTable />, title: 'ventas' },
    { path: '/invoicing', element: <InvoicingTable />, title: 'facturación' },
    { path: '/afip', element: <Facturation />, title: 'Facturación AFIP' },
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

const UnitInfo: RouteSection = {
  icon: <MdShoppingCart />,
  path: '/settings/:companyId/:unitId',
  section: 'Tienda',
  routes: [
    { path: '/tienda/general', element: <Settings />, title: 'General' },
    { path: '/tienda/shops', element: <Shops />, title: 'Metricas' },
  ],
  permission: permissions.admin.permission,
}

export const routes = [
  hrRoutes,
  posRoutes,
  plansRoutes,
  adminRoutes,
  generalRoutes,
  warehouseRoutes,
  operationsRoutes,
  UnitInfo,
  documentsRoutes
].reduce(
  (acc: any, item: RouteSection) =>
    acc.concat(
      item.routes.map((route) => ({
        ...route,
        section: item.section,
        icon: item.icon,
        path: item.path + route.path,
        routesLength: item.routes.length,
        permission: item.permission || 'none',
      })),
    ),
  [],
)

export const sidebarRoutes: RouteSection[] = [
  generalRoutes,
  plansRoutes,
  warehouseRoutes,
  hrRoutes,
  operationsRoutes,
  posRoutes,
  adminRoutes,
  UnitInfo,
  documentsRoutes,
]
