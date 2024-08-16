import React from 'react'
import { useParams } from 'react-router-dom'
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
  wareHouseInterface,
  setCurrentWarehouseId,
} from '@renderer/features/warehouseSlice'
import { VerticalDotsIcon } from '@renderer/components/Icons'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'

export const WarehouseCard = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const warehouse: wareHouseInterface = useSelector((state: any) => state.warehouse)
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

  const handleDelete = async (id) => {
    try {
      dispatch(deleteWarehouse(id))
      await reqDeleteDeposit(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id) => {
    setCurrentEdit(id)
    onOpen()
  }
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  return (
    <>
      <div className='flex flex-col w-full gap-2'>
        <div className={`flex items-center justify-between gap-4`}>
          {warehouse.data.length === 0 && (
            <p className='text-foreground-400 align-middle text-center'>
              No tienes depósitos creados.
            </p>
          )}
        </div>
        <div className='flex gap-4 flex-wrap'>
          {warehouse.data.length > 0 &&
            warehouse.data.map((ele: any, ind: number) => (
              <div
                key={ind}
                onClick={() => openWarehouse(ele.id)}
                className={`${currentWarehouseId == ele.id ? 'bg-c-primary-variant-3' : 'bg-[#1f2121]'}
                w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] flex items-center justify-between cursor-pointer`}
              >
                <div
                  className={`${currentWarehouseId == ele.id ? 'bg-c-primary-variant-3' : 'bg-[#323535]'}  p-2 rounded-lg`}
                >
                  <LocalIcon
                    color={`${currentWarehouseId == ele.id ? 'var(--c-primary-variant-1)' : 'white'}`}
                  />
                </div>
                <div className='flex items-center gap-[10px]'>
                  <div className='flex flex-col '>
                    <span className='text-[24px] h-8 text-white'>
                      <ShortCellValue cellValue={ele.name} maxLength={10} />
                    </span>
                    <span className='text-[12px] text-c-gray'>Buenos aires</span>
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
