import React from 'react'
import { setUnits } from '@renderer/features/unitsSlice'
import { permissions } from '@renderer/pages/Roles/Permissions'
import { useLocation } from 'react-router-dom'
import { sidebarRoutes } from '@renderer/routes/routesData'
import { sidebarStateType } from '@renderer/features/sidebarSlice'
import { setSidebarState } from '@renderer/features/sidebarSlice'
import { SidebarSectionItem } from './SidebarSectionItem'
import { SidebarSectionAcordion } from './SidebarSectionAcordion'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { reqGetUnitByOwner, reqUserHasPermissions } from '@renderer/api/requests'

export const SidebarSections = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const user = useSelector((state: any) => state.user.user)
  const location = useLocation()
  const dispatch = useDispatch()

  const sidebarState: sidebarStateType = useSelector((state: any) => state.sidebar)
  const [view, setView] = React.useState<Record<string, any>>({})

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

  const getBasePath = (path: string) => path.split('/')[1]

  const handleSidebar = () => {
    dispatch(setSidebarState(!sidebarState.isActive))
    localStorage.setItem('sidebarState', !sidebarState.isActive ? 'active' : 'none')
  }

  return (
    <>
      <div
        className={`bg-c-sidebar-bg w-[300px] pt-5 pb-5 h-screen border-r-md rounded-r-2xl flex flex-col justify-between gap-[16px] relative ${sidebarState.isActive ? 'max-w-[225px]' : 'max-w-[50px]'} animation`}
      >
        <div className='flex flex-col max-h-[90%]'>
          <span className='flex pl-[10px] font-semibold text-[11px] text-gray-500 mb-[17px]'>
            Menu
          </span>
          <div className='px-[6px] pr-[6px] overflow-y-auto overflow-x-hidden sidebarthumb flex flex-col gap-[11px] '>
            {updatedRoutesConfig.map((item: any, index: number) => {
              const baseLocationPath = getBasePath(location.pathname)
              const baseItemPath = getBasePath(item.path)
              const hasPermissions = view[item.permission] !== undefined && !view[item.permission]

              if (item.routes.length == 1) {
                return (
                  <SidebarSectionItem
                    key={index}
                    item={item}
                    baseItemPath={baseItemPath}
                    hasPermissions={hasPermissions}
                    baseLocationPath={baseLocationPath}
                    activeSidebar={sidebarState.isActive}
                  />
                )
              }

              return (
                <SidebarSectionAcordion
                  key={index}
                  item={item}
                  index={index}
                  baseItemPath={baseItemPath}
                  hasPermissions={hasPermissions}
                  baseLocationPath={baseLocationPath}
                  activeSidebar={sidebarState.isActive}
                  handleSidebar={handleSidebar}
                />
              )
            })}
          </div>
        </div>
        <div
          onClick={handleSidebar}
          className='cursor-pointer ml-[10px] h-[30px] w-[30px] flex items-center justify-center bg-c-primary-variant-4 rounded-md'
        >
          <FaArrowRightFromBracket
            className={`text-c-title animation ${sidebarState.isActive && 'rotate-180'}`}
          />
        </div>
      </div>
    </>
  )
}
