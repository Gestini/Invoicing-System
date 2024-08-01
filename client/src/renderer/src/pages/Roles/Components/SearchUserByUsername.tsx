import React from 'react'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { reqAddRoleUser } from '@renderer/api/requests'
import { addRoleUser, Role } from '@renderer/features/roleSlice'
import { reqSearchUserByUsername } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'

export const SearchUserByUsername = () => {
  const dispatch = useDispatch()
  const [result, setResult] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const handleChange = async (e: any) => setSearchValue(e)
  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)

  React.useEffect(() => {
    const onSubmmit = async () => {
      if (searchValue.trim() == '') return
      if (searchValue.length < 3) return

      const response = await reqSearchUserByUsername(searchValue)
      if (response.data.length == 0) return
      setResult(response.data)
    }
    onSubmmit()
  }, [searchValue])

  const handleAddRoleUser = async (user: any) => {
    try {
      dispatch(addRoleUser(user))
      const userRes = await reqAddRoleUser({
        role: {
          id: currentRole.id,
        },
        user: {
          id: user.id,
        },
      })
      console.log(userRes.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Autocomplete
      classNames={{
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
        popoverContent: 'bg-[red]',
        listbox: 'bg-[red]',
      }}
      items={result}
      errorMessage='Sin resultados.'
      isClearable={true}
      inputProps={{
        classNames: {
          input: 'w-full',
        },
        variant: 'flat',
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
              <h4 className='text-medium text-c-title'>{item.username}</h4>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
