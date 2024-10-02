import React from 'react'
import toast from 'react-hot-toast'
import {
  reqEditProduct,
  reqCreateProduct,
  reqDeleteProduct,
  reqGetProductByDeposit,
} from '@renderer/api/requests'
import { AppTable } from '@renderer/components/AppTable'
import { AddProductModal } from '@renderer/components/AppTable/Modals/ProductAdd'
import { EditProductModal } from '@renderer/components/AppTable/Modals/ProductEdit'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, deleteItem, editItem, setTableData } from '@renderer/features/tableSlice'

export const StockTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.unit.table)
  const warehouse = useSelector((state: any) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetProductByDeposit(currentWarehouseId)
      dispatch(setTableData(response.data))
    }
    if (currentWarehouseId == '') return
    loadData()
  }, [currentWarehouseId])

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
        await reqCreateProduct({
          ...data,
          depositUnit: {
            id: warehouse.currentWarehouseId,
          },
        })
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

  const newProductModal = {
    title: 'Agrega un nuevo producto',
    buttonTitle: 'Crear producto',
    ...modalInputs,
    action: tableActions.create,
  }

  const editProductModal = {
    title: 'Editar producto',
    ...modalInputs,
    action: tableActions.edit,
  }

  if (currentWarehouseId == '' || warehouse.data.length === 0) return

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddProductModal modal={newProductModal} />}
      editItemModal={<EditProductModal modal={editProductModal} />}
    />
  )
}
