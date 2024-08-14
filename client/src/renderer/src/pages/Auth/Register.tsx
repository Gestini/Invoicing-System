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
import { validatePassword } from '@renderer/utils/validatePassword'
import './Auth.scss'

const Register = () => {
  const navigate = useNavigate()

  const [data, setData] = React.useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })

  const [errors, setErrors] = React.useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
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
      case 'email':
        if (!validateEmail(value)) {
          newErrors.email = 'Por favor, ingresa un correo electrónico válido.'
        } else {
          newErrors.email = ''
        }
        break
      case 'username':
        if (!validateUsername(value)) {
          newErrors.username =
            'El username solo puede contener letras, números y guiones bajos (_).'
        } else {
          newErrors.username = ''
        }
        break
      case 'password':
        const passwordError = validatePassword(value)
        if (passwordError) {
          newErrors.password = passwordError
        } else {
          newErrors.password = ''
        }
        break
      case 'repeatPassword':
        if (value !== data.password) {
          newErrors.repeatPassword =
            'Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.'
        } else {
          newErrors.repeatPassword = ''
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    let valid = true
    const newErrors = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    }

    if (!validateEmail(data.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.'
      valid = false
    }

    if (!validateUsername(data.username)) {
      newErrors.username = 'El username solo puede contener letras, números y guiones bajos (_).'
      valid = false
    }

    const passwordError = validatePassword(data.password)
    if (passwordError) {
      newErrors.password = passwordError
      valid = false
    }

    if (data.password !== data.repeatPassword) {
      newErrors.repeatPassword =
        'Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.'
      valid = false
    }

    setErrors(newErrors)

    if (!valid) {
      return
    }

    try {
      await reqAuthRegister(data)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/
    if (username.length < 3 || username.length > 20) {
      return false
    }
    if (!regex.test(username)) {
      return false
    }
    return true
  }

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
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
    <AuthBody onClick={(e) => handleRegister(e)}>
      <AuthHeader title='Register' description='Register a new account' />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
      <AuthSubmit label='Register' />
      <AuthFooter href='/#/login' label='You registered yet?' hrefLabel='Click here' />
    </AuthBody>
  )
}

export default Register
