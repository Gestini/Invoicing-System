import { StockTable } from './StockTable'
import { WarehouseTabs } from './Components/WarehouseTabs'
import { WarehouseCard } from './WarehouseCard'
import { WarehouseStats } from './Components/WarehouseStats'

export const Warehouse = () => {
  return (
    <div className='flex gap-4 flex-col'>
      <WarehouseTabs />
      <WarehouseCard />
      <WarehouseStats />
      <StockTable />
    </div>
  )
}
