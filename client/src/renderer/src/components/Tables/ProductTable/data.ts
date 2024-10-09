import { ChipProps } from '@nextui-org/react'

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions']

const productColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'CATEGORY', uid: 'category', sortable: true },
  { name: 'PRICE', uid: 'price', sortable: true },
  { name: 'STOCK', uid: 'stock', sortable: true },
  { name: 'SUPPLIER', uid: 'supplier' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
]

const productStatusOptions = [
  { name: 'In Stock', uid: 'in_stock' },
  { name: 'Out of Stock', uid: 'out_of_stock' },
  { name: 'Discontinued', uid: 'discontinued' },
]

const oproducts = [
  {
    id: '1',
    name: 'Laptop Pro 15',
    category: 'Electronics',
    price: '$1200',
    stock: 30,
    supplier: 'TechCorp',
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Smartphone X',
    category: 'Electronics',
    price: '$800',
    stock: 50,
    supplier: 'MobileInc',
    status: 'in_stock',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    category: 'Accessories',
    price: '$150',
    stock: 150,
    supplier: 'SoundGear',
    status: 'in_stock',
  },
  {
    id: '4',
    name: 'Gaming Mouse',
    category: 'Accessories',
    price: '$60',
    stock: 75,
    supplier: 'GamerTech',
    status: 'out_of_stock',
  },
  {
    id: '5',
    name: 'Office Chair',
    category: 'Furniture',
    price: '$200',
    stock: 20,
    supplier: 'FurniCo',
    status: 'in_stock',
  },
  {
    id: '6',
    name: '4K Monitor',
    category: 'Electronics',
    price: '$350',
    stock: 40,
    supplier: 'DisplayWorld',
    status: 'discontinued',
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    price: '$120',
    stock: 60,
    supplier: 'KeyMaster',
    status: 'in_stock',
  },
  {
    id: '8',
    name: 'Portable SSD',
    category: 'Electronics',
    price: '$100',
    stock: 80,
    supplier: 'StoragePlus',
    status: 'in_stock',
  },
  {
    id: '9',
    name: 'Ergonomic Mousepad',
    category: 'Accessories',
    price: '$25',
    stock: 200,
    supplier: 'ErgoStuff',
    status: 'in_stock',
  },
  {
    id: '10',
    name: 'Bluetooth Speaker',
    category: 'Accessories',
    price: '$75',
    stock: 120,
    supplier: 'SoundWave',
    status: 'out_of_stock',
  },
]

export { oproducts, productColumns, statusColorMap, productStatusOptions, INITIAL_VISIBLE_COLUMNS }
