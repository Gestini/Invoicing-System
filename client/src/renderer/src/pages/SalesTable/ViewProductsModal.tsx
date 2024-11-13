import React from 'react'
import {
  Modal,
  Table,
  TableRow,
  TableBody,
  TableCell,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TableColumn,
  TableHeader,
  ModalContent,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useDispatch, useSelector } from 'react-redux'
import { reqGetInvoiceProductsByInvoiceId } from '@renderer/api/requests'

export const ViewProductsModal = () => {
  interface InvoiceProducts {
    productId: number
    productName: string
    productPrice: number
    productQuantity: number
  }
  const [invoiceProducts, setInvoiceProducts] = React.useState<InvoiceProducts[]>([])
  const table = useSelector((state: RootState) => state.unit.table)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (table.currentItemIdEdit !== -1) {
      reqGetInvoiceProductsByInvoiceId(table.currentItemIdEdit)
        .then((res) => setInvoiceProducts(res.data))
        .catch((err) => console.error(err))
    }
  }, [table.currentItemIdEdit])

  const handleSetCurrentIdEdit = (id: number) => dispatch(setCurrentItemId(id))

  return (
    <Modal
      isOpen={table.currentItemIdEdit !== -1}
      onClose={() => handleSetCurrentIdEdit(-1)}
      backdrop='blur'
      placement='center'
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='default-text-color'>Productos vendidos</h3>
        </ModalHeader>
        <ModalBody>
          <Table
            aria-label='Product Table'
            shadow='none'
            classNames={{
              th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
              table: [`${invoiceProducts.length === 0 && 'h-full'}`],
              wrapper: ['p-0 h-full overflow-y-auto  hoverScrollbar bg-transparent'],
            }}
          >
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>CANTIDAD</TableColumn>
              <TableColumn>PRECIO</TableColumn>
            </TableHeader>
            <TableBody items={invoiceProducts}>
              {(item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productQuantity}</TableCell>
                  <TableCell>{item.productPrice}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
