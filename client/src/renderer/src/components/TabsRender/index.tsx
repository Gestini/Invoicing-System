import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'

interface Tab {
  name: string
  content: React.ReactNode
}

export const TabsRender = ({ tabs }: { tabs: Tab[] }) => {
  return (
    <Tabs
      color='primary'
      items={tabs}
      radius='none'
      fullWidth
      variant='bordered'
      className='w-full md:w-fit'
      classNames={{
        panel: 'px-0 h-full py-0',
        cursor: 'w-full bg-[var(--c-primary-variant-3)] data-[selected=true]:text-c-primary',
        tabList: 'w-full relative rounded-lg p-0 border border-c-border',
        tabContent: 'group-data-[selected=true]:text-[var(--c-primary)] flex-grow ',
      }}
    >
      {(item) => (
        <Tab key={item.name} title={item.name} className='flex-grow '>
          {item.content}
        </Tab>
      )}
    </Tabs>
  )
}
