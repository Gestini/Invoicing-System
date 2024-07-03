import { BiX, BiPlus } from 'react-icons/bi'
import { Tabs, Tab, Tooltip } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeTab, addTab, setCurrentTabId } from '@renderer/features/tabSlice'
import React from 'react'

export const TabProduct = () => {
  const dispatch = useDispatch()
  const tabs = useSelector((state: any) => state.tabs)
  const [current, setCurrent] = React.useState(tabs.currentTabId)
  const handleAddTab = () => dispatch(addTab(null))
  const handleCloseTab = (id: number) => dispatch(closeTab(id))
  const handleSetCurrentTab = (id: string) => dispatch(setCurrentTabId(id))

  React.useEffect(() => {
    setCurrent(tabs.currentTabId)
  }, [tabs])

  return (
    <div className='flex flex-wrap gap-4 items-center select-none'>
      <Tabs
        variant={'underlined'}
        aria-label='Tabs variants'
        color='secondary'
        className='flex gap-4 text-c-primary'
        selectedKey={current}
        onSelectionChange={(e: any) => {
          setCurrent(e)
        }}
      >
        {tabs.data.map((item) => (
          <Tab
            key={item.id}
            title={
              <div className='flex items-center gap-2'>
                {item.title}
                <Tooltip content='Cerrar pestaña' delay={500}>
                  <div>
                    <BiX onClick={() => handleCloseTab(item.id)} />
                  </div>
                </Tooltip>
              </div>
            }
          />
        ))}
      </Tabs>
      <Tooltip content='Nuena pestaña' delay={500}>
        <div>
          <BiPlus onClick={() => handleAddTab()} className='cursor-pointer' />
        </div>
      </Tooltip>
    </div>
  )
}
