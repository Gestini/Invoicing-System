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

  const handleBlur = (e) => {
    const { name, value } = e.target
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

  const validatePassword = (password) => {
    // Verificar longitud de la contraseña
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres.'
    }
    if (password.length > 20) {
      return 'La contraseña no puede tener más de 20 caracteres.'
    }

    // Verificar patrón de caracteres
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/
    if (!regex.test(password)) {
      return 'La contraseña debe incluir una mayúscula, un número y un carácter especial.'
    }

    return ''
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
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: 'Repeat password',
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Repeat your password',
      onBlur: handleBlur,
      onChange: handleChange,
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
