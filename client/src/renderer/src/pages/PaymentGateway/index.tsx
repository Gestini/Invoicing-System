import React from 'react'
import { reqGetPlan } from '@renderer/api/requests'
import { OrderDetails } from './Components/OrderDetails'
import { PaymentDetails } from './Components/PaymentDetails'
import { PaymentConfirmed } from './PaymentConfirmed'
import { useParams, useNavigate } from 'react-router-dom'

export const PaymentGateway = () => {
  const params = useParams()
  const navigate = useNavigate()
  const formRef = React.useRef(null)
  const [loading, setLoading] = React.useState(true)
  const [currentPlan, setCurrentPlan] = React.useState<any>(null)
  const [currentToken, setCurrentToken] = React.useState('')
  const [paymentSuccess, setPaymentSuccess] = React.useState(false)

  React.useEffect(() => {
    const Authorization = localStorage.getItem('token')
    if (!Authorization) return

    setCurrentToken(Authorization)
    const loadCurrentPlan = async () => {
      try {
        const response = await reqGetPlan(params.planId)
        setCurrentPlan(response.data)
        setLoading(false)
      } catch (error) {
        navigate('/')
      }
    }
    loadCurrentPlan()
  }, [params, navigate])

  React.useEffect(() => {
    if (!currentPlan) return

    const auxWindow: any = window
    const mp = new auxWindow.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)

    const cardForm = mp.cardForm({
      amount: currentPlan.price.toString(),
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
        onSubmit: async (event) => {
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

          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_PAYMENT_GATEWAY}/mercadopago/create-payment`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: currentToken,
                },
                body: JSON.stringify({
                  token,
                  issuer_id,
                  payment_method_id,
                  transaction_amount: Number(amount),
                  installments: Number(installments),
                  planId: Number(currentPlan.id),
                  unitId: Number(params.unitId),
                  description: currentPlan.description,
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              },
            )

            if (response.ok) {
              setPaymentSuccess(true)
            } else {
              console.error('Error en el pago:', response.statusText)
            }
          } catch (error) {
            console.error('Error en el proceso de pago:', error)
          }
        },
      },
    })
  }, [loading])

  if (loading) return <></>

  return (
    <form
      id='form-checkout'
      ref={formRef}
      className='min-h-screen flex items-center justify-center bg-[#f4f7fe] p-4'
    >
      {!paymentSuccess ? (
        <div className='bg-white rounded-lg w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2'>
          <OrderDetails currentPlan={currentPlan} />
          <PaymentDetails currentPlan={currentPlan} />
        </div>
      ) : (
        <PaymentConfirmed />
      )}
    </form>
  )
}
