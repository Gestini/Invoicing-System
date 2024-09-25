import React from 'react'
import { useSelector } from 'react-redux'
import { ShortCellValue } from '../../../AppTable/TableComponents/ShortCellValue'
import { IoIosAddCircle } from 'react-icons/io'
import { reqLoadUserSessions } from '@renderer/api/requests'
import { BiCheck, BiDoorOpen } from 'react-icons/bi'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { toggleModal } from '@renderer/features/currentModal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedUserToChange } from '@renderer/features/userSessions'

export const UserAvatarDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = useSelector((state: RootState) => state.user.user)
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
  }, [])

  const handleToggleModal = (modalName: string) => dispatch(toggleModal(modalName))

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
    dispatch({ type: 'RESET_STATE' })
    navigate('/login')
  }

  const changeAccount = (id: number) => {
    if (id == user?.id) return
    if (!currentSessions) return

    const partseSessions = JSON.parse(currentSessions)
    const userFound = partseSessions.find((item: any) => item.userId == id)

    const userAccount = sessions.find((item: any) => item.user.id == id)
    if (!userAccount) return

    if (!userAccount.tokenValid) {
      dispatch(setSelectedUserToChange(userAccount))
      return handleToggleModal('LogInAsModal')
    }

    navigate('/')

    // Despacha la acción para resetear el estado
    dispatch({ type: 'RESET_STATE' })
    return localStorage.setItem('token', userFound.token)
  }

  return (
    <Dropdown className='text-c-title w-[400px] bg-c-card'>
      <DropdownTrigger>
        <div className='flex items-center cursor-pointer transition-transform'>
          <Avatar
            as='button'
            classNames={{
              icon: 'text-[#ffffff]',
              base: 'bg-[--c-primary]',
            }}
            className='h-[50px] w-[50px]'
          />
          <div className='ml-[10px] hidden md:flex flex-col'>
            <p className='text-c-title text-[14px] font-semibold'>
              <ShortCellValue cellValue={user?.username || ''} maxLength={12} />
            </p>
            <p className='w-fit px-[10px] py-[2px] mt-1 bg-c-primary-variant-3 rounded-md text-c-primary text-[12px]'>
              {user?.jobposition || 'Sin asignar'}
            </p>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownSection className='flex flex-col items-center content-center'>
          <DropdownItem key='profile' isReadOnly>
            <div className='infouserhere flex flex-col items-center gap-4 '>
              {user?.email}
              <Avatar
                as='button'
                classNames={{
                  icon: 'text-[#ffffff]',
                  base: 'bg-[--c-primary]',
                }}
                className='h-[100px] w-[100px]'
              />
              <span className='text-[20px]'>¡Hola, {user?.username}!</span>
            </div>
          </DropdownItem>
          <DropdownItem
            key='settings'
            onClick={() => navigate('/account/edit')}
            className='mt-4 text-center rounded-3xl justify-center border-1 block border-gray-300 hover:border-gray-500 duration-300'
          >
            Ajustes
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          {sessions?.map((item, _) => (
            <DropdownItem key={item.user.username} onPress={() => changeAccount(item.user.id)}>
              <div className='itemprofile flex items-center gap-2'>
                <Avatar
                  as='button'
                  classNames={{
                    icon: 'text-[#ffffff]',
                    base: 'bg-[--c-primary]',
                  }}
                  className='h-[30px] w-[30px]'
                />
                <div className='infouserloged flex flex-grow justify-between items-center gap-2'>
                  <div className='infouserloggedspan flex flex-col  '>
                    <span>{item.user.username}</span>
                    <span className='text-[10px]'>{item.user.email}</span>
                  </div>
                  {user?.id == item.user.id && (
                    <span className='px-[4px] py-[2px] bg-[rgb(160,219,142)]/20 rounded-md text-[rgb(160,219,142)] text-[18px]'>
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
            key='addAccount'
            className='flex'
            onClick={() => handleToggleModal('AddNewAccountModal')}
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
  )
}
