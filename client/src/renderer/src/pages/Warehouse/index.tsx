import { Tabs } from '../../components/tab/Tabs'
import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'
import { WarehouseStats } from './Components/WarehouseStats'

export const Warehouse = () => {
  const tabs = [
    { name: 'Productos', content: 'Contenido de Productos' },
    { name: 'Stock Pendiente', content: 'Contenido de Stock Pendiente' },
    { name: 'Reposición', content: 'Contenido de Reposición' },
    { name: 'Ventas', content: 'Contenido de Ventas' },
    { name: 'Empleados', content: 'Contenido de Empleados' },
  ]

  return (
    <div className='flex gap-3 flex-col'>
      <Tabs tabs={tabs} />
      <WarehouseCard />
      <WarehouseStats />
      <StockTable />
    </div>
  )
}
