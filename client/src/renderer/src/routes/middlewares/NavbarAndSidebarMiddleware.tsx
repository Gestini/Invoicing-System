import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@renderer/components/Sidebar'
import { useDispatch } from 'react-redux'
import { setSidebarState } from '@renderer/features/sidebarSlice'

export const NavbarAndSidebarMiddleware = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const sidebarLocalState = localStorage.getItem('sidebarState')
    if (!sidebarLocalState) return
    if (sidebarLocalState === 'active') {
      dispatch(setSidebarState(true))
    }
  }, [])

  return (
    <div className='flex w-full max-w-[100vw] overflow-auto max-h-screen'>
      <Sidebar />
      <Outlet />
    </div>
  )
}
