import MainColor from '../../../Theme/MainColor'
import { ChangeTheme } from '../../../Theme'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export const SettingsModal = () => {
  const [isOpen, toggleModal] = useModal(modalTypes.settingsModal)

  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      size='sm'
      placement='center'
      isOpen={isOpen}
      onClose={toggleModal}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='default-text-color' onClick={toggleModal}>
            Ajustes
          </h3>
        </ModalHeader>
        <ModalBody>
          <ChangeTheme />
          <MainColor />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
