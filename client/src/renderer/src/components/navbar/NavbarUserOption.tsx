import MainColor from '../Theme/MainColor'
import { useSelector } from 'react-redux'
import { ChangeTheme } from '../Theme'
import { ShortCellValue } from '../AppTable/TableComponents/ShortCellValue'
import { BiCog, BiUser, BiDoorOpen } from 'react-icons/bi'
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'

export const NavbarUserOptions = () => {
  const user = useSelector((state: any) => state.user)
  const token = localStorage.getItem('token')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const logOut = () => {
    if (token) {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }

  const iconClasses = 'text-[20px]'

  if (user) {
    return (
      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior={'inside'}
          backdrop='blur'
          size='sm'
        >
          <ModalContent>
            <ModalHeader className='flex flex-col gap-1'>
              <h3 className='default-text-color'>Ajustes</h3>
            </ModalHeader>
            <ModalBody>
              <ChangeTheme />
              <MainColor />
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
        <Dropdown className='text-c-title bg-c-card'>
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
            <DropdownItem key='profile' startContent={<BiUser className={iconClasses} />}>
              Perfil
            </DropdownItem>
            <DropdownItem
              key='tema'
              onClick={() => onOpen()}
              startContent={<BiCog className={iconClasses} />}
            >
              Ajustes
            </DropdownItem>
            <DropdownItem
              key='logout'
              className='text-danger'
              color='danger'
              onClick={() => logOut()}
              startContent={<BiDoorOpen className={iconClasses} />}
            >
              Cerrar sesión
            </DropdownItem>
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
