import { UserCompanies } from './Components/UserCompanies'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <div className='h-full md:sticky md:top-0 fixed top-0 left-0 z-50 flex'>
      <UserCompanies />
      <SidebarSections />
    </div>
  )
}
