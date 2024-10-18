import React from 'react'
import { IoPush } from 'react-icons/io5'
import { AppTable } from '@renderer/components/AppTable'
import { RootState } from '@renderer/store'
import { columnsData } from './data'
import { AddProductModal } from '../Modals/Products/ProductAdd'
import { EditProductModal } from '../Modals/Products/ProductEdit'
import { DropdownItemInteface } from '@renderer/components/AppTable/Interfaces/ActionDropdown'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { MoveProductToInventory } from '../Modals/MoveProductToInventory'
import { useDispatch, useSelector } from 'react-redux'
import { reqDeleteProduct, reqGetProductByDeposit } from '@renderer/api/requests'
import { deleteItem, setCurrentItemId, setTableData } from '@renderer/features/tableSlice'

export const StockTable = () => {
  const dispatch = useDispatch()
  const [_, toggleEditProductModal] = useModal(modalTypes.editProductModal)
  const [__, toggleMoveProductToInventoryModal] = useModal(modalTypes.moveProductToInventoryModal)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId

  React.useEffect(() => {
    if (currentWarehouseId === -1) return
    const loadData = async () => {
      const response = await reqGetProductByDeposit(currentWarehouseId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [currentWarehouseId])

  const handleSetCurrentIdEdit = (id: number) => dispatch(setCurrentItemId(id))

  const dropdownAction: DropdownItemInteface[] = [
    {
      key: 'edit',
      title: 'Editar',
      onPress: (id) => {
        handleSetCurrentIdEdit(id)
        toggleEditProductModal()
      },
    },
    {
      key: 'move',
      title: 'Mover a inventario',
      onPress: async (id) => {
        handleSetCurrentIdEdit(id)
        toggleMoveProductToInventoryModal()
      },
      startContent: <IoPush />,
    },
    {
      key: 'delete',
      title: 'Borrar',
      onPress: async (id) => {
        try {
          dispatch(deleteItem(id))
          await reqDeleteProduct(id)
        } catch (error: any) {
          console.log(error)
        }
      },
    },
  ]

  if (currentWarehouseId === -1 || warehouse.dataWarehouse.length === 0) return

  return (
    <>
      <MoveProductToInventory />
      <AppTable
        columnsData={columnsData}
        addItemModal={<AddProductModal />}
        editItemModal={<EditProductModal />}
        dropdownAction={dropdownAction}
      />
    </>
  )
}
