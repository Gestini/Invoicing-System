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
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { RootState } from '@renderer/store'
import { addWarehouse } from '@renderer/features/warehouseSlice'
import { reqCreateDeposit } from '@renderer/api/requests'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'

export const CreateWarehouse = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const [isOpen, toggleModal] = useModal(modalTypes.createWarehouseModal)
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const company = useSelector((state: RootState) => state.currentCompany)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        company: {
          id: company.id,
        },
      })

      dispatch(addWarehouse(response.data))
      toggleModal()
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
          onClick={toggleModal}
          className='h-[76px] w-fit rounded-[10px] px-[10px] py-[20px] bg-c-card text-c-text flex shadow-sm items-center justify-between cursor-pointer'
        >
          <PlusIcon />
        </div>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={toggleModal}
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
            <Button color='danger' variant='light' onPress={toggleModal} radius='sm'>
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
