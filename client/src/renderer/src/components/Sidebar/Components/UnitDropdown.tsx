import { RootState } from '@renderer/store'
import { BiDoorOpen } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { reqLeaveUnit } from '@renderer/api/requests'
import { deleteCompany } from '@renderer/features/companiesSlice'
import { CompanySettings } from '@renderer/pages/Companies/Modals/CompanySettings'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

export const UnitDropdown = ({ company, openDropdownId, setOpenDropdownId }) => {
  const navigate = useNavigate()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const currentCompany = useSelector((state: RootState) => state.currentCompany)
  const [_, toggleModal] = useModal(modalTypes.companySettingsModal)
  const dispatch = useDispatch()

  const handleOpenDropdown = (event: any) => {
    event.preventDefault()
    setOpenDropdownId(company.id)
  }

  const leaveUnit = async () => {
    try {
      dispatch(deleteCompany(company.id))
      await reqLeaveUnit(company.id)

      if (company.id == unit.id) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    navigate(`/dashboard/${company?.id}`)
  }

  return (
    <>
      <CompanySettings />
      <Dropdown
        isOpen={openDropdownId == company.id}
        onClose={() => setOpenDropdownId(null)}
        classNames={{
          content: 'bg-c-sidebar-bg-2',
        }}
      >
        <DropdownTrigger>
          <div
            className={`${
              company.id == currentCompany?.id ? 'rounded-md bg-c-primary-variant-4' : ''
            } transition-all duration-500 ease-in-out flex items-center justify-center h-[32px] w-[32px] cursor-pointer`}
          >
            <Tooltip
              placement='right'
              content={
                <div className='px-1 py-2'>
                  <div className='text-small font-bold text-c-title'>{company?.name}</div>
                  <div className='text-tiny text-c-title'>{company?.description}</div>
                </div>
              }
              color='secondary'
              classNames={{
                content: 'bg-c-sidebar-bg-2',
              }}
            >
              <div
                onContextMenu={handleOpenDropdown}
                onClick={handleNavigate}
                className={`${
                  company.id == unit.id ? 'rounded-full' : 'rounded-full'
                } transition-all duration-500 ease-in-out w-[24px] h-[24px] uppercase flex items-center justify-center font-semibold text-c-title`}
              >
                {company.image ? (
                  <img src={company.image} className='w-full h-full rounded-sm' alt='' />
                ) : (
                  <span>{company.name.slice(0, 2)}</span>
                )}
              </div>
            </Tooltip>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label={`Dropdown menu for ${unit.name}`} variant='flat'>
          <DropdownItem key='ajustes' className='text-c-title' onPress={toggleModal}>
            Ajustes
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
            onPress={() => leaveUnit()}
            startContent={<BiDoorOpen className='text-[20px]' />}
          >
            Abandonar unidad
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
