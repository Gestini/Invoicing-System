import {
  Input,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import React from 'react'
import { addFile } from '@renderer/features/fileSlice'
import { RootState } from '@renderer/store'
import { reqCreateFile } from '@renderer/api/requests'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'

export const CreateDocumentModal = () => {
  const dispatch = useDispatch()
  const [name, setName] = React.useState('')
  const [isOpen, toggleModal] = useModal(modalTypes.createDocumentModal)
  const currentUnit = useSelector((state: RootState) => state.currentUnit)
  const currentCompany = useSelector((state: RootState) => state.currentCompany)
  const { currentPath } = useSelector((state: RootState) => state.documents)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = async () => {
    const initalPath = `/${currentCompany.id}/${currentUnit.id}`

    const newFolder = {
      name,
      path: `${currentPath?.path || initalPath}/${name}`,
      folder: true,
      businessUnit: {
        id: currentUnit.id,
      },
    }

    const response = await reqCreateFile(newFolder, initalPath)
    dispatch(addFile(response.data))
    toggleModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModal}
      scrollBehavior={'inside'}
      backdrop='blur'
      placement='center'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Crear nueva carpeta</ModalHeader>
        <ModalBody>
          <Input name='name' onChange={(e) => handleChange(e)} placeholder='Escribel el nombre' />
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' radius='sm' onPress={toggleModal}>
            Cerrar
          </Button>
          <Button className='bg-c-primary' color='secondary' radius='sm' onPress={() => onSubmit()}>
            Crear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
