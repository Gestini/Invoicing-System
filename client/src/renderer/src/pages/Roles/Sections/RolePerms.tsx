import React from 'react'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { Input, Switch } from '@nextui-org/react'
import { Role, Permission } from '@renderer/features/roleSlice'
import { permissions, permsMap } from '../Permissions'
import { useDispatch, useSelector } from 'react-redux'
import { removePermission, addPermissions } from '@renderer/features/roleSlice'
import { reqAddPermissionRole, reqRemovePermissionRole } from '@renderer/api/requests'

export const RolePerms = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleSearch = (e: any) => setSearchTerm(e.target.value)

  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)

  const changePermissions = async (
    hasPermissions: boolean,
    permissionId: number,
    permission: string,
  ) => {
    try {
      if (!hasPermissions && !permissionId) {
        const res = await reqAddPermissionRole({
          role: { id: currentRole.id },
          name: permission,
        })
        dispatch(addPermissions(res.data))
      } else {
        dispatch(removePermission(permissionId))
        await reqRemovePermissionRole(currentRole.id, permissionId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Input
        isClearable
        onChange={handleSearch}
        className='text-c-gray'
        placeholder='Buscar por nombre...'
        startContent={<SearchIcon />}
      />
      <div className='flex items-center flex-col gap-4'>
        {permissions
          .filter((item: permsMap) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item, index) => {
            const hasPermissions = currentRole?.permissions?.some(
              (perm: Permission) => perm.name === item.permission,
            )
            const permission = currentRole?.permissions?.find(
              (perm: Permission) => perm.name === item.permission,
            )
            return (
              <div key={index} className='flex items-center gap-4 justify-between w-full'>
                <div className='flex flex-col gap-1'>
                  <p className='text-medium text-default-700'>{item.title}</p>
                  <p className='text-small text-default-500'>{item.description}</p>
                </div>
                <Switch
                  isSelected={hasPermissions}
                  classNames={{
                    wrapper: 'group-data-[selected=true]:bg-[var(--c-primary)]',
                  }}
                  onChange={() =>
                    changePermissions(hasPermissions, permission?.id, item.permission)
                  }
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
