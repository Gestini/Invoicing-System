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
import { useDispatch } from 'react-redux'
import { toggleModal } from '@renderer/features/currentModal'
import { useNavigate } from 'react-router-dom'
import { reqAuthLogin } from '@renderer/api/requests'

export const LogInAsModal = ({ errors }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalStates = useSelector((state: RootState) => state.unit.modals)
  const userSession = useSelector((state: RootState) => state.user.userSession)

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

  const handleToggleModal = () => dispatch(toggleModal('LogInAsModal'))

  const loginAnExistAccount = async () => {
    const response = await reqAuthLogin({
      username: userSession.selectedUserToChange.user.username,
      password: data.password,
    })
    if (!response) return
    localStorage.setItem('token', response.data)
    navigate('/')
    handleToggleModal()
  }

  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      isOpen={modalStates.modals.LogInAsModal}
      onClose={() => handleToggleModal()}
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
          <Button color='danger' variant='flat' radius='sm' onPress={() => handleToggleModal()}>
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
