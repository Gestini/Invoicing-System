import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { SearchIcon } from '../../Icons/SearchIcon'
import { capitalize } from './utils'
import { useSelector } from 'react-redux'
import { ChevronDownIcon } from '../../Icons/ChevronDownIcon'
import { ExportTableDropdown } from '../Exports/ExportTableDropdown'

export const TopContent = ({
  setPage,
  columnsData,
  filterValue,
  statusFilter,
  visibleColumns,
  setRowsPerPage,
  setFilterValue,
  setStatusFilter,
  setVisibleColumns,
  addItemModal,
  editItemModal,
}) => {
  const users = useSelector((state: any) => state.table.data)
  const onRowsPerPageChange = (e: any) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(1)
  }

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }

  const onClear = () => {
    setFilterValue('')
    setPage(1)
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%] bg-white'
            placeholder='Buscar por nombre...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <ExportTableDropdown />
            {columnsData?.statusOptions && (
              <Dropdown>
                <DropdownTrigger className='sm:flex'>
                  <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode='multiple'
                  onSelectionChange={setStatusFilter}
                >
                  {columnsData.statusOptions.map((status: any) => (
                    <DropdownItem key={status.uid} className='capitalize dropdownCheckboxIcon'>
                      <h3 className='default-text-color'>{capitalize(status.name)}</h3>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {columnsData?.columns && (
              <Dropdown>
                <DropdownTrigger className='sm:flex'>
                  <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode='multiple'
                  onSelectionChange={setVisibleColumns}
                >
                  {columnsData.columns.map((column: any) => (
                    <DropdownItem key={column.uid} className='capitalize dropdownCheckboxIcon'>
                      <h3 className='default-text-color'>{capitalize(column.name)}</h3>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {addItemModal}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>{users.length} Resultados en total</span>
          <label className='flex items-center text-default-400 text-small'>
            Resultados por página:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
      {editItemModal}
    </>
  )
}
