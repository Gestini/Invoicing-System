import React from 'react'
import {
  Link,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { AuthForm } from '../../../Auth/AuthInputForm'
import { RootState } from '@renderer/store'
import { loginInputs } from '@renderer/pages/Auth/AuthInputs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reqAuthLogin } from '@renderer/api/requests'
import { useModal, modalTypes } from '@renderer/utils/useModal'

export const LogInAsModal = ({ errors }) => {
  const navigate = useNavigate()
  const userSession = useSelector((state: RootState) => state.user.userSession)
  const [isOpen, toggleModal] = useModal(modalTypes.logInAsModal)

  const [data, setData] = React.useState({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const loginAnExistAccount = async () => {
    const response = await reqAuthLogin({
      username: userSession.selectedUserToChange.user.username,
      password: data.password,
    })
    if (!response) return
    localStorage.setItem('token', response.data)
    navigate('/')
    toggleModal()
  }

  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      isOpen={isOpen}
      onClose={() => toggleModal()}
      placement='center'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          Continuar como {userSession.selectedUserToChange.user.username}
        </ModalHeader>
        <ModalBody>
          <AuthForm inputs={[loginInputs[1]]} handleChange={handleChange} errors={errors} />
          <div className='flex py-2 px-1 justify-end'>
            <Link color='primary' href='#' size='sm'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='flat' radius='sm' onPress={() => toggleModal()}>
            Cerrar
          </Button>
          <Button
            color='primary'
            className='bg-c-primary'
            radius='sm'
            onPress={() => loginAnExistAccount()}
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
