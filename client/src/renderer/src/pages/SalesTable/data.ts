export const columnsData = {
  columns: [
    { name: 'ID', uid: 'id' },
    { name: 'PRECIO TOTAL', uid: 'total', sortable: true },
    { name: 'VENDEDOR', uid: 'sellerName' },
    { name: 'FECHA', uid: 'createdAt', sortable: true },
    { name: 'DESCUENTO', uid: 'discountCode' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  InitialVisibleColumns: [
    'id',
    'sellerName',
    'total',
    'createdAt',
    'discountCode',
    'actions',
  ],
}
