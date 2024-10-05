import React from 'react'
import { RootState } from '@renderer/store'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CreateUnitModal } from '@renderer/components/CreateUnitModal'
import { reqGetUnitsByCompanyId } from '@renderer/api/requests'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { MdHomeFilled } from 'react-icons/md'
import { FaCog, FaPlus } from 'react-icons/fa'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { IoIosArrowDown } from 'react-icons/io'
import { modalTypes, useModal } from '@renderer/utils/useModal'

export const SelectUnitDropdown = ({ activeSidebar }) => {
  const navigate = useNavigate()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const company = useSelector((state: RootState) => state.currentCompany)
  const [isOpen, setIsOpen] = React.useState(false)
  const [sucursales, setSucursales] = React.useState([])
  const [__, toggleCreateUnitModal] = useModal(modalTypes.addNewAccountModal)
  const [companySettingsModalIsOpen, _] = useModal(modalTypes.companySettingsModal)

  React.useEffect(() => {
    const loadData = async () => {
      if (isOpen) {
        const response = await reqGetUnitsByCompanyId(company.id)
        setSucursales(response.data)
      }
    }
    loadData()
  }, [isOpen])

  return (
    <>
      <CreateUnitModal />
      <Dropdown
        isOpen={isOpen && !companySettingsModalIsOpen}
        onOpenChange={setIsOpen}
        classNames={{
          content: 'bg-c-sidebar-bg-2 text-c-title',
        }}
      >
        <DropdownTrigger>
          <div className='cursor-pointer hover:opacity-75 duration-200 ease-in-out transition-all w-full rounded-md font-medium flex p-[4px] text-c-title bg-c-primary-variant-4'>
            <div className='flex items-center w-full h-[40px] gap-4'>
              <span className='text-c-primary flex items-center text-[20px] h-full'>
                <span className='flex justify-center pl-[5px]'>
                  <MdHomeFilled />
                </span>
              </span>
              {activeSidebar && (
                <div className='transition-transform flex w-full items-center rounded-lg justify-between'>
                  <div className={`flex flex-col ${activeSidebar ? 'flex' : 'hidden'}`}>
                    <h3 className='text-c-title text-[13px] whitespace-nowrap rounded-sm flex items-center w-full'>
                      <ShortCellValue cellValue={unit.name} maxLength={15} />
                    </h3>
                    <p className='text-c-text opacity-50 whitespace-nowrap'>
                      <ShortCellValue
                        cellValue={unit.address || company.description}
                        maxLength={25}
                      />
                    </p>
                  </div>
                  <IoIosArrowDown className='text-c-text opacity-50 text-[14px] mr-1' />
                </div>
              )}
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Dynamic Actions'
          selectionMode='multiple'
          itemClasses={{
            base: [
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-c-primary-variant-2',
              'dark:data-[hover=true]:bg-c-primary-variant-2',
              'data-[selectable=true]:focus:bg-default-50',
            ],
          }}
          selectedKeys={[String(unit.id)]}
          onAction={(key) =>
            !String(key).includes('key') && navigate('/dashboard/' + company.id + '/' + key)
          }
        >
          <DropdownSection title='Sucursales disponibles' showDivider items={sucursales}>
            {(item: any) => (
              <DropdownItem key={item.id} color='default'>
                {item.name}
              </DropdownItem>
            )}
          </DropdownSection>
          <DropdownItem color='default' key='key-ajustes' endContent={<FaCog />}>
            Ajustes
          </DropdownItem>
          <DropdownItem
            color='default'
            key='key-crearSucursal'
            endContent={<FaPlus />}
            onPress={toggleCreateUnitModal}
          >
            Crear sucursal
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
