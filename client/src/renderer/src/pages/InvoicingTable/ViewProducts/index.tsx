import React from 'react'
import { columns } from './data'
import { EditAmount } from './EditAmount'
import { TopContent } from './TopContent'
import { useSelector } from 'react-redux'
import { DeleteProduct } from './DeleteProduct'
import { Table, TableRow, TableBody, TableCell, TableColumn, TableHeader } from '@nextui-org/react'

export default function ViewProducts() {
  const newInvoicing = useSelector((state: any) => state.newInvoicing)
  const currentTab = newInvoicing.tabs.find((item) => item.id == newInvoicing.currentTabId)

  const products = useSelector((state: any) => state.invoicing)
  type Product = (typeof products.data)[0]

  const renderCell = React.useCallback((product: Product, columnKey: any) => {
    const cellValue = product[columnKey]

    switch (columnKey) {
      case 'quantity':
        return <EditAmount product={product} />
      case 'actions':
        return <DeleteProduct product={product} />
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label='Example table with custom cells' topContent={<TopContent />}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={currentTab?.products || []}>
        {(item: Product) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell className='border-b-small'>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
