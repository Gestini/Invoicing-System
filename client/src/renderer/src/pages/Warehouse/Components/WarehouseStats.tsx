import { ErrorIcon } from '@renderer/components/Icons/ErrorIcon'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { ChildrenSlider } from '@renderer/components/ChildrenSlider'

export const WarehouseStats = () => {
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId

  const datita = [
    {
      text: 'stock total',
      amount: '100.000',
    },
    {
      text: 'stock disponible',
      amount: '20.000',
    },
    {
      text: 'stock pendiente',
      amount: '2.333',
    },
    {
      text: 'Reposision',
      amount: '1.232',
    },
    {
      text: 'Ventas brutas',
      amount: '1.232',
    },
    {
      text: 'Pendientes',
      amount: '1.232',
    },
    {
      text: 'Ventas netas',
      amount: '1.232',
    },
  ]

  if (currentWarehouseId == '' || warehouse.dataWarehouse.length === 0) return

  return (
    <ChildrenSlider>
      {datita.map((ele, ind) => (
        <div key={ind}>
          <p className='flex gap-1 items-center text-[14px] text-c-title-opacity'>
            {ele.text} <ErrorIcon />
          </p>
          <span className='font-semibold text-c-title text-[24px]'>{ele.amount}</span>
        </div>
      ))}
    </ChildrenSlider>
  )
}
