import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reqGetUnitsByCompanyId } from '@renderer/api/requests'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { CreateUnitModal } from '@renderer/components/CreateCompanyForm'

export const SelectUnitDropdown = ({ activeSidebar }) => {
  const navigate = useNavigate()
  const company = useSelector((state: any) => state.currentCompany)
  const [sucursales, setSucursales] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const unit = useSelector((state: any) => state.currentUnit)
  console.log(unit)

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
      <CreateUnitModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      <Dropdown
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        classNames={{
          content: 'bg-c-sidebar-bg-2 text-c-title',
        }}
      >
        <DropdownTrigger>
          {activeSidebar && (
            <div
              className={`opacity-50 text-c-text cursor-pointer text-[18px] ${activeSidebar ? 'flex' : 'hidden'}`}
            >
              <FaAngleDown />
            </div>
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Dynamic Actions'
          selectionMode='multiple'
          selectedKeys={[String(unit.id)]}
          onAction={(key) =>
            key !== 'createUnit' && navigate('/dashboard/' + company.id + '/' + key)
          }
        >
          <DropdownSection title='Sucursales disponibles' showDivider items={sucursales}>
            {(item: any) => (
              <DropdownItem key={item.id} color='default'>
                {item.name}
              </DropdownItem>
            )}
          </DropdownSection>
          <DropdownItem
            color='default'
            key='createUnit'
            endContent={<PlusIcon />}
            onPress={() => setModalIsOpen(!modalIsOpen)}
          >
            Crear sucursal
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
