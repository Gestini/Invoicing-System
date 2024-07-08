import { products } from './data'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import { addProduct } from '@renderer/features/newInvoicing'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

export const SearchProduct = () => {
  const dispatch = useDispatch()
  const newInvoicing = useSelector((state: any) => state.newInvoicing)
  const currentTab = newInvoicing?.tabs?.find((item: any) => item.id == newInvoicing.currentTabId)
  const filteredData = products.filter(
    (product) => !currentTab?.products.some((item: any) => item.id == product.id),
  )

  const handleChange = (e: any) => console.log(e)
  const handleAddProduct = (product: any) => dispatch(addProduct({ product }))

  return (
    <Autocomplete
      classNames={{
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
        popoverContent: 'bg-[red]',
        listbox: 'bg-[red]',
      }}
      defaultItems={filteredData}
      inputProps={{
        classNames: {
          input: 'w-full',
        },
        variant: 'flat',
      }}
      onInputChange={handleChange}
      listboxProps={{
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
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.productName}>
          <div className='flex justify-between items-center' onClick={() => handleAddProduct(item)}>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col'>
                <span className='text-small'>{item.productName}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
