import { UserUnits } from './Components/userUnits'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <nav className='flex fixed z-10 left-0 top-0 h-screen items-center justify-between'>
      <UserUnits />
      <SidebarSections />
    </nav>
  )
}
