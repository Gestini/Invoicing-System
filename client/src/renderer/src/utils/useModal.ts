import { useDispatch, useSelector } from 'react-redux'
import { handleShowModal, isModalOpen } from '@renderer/features/currentModal'

export const modalTypes = Object.freeze({
  logInAsModal: "LOG_IN_AS_MODAL",
  settingsModal: "SETTINGS_MODAL",
  createUnitModal: "CREATE_UNIT_MODAL",
  editDocumentMoal: "EDIT_DOCUMENT_MODAL",
  editProductModal: "EDIT_PRODUCT_MODAL",
  editSupplierModal: "EDIT_SUPLIER_MODAL",
  addNewAccountModal: "ADD_NEW_ACCOUNT_MODAL",
  editWarehouseModal: "EDIT_WAREHOUSE_MODAL",
  editItemTableModal: "EDIT_ITEM_TABLE_MODAL",
  addItemToTableModal: "ADD_ITEM_TO_TABLE_MODAL",
  createSupplierModal: "CREATE_SUPLIER_MODAL",
  createDocumentModal: "CREATE_DOCUMENT_MODAL",
  createWarehouseModal: "CREATE_WAREHOUSE_MODAL",
  companySettingsModal: "COMPANY_SETTINGS_MODAL",
  assingDepositToUnitModal: "ASSING_DEPOSIT_TO_UNIT_MODAL",
  moveProductToInventoryModal: "MOVE_PRODUCT_TO_INVENTORY_MODAL",
} as const)

type ModalType = (typeof modalTypes)[keyof typeof modalTypes]

export const useModal = (modalType: ModalType): [boolean, () => void] => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isModalOpen(modalType))

  const toggleModal = () => dispatch(handleShowModal(modalType))

  return [isOpen, toggleModal]
}
