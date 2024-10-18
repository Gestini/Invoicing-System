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
import { addRole } from '@renderer/features/roleSlice'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { reqCreateRole } from '@renderer/api/requests'

export const CreateRoleModal = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [data, setData] = React.useState({
    id: new Date().toString(),
    name: '',
    users: 0,
    permissions: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleCreateRole = async () => {
    try {
      const response = await reqCreateRole({
        name: data.name,
        unitId: params.unitId,
      })
      dispatch(addRole({ ...response.data, permissions: [] }))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className='bg-c-primary-variant-1'
        color='secondary'
        endContent={<PlusIcon />}
        radius='sm'
      >
        Nuevo
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader>
            <h4 className='text-c-title font-semibold text-2xl'>Crear un nuevo rol</h4>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              <Input
                type='text'
                label='Nombre'
                name='name'
                placeholder='Ingresa el nombre del rol'
                labelPlacement='outside'
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose} radius='sm'>
              Cerrar
            </Button>
            <Button color='primary' className='bg-c-primary' onPress={handleCreateRole} radius='sm'>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
