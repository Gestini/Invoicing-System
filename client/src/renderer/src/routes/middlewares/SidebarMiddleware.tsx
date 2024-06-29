import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/Navbar'
import { Sidebar } from '@renderer/components/Sidebar'

const SidebarMiddleware = () => {
  return (
    <>
      <Navbar />
      <div className=' ml-[45px]   '>
        <Sidebar />
        <div className='px-3 py-3 w-full h-full flex flex-col gap-4'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SidebarMiddleware
