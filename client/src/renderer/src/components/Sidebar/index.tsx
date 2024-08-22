import React from 'react'
import { setUnits } from '@renderer/features/unitsSlice'
import { capitalize } from '../AppTable/TableComponents/utils'
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { permissions } from '@renderer/pages/Roles/Permissions'
import { UnitDropdown } from './UnitDropdown'
import { sidebarRoutes } from '@renderer/routes/routesData'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { CreateUnitModal } from '../CreateCompanyForm'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { reqGetUnitByOwner, reqUserHasPermissions } from '@renderer/api/requests'

export const Sidebar = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const user = useSelector((state: any) => state.user.user)
  const location = useLocation()
  const dispatch = useDispatch()

  const companies: any = useSelector((state: any) => state.units.data)
  const [view, setView] = React.useState<Record<string, any>>({})
  const [selectedKeys, setSelectedKeys] = React.useState<any>([])
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null) // Nuevo estado para el dropdown abierto

  React.useEffect(() => {
    setSelectedKeys([])
  }, [unit])

  const updatedRoutesConfig = sidebarRoutes.map((section) => {
    return {
      ...section,
      path: section.path.replace(':unitId', unit.id),
    }
  })

  React.useEffect(() => {
    const loadPermissions = async () => {
      const permissionsList = Object.values(permissions).map((item) => item.permission)
      const results: Record<string, any> = {}

      await Promise.all(
        permissionsList.map(async (permission) => {
          try {
            const response = await reqUserHasPermissions({
              unitId: unit.id,
              permissionName: permission,
            })
            results[permission] = response.data
          } catch (error) {
            results[permission] = null
          }
        }),
      )

      setView(results)
    }

    loadPermissions()
  }, [user.id, unit.id])

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

  const getBasePath = (path) => path.split('/')[1]

  return (
    <nav className='flex fixed z-10 left-0 top-0 h-screen items-center justify-between'>
      <div className='w-[48px] bg-c-sidebar-bg-2 h-full flex flex-col items-center py-5 gap-[11px]'>
        <Link to={'/'}>
          <div className='h-[49px] w-[36px]  flex justify-center items-center rounded-md mb-[17px]'>
            <GestinyLogo />
          </div>
        </Link>
        {companies.map((unitItem: any, index: any) => (
          <UnitDropdown
            key={index}
            unitItem={unitItem}
            openDropdownId={openDropdownId}
            setOpenDropdownId={setOpenDropdownId}
          />
        ))}
        <CreateUnitModal />
      </div>
      <div className=' bg-c-sidebar-bg w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 pl-[10px] pr-[0px] relative'>
        <span className='font-semibold text-[11px] text-gray-300'>Menu</span>
        <div className='px-0 flex flex-col gap-[14px] overflow-auto sidebarthumb pr-[7px]'>
          {updatedRoutesConfig.map((item: any, index: number) => {
            const baseLocationPath = getBasePath(location.pathname)
            const baseItemPath = getBasePath(item.path)
            const hasPermissions = !view[item.permission]

            if (item.routes.length == 1) {
              return (
                <NavLink
                  to={item.path + item.routes[0].path}
                  key={index}
                  className={`rounded-md font-medium cursor-pointer flex items-center text-c-title ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`}
                >
                  <div className='flex gap-1 items-center h-[36px]'>
                    <span
                      className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-c-title'} text-[20px] px-1`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-[14px] rounded-sm top-2 flex items-center ${baseLocationPath !== baseItemPath ? 'text-c-title' : ''}`}
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
                selectedKeys={selectedKeys}
                selectionMode='multiple'
                onSelectionChange={setSelectedKeys}
                className='px-0 flex flex-col gap-[14px] cursor-no-drop'
              >
                <AccordionItem
                  key={'Accordion ' + index}
                  isDisabled={hasPermissions}
                  aria-label={'Accordion ' + index}
                  className='rounded-md font-medium cursor-pointer'
                  classNames={{
                    indicator: 'text-medium px-[5px]',
                    trigger: `${hasPermissions ? 'cursor-no-drop' : ''}  px-0 rounded-lg h-[36px] flex items-center ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`,
                  }}
                  title={
                    <div className='flex gap-1 items-center'>
                      <span
                        className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-c-title'} text-[20px] px-1`}
                      >
                        {item.icon}
                      </span>
                      <span className='text-[14px] rounded-sm top-2 flex items-center text-c-title'>
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
                                  ? 'bg-c-primary shadow-point'
                                  : 'bg-gray-400 group-hover:bg-gray-300'
                              }`}
                            ></div>
                            <span
                              className={`transition-all duration-200 ${
                                isActive ? 'text-c-primary' :  'text-gray-400 group-hover:text-gray-300'
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
