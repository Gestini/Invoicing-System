import React from 'react'
import { Link } from 'react-router-dom'
import { RootState } from '@renderer/store'
import { GestiniLogo } from '@renderer/assets/GestiniLogo'
import { BsThreeDots } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { UnitDropdown } from './UnitDropdown'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { CreateCompanyModal } from '@renderer/pages/Companies/Modals/CreateCompanyModal'

export const UserCompanies = () => {
  const companies = useSelector((state: RootState) => state.companies.data)
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null)
  const [_, toggleModal] = useModal(modalTypes.settingsModal)

  return (
    <div className='w-[48px] bg-c-sidebar-bg-2 h-screen flex flex-col items-center justify-between py-5'>
      <Link to={'/'}>
        <div className='h-[49px] w-[36px] flex justify-center items-center rounded-md mb-[17px]'>
          <GestiniLogo />
        </div>
      </Link>
      <div className='flex-grow  gap-[11px] flex flex-col'>
        {companies.map((company, index) => (
          <UnitDropdown
            key={index}
            company={company}
            openDropdownId={openDropdownId}
            setOpenDropdownId={setOpenDropdownId}
          />
        ))}
        <CreateCompanyModal />
      </div>
      <BsThreeDots className='cursor-pointer text-c-title' onClick={toggleModal} />
    </div>
  )
}
