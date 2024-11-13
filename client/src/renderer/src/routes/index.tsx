import User from '@renderer/pages/User'
import Companies from '@renderer/pages/Companies/Companies'
import UnitConfig from '@renderer/pages/UnitSettings/UnitConfig'
import Integration from '@renderer/pages/UnitSettings/Integration'
import PlanSettings from '@renderer/pages/UnitSettings/PlanSettings'
import UnitSettings from '../pages/UnitSettings'
import { UnitInvite } from '@renderer/pages/UnitInvite'
import { PageLayout } from '@renderer/layouts/PageLayout'
import { SidebarLayout } from '@renderer/layouts/SidebarLayout'
import { Route, Routes } from 'react-router-dom'
import { PaymentGateway } from '@renderer/pages/PaymentGateway'
import { ThemeMiddleware } from './middlewares/ThemeMiddleware'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'
import { LoadCurrentUnitMiddleware } from './middlewares/LoadCurrentUnitMiddleware'
import { SectionPermissionMiddleware } from './middlewares/SectionPermissionMiddleware'
import { LoadCurrentCompanyMiddleware } from './middlewares/LoadCurrentCompanyMiddleware'
import { RequestInterceptorMiddleware } from './middlewares/RequestInterceptorMiddleware'
import { routes, authRoutes, RouteData } from './routesData'

const Router = () => {
  return (
    <Routes>
      <Route path={'*'} element={<>Error</>} />
      <Route element={<ProtectedRouteSession />}>
        <Route path='/settings/:id' element={<UnitSettings />}>
          <Route path='general' element={<UnitConfig />} />
          <Route path='plan' element={<PlanSettings />} />
          <Route path='integraciones' element={<Integration />} />
        </Route>
        <Route element={<ThemeMiddleware />}>
          <Route path='/' element={<Companies />} />
          <Route path='/account/edit' element={<User />} />
          <Route path='/invite/:token' element={<UnitInvite />} />
        </Route>
        <Route element={<LoadCurrentCompanyMiddleware />}>
          <Route path='/payment/:planId/:companyId' element={<PaymentGateway />} />
        </Route>
        <Route element={<LoadCurrentCompanyMiddleware />}>
          <Route element={<LoadCurrentUnitMiddleware />}>
            <Route element={<RequestInterceptorMiddleware />}>
              <Route element={<ThemeMiddleware />}>
                <Route element={<SidebarLayout />}>
                  {routes.map((route: RouteData, index: number) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <SectionPermissionMiddleware permission={route.permission}>
                          <PageLayout
                            icon={route.icon}
                            title={route.title}
                            section={route.section}
                            routesLength={route.routesLength}
                          >
                            {route.element}
                          </PageLayout>
                        </SectionPermissionMiddleware>
                      }
                    />
                  ))}
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        {authRoutes.routes.map((route: RouteData, index: number) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default Router
