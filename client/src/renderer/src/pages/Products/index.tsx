import { Tabs } from '@renderer/components/tab/Tabs'
import { StockTable } from './StockTable'

const index = () => {
  const tabs = [
    { name: 'Productos', content: 'Contenido de Productos' },
    { name: 'Carga masiva de productos', content: 'Contenido de Stock Pendiente' },
  ]
  return (
    <div className='flex gap-2 flex-col'>
      <Tabs tabs={tabs} />
      <StockTable />
    </div>
  )
}

export default index
