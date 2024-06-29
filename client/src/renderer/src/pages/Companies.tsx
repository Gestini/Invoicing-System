import React from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react'
import { ChevronDownIcon, PlusIcon, SearchIcon } from '@renderer/components/Icons'
import { productStatusOptions } from '@renderer/components/Tables/ProductTable/data'
import "../routes/middlewares/unidadeseccion.scss"

const Companies = () => {
  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col w-full mb-2 rounded-md bg-white p-5 gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder='Search by name...'
            size='sm'
            startContent={<SearchIcon className='text-default-300' />}
            // value={filterValue}
            variant='bordered'
            // onClear={() => setFilterValue("")}
            // onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  size='sm'
                  variant='flat'
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                // selectedKeys={statusFilter}
                selectionMode='multiple'
                // onSelectionChange={setStatusFilter}
              >
                {productStatusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}

              >
                {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button className='bg-foreground text-background' endContent={<PlusIcon />} size='sm'>
              Add New
            </Button>
          </div>
        </div>
      </div>
    )
  })
  return (
    <div className=' flex flex-col  generalunidades'>
      {topContent}
      <div className='  rounded-md bg-white h-full overflow-scroll overflow-x-hidden  '>
        {/* <div className="flex flex-wrap gap-3">
        <div className="w-[250px] h-[250px] bg-c-primary"></div>
        <div className="w-[250px] h-[250px] bg-c-primary"></div>
        <div className="w-[250px] h-[250px] bg-c-primary"></div>
        <div className="w-[250px] h-[250px] bg-c-primary"></div>
      </div> */}

        <div className='grid grid-cols-auto-fill-cards gap-5 p-5 h-full  '>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
          <div className='w-full h-[230px] rounded-lg bg-c-primary'></div>
        </div>
      </div>
    </div>
  )
}

export default Companies
