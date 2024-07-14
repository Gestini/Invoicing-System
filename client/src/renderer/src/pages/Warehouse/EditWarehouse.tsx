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

export const EditWarehouse = ({ results, isOpen, onOpenChange, onClose, id }) => {
  const [data, setData] = React.useState<any>({})
  const currentWarehouse = results.find((item) => item.id == id)

  const handleChange = (e:any) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleEditWarehouse = () => {
    const auxResults = [...results]
    auxResults[results.indexOf(currentWarehouse)].name = data.name
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
          <h4 className='text-c-title font-semibold text-2xl'>Editar deposito</h4>
        </ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4'>
            <Input
              type='text'
              label='Nombre'
              name='name'
              defaultValue={currentWarehouse?.name}
              placeholder='Ingresa el nombre del deposito'
              labelPlacement='outside'
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            Cerrar
          </Button>
          <Button color='primary' className='bg-c-primary' onPress={handleEditWarehouse}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
