import { FilterIcon } from '../Icons/FilterIcon'

const SearchBar = () => {
  return (
    <button
      className='flex gap-1 p-[10px] items-center justify-center rounded-md relative bg-c-input-color '
    >
      <FilterIcon className='text-red text-2xl mr-2 w-[20px] h-[20px]' />
      <span className='text-[12px] font-medium text-white'>Filtrar</span>
    </button>
  )
}

export default SearchBar
