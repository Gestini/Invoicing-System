import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FilterIcon } from '../Icons/FilterIcon'

const SearchBar = ({
  containerInputHeight,
  color,
  placeholder,
  backgroundColor,
  onSearchInputChange,
  value,
  width,
  border,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-md relative bg-c-input-color`}
      style={{
        height: containerInputHeight || '100%',
        backgroundColor: backgroundColor,
        width: width || '100%',
        border: border,
        color: color,
      }}
    >
      <AiOutlineSearch
        className='absolute left-0 text-gray-400 text-2xl ml-2 w-[20px] h-[20px]'
        style={{ fontSize: '25px', color: '#fafafa' }}
      />
      <input
        type='text'
        placeholder={placeholder || 'Buscar'}
        onChange={onSearchInputChange}
        value={value}
        className='w-[calc(100%-15px)] h-full text-sm font-light px-9 rounded-md bg-transparent focus:outline-none placeholder:font-light placeholder:text-sm user-select-none'
        style={{ color: color, backgroundColor: backgroundColor }}
      />

      <FilterIcon className='absolute right-0 text-red text-2xl mr-2 w-[20px] h-[20px]' />
    </div>
  )
}

export default SearchBar
