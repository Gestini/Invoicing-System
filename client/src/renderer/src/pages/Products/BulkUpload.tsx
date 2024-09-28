import React, { useState, useRef } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'
import axios from 'axios' // Importar Axios

interface FormatFile {
  name: string
}

const BulkUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null) // Estado para mostrar el estado de la carga
  const [productsData, setProductsData] = useState<any[]>([]) // Estado para almacenar los datos de productos

  const inputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  const formatFile: FormatFile[] = [{ name: 'PDF' }, { name: 'WORD' }, { name: 'EXCEL' }]

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setDroppedFile(file)
    setIsDragging(false)
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

  const handleClick = () => {
    if (!droppedFile && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDroppedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!droppedFile) return

    const formData = new FormData()
    formData.append('file', droppedFile) // Agregar el archivo al FormData

    try {
      setUploadStatus('Subiendo...') // Cambiar estado de carga
      const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Especificar tipo de contenido
        },
      })
      setUploadStatus('Archivo subido con éxito') // Estado en caso de éxito
      console.log(response.data)

      // Asumimos que la respuesta tiene una estructura como { products: [...] }
      if (response.data.products) {
        setProductsData(response.data.products) // Guardar datos de productos
      }
    } catch (error) {
      setUploadStatus('Error al subir el archivo') // Estado en caso de error
      console.error('Error al subir el archivo:', error)
    }
  }

  const ProductsTable: React.FC<{ products: any[] }> = ({ products }) => {
    if (products.length === 0) return null; // No renderizar si no hay productos

    const keys = Object.keys(products[0]); // Obtener las claves del primer producto

    return (
        <table className='min-w-full border-collapse border border-gray-300'>
            <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key} className='border border-gray-300 p-4'>
                            {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalizar la primera letra */}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        {keys.map((key) => (
                            <td key={key} className='border border-gray-300 p-4'>
                                {product[key]} {/* Mostrar el valor correspondiente */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

  return (
    <>
      <div
        ref={dropAreaRef}
        className='bg-c-sidebar-bg w-full flex-grow  h-[440px] rounded-3xl shadow-lg flex items-center justify-center flex-col gap-[28px]'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className='flex flex-col items-center'>
          {isDragging ? (
            <div className='text-gray-500 text-sm font-semibold'>¡Suelta el archivo aquí!</div>
          ) : (
            <>
              {droppedFile ? (
                <>
                  <div className='text-gray-500 text-sm font-semibold'>
                    Archivo: {droppedFile.name}
                  </div>
                  <button
                    onClick={handleUpload} // Ejecutar la función para subir el archivo
                    className='mt-4 mb-4 bg-c-primary brightness-110 hover:brightness-125 transition-all duration-200 rounded-lg font-semibold text-[16px] py-[14px] px-[64px]'
                  >
                    Subir Archivo
                  </button>
                  <div>{uploadStatus}</div> {/* Mostrar estado de la carga */}
                  <div className='flex gap-[6px] items-center'>
                    {formatFile.map((ele, ind) => (
                      <button
                        key={ind}
                        className='bg-gradient-to-b from-[#1f2020] to-[#161717] shadow-md py-[4px] rounded-lg px-[14px] text-gray-600 uppercase text-[12px] font-semibold'
                      >
                        {ele.name}
                      </button>
                    ))}
                    <BsThreeDots className='cursor-pointer text-gray-600' />
                  </div>
                </>
              ) : (
                <>
                  <div className='flex items-center justify-center rounded-full w-[100px] h-[100px] bg-c-sidebar-bg-2 mb-4'>
                    <FaPlus className=' w-[50px] h-[50px] text-c-title  ' />
                  </div>
                  <button
                    onClick={handleClick}
                    className='bg-c-primary text-white brightness-110 hover:brightness-125 transition-all duration-200 rounded-lg font-semibold text-[16px] py-[14px] px-[64px]'
                  >
                    Subir Archivo
                  </button>
                  <span className='text-[12px] block text-c-title font-semibold mb-4'>
                    o suelta un archivo aquí
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
                    <BsThreeDots className='cursor-pointer text-gray-600' />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <input ref={inputRef} type='file' className='hidden' onChange={handleFileChange} />
      </div>
      {productsData.length > 0 && <ProductsTable products={productsData} />}
    </>
  )
}

export default BulkUpload
