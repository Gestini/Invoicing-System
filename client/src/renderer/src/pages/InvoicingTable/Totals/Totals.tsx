import React from 'react'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { totalApply } from '../ViewProducts/data'
import { useDispatch, useSelector } from 'react-redux'
import { editTotal, handleTotal, setTotal } from '@renderer/features/invoicingSlice'

export const TotalsInputs = () => {
  const dispatch = useDispatch()
  const invoice = useSelector((state: any) => state.invoicing)

  React.useEffect(() => {
    dispatch(setTotal(null))
  }, [invoice])

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = parseInt(e.target.value)
    dispatch(editTotal({ name, value }))
  }

  const handleActive = (name: string) => dispatch(handleTotal(name))

  return (
    <div className='flex flex-wrap gap-2'>
      {totalApply.map((item, index) => (
        <Input
          key={index}
          type='number'
          name={item.name}
          label={item.label}
          onChange={handleChange}
          className='max-w-[120px]'
          placeholder='0.00'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
          endContent={
            <Checkbox defaultSelected={item.apply} onChange={() => handleActive(item.name)} />
          }
        />
      ))}
    </div>
  )
}
