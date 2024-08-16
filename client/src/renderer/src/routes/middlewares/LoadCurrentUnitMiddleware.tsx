import React from 'react'
import { Outlet } from 'react-router-dom'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { useParams } from 'react-router-dom'
import { reqGetUnitById } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'

export const LoadCurrentUnitMiddleware = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const unit = useSelector((state: any) => state.currentUnit)

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitById(params.unitId)
        if (response.data == null) {
          window.location.href = '/'
        }
        dispatch(setUnit(response.data))
      } catch (error) {
        return
      }
    }
    loadUserCompanies()
  }, [params.unitId])

  if (unit === null) return <></>

  return <Outlet />
}
