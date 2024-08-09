import { useSelector } from 'react-redux'
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'

export const NavbarUserOptions = () => {
  const user = useSelector((state: any) => state.user)
  const token = localStorage.getItem('token')

  const logOut = () => {
    if (token) {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }

  if (user) {
    return (
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
              <p className='text-white text-[14px] '>
                {user?.username}
              </p>
              <p className='px-[4px] py-[2px] mt-1 bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[12px]'>CEO</p>
            </div>

          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className=' gap-2 text-c-title'>
            Perfil
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
            onClick={() => logOut()}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
