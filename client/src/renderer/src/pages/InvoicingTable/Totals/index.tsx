import React from 'react'
import { setTotal } from '@renderer/features/invoicingSlice'
import { BiDollar } from 'react-icons/bi'
import { TotalsInputs } from './Totals'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'

export const Totals = () => {
  const dispatch = useDispatch()
  const invoice = useSelector((state: any) => state.invoicing)

  React.useEffect(() => {
    dispatch(setTotal(null))
  }, [invoice.data])

  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='flex gap-3'>
        <span className='dashboardIcon text-c-primary w-fit p-2.5 bg-c-bg-color-2 rounded text-xl'>
          <BiDollar />
        </span>
        <div className='flex justify-center items-center gap-4'>
          <h3 className='text-default-500 text-3xl'>Total:</h3>
          <span className='text-default-500 text-3xl font-medium'>{invoice.total}$</span>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <TotalsInputs />
      </CardBody>
    </Card>
  )
}
