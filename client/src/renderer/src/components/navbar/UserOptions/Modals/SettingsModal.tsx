import MainColor from '../../../Theme/MainColor'
import { RootState } from '@renderer/store'
import { ChangeTheme } from '../../../Theme'
import { toggleModal } from '@renderer/features/currentModal'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export const SettingsModal = () => {
  const dispatch = useDispatch()
  const modalStates = useSelector((state: RootState) => state.unit.modals)
  const handleToggleModal = () => dispatch(toggleModal('SettingsModal'))

  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      size='sm'
      placement='center'
      isOpen={modalStates.modals.SettingsModal}
      onClose={handleToggleModal}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='default-text-color' onClick={handleToggleModal}>
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
