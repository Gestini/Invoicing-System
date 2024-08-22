import React, { useState, useEffect } from 'react'

// Componente SalesItem
const SalesItem = ({ rank, name, sales }) => {
  return (
    <div className='itemmemberteamdashboard items-center flex justify-between border-1 border-[#7E8287] p-2 rounded-xl'>
      <div className='imageandinfomemberteam flex gap-2'>
        <div className='profilememberteam w-[25px] h-[25px] bg-blue-500 rounded-[5px] flex justify-center items-center text-c-title'>
          {rank}
        </div>
        <div className='nameandrolteamdashboard flex justify-center gap-1 flex-col'>
          <span className='text-c-title font-[500] text-[13px]'>{name}</span>
        </div>
      </div>
      <span className='text-c-gray font-[500] text-[13px]'>{sales} ventas</span>
    </div>
  )
}

// Componente SalesDashboard
const SalesDashboard = () => {
  const [visibleItems, setVisibleItems] = useState(5)

  const salesData = [
    { rank: 1, name: 'Mario Carmen', sales: 200 },
    { rank: 2, name: 'Ana Pérez', sales: 180 },
    { rank: 3, name: 'Luis Gómez', sales: 150 },
    { rank: 4, name: 'Lucía Martínez', sales: 120 },
    { rank: 5, name: 'Carlos Díaz', sales: 100 },
    // Agrega más datos según sea necesario
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 900) {
        setVisibleItems(3)
      } else {
        setVisibleItems(5)
      }
    }

    handleResize() // Llamada inicial para configurar el valor
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='membersteamdashboard flex w-full gap-3 flex-col'>
      {salesData.slice(0, visibleItems).map((item, index) => (
        <SalesItem key={index} rank={item.rank} name={item.name} sales={item.sales} />
      ))}
    </div>
  )
}

export default SalesDashboard
