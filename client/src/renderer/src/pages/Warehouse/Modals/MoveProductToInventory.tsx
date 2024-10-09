import React from 'react'
import {
  Input,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { editItem } from '@renderer/features/tableSlice'
import { RootState } from '@renderer/store'
import { WarehouseModel } from '@renderer/interfaces/warehouse'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { reqAsingProductsToInventory } from '@renderer/api/requests'

export const MoveProductToInventory = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const table = useSelector((state: RootState) => state.unit.table)
  const currentItem = table.data.find((item) => item.id == table?.currentItemIdEdit)
  const [isOpen, toggleModal] = useModal(modalTypes.moveProductToInventoryModal)
  const [quantity, setQuantity] = React.useState<number>(-1)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseEdit = warehouse.data.find(
    (item: WarehouseModel) => item.id == warehouse.currentEditWarehouseId,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value))

  const onSubmit = async () => {
    if (!currentItem) return
    if (currentItem.quantity < quantity) return

    dispatch(
      editItem({
        data: {
          quantity: currentItem.quantity - quantity,
        },
        id: table.currentItemIdEdit,
      }),
    )
    await reqAsingProductsToInventory({
      unitId: unit.id,
      quantity,
      productId: table.currentItemIdEdit,
    })

    toggleModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior={'inside'}
      backdrop='blur'
      placement='center'
      onClose={toggleModal}
    >
      <ModalContent>
        <ModalHeader>
          <h4 className='text-c-title font-semibold text-2xl'>Mover producto al inventario</h4>
        </ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4'>
            <Input
              type='number'
              label='Cantidad'
              name='quantity'
              defaultValue={currentWarehouseEdit?.name}
              placeholder='Ingresa la cantidad'
              labelPlacement='outside'
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' radius='sm' onPress={toggleModal}>
            Cerrar
          </Button>
          <Button color='primary' className='bg-c-primary' radius='sm' onPress={onSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
