import { StockTable } from './StockTable'
import { Tabs } from '../../components/tab/Tabs'
import { WarehouseCard } from './WarehouseCard'
import { WarehouseStats } from './Components/WarehouseStats'
const tabs = [
  { name: 'Productos', content: 'Contenido de Productos' },
  { name: 'Stock Pendiente', content: 'Contenido de Stock Pendiente' },
  { name: 'Reposición', content: 'Contenido de Reposición' },
  { name: 'Ventas', content: 'Contenido de Ventas' },
  { name: 'Empleados', content: 'Contenido de Empleados' },
]

export const Warehouse = () => {
  return (
    <div className='flex gap-4 flex-col'>
      <Tabs tabs={tabs} />
      <WarehouseCard />
      <WarehouseStats />
      <StockTable />
    </div>
  )
}
