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
import { RootState } from '@renderer/store'
import { editWarehouse } from '@renderer/features/warehouseSlice'
import { reqEditDeposit } from '@renderer/api/requests'
import { WarehouseModel } from '@renderer/interfaces/warehouse'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'

export const EditWarehouse = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState<any>({})
  const [isOpen, toggleModal] = useModal(modalTypes.editWarehouseModal)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseEdit = warehouse.data.find(
    (item: WarehouseModel) => item.id == warehouse.currentEditWarehouseId,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleEditWarehouse = async () => {
    dispatch(editWarehouse({ id: warehouse.currentEditWarehouseId, data }))
    await reqEditDeposit(warehouse.currentEditWarehouseId, data)
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
          <h4 className='text-c-title font-semibold text-2xl'>Editar depósito</h4>
        </ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4'>
            <Input
              type='text'
              label='Nombre'
              name='name'
              defaultValue={currentWarehouseEdit?.name}
              placeholder='Ingresa el nombre del depósito'
              labelPlacement='outside'
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' radius='sm' onPress={toggleModal}>
            Cerrar
          </Button>
          <Button
            color='primary'
            className='bg-c-primary'
            radius='sm'
            onPress={handleEditWarehouse}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
