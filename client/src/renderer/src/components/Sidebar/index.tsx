import React from 'react'
import { setUnit } from '@renderer/features/currentUnitSlice'
import { setUnits } from '@renderer/features/unitsSlice'
import { capitalize } from '../AppTable/TableComponents/utils'
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { sidebarRoutes } from '@renderer/routes/routesData'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { CreateUnitModal } from '../CreateCompanyForm'
import { reqGetUnitByOwner } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react'

export const Sidebar = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const companies: any = useSelector((state: any) => state.units.data)

  const updatedRoutesConfig = sidebarRoutes.map((section) => {
    return {
      ...section,
      path: section.path.replace(':unitId', unit.id),
    }
  })

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

  const handleNavigate = (item: any) => {
    dispatch(setUnit(item))
    navigate(`/dashboard/${item?.id}`)
  }

  const getBasePath = (path) => path.split('/')[1]

  return (
    <nav className={`flex fixed z-10 left-0 top-0 h-screen items-center justify-between  p-10'}`}>
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
              <div
                className={`${unit.id == item.id ? 'rounded-full' : 'rounded-full'} transition-all duration-500 ease-in-out w-[24px] h-[24px] uppercase flex items-center justify-center font-semibold text-white`}
              >
                {item.name.slice(0, 2)}
              </div>
            </div>
          </Tooltip>
        ))}
        <CreateUnitModal />
      </div>
      <div className=' bg-c-sidebar-bg w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 pl-[10px] pr-[0px] relative'>
        {/* <div className='absolute top-[260px] left-0 right-0 h-[100px] bg-gradient-to-t from-c-sidebar-bg to-transparent z-10 pointer-events-none'></div> */}
        <span className='font-semibold text-[11px] text-gray-300'>Menu</span>
        <div className='px-0 flex flex-col gap-[14px] overflow-auto sidebarthumb pr-[7px]'>
          {updatedRoutesConfig.map((item: any, index: number) => {
            const baseLocationPath = getBasePath(location.pathname)
            const baseItemPath = getBasePath(item.path)

            if (item.routes.length == 1) {
              return (
                <NavLink
                  to={item.path + item.routes[0].path}
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
                      className={`text-[14px] rounded-sm top-2 flex items-center ${baseLocationPath !== baseItemPath ? 'text-white' : ''}`}
                    >
                      <ShortCellValue cellValue={item.section} maxLength={9} />
                    </span>
                  </div>
                </NavLink>
              )
            }

            return (
              <Accordion
                key={item.section}
                showDivider={false}
                className='px-0 flex flex-col gap-[14px]'
              >
                <AccordionItem
                  aria-label={'Accordion ' + index}
                  className='rounded-md font-medium cursor-pointer'
                  classNames={{
                    indicator: 'text-medium px-[5px]',
                    trigger: `px-0 rounded-lg h-[36px] flex items-center ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-2' : ''}`,
                  }}
                  title={
                    <div className='flex gap-1 items-center'>
                      <span
                        className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-white'} text-[20px] px-1`}
                      >
                        {item.icon}
                      </span>
                      <span className='text-[14px] rounded-sm top-2 flex items-center text-white'>
                        <ShortCellValue cellValue={item.section} maxLength={9} />
                      </span>
                    </div>
                  }
                >
                  <div className='flex pl-2 flex-col gap-[14px] ml-2'>
                    {item?.routes?.map((ele, ind) => (
                      <NavLink
                        to={item.path + ele.path}
                        className='group text-[10px] text-c-sidebar-text flex gap-[14px] items-center'
                        key={ind}
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`h-[6px] w-[6px] rounded-full transition-all duration-200 ${
                                isActive
                                  ? 'bg-c-primary-variant-1 shadow-point'
                                  : 'bg-c-gray group-hover:bg-white'
                              }`}
                            ></div>
                            <span
                              className={`transition-all duration-200 ${
                                isActive ? 'text-c-primary-variant-1' : 'group-hover:text-white'
                              }`}
                            >
                              {capitalize(ele.title)}
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
