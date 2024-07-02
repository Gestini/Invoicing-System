export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'SITIO WEB', uid: 'website' },
    { name: 'DIRECCIÓN', uid: 'address' },
    { name: 'TELÉFONO', uid: 'phone' },
    { name: 'CEDULA', uid: 'dni' },
    // { name: 'RAZON SOCIAL', uid: 'company' },
   
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Activo', uid: 'ACTIVE' },
    { name: 'Inactivo', uid: 'INACTIVE' },
  ],
  InitialVisibleColumns: [
    'name',
    'email',
    'website',
    'address',
    'phone',
    'dni',
    'status',
    'actions',

  ],
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
      name: 'lastName',
      label: 'Apellido',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'number',
      name: 'CI',
      label: 'Cédula',
    },
    {
      type: 'text',
      name: 'company',
      label: 'Razón social',
    },
    {
      type: 'phone',
      name: 'phone',
      label: 'Telefono',
    },
    {
      type: 'text',
      name: 'website',
      label: 'Sitio web',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Estado del proveedor',
      options: [
        { label: 'Activo', value: 'ACTIVE' },
        { label: 'Inactivo', value: 'INACTIVE' },
      ],
    },
  ],
}
