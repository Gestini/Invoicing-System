import React from 'react'
import { Card } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { reqGetAllPlans } from '@renderer/api/requests'
import { BiLinkExternal } from 'react-icons/bi'

const PlanCard = ({ plan }) => {
  const features = ['feature', 'feature', 'feature', 'feature']
  const params = useParams()

  return (
    <Card
      className={`overflow-visible bg-c-card flex flex-col h-[450px] rounded-lg p-8 w-full max-w-xs mx-auto ${plan.isPopular ? 'transform translate-y-7' : ''}`}
    >
      <div className='flex items-center justify-center content-center flex-col'>
        {plan.isPopular && (
          <div className='absolute -top-4'>
            <span className='text-xs font-bold bg-c-primary text-white py-4 px-3 rounded-md shadow-sm'>
              Primer mes gratis
            </span>
          </div>
        )}
      </div>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl text-c-title'>{plan.name}</h2>
          <p className='text-6xl font-extrabold text-c-title'>
            {plan.price}
            <span className='text-lg font-medium text-gray-400'>/ Mes</span>
          </p>
          <p className='text-sm text-c-title'>{plan.description}</p>
          <ul className='flex gap-1 flex-col'>
            {features.map((feature, index) => (
              <li key={index} className='flex gap-2 text-c-title items-center'>
                <svg
                  className='w-4 h-4 text-c-title'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  ></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Link to={`/payment/${plan.id}/${params.unitId}`} target='_blank'>
          <Button
            className='relative bg-gray-200 text-black py-2 px-4 rounded-lg w-full hover:bg-gray-300 transition-colors z-10'
            endContent={<BiLinkExternal />}
          >
            Susbribirse
          </Button>
        </Link>
      </div>
    </Card>
  )
}

const Plans = () => {
  const [plans, setPlans] = React.useState([])

  React.useEffect(() => {
    const loadAllPlans = async () => {
      const response = await reqGetAllPlans()
      setPlans(response.data)
    }
    loadAllPlans()
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {plans.map((plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </div>
  )
}

export default Plans
