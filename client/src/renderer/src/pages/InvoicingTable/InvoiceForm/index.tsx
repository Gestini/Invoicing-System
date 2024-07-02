import React from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'

export const InvoiceForm = () => {
  const [data, setData] = React.useState<any>({})

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value

    setData({
      ...data,
      [name]: value,
    })
  }

  const inputs = [
    {
      label: 'DNI/CUIL',
      name: 'DNI/CUIL',
      type: 'text',
      placeholder: 'Selecciona una sucursal',
    },
    {
      label: 'Cliente',
      name: 'client',
      type: 'text',
      placeholder: 'factura',
    },
  ]

  const selectInputs = [
    {
      label: 'Sucursal',
      placeholder: 'Selecciona una sucursal',
      options: [{ label: 'El electricista', value: 'El electricista' }],
    },
    {
      label: 'Condición de venta',
      placeholder: 'Selecciona una condición',
      options: [{ label: 'El electricista', value: 'El electricista' }],
    },
    {
      label: 'Vendedor',
      placeholder: 'Selecciona un vendedor',
      options: [{ label: 'El electricista', value: 'El electricista' }],
    },
    {
      label: 'Cliente',
      placeholder: 'Selecciona un cliente',
      options: [{ label: 'El electricista', value: 'El electricista' }],
    },
    {
      label: 'Número',
      placeholder: 'Selecciona un vendedor',
      options: [{ label: 'El electricista', value: 'El electricista' }],
    },
  ]

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
        {selectInputs.map((item: any, index: number) => (
          <Select
            size='sm'
            key={index}
            name={item.name}
            label={item.label}
            className='default-text-color'
            onChange={(e) => handleChange(e)}
          >
            {item.options.map((state: any) => (
              <SelectItem key={state.value} value={state.value} className='default-text-color'>
                {state.label}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
        {inputs.map((input, index) => (
          <Input
            key={index}
            size='sm'
            name={input.name}
            type={input.type}
            label={input.label}
            onChange={(e) => handleChange(e)}
            placeholder={input.placeholder}
          />
        ))}
      </div>
    </div>
  )
}
