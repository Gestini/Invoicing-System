import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'

export const TotalsInputs = () => {
  const inputs = [
    'Recargo',
    'Neto 0%',
    'Neto 21%',
    'IVA %21',
    'Prec IVA',
    'Descuento %',
    'Descuento',
    'Neto 10.5%',
    'IVA 10.5%',
  ]
  return (
    <div className='flex flex-wrap gap-2'>
      {inputs.map((item, index) => (
        <Input
          key={index}
          type='number'
          label={item}
          placeholder='0.00'
          className='max-w-[120px]'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
          endContent={<Checkbox defaultSelected />}
        />
      ))}
    </div>
  )
}
