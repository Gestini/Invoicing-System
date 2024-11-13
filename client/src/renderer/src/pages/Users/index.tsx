import { TabsRender } from '@renderer/components/TabsRender'
import Employes from './views/Employes'

const index = () => {
  const tabs = [
    { name: 'Empleados', content: <Employes /> },
    { name: 'Roles', content: '<BulkUpload />' },
    { name: 'Invitaciones', content: '<BulkUpload />' },
  ]
  return (
    <div className='flex gap-2 w-full flex-col h-full'>
      <TabsRender tabs={tabs} />
    </div>
  )
}

export default index
