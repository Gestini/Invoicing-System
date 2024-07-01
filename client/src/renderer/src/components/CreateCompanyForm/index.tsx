import React from 'react'
import Logo from '../../assets/electron.svg'
import { Button, Input } from '@nextui-org/react'
import './createCompany.scss'
import { reqCreateUnit } from '@renderer/api/requests'

interface MultiStepFormProps {
  onClose: () => void
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onClose }) => {
  const [step, setStep] = React.useState(1)
  const [data, setData] = React.useState<any>({
    name: '',
    description: '',
    link: '',
  })
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    console.log(data)
  }

  const handleSubmit = () => {
    reqCreateUnit(data)
  }

  return (
    <div
      className='z-20 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm'
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className='animate-zoom-in-out w-full max-w-3xl py-8 px-48 bg-c-card rounded shadow-lg relative overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center mb-6'>
          <div className='flex justify-center items-center'>
            <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
          </div>
          <h1
            className='text-3xl font-bold mb-2 text-c-title'
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '27px' }}
          >
            You're only 2 steps away from starting your gantt chart
          </h1>
          <h2
            className='text-lg font-medium mb-4 text-c-gray'
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Create your FREE account and get immediate access to the app
          </h2>
          <p
            className='mb-4 text-sm font-medium text-gray-600'
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Step {step} of 1
          </p>
        </div>
        <div className='flex justify-center mb-6'>
          <div
            onClick={prevStep}
            className={`w-8 h-3 mx-1 rounded ${step === 1 ? 'bg-c-primary' : 'bg-gray-100'}`}
          ></div>
        </div>
        {step === 1 && (
          <div className=''>
            <Input
              type='text'
              variant='bordered'
              label='Nombre'
              name='name'
              value={data.name}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Nombre de la empresa'
              className='mb-4'
            />
            <Input
              type='text'
              variant='bordered'
              label='Descripcion'
              name='description'
              value={data.description}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Descripcion de la empresa'
              className='mb-4'
            />
            <Input
              type='text'
              variant='bordered'
              label='Link'
              name='link'
              value={data.link}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Url de la empresa'
              className='mb-4'
            />
            <Button
              color='secondary'
              className='bg-c-primary'
              isLoading={loading}
              type='submit'

              // onClick={() => handleSend()}
            >
              {loading ? 'Cargando...' : 'Crear'}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default MultiStepForm
