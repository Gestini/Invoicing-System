import {
  BiHome,
  BiCart,
  BiLabel,
  BiStats,
  BiDetail,
  BiBadgeCheck,
  BiCalculator,
} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

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
        `rounded-md flex items-center py-3 px-2 font-medium cursor-pointer flex-col transition-colors group ${isActive ? 'text-c-primary bg-[#eadeff]' : 'hover:bg-c-primary-hover2 text-gray-600'} `
      }
    >
      {icon}
      <span className='text-[10px]'>{text}</span>
    </NavLink>
  )
}

export const Sidebar = () => {
  const sidebarItems = [
    {
      path: '/general',
      icon: <BiHome />,
      text: 'General',
    },
    {
      path: '/facturar',
      icon: <BiCalculator />,
      text: 'Facturar',
    },
    {
      path: '/stock',
      icon: <BiCart />,
      text: 'Stock',
    },
    {
      path: '/presupuestos',
      icon: <BiDetail />,
      text: 'Presupuestos',
    },
    {
      path: '/ventas',
      icon: <BiLabel />,
      text: 'Ventas',
    },
    {
      path: '/pedidos',
      icon: <BiBadgeCheck />,
      text: 'Pedidos',
    },
    {
      path: '/informes',
      icon: <BiStats />,
      text: 'Informes',
    },
  ]

  return (
    <div className='flex sticky h-calc-sidebar top-0 '>
      <nav className='flex flex-col bg-white border-r shadow-sm'>
        <div className='px-1 mt-[10px] flex-col gap-[30px] '>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} path={item.path} icon={item.icon} text={item.text} />
          ))}
        </div>
      </nav>
    </div>
  )
}
