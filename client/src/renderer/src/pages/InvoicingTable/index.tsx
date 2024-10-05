import { Totals } from './Totals'
import ViewProducts from './ViewProducts'
import { TabProduct } from './ViewProducts/TabProduct'
import { InvoiceForm } from './InvoiceForm'

export const InvoicingTable = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TabProduct />
      <InvoiceForm />
      <div className='flex flex-col lg:flex-row gap-4'>
        <ViewProducts  />
        <Totals  />
      </div>
    </div>
  )
}
