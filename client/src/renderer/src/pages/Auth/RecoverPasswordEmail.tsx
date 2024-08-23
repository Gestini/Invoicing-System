import React from 'react'
import { AuthBody } from '../../components/Auth/AuthBody'
import { AuthForm } from '../../components/Auth/AuthInputForm'
import { AuthSubmit } from '../../components/Auth/AuthSubmit'
import { AuthHeader } from '../../components/Auth/AuthHeader'
import { validateEmail } from '@renderer/utils/validateEmail'
import { reqAuthSendToken } from '@renderer/api/requests'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.scss'

const RecoverPasswordEmail = () => {
  const [email, setEmail] = React.useState('')
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [waitTime, setWaitTime] = React.useState(0)
  const navigate = useNavigate()

  React.useEffect(() => {
    const lastRequestTime = localStorage.getItem('lastRequestTime')
    const isSubmittingStored = localStorage.getItem('isSubmitting')

    if (!lastRequestTime) return

    const timePassed = Date.now() - parseInt(lastRequestTime, 10)
    const wait = getWaitTime(timePassed)
    setWaitTime(wait)

    if (wait < 0) return

    if (isSubmittingStored === 'true') {
      setIsSubmitting(true)
    }

    const timer = setInterval(() => {
      setWaitTime((prevWaitTime) => {
        if (prevWaitTime <= 1000) {
          clearInterval(timer)
          return 0
        }
        return prevWaitTime - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getWaitTime = (timePassed) => {
    if (timePassed < 60000) {
      return Math.ceil((60000 - timePassed) / 1000) * 1000
    } else if (timePassed < 300000) {
      return Math.ceil((300000 - timePassed) / 1000) * 1000
    } else if (timePassed < 3600000) {
      return Math.ceil((3600000 - timePassed) / 1000) * 1000
    }
    return 0
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmail(value)
    handleValidation(name, value)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    handleValidation(name, value)
  }

  const handleValidation = (name, value) => {
    let newErrors = { ...errors }
    const validationResponse = validateEmail(value)
    if (validationResponse !== true) {
      newErrors[name] = validationResponse
    } else {
      delete newErrors[name]
    }
    setErrors(newErrors)
  }

  const handleSendToken = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0 && email.length > 0) {
      if (waitTime > 0) {
        setErrors({
          email: `Por favor, espera ${formatTime(waitTime / 1000)} antes de intentar nuevamente.`,
        })
        return
      }

      setIsSubmitting(true)
      localStorage.setItem('isSubmitting', 'true')
      try {
        await reqAuthSendToken({ email })
        localStorage.setItem('lastRequestTime', Date.now().toString())
        setWaitTime((waitTime) => (waitTime === 0 ? 60000 : waitTime + 240000)) // 1 minuto inicial, luego 5 minutos y finalmente cada hora
        navigate('/recovery-password/code')
      } catch (error) {
        console.log(error)
        setErrors({ email: 'Error enviando el email. Inténtalo nuevamente.' })
      } finally {
        setIsSubmitting(false)
        localStorage.removeItem('isSubmitting')
      }
    }
  }

  const inputs = [
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'Ingresa tu email',
      onBlur: handleBlur,
      onChange: handleChange,
      value: email,
    },
  ]

  return (
    <AuthBody onClick={handleSendToken}>
      <AuthHeader
        title='Ingresa tu email'
        description='Ingresa tu email para restablecer tu contraseña.'
      />
      <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
      <AuthSubmit
        label={waitTime > 0 ? formatTime(waitTime / 1000) : 'Enviar email'}
        waitTime={waitTime}
        disabled={isSubmitting || waitTime > 0}
      />

      <p className='text-sm text-gray-400'>Si estás registrado, recibirás un correo electrónico.</p>
      <div className='flex justify-between'>
        <Link to='/login' className=' underline flex mt-4 text-blue-500'>
          Inicia sesión
        </Link>
        <Link to='/recovery-password/code' className=' underline flex mt-4 text-blue-500'>
          ¿Ya recibiste el token?
        </Link>
      </div>
    </AuthBody>
  )
}

export default RecoverPasswordEmail
