import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { AddSupplierModal } from '@renderer/components/AppTable/Modals/SupplierAdd'
import { EditSupplierModal } from '@renderer/components/AppTable/Modals/SupplierEdit'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import { reqCreateSupplier, reqEditSupplier, reqGetSupplier } from '@renderer/api/requests'

export const SupplierTable = () => {
  const table = useSelector((state: any) => state.table)
  const params = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetSupplier(params.unitId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        toast.success('Proveedor eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        reqCreateSupplier(data)
        dispatch(addItem({ ...data, id: table.data.length }))
        toast.success('Proveedor guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (id: any, data: any) => {
      try {
        reqEditSupplier(id, data)
        dispatch(editItem({ data, id: id }))
        toast.success('Proveedor editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo proveedor',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar proveedor',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddSupplierModal modal={newUserModal} />}
      editItemModal={<EditSupplierModal modal={editUserModal} />}
    />
  )
}
