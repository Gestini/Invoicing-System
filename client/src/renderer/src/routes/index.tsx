import Invite from '@renderer/pages/Invite/Invite'
import Companies from '@renderer/pages/Companies/Companies'
import User from '@renderer/pages/User'
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

const Router = () => {
  return (
    <Routes>
      <Route path={'*'} element={<></>} />
      <Route path={'/invite'} element={<Invite />} />
      <Route element={<ProtectedRouteSession />}>
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
