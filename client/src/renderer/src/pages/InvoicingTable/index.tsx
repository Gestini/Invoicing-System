import { Totals } from './Totals'
import ViewProducts from './ViewProducts'
import { TabProduct } from './ViewProducts/TabProduct'

export const InvoicingTable = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TabProduct />
      <div className='flex flex-col lg:flex-row gap-4'>
        <ViewProducts  />
        <Totals  />
      </div>
    </div>
  )
}
