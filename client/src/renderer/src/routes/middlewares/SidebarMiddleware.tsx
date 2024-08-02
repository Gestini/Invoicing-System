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
  const pathname = location.pathname
  const parts = pathname.split('/')
  const name = parts[1]

  const unit = useSelector((state: any) => state.currentUnit)
  const params = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitById(params.id)
        if (response.data == null) {
          window.location.href = '/'
        }
        dispatch(setUnit(response.data))
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }
    loadUserCompanies()
  }, [])

  return (
    <div className='ml-[55px] px-[20px]  bodymain'>
      {unit !== null && (
        <>
          <Sidebar />
          <div className='w-full h-full flex flex-col gap-4'>
            <h5 className='text-4xl font-semibold text-c-primary'>{capitalize(name)}</h5>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
