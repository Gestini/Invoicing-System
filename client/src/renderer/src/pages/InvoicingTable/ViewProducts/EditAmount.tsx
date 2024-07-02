import { products } from './data'
import { editAmount } from '@renderer/features/invoicingSlice'
import { useDispatch } from 'react-redux'
import { BiMinus, BiPlus } from 'react-icons/bi'

type Product = (typeof products)[0]

export const EditAmount = ({ product }: { product: Product }) => {
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
