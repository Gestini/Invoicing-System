import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { modalInputs, columnsData } from './data'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import {
  reqEditDiscount,
  reqDeleteDiscount,
  reqCreateDiscount,
  reqFindAllDiscountByUnitId,
} from '@renderer/api/requests'

export const DiscountTable = () => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqFindAllDiscountByUnitId(params.unitId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        await reqDeleteDiscount(id)
      } catch (error: any) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqCreateDiscount(params.unitId, data)
        dispatch(addItem(response.data))
      } catch (error: any) {
        console.log(error)
      }
    },
    edit: async (data: any, currentItemEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentItemEdit?.id }))
        await reqEditDiscount(currentItemEdit?.id, data)
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newDiscountModal = {
    title: 'Crear descuento',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editDiscountModal = {
    title: 'Editar descuento',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddItemModal modal={newDiscountModal} />}
      editItemModal={<EditItemModal modal={editDiscountModal} />}
    />
  )
}
