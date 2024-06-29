import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/Navbar'
import { Sidebar } from '@renderer/components/Sidebar'
import './bodymain.scss'

export const SidebarMiddleware = () => {
  return (
    <>
      <div className='ml-[55px] p-[10px] bodymain ' >
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}
