import React from 'react'
import { useParams } from 'react-router-dom'
import { SlOptions } from 'react-icons/sl'
import { EditWarehouse } from '../Modals/EditWarehouse'
import { CreateWarehouse } from '../Modals/CreateWarehouse'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
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
        const response = await reqGetDepositByUnit(params.id)
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

  return (
    <>
      <div className='flex gap-4 flex-col'>
        <div
          className={`flex items-center ${warehouse.data.length === 0 ? 'justify-between' : 'justify-end'}`}
        >
          {warehouse.data.length === 0 && (
            <p className='text-foreground-400 align-middle text-center'>No tienes depósitos creados.</p>
          )}
          <CreateWarehouse />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {warehouse.data.length > 0 &&
            warehouse.data.map((ele: any, ind: number) => (
              <Card key={ind} className={currentWarehouseId == ele.id ? 'bg-c-selected' : ''}>
                <div
                  onClick={() => openWarehouse(ele.id)}
                  className='w-[300px] cursor-pointer h-[100px] p-3 select-none'
                >
                  <div className='flex justify-between items-center'>
                    <h4 className={`text-[16px] font-semibold `}>{ele.name}</h4>
                    <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
                      <DropdownTrigger>
                        <div>
                          <SlOptions className='text-c-title w-4 h-4 cursor-pointer' />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label='Static Actions'
                        className='text-c-title bg-c-bg-color'
                      >
                        <DropdownItem key='Open' onClick={() => openWarehouse(ele.id)}>
                          Abrir
                        </DropdownItem>
                        <DropdownItem key='Edit' onPress={() => handleEdit(ele.id)}>
                          Editar
                        </DropdownItem>
                        <DropdownItem
                          key='delete'
                          className='text-danger'
                          showDivider={false}
                          color='danger'
                          onPress={() => handleDelete(ele.id)}
                        >
                          Eliminar depósito
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </Card>
            ))}
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
