import React, { useEffect, useState } from 'react'
import {
  reqGetConfigIntegrationsByUnit,
  reqPatchConfigIntegrationsByUnit,
} from '@renderer/api/requests'
import CloudinaryUploader from './CloudinaryUploader'
import ConnectAccountAfip from './ConnectAccountAfip'

interface ConfigData {
  [key: string]: string | boolean | undefined
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
  const [formData, setFormData] = useState<ConfigData>({})
  const [originalFormData, setOriginalFormData] = useState<ConfigData | null>(null)
  const [showConnectAccount, setShowConnectAccount] = useState<boolean>(false)

  useEffect(() => {
    reqGetConfigIntegrationsByUnit(unitId, integrationId)
      .then((response) => {
        setConfig(response.data)
        setFormData(response.data.configData)
        setOriginalFormData(response.data.configData)
      })
      .catch((error) => {
        console.error('Error al obtener la configuración', error)
      })
  }, [unitId, integrationId])

  const handleFileUpload = (fileUrl: string, key: string) => {
    setFormData((prev) => ({ ...prev, [key]: fileUrl }))
  }

  const handleFileRemove = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: undefined,
    }))
  }

  const handleDesvincular = async () => {
    const payload = {
      integrationId,
      configData: {
        's-username': '',
        'a-isauth': false,
        'f-cert': '',
        'f-key': '',
      },
    }
    reqPatchConfigIntegrationsByUnit(unitId, payload)
    console.log('Integración desvinculada')
    onClose() // Cierra el modal después de desvincular
  }

  const handleSave = async () => {
    const changedData = getChangedData()
    if (changedData) {
      const payload = {
        integrationId,
        configData: { ...changedData },
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

  const handleConnectSuccess = async () => {
    setShowConnectAccount(true)
    try {
      const response = await reqGetConfigIntegrationsByUnit(unitId, integrationId)
      setConfig(response.data)
      setFormData(response.data.configData)
      setOriginalFormData(response.data.configData)
      console.log('Conexión exitosa y configuración actualizada')
    } catch (error) {
      console.error('Error al obtener la configuración actualizada', error)
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  if (!config || !formData) return <div>Cargando...</div>

  const cleanLabel = (key: string) => {
    return key.replace(/^s-/, '').replace(/^f-/, '')
  }

  console.log(formData)

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto p-6'>
        {integrationId === 1 && formData['a-isauth'] === false && !showConnectAccount ? (
          <ConnectAccountAfip
            unitId={unitId}
            integrationId={integrationId}
            onClose={handleConnectSuccess}
            onConnectSuccess={handleConnectSuccess} // pasa la función para actualizar
          />
        ) : (
          <>
            <h2 className='text-2xl font-bold mb-4'>Editar Configuración</h2>
            {integrationId === 1 ? (
              <div>
                {Object.keys(formData)
                  .filter((key) => !key.startsWith('a-'))
                  .map((key) => (
                    <div key={key} className='form-group mb-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        {cleanLabel(key)}
                      </label>
                      <div className='mt-1'>
                        {/* Verifica si la clave empieza con "f-", en ese caso muestra un LINK */}
                        {key.startsWith('f-') && typeof formData[key] === 'string' ? (
                          <a
                            href={formData[key]}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 underline'
                          >
                            LINK
                          </a>
                        ) : (
                          <span className='text-gray-600'>{formData[key]?.toString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                <div className='flex justify-end space-x-2'>
                  <button
                    type='button'
                    onClick={handleDesvincular}
                    className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                  >
                    Desvincular
                  </button>
                  <button
                    type='button'
                    onClick={onClose}
                    className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <form>
                {Object.keys(formData)
                  .filter((key) => !key.startsWith('a-'))
                  .map((key) => (
                    <div key={key} className='form-group mb-4'>
                      <label htmlFor={key} className='block text-sm font-medium text-gray-700'>
                        {cleanLabel(key)}
                      </label>
                      {key.startsWith('f-') ? (
                        <CloudinaryUploader
                          onUpload={(fileUrl) => handleFileUpload(fileUrl, key)}
                          existingFileUrl={formData[key] as string}
                          onRemove={() => handleFileRemove(key)}
                        />
                      ) : (
                        <input
                          type='text'
                          id={key}
                          name={key}
                          value={
                            formData[key] !== true && formData[key] !== false ? formData[key] : ''
                          }
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
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ConfigModal
