export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'NOMBRE DEL PRODUCTO', uid: 'name' },
    { name: 'CÓDIGO', uid: 'barcode' },
    { name: 'CATEGORÍA', uid: 'category' },
    { name: 'PRECIO', uid: 'price', sortable: true },
    { name: 'PROVEEDOR', uid: 'supplierUnit' },
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'CANTIDAD', uid: 'quantity', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Disponible', uid: 'AVAILABLE' },
    { name: 'No disponible', uid: 'NOTAVAILABLE' },
  ],
  InitialVisibleColumns: [
    'id',
    'price',
    'category',
    'name',
    'quantity',
    'status',
    'actions',
    'supplierUnit',
  ],
}