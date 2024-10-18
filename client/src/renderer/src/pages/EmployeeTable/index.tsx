import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import {
  reqEditEmployee,
  reqDeleteEmployee,
  reqCreateEmployee,
  reqGetEmployeesByUnit,
} from '@renderer/api/requests'

export const EmployeeTable = () => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetEmployeesByUnit(params.unitId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        await reqDeleteEmployee(id)
      } catch (error: any) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqCreateEmployee({ ...data, status: 'PENDING' }, params.unitId)
        dispatch(addItem(response.data))
      } catch (error: any) {
        console.log(error)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentUserEdit?.id }))
        await reqEditEmployee(currentUserEdit?.id, data)
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newEmployeeModal = {
    title: 'Invitar a un empleado',
    buttonTitle: 'Invitar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editEmployeeModal = {
    title: 'Editar empleado',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddItemModal modal={newEmployeeModal} />}
      editItemModal={<EditItemModal modal={editEmployeeModal} />}
    />
  )
}
