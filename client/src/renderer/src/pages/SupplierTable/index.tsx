import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/AppTable'
import { AddSupplierModal } from '@renderer/components/AppTable/Modals/SupplierAdd'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem, setData } from '@renderer/features/tableSlice'
import { reqCreateSupplier, reqGetSupplier } from '@renderer/api/requests'
import { useEffect } from 'react'

export const SupplierTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.table)

  useEffect(() => {
    const GetSupplier = async () => {
      const response = await reqGetSupplier(6)
      console.log(response)

      dispatch(setData(response.data))
    }
    GetSupplier()
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
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentUserEdit?.id }))
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
      editItemModal={<EditItemModal modal={editUserModal} />}
    />
  )
}
