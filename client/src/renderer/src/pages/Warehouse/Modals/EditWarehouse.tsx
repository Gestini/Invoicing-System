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
import { reqEditDeposit } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { editWarehouse, wareHouseInterface } from '@renderer/features/warehouseSlice'

export const EditWarehouse = ({ isOpen, onOpenChange, onClose, id }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState<any>({})
  const warehouse: wareHouseInterface = useSelector((state: any) => state.unit.warehouse)
  const currentWarehouseEdit = warehouse.data.find((item: any) => item.id == id)

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleEditWarehouse = async () => {
    dispatch(editWarehouse({ id, data }))
    await reqEditDeposit(id, data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen && id !== -1}
      onOpenChange={onOpenChange}
      scrollBehavior={'inside'}
      backdrop='blur'
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
          <Button color='danger' variant='light' radius='sm' onPress={onClose}>
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
