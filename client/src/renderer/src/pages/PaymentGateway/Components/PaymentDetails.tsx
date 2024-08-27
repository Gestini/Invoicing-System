import React from 'react'
import { BiCart } from 'react-icons/bi'
import MercadoPagoLogo from '../../../assets/image/MercadoPagoLogo.png'
import { BreadcrumbItem, Breadcrumbs, Checkbox, Button } from '@nextui-org/react'

export const PaymentDetails = () => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>('checkout')

  return (
    <div className='p-8 bg-white flex flex-col justify-between'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold text-gray-700'>Métodos de Pago</h2>
        <div className='flex space-x-4'>
          <img src={MercadoPagoLogo} alt='mercadopago' className='h-7' />
        </div>
        <Breadcrumbs
          underline='hover'
          onAction={(key) => setCurrentPage(key)}
          classNames={{
            list: 'bg-gradient-to-br from-blue-500 to-sky-400 shadow-small',
          }}
          itemClasses={{
            item: 'text-white/60 data-[current=true]:text-white',
            separator: 'text-white/40',
          }}
          variant='solid'
        >
          <BreadcrumbItem key='cart'>
            <BiCart />
          </BreadcrumbItem>
          <BreadcrumbItem key='checkout' isCurrent={currentPage === 'checkout'}>
            Payment
          </BreadcrumbItem>
          <BreadcrumbItem key='payment' isCurrent={currentPage === 'payment'}>
            Order confirmed
          </BreadcrumbItem>
        </Breadcrumbs>
        {/* Formulario de pago */}
        <div className='flex flex-col gap-4'>
          <div
            id='form-checkout__cardNumber'
            className='container h-[48px] p-3 border border-gray-300 rounded-md bg-white'
          ></div>
          <div
            id='form-checkout__expirationDate'
            className='container h-[48px] p-3 border border-gray-300 rounded-md bg-white'
          ></div>
          <div
            id='form-checkout__securityCode'
            className='container h-[48px] p-3 border border-gray-300 rounded-md bg-white'
          ></div>
          <div className='flex gap-4'>
            <input
              type='text'
              id='form-checkout__cardholderName'
              placeholder='Titular de la tarjeta'
              className='p-3 border border-gray-300 rounded-md bg-white text-gray-700 w-full'
            />
            <select
              id='form-checkout__issuer'
              className='p-3 border border-gray-300 rounded-md bg-white text-gray-700 w-full'
            ></select>
          </div>
        </div>
        {/* Checkbox de términos y condiciones */}
        <div className='flex items-center mb-4'>
          <Checkbox>
            <label htmlFor='terms' className='ml-2 text-sm text-gray-600'>
              Acepto los{' '}
              <a href='#' className='text-blue-500 underline'>
                términos y condiciones
              </a>
            </label>
          </Checkbox>
        </div>
      </div>
      <Button type='submit' color='primary' radius='sm'>
        Pagar $43.55 USD
      </Button>
    </div>
  )
}
