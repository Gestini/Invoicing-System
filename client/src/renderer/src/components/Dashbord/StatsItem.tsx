import React from 'react'
import { FaStore, FaLongArrowAltUp } from 'react-icons/fa'

const StatsCardGrid = () => {
  const statsData = [
    {
      icon: <FaStore className='text-[30px] text-white' />,
      value: '120',
      revenue: '$30.000',
      label: 'Ventas',
    },
    {
      icon: <FaStore className='text-[30px] text-white' />,
      value: '120',
      revenue: '$30.000',
      label: 'Ventas',
    },
    {
      icon: <FaStore className='text-[30px] text-white' />,
      value: '120',
      revenue: '$30.000',
      label: 'Ventas',
    },
    {
      icon: <FaStore className='text-[30px] text-white' />,
      value: '120',
      revenue: '$30.000',
      label: 'Ventas',
    },
  ]

  return (
    <div className='cardsmain w-full grid gap-4 mb-[15px]'>
      {statsData.map((data, index) => (
        <div
          key={index}
          className='cardstats px-[20px] py-[14px] justify-between bg-c-card-4 rounded-lg gap-4 flex'
        >
          <div className='iconstat w-[70px] flex justify-center items-center bg-c-gray rounded-lg h-full'>
            {data.icon}
          </div>
          <div className='statstext flex flex-col justify-end items-end'>
            <div className='topstat flex justify-center items-center'>
              <span className='text-[40px] font-[500] text-[#34F59F] valuedatacardstat'>{data.value}</span>
              <FaLongArrowAltUp className='text-[25px] text-[#34F59F] iconarrow' />
            </div>
            <span className='text-c-gray font-[500] mt-[-5px] valuerevenuecardstat'>{data.revenue}</span>
            <span className='text-white font-[500] valuelabelcardstat'>{data.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCardGrid
