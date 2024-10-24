import { Tabs } from '../../components/tab/Tabs'
import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'
import { WarehouseStats } from './Components/WarehouseStats'

export const Warehouse = () => {
  const tabs = [
    {
      name: 'Depósitos',
      content: (
        <div className='flex h-full gap-3 flex-col  '>
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
  ]

  return <Tabs tabs={tabs} />
}
