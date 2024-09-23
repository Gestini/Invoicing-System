import { useState } from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const tabItems = [
    {
      key: 'general',
      label: 'General',
      description: 'Adjust your settings and preferences here.',
      path: '/settings/1/general', // Define la ruta
    },
    {
      key: 'plan',
      label: 'Plan',
      description: 'Manage your subscription and plan details.',
      path: '/settings/1/plan', // Define la ruta
    },
    {
      key: 'integraciones',
      label: 'Integraciones',
      description: 'Integrate with third-party services and apps.',
      path: '/settings/1/integraciones', // Define la ruta
    },
  ]
  const [selectedKey, setSelectedKey] = useState<string | null>('configuracion')

  const handleTabChange = (key: string | null) => {
    setSelectedKey(key)
    const selectedTab = tabItems.find((item) => item.key === key)
    if (selectedTab) {
      navigate(selectedTab.path) // Navega a la ruta correspondiente
    }
  }

  const selectedTab = tabItems.find((item) => item.key === selectedKey)
  return (
    <div className='navbarsettings-unit relative flex flex-col gap-4'>
      <Tabs
        aria-label='Options'
        color='primary'
        variant='underlined'
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-c-primary-variant-1',
          tab: 'max-w-fit px-0 h-12',
          tabContent:
            'group-data-[selected=true]:text-c-primary-variant-1 group-data-[selected=true]:font-[600]',
        }}
        selectedKey={selectedKey}
        onSelectionChange={(key) => handleTabChange(key as string | null)} // Llama a la función de navegación
      >
        {tabItems.map(({ key, label }) => (
          <Tab
            key={key}
            title={
              <div className='flex items-center space-x-2'>
                <span>{label}</span>
              </div>
            }
            aria-label={label}
          />
        ))}
      </Tabs>
      <div className='descriptiontab-setting flex justify-between w-full'>
        <div className='descriptionsection-setting w-[400px] gap-1 flex flex-col'>
          <span className='font-[600]'>{selectedTab?.label}</span>
          <span className='text-[12px] font-[500] text-[#474747]'>{selectedTab?.description}</span>
        </div>
      </div>
      <div className='border-b border-divider' />
    </div>
  )
}

export default Navbar
