export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'ACION', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Activo', uid: 'ACTIVE' },
  ],
  InitialVisibleColumns: ['id', 'name', 'actions'],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
    },
  ],
}
