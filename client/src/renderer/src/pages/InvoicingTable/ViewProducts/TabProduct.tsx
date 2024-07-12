import { BiX, BiPlus } from 'react-icons/bi'
import { Tabs, Tab, Tooltip } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeTab, addTab, setCurrentTabId } from '@renderer/features/newInvoicing'

export const TabProduct = () => {
  const dispatch = useDispatch()
  const handleAddTab = () => dispatch(addTab())
  const handleCloseTab = (id: number) => dispatch(closeTab(id))
  const handleSetCurrentTab = (id: string) => dispatch(setCurrentTabId(id))
  const newInvoicing = useSelector((state: any) => state.newInvoicing)

  return (
    <div className='flex flex-wrap gap-4 items-center select-none'>
      <Tabs
        variant={'underlined'}
        color='default'
        className='flex gap-4'
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0',
          cursor: 'w-full bg-[var(--c-primary)]',
          tabContent: 'group-data-[selected=true]:text-[var(--c-primary)]',
        }}
        selectedKey={newInvoicing.currentTabId}
      >
        {newInvoicing?.tabs?.map((item: any) => (
          <Tab
            key={item.id}
            title={
              <div className='flex items-center gap-2'>
                <div onClick={() => handleSetCurrentTab(item.id)}>{item.title}</div>
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
        <div className='text-c-primary'>
          <BiPlus onClick={() => handleAddTab()} className='cursor-pointer' />
        </div>
      </Tooltip>
    </div>
  )
}
