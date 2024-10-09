import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { columnsData } from './data'
import { useDispatch } from 'react-redux'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { DropdownItemInteface } from '@renderer/components/AppTable/Interfaces/ActionDropdown'
import { deleteItem, setTableData } from '@renderer/features/tableSlice'
import { reqGetUnitInventoryById, reqRemoveInventoryById } from '@renderer/api/requests'

export const UniInventory = () => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetUnitInventoryById(params.unitId)
        dispatch(
          setTableData(
            response.data.map((item: any) => {
              return {
                ...item.product,
                id: item.id,
                quantity: item.quantity,
              }
            }),
          ),
        )
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'returnToDeposit',
      title: 'Enviar al depósito',
      onPress: async (id) => {
        try {
          dispatch(deleteItem(id))
          reqRemoveInventoryById(id)
        } catch (error) {
          console.log(error)
        }
      },
      startContent: <FaArrowRotateLeft className='text-danger' />,
    },
  ]

  return <AppTable columnsData={columnsData} dropdownAction={dropdownAction} />
}
