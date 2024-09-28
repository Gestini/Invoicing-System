import { Tabs } from '@renderer/components/tab/Tabs'
import { StockTable } from './StockTable'
import BulkUpload from "./BulkUpload"

const index = () => {
  const tabs = [
    { name: 'Productos', content: 'Contenido de Productos' },
    { name: 'Carga masiva de productos', content: <BulkUpload/>},
  ]
  return (
    <div className='flex gap-2 flex-col flex-grow '>
      <Tabs tabs={tabs} />

    </div>
  )
}

export default index
