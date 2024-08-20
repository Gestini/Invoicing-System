import React from 'react'
import { useSelector } from 'react-redux'
import { wareHouseInterface } from '@renderer/features/warehouseSlice'

interface Tab {
  name: string

}

interface WarehouseTabsProps {
  tabs: Tab[]
}

export const Tabs: React.FC<WarehouseTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0)

  const warehouse: wareHouseInterface = useSelector((state: any) => state.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId

  if (currentWarehouseId === '' || warehouse.data.length === 0) return null

  return (
    <>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select your option
        </label>
        <select
          id='tabs'
          className='text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500'
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
                ${activeTab === index ? 'text-c-primary-variant-1 bg-c-primary-variant-3' : 'hover:text-c-primary-variant-4 bg-transparent hover:bg-c-primary-variant-4'}
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
