import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { reqGetCategoriesByName } from '@renderer/api/requests'
import React, { useState } from 'react'


interface AutocompleteInputProps {
  label: string
  placeholder: string
  type: 'supplier' | 'product' | 'category'
  onSelect: (selectedId: number | null) => void
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  placeholder,
  type,
  onSelect,
}) => {
  const [items, setItems] = useState<Array<{ id: number; name: string }>>([])
  const [localInputValue, setLocalInputValue] = useState<string>('')

  const fetchItems = async (name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setItems([])
      return
    }

    try {
      const response = await reqGetCategoriesByName(trimmedName) // Asumiendo que reqGetCategoriesByName funciona para todos los tipos
      const data = response.data
      setItems(
        data.map((item: any) => ({
          id: item[`${type}Id`],
          name: item[`${type}Name`],
        })),
      )
    } catch (error) {
      console.error(`Error fetching ${type}s:`, error)
    }
  }

  const handleSelectionChange = (key: any) => {
    const selectedItem = items.find((item) => item.id === Number(key))
    setLocalInputValue(selectedItem ? `${selectedItem.id} - ${selectedItem.name}` : '')
    onSelect(selectedItem ? selectedItem.id : null)
  }

  return (
    <Autocomplete
      label={label}
      labelPlacement='outside'
      placeholder={placeholder}
      variant='bordered'
      value={localInputValue}
      onInputChange={(value: string) => {
        setLocalInputValue(value)
        fetchItems(value)
      }}
      onSelectionChange={handleSelectionChange}
    >
      {items.map((item) => (
        <AutocompleteItem key={item.id} value={item.id}>
          {`${item.id} - ${item.name}`}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  )
}

export default AutocompleteInput
