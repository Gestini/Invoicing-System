import React, { useState } from 'react'

interface CloudinaryUploaderProps {
  onUpload: (fileUrl: string) => void
  existingFileUrl?: string // Propiedad para la URL del archivo existente
  onRemove: () => void // Función para manejar la eliminación del archivo
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  onUpload,
  existingFileUrl,
  onRemove,
}) => {
  const [fileData, setFileData] = useState<File | null>(null)
  const [isFileUploaded, setIsFileUploaded] = useState(!!existingFileUrl) // Inicializa según la URL existente

  const uploadTextFileToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'preset_pabs')

    const response = await fetch(`https://api.cloudinary.com/v1_1/dlmjzjb9x/raw/upload`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (data.secure_url) {
      return data.secure_url
    } else {
      throw new Error('Error al subir el archivo: ' + data.message)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log('Files:', files) // Verifica el FileList console.log(files)
    if (files && files.length > 0) {
      const file = files[0]
      console.log('Archivo seleccionado:', file)
      if (file.size === 0) {
        console.error('El archivo está vacío')
        return
      }
      setFileData(file)
      setIsFileUploaded(true)
      try {
        const fileUrl = await uploadTextFileToCloudinary(file)
        onUpload(fileUrl)
      } catch (error) {
        console.error('Error al subir el archivo', error)
      }
    } else {
      console.error('No se ha seleccionado ningún archivo')
    }
  }

  const handleRemoveFile = () => {
    setFileData(null)
    setIsFileUploaded(false)
    onRemove() // Llama a la función para manejar la eliminación
  }

  return (
    <div>
      {isFileUploaded ? (
        <div className='flex items-center justify-between'>
          <span>
            <a
              href={existingFileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600'
            >
              Ver archivo actual
            </a>
          </span>
          <button
            type='button'
            onClick={handleRemoveFile}
            className='text-red-600 hover:text-red-800'
          >
            ❌
          </button>
        </div>
      ) : (
        <input
          type='file'
          onChange={handleFileChange}
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      )}
    </div>
  )
}

export default CloudinaryUploader
