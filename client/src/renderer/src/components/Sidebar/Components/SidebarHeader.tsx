import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { FaCog, FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { SelectUnitDropdown } from './SelectUnitDropdown'

export const SidebarHeader = ({ activeSidebar }) => {
  const unit = useSelector((state: any) => state.currentUnit)

  return (
    <div className='transition-transform w-full flex gap-4 items-center justify-between bg-c-primary-variant-4 rounded-lg p-1'>
      <div className='flex items-center gap-4'>
        <span className='flex items-center text-[20px] px-1 text-c-primary'>
          <FaHome />
        </span>
        <div className={`flex flex-col ${activeSidebar ? 'flex' : 'hidden'}`}>
          <h3 className='text-c-title text-[14px] rounded-sm flex items-center w-full'>
            <ShortCellValue cellValue={unit.name} maxLength={10} />
          </h3>
          <p className='text-c-text opacity-50'>
            <ShortCellValue cellValue={'Bs, Barrio Chino'} maxLength={16} />
          </p>
        </div>
      </div>
      {activeSidebar && (
        <div
          className={`opacity-50 text-c-text flex gap-2 items-center text-[18px] pr-2 ${activeSidebar ? 'flex' : 'hidden'}`}
        >
          <SelectUnitDropdown activeSidebar={activeSidebar} />
          <span className='bg-c-primary-variant-3 rounded-full p-1'>
            <FaCog />
          </span>
        </div>
      )}
    </div>
  )
}
