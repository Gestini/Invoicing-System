import React from 'react'
import { FaHome } from 'react-icons/fa'

import Sidebar from '@renderer/components/navbar/Navbar'
import { SidebarItem } from '@renderer/components/navbar/Navbar'

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar>
        <SidebarItem icon={<FaHome />} text={'Home'} active />
        <SidebarItem icon={<FaHome />} text={'Home'}  />
      </Sidebar>
      <div className="di">asdasd</div>
    </div>
  )
}

export default Home
