import React from 'react'
import { PlusIcon } from '@renderer/components/Icons'
import { RootState } from '@renderer/store'
import { DiscountType } from '@renderer/interfaces/discount'
import { MdAttachMoney } from 'react-icons/md'
import { setDiscount, setTotal } from '@renderer/features/newInvoicing'
import { useDispatch, useSelector } from 'react-redux'
import { reqCreateInvoice, reqFindDiscountByCode } from '@renderer/api/requests'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'

export const Totals = () => {
  const dispatch = useDispatch()
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)
  const [discountCode, setDiscountCode] = React.useState('')

  React.useEffect(() => {
    dispatch(setTotal())
    if (currentTab?.discount) {
      setDiscountCode(currentTab.discount.code)
    } else {
      setDiscountCode('')
    }
  }, [currentTab, currentTab?.discount])

  const onSubmmit = () => {
    reqCreateInvoice({
      ...currentTab?.formData,
      total: currentTab?.total,
      products: currentTab?.products,
      discountCode: currentTab?.discount?.code,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDiscountCode(e.target.value)
  }

  const searchDiscountCode = () => {
    reqFindDiscountByCode(discountCode)
      .then((res) => dispatch(setDiscount(res.data)))
      .catch(() => dispatch(setDiscount(null)))
  }

  const paymentMethods = [
    {
      method: 'Dinero',
      icon: <MdAttachMoney />,
    },
    {
      method: 'Tarjeta Credito',
      icon: <MdAttachMoney />,
    },
    {
      method: 'E-Wallet',
      icon: <MdAttachMoney />,
    },
  ]

  return (
    <Card className='min-w-[300px]'>
      <CardHeader>
        <Input
          placeholder='Código de descuento'
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            innerWrapper: 'bg-transparent',
            inputWrapper: ['dark:hover:bg-default/50'],
          }}
          endContent={
            <Button isIconOnly size='sm' aria-label='Like'>
              <PlusIcon onClick={searchDiscountCode} />
            </Button>
          }
          value={discountCode}
          onChange={handleChange}
        />
      </CardHeader>
      <CardBody className='flex justify-between gap-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between text-sm'>
            <span>Monto Neto</span>
            <span>{currentTab?.total}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>IVA 19%</span>
            <span>$10.00</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>Descuento</span>
            <span>
              {currentTab?.discount == null && 'Ninguno'}
              {currentTab?.discount?.type == DiscountType.FIXED && '$'}
              {currentTab?.discount?.type == DiscountType.PERCENTAGE && '%'}
              {currentTab?.discount?.value}
            </span>
          </div>
        </div>
        <span className=' border-t border-dashed border-[#fafafa44]'></span>
        <div className='flex-col flex justify-between '>
          <div className='flex gap-2 items-center'>
            <span className='text-xs'>Sub total</span>
            <span className='text-1xl'>
              <s>${currentTab?.subTotal}</s>
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-xl'>Total</span>
            <span className='text-2xl'>${currentTab?.total}</span>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm '>Metodos de Pago</span>
            <div className='flex justify-between'>
              {paymentMethods.map((item, index) => (
                <div className='flex flex-col gap-[10px] items-center' key={index}>
                  <div className='w-[80px] h-[45px] rounded-2xl border flex justify-center items-center'>
                    <span className='rounded-full text-[var(--text)] text-xl'>{item.icon}</span>
                  </div>
                  <span className='text-xs'>{item.method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          isDisabled={currentTab?.products.length === 0}
          className='text-[#fff]  bg-[var(--c-primary)]  dark:bg-[var(--c-primary-variant-2)] font-semibold text-xl py-8 rounded-[14px]'
          onPress={onSubmmit}
        >
          Pagar
        </Button>
      </CardBody>
    </Card>
  )
}
