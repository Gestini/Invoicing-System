import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import MainColor from '../Theme/MainColor'
import { SlOptions } from 'react-icons/sl'
import { ChangeTheme } from '../Theme'

export const Settings = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <SlOptions onClick={onOpen} className='text-gray-300 w-4 cursor-pointer bg-transparent' />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        size='sm'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>Settings</h3>
          </ModalHeader>
          <ModalBody>
            <ChangeTheme />
            <MainColor />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  )
}
