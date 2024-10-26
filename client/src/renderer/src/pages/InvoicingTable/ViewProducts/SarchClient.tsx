import React from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'

export const SearchClient = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [result, setResult] = React.useState([])

  const handleChange = (e: string) => setSearchValue(e)

  return (
    <Autocomplete
      classNames={{
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
        popoverContent: 'bg-[red]',
        listbox: 'bg-[red]',
      }}
      items={result}
      errorMessage='Crear cliente.'
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
        emptyContent: 'Crear cliente',
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
      aria-label='Selecciona un cliente'
      placeholder='Buscar por nombre de cliente...'
      popoverProps={{
        offset: 10,
        radius: 'sm',
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-[--c-card]',
        },
      }}
      startContent={<SearchIcon />}
      variant='bordered'
      className='text-[#71717a]'
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col'>
                <span className='text-small'>{item.name}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
