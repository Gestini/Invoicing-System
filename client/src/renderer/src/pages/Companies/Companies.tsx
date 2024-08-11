import React from 'react'
import Card from './Card'
import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { setUnits } from '@renderer/features/unitsSlice'
import MultiStepForm from '@renderer/components/CreateCompanyForm'
import { reqGetUnitByOwner } from '@renderer/api/requests'
import { productStatusOptions } from '@renderer/components/Tables/ProductTable/data'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon, SearchIcon } from '@renderer/components/Icons'

const Companies = () => {
  const companies = useSelector((state: any) => state.units.data)

  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await reqGetUnitByOwner()
        dispatch(setUnits(response.data))
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }
    loadUserCompanies()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-full mb-2 rounded-md bg-c-bg-color p-5 gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='text-c-gray'
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder='Search by name...'
            size='sm'
            startContent={<SearchIcon className='text-c-title' />}
            variant='bordered'
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  size='sm'
                  variant='bordered'
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectionMode='multiple'
              >
                {productStatusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <MultiStepForm />
          </div>
        </div>
      </div>
      <div className='rounded-md bg-c-bg-color'>
        <div className='grid grid-cols-auto-fill-cards gap-5 p-5 w-[100%] h-full'>
          {companies.map((unit) => (
            <Card key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Companies
