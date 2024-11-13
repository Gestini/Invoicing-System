export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'CODE', uid: 'code' },
    { name: 'VALOR', uid: 'value' },
    { name: 'TIPO', uid: 'type' },
    { name: 'USOS MAXIMOS', uid: 'maxUsages' },
    { name: 'ACION', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Fijo', uid: 'FIXED' },
    { name: 'Porcentaje', uid: 'PERCENTAGE' },
  ],
  InitialVisibleColumns: ['id', 'code', 'value', 'type', 'maxUsages', 'actions'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'number',
      name: 'value',
      label: 'Valor',
      placeholder: 'Ingresa el valor',
    },
    {
      type: 'number',
      name: 'maxUsages',
      label: 'Usos máximos',
      placeholder: 'Ingresa los usos máximos',
    },
  ],
  selectInputs: [
    {
      name: 'type',
      label: 'Tipo de descuento',
      placeholder: 'Selecciona el tipo de descuento',
      options: [
        { label: 'Fijo', value: 'FIXED' },
        { label: 'Porcentaje', value: 'PERCENTAGE' },
      ],
    },
  ],
}
