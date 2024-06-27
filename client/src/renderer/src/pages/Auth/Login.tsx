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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await reqAuthLogin(data)

      if (!token) {
        localStorage.setItem('token', response.data)
        window.location.reload()
      }
    } catch (error: any) {
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
    <AuthBody>
      <AuthHeader title='Sign In' description='Enter your email and password to sign in!' />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} />
      <AuthLoginOptions />
      <AuthSubmit label='Sign In' onClick={() => handleLogin()} />
      <AuthFooter href='/#/register' label='Not registered yet?' hrefLabel='Create an Account' />
    </AuthBody>
  )
}

export default Login
