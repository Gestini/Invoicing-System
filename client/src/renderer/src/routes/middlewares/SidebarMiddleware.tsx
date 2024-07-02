import { reqGetUnitById } from '@renderer/api/requests'
import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { Sidebar } from '@renderer/components/Sidebar'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { setUnit } from '@renderer/features/currentUnitSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './bodymain.scss'

export const SidebarMiddleware = () => {
  const location = useLocation()
  const name = location.pathname.replace('/', '')
  const params = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitById(params.id)
        dispatch(setUnit(response.data))
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }
    loadUserCompanies()
  }, [])

  return (
    <>
      <div className='ml-[55px] p-[20px] bodymain '>
        <Sidebar />
        <div className='w-full h-full flex flex-col gap-4'>
          <h5 className='text-4xl font-semibold text-c-primary'>{capitalize(name)}</h5>
          <Outlet />
        </div>
      </div>
    </>
  )
}
