import React from 'react'
import { Link } from 'react-router-dom'
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { useDispatch, useSelector } from 'react-redux'
import { UnitDropdown } from './UnitDropdown'
import { CreateUnitModal } from '../../CreateCompanyForm'
import { BsThreeDots } from "react-icons/bs";
import { toggleModal } from '@renderer/features/currentModal'

export const UserUnits = () => {
  const dispatch = useDispatch()
  const companies: any = useSelector((state: any) => state.units.data)
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null)
  const handleToggleModal = (modalName: string) => dispatch(toggleModal(modalName))

  return (
    <div className='w-[48px] bg-c-sidebar-bg-2 h-full flex flex-col items-center justify-between py-5'>
      <Link to={'/'}>
        <div className='h-[49px] w-[36px] flex justify-center items-center rounded-md mb-[17px]'>
          <GestinyLogo />
        </div>
      </Link>
      <div className='flex-grow  gap-[11px] flex flex-col'>
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
      <BsThreeDots className='cursor-pointer' onClick={() => handleToggleModal('SettingsModal')} />
    </div>
  )
}
