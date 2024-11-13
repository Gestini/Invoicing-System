import React, { useState } from 'react'
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
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { reqAsingProductsToInventory } from '@renderer/api/requests'

export const MoveProductToInventory = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.unit.table)
  const currentItem = table.data.find((item) => item.id == table?.currentItemIdEdit)
  const [isOpen, toggleModal] = useModal(modalTypes.moveProductToInventoryModal)
  const [quantity, setQuantity] = useState<number>(0)
  const [quantityError, setQuantityError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value))
    setQuantityError(null)
  }

  const validate = () => {
    if (quantity < 1) {
      setQuantityError('La cantidad debe ser al menos 1.')
      return false
    }
    if (currentItem && quantity > currentItem.quantity) {
      setQuantityError('La cantidad no puede exceder la cantidad disponible.')
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (!validate()) return

    if (!currentItem) return

    dispatch(
      editItem({
        data: {
          quantity: currentItem.quantity - quantity,
        },
        id: table.currentItemIdEdit,
      }),
    )

    await reqAsingProductsToInventory({
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
              variant='bordered'
              max={currentItem?.quantity}
              min={1}
              placeholder='Ingresa la cantidad'
              labelPlacement='outside'
              onChange={handleChange}
              isInvalid={!!quantityError}
              errorMessage={quantityError}
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
