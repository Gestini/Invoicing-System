const inputs = [
  {
    label: 'DNI/CUIL',
    name: 'dniOrCuil',
    type: 'text',
  },
  {
    label: 'Cliente',
    name: 'client',
    type: 'text',
  },
]

const selectInputs = [
  {
    label: 'Sucursal',
    name: 'branch',
    placeholder: 'Selecciona una sucursal',
    options: [{ label: 'El electricista', value: 'El electricista' }],
  },
  {
    label: 'Condición de venta',
    name: 'saleCondition',
    placeholder: 'Selecciona una condición',
    options: [{ label: 'El electricista', value: 'El electricista' }],
  },
  {
    label: 'Vendedor',
    name: 'seller',
    placeholder: 'Selecciona un vendedor',
    options: [{ label: 'El electricista', value: 'El electricista' }],
  },
  {
    label: 'Cliente',
    name: 'client',
    placeholder: 'Selecciona un cliente',
    options: [{ label: 'El electricista', value: 'El electricista' }],
  },
  {
    label: 'Número',
    name: 'number',
    placeholder: 'Selecciona un vendedor',
    options: [{ label: 'El electricista', value: 'El electricista' }],
  },
]

export { selectInputs, inputs }
