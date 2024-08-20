export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'PIN', uid: 'pin' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLDIO', uid: 'lastname' },
    { name: 'EMAIL', uid: 'email' },
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
    'email',
    'id',
    'actions',
  ],
}

export const modalInputs = {
  inputs: [
    {
      type: 'email',
      name: 'email',
      label: 'Correo del empleado',
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nombre del empleado',
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Apellido del empleado',
    },
  ],
}
