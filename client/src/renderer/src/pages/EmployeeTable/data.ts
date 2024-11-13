export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'PIN', uid: 'pin' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastname' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ESTADO', uid: 'status' },
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
      placeholder: 'Ingresa el nombre'
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Apellido',
      placeholder: 'Ingresa el apellido'
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Ingresa el correo'
    },
    {
      type: 'text',
      name: 'pin',
      label: 'Pin de ingreso',
      placeholder: 'Ingresa el pin de ingreso'
    },
  ],
}
