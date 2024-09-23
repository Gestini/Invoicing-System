import Invite from '@renderer/pages/Invite/Invite'
import Companies from '@renderer/pages/Companies/Companies'
import User from '@renderer/pages/User'
import UnitSettings from '../pages/UnitSettings'
import { Route, Routes } from 'react-router-dom'
import { PaymentGateway } from '@renderer/pages/PaymentGateway'
import { ThemeMiddleware } from './middlewares/ThemeMiddleware'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { routes, authRoutes } from './routesData'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'
import { CurrentSecctionMiddleware } from './middlewares/CurrentSecctionMiddleware'
import { LoadCurrentUnitMiddleware } from './middlewares/LoadCurrentUnitMiddleware'
import { NavbarAndSidebarMiddleware } from './middlewares/NavbarAndSidebarMiddleware'
import { SectionPermissionMiddleware } from './middlewares/SectionPermissionMiddleware'
import PlanSettings from '@renderer/pages/UnitSettings/PlanSettings'
import Integration from '@renderer/pages/UnitSettings/Integration'
import UnitConfig from '@renderer/pages/UnitSettings/UnitConfig'

const Router = () => {
  return (
    <Routes>
      <Route path={'*'} element={<>Error</>} />
      <Route path={'/invite'} element={<Invite />} />
      <Route element={<ProtectedRouteSession />}>
        <Route path={'/settings/:id'} element={<UnitSettings />}>
          {/* Rutas anidadas para cada sección del Settings */}
          <Route path={'general'} element={<UnitConfig />} />
          <Route path={'plan'} element={<PlanSettings />} />
          <Route path={'integraciones'} element={<Integration />} />
        </Route>
        <Route element={<ThemeMiddleware />}>
          <Route path={'/'} element={<Companies />} />
          <Route path='/account/edit' element={<User />} />
        </Route>
        <Route element={<LoadCurrentUnitMiddleware />}>
          <Route element={<LoadCurrentUnitMiddleware />}>
            <Route
              path={'/payment/:planId/:unitId'}
              element={
                <SectionPermissionMiddleware permission={'*'}>
                  <PaymentGateway />
                </SectionPermissionMiddleware>
              }
            />
          </Route>
          <Route element={<ThemeMiddleware />}>
            <Route element={<NavbarAndSidebarMiddleware />}>
              {routes.map((route: any, index: number) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <SectionPermissionMiddleware permission={route.permission}>
                      <CurrentSecctionMiddleware
                        icon={route.icon}
                        title={route.title}
                        section={route.section}
                        routesLength={route.routesLength}
                      >
                        {route.element}
                      </CurrentSecctionMiddleware>
                    </SectionPermissionMiddleware>
                  }
                />
              ))}
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        {authRoutes.routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default Router
