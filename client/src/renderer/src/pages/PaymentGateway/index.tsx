import React from 'react'
import { OrderDetails } from './Components/OrderDetails'
import { PaymentDetails } from './Components/PaymentDetails'

export const PaymentGateway = () => {
  const formRef = React.useRef(null)

  React.useEffect(() => {
    const auxWindow: any = window
    const mp = new auxWindow.MercadoPago('TEST-8c48ca12-9919-45dd-acfb-e9e5d0de4a8a')

    const cardForm = mp.cardForm({
      amount: '100.5',
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Numero de tarjeta',
        },
        expirationDate: {
          id: 'form-checkout__expirationDate',
          placeholder: 'MM/YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad',
        },
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número del documento',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) return
        },
        onSubmit: (event) => {
          event.preventDefault()

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData()

          fetch('http://localhost:3001/mercadopago/create-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: 'Descripción del producto',
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          })
        },
      },
    })
  }, [])

  return (
    <form
      id='form-checkout'
      ref={formRef}
      className='min-h-screen flex items-center justify-center bg-[#f4f7fe] p-4'
    >
      <div className='bg-white rounded-lg w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2'>
        <OrderDetails />
        <PaymentDetails />
      </div>
    </form>
  )
}
