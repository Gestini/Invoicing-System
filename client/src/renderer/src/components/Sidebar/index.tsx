import { Accordion, AccordionItem } from "@nextui-org/react"
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { Settings } from '@renderer/components/Settings'
import { ReactNode, useState } from 'react'
import {
  BiBadgeCheck,
  BiBriefcase,
  BiCalculator,
  BiCart,
  BiCheckShield,
  BiCrown,
  BiDetail,
  BiLabel,
  BiStats,
  BiUser
} from 'react-icons/bi'
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md"
import { useSelector } from 'react-redux'


interface SidebarItemProps {
  icon: ReactNode
  text: string
  path: string
}

export const Sidebar = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const [isExpanded, setIsExpanded] = useState(false)

  const sidebarItems = [
    {
      path: `/general/${unit?.id}`,
      icon: <MdDashboard />,
      text: 'General',
      data: [
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
      ]
    },
    {
      path: `/facturar/${unit?.id}`,
      icon: <BiCalculator />,
      text: 'Facturar',
      data: [
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
      ]
    },
    {
      path: `/empleados/${unit?.id}`,
      icon: <BiUser />,
      text: 'Empleados',
      data: [
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
      ]
    },
    {
      path: `/roles/${unit?.id}`,
      icon: <BiCheckShield />,
      text: 'Roles',
      data: [
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
      ]
    },
    {
      path: `/depositos/${unit?.id}`,
      icon: <BiCart />,
      text: 'Stock',
      data: [
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
        {
          path: '/general',
          name: 'General'
        },
      ]
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

  const itemClasses = {
    trigger: "px-2 py-0 bg-c-primary-variant-2 rounded-lg h-[36px] flex items-center",
  };

  return (
    <nav
      className={`flex fixed z-10 left-0 top-0 h-screen items-center justify-between transition-all duration-300 p-10'}`}
    >
      <div className='w-[48px] bg-[#111311] h-full flex flex-col items-center py-5 gap-[11px]'>
        <div className='h-[49px] w-[36px] bg-c-primary-variant-2 flex justify-center items-center rounded-md mb-[17px]'>
          <GestinyLogo />
        </div>
        <div className='h-[36px] w-[36px] bg-c-gray rounded-lg'></div>
        <div className='h-[36px] w-[36px] bg-c-gray rounded-lg'></div>
        <div className='h-[36px] w-[36px] bg-c-gray rounded-lg'></div>

      </div>
      <div className='bg-[#1c201d] w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 px-[14px] pr-[10px]'>
        <span className='font-semibold text-[11px] text-c-gray'>
          Menu
        </span>
        <Accordion
          itemClasses={itemClasses}
          showDivider={false}
          className='flex flex-col gap-[14px] overflow-auto overflow-x-hidden sidebarthumb'>
          {sidebarItems.map((item, index) => (
            <AccordionItem
              className='rounded-md font-medium cursor-pointer transition-colors text-white'
              key={index}
              aria-label={item.text}
              title={
                <div className='flex gap-1 justify-center items-center'>
                  <span className='text-c-primary-variant-1 text-[24px] mr-[7px]'>
                    {item.icon}
                  </span>
                  <span className='text-[14px] text-white rounded-sm top-2 flex items-center'>
                    {item.text}
                  </span>
                </div>
              }
            >
              <div className="flex pl-2 flex-col gap-[14px] ml-2">
                {
                  item?.data?.map((ele, ind) => (

                    <div className="text-[10px] text-c-sidebar-text flex gap-[14px] items-center" key={ind}>
                      <div className="h-[6px] w-[6px] rounded-full bg-c-primary-variant-1 shadow-point">
                      </div>

                      <span >
                        {ele.name}
                      </span>
                    </div>

                  ))
                }
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        <Settings />
      </div>
    </nav >
  )
}
