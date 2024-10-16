export const handleValidation = (
  name: string,
  value: any,
): { isValid: boolean; errorMessage: string; name: string } => {
  const validateField = (isValid: boolean, errorMessage: string) => {
    return { isValid, errorMessage, name }
  }

  switch (name) {
    case 'name':
      return validateField(value && value?.trim() !== '', 'Por favor, ingresa un texto válido.')

    case 'quantity':
    case 'cardPrice':
    case 'costPrice':
    case 'friendPrice':
    case 'purchasePrice':
    case 'financedPrice':
      return validateField(value && !isNaN(value), 'Por favor, ingresa un número válido.')

    default:
      return { isValid: false, errorMessage: '', name: '' }
  }
}

export const initialErrors = {
  name: '',
  quantity: '',
  cardPrice: '',
  costPrice: '',
  friendPrice: '',
  purchasePrice: '',
  financedPrice: '',
}