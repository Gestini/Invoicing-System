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
import { FilterIcon } from '@renderer/components/Icons/FilterIcon'
import { ExportTableDropdown } from '../Exports/ExportTableDropdown'

export const TopContent = ({
  setPage,
  columnsData,
  filterValue,
  statusFilter,
  addItemModal,
  editItemModal,
  setFilterValue,
  setStatusFilter,
}) => {
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
      <div className='flex flex-col'>
        {/* Ajustamos la distribución en pantallas pequeñas y grandes */}
        <div className='flex flex-col md:flex-row justify-between gap-3 items-start md:items-end'>
          {/* Input de búsqueda y filtro */} 
          <div className='flex sm:flex-row gap-3 w-full'>
            <Input
              isClearable
              radius='sm'
              className='text-c-gray w-full md:w-auto'
              placeholder='Buscar'
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={onClear}
              onValueChange={onSearchChange}
            />
            <div>
              {columnsData?.statusOptions && (
                <Dropdown className='bg-c-card text-c-title'>
                  <DropdownTrigger>
                    <Button
                      className='bg-c-filter shadow-sm'
                      endContent={
                        <FilterIcon className='text-c-title text-2xl mr-2 w-[20px] h-[20px]' />
                      }
                      variant='flat'
                      radius='sm'
                    >
                      Filtrar
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
                    {columnsData.statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className='capitalize dropdownCheckboxIcon'>
                        <h3 className='default-text-color'>{capitalize(status.name)}</h3>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>

          {/* Exportar y agregar item modal */}
          <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
            <ExportTableDropdown />
            {addItemModal}
          </div>
        </div>

        {/* Opcional: Elementos adicionales como editar */}
        {editItemModal}
      </div>
    </>
  )
}
