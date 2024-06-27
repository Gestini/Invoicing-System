import React from 'react'
import { Or } from '../../components/Auth/Or'
import { AuthBody } from '../../components/Auth/AuthBody'
import { AuthForm } from '../../components/Auth/AuthInputForm'
import { AuthFooter } from '../../components/Auth/AuthFooter'
import { AuthHeader } from '../../components/Auth/AuthHeader'
import { AuthSubmit } from '../../components/Auth/AuthSubmit'
import { useNavigate } from 'react-router-dom'
import { reqAuthRegister } from '@renderer/api/requests'
import { ContinueWithGoogle } from '../../components/Auth/ContinueWithGoogle'
import './Auth.scss'

const Register = () => {
  const navigate = useNavigate()

  const [data, setData] = React.useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async () => {
    try {
      await reqAuthRegister(data)
      navigate('/login')
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
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
    {
      label: 'Repeat password',
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Repeat your password',
    },
  ]

  return (
    <AuthBody>
      <AuthHeader title='Register' description='Register a new account' />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} />
      <AuthSubmit label='Register' onClick={() => handleRegister()} />
      <AuthFooter href='/#/login' label='You registered yet?' hrefLabel='Click here' />
    </AuthBody>
  )
}

export default Register
