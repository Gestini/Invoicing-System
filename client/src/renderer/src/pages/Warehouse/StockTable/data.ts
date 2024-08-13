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
    //{ name: 'PROVEEDOR', uid: 'supplier' },
    //{ name: 'ESTADO', uid: 'status' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Disponible', uid: '0' },
    { name: 'Agotado', uid: '1' },
  ],
  InitialVisibleColumns: [
    'codigo1',
    'cardPrice',
    'friendPrice',
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
      type: 'number',
      name: 'code',
      label: 'Código',
    },
    {
      type: 'number',
      name: 'code',
      label: 'Código #2',
    },
    {
      type: 'number',
      name: 'code',
      label: 'Código de barra',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio de compra',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Calculo de precio',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio de costo',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Neto #1',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio de contado',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio de tarjeta',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio financiado',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Precio de amigo',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Neto #2',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Neto #3',
    },
    {
      type: 'number',
      name: 'price',
      label: 'Neto #4',
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
    {
      type: 'text',
      name: 'category',
      label: 'Categoría',
    },
    {
      type: 'text',
      name: 'category',
      label: 'Codigo de referencia',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Rubro',
      options: [{ label: 'Opción 1', value: 'Opción_1' }],
    },
    {
      name: 'status',
      label: 'Tipo iva',
      options: [{ label: 'Opción 1', value: 'Opción_1' }],
    },
    {
      name: 'status',
      label: 'Proveedor',
      options: [{ label: 'Opción 1', value: 'Opción_1' }],
    },
    {
      name: 'status',
      label: 'Envasado',
      options: [
        { label: 'Sí', value: true },
        { label: 'No', value: false },
      ],
    },
    {
      name: 'status',
      label: 'Estado',
      options: [
        { label: 'Disponible', value: 'AVAILABLE' },
        { label: 'Agotado', value: 'OUT_OF_STOCK' },
      ],
    },
  ],
}
