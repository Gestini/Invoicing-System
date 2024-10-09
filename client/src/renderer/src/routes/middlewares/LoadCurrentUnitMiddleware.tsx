import React from 'react'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { RootState } from '@renderer/store'
import { useParams } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reqGetUnitById,
  reqGetBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee,
} from '@renderer/api/requests'

export const LoadCurrentUnitMiddleware = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const navigate = useNavigate()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        dispatch({ type: 'RESET_UNIT_STATE' })
        dispatch({ type: 'RESET_DOCUMENTS_STATE' })
        if (params.unitId) {
          const response = await reqGetUnitById(params.unitId)
          dispatch(setUnit(response.data))
        } else {
          const response = await reqGetBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(
            params.companyId,
          )
          dispatch(setUnit(response.data[0]))
        }
      } catch (error) {
        return navigate('/')
      }
    }
    loadUserCompanies()
  }, [params.unitId, params.companyId])

  if (!unit.id) return <></>

  return <Outlet />
}
