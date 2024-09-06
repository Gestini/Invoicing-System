import React from 'react'
import { AuthForm } from '../../../Auth/AuthInputForm'
import { toggleModal } from '@renderer/features/currentModal'
import { loginInputs } from '@renderer/pages/Auth/AuthInputs'
import { useDispatch, useSelector } from 'react-redux'
import { reqAuthLogin, reqSearchUserByUsername } from '@renderer/api/requests'
import {
  Link,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'

export const AddNewAccountModal = ({ errors }) => {
  const currentSessions = localStorage.getItem('sessions')
  const dispatch = useDispatch()
  const modalStates = useSelector((state: any) => state.unit.modals)
  const handleToggleModal = () => dispatch(toggleModal('AddNewAccountModal'))

  const [data, setData] = React.useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const addNewAccount = async () => {
    try {
      const response = await reqAuthLogin(data)
      if (!response) return

      const user: any = await reqSearchUserByUsername(data.username)
      if (!user) return

      if (!currentSessions) return

      const partseSessions = JSON.parse(currentSessions)
      const userFound = partseSessions.find((item: any) => item.userId == user.id)

      if (!userFound) {
        const AuxSessions = [...partseSessions]
        AuxSessions.push({
          userId: user.data[0].id,
          token: response.data,
        })
        localStorage.setItem('sessions', JSON.stringify(AuxSessions))
      }
    } catch (error) {
      console.log(error)
    }
    handleToggleModal()
  }

  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      isOpen={modalStates.modals.AddNewAccountModal}
      onClose={handleToggleModal}
      placement='center'
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>Agregar cuenta</ModalHeader>
          <ModalBody>
            <AuthForm inputs={loginInputs} handleChange={handleChange} errors={errors} />
            <div className='flex py-2 px-1 justify-end'>
              <Link color='primary' href='#' size='sm'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='flat' radius='sm' onPress={handleToggleModal}>
              Cerrar
            </Button>
            <Button
              color='primary'
              className='bg-c-primary'
              radius='sm'
              onPress={() => addNewAccount()}
            >
              Agregar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}
