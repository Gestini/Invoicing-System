export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'DESCRIPCION', uid: 'description' },
    { name: 'DIRECCIÓN', uid: 'address' },
    { name: 'TELÉFONO', uid: 'phone' },
    { name: 'CEDULA', uid: 'dni' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  InitialVisibleColumns: ['name', 'description', 'website', 'address', 'phone', 'dni', 'actions'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
      placeholder: 'Ingresa el nombre',
    },
    {
      type: 'text',
      name: 'description',
      label: 'Descripción',
      placeholder: 'Ingresa la descripción',
    },
    {
      type: 'phone',
      name: 'phone',
      label: 'Teléfono',
      placeholder: 'Ingresa el teléfono',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Ingresa el correo',
    },
    {
      type: 'text',
      name: 'address',
      label: 'Dirección',
      placeholder: 'Ingresa la dirección',
    },
    {
      type: 'text',
      name: 'dni',
      label: 'DNI',
      placeholder: 'Ingresa el DNI',
    },
  ],
}
