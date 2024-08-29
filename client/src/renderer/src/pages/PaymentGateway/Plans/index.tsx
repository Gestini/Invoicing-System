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
      className={`overflow-visible bg-c-card flex flex-col justify-between h-[450px] rounded-lg p-8 w-full max-w-xs mx-auto ${plan.isPopular ? 'transform translate-y-7' : ''}`}
    >
      <div>
        {plan.isPopular && (
          <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
            <span className='text-xs font-bold bg-c-primary text-white py-4 px-3 rounded-md shadow-sm'>
              Primer mes gratis
            </span>
          </div>
        )}
        <h2 className='text-xl text-c-title mb-4'>{plan.name}</h2>
        <p className='mt-4 text-6xl font-extrabold text-c-title'>
          {plan.price}
          <span className='text-lg font-medium text-gray-400'>/ Mes</span>
        </p>
        <p className='mt-2 text-sm text-c-title'>{plan.description}</p>
        <ul className='mt-4 space-y-2'>
          {features.map((feature, index) => (
            <li key={index} className='text-c-title flex items-center'>
              <svg
                className='w-4 h-4 mr-2 text-c-title'
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
