import React from 'react'
import { RootState } from '@renderer/store'
import { permissions } from '@renderer/pages/Roles/Permissions'
import { useLocation } from 'react-router-dom'
import { setCompanies } from '@renderer/features/companiesSlice'
import { SidebarHeader } from './SidebarHeader'
import { sidebarRoutes } from '@renderer/routes/routesData'
import { SidebarSectionItem } from './SidebarSectionItem'
import { SidebarSectionAcordion } from './SidebarSectionAcordion'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarState, setViews } from '@renderer/features/sidebarSlice'
import {
  reqUserHasPermissionsMap,
  findCompaniesWithUserAsOwnerOrEmployee,
} from '@renderer/api/requests'

export const SidebarSections = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user.user)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const company = useSelector((state: RootState) => state.currentCompany)
  const documents = useSelector((state: RootState) => state.documents)
  const sidebarState = useSelector((state: RootState) => state.sidebar)

  const updatedRoutesConfig = sidebarRoutes.map((section) => {
    return {
      ...section,
      path: section.path
        .replace(':unitId', unit?.id ? String(unit.id) : '')
        .replace(':companyId', company?.id ? String(company.id) : '')
        .replace(':fileId', documents.currentPath?.id ? String(documents.currentPath.id) : ''),
    }
  })

  React.useEffect(() => {
    const permissionsList = Object.values(permissions).map((item) => item.permission)
    reqUserHasPermissionsMap({
      unitId: unit.id,
      data: permissionsList,
    })
      .then((res) => dispatch(setViews(res.data)))
      .catch(console.log)
      .finally()
  }, [user?.id, unit.id])

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await findCompaniesWithUserAsOwnerOrEmployee()
        dispatch(setCompanies(response.data))
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
        className={`bg-c-sidebar-bg w-[300px] pt-2 pb-5 h-screen border-r-md rounded-r-2xl flex flex-col justify-between gap-[16px] relative ${sidebarState.isActive ? 'max-w-[225px]' : 'max-w-[50px]'} animation`}
      >
        <div className='flex flex-col max-h-[90%]'>
          <div className='flex p-[6px] font-semibold text-[11px] text-gray-500  w-full'>
            <SidebarHeader activeSidebar={sidebarState.isActive} />
          </div>
          <span className='flex pl-[10px] font-semibold text-[11px] text-gray-500 mb-[17px]'>
            Menu
          </span>
          <div className='px-[6px] pr-[6px] overflow-y-auto overflow-x-hidden hoverScrollbar flex flex-col gap-[11px] '>
            {updatedRoutesConfig.map((item: any, index: number) => {
              const baseLocationPath = getBasePath(location.pathname)
              const baseItemPath = getBasePath(item.path)
              const hasPermissions =
                sidebarState.views[item.permission] !== undefined &&
                !sidebarState.views[item.permission]

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
