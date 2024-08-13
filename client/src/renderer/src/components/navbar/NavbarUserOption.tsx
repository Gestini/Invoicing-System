import { useSelector } from 'react-redux'
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'
import { IoIosAddCircle } from 'react-icons/io'

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
              <p className='text-white text-[14px] '>{user?.username}</p>
              <p className='px-[4px] py-[2px] mt-1 bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[12px]'>
                CEO
              </p>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className=' '>
            <div className='infouserhere flex flex-col items-center gap-4 '>
              josesoriap21@gmail.com{' '}
              <Avatar
                as='button'
                classNames={{
                  icon: 'text-[#ffffff]',
                  base: 'bg-[--c-primary-variant-1]',
                }}
                className='h-[100px] w-[100px]'
              />
              <span className=' text-[20px] '>¡Hola, José!</span>
              <div className='settingsprofile w-[200px] h-[30px] rounded-full justify-center flex items-center border-1 '>
                Settings
              </div>
            </div>
          </DropdownItem>
          <DropdownItem
            key='profile'
            className='
           '
          >
            <div className='itemprofile flex items-center gap-4'>
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
                  <span>Nicolas esteban</span>
                  <span className=' text-[10px] '>Nicoluna@gmail.com</span>
                </div>

                <div className='px-[4px] py-[1px]   bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[12px]'>
                  CEO
                </div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key='profile' className='flex '>
            <div className='itemprofile flex items-center gap-4'>
              <Avatar
                as='button'
                classNames={{
                  icon: 'text-[#ffffff]',
                  base: 'bg-[--c-primary-variant-1]',
                }}
                className='h-[30px] w-[30px]'
              />
              <div className='infouserloged flex-grow flex justify-between items-center gap-2'>
                <div className='infouserloggedspan flex flex-col  '>
                  <span>Victor</span>
                  <span className=' text-[10px] '>Victor@gmail.com</span>
                </div>

                <div className='px-[4px] py-[1px]   bg-[rgb(160,219,142)]/20 rounded-md text-[#A0DB8E] text-[12px]'>
                  CEO
                </div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key='profile' className='flex '>
            <div className='itemprofile flex items-center gap-4'>
              <IoIosAddCircle className=' text-[30px] ' />
              <div className='infouserloged flex-grow flex justify-between items-center gap-2'>
                <div className='infouserloggedspan flex flex-col  '>
                  <span>Agregar otra cuenta</span>
                </div>
              </div>
            </div>
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
