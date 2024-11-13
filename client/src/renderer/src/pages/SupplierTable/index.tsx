import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { RootState } from '@renderer/store'
import { columnsData } from './data'
import { reqGetSupplier } from '@renderer/api/requests'
import { AddSupplierModal } from '@renderer/pages/SupplierTable/Modals/SupplierAdd'
import { EditSupplierModal } from '@renderer/pages/SupplierTable/Modals/SupplierEdit'
import { DropdownItemInteface } from '@renderer/components/AppTable/Interfaces/ActionDropdown'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, setCurrentItemId, setTableData } from '@renderer/features/tableSlice'

export const SupplierTable = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [_, toggleModal] = useModal(modalTypes.editSupplierModal)
  const handleSetCurrentIdEdit = (id: number) => dispatch(setCurrentItemId(id))

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetSupplier(unit.id)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'edit',
      title: 'Editar',
      onPress: (id) => {
        handleSetCurrentIdEdit(id)
        toggleModal()
      },
    },
    {
      key: 'delete',
      title: 'Borrar',
      onPress: async (id) => {
        try {
          dispatch(deleteItem(id))
        } catch (error: any) {
          console.log(error)
        }
      },
    },
  ]

  return (
    <AppTable
      columnsData={columnsData}
      addItemModal={<AddSupplierModal />}
      editItemModal={<EditSupplierModal />}
      dropdownAction={dropdownAction}
    />
  )
}
