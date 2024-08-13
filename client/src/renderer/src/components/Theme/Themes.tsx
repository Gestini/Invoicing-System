import React from 'react'
import { useDisclosure } from '@nextui-org/react'

export const Themes = {
  night: {
    name: 'dark',
  },
  light: {
    name: 'light',
  },
}

export const themeColors = [
  { name: 'Azul', color: '#3b82f6', variant: 'variantOne' },
  { name: 'Rojo', color: '#ef4444', variant: 'variantTwo' },
  { name: 'Violeta', color: '#8b5cf6', variant: 'variantThree' },
  { name: 'Rosa', color: '#ec4899', variant: 'variantFour' },
  { name: 'Naranja', color: '#ff9900', variant: 'variantFive' },
  { name: 'Verde', color: '#86dd8b', variant: 'variantSix' },
]

export const useColorManagement = () => {
  const [color, setColor] = React.useState({ name: '', color: '', variant: '' })
  const [colors, setColors] = React.useState(themeColors)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errorMessage, setErrorMessage] = React.useState({ field: '', text: '' })

  const handleOpen = () => {
    onOpen()
  }

  const onCloseAndClear = () => {
    setErrorMessage({ field: '', text: '' })
    onClose()
  }

  const addColor = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación: Verificar que el color no esté ya creado
    const colorExists = colors.some((item) => item.color === color.color)
    if (colorExists) {
      return setErrorMessage({ field: 'color', text: 'Este color ya está creado.' })
    }

    // Validación: Verificar que el nombre sea único
    const nameExists = colors.some((item) => item.name.toLowerCase() === color.name.toLowerCase())
    if (nameExists) {
      return setErrorMessage({ field: 'name', text: 'Este nombre ya está en uso.' })
    }

    // Validación: Verificar que los campos no estén vacíos
    if (color.name === '') {
      return setErrorMessage({ field: 'name', text: 'Debe contener nombre' })
    } else if (color.color === '') {
      return setErrorMessage({ field: 'color', text: 'Debes seleccionar un color' })
    }

    // Si no hay errores, agregar el color a la lista
    setColors([...colors, color])
    onCloseAndClear()
  }

  return {
    color,
    isOpen,
    colors,
    setColor,
    addColor,
    setColors,
    handleOpen,
    errorMessage,
    onCloseAndClear,
  }
}
