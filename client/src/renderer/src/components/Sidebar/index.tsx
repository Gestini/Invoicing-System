import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { MdDashboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react'
import { FiArrowDownLeft } from 'react-icons/fi'
import { FiArrowUpRight } from 'react-icons/fi'

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
import { PiGarageBold } from 'react-icons/pi'
import { RiContactsBookLine } from 'react-icons/ri'

import Package from '../../assets/Icons/package_2_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import Adfscaner from '../../assets/Icons/adf_scanner.svg'
import rrhh from '../../assets/Icons/diversity_3.svg'
import { RiContactsBook2Line } from 'react-icons/ri'

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
      text: 'Dashboard',
      direct: true,
      data: [
        {
          path: `/general/${unit?.id}`,
          name: 'General',
        },
        {
          path: `generalejemplo`,
          name: 'Ejemplo',
        },
      ]
    },
    {
      path: `/depositos/${unit?.id}`,
      icon: <img src={Package} className=' text-white ' />,
      text: 'Deposito',
      data: [
        {
          path: `/depositos/${unit?.id}`,
          name: 'Gestion de deposito',
        },
        {
          path: '/deposito',
          name: 'Gestion de productos',
        },
        {
          path: '/deposito',
          name: 'Gestion de precios',
        },
        {
          path: '/deposito',
          name: 'Gestion de Stock',
        },
        {
          path: '/deposito',
          name: 'Movimientos del inventario',
        },
        {
          path: '/deposito',
          name: 'Lista de inventario',
        },
        {
          path: '/deposito',
          name: 'Gestion de despachos y recepciones',
        },
        {
          path: '/deposito',
          name: 'Categorias',
        },
        {
          path: '/deposito',
          name: 'Consumo',
        },
      ],
    },
    {
      path: `/ingresos/${unit?.id}`,
      icon: <FiArrowDownLeft />,
      text: 'Ingresos',
      direct: true,
      data: [
        {
          path: '/deposito',
          name: 'Pedidos',
        },
        {
          path: '/deposito',
          name: 'Historial de ventas',
        },
        {
          path: '/deposito',
          name: 'Historial de devoluciones',
        },
        {
          path: '/deposito',
          name: 'Cotizaciones',
        },
        {
          path: '/deposito',
          name: 'Libro de cuentas',
        },
        {
          path: '/deposito',
          name: 'Remisiones o orden de servicio',
        },
        {
          path: '/deposito',
          name: 'Otros ingresos',
        },
      ],
    },
    {
      path: `/ingresos/${unit?.id}`,
      icon: <FiArrowUpRight className=' ' />,
      text: 'Gastos',

      data: [
        {
          path: '/deposito',
          name: 'Ordenes de compra',
        },
        {
          path: '/deposito',
          name: 'Documentos de compra',
        },
        {
          path: '/deposito',
          name: 'Gastos',
        },
        {
          path: '/deposito',
          name: 'Pagos',
        },
        {
          path: '/deposito',
          name: 'Cuentas por pagar',
        },
        {
          path: '/deposito',
          name: 'Cuenta corriente',
        },
      ],
    },
    {
      path: `/pos/${unit?.id}`,
      icon: <img src={Adfscaner} className=' text-white ' />,
      text: 'Puntos de venta (POS)',
    },
    {
      path: `/Contactos/${unit?.id}`,
      icon: <RiContactsBookLine />,
      text: 'Contactos',
    },
    {
      path: `/RRHHH/${unit?.id}`,
      icon: <img src={rrhh} className=' text-white ' />,
      text: 'Recursos humanos (RRHH)',
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
      icon: <BiCart />,
      text: 'Stock',
      path: `/stock/${unit?.id}`,

      data: [
        {
          path: `/stock/${unit?.id}`,
          name: 'Depositos',
        },
      ],
    },
    {
      path: `/pedidos/${unit?.id}`,
      icon: <BiBadgeCheck />,
      text: 'Pedidos',

      data: [
        {
          path: `/pedidos/${unit?.id}`,
          name: 'Pedidos'
        }
      ]
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
        {/* div grande */}
        {/* div accordion falso con mismo estilo */}
        <div className='px-0 flex flex-col gap-[14px] overflow-auto overflow-x-hidden sidebarthumb pr-[5px]'>
          {sidebarItems.map((item, index) => {
            if (item.direct) {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={`rounded-md font-medium cursor-pointer transition-colors  flex items-center text-white ${location.pathname === item.path ? 'bg-c-primary-variant-2' : ''}`}
                >
                  <div className='flex gap-1 items-center h-[36px]'>
                    <span
                      className={`${location.pathname === item.path ? 'text-c-primary-variant-1' : 'text-white'} text-[24px] px-1`}
                    >
                      {item.icon}
                    </span>
                    <span className='text-[14px] text-white rounded-sm top-2 flex items-center'>
                      <ShortCellValue cellValue={item.text} maxLength={9} />
                    </span>
                  </div>
                </NavLink>
              );
            }

            return (
              <Accordion
                key={index}
                showDivider={false}
                className='px-0 flex flex-col gap-[14px]'
              >
                <AccordionItem
                  className='rounded-md font-medium cursor-pointer transition-colors text-white'
                  classNames={{
                    indicator: 'text-medium text-[#ffffff] px-[5px]',
                    trigger: `px-0 rounded-lg h-[36px] flex items-center ${location.pathname === item.path ? 'bg-c-primary-variant-2' : ''}`,
                  }}
                  aria-label={item.text}
                  title={
                    <div className='flex gap-1 items-center'>
                      <span
                        className={`${location.pathname === item.path ? 'text-c-primary-variant-1' : 'text-white'} text-[24px] px-1`}
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
                      <NavLink
                        to={ele.path}
                        className="group text-[10px] text-c-sidebar-text flex gap-[14px] items-center"
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
                              className={`transition-all duration-200 ${isActive
                                ? 'text-c-primary-variant-1'
                                : 'group-hover:text-white'
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
            );
          })}
        </div>

      </div>
    </nav>
  )
}
