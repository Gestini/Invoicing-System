import React from 'react'
import { RootState } from '@renderer/store'
import { TopContent } from './TableComponents/TopContent'
import { RenderCell } from './TableComponents/RenderCell'
import { BottomContent } from './TableComponents/BottomContent'
import { AppTableInterface } from './Interfaces/TableProps'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItemId, setTableData } from '@renderer/features/tableSlice'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Selection,
  TableHeader,
  TableColumn,
  SortDescriptor,
} from '@nextui-org/react'

export const AppTable = ({
  inputCell,
  columnsData,
  tableActions,
  addItemModal,
  editItemModal,
  dropdownAction,
}: AppTableInterface) => {
  const dispatch = useDispatch()
  type TableItem = (typeof table.data)[0]
  type Column = (typeof columnsData.columns)[0]
  const table = useSelector((state: RootState) => state.unit.table)
  const [___, toggleModal] = useModal(modalTypes.editItemTableModal)

  React.useEffect(() => {
    dispatch(setTableData([]))
  }, [])

  const [page, setPage] = React.useState(1)
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, /* setVisibleColumns */ _] = React.useState<Selection>(
    new Set(columnsData.InitialVisibleColumns),
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, /* setRowsPerPage */ __] = React.useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsData.columns

    return columnsData.columns.filter((column: Column) =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [visibleColumns])

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = React.useMemo(() => {
    let filteredItems = [...table.data]

    type Item = { [key: string]: string }

    const filterBySearchValue = (item: Item, searchValue: string): boolean => {
      return Object.values(item).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase()),
      )
    }

    if (hasSearchFilter) {
      filteredItems = filteredItems.filter((item) => filterBySearchValue(item, filterValue))
    }

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== columnsData.statusOptions.length
    ) {
      filteredItems = filteredItems.filter((item) => Array.from(statusFilter).includes(item.status))
    }

    return filteredItems
  }, [table.data, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TableItem, b: TableItem) => {
      const first = a[sortDescriptor.column as keyof TableItem] as number
      const second = b[sortDescriptor.column as keyof TableItem] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const handleDeleteItem = async (id: number) => tableActions?.delete(id)
  const handleSetCurrentIdEdit = (id: number) => {
    dispatch(setCurrentItemId(id))
    toggleModal()
  }

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      shadow='none'
      isCompact
      selectionMode='multiple'
      classNames={{
        wrapper: ['bg-transparent', 'p-0', 'hoverScrollbar'],
        th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      }}
      bottomContent={
        <BottomContent
          page={page}
          pages={pages}
          setPage={setPage}
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
        />
      }
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-c-primary',
        },
      }}
      bottomContentPlacement='outside'
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          setPage={setPage}
          columnsData={columnsData}
          filterValue={filterValue}
          statusFilter={statusFilter}
          setFilterValue={setFilterValue}
          setStatusFilter={setStatusFilter}
          addItemModal={addItemModal}
          editItemModal={editItemModal}
        />
      }
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: Column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent='Sin resultados' items={sortedItems}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className='default-text-color capitalize'>
                  <RenderCell
                    item={item}
                    columnKey={columnKey}
                    inputCell={inputCell}
                    dropdownAction={dropdownAction}
                    handleDeleteItem={handleDeleteItem}
                    handleSetCurrentIdEdit={handleSetCurrentIdEdit}
                  />
                </TableCell>
              )}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
