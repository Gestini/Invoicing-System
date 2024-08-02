import React from 'react'
import { BiX } from 'react-icons/bi'
import { Role } from '@renderer/features/roleSlice'
import { Avatar } from '@nextui-org/react'
import { removeRoleUser } from '@renderer/features/roleSlice'
import { reqRemoveRoleUser } from '@renderer/api/requests'
import { SearchUserByUsername } from '../Components/SearchUserByUsername'
import { useSelector, useDispatch } from 'react-redux'

export const RoleUsers = () => {
  const dispatch = useDispatch()
  const [searchTerm, _] = React.useState('')
  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)

  const handleRemoveUser = async (userId: number) => {
    try {
      await reqRemoveRoleUser(currentRole.id, userId)
      dispatch(removeRoleUser(userId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <SearchUserByUsername />
      <div className='flex flex-col gap-3'>
        {currentRole?.users
          ?.filter((item: any) => item.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item, index) => (
            <div className='flex gap-2 justify-between items-center' key={index}>
              <div className='flex items-center gap-2'>
                <Avatar />
                <h4 className='text-medium text-c-title'>{item.username}</h4>
              </div>
              <BiX onClick={() => handleRemoveUser(item.id)} className='cursor-pointer' />
            </div>
          ))}
      </div>
      {!currentRole?.users && (
        <p className='text-foreground-400 align-middle text-center'>
          No se han encontrado miembros.
        </p>
      )}
    </div>
  )
}
