export const columnsData = {
  columns: [
    { name: 'NOMBRE DEL CLIENTE', uid: 'customerName' },
    { name: 'ID VENTA', uid: 'saleId' },
    { name: 'PRODUCTO', uid: 'product' },
    { name: 'CANTIDAD', uid: 'quantity', sortable: true },
    { name: 'PRECIO UNITARIO', uid: 'unitPrice', sortable: true },
    { name: 'PRECIO TOTAL', uid: 'totalPrice', sortable: true },
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Completado', uid: 'COMPLETED' },
    { name: 'Pendiente', uid: 'PENDING' },
    { name: 'Cancelado', uid: 'CANCELLED' },
  ],
  InitialVisibleColumns: [
    'saleId',
    'date',
    'customerName',
    'product',
    'quantity',
    'unitPrice',
    'totalPrice',
    'status',
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
