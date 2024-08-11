import React from 'react'
import { ErrorIcon } from '@renderer/components/Icons/ErrorIcon'
import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'

export const Warehouse = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const tabs = [
    { name: 'Productos', content: 'Contenido de Opción 1' },
    { name: 'Stock Pendiente', content: 'Contenido de Opción 2' },
    { name: 'Reposición', content: 'Contenido de Opción 3' },
    { name: 'Ventas', content: 'Contenido de Opción 3' },
    { name: 'Empleados', content: 'Contenido de Opción 3' },
  ]

  const datita = [
    {
      text: 'stock total',
      amount: '100.000',
    },
    {
      text: 'stock disponible',
      amount: '20.000',
    },
    {
      text: 'stock pendiente',
      amount: '2.333',
    },
    {
      text: 'Reposision',
      amount: '1.232',
    },
    {
      text: 'Ventas brutas',
      amount: '1.232',
    },
    {
      text: 'Productos pendientes',
      amount: '1.232',
    },
    {
      text: 'Ventas netas',
      amount: '1.232',
    },
  ]

  return (
    <div>
      <div className='w-fit'>
        <div className='sm:hidden'>
          <label htmlFor='tabs' className='sr-only'>
            Select your option
          </label>
          <select
            id='tabs'
            className='text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 '
            value={activeTab}
            onChange={(e) => setActiveTab(Number(e.target.value))}
          >
            {tabs.map((tab, index) => (
              <option key={index} value={index}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <ul className='hidden border border-c-border text-sm font-medium text-center rounded-lg shadow sm:flex dark:divide-gray-700 text-c-gray w-fit'>
          {tabs.map((tab, index) => (
            <li key={index} className='cursor-pointer'>
              <span
                className={`inline-block w-full px-5 py-[6px]  
                ${activeTab === index ? 'text-c-primary-variant-1 bg-c-primary-variant-3 ' : ' hover:text-c-primary-variant-4  bg-transparent hover:bg-c-primary-variant-4'}
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </span>
            </li>
          ))}
        </ul>
        <div className='my-5 flex flex-wrap gap-2'>
          <WarehouseCard />
        </div>
        <div className='flex flex-wrap gap-[53px] mb-[28px]'>
          {datita.map((ele, ind) => (
            <div key={ind}>
              <p className='flex gap-1 items-center text-c-gray text-[16px]'>
                {ele.text} <ErrorIcon />
              </p>
              <span className='font-semibold text-white text-[24px]'>{ele.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <StockTable />
    </div>
  )
}
