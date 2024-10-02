import { UserCompanies } from './Components/UserCompanies'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <div className='h-full fixed lg:top-0 lg:left-0  left-0 z-50 flex'>
      <UserCompanies />
      <SidebarSections />
    </div>
  )
}
