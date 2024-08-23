import { Card } from '@nextui-org/react'
import { FaStore, FaLongArrowAltUp } from 'react-icons/fa'

export const StatsCardGrid = () => {
  const statsData = [
    {
      icon: <FaStore className='text-[30px]' />,
      value: '120',
      revenue: '$30.000',
      label: 'Ventas',
    },
    {
      icon: <FaStore className='text-[30px]' />,
      value: '120',
      revenue: '$30.000',
      label: 'Pedidos',
    },
    {
      icon: <FaStore className='text-[30px]' />,
      value: '120',
      revenue: '$30.000',
      label: 'Stock',
    },
    {
      icon: <FaStore className='text-[30px]' />,
      value: '120',
      revenue: '$30.000',
      label: 'Gastos',
    },
  ]

  return (
    <div className='cardsmain w-full grid gap-4'>
      {statsData.map((data, index) => (
        <Card classNames={{ base: 'rounded-lg' }} key={index}>
          <div className='cardstats px-[20px] py-[14px] justify-between bg-c-card rounded-sm gap-4 flex'>
            <div className='iconstat w-[70px] text-c-title flex justify-center items-center bg-c-bg-color-2 rounded-lg h-full'>
              {data.icon}
            </div>
            <div className='statstext flex flex-col justify-end items-end'>
              <div className='topstat flex justify-center items-center'>
                <span className='text-[40px] font-[500] text-[var(--c-arrow-stats)] valuedatacardstat'>
                  {data.value}
                </span>
                <FaLongArrowAltUp className='text-[25px] text-[var(--c-arrow-stats)] iconarrow' />
              </div>
              <span className='text-[#7c7c7c] font-[500] mt-[-5px] valuerevenuecardstat'>
                {data.revenue}
              </span>
              <span className='text-title font-[500] valuelabelcardstat'>{data.label}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
