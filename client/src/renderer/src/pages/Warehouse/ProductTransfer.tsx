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
import { GoArrowSwitch } from 'react-icons/go'

export const ProductTransfer = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        className='bg-c-primary'
        color='secondary'
        endContent={<GoArrowSwitch />}
      >
        Traspaso
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader>
            <h4 className='text-c-title font-semibold text-2xl'>Traspaso de productos</h4>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              <Input
                type='text'
                label='Almacen origen'
                placeholder='Ingresa el almacen de origen'
                labelPlacement='outside'
              />
              <Input
                type='text'
                label='Almacen destino'
                placeholder='Ingresa el almacen de destino'
                labelPlacement='outside'
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' className='bg-c-primary'>
              Traspaso
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
