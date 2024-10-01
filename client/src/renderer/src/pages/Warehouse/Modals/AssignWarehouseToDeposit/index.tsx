import React from 'react'
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { SearchIcon } from '@renderer/components/Icons'
import { useSelector } from 'react-redux'
import { BusinessUnitModel } from '@renderer/interfaces/businessUnit'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { CurrentUnitsInThisWarehouse } from './Components/CurrentUnitsInThisWarehouse'
import {
  reqAssingDepositToUnit,
  reqGetUnitsMissingDeposit,
  reqSearchUnitsMissingDeposit,
} from '@renderer/api/requests'

export const AssignWarehouseToDeposit = () => {
  const company = useSelector((state: RootState) => state.currentCompany)
  const [isOpen, toggleModal] = useModal(modalTypes.createUnitModal)
  const [sucursales, setSucursales] = React.useState<BusinessUnitModel[]>([])
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const [sucursalesAsignadas, setSucursalesAsignadas] = React.useState<BusinessUnitModel[]>([])
  const [searchValue, setSearchValue] = React.useState('')

  const handleChange = async (e: string) => setSearchValue(e)
  React.useEffect(() => {
    const loadData = async () => {
      try {
        if (warehouse.currentEditWarehouseId == -1) return
        const response = await reqGetUnitsMissingDeposit(
          company.id,
          warehouse.currentEditWarehouseId,
        )
        setSucursales(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [isOpen])

  React.useEffect(() => {
    const searchUnits = async () => {
      try {
        if (searchValue.length < 3) return
        if (searchValue.trim() == '') return

        const response = await reqSearchUnitsMissingDeposit(
          company.id,
          warehouse.currentEditWarehouseId,
          searchValue,
        )

        setSucursales(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    searchUnits()
  }, [searchValue])

  const AssingDepositToUnit = (unitId: number) => {
    try {
      const sucursalesAux = [...sucursales]
      const sucursalesAsignadasAux = [...sucursalesAsignadas]

      const sucursal = sucursalesAux.find((item) => item.id == unitId)
      if (!sucursal) return

      sucursalesAsignadasAux.push(sucursal)
      setSucursalesAsignadas(sucursalesAsignadasAux)

      sucursalesAux.splice(sucursalesAux.indexOf(sucursal))
      setSucursales(sucursalesAux)

      reqAssingDepositToUnit(warehouse.currentEditWarehouseId, unitId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior={'inside'}
        backdrop='blur'
        placement='center'
        onClose={toggleModal}
      >
        <ModalContent>
          <ModalHeader>
            <h4 className='text-c-title font-semibold text-2xl'>Asignar depósito a sucursal</h4>
          </ModalHeader>
          <ModalBody>
            <Autocomplete
              defaultItems={sucursales}
              inputProps={{
                classNames: {
                  input: 'ml-1',
                  inputWrapper: 'h-[48px]',
                },
              }}
              onInputChange={handleChange}
              errorMessage='Sin resultados.'
              listboxProps={{
                emptyContent: 'Sin resultados',
                hideSelectedIcon: true,
                itemClasses: {
                  base: [
                    'rounded-medium',
                    'text-default-500',
                    'transition-opacity',
                    'data-[hover=true]:text-foreground',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[hover=true]:bg-default-200',
                    'data-[selectable=true]:focus:bg-default-100',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                },
              }}
              aria-label='Selecciona las sucursales'
              placeholder='Selecciona las sucursales'
              popoverProps={{
                offset: 10,
                classNames: {
                  base: 'rounded-large',
                  content: 'p-1 border-small border-default-100 ',
                },
              }}
              startContent={<SearchIcon className='text-default-400' strokeWidth={2.5} size={20} />}
              radius='md'
              variant='bordered'
            >
              {(item) => (
                <AutocompleteItem key={item.id} textValue={item.name}>
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      <div className='flex flex-col'>
                        <span className='text-small'>{item.name}</span>
                        <span className='text-tiny text-default-400'>{item.description}</span>
                      </div>
                    </div>
                    <Button
                      className='border-small mr-0.5 font-medium shadow-small'
                      radius='full'
                      size='sm'
                      variant='bordered'
                      onPress={() => AssingDepositToUnit(item.id)}
                    >
                      Agregar
                    </Button>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
            <CurrentUnitsInThisWarehouse
              sucursalesAsignadas={sucursalesAsignadas}
              setSucursalesAsignadas={setSucursalesAsignadas}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
