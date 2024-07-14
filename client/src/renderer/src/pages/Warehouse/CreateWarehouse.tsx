import React from 'react'
import {
  Input,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { reqCreateDeposit } from '@renderer/api/requests'

export const CreateWarehouse = ({ results, setResults }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [data, setData] = React.useState({})

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleCreateWarehouse = async () => {
    try {
      const auxResults = [...results]
      auxResults.push({ ...data, id: new Date().getTime() })
      setResults(auxResults)
      const response = await reqCreateDeposit(data)
      console.log(response.data)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button onPress={onOpen} className='bg-c-primary' color='secondary' endContent={<PlusIcon />}>
        Crear deposito
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader>
            <h4 className='text-c-title font-semibold text-2xl'>Crear un nuevo deposito</h4>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              <Input
                type='text'
                label='Nombre'
                name='name'
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
            <Button color='primary' className='bg-c-primary' onPress={handleCreateWarehouse}>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
