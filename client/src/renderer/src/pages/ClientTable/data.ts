export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'DESCRIPCION', uid: 'description' },
    { name: 'DIRECCIÓN', uid: 'address' },
    { name: 'TELÉFONO', uid: 'phone' },
    { name: 'CEDULA', uid: 'dni' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Activo', uid: 'ACTIVE' },
    { name: 'Inactivo', uid: 'INACTIVE' },
  ],
  InitialVisibleColumns: ['name', 'description', 'website', 'address', 'phone', 'dni', 'actions'],
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
      name: 'description',
      label: 'Descripción',
    },
    {
      type: 'phone',
      name: 'phone',
      label: 'Telefono',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'text',
      name: 'address',
      label: 'Dirección',
    },
    {
      type: 'text',
      name: 'dni',
      label: 'DNI',
    },
  ],
}
