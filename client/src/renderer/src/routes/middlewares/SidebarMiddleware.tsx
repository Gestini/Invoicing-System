import { reqGetUnitById } from '@renderer/api/requests'
import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { DepositIcon } from '@renderer/components/Icons/DepositIcon'
import { Sidebar } from '@renderer/components/Sidebar'
import { setUnit } from '@renderer/features/currentUnitSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useParams } from 'react-router-dom'
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
    <div className='ml-[55px] px-[20px] mt-5'>
      {unit !== null && (
        <>
          <Sidebar />
          <div className='w-full h-full flex flex-col gap-4'>
            <div>
              <h6 className='font-semibold flex items-center text-c-gray'>
                <DepositIcon />
                <span className='ml-1'>{capitalize(name)} /</span>
                <span className='ml-1 text-c-title'>Gestión de {capitalize(name)}</span>
              </h6>
              <h5 className='text-[24px] font-semibold text-c-title'>Gestión de {capitalize(name)}</h5>
            </div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
