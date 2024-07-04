import React from 'react'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { editTotal, handleTotal, setTotal } from '@renderer/features/newInvoicing'

export const TotalsInputs = () => {
  const dispatch = useDispatch()

  const newInvoicing = useSelector((state: any) => state.newInvoicing)
  const currentTab = newInvoicing.tabs.find((item) => item.id == newInvoicing.currentTabId)

  React.useEffect(() => {
    dispatch(setTotal(null))
  }, [newInvoicing])

  const handleChange = (e: any) => {
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
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
          endContent={<Checkbox isSelected={item.apply} onChange={() => handleActive(item.name)} />}
        />
      ))}
    </div>
  )
}
