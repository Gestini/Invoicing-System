export const columnsData = {
  columns: [
    { name: 'NOMBRE DEL PRODUCTO', uid: 'name' },
    { name: 'CÓDIGO', uid: 'codigo1' },
    { name: 'CATEGORÍA', uid: 'category' },
    { name: 'ID', uid: 'id' },
    { name: 'PRECIO TARJETA', uid: 'cardPrice', sortable: true },
    { name: 'PRECIO AMIGO', uid: 'friendPrice', sortable: true },
    { name: 'PRECIO FINANCIADO', uid: 'financedPrice', sortable: true },
    { name: 'CANTIDAD', uid: 'quantity', sortable: true },
    { name: 'PROVEEDOR', uid: 'supplier' },
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Disponible', uid: 'AVAILABLE' },
    { name: 'Agotado', uid: 'OUT_OF_STOCK' },
  ],
  InitialVisibleColumns: [
    'codigo1',
    'cardPrice',
    "friendPrice",
    'financedPrice',
    'category',
    'name',
    'quantity',
    'status',
    'actions',
    'supplier',
  ],
}

export const modalInputs = {
  inputs: [
    {
      type: 'text',
      name: 'productName',
      label: 'Nombre del Producto',
    },
    {
      type: 'text',
      name: 'category',
      label: 'Categoría',
    },
    {
      type: 'number',
      name: 'code',
      label: 'Código',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio',
    },
    {
      type: 'number',
      name: 'quantity',
      label: 'Cantidad',
    },
    {
      type: 'text',
      name: 'supplier',
      label: 'Proveedor',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Estado del producto',
      options: [
        { label: 'Disponible', value: 'AVAILABLE' },
        { label: 'Agotado', value: 'OUT_OF_STOCK' },
      ],
    },
  ],
}
