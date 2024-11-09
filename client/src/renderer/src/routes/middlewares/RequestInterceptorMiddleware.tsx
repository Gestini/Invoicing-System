import React from 'react'
import { api } from '@renderer/api/axios'
import { Outlet } from 'react-router-dom'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'

export const RequestInterceptorMiddleware = () => {
  const unit = useSelector((state: RootState) => state.currentUnit)

  React.useEffect(() => {
    const interceptorId = api.interceptors.request.use(
      (config) => {
        const latestUnitId = unit.id
        if (latestUnitId) {
          config.headers['X-UnitId'] = latestUnitId
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    return () => {
      api.interceptors.request.eject(interceptorId)
    }
  }, [unit])

  return <Outlet />
}
