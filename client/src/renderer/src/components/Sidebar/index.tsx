import { UserUnits } from './Components/UserUnits'
import { SidebarSections } from './Components/SidebarSections'
import { BsThreeDots } from 'react-icons/bs'

export const Sidebar = () => {
  return (
    <nav className='flex fixed z-10 left-0 top-0 h-screen items-center justify-between'>
      <UserUnits />
      <SidebarSections />
    </nav>
  )
}
