import { Tabs } from '../../components/tab/Tabs'
import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'
import { WarehouseStats } from './Components/WarehouseStats'

export const Warehouse = () => {
  const tabs = [
    {
      name: 'Productos',
      content: (
        <div className='flex gap-3 flex-col'>
          <WarehouseCard />
          <WarehouseStats />
          <StockTable />
        </div>
      ),
    },
    {
      name: 'Stock Pendiente',
      content: '',
    },
    {
      name: 'Reposición',
      content: '',
    },
    {
      name: 'Ventas',
      content: '',
    },
    {
      name: 'Empleados',
      content: '',
    },
  ]

  return (
    <div className='flex gap-3 flex-col'>
      <Tabs tabs={tabs} />
    </div>
  )
}
