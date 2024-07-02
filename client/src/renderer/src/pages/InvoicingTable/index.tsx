import toast from 'react-hot-toast'
import { Totals } from './Totals'
import ViewProducts from './ViewProducts'
import { TabProduct } from './ViewProducts/TabProduct'
import { InvoiceForm } from './InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, deleteItem, editItem } from '@renderer/features/tableSlice'

export const InvoicingTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.table)

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        toast.success('Venta eliminada correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        dispatch(addItem({ ...data, id: table.data.length }))
        toast.success('Venta guardada correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentUserEdit?.id }))
        toast.success('Venta editada correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

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
