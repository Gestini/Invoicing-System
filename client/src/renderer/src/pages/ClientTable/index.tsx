import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import {
  reqEditClient,
  reqDeleteClient,
  reqCreateClient,
  reqGetClientByUnit,
} from '@renderer/api/requests'

export const ClientTable = () => {
  const params = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetClientByUnit()
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        reqDeleteClient(id)
        dispatch(deleteItem(id))
        toast.success('Cliente eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqCreateClient({
          ...data,
          businessUnit: {
            id: params.unitId,
          },
        })
        dispatch(addItem(response.data))
        toast.success('Cliente guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, item: any) => {
      try {
        reqEditClient(item?.id, data)
        dispatch(editItem({ data, id: item?.id }))
        toast.success('Cliente editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo cliente',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar cliente',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddItemModal modal={newUserModal} />}
      editItemModal={<EditItemModal modal={editUserModal} />}
    />
  )
}
