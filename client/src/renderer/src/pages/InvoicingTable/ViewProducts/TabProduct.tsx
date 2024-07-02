import React from 'react'
import { BiX, BiPlus } from 'react-icons/bi'
import { Tabs, Tab, Tooltip } from '@nextui-org/react'

export const TabProduct = () => {
  const [selectedKey, setSelectedKey] = React.useState('1')
  const [tabs, setTabs] = React.useState([
    {
      title: 'Pestaña',
      id: '1',
    },
    {
      title: 'Pestaña',
      id: '2',
    },
    {
      title: 'Pestaña',
      id: '3',
    },
  ])

  const handleAddTab = () => {
    const prev = [...tabs]
    const newTab = {
      title: 'Pestaña #' + (tabs.length + 1),
      id: new Date().getTime().toString(),
    }
    prev.push(newTab)
    setTabs(prev)
    setSelectedKey(newTab.id)
  }

  const handleCloseTab = (index: number) => {
    if (tabs.length == 1) return
    const prev = [...tabs]
    prev.splice(index, 1)
    setTabs(prev)
  }

  return (
    <div className='flex flex-wrap gap-4 items-center select-none'>
      <Tabs
        variant={'underlined'}
        aria-label='Tabs variants'
        color='secondary'
        className='flex gap-4 text-c-primary'
        selectedKey={selectedKey}
        onSelectionChange={(e: any) => {
          setSelectedKey(e)
        }}
      >
        {tabs.map((item, index) => (
          <Tab
            key={item.id}
            title={
              <div className='flex items-center gap-2'>
                {item.title}
                <Tooltip content='Cerrar pestaña'>
                  <div>
                    <BiX onClick={() => handleCloseTab(index)} />
                  </div>
                </Tooltip>
              </div>
            }
          />
        ))}
      </Tabs>
      <Tooltip content='Nuena pestaña'>
        <div>
          <BiPlus onClick={() => handleAddTab()} className='cursor-pointer' />
        </div>
      </Tooltip>
    </div>
  )
}
