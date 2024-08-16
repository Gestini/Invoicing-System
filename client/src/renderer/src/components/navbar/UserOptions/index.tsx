import { useSelector } from 'react-redux'
import { UserOptionModals } from './Modals'
import { UserAvatarDropdown } from './UserAvatarDropdown'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

export const NavbarUserOptions = () => {
  const user = useSelector((state: any) => state.user)

  if (!user) {
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

  return (
    <>
      <UserOptionModals />
      <UserAvatarDropdown />
    </>
  )
}
