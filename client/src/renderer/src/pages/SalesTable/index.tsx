import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { columnsData } from './data'
import { useDispatch } from 'react-redux'
import { MdShoppingCart } from 'react-icons/md'
import { ViewProductsModal } from './ViewProductsModal'
import { DropdownItemInteface } from '@renderer/components/AppTable/Interfaces/ActionDropdown'
import { reqDeleteInvoice, reqGetAllInvoicesByUnit } from '@renderer/api/requests'
import { deleteItem, setCurrentItemId, setTableData } from '@renderer/features/tableSlice'

export const SalesTable = () => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetAllInvoicesByUnit(params.unitId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        reqDeleteInvoice(id)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
  }

  const handleSetCurrentIdEdit = (id: number) => dispatch(setCurrentItemId(id))

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'viewProducts',
      title: 'Ver productos',
      onPress: async (id) => {
        handleSetCurrentIdEdit(id)
      },
      startContent: <MdShoppingCart />,
    },
    {
      key: 'delete',
      title: 'Borrar',
      onPress: async (id) => {
        try {
          dispatch(deleteItem(id))
          reqDeleteInvoice(id)
        } catch (error: any) {
          console.log(error)
        }
      },
    },
  ]

  return (
    <>
      <AppTable
        columnsData={columnsData}
        tableActions={tableActions}
        dropdownAction={dropdownAction}
      />
      <ViewProductsModal />
    </>
  )
}
