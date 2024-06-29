import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/Navbar'
import { Sidebar } from '@renderer/components/Sidebar'
import "./bodymain.scss"

const SidebarMiddleware = () => {
  return (
    <>
      <Navbar />
      <div className='ml-[45px] p-[10px] bodymain ' >
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default SidebarMiddleware
