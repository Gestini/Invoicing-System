import { TabsRender } from '@renderer/components/TabsRender'
import { UniInventory } from './views/UnitInventory'
import BulkUpload from './views/BulkUpload'
import BulkUploadVanilla from './views/BulkUploadVanilla'

const index = () => {
  const tabs = [
    { name: 'Inventario', content: <UniInventory /> },
    { name: 'Carga masiva de productos', content: <BulkUploadVanilla /> },
    { name: 'Carga masiva de productos IA', content: <BulkUpload /> },
  ]

  return <TabsRender tabs={tabs} />
}

export default index
