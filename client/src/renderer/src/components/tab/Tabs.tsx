import React from 'react'

interface Tab {
  name: string
  content: React.ReactNode // Asegúrate de que acepta cualquier contenido de React
}

interface WarehouseTabsProps {
  tabs: Tab[]
}

export const Tabs: React.FC<WarehouseTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div className='flex-col flex h-full w-full overflow-y-auto  gap-2' >
      <div className='sm:hidden w-full  '>
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
      <ul className='hidden border border-c-border text-sm font-medium text-center rounded-lg shadow sm:flex text-c-tabs w-fit'>
        {tabs.map((tab, index) => (
          <li key={index} className='cursor-pointer'>
            <span
              className={`inline-block w-full px-5 py-[6px]
                ${activeTab === index ? 'text-c-primary bg-c-primary-variant-3' : 'hover:text-c-primary-variant-4 bg-transparent hover:bg-c-primary-variant-4'}
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Renderiza el contenido de la pestaña activa */}
      <div className='text-c-title h-full  w-full bg-red-50  overflow-y-auto   '>{tabs[activeTab].content}</div>
    </div>
  )
}
