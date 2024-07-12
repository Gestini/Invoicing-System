import React from 'react'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { addProduct } from '@renderer/features/newInvoicing'
import { useDispatch, useSelector } from 'react-redux'
import { reqSearchProductByNameAndUnit } from '@renderer/api/requests'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

export const SearchProduct = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: any) => state.currentUnit)
  const newInvoicing = useSelector((state: any) => state.newInvoicing)
  const [result, setResult] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)
  const filteredData = result.filter(
    (product: any) => !currentTab?.products.some((item: any) => item.id == product.id),
  )

  const handleChange = async (e: any) => setSearchValue(e)

  React.useEffect(() => {
    const onSubmmit = async () => {
      if (searchValue.trim() == '') return
      if (searchValue.length < 3) return

      const response = await reqSearchProductByNameAndUnit(searchValue, unit.id)
      if (response.data.length == 0) return
      setResult(response.data)
    }
    onSubmmit()
  }, [searchValue])

  const handleAddProduct = (product: any) => dispatch(addProduct({ product }))

  return (
    <Autocomplete
      classNames={{
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
        popoverContent: 'bg-[red]',
        listbox: 'bg-[red]',
      }}
      items={filteredData}
      errorMessage="Sin resultados."
      isClearable={true}
      inputProps={{
        classNames: {
          input: 'w-full',
        },
        variant: 'flat',
      }}
      onInputChange={handleChange}
      listboxProps={{
        emptyContent: "Sin resultados",
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
      className=' text-[#71717a]'
    >
      {(item: any) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className='flex justify-between items-center' onClick={() => handleAddProduct(item)}>
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
