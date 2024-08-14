import React from 'react'
import { Or } from '../../components/Auth/Or'
import { AuthBody } from '../../components/Auth/AuthBody'
import { AuthForm } from '../../components/Auth/AuthInputForm'
import { AuthFooter } from '../../components/Auth/AuthFooter'
import { AuthHeader } from '../../components/Auth/AuthHeader'
import { AuthSubmit } from '../../components/Auth/AuthSubmit'
import { reqAuthLogin } from '@renderer/api/requests'
import { AuthLoginOptions } from '@renderer/components/Auth/AuthLoginOptions'
import { ContinueWithGoogle } from '../../components/Auth/ContinueWithGoogle'
import './Auth.scss'

const Login = () => {
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
    let valid = true

    const newErrors = {
      username: '',
      password: '',
    }

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

  const inputs = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter your username',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ]

  return (
    <AuthBody onClick={(e) => handleLogin(e)}>
      <AuthHeader title='Sign In' description='Enter your email and password to sign in!' />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
      <AuthLoginOptions />
      <AuthSubmit label='Sign In' />
      <AuthFooter href='/#/register' label='Not registered yet?' hrefLabel='Create an Account' />
    </AuthBody>
  )
}

export default Login
