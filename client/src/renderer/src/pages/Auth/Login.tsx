import React, { useState } from 'react'
import { Or } from '../../components/Auth/Or'
import { AuthBody } from '../../components/Auth/AuthBody'
import { AuthForm } from '../../components/Auth/AuthInputForm'
import { AuthFooter } from '../../components/Auth/AuthFooter'
import { AuthHeader } from '../../components/Auth/AuthHeader'
import { AuthSubmit } from '../../components/Auth/AuthSubmit'
import { loginInputs } from './AuthInputs'
import { reqAuthLogin } from '@renderer/api/requests'
import { AuthLoginOptions } from '@renderer/components/Auth/AuthLoginOptions'
import { ContinueWithGoogle } from '../../components/Auth/ContinueWithGoogle'
import './Auth.scss'
import Loader from '@renderer/components/loader/loader'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para el loader

  const [data, setData] = React.useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = React.useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })

    handleValidation(name, value)
  }

  const handleValidation = (name, value) => {
    let newErrors = { ...errors }

    switch (name) {
      case 'username':
        if (value.trim() === '') {
          newErrors.username = 'Por favor, ingresa tu nombre de usuario.'
        } else {
          newErrors.username = ''
        }
        break
      case 'password':
        if (value.trim() === '') {
          newErrors.password = 'Por favor, ingresa tu contraseña.'
        } else {
          newErrors.password = ''
        }
        break
      default:
        break
    }
    setErrors(newErrors)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (data.username.trim() === '' || data.password.trim() === '') {
      setErrors({
        username: data.username.trim() === '' ? 'Por favor, ingresa tu nombre de usuario.' : '',
        password: data.password.trim() === '' ? 'Por favor, ingresa tu contraseña.' : '',
      })
      return
    }

    setIsLoading(true) // Activar loader

    try {
      const response = await reqAuthLogin(data)
      const token = localStorage.getItem('token')

      if (!token) {
        localStorage.setItem('token', response.data)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false) // Desactivar loader al terminar
    }
  }

  return (
    <>
      {isLoading && <Loader />} {/* Loader cubre toda la pantalla */}
      <AuthBody onClick={(e) => handleLogin(e)}>
        <AuthHeader title='Sign In' description='Enter your email and password to sign in!' />
        <ContinueWithGoogle />
        <Or />
        <AuthForm inputs={loginInputs} handleChange={handleChange} errors={errors} />
        <AuthLoginOptions />
        <AuthSubmit label='Sign In' />
        <AuthFooter href='/#/register' label='Not registered yet?' hrefLabel='Create an Account' />
      </AuthBody>
    </>
  )
}

export default Login
