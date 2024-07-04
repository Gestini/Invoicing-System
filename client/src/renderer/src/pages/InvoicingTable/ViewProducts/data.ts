const columns = [
  { name: 'NOMBRE DEL PRODUCTO', uid: 'productName' },
  { name: 'CATEGORÍA', uid: 'category' },
  { name: 'PRECIO', uid: 'price', sortable: true },
  { name: 'CANTIDAD', uid: 'quantity', sortable: true },
  { name: 'ACCIÓN', uid: 'actions' },
]

const products = [
  {
    id: 1,
    productName: 'Licuadora gamer',
    category: 'Electrodomesticos',
    price: '29',
    quantity: 1,
  },
  {
    id: 2,
    productName: 'Escritorio HD',
    category: 'Hogar',
    price: '29',
    quantity: 1,
  },
  {
    id: 3,
    productName: 'Teclado de piedra',
    category: 'Tecnología',
    price: '29',
    quantity: 1,
  },
  {
    id: 4,
    productName: 'Tampones',
    category: 'Personal',
    price: '29',
    quantity: 1,
  },
  {
    id: 5,
    productName: 'Copa menstrual',
    category: 'Personal',
    price: '29',
    quantity: 1,
  },
]

const totalApply = [
  {
    label: 'Recargo',
    name: 'recargo',
    value: 0,
    apply: false,
  },
  {
    label: 'Neto 0%',
    name: 'neto_0%',
    value: 0,
    apply: false,
  },
  {
    label: 'Neto 10.5%',
    name: 'neto_10.5%',
    value: 0,
    apply: false,
  },
  {
    label: 'Neto 21%',
    name: 'neto_21%',
    value: 0,
    apply: false,
  },
  {
    label: 'Iva 10.5%',
    name: 'iva_10.5%',
    value: 0,
    apply: false,
  },
  {
    label: 'Iva 21%',
    name: 'iva_21%',
    value: 0,
    apply: false,
  },
  {
    label: 'Prec iva 21%',
    name: 'prec_iva_21%',
    value: 0,
    apply: false,
  },
  {
    label: 'Descuento %',
    name: 'descuento_%',
    value: 0,
    apply: false,
  },
  {
    label: 'Descuento $',
    name: 'descuento_$',
    value: 0,
    apply: false,
  },
]

export { columns, products, totalApply }
