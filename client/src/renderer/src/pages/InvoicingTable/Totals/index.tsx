import React from 'react'
import { setTotal } from '@renderer/features/newInvoicing'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody } from '@nextui-org/react'

export const Totals = () => {
  const dispatch = useDispatch()
  const newInvoicing = useSelector((state: RootState) => state.unit.newInvoicing)

  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)

  React.useEffect(() => {
    dispatch(setTotal())
  }, [currentTab])

  return (
    <Card className='w-[500px] bg-[#26272B]'>
    <CardHeader className='flex gap-3'>
      <span className='text-xs text-c-primary'>Detalle</span>
    </CardHeader>
    <CardBody>
      <div className='text-white flex flex-col gap-2'>
        <div className='flex justify-between text-sm'>
          <span>Monto Neto</span>
          <span>$100.000</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Vuelto</span>
          <span>$10.00</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>IVA 19%</span>
          <span>$10.00</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Descuento</span>
          <span>$20.00</span>
        </div>
      </div>
      
      {/* Custom Discounts and Additions */}
      <div className='my-2'>
        <div className='mt-3 flex flex-col gap-2'>

          {/* Discounts Section */}
          <div className='text-white'>
            <span className='text-sm font-semibold'>Descuentos</span>
            <div className='flex flex-col gap-2 mt-2'>
              <div className='flex justify-between items-center text-sm'>
                <span>Hot Sale - 20%</span>
                <input type='checkbox' className='w-4 h-4' />
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span>Descuento Especial - $100</span>
                <input type='checkbox' className='w-4 h-4' />
              </div>
            </div>
          </div>
  
          {/* Additions Section */}
          <div className='text-white mt-2'>
            <span className='text-sm font-semibold'>Adicionales</span>
            <div className='flex flex-col gap-2 mt-2'>
              <div className='flex justify-between items-center text-sm'>
                <span>Pago con Tarjeta - 20%</span>
                <input type='checkbox' className='w-4 h-4' />
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span>IVA - 21%</span>
                <input type='checkbox' className='w-4 h-4' />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='border-t border-dashed border-[#fafafa44] flex justify-between h-[57px] py-[14px] my-2'>
        <span className='text-xl'>Total</span>
        <span className='text-2xl'>$100.000</span>
      </div>
      
      {/* <div className='mb-5'>
        <span className='text-sm text-white'>Metodos de Pago</span>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-[10px] items-center'>
            <div className='w-[80px] h-[53px] rounded-2xl border border-[#fafafa44] flex justify-center items-center'>
              <div className='bg-[#fafafa] rounded-full'>
                <MdAttachMoney className='text-[#26272B] text-xl' />
              </div>
            </div>
            <span className='text-xs text-white'>Dinero</span>
          </div>
          <div className='flex flex-col gap-[10px] items-center'>
            <div className='w-[80px] h-[53px] rounded-2xl border border-[#fafafa44] flex justify-center items-center'>
              <div className='bg-[#fafafa] rounded-full'>
                <MdAttachMoney className='text-[#26272B] text-xl' />
              </div>
            </div>
            <span className='text-xs text-white'>Tarjeta Credito</span>
          </div>
          <div className='flex flex-col gap-[10px] items-center'>
            <div className='w-[80px] h-[53px] rounded-2xl border border-[#fafafa44] flex justify-center items-center'>
              <div className='bg-[#fafafa] rounded-full'>
                <MdAttachMoney className='text-[#26272B] text-xl' />
              </div>
            </div>
            <span className='text-xs text-white'>E-Wallet</span>
          </div>
        </div>
      </div> */}
      <button className='bg-[#A0DB8E] text-[#26272B] font-semibold text-xl py-5 rounded-[14px]'>Pagar</button>
    </CardBody>
  </Card>
  )
}
