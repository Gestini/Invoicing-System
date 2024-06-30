import React from 'react'
import Logo from '../../assets/electron.svg'
import { Button, Input } from '@nextui-org/react'
import './createCompany.scss'

interface MultiStepFormProps {
  onClose: () => void
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onClose }) => {
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  React.useEffect(() => {
    if (email.trim() !== '') {
      const validation = validateEmail(email)
      setError(!validation)
      if (!validation) return
    }
  }, [email])

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return regex.test(email.trim())
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSend = () => {
    const validation = validateEmail(email)
    setError(!validation)
    if (!validation) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div
      className='z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='animate-zoom-in-out w-full max-w-3xl py-8 px-48 bg-white rounded shadow-lg relative overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center mb-6'>
          <div className='flex justify-center items-center'>
            <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
          </div>
          <h1
            className='text-3xl font-bold mb-2'
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '27px' }}
          >
            You're only 2 steps away from starting your gantt chart
          </h1>
          <h2 className='text-lg font-medium mb-4' style={{ fontFamily: 'Roboto, sans-serif' }}>
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
            className={`w-8 h-3 mx-1 rounded ${step === 1 ? 'bg-[var(--c-primary)]' : 'bg-gray-100'}`}
          ></div>
        </div>
        {step === 1 && (
          <div className=''>
            <Input
              type='email'
              variant='bordered'
              label='Email'
              value={email}
              radius='sm'
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={error}
              placeholder='Enter your email'
              errorMessage='Please enter a valid email'
              className='mb-4'
            />
            <Button
              color='secondary'
              className='w-full'
              isLoading={loading}
              onClick={() => handleSend()}
            >
              {loading ? 'Cargando...' : 'Crear'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiStepForm
