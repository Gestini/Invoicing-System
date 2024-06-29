import { Product } from '@renderer/types/Products'
import React, { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import ImportedProductsModal from './ImportedProductsModal'

const ImportExcel = ({ products, setProducts }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [importedProducts, setImportedProducts] = useState<Product[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputFileRef = useRef<HTMLInputElement | null>(null) // Explicitly typing the ref

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target?.result as string, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        const importedProducts: Product[] = data.slice(1).map((row: any) => ({
          id: row[0],
          name: row[1],
          category: row[2],
          price: row[3],
          stock: row[4],
          supplier: row[5],
          status: row[6],
        }))

        setImportedProducts(importedProducts)
        setErrorMessage('')
      } catch (error) {
        console.error('Error importing Excel:', error)
        setErrorMessage('Error al importar el archivo Excel. Por favor, verifica el formato.')
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleConfirmImport = () => {
    setProducts([...products, ...importedProducts])
    onClose() // Cerrar el modal después de importar y confirmar
  }
  const handleDeleteFile = () => {
    setImportedProducts([])
    setErrorMessage('')
    if (inputFileRef.current) {
      inputFileRef.current.value = '' // Limpiar el valor del input de archivo
    }
  }

  return (
    <div>
      <input type='file' onChange={handleImport} ref={inputFileRef} />
      <Button color='primary' onClick={onOpen}>
        Importar desde Excel
      </Button>
      <Button color='danger' onClick={handleDeleteFile}>
        Eliminar archivo
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
      <ImportedProductsModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirmImport={handleConfirmImport}
        products={importedProducts}
      />
    </div>
  )
}

export default ImportExcel
