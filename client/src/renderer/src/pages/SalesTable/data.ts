export const columnsData = {
  columns: [
    { name: 'NOMBRE DEL CLIENTE', uid: 'client' },
    { name: 'DNI/CUIL', uid: 'dniOrCuil' },
    { name: 'ID VENTA', uid: 'id' },
    { name: 'NUMERO', uid: 'number' },
    { name: 'CONDICION', uid: 'saleCondition' },
    /* { name: 'PRODUCTO', uid: 'product' },
     { name: 'CANTIDAD', uid: 'quantity', sortable: true },
    { name: 'PRECIO UNITARIO', uid: 'unitPrice', sortable: true }, */
    { name: 'PRECIO TOTAL', uid: 'total', sortable: true },
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Completado', uid: 'COMPLETED' },
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Cancelado', uid: 'CANCELLED' },
  ],
  InitialVisibleColumns: [
    'client',
    'dniOrCuil',
    'id',
    'number',
    'saleCondition',
    'seller',
    'total',
    /* 'status', */
    'actions',
  ],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'customerName',
      label: 'Nombre del Cliente',
    },
    {
      type: 'number',
      name: 'saleId',
      label: 'ID Venta',
    },
    {
      type: 'text',
      name: 'product',
      label: 'Producto',
    },
    {
      type: 'number',
      name: 'quantity',
      label: 'Cantidad',
    },
    {
      type: 'number',
      name: 'unitPrice',
      label: 'Precio Unitario',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Estado de la venta',
      options: [
        { label: 'Completado', value: 'COMPLETED' },
        { label: 'Pendiente', value: 'PENDING' },
        { label: 'Cancelado', value: 'CANCELLED' },
      ],
    },
  ],
}
