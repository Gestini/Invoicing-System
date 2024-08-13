import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { MdDashboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react'
import {
  BiUser,
  BiCart,
  BiCrown,
  BiLabel,
  BiBriefcase,
  BiCalculator,
  BiBadgeCheck,
  BiCheckShield,
} from 'react-icons/bi'
import React from 'react'
import GoogleLogo from '@renderer/assets/image/google.svg'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { setUnits } from '@renderer/features/unitsSlice'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { CreateUnitModal } from '../CreateCompanyForm'
import { reqGetUnitByOwner } from '@renderer/api/requests'

export const Sidebar = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitByOwner()
        dispatch(setUnits(response.data))
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }
    loadUserCompanies()
  }, [])

  const handleNavigate = (item) => {
    dispatch(setUnit(item))
    navigate(`/general/${item?.id}`)
  }

  const sidebarItems = [
    {
      path: `/general/${unit?.id}`,
      icon: <MdDashboard />,
      text: 'General',
      data: [
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
      ],
    },
    {
      path: `/facturar/${unit?.id}`,
      icon: <BiCalculator />,
      text: 'Facturar',
      data: [
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
      ],
    },
    {
      path: `/empleados/${unit?.id}`,
      icon: <BiUser />,
      text: 'Empleados',
      data: [
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
      ],
    },
    {
      path: `/roles/${unit?.id}`,
      icon: <BiCheckShield />,
      text: 'Roles',
      data: [
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
      ],
    },
    {
      path: `/depositos/${unit?.id}`,
      icon: <BiCart />,
      text: 'Stock',
      data: [
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
        {
          path: '/general',
          name: 'General',
        },
      ],
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
  ]

  const companies: any = useSelector((state: any) => state.units.data)

  const handleOpen = (path: string) => navigate(path)

  return (
    <nav
      className={`flex fixed z-10 left-0 top-0 h-screen items-center justify-between transition-all duration-300 p-10'}`}
    >
      <div className='w-[48px] bg-c-sidebar-bg-2 h-full flex flex-col items-center py-5 gap-[11px]'>
        <div className='h-[49px] w-[36px] bg-c-primary-variant-2 flex justify-center items-center rounded-md mb-[17px]'>
          <GestinyLogo />
        </div>
        {companies.map((item: any, index: any) => (
          <Tooltip
            key={index}
            placement='right'
            content={
              <div className='px-1 py-2'>
                <div className='text-small font-bold'>{item?.name}</div>
                <div className='text-tiny'>{item?.description}</div>
              </div>
            }
            color='secondary'
            classNames={{
              content: 'bg-c-sidebar-bg-2',
            }}
          >
            <div
              className={`${unit.id == item.id ? 'rounded-lg' : 'rounded-[100%]'} transition-all duration-600 h-[36px] w-[36px] bg-white cursor-pointer`}
              key={index}
              onClick={() => handleNavigate(item)}
            >
              <img src={GoogleLogo} className='w-full' alt='' />
            </div>
          </Tooltip>
        ))}
        <CreateUnitModal />
      </div>
      <div className='bg-c-sidebar-bg w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 px-[14px] pr-[10px]'>
        <span className='font-semibold text-[11px] text-c-gray'>Menu</span>
        <Accordion
          showDivider={false}
          className='px-0 flex flex-col gap-[14px] overflow-auto overflow-x-hidden sidebarthumb'
        >
          {sidebarItems.map((item, index) => (
            <AccordionItem
              className='rounded-md font-medium cursor-pointer transition-colors text-white'
              key={index}
              classNames={{
                indicator: 'text-medium text-[#ffffff] px-[5px]',
                trigger: `px-0 rounded-lg h-[36px] flex items-center ${location.pathname == item.path ? 'bg-c-primary-variant-2' : ''}`,
              }}
              aria-label={item.text}
              title={
                <div className='flex gap-1 items-center' onClick={() => handleOpen(item.path)}>
                  <span
                    className={`${location.pathname == item.path ? 'text-c-primary-variant-1' : 'text-white'} text-[24px] px-1 mr-[7px]`}
                  >
                    {item.icon}
                  </span>
                  <span className='text-[14px] text-white rounded-sm top-2 flex items-center'>
                    <ShortCellValue cellValue={item.text} maxLength={9} />
                  </span>
                </div>
              }
            >
              <div className='flex pl-2 flex-col gap-[14px] ml-2'>
                {item?.data?.map((ele, ind) => (
                  <div
                    className='text-[10px] text-c-sidebar-text flex gap-[14px] items-center'
                    key={ind}
                  >
                    <div className='h-[6px] w-[6px] rounded-full bg-c-primary-variant-1 shadow-point'></div>
                    <span>{ele.name}</span>
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </nav>
  )
}
