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
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Activo', uid: 'ACTIVE' },
  ],
  InitialVisibleColumns: ['id', 'code', 'value', 'type', 'maxUsages', 'actions'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'number',
      name: 'value',
      label: 'Valor',
    },
    {
      type: 'number',
      name: 'maxUsages',
      label: 'Usos máximos',
    },
  ],
  selectInputs: [
    {
      name: 'type',
      label: 'Tipo de descuento',
      options: [
        { label: 'Fijo', value: 'FIXED' },
        { label: 'Porcentaje', value: 'PERCENTAGE' },
      ],
    },
  ],
}
