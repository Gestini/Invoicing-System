
import { VerticalDotsIcon } from '@renderer/components/Icons'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WarehouseCard } from './WarehouseCard'

import { ErrorIcon } from '@renderer/components/Icons/ErrorIcon'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'

export const Warehouse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const openWarehouse = (depositId: number) => navigate(`/stock/${params.id}/${depositId}`)
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Productos', content: 'Contenido de Opción 1' },
    { name: 'Stock Pendiente', content: 'Contenido de Opción 2' },
    { name: 'Reposición', content: 'Contenido de Opción 3' },
    { name: 'Ventas', content: 'Contenido de Opción 3' },
    { name: 'Empleados', content: 'Contenido de Opción 3' },
  ];

  const datita = [
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
  ]

  return (
    <>
      <div>

        <div className='w-fit'>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select your option</label>
            <select
              id="tabs"
              className="text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              value={activeTab}
              onChange={(e) => setActiveTab(Number(e.target.value))}
            >
              {tabs.map((tab, index) => (
                <option key={index} value={index}>{tab.name}</option>
              ))}
            </select>
          </div>
          <ul className="hidden border border-c-border text-sm font-medium text-center rounded-lg shadow sm:flex dark:divide-gray-700 text-c-gray w-fit">
            {tabs.map((tab, index) => (
              <li key={index} className="cursor-pointer">
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

          <div className="my-5 flex flex-wrap gap-2">
            <div className='w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] bg-c-primary-variant-3 flex items-center justify-between'>
              <div className='bg-c-primary-variant-2 p-2 rounded-lg'>
                <LocalIcon color={'var(--c-primary-variant-1)'} />
              </div>
              <div className='flex items-center '>
                <div className='flex flex-col '>
                  <span className='text-[24px] h-8 text-white'>General</span>
                  <span className='text-[12px] text-c-gray'>Santa fe</span>
                </div>
                <div>
                  <VerticalDotsIcon className='cursor-pointer text-c-gray ml-[10px]' />
                </div>
              </div>
            </div>

            <div className='w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] bg-[#1f2121] flex items-center justify-between'>
              <div className='bg-[#323535] p-2 rounded-lg'>
                <LocalIcon color={'white'} />
              </div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex flex-col '>
                  <span className='text-[24px] h-8 text-white'>Deposito</span>
                  <span className='text-[12px] text-c-gray'>Buenos aires</span>
                </div>
                <div className='h-[37px] w-[35px] ml-1 bg-[#323535] text-white flex items-center justify-center rounded-lg'>
                  01
                </div>
                <div>
                  <VerticalDotsIcon className='cursor-pointer text-c-gray' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-[53px] mb-[28px]'>
            {
              datita.map((ele, ind) =>
                <div key={ind}>
                  <p className='flex gap-1 items-center text-c-gray text-[16px]'>
                    {ele.text} <ErrorIcon />
                  </p>
                  <span className='font-semibold text-white text-[24px]'>
                    {ele.amount}
                  </span>
                </div>
              )
            }
          </div>

        </div>
        <div className='flex flex-col w-full mb-2 rounded-md bg-c-bg-color gap-4'>
          <div className='flex justify-between gap-3 '>
            <WarehouseCard />
          </div>
        </div>
        {/* <StockTable /> */}
      </div>
    </>
  )
}