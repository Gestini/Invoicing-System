import { Tabs } from '@renderer/components/tab/Tabs'
import { StockTable } from './StockTable'
import BulkUpload from './views/BulkUpload'
import BulkUploadVanilla from './views/BulkUploadVanilla'

const index = () => {
  const tabs = [
    { name: 'Productos', content: <StockTable /> },
    { name: 'Carga masiva de productos', content: <BulkUploadVanilla /> },
    { name: 'Carga masiva de productos IA', content: <BulkUpload /> },
  ]
  return (
    <>
      <Tabs tabs={tabs} />
    </>
  )
}

export default index
