export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'PIN', uid: 'pin' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastname' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Activo', uid: 'ACTIVE' },
  ],
  InitialVisibleColumns: ['name', 'lastname', 'email', 'status', 'id', 'actions'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Apellido',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'text',
      name: 'pin',
      label: 'Pin de ingreso',
    },
  ],
}
