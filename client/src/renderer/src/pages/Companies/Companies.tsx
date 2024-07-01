import React, { useEffect, useState } from 'react'
import Card from './Card'
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
import './unidadeseccion.scss'
import MultiStepForm from '@renderer/components/CreateCompanyForm'
import { reqGetUnitByOwner } from '@renderer/api/requests'

const Companies = () => {
  const [showForm, setShowForm] = React.useState(false)
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([])

  interface BusinessUnit {
    link: string
    description: string
    id: number
    name: string // Asegúrate de tener otros campos de tu modelo de unidad de negocio
    // Agrega otros campos necesarios de tu modelo
  }

  useEffect(() => {
    // Función para cargar las unidades de negocio por propietario
    const loadBusinessUnits = async () => {
      try {
        const response = await reqGetUnitByOwner() // Llama a tu función de API para obtener las unidades
        if (response.status === 200) {
          setBusinessUnits(response.data) // Actualiza el estado con las unidades de negocio obtenidas
        } else {
          console.error('Error fetching business units:', response.data)
        }
      } catch (error) {
        console.error('Error fetching business units:', error)
      }
    }

    loadBusinessUnits() // Llama a la función al cargar el componente
  }, [])

  const handleClose = () => {
    setShowForm(false)
  }
  return (
    <div className=' flex flex-col  generalunidades'>
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
            <Button
              className='bg-c-primary text-c-title'
              onClick={() => setShowForm(true)}
              endContent={<PlusIcon />}
              size='sm'
            >
              Add New
            </Button>
            {showForm && <MultiStepForm onClose={handleClose} />}
          </div>
        </div>
      </div>
      <div className='rounded-md bg-c-bg-color h-full overflow-scroll'>
        <div className='grid grid-cols-auto-fill-cards gap-5 p-5 w-[100%] h-full'>
          {businessUnits.map((unit) => (
            <Card key={unit.id} unit={unit} />
          ))}{' '}
        </div>
      </div>
    </div>
  )
}

export default Companies
