import React from 'react'
import { setTotal } from '@renderer/features/newInvoicing'
import { BiDollar } from 'react-icons/bi'
import { RootState } from '@renderer/store'
import { TotalsInputs } from './Totals'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'

export const Totals = () => {
  const dispatch = useDispatch()
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)

  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)

  React.useEffect(() => {
    dispatch(setTotal())
  }, [currentTab])

  return (
    <Card className='lg:max-w-[400px]'>
      <CardHeader className='flex gap-3'>
        <span className='dashboardIcon text-c-primary-variant-1 w-fit p-2.5 bg-c-bg-color-2 rounded text-xl'>
          <BiDollar />
        </span>
        <div className='flex justify-center items-center gap-4'>
          <h3 className='text-default-500 text-3xl'>Total:</h3>
          <span className='text-default-500 text-3xl font-medium'>{currentTab?.total}$</span>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <TotalsInputs />
      </CardBody>
    </Card>
  )
}
