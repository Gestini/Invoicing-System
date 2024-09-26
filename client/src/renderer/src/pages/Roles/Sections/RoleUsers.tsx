import React from 'react'
import { BiX } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { RoleModel } from '@renderer/interfaces/role'
import { RootState } from '@renderer/store'
import { UserModel } from '@renderer/interfaces/user'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { useDispatch, useSelector } from 'react-redux'
import { addRoleUser, removeRoleUser } from '@renderer/features/roleSlice'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import { reqSearchEmployeeByName, reqAddRoleUser, reqRemoveRoleUser } from '@renderer/api/requests'

export const RoleUsers = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [result, setResult] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const handleChange = async (e: string) => setSearchValue(e)
  const roles = useSelector((state: RootState) => state.unit.roles)
  const currentRole = roles.data.find((item: RoleModel) => item.id === roles.currentRoleIdEdit)
  const filteredData = result.filter(
    (user: UserModel) => !currentRole?.users.some((item) => item.id == user.id),
  )

  React.useEffect(() => {
    const onSubmmit = async () => {
      if (searchValue.trim() == '') return
      if (searchValue.length < 3) return

      const response = await reqSearchEmployeeByName(params.unitId, searchValue)
      if (response.data.length == 0) return
      setResult(response.data)
    }
    onSubmmit()
  }, [searchValue])

  const handleAddRoleUser = async (user: any) => {
    try {
      dispatch(addRoleUser(user))
      await reqAddRoleUser({
        role: {
          id: currentRole?.id,
        },
        employee: {
          id: user.id,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveRoleUser = async (userId: number) => {
    try {
      await reqRemoveRoleUser(currentRole?.id, userId)
      dispatch(removeRoleUser(userId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Autocomplete
        classNames={{
          listboxWrapper: 'max-h-[320px]',
          selectorButton: 'text-default-500',
          popoverContent: 'bg-[red]',
          listbox: 'bg-[red]',
        }}
        items={filteredData}
        errorMessage='Sin resultados.'
        isClearable={true}
        inputProps={{
          classNames: {
            input: 'w-full',
          },
          variant: 'flat',
          radius: 'sm',
        }}
        onInputChange={handleChange}
        listboxProps={{
          emptyContent: 'Sin resultados',
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              'rounded-medium',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'dark:data-[hover=true]:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[hover=true]:bg-default-200',
              'data-[selectable=true]:focus:bg-default-100',
              'data-[focus-visible=true]:ring-default-500',
            ],
          },
        }}
        aria-label='Selecciona un producto'
        placeholder='Buscar por nombre...'
        popoverProps={{
          offset: 10,
          radius: 'sm',
          classNames: {
            base: 'rounded-large ',
            content: 'p-1 border-small border-default-100 bg-[--c-card] ',
          },
        }}
        startContent={<SearchIcon />}
        variant='bordered'
        className='text-[#71717a]'
      >
        {(item: any) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <div
              className='flex justify-between items-center'
              onClick={() => handleAddRoleUser(item)}
            >
              <div className='flex items-center gap-2'>
                <Avatar size='sm' />
                <h4 className='text-medium text-c-title'>{item.name}</h4>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div className='flex flex-col gap-3'>
        {currentRole?.users
          ?.filter((item: any) =>
            String(item.name).toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map((item, index) => (
            <div className='flex gap-2 justify-between items-center' key={index}>
              <div className='flex items-center gap-2'>
                <Avatar />
                <h4 className='text-medium text-c-title'>{item.username}</h4>
              </div>
              <BiX onClick={() => handleRemoveRoleUser(item.id)} className='cursor-pointer' />
            </div>
          ))}
      </div>
      {currentRole?.users.length === 0 && (
        <p className='text-foreground-400 align-middle text-center'>
          No se han encontrado miembros.
        </p>
      )}
    </div>
  )
}
