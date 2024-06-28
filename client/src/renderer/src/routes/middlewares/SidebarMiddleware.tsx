import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/navbar'
import { Sidebar } from '@renderer/components/Sidebar'

const SidebarMiddleware = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default SidebarMiddleware
