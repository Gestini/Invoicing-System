import React from 'react'
import { NavLink } from 'react-router-dom'
import { capitalize } from '../../AppTable/TableComponents/utils'
import { BiLockIcon } from '@renderer/components/Icons/BiLockIcon'
import { useSelector } from 'react-redux'
import { ShortCellValue } from '../../AppTable/TableComponents/ShortCellValue'
import { Accordion, AccordionItem, Badge, Tooltip } from '@nextui-org/react'

export const SidebarSectionAcordion = ({
  item,
  index,
  baseItemPath,
  activeSidebar,
  handleSidebar,
  hasPermissions,
  baseLocationPath,
}) => {
  const unit = useSelector((state: any) => state.currentUnit)
  const [selectedKeys, setSelectedKeys] = React.useState<any>([])

  React.useEffect(() => {
    setSelectedKeys([])
  }, [unit.id])

  const openSidebar = () => {
    if (!activeSidebar) {
      handleSidebar()
    }
  }

  return (
    <Accordion
      key={item.section}
      showDivider={false}
      selectedKeys={activeSidebar ? selectedKeys : []}
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
          trigger: `${hasPermissions ? 'cursor-no-drop' : ''} pl-[4px]  rounded-lg h-[31px] flex items-center ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`,
        }}
        startContent={
          <>
            <Tooltip
              isDisabled={activeSidebar}
              content={item.section}
              placement='left'
              classNames={{
                content: 'bg-c-sidebar-bg-2 text-c-title',
              }}
            >
              <span
                onClick={openSidebar}
                className={`${baseLocationPath === baseItemPath ? 'text-c-primary' : 'text-c-title'} flex items-center text-[20px] px-1`}
              >
                <Badge
                  color='danger'
                  content={hasPermissions && <BiLockIcon />}
                  showOutline={false}
                  shape='circle'
                  size='sm'
                  classNames={{ badge: 'bg-transparent' }}
                >
                  {item.icon}
                </Badge>
              </span>
            </Tooltip>
          </>
        }
        title={
          <div className='flex gap-1 items-center'>
            <span className='text-[14px] rounded-sm top-2 flex items-center text-c-title w-[140px]'>
              {activeSidebar && <ShortCellValue cellValue={item.section} maxLength={16} />}
            </span>
          </div>
        }
      >
        <div className={`pl-2 flex-col gap-[14px] ml-2 ${activeSidebar ? 'flex' : 'hidden'}`}>
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
                      isActive ? 'bg-c-primary shadow-point' : 'bg-gray-400 group-hover:bg-gray-300'
                    }`}
                  ></div>
                  <span
                    className={`transition-all duration-200 ${
                      isActive ? 'text-c-primary' : 'text-gray-400 group-hover:text-gray-300'
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
}
