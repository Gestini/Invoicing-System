import React, { useState, useRef } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'

interface FormatFile {
  name: string
}

const BulkUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null) // Nueva referencia para el área de arrastre

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
    // Verifica si el ratón salió del área de arrastre
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

  return (
    <div
      ref={dropAreaRef} // Asigna la referencia al área de arrastre
      className='bg-gradient-to-b from-[#1f2020] to-[#161717] w-full h-[440px] rounded-3xl shadow-lg flex items-center justify-center flex-col gap-[28px]'
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
                <button className='mt-4 mb-4 bg-c-primary brightness-110 hover:brightness-125 transition-all duration-200 rounded-lg font-semibold text-[16px] py-[14px] px-[64px]'>
                  Subir Archivo
                </button>
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
                <div className='flex items-center justify-center rounded-full w-[100px] h-[100px] bg-[#2f3132] mb-4'>
                  <FaPlus className='text-gray-500 w-[50px] h-[50px] ' />
                </div>
                <button
                  onClick={handleClick}
                  className='bg-c-primary brightness-110 hover:brightness-125 transition-all duration-200 rounded-lg font-semibold text-[16px] py-[14px] px-[64px]'
                >
                  Subir Archivo
                </button>
                <span className='text-[12px] block text-gray-500 font-semibold mb-4'>
                  o suelta un archivo aquí
                </span>
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
            )}
          </>
        )}
      </div>

      <input ref={inputRef} type='file' className='hidden' onChange={handleFileChange} />
    </div>
  )
}

export default BulkUpload
