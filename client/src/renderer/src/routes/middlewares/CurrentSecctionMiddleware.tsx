import { capitalize } from '@renderer/components/AppTable/TableComponents/utils'
import { useSelector } from 'react-redux'

export const CurrentSecctionMiddleware = ({ section, icon, title, children, routesLength }) => {
  const unit = useSelector((state: any) => state.currentUnit)

  return (
    <div className=' px-[20px] mt-12 mb-5 w-full'>
      {unit !== null && (
        <div className='w-full h-full flex flex-col gap-4'>
          {routesLength === 1 ? (
            <div>
              <h6 className='font-semibold flex items-center text-[#4f4d4d]'>
                {icon}
                <span className='ml-1'>{section}</span>
              </h6>
            </div>
          ) : (
            <div>
              <h6 className='font-semibold flex items-center text-[#4f4d4d]'>
                {icon}
                <span className='ml-1'>{section} /</span>
                <span className='ml-1 text-c-title'>{capitalize(title)}</span>
              </h6>
              <h5 className='text-[24px] font-semibold text-c-title'>Gestión de {title}</h5>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}
