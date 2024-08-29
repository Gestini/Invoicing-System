import React from 'react'
import { Link } from 'react-router-dom'
import { GestinyLogo } from '@renderer/assets/GestinyLogo'
import { useSelector } from 'react-redux'
import { UnitDropdown } from './UnitDropdown'
import { CreateUnitModal } from '../../CreateCompanyForm'

export const UserUnits = () => {
  const companies: any = useSelector((state: any) => state.units.data)
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null)

  return (
    <div className='w-[48px] bg-c-sidebar-bg-2 h-full flex flex-col items-center py-5 gap-[11px]'>
      <Link to={'/'}>
        <div className='h-[49px] w-[36px] flex justify-center items-center rounded-md mb-[17px]'>
          <GestinyLogo />
        </div>
      </Link>
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
  )
}
