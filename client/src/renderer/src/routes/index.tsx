import Companies from '@renderer/pages/Companies/Companies'
import { Route, Routes } from 'react-router-dom'
import { ThemeMiddleware } from './middlewares/ThemeMiddleware'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { routes, authRoutes } from './routesData'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'
import { CurrentSecctionMiddleware } from './middlewares/CurrentSecctionMiddleware'
import { NavbarAndSidebarMiddleware } from './middlewares/NavbarAndSidebarMiddleware'
import { LoadCurrentUnitMiddleware } from './middlewares/LoadCurrentUnitMiddleware'

const Router = () => {
  return (
    <Routes>
      <Route element={<ThemeMiddleware />}>
        <Route path={'*'} element={<></>} />
        <Route element={<ProtectedRouteSession />}>
          <Route path={'/'} element={<Companies />} />
          <Route element={<LoadCurrentUnitMiddleware />}>
            <Route element={<NavbarAndSidebarMiddleware />}>
              {routes.map((route: any, index: number) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <CurrentSecctionMiddleware
                      icon={route.icon}
                      title={route.title}
                      section={route.section}
                      routesLength={route.routesLength}
                    >
                      {route.element}
                    </CurrentSecctionMiddleware>
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
