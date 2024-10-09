import React from 'react'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { RootState } from '@renderer/store'
import { WarehouseModel } from '@renderer/interfaces/warehouse'
import { ChildrenSlider } from '@renderer/components/ChildrenSlider'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { reqGetDepositByUnit } from '@renderer/api/requests'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWarehouseId, setDataWarehouses } from '@renderer/features/warehouseSlice'

export const WarehouseCard = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId
  const [isOpen, _] = useModal(modalTypes.companySettingsModal)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetDepositByUnit(unit.id)
        const deposits: WarehouseModel[] = response.data

        dispatch(setDataWarehouses(response.data))

        if (deposits.length === 0) return

        openWarehouse(deposits[0].id)
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [isOpen])

  const openWarehouse = (depositId: number) => dispatch(setCurrentWarehouseId(depositId))

  return (
    <div>
      {warehouse.dataWarehouse.length === 0 ? (
        <div className='flex items-center justify-between gap-4'>
          <p className='text-foreground-400 align-middle text-center'>
            No tienes depósitos asignados.
          </p>
        </div>
      ) : (
        <ChildrenSlider spaceBetween={15}>
          {warehouse.dataWarehouse.map((ele, ind: number) => (
            <div
              key={ind}
              onClick={() => openWarehouse(Number(ele.id))}
              className={`${
                currentWarehouseId === ele.id ? 'bg-c-primary-variant-3' : 'bg-c-card'
              } gap-4 w-[285px] h-[76px] rounded-[10px] flex-shrink-0 shadow-sm px-[19px] py-[21px] flex items-center cursor-pointer`}
            >
              <div
                className={`${
                  currentWarehouseId === ele.id ? 'bg-c-primary-variant-3' : 'bg-c-card-variant-3'
                } p-2 rounded-lg`}
              >
                <LocalIcon color='var(--c-primary)' />
              </div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex flex-col'>
                  <span className='text-[24px] h-8 text-c-primary'>
                    <ShortCellValue cellValue={ele.name} maxLength={13} />
                  </span>
                  <span className='text-[12px] text-c-title'>Buenos aires</span>
                </div>
              </div>
            </div>
          ))}
        </ChildrenSlider>
      )}
    </div>
  )
}
