import { UserUnits } from './Components/UserUnits'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <div className='sticky top-0 left-0 h-full'>
      <div className='flex'>
        <UserUnits />
        <SidebarSections />
      </div>
    </div>
  )
}
