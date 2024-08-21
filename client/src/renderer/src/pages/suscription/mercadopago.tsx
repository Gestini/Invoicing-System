import axios from 'axios'
import React, { useEffect } from 'react'

const MercadoPago = () => {
  useEffect(() => {
    // Asegúrate de que el script de MercadoPago.js esté disponible
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.onload = () => {
      const mp = new window.MercadoPago('APP_USR-689ec09c-5b62-45be-a4ba-ab01debaea06') // Reemplaza con tu clave pública

      const cardForm = mp.cardForm({
        amount: '100.5',
        iframe: true,
        form: {
          id: 'form-checkout',
          cardNumber: {
            id: 'form-checkout__cardNumber',
            placeholder: 'Número de tarjeta',
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
            if (error) return console.warn('Form Mounted handling error: ', error)
            console.log('Form mounted')
          },
          onSubmit: async (event) => {
            event.preventDefault()

            const { cardholderEmail: email, amount, token } = cardForm.getCardFormData()

            try {
              const response = await axios.post(
                'https://api.mercadopago.com/preapproval',
                {
                  preapproval_plan_id: '2c938084915406c2019171532b8a0b55', // Reemplaza con el ID de tu plan
                  reason: 'Yoga classes',
                  external_reference: 'YG-1234', // Puedes reemplazar esto con una referencia externa real
                  payer_email: email, // Asegúrate de tener el valor correcto para el email del pagador
                  card_token_id: token, // Asegúrate de que 'token' sea el token del card token ID
                  auto_recurring: {
                    frequency: 1, // Frecuencia en meses
                    frequency_type: 'months',
                    start_date: new Date().toISOString(), // Fecha de inicio
                    end_date: new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1),
                    ).toISOString(), // Fecha de fin (1 año en el futuro)
                    transaction_amount: Number(amount), // Monto de la transacción
                    currency_id: 'ARS', // Moneda
                  },
                  back_url: 'https://www.mercadopago.com.ar',
                  status: 'authorized',
                },
                {
                  headers: {
                    Authorization:
                      'Bearer APP_USR-8560237400183894-082014-b2cfbc31977a857dc7ca76435182ebc2-412126888', // Sustituye YOUR_ACCESS_TOKEN con tu token real
                    'Content-Type': 'application/json',
                  },
                },
              )

              console.log('Preapproval created:', response.data)
            } catch (error) {
              console.error('Error creating preapproval:', error)
            }
          },
          onFetching: (resource) => {
            console.log('Fetching resource: ', resource)

            // Animate progress bar
            const progressBar = document.querySelector('.progress-bar')
            progressBar.removeAttribute('value')

            return () => {
              progressBar.setAttribute('value', '0')
            }
          },
        },
      })
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <form id='form-checkout' className='space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='form-checkout__cardNumber' className='text-gray-700'>
            Número de tarjeta
          </label>
          <div id='form-checkout__cardNumber' className='p-2 border border-gray-300 rounded'></div>
        </div>
        <div className='flex space-x-4'>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__expirationDate' className='text-gray-700'>
              Fecha de vencimiento
            </label>
            <div
              id='form-checkout__expirationDate'
              className='p-2 border border-gray-300 rounded'
            ></div>
          </div>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__securityCode' className='text-gray-700'>
              Código de seguridad
            </label>
            <div
              id='form-checkout__securityCode'
              className='p-2 border border-gray-300 rounded'
            ></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='form-checkout__cardholderName' className='text-gray-700'>
            Titular de la tarjeta
          </label>
          <input
            type='text'
            id='form-checkout__cardholderName'
            className='p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <div className='flex space-x-4'>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__issuer' className='text-gray-700'>
              Banco emisor
            </label>
            <select
              id='form-checkout__issuer'
              className='p-2 border border-gray-300 rounded w-full'
            ></select>
          </div>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__installments' className='text-gray-700'>
              Cuotas
            </label>
            <select
              id='form-checkout__installments'
              className='p-2 border border-gray-300 rounded w-full'
            ></select>
          </div>
        </div>
        <div className='flex space-x-4'>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__identificationType' className='text-gray-700'>
              Tipo de documento
            </label>
            <select
              id='form-checkout__identificationType'
              className='p-2 border border-gray-300 rounded w-full'
            ></select>
          </div>
          <div className='flex flex-col flex-1'>
            <label htmlFor='form-checkout__identificationNumber' className='text-gray-700'>
              Número del documento
            </label>
            <input
              type='text'
              id='form-checkout__identificationNumber'
              className='p-2 border border-gray-300 rounded w-full'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='form-checkout__cardholderEmail' className='text-gray-700'>
            E-mail
          </label>
          <input
            type='email'
            id='form-checkout__cardholderEmail'
            className='p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <button
          type='submit'
          id='form-checkout__submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Pagar
        </button>
        <progress value='0' className='progress-bar w-full mt-2' />
      </form>
    </div>
  )
}

export default MercadoPago
