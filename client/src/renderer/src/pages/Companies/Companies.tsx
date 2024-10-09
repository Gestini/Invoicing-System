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
import { Navbar } from '@renderer/components/Navbar'
import { RootState } from '@renderer/store'
import { setCompanies } from '@renderer/features/companiesSlice'
import { CreateCompanyModal } from './Modals/CreateCompanyModal'
import { productStatusOptions } from '@renderer/components/Tables/ProductTable/data'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon, SearchIcon } from '@renderer/components/Icons'
import { findCompaniesWithUserAsOwnerOrEmployee } from '@renderer/api/requests'

const Companies = () => {
  const companies = useSelector((state: RootState) => state.companies.data)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadUserCompanies = async () => {
      try {
        const response = await findCompaniesWithUserAsOwnerOrEmployee()
        dispatch(setCompanies(response.data))
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }
    loadUserCompanies()
  }, [user])
  
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-col w-full rounded-md bg-c-bg-color p-3 gap-4'>
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
            <CreateCompanyModal />
          </div>
        </div>
        {companies.length == 0 && <div className='text-c-title'>No hay empresas creadas</div>}
      </div>
      <div className='rounded-md bg-c-bg-color'>
        <div className='grid grid-cols-auto-fill-cards gap-5 p-3 w-[100%] h-full'>
          {companies?.map((company) => <Card key={company.id} company={company} />)}
        </div>
      </div>
    </div>
  )
}

export default Companies
