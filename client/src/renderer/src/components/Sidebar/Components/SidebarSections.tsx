import React from 'react'
import { setUnits } from '@renderer/features/unitsSlice'
import { permissions } from '@renderer/pages/Roles/Permissions'
import { useLocation } from 'react-router-dom'
import { sidebarRoutes } from '@renderer/routes/routesData'
import { useDispatch, useSelector } from 'react-redux'
import { reqGetUnitByOwner, reqUserHasPermissions } from '@renderer/api/requests'
import { SidebarSectionAcordion, SidebarSectionItem } from './SidebarItems'

export const SidebarSections = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const user = useSelector((state: any) => state.user.user)
  const location = useLocation()
  const dispatch = useDispatch()
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

  return (
    <div className=' bg-c-sidebar-bg w-[180px] h-full border-r-md rounded-r-2xl flex flex-col gap-[16px] p-5 pl-[10px] pr-[0px] relative'>
      <span className='font-semibold text-[11px] text-gray-300'>Menu</span>
      <div className='px-0 flex flex-col gap-[14px] overflow-auto sidebarthumb pr-[7px]'>
        {updatedRoutesConfig.map((item: any, index: number) => {
          const baseLocationPath = getBasePath(location.pathname)
          const baseItemPath = getBasePath(item.path)
          const hasPermissions = view[item.permission] !== undefined && !view[item.permission]

          if (item.routes.length == 1) {
            return (
              <SidebarSectionItem
                item={item}
                index={index}
                baseItemPath={baseItemPath}
                hasPermissions={hasPermissions}
                baseLocationPath={baseLocationPath}
              />
            )
          }

          return (
            <SidebarSectionAcordion
              item={item}
              index={index}
              baseItemPath={baseItemPath}
              hasPermissions={hasPermissions}
              baseLocationPath={baseLocationPath}
            />
          )
        })}
      </div>
    </div>
  )
}
