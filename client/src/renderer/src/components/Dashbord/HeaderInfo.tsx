import { Card } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { IoIosArrowDown } from 'react-icons/io'
import { getFormattedDate } from '@renderer/utils/getFormattedDate'

export const DashboardHeaderInfo = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const unit = useSelector((state: RootState) => state.currentUnit)

  return (
    <Card classNames={{ base: 'rounded-lg' }}>
      <div className='homewelcomedashbord w-full rounded-lg py-[30px] px-[40px] flex justify-between items-center '>
        <div className='leftwelcome flex flex-col text-c-title gap-3 '>
          <span className='titlewelcome text-[25px]'>Hola, {user?.username}</span>
          <span className='mt-[-10px] font-semibold text-c-title-opacity'>
            {getFormattedDate()}
          </span>
        </div>
        <div className='rigthwelcome flex gap-8'>
          <div className='cardwelcomeselect gap-4 items-center flex'>
            <div className='flex items-center justify-center w-[60px] h-[50px] bg-c-primary-variant-4 rounded-lg '>
              <div
                className={
                  'rounded-lg transition-all duration-500 ease-in-out w-[40px] h-[40px] uppercase flex items-center justify-center'
                }
              >
                {unit.image ? (
                  <img src={unit.image} className='w-full h-full rounded-sm' alt='' />
                ) : (
                  <span className='text-c-title font-semibold text-[22px]'>
                    {unit.name.slice(0, 2)}
                  </span>
                )}
              </div>
            </div>
            <div className='midcardselect flex flex-col min-w-32'>
              <span className='text-c-title-opacity'>Estás en</span>
              <span className='text-c-title text-[23px] font-semibold'>{unit.name}</span>
            </div>
            <IoIosArrowDown className='text-c-title text-[30px] cursor-pointer ' />
          </div>
          <div className='separator w-[1px] bg-c-gray '></div>
          <div className='cardwelcomeselect gap-4 items-center flex'>
            <div className='midcardselect flex flex-col '>
              <span className='text-c-title-opacity'>Grupo</span>
              <span className='text-c-title text-[23px] font-semibold'>Vendedores PC 1</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
