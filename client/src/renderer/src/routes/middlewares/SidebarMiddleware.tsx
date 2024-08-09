import React, { useState } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { useParams } from 'react-router-dom'
import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { reqGetUnitById } from '@renderer/api/requests'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './bodymain.scss'
import { DepositIcon } from '@renderer/components/Icons/DepositIcon'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";



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
    <div className='ml-[55px] p-[20px] bodymain'>
      {unit !== null && (
        <>
          <Sidebar />
          <div className='w-full h-full flex flex-col gap-3'>
            <div>
              <h6 className='font-semibold flex items-center text-c-gray'>
                <DepositIcon />
                <span className='ml-1'>
                  {capitalize(name)} /
                </span>
                <span className='text-white ml-1'>Gestión de Depósitos</span>
              </h6>
              <h5 className='text-[24px] text-white font-semibold'>Gestión de Depósitos</h5>
            </div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
