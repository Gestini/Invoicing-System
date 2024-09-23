import Invite from '@renderer/pages/Invite/Invite'

import UnitSettings from '../pages/UnitSettings'
import { Route, Routes } from 'react-router-dom'

import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { authRoutes } from './routesData'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'

import PlanSettings from '@renderer/pages/UnitSettings/PlanSettings'
import Integration from '@renderer/pages/UnitSettings/Integration'
import UnitConfig from '@renderer/pages/UnitSettings/UnitConfig'
import Home from '@renderer/pages/Home'
import Companies from '@renderer/pages/Companies/Companies'

const Router = () => {
  return (
    <Routes>
      <Route path={'/invite'} element={<Invite />} />
      <Route element={<ProtectedRouteSession />}>
        <Route path={'/'} element={<Companies />} />
        <Route path='/settings/:id' element={<UnitSettings />}>
          <Route path='general' element={<UnitConfig />} />
          <Route path='plan' element={<PlanSettings />} />
          <Route path='integraciones' element={<Integration />} />
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
