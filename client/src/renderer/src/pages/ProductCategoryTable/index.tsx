import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { useDispatch } from 'react-redux'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import {
  reqEditProductCategory,
  reqDeleteProductCategory,
  reqCreateProductCategory,
  reqFindAllProductCategoriesFromUnit,
} from '@renderer/api/requests'

export const ProductCategoryTable = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqFindAllProductCategoriesFromUnit()
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        await reqDeleteProductCategory(id)
      } catch (error: any) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqCreateProductCategory(data)
        dispatch(addItem(response.data))
      } catch (error: any) {
        console.log(error)
      }
    },
    edit: async (data: any, currentItemEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentItemEdit?.id }))
        await reqEditProductCategory(currentItemEdit?.id, data)
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newProductCategoryModal = {
    title: 'Crear categoría de producto',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editProductCategoryModal = {
    title: 'Editar categoría de producto',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddItemModal modal={newProductCategoryModal} />}
      editItemModal={<EditItemModal modal={editProductCategoryModal} />}
    />
  )
}
