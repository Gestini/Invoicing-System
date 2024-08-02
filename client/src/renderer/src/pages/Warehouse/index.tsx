import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'

export const Warehouse = () => {
  return (
    <div className='flex flex-col gap-4'>
      <WarehouseCard />
      <StockTable />
    </div>
  )
}
