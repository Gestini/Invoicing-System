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
    quantity: 4,
  },
  {
    id: 2,
    productName: 'Escritorio HD',
    category: 'Hogar',
    price: '29',
    quantity: 4,
  },
  {
    id: 3,
    productName: 'Teclado de piedra',
    category: 'Tecnología',
    price: '29',
    quantity: 4,
  },
  {
    id: 4,
    productName: 'Tampones',
    category: 'Personal',
    price: '29',
    quantity: 4,
  },
  {
    id: 5,
    productName: 'Copa menstrual',
    category: 'Personal',
    price: '29',
    quantity: 4,
  },
]

export { columns, products }
