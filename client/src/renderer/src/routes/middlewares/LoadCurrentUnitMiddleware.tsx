import React from 'react'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { useParams } from 'react-router-dom'
import { reqGetUnitById } from '@renderer/api/requests'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const LoadCurrentUnitMiddleware = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unit = useSelector((state: any) => state.currentUnit)

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitById(params.unitId)
        if (response.data == null) {
          navigate('/')
        }
        dispatch(setUnit(response.data))
      } catch (error) {
        return
      }
    }
    loadUserCompanies()
  }, [params.unitId])

  if (!unit.id) return <></>

  return <Outlet />
}
