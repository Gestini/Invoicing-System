import React from 'react'
import GoogleLogo from '@renderer/assets/image/google.svg'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { setUnits } from '@renderer/features/unitsSlice'
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { MdDashboard } from 'react-icons/md'
import { FiArrowUpRight } from 'react-icons/fi'
import { BiBox, BiMoney } from 'react-icons/bi'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { CreateUnitModal } from '../CreateCompanyForm'
import { reqGetUnitByOwner } from '@renderer/api/requests'
import { RiContactsBookLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react'
import {
  BiCart,
  BiUser,
  BiLeaf,
  BiLabel,
  BiCrown,
  BiGroup,
  BiBriefcase,
  BiBadgeCheck,
  BiCalculator,
  BiCheckShield,
} from 'react-icons/bi'

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
    navigate(`/dashboard/${item?.id}`)
  }

  const getBasePath = (path) => path.split('/')[1]

  const sidebarItems = [
    {
      path: `/dashboard/${unit?.id}`,
      icon: <MdDashboard />,
      text: 'Dashboard',
      direct: true,
    },
    {
      path: `/warehouse/${unit?.id}`,
      icon: <BiBox />,
      text: 'Depósitos',
      data: [
        {
          path: `/warehouse/${unit?.id}`,
          name: 'Gestión de Depósitos',
        },
        {
          path: `/warehouse/product-management/${unit?.id}`,
          name: 'Gestión de Productos',
        },
        {
          path: `/warehouse/price-management/${unit?.id}`,
          name: 'Gestión de Precios',
        },
        {
          path: `/warehouse/stock-management/${unit?.id}`,
          name: 'Gestión de Stock',
        },
        {
          path: `/warehouse/stock-movements/${unit?.id}`,
          name: 'Movimientos del Inventario',
        },
        {
          path: `/warehouse/inventory-list/${unit?.id}`,
          name: 'Lista de Inventario',
        },
        {
          path: `/warehouse/reception-management/${unit?.id}`,
          name: 'Gestión de Recepciones',
        },
        {
          path: `/warehouse/categories/${unit?.id}`,
          name: 'Categorías',
        },
        {
          path: `/warehouse/brands/${unit?.id}`,
          name: 'Marcas',
        },
        {
          path: `/warehouse/consumptions/${unit?.id}`,
          name: 'Consumo',
        },
      ],
    },
    {
      path: `/pos/`,
      icon: <BiLeaf />,
      text: 'Puntos de venta (POS)',
      data: [
        {
          path: `/pos/close-cash/:id`,
          name: 'Cerrar Caja',
        },
        {
          path: `/pos/close-cash-history/:id`,
          name: 'Historial de Cierre de Caja',
        },
        {
          path: `/pos/invoice-credit/:id`,
          name: 'Factura de Crédito',
        },
        {
          path: `/pos/debit-note/:id`,
          name: 'Nota de Débito',
        },
        {
          path: `/pos/barcode-scanner/:id`,
          name: 'Escáner de Códigos',
        },
        {
          path: `/pos/email-sending/:id`,
          name: 'Envío de Correos',
        },
      ],
    },
    {
      path: `/contact/`,
      icon: <RiContactsBookLine />,
      text: 'Contactos',
      direct: true
    },
    {
      path: `/hr/`,
      icon: <BiGroup />,
      text: 'Recursos Humanos (RRHH)',
      data: [
        {
          path: `/hr/${unit?.id}/user-management/`,
          name: 'Usuarios',
        },
        {
          path: `/hr/${unit?.id}/roles`,
          name: 'Roles',
        },
        {
          path: `/hr/roles/${unit?.id}`,
          name: 'Roles 2',
        },

      ]
    },
    {
      path: `/admin/`,
      icon: <BiCalculator />,
      text: 'Admin',
      data: [
        {
          path: `/admin/suppliers/${unit?.id}`,
          name: 'Proveedores',
        },
        {
          path: `/admin/employees/${unit?.id}`,
          name: 'Empleados',
        },
        {
          path: `/admin/budgets/${unit?.id}`,
          name: 'Informes',
        },
      ],
    },
    {
      path: `/operations/`,
      icon: <BiUser />,
      text: 'Operaciones',
      data: [
        {
          path: `/operations/sales/${unit?.id}`,
          name: 'Ventas',
        },
        {
          path: `/operations/invoicing/${unit?.id}`,
          name: 'Facturación',
        },
        {
          path: `/operations/clients/${unit?.id}`,
          name: 'Clientes',
        },
        {
          path: `/operations/reports/${unit?.id}`,
          name: 'Informes',
        },
        {
          path: `/operations/orders/${unit?.id}`,
          name: 'Pedidos',
        },
      ],
    }

  ];

  const companies: any = useSelector((state: any) => state.units.data)

  return (
    <nav
      className={`flex fixed z-10 left-0 top-0 h-screen items-center justify-between  p-10'}`}
    >
      <div className='w-[48px] bg-c-sidebar-bg-2 h-full flex flex-col items-center py-5 gap-[11px]'>
        <div className='h-[49px] w-[36px]  flex justify-center items-center rounded-md mb-[17px]'>
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
              className={`${unit.id == item.id ? 'rounded-md bg-c-primary-variant-4' : ''} transition-all duration-500 ease-in-out flex items-center justify-center h-[32px] w-[32px] cursor-pointer`}
              key={index}
              onClick={() => handleNavigate(item)}
            >
              <img
                src={GoogleLogo}
                className={`${unit.id == item.id ? 'rounded-full' : 'rounded-full'} transition-all duration-500 ease-in-out w-[24px] h-[24px] bg-white`}
                alt=''
              />
            </div>

          </Tooltip>
        ))}
        <CreateUnitModal />
      </div>
      <div className=' bg-c-sidebar-bg w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 pl-[10px] pr-[0px] relative'>
        <div className='absolute top-[290px] left-0 right-0 h-[210px] bg-gradient-to-t from-c-sidebar-bg to-transparent z-10 pointer-events-none'></div>
        <span className='font-semibold text-[11px] text-gray-300'>Menu</span>
        <div className='px-0 flex h-[300px] flex-col gap-[14px] overflow-auto sidebarthumb pr-[7px]'>
          {sidebarItems.map((item, index) => {
            const baseLocationPath = getBasePath(location.pathname)
            const baseItemPath = getBasePath(item.path)

            if (item.direct) {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={`rounded-md font-medium cursor-pointer flex items-center text-white ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-2' : ''}`}
                >
                  <div className='flex gap-1 items-center h-[36px]'>
                    <span
                      className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-gray-300'} text-[20px] px-1`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-[14px] rounded-sm top-2 flex items-center ${baseLocationPath !== baseItemPath ? 'text-gray-300' : ''}`}
                    >
                      <ShortCellValue cellValue={item.text} maxLength={9} />
                    </span>
                  </div>
                </NavLink>
              )
            }

            return (
              <Accordion key={index} showDivider={false} className='px-0 flex flex-col gap-[14px]'>
                <AccordionItem
                  className='rounded-md font-medium cursor-pointer'
                  classNames={{
                    indicator: 'text-medium px-[5px]',
                    trigger: `px-0 rounded-lg h-[36px] flex items-center ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-2' : ''}`,
                  }}
                  aria-label={item.text}
                  title={
                    <div className='flex gap-1 items-center'>
                      <span
                        className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-white'} text-[20px] px-1`}
                      >
                        {item.icon}
                      </span>
                      <span className='text-[14px] rounded-sm top-2 flex items-center text-white'>
                        <ShortCellValue cellValue={item.text} maxLength={9} />
                      </span>
                    </div>
                  }
                >
                  <div className='flex pl-2 flex-col gap-[14px] ml-2'>
                    {item?.data?.map((ele, ind) => (
                      <NavLink
                        to={ele.path}
                        className='group text-[10px] text-c-sidebar-text flex gap-[14px] items-center'
                        key={ind}
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`h-[6px] w-[6px] rounded-full transition-all duration-200 ${isActive
                                ? 'bg-c-primary-variant-1 shadow-point'
                                : 'bg-c-gray group-hover:bg-white'
                                }`}
                            ></div>
                            <span
                              className={`transition-all duration-200 ${isActive ? 'text-c-primary-variant-1' : 'group-hover:text-white'
                                }`}
                            >
                              {ele.name}
                            </span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
