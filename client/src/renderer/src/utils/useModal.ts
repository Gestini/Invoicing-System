import { useDispatch, useSelector } from 'react-redux'
import { handleShowModal, isModalOpen } from '@renderer/features/currentModal'

export const modalTypes = Object.freeze({
  logInAsModal: "LOG_IN_AS_MODAL",
  settingsModal: "SETTINGS_MODAL",
  createUnitModal: "CREATE_UNIT_MODAL",
  addNewAccountModal: "ADD_NEW_ACCOUNT_MODAL",
  editWarehouseModal: "EDIT_WAREHOUSE_MODAL",
  createWarehouseModal: "CREATE_WAREHOUSE_MODAL",
  companySettingsModal: "COMPANY_SETTINGS_MODAL",
  assingDepositToUnitModal: "ASSING_DEPOSIT_TO_UNIT_MODAL",
} as const)

type ModalType = (typeof modalTypes)[keyof typeof modalTypes]

export const useModal = (modalType: ModalType): [boolean, () => void] => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isModalOpen(modalType))

  const toggleModal = () => dispatch(handleShowModal(modalType))

  return [isOpen, toggleModal]
}
