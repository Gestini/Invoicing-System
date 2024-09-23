import React, { useEffect, useState } from 'react'
import {
  reqGetConfigIntegrationsByUnit,
  reqPatchConfigIntegrationsByUnit,
} from '@renderer/api/requests'

interface ConfigData {
  [key: string]: string
}

interface IntegrationConfig {
  enabled: boolean
  configData: ConfigData
}

const ConfigModal = ({
  unitId,
  integrationId,
  onClose,
}: {
  unitId: string
  integrationId: number
  onClose: () => void
}) => {
  const [config, setConfig] = useState<IntegrationConfig | null>(null)
  const [formData, setFormData] = useState<ConfigData | null>(null)
  const [originalFormData, setOriginalFormData] = useState<ConfigData | null>(null)
  const [fileData, setFileData] = useState<{ [key: string]: File | null }>({})
  const [isFileUploaded, setIsFileUploaded] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    reqGetConfigIntegrationsByUnit(unitId, integrationId)
      .then((response) => {
        setConfig(response.data)
        setFormData(response.data.configData)
        setOriginalFormData(response.data.configData)

        // Establecer el estado si hay archivos ya cargados
        const fileKeys = Object.keys(response.data.configData).filter((key) => key.startsWith('f-'))
        const uploadedFileState = fileKeys.reduce(
          (acc, key) => {
            acc[key] = Boolean(response.data.configData[key])
            return acc
          },
          {} as { [key: string]: boolean },
        )
        setIsFileUploaded(uploadedFileState)
      })
      .catch((error) => {
        console.error('Error al obtener la configuración', error)
      })
  }, [unitId, integrationId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      console.log('Archivo seleccionado:', file)
      if (file.size === 0) {
        console.error('El archivo está vacío')
        return
      }
      setFileData({
        ...fileData,
        [name]: file,
      })
      setIsFileUploaded({ ...isFileUploaded, [name]: true })
    } else {
      console.error('No se ha seleccionado ningún archivo')
    }
  }

  const removeUploadedFile = (key: string) => {
    setIsFileUploaded({ ...isFileUploaded, [key]: false })
    setFileData({ ...fileData, [key]: null })
  }

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

  const getChangedData = () => {
    if (!originalFormData || !formData) return null

    const changedData: Partial<ConfigData> = {}
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalFormData[key]) {
        changedData[key] = formData[key]
      }
    })
    return changedData
  }

  const handleSave = async () => {
    const changedData = getChangedData()
    if (changedData) {
      const payload: any = {
        integrationId,

        configData: { ...changedData },
      }

      for (const key in fileData) {
        if (fileData[key]) {
          try {
            const fileUrl = await uploadTextFileToCloudinary(fileData[key] as File)
            payload.configData[key] = fileUrl
          } catch (error) {
            console.error('Error al subir el archivo', error)
            return
          }
        }
      }

      try {
        await reqPatchConfigIntegrationsByUnit(unitId, payload)
        console.log('Configuración actualizada:', payload)
        onClose()
      } catch (error) {
        console.error('Error al actualizar la configuración', error)
      }
    } else {
      console.log('No se detectaron cambios')
    }
  }

  if (!config || !formData) return <div>Cargando...</div>

  const cleanLabel = (key: string) => {
    return key.replace(/^s-/, '').replace(/^f-/, '')
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Editar Configuración</h2>
        <form>
          {Object.keys(formData).map((key) => (
            <div key={key} className='form-group mb-4'>
              <label htmlFor={key} className='block text-sm font-medium text-gray-700'>
                {cleanLabel(key)}
              </label>
              {key.startsWith('s-') ? (
                <input
                  type='text'
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              ) : key.startsWith('f-') ? (
                <>
                  {isFileUploaded[key] ? (
                    <div className='flex items-center justify-between'>
                      <span>
                        <a
                          href={formData[key]}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600'
                        >
                          Ver archivo actual
                        </a>
                      </span>
                      <button
                        type='button'
                        onClick={() => removeUploadedFile(key)}
                        className='text-red-600 hover:text-red-800'
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <input
                      type='file'
                      id={key}
                      name={key}
                      onChange={handleFileChange}
                      className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  )}
                </>
              ) : (
                <input
                  type='text'
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              )}
            </div>
          ))}
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={handleSave}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Guardar
            </button>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfigModal
