import React from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '@renderer/store'
import { EditWarehouse } from '../Modals/EditWarehouse'
import { CreateWarehouse } from '../Modals/CreateWarehouse'
import { useDispatch, useSelector } from 'react-redux'
import {
  cn,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
  DropdownTrigger,
} from '@nextui-org/react'
import { reqGetDepositByUnit, reqDeleteDeposit } from '@renderer/api/requests'
import {
  setWarehouses,
  deleteWarehouse,
  setCurrentWarehouseId,
} from '@renderer/features/warehouseSlice'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { VerticalDotsIcon } from '@renderer/components/Icons'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'

export const WarehouseCard = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetDepositByUnit(params.unitId)
        dispatch(setWarehouses(response.data))
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

  const handleEdit = (id: number) => {
    setCurrentEdit(id)
    onOpen()
  }

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <>
      <div className='flex flex-col w-full'>
        <div className={`flex items-center justify-between gap-4`}>
          {warehouse.data.length === 0 && (
            <p className='text-foreground-400 align-middle text-center'>
              No tienes depósitos creados.
            </p>
          )}
        </div>
        {warehouse.data.length > 0 &&
          warehouse.data.map((ele, ind: number) => (
            <div
              key={ind}
              onClick={() => openWarehouse(ele.id)}
              className={`${currentWarehouseId == String(ele.id) ? 'bg-c-primary-variant-3' : 'bg-c-card'}
                w-[285px] h-[76px] rounded-[10px] flex-shrink-0 shadow-sm  px-[19px] py-[21px] flex items-center justify-between cursor-pointer`}
            >
              <div
                className={`${currentWarehouseId == String(ele.id) ? 'bg-c-primary-variant-3' : 'bg-c-card-variant-3'}  p-2 rounded-lg`}
              >
                <LocalIcon color={`var(--c-primary)`} />
              </div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex flex-col '>
                  <span className='text-[24px] h-8 text-c-primary'>
                    <ShortCellValue cellValue={ele.name} maxLength={10} />
                  </span>
                  <span className='text-[12px] text-c-title'>Buenos aires</span>
                </div>
                <div>
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
                        onPress={() => handleEdit(ele.id)}
                        startContent={<EditDocumentIcon className={iconClasses} />}
                      >
                        Editar
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
            </div>
          ))}
        <CreateWarehouse />
      </div>
      <EditWarehouse
        id={currentEdit}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
