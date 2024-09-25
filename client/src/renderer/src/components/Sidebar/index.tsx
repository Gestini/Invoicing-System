import { UserCompanies } from './Components/UserCompanies'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <div className='h-full lg:sticky lg:top-0 lg:left-0 fixed left-0 z-50 flex'>
      <UserCompanies />
      <SidebarSections />
    </div>
  )
}
