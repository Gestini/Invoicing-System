import React from 'react'
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

const RecoverPasswordChange = () => {
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
    const newErrors = {
      username: '',
      password: '',
    }
    let valid = true

    if (data.username.trim() === '') {
      newErrors.username = 'Por favor, ingresa tu nombre de usuario.'
      valid = false
    }

    if (data.password.trim() === '') {
      newErrors.password = 'Por favor, ingresa tu contraseña.'
      valid = false
    }

    setErrors(newErrors)

    if (!valid) return

    try {
      const token = localStorage.getItem('token')
      const response = await reqAuthLogin(data)

      if (!token) {
        localStorage.setItem('token', response.data)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthBody onClick={(e: any) => handleLogin(e)}>
      <AuthHeader title='Change password' description='Change your password' />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={loginInputs} handleChange={handleChange} errors={errors} />
      <AuthLoginOptions />
      <AuthSubmit label='Sign In' />
      <AuthFooter href='/#/register' label='Not registered yet?' hrefLabel='Create an Account' />
    </AuthBody>
  )
}

export default RecoverPasswordChange
