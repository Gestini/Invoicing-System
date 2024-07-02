import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { useParams } from 'react-router-dom'
import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { reqGetUnitById } from '@renderer/api/requests'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './bodymain.scss'

export const SidebarMiddleware = () => {
  const location = useLocation()
  const name = location.pathname.replace(/[\/\d]/g, '')
  const params = useParams()
  const dispatch = useDispatch()
  const unit = useSelector((state: any) => state.currentUnit)

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitById(params.id)
        dispatch(setUnit(response.data))
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
        {unit !== null && (
          <div className='w-full h-full flex flex-col gap-4'>
            <h5 className='text-4xl font-semibold text-c-primary'>{capitalize(name)}</h5>
            <Outlet />
          </div>
        )}
      </div>
    </>
  )
}
