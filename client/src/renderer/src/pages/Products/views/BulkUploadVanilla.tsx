import React, { useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaPlus, FaTimes } from 'react-icons/fa'
import * as XLSX from 'xlsx'

interface Product {
  [key: string]: string | number // Esta definición de tipo permite una estructura flexible
}

const BulkUploadVanilla = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([]) // Cambié 'never[]' a 'Product[]'

  const inputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  const formatFile = [{ name: 'EXCEL' }]

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setDroppedFile(file)
    setIsDragging(false)
    convertFileToJSON(file) // Convertir el archivo inmediatamente después de soltarlo
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (dropAreaRef.current && !dropAreaRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDroppedFile(file)
      convertFileToJSON(file) // Convertir el archivo inmediatamente después de seleccionarlo
    }
  }

  const convertFileToJSON = (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const binaryStr = e.target?.result as string
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Convertir el contenido de la hoja a JSON
      const data: { nombre: string; cantidad: number; precio: number }[] =
        XLSX.utils.sheet_to_json(worksheet)

      // Mostrar los datos en consola o guardarlos en el estado
      console.log('Datos del archivo:', data)
      setProducts(data) // Guardar los productos en el estado

      // Actualizar el estado de la carga
      setUploadStatus('Archivo subido con éxito.')
    }
    reader.readAsBinaryString(file)
  }

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts) // Asumiendo que estás usando useState para los productos
  }

  const handleBackToFile = () => {
    setProducts([]) // Vuelve a un estado vacío, para que se muestre el área de arrastre
    setDroppedFile(null) // Si quieres también resetear el archivo que fue cargado
    setUploadStatus('') // Y el estado de carga
  }

  const handleEditProduct = (index: number, field: string, value: any) => {
    const updatedProducts = [...products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    }
    setProducts(updatedProducts)
    console.log(products)
  }
  const sendToServer = () => {
    console.log(products)
  }

  return (
    <div
      ref={dropAreaRef}
      className='bg-c-sidebar-bg w-full h-full rounded-3xl shadow-lg flex items-center justify-center flex-col gap-[28px]'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className='flex flex-col items-center'>
        {products.length === 0 ? (
          // Si no hay productos, mostrar la sección de drag-and-drop
          <>
            {isDragging ? (
              <div className='text-gray-500 text-sm font-semibold'>¡Suelta el archivo aquí!</div>
            ) : (
              <>
                <div className='flex items-center justify-center rounded-full w-[100px] h-[100px] bg-c-sidebar-bg-2 mb-4'>
                  <FaPlus className=' w-[50px] h-[50px] text-c-title  ' />
                </div>
                <input
                  ref={inputRef}
                  type='file'
                  className='hidden'
                  onChange={handleFileChange}
                  accept='.xlsx, .xls'
                />
                <button
                  onClick={() => inputRef.current?.click()}
                  className='bg-c-primary text-white brightness-110 hover:brightness-125 transition-all duration-200 rounded-lg font-semibold text-[16px] py-[14px] px-[64px]'
                >
                  Seleccionar Archivo
                </button>
                <span className='text-[12px] block text-c-title font-semibold mb-4'>
                  <span className=' text-blue-700 border-b cursor-pointer ' >Descargar template</span> o suelta un archivo aquí
                </span>
                <div className='flex gap-[6px] items-center'>
                  {formatFile.map((ele, ind) => (
                    <button
                      key={ind}
                      className='bg-c-sidebar-bg-2 shadow-md py-[4px] rounded-lg px-[14px] text-c-title uppercase text-[12px] font-semibold'
                    >
                      {ele.name}
                    </button>
                  ))}
                
                </div>
              </>
            )}
          </>
        ) : (
          // Si hay productos, mostrar la sección con la lista de productos y las opciones de eliminar o volver atrás
          <>
            <div className='flex flex-col items-center justify-center'>
              <h2 className='text-lg font-semibold text-gray-800'>Productos cargados</h2>

              <table className='mt-4 w-full table-auto border-collapse'>
                <thead>
                  <tr>
                    {/* Aquí iteramos sobre los nombres de las columnas */}
                    {Object.keys(products[0] || {}).map((key, index) => (
                      <th key={index} className='border p-2'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                        {/* Capitaliza el primer carácter */}
                      </th>
                    ))}
                    <th className='border p-2'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      {/* Aquí también iteramos sobre los nombres de las columnas */}
                      {Object.keys(product).map((key, i) => (
                        <td key={i} className='border p-2'>
                          <input
                            type='text'
                            value={product[key]}
                            onChange={(e) => handleEditProduct(index, key, e.target.value)} // Usamos el `key` como el campo dinámico
                            className='border p-1 w-full'
                          />
                        </td>
                      ))}
                      <td className='border p-2'>
                        <button onClick={() => handleRemoveProduct(index)} className='text-red-600'>
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='mt-4 flex gap-4'>
                <button
                  onClick={handleBackToFile}
                  className='bg-yellow-500 text-white rounded-lg font-semibold py-2 px-4'
                >
                  Volver
                </button>
                <button
                  onClick={sendToServer}
                  className='bg-blue-500 text-white rounded-lg font-semibold py-2 px-4'
                >
                  Enviar Productos
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BulkUploadVanilla
