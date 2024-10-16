import { Navbar } from '@renderer/components/Navbar'
import { RootState } from '@renderer/store'
import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { useSelector } from 'react-redux'

export const PageLayout = ({ icon, title, section, children, routesLength }) => {
  const unit = useSelector((state: RootState) => state.currentUnit)

  return (
    <div className='w-full h-full flex-col flex pl-[100px] md:pl-0'>
      <Navbar />
      {unit.id && (
        <div className='flex  h-full flex-col gap-3 pr-3 pl-3 pb-3 overflow-y-auto'>
          {routesLength === 1 ? (
            <div>
              <h6 className='font-semibold flex items-center text-[#4f4d4d]  '>
                {icon}
                <span className='ml-1 '>{section}</span>
              </h6>
            </div>
          ) : (
            <div>
              <h6 className='font-semibold flex items-center text-[#4f4d4d] text-[14px]'>
                {icon}
                <span className='ml-1 text-[14px]'>{section} /</span>
                <span className='ml-1 text-c-title text-[14px]'>{capitalize(title)}</span>
              </h6>
              <h5 className='text-[18px] font-semibold text-c-title '>Gestión de {title}</h5>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}
