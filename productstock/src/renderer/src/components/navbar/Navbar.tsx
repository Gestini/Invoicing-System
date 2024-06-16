import React from 'react'
import { NavbarUserOptions } from './NavbarUserOption'
import { GradientTitle } from '../GradientTitle'

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between ">
      <GradientTitle  title ="Hola"/>
      <div className="div"></div>
      <div className="flex gap-4 items-center">
        {/* <ChangeTheme />
        <Notification /> */}
        <NavbarUserOptions />
      </div>
    </nav>
  )
}

export default Navbar
