import { Navbar } from '@renderer/components/Navbar'
import { Sidebar } from '@renderer/components/Sidebar'
import { Outlet } from 'react-router-dom'

export const NavbarAndSidebarMiddleware = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  )
}
