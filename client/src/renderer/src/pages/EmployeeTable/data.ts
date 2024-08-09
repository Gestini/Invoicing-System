export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'PIN', uid: 'pin' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastname' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Completado', uid: 'COMPLETED' },
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Cancelado', uid: 'CANCELLED' },
  ],
  InitialVisibleColumns: [
    'name',
    'lastname',
    'id',
    'actions',
  ],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre del empleado',
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Apellido',
    },
    {
      type: 'text',
      name: 'pin',
      label: 'Pin de ingreso',
    },
  ],
}
