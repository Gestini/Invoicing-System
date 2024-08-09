import {
  BiUser,
  BiHome,
  BiCart,
  BiLabel,
  BiCrown,
  BiStats,
  BiDetail,
  BiBriefcase,
  BiBadgeCheck,
  BiCalculator,
  BiCheckShield,
} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { Settings } from '@renderer/components/Settings'
import { useSelector } from 'react-redux'
import { IoGridOutline } from 'react-icons/io5'
import { ReactNode, useState } from 'react'

interface SidebarItemProps {
  icon: ReactNode
  text: string
  path: string
}

const SidebarItem = ({ path, icon, text }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-white rounded-md relative flex items-center py-3 px-3 font-medium cursor-pointer flex-col transition-colors group ${isActive
          ? 'text-c-primary-variant-1 bg-c-primary-route-active'
          : 'hover:bg-c-primary-route-hover text-gray-600'
        } `
      }
    >
      {icon}
      <span className='text-[10px] bg-c-primary-variant-1 rounded-sm absolute p-1 top-2 left-0 opacity-0 group-hover:left-12 group-hover:opacity-100 transition-all duration-300'>
        {text}
      </span>
    </NavLink>
  )
}

export const Sidebar = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const [isExpanded, setIsExpanded] = useState(false)

  const sidebarItems = [
    {
      path: `/general/${unit?.id}`,
      icon: <BiHome />,
      text: 'General',
    },
    {
      path: `/facturar/${unit?.id}`,
      icon: <BiCalculator />,
      text: 'Facturar',
    },
    {
      path: `/empleados/${unit?.id}`,
      icon: <BiUser />,
      text: 'Empleados',
    },
    {
      path: `/roles/${unit?.id}`,
      icon: <BiCheckShield />,
      text: 'Roles',
    },
    {
      path: `/depositos/${unit?.id}`,
      icon: <BiCart />,
      text: 'Stock',
    },
    {
      path: `/pedidos/${unit?.id}`,
      icon: <BiBadgeCheck />,
      text: 'Pedidos',
    },
    {
      path: `/proveedores/${unit?.id}`,
      icon: <BiCrown />,
      text: 'Proveedores',
    },
    {
      path: `/clientes/${unit?.id}`,
      icon: <BiBriefcase />,
      text: 'Clientes',
    },
    {
      path: `/ventas/${unit?.id}`,
      icon: <BiLabel />,
      text: 'Ventas',
    },
    {
      path: `/presupuestos/${unit?.id}`,
      icon: <BiDetail />,
      text: 'Presupuestos',
    },
    {
      path: `/informes/${unit?.id}`,
      icon: <BiStats />,
      text: 'Informes',
    },
  ]

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <nav
      className={`flex fixed z-10 left-0 top-0 h-screen items-center py-4 flex-col justify-between bg-c-primary-sidebar transition-all duration-300 ${isExpanded ? 'w-[250px]' : 'w-[55px]'
        }`}
    >
      <IoGridOutline
        className={`text-white w-5 h-5 cursor-pointer transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        onClick={toggleSidebar}
      />
      <div className='flex flex-col gap-[1px]'>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} path={item.path} icon={item.icon} text={item.text} />
        ))}
      </div>
      <Settings />
    </nav>
  )
}
