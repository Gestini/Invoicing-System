import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/navbar'
import { Sidebar } from '@renderer/components/Sidebar'

const SidebarMiddleware = () => {
  return (
    <>
      <Navbar />
      <div className='ml-[45px] overflow-auto '>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default SidebarMiddleware
