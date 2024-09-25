import { editAmount } from '@renderer/features/newInvoicing'
import { useDispatch } from 'react-redux'
import { ProductModel } from '@renderer/interfaces/product'
import { BiMinus, BiPlus } from 'react-icons/bi'

export const EditAmount = ({ product }: { product: ProductModel }) => {
  const dispatch = useDispatch()
  const handleClick = (handleType: string) => dispatch(editAmount({ id: product.id, handleType }))

  return (
    <div className='flex gap-4 items-center content-center select-none'>
      <BiPlus onClick={() => handleClick('sum')} className='cursor-pointer' />
      <span>{product.quantity}</span>
      <BiMinus onClick={() => handleClick('sub')} className='cursor-pointer' />
    </div>
  )
}
