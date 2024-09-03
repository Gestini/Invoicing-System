import React from 'react'
import { NavLink } from 'react-router-dom'
import { capitalize } from '../../AppTable/TableComponents/utils'
import { BiLockIcon } from '@renderer/components/Icons/BiLockIcon'
import { useSelector } from 'react-redux'
import { ShortCellValue } from '../../AppTable/TableComponents/ShortCellValue'
import { Accordion, AccordionItem, Badge } from '@nextui-org/react'

export const SidebarSectionItem = ({ item, baseItemPath, hasPermissions, baseLocationPath, activeSidebar }) => {
  return (
    <NavLink
      to={hasPermissions ? '#' : item.path + item.routes[0].path}
      className={`${hasPermissions ? 'cursor-no-drop opacity-50' : 'cursor-pointer'} pl-[2px] w-full rounded-md font-medium flex items-center p-[1px] text-c-title ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`}
    >
      <div className={`flex gap-1 items-center h-[31px] ${!activeSidebar && 'justify-center'}`}>
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
            <span className='flex justify-center pl-[6px]'>
              {item.icon}
            </span>
          </Badge>
        </span>
        {
          activeSidebar &&
          <span
            className={`text-[14px] rounded-sm flex items-center w-full ${baseLocationPath !== baseItemPath ? 'text-c-title' : ''}`}
          >
            <ShortCellValue cellValue={item.section} maxLength={10} />
          </span>
        }
      </div>
    </NavLink>
  )
}

export const SidebarSectionAcordion = ({
  item,
  index,
  baseItemPath,
  hasPermissions,
  baseLocationPath,
  activeSidebar,
  handleSidebar,
}) => {
  const unit = useSelector((state: any) => state.currentUnit)
  const [selectedKeys, setSelectedKeys] = React.useState<any>([])

  React.useEffect(() => {
    setSelectedKeys([])
  }, [unit])

  const handleClick = () => {
    if (!hasPermissions) {
      handleSidebar(item.section)
    }
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
          indicator: 'text-medium  pr-[20px] ',
          trigger: `${hasPermissions ? 'cursor-no-drop' : ''} pl-[4px]  rounded-lg h-[31px] flex items-center ${baseLocationPath === baseItemPath ? 'bg-c-primary-variant-4' : ''}`,
        }}
        onClick={!activeSidebar && handleClick}
        title={
          <div className='flex gap-1 items-center'>
            <span
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
            <span className='text-[14px] rounded-sm top-2 flex items-center text-c-title w-[130px]'>
              {
                activeSidebar &&
                <ShortCellValue cellValue={item.section} maxLength={16} />
              }
            </span>
          </div>
        }>
        {
          activeSidebar ?
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
                        className={`h-[6px] w-[6px] rounded-full transition-all duration-200 ${isActive ? 'bg-c-primary shadow-point' : 'bg-gray-400 group-hover:bg-gray-300'
                          }`}
                      ></div>
                      <span
                        className={`transition-all duration-200 ${isActive ? 'text-c-primary' : 'text-gray-400 group-hover:text-gray-300'
                          }`}
                      >
                        {capitalize(ele.title)}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            :
            <></>
        }
      </AccordionItem>
    </Accordion>
  )
}

