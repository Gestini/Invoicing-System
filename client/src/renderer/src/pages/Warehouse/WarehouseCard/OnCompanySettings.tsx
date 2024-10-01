import React from 'react'
import {
  cn,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'
import { VerticalDotsIcon } from '@renderer/components/Icons'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'
import { reqDeleteDeposit, reqGetDepositsByCompany } from '@renderer/api/requests'
import {
  setWarehouses,
  deleteWarehouse,
  setCurrentWarehouseId,
  setCurrentEditWarehouseId,
} from '@renderer/features/warehouseSlice'
import { RootState } from '@renderer/store'
import { EditWarehouse } from '../Modals/EditWarehouse'
import { WarehouseModel } from '@renderer/interfaces/warehouse'
import { CreateWarehouse } from '../Modals/CreateWarehouse'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { AssignWarehouseToDeposit } from '../Modals/AssignWarehouseToDeposit'

export const WarehouseCardCompany = () => {
  const dispatch = useDispatch()
  const company = useSelector((state: RootState) => state.currentCompany)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId
  const [_, toggleEditWarehouseModal] = useModal(modalTypes.editWarehouseModal)
  const [__, toggleAssingDepositToUnitModal] = useModal(modalTypes.assingDepositToUnitModal)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetDepositsByCompany(company.id)
        const deposits: WarehouseModel[] = response.data
        if (deposits.length === 0) return

        dispatch(setWarehouses(response.data))
        openWarehouse(deposits[0].id)
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  const openWarehouse = (depositId: number) => dispatch(setCurrentWarehouseId(depositId))

  const handleDelete = async (id: number) => {
    try {
      dispatch(deleteWarehouse(id))
      await reqDeleteDeposit(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id: number) => dispatch(setCurrentEditWarehouseId(id))

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <>
      <div className='flex w-full gap-2'>
        {warehouse.data.length === 0 ? (
          <div className='flex items-center justify-between gap-4'>
            <p className='text-foreground-400 align-middle text-center'>
              No tienes depósitos creados.
            </p>
          </div>
        ) : (
          warehouse.data.map((ele, ind: number) => (
            <div
              key={ind}
              onClick={() => openWarehouse(ele.id)}
              className={`${
                currentWarehouseId === String(ele.id) ? 'bg-c-primary-variant-3' : 'bg-c-card'
              } justify-between gap-4 w-[285px] h-[76px] rounded-[10px] flex-shrink-0 shadow-sm px-[19px] py-[21px] flex items-center cursor-pointer`}
            >
              <div className='flex gap-5'>
                <div
                  className={`${
                    currentWarehouseId === String(ele.id)
                      ? 'bg-c-primary-variant-3'
                      : 'bg-c-card-variant-3'
                  } p-2 rounded-lg`}
                >
                  <LocalIcon color='var(--c-primary)' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-[24px] h-8 text-c-primary whitespace-nowrap'>
                    <ShortCellValue cellValue={ele.name} maxLength={10} />
                  </span>
                  <span className='text-[12px] text-c-title'>Buenos aires</span>
                </div>
              </div>
              <div className='flex items-center gap-[10px]'>
                <Dropdown className='text-c-title bg-c-card'>
                  <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='light'>
                      <VerticalDotsIcon className='text-default-300' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
                    <DropdownItem
                      key='edit'
                      className='default-text-color'
                      onPress={() => {
                        handleEdit(ele.id)
                        toggleEditWarehouseModal()
                      }}
                      startContent={<EditDocumentIcon className={iconClasses} />}
                    >
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      key='assign'
                      className='default-text-color'
                      onPress={() => {
                        handleEdit(ele.id)
                        toggleAssingDepositToUnitModal()
                      }}
                      startContent={<EditDocumentIcon className={iconClasses} />}
                    >
                      Asignar sucursal
                    </DropdownItem>
                    <DropdownItem
                      key='delete'
                      className='text-danger'
                      color='danger'
                      onPress={() => handleDelete(ele.id)}
                      startContent={
                        <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
                      }
                    >
                      Borrar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          ))
        )}
        <CreateWarehouse />
      </div>
      <EditWarehouse />
      <AssignWarehouseToDeposit />
    </>
  )
}
