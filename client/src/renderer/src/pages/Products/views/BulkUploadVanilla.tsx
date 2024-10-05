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
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Añadido para mostrar errores

  const inputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  const formatFile = [{ name: 'EXCEL' }]

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (validateFile(file)) {
      setDroppedFile(file)
      setIsDragging(false)
      convertFileToJSON(file)
      setErrorMessage(null) // Limpiar el mensaje de error si el archivo es válido
    } else {
      setErrorMessage('Solo se permiten archivos con extensión .xlsx o .xls')
      setDroppedFile(null)
    }
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
      if (validateFile(file)) {
        setDroppedFile(file)
        convertFileToJSON(file)
        setErrorMessage(null) // Limpiar el mensaje de error si el archivo es válido
      } else {
        setErrorMessage('Solo se permiten archivos con extensión .xlsx o .xls')
        setDroppedFile(null)
      }
    }
  }

  const validateFile = (file: File) => {
    const validExtensions = ['xlsx', 'xls']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    return fileExtension && validExtensions.includes(fileExtension)
  }

  const convertFileToJSON = (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const binaryStr = e.target?.result as string
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      const data: { nombre: string; cantidad: number; precio: number }[] =
        XLSX.utils.sheet_to_json(worksheet)

      console.log('Datos del archivo:', data)
      setProducts(data)
      setUploadStatus('Archivo subido con éxito.')
    }
    reader.readAsBinaryString(file)
  }

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  }

  const handleBackToFile = () => {
    setProducts([])
    setDroppedFile(null)
    setUploadStatus('')
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
    <div className='bg-c-sidebar-bg w-full h-full  rounded-3xl shadow-lg flex justify-center  '>
      {products.length === 0 ? (
        // Si no hay productos, mostrar la sección de drag-and-drop
        <>
          <div className='left w-1/2 py-5 px-5 overflow-y-auto '>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Instrucciones para Subida Masiva de Productos (VANILLA)
            </h2>

            <h3 className='text-xl font-semibold mb-3 text-gray-700'>Paso 1: Descarga</h3>
            <ul className='list-disc list-inside text-sm text-gray-600 mb-4'>
              <li>
                <a
                  href='/ruta-al-template/template.xlsx'
                  download
                  className='text-blue-500 hover:underline'
                >
                  Descargar el Template
                </a>
              </li>
              <p>
                Rellenar el template manteniendo las columnas y rellanando las filas con los
                productos{' '}
              </p>
            </ul>

            <h3 className='text-xl font-semibold mb-3 text-gray-700'>Paso 2: Subida de Archivo</h3>
            <p className='text-sm text-gray-600 mb-4'>Una vez rellenado el archivo:</p>
            <ul className='list-disc list-inside text-sm text-gray-600 mb-4'>
              <li>
                <strong>Seleccionar/arrastrar archivo:</strong> Sólo .xlsx o .xls. Se procesará
                automáticamente.
              </li>
            </ul>

            <h3 className='text-xl font-semibold mb-3 text-gray-700'>
              Paso 3: Edición de Productos
            </h3>
            <p className='text-sm text-gray-600 mb-4'>Una vez cargado el documento, podrás:</p>
            <ul className='list-disc list-inside text-sm text-gray-600 mb-4'>
              <li>
                <strong>Editar:</strong> Editar los productos en la tabla
              </li>
              <li>
                <strong>Vincular:</strong> Vincular producto importado a otro ya creado.
              </li>
              <li>
                <strong>Eliminar:</strong> Eliminar un producto importado.
              </li>
            </ul>

            <h3 className='text-xl font-semibold mb-3 text-gray-700'>Paso 4: Guardar Productos</h3>
            <p className='text-sm text-gray-600 mb-4'>Cuando esté listo:</p>
            <ul className='list-disc list-inside text-sm text-gray-600 mb-4'>
              <li>
                <strong>Enviar:</strong> Haga clic en "Enviar Productos".
              </li>
              <li>
                <strong>Nuevo archivo:</strong> Haga clic en "Volver" para cargar otro.
              </li>
            </ul>
          </div>

          <div
            className={`right h-full flex-grow flex flex-col justify-center items-center relative`} // Añadimos "relative" para poder usar "absolute" en el overlay
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            ref={dropAreaRef}
          >
            {isDragging && (
              <div className='absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center'>
                {' '}
                {/* Pantalla semi-transparente */}
                <div className='text-center'>
                  <p className='text-white text-2xl font-semibold'>Suelte aquí</p>
                </div>
              </div>
            )}

            {/* Contenido de fondo que siempre se debe ver */}
            <div className='z-0 flex flex-col  items-center '>
              {' '}
              {/* Este div se verá debajo del overlay */}
              <div className='flex items-center justify-center rounded-full w-[100px] h-[100px] bg-c-sidebar-bg-2 mb-4'>
                <FaPlus className=' w-[50px] h-[50px] text-c-title' />
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
                <a
                  className='text-blue-700 border-b cursor-pointer'
                  href='/ruta-del-archivo/template.xlsx'
                  download='template.xlsx'
                >
                  Descargar template
                </a>
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
              {errorMessage && <p className='text-red-500 font-semibold mt-4'>{errorMessage}</p>}
            </div>
          </div>
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
  )
}

export default BulkUploadVanilla
