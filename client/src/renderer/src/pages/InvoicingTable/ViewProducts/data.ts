const columns = [
  { name: 'NOMBRE DEL PRODUCTO', uid: 'name' },
  { name: 'PRECIO', uid: 'price', sortable: true },
  { name: 'CANTIDAD', uid: 'quantity', sortable: true },
  { name: 'STOCK', uid: 'inventoryQuantity' },
  { name: 'ACCIÓN', uid: 'actions' },
]

const totalApply = [
  {
    label: 'Recargo',
    name: 'recargo',
    value: 0,
    apply: false,
    format: 'number',
  },
  {
    label: 'Neto 0%',
    name: 'neto_0%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Neto 10.5%',
    name: 'neto_10.5%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Neto 21%',
    name: 'neto_21%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Iva 10.5%',
    name: 'iva_10.5%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Iva 21%',
    name: 'iva_21%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Prec iva 21%',
    name: 'prec_iva_21%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Descuento %',
    name: 'descuento_%',
    value: 0,
    apply: false,
    format: 'percentage',
  },
  {
    label: 'Descuento $',
    name: 'descuento_$',
    value: 0,
    apply: false,
    format: 'percentage',
  },
]

export { columns, totalApply }
