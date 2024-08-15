import React from 'react'
import MainColor from '../Theme/MainColor'
import { BiCheck } from 'react-icons/bi'
import { BiDoorOpen } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { ChangeTheme } from '../Theme'
import { IoIosAddCircle } from 'react-icons/io'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { reqSearchUserByUsername } from '@renderer/api/requests'
import { reqAuthLogin, reqLoadUserSessions } from '@renderer/api/requests'
import {
  Link,
  Modal,
  Avatar,
  Button,
  Dropdown,
  ModalBody,
  ModalFooter,
  ModalHeader,
  DropdownItem,
  ModalContent,
  DropdownMenu,
  useDisclosure,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { AuthForm } from '../Auth/AuthInputForm'

export const NavbarUserOptions = () => {
  const user = useSelector((state: any) => state.user)
  const token = localStorage.getItem('token')
  const { onOpenChange } = useDisclosure()
  const [sessions, setSessions] = React.useState<any>([])
  const currentSessions = localStorage.getItem('sessions')

  React.useEffect(() => {
    if (!currentSessions) return

    const parseSessions = JSON.parse(currentSessions)
    const loadUsersSession = async () => {
      if (!parseSessions) return

      const response = await reqLoadUserSessions(parseSessions.map((item: any) => item.token))

      setSessions(response.data)
    }
    loadUsersSession()
  }, [currentSessions])

  const [modalStates, setModalStates] = React.useState({
    isLoginModalOpen: false,
    isSettingsModalOpen: false,
    isLoginWithOpen: false,
  })

  const toggleModal = (modalName) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }))
  }

  const logOut = () => {
    if (!currentSessions) return
    if (!token) return

    const partseSessions = JSON.parse(currentSessions)

    const userFound = partseSessions.find((item: any) => item.token == token)

    if (!userFound) return

    const AuxSessions = [...partseSessions]
    const index = AuxSessions.indexOf(userFound)

    if (index !== -1) {
      AuxSessions.splice(index, 1)
    }

    localStorage.setItem('sessions', JSON.stringify(AuxSessions))
    localStorage.removeItem('token')
    window.location.reload()
  }

  const [currentChanged, setCurrentChanged] = React.useState({
    user: {
      username: '',
    },
  })

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
    toggleModal('isLoginModalOpen')
  }

  const changeAccount = (id: number) => {
    if (id == user.id) return
    if (!currentSessions) return

    const partseSessions = JSON.parse(currentSessions)
    const userFound = partseSessions.find((item: any) => item.userId == id)

    const userAccount = sessions.find((item: any) => item.user.id == id)
    if (!userAccount) return

    if (!userAccount.tokenValid) {
      setCurrentChanged(userAccount)
      return toggleModal('isLoginWithOpen')
    }

    localStorage.setItem('token', userFound.token)
    window.location.reload()
  }

  const loginAnExistAccount = async () => {
    const response = await reqAuthLogin({
      username: currentChanged.user.username,
      password: data.password,
    })
    if (!response) return
    localStorage.setItem('token', response.data)
    window.location.reload()
    toggleModal('isLoginWithOpen')
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

  const [errors, _] = React.useState({
    username: '',
    password: '',
  })

  if (user) {
    return (
      <>
        <Modal
          onOpenChange={onOpenChange}
          placement='top-center'
          scrollBehavior={'inside'}
          backdrop='blur'
          isOpen={modalStates.isLoginWithOpen}
          onClose={() => toggleModal('isLoginWithOpen')}
        >
          <ModalContent>
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Continuar como {currentChanged?.user?.username}
              </ModalHeader>
              <ModalBody>
                <AuthForm inputs={[inputs[1]]} handleChange={handleChange} errors={errors} />
                <div className='flex py-2 px-1 justify-end'>
                  <Link color='primary' href='#' size='sm'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='flat'
                  radius='sm'
                  onPress={() => toggleModal('isLoginWithOpen')}
                >
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
            </>
          </ModalContent>
        </Modal>
        <Modal
          onOpenChange={onOpenChange}
          placement='top-center'
          scrollBehavior={'inside'}
          backdrop='blur'
          isOpen={modalStates.isLoginModalOpen}
          onClose={() => toggleModal('isLoginModalOpen')}
        >
          <ModalContent>
            <>
              <ModalHeader className='flex flex-col gap-1'>Agregar cuenta</ModalHeader>
              <ModalBody>
                <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
                <div className='flex py-2 px-1 justify-end'>
                  <Link color='primary' href='#' size='sm'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='flat'
                  radius='sm'
                  onPress={() => toggleModal('isLoginModalOpen')}
                >
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
        <Modal
          onOpenChange={onOpenChange}
          scrollBehavior={'inside'}
          backdrop='blur'
          size='sm'
          isOpen={modalStates.isSettingsModalOpen}
          onClose={() => toggleModal('isSettingsModalOpen')}
        >
          <ModalContent>
            <ModalHeader className='flex flex-col gap-1'>
              <h3 className='default-text-color' onClick={() => toggleModal('isSettingsModalOpen')}>
                Ajustes
              </h3>
            </ModalHeader>
            <ModalBody>
              <ChangeTheme />
              <MainColor />
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
        <Dropdown className='text-c-title w-[400px]  bg-c-card'>
          <DropdownTrigger>
            <div className='flex'>
              <Avatar
                as='button'
                classNames={{
                  icon: 'text-[#ffffff]',
                  base: 'bg-[--c-primary-variant-1]',
                }}
                className='h-[50px] w-[50px]'
              />
              <div className='ml-[10px]'>
                <p className='text-c-title text-[14px] font-semibold'>
                  <ShortCellValue cellValue={user?.username} maxLength={12} />
                </p>
                <p className='px-[4px] py-[2px] mt-1 bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[12px]'>
                  CEO
                </p>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownSection className='flex flex-col items-center content-center'>
              <DropdownItem key='profile' isReadOnly>
                <div className='infouserhere flex flex-col items-center gap-4 '>
                  {user.email}
                  <Avatar
                    as='button'
                    classNames={{
                      icon: 'text-[#ffffff]',
                      base: 'bg-[--c-primary-variant-1]',
                    }}
                    className='h-[100px] w-[100px]'
                  />
                  <span className='text-[20px]'>¡Hola, {user.username}!</span>
                </div>
              </DropdownItem>
              <DropdownItem
                key='profile22'
                className='flex'
                onClick={() => toggleModal('isSettingsModalOpen')}
                classNames={{
                  base: 'mt-2 text-center p-2 w-[200px] h-[30px] rounded-full justify-center flex border-1',
                }}
              >
                Ajustes
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              {sessions?.map((item, index) => (
                <DropdownItem key={index} onPress={() => changeAccount(item.user.id)}>
                  <div className='itemprofile flex items-center gap-2'>
                    <Avatar
                      as='button'
                      classNames={{
                        icon: 'text-[#ffffff]',
                        base: 'bg-[--c-primary-variant-1]',
                      }}
                      className='h-[30px] w-[30px]'
                    />
                    <div className='infouserloged flex flex-grow justify-between items-center gap-2'>
                      <div className='infouserloggedspan flex flex-col  '>
                        <span>{item.user.username}</span>
                        <span className='text-[10px]'>{item.user.email}</span>
                      </div>
                      {user.id == item.user.id && (
                        <span className='px-[4px] py-[2px] bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[18px]'>
                          <BiCheck />
                        </span>
                      )}
                      {!item.tokenValid && (
                        <span className='px-[4px] py-[2px] bg-[rgb(219,142,142)]/20 rounded-md text-[rgb(219,142,142)] text-[13px]'>
                          Sesión cerrada
                        </span>
                      )}
                    </div>
                  </div>
                </DropdownItem>
              ))}
              <DropdownItem
                key='profile'
                className='flex'
                onClick={() => toggleModal('isLoginModalOpen')}
              >
                <div className='itemprofile flex items-center gap-2'>
                  <IoIosAddCircle className='text-[30px]' />
                  <div className='infouserloged flex-grow flex justify-between items-center gap-2'>
                    <div className='infouserloggedspan flex flex-col  '>
                      <span>Agregar otra cuenta</span>
                    </div>
                  </div>
                </div>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key='logout'
                className='text-danger'
                color='danger'
                onClick={() => logOut()}
                startContent={<BiDoorOpen className='text-[30px]' />}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </>
    )
  } else {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar isBordered as='button' color='secondary' size='sm' />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='logout' color='secondary'>
            Log in
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
