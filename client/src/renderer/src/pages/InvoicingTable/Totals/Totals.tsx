import React from 'react'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import { editTotal, handleTotal, setTotal } from '@renderer/features/newInvoicing'

export const TotalsInputs = () => {
  const dispatch = useDispatch()
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)

  React.useEffect(() => {
    dispatch(setTotal())
  }, [newInvoicing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name
    let value = parseInt(e.target.value)
    dispatch(editTotal({ name, value }))
  }

  const handleActive = (name: string) => dispatch(handleTotal(name))

  return (
    <div className='flex flex-wrap gap-2'>
      {currentTab?.totalApply?.map((item: any, index: number) => (
        <Input
          key={index}
          type='number'
          name={item.name}
          label={item.label}
          value={item.value}
          onChange={handleChange}
          className='max-w-[120px]'
          placeholder='0.00'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>
                {item.format === 'number' ? '$' : item.format === 'percentage' ? '%' : ''}
              </span>
            </div>
          }
          endContent={
            <Checkbox
              isSelected={item.apply}
              onChange={() => handleActive(item.name)}
              color='primary'
              classNames={{
                wrapper: 'after:bg-[var(--c-primary-variant-1)]',
              }}
            />
          }
        />
      ))}
    </div>
  )
}
