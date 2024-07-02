import { BiTrash } from 'react-icons/bi'
import { products } from './data'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '@renderer/features/invoicingSlice'
type Product = (typeof products)[0]

export const DeleteProduct = ({ product }: { product: Product }) => {
  const dispatch = useDispatch()
  const handleDelete = () => dispatch(deleteProduct({ id: product.id }))

  return <BiTrash onClick={() => handleDelete()} className='cursor-pointer' />
}
