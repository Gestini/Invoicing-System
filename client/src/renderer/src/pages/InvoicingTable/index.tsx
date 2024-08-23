import { Totals } from './Totals'
import ViewProducts from './ViewProducts'
import { TabProduct } from './ViewProducts/TabProduct'
import { InvoiceForm } from './InvoiceForm'

export const InvoicingTable = () => {
  return (
    <>
      <TabProduct />
      <InvoiceForm />
      <div className='flex gap-4'>
        <ViewProducts />
        <Totals />
      </div>
    </>
  )
}
