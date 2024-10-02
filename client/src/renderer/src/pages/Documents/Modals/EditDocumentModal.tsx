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
import { editFile } from '@renderer/features/fileSlice'
import { RootState } from '@renderer/store'
import { reqRenameFile } from '@renderer/api/requests'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'

export const EditDocumentModal = () => {
  const [data, setData] = React.useState({})
  const [isOpen, toggleModal] = useModal(modalTypes.editDocumentMoal)
  const { currentEdit } = useSelector((state: RootState) => state.documents)
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async () => {
    try {
      if (!currentEdit) return

      dispatch(editFile({ data, fileId: currentEdit.id }))
      await reqRenameFile(currentEdit.id, data)

      toggleModal()
    } catch (error) {
      console.log(error)
    }
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
        <ModalHeader className='flex flex-col gap-1'>Renombrar</ModalHeader>
        <ModalBody>
          <Input
            name='name'
            defaultValue={currentEdit?.name}
            onChange={(e) => handleChange(e)}
            placeholder='Escribel el nuevo nombre'
          />
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' radius='sm' onPress={toggleModal}>
            Cerrar
          </Button>
          <Button className='bg-c-primary' color='secondary' radius='sm' onPress={() => onSubmit()}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
