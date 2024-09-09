import React from 'react'
import {
  Input,
  Modal,
  Button,
  Tooltip,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addWarehouse } from '@renderer/features/warehouseSlice'
import { reqCreateDeposit } from '@renderer/api/requests'

export const CreateWarehouse = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [data, setData] = React.useState({})
  const [buttonDisabled, setButtonDisabled] = React.useState(false)

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
      setButtonDisabled(true)

      const response = await reqCreateDeposit({
        ...data,
        businessUnit: {
          id: params.unitId,
        },
      })

      dispatch(addWarehouse(response.data))
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setButtonDisabled(false)
    }
  }

  return (
    <>
      <Tooltip content='Crear depósito'>
        <div
          onClick={onOpen}
          className='h-[76px] rounded-[10px] px-[10px] py-[20px] bg-[#1f2121] text-c-gray flex items-center justify-between cursor-pointer'
        >
          <PlusIcon />
        </div>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader>
            <h4 className='text-c-title font-semibold text-2xl'>Crear un nuevo depósito</h4>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              <Input
                type='text'
                label='Nombre'
                name='name'
                placeholder='Ingresa el nombre del depósito'
                labelPlacement='outside'
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose} radius='sm'>
              Cerrar
            </Button>
            <Button
              color='primary'
              radius='sm'
              className='bg-c-primary'
              onPress={handleCreateWarehouse}
              isDisabled={buttonDisabled}
            >
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
