import { UserUnits } from './Components/UserUnits'
import { SidebarSections } from './Components/SidebarSections'

export const Sidebar = () => {
  return (
    <div className='sticky flex top-0 left-0 h-screen'>
        <UserUnits />
        <SidebarSections />
    </div>
  )
}
