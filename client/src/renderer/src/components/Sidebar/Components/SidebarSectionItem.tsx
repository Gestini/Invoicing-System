import { NavLink } from 'react-router-dom'
import { BiLockIcon } from '@renderer/components/Icons/BiLockIcon'
import { Badge, Tooltip } from '@nextui-org/react'
import { ShortCellValue } from '../../AppTable/TableComponents/ShortCellValue'

export const SidebarSectionItem = ({
  item,
  baseItemPath,
  activeSidebar,
  hasPermissions,
  baseLocationPath,
}) => {
  return (
    <NavLink
      to={hasPermissions ? '#' : item.path + item.routes[0].path}
      className={`${hasPermissions ? 'cursor-no-drop opacity-50' : 'cursor-pointer'} pl-[2px] w-full rounded-md font-medium flex items-center p-[1px] text-c-title ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`}
    >
      <div className={`flex gap-4 items-center h-[31px] ${!activeSidebar && 'justify-center'}`}>
        <Tooltip
          isDisabled={activeSidebar}
          content={item.section}
          placement='left'
          classNames={{
            content: 'bg-c-sidebar-bg-2 text-c-title',
          }}
        >
          <span
            className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-c-title'} flex items-center text-[20px] h-full w-full justify-center`}
          >
            <Badge
              color='danger'
              content={hasPermissions && <BiLockIcon />}
              showOutline={false}
              shape='circle'
              className='w-full'
              size='sm'
              classNames={{ badge: 'bg-transparent' }}
            >
              <span className='flex justify-center pl-[6px]'>{item.icon}</span>
            </Badge>
          </span>
        </Tooltip>
        {activeSidebar && (
          <span
            className={`text-[14px] rounded-sm flex items-center w-full ${baseLocationPath !== baseItemPath ? 'text-c-title' : ''}`}
          >
            <ShortCellValue cellValue={item.section} maxLength={10} />
          </span>
        )}
      </div>
    </NavLink>
  )
}
