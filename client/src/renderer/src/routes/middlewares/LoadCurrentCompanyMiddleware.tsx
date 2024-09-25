import React from 'react'
import { setCompany } from '@renderer/features/currentCompany'
import { reqGetCompanyById } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

export const LoadCurrentCompanyMiddleware = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const company = useSelector((state: any) => state.currentCompany)

  React.useEffect(() => {
    const loadCurrentCompany = async () => {
      try {
        if (!params.companyId) return
        const response = await reqGetCompanyById(params.companyId)

        if (response.data == null) {
          navigate('/')
        }

        dispatch(setCompany(response.data))
      } catch (error) {
        return navigate('/')
      }
    }
    loadCurrentCompany()
  }, [params.companyId])

  if (!company.id) return <></>

  return <Outlet />
}
