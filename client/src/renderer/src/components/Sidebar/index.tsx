import {
  BiHome,
  BiCart,
  BiLabel,
  BiCrown,
  BiStats,
  BiDetail,
  BiBadgeCheck,
  BiCalculator,
} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import { IoGridOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';


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
        `text-white rounded-md relative flex items-center py-3 px-3 font-medium cursor-pointer flex-col transition-colors group ${isActive ? 'text-c-primary bg-c-primary-route-active' : 'hover:bg-c-primary-route-hover text-gray-600'} `
      }
    >
      {icon}
      <span className='text-[10px] bg-c-primary rounded-sm absolute p-1 top-2 left-0 opacity-0 group-hover:left-12 group-hover:opacity-100 transition-all duration-300'>{text}</span>
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
      path: '/stock',
      icon: <BiCart />,
      text: 'Stock',
    },
    {
      path: '/ventas',
      icon: <BiLabel />,
      text: 'Ventas',
    },
    {
      path: '/proveedores',
      icon: <BiCrown />,
      text: 'Proveedores',
    },
    {
      path: '/facturar',
      icon: <BiCalculator />,
      text: 'Facturar',
    },
    {
      path: '/presupuestos',
      icon: <BiDetail />,
      text: 'Presupuestos',
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

    <nav className='flex w-[55px] fixed z-10 left-0 top-0 h-screen items-center py-4 flex-col justify-between bg-c-primary-sidebar '>
      <IoGridOutline className='text-white w-5 h-5 cursor-pointer' />
      <div className='flex flex-col gap-[1px]'>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} path={item.path} icon={item.icon} text={item.text} />
        ))}
      </div>
      <Dropdown placement="top-start" className='bg-c-card'>
        <DropdownTrigger>
          <Button className='bg-[transparent] w-[100%] min-w-0'>
            <SlOptions className='text-gray-300 w-4 h-4 cursor-pointer' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className='text-c-title '>
          <DropdownItem key="Edit">Editar unidad</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  )
}
