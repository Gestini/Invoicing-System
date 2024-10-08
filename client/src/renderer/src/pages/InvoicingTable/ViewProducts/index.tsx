import React from 'react'
import { Tab } from '@renderer/features/newInvoicing'
import { columns } from './data'
import { RootState } from '@renderer/store'
import { EditAmount } from './EditAmount'
import { TopContent } from './TopContent'
import { useSelector } from 'react-redux'
import { ProductModel } from '@renderer/interfaces/product'
import { DeleteProduct } from './DeleteProduct'
import { Table, TableRow, TableBody, TableCell, TableColumn, TableHeader } from '@nextui-org/react'

export default function ViewProducts() {
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((tab: Tab) => tab.id == newInvoicing.currentTabId)

  const renderCell = React.useCallback((product: ProductModel, columnKey: string) => {
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
    <Table
      shadow='none'
      radius='none'
      isCompact
      aria-label='Example table with custom cells'
      topContent={<TopContent />}
      topContentPlacement='outside'
      bottomContentPlacement='outside'
      classNames={{
        wrapper: ['bg-transparent', 'p-0', 'hoverScrollbar'],
        th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={currentTab?.products || []} emptyContent={'Tabla de productos vacía'}>
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell className='border-b border-divider'>
                {renderCell(item, String(columnKey))}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
