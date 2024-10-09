import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '@renderer/features/newInvoicing'
import { ProductModel } from '@renderer/interfaces/product'

export const DeleteProduct = ({ product }: { product: ProductModel }) => {
  const dispatch = useDispatch()
  const handleDelete = () => dispatch(deleteProduct({ id: product.id }))
  return <BiTrash onClick={() => handleDelete()} className='cursor-pointer' />
}
