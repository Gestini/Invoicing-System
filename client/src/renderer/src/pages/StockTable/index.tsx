import React from 'react'
import toast from 'react-hot-toast'
import {
  reqEditProduct,
  reqCreateProduct,
  reqDeleteProduct,
  reqGetProductByUnit,
} from '@renderer/api/requests'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { AddProductModal } from '@renderer/components/AppTable/Modals/ProductAdd'
import { EditProductModal } from '@renderer/components/AppTable/Modals/ProductEdit'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, deleteItem, editItem, setData } from '@renderer/features/tableSlice'

export const StockTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.table)
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetProductByUnit(params.id)
      dispatch(setData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        toast.success('Producto eliminado correctamente')
        await reqDeleteProduct(id)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        dispatch(addItem({ ...data, id: table.data.length }))
        toast.success('Producto guardado correctamente')
        await reqCreateProduct(data)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (id: any, data: any) => {
      try {
        dispatch(editItem({ data, id: id }))
        toast.success('Producto editado correctamente')
        await reqEditProduct(id, data)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo producto',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar producto',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddProductModal modal={newUserModal} />}
      editItemModal={<EditProductModal modal={editUserModal} />}
    />
  )
}
