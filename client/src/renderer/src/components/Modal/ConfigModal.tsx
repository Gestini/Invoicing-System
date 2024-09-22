import React, { useEffect, useState } from 'react'
import {
  reqGetConfigIntegrationsByUnit,
  reqPatchConfigIntegrationsByUnit,
} from '@renderer/api/requests'

interface ConfigData {
  cuil: string
  user: string
  password: string
  key: string
  cert: string
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
  const [originalFormData, setOriginalFormData] = useState<ConfigData | null>(null) // Guardar los datos originales

  useEffect(() => {
    // Petición para obtener la configuración
    reqGetConfigIntegrationsByUnit(unitId, integrationId)
      .then((response) => {
        setConfig(response.data)
        setFormData(response.data.configData) // Inicializar con los datos de la respuesta
        setOriginalFormData(response.data.configData) // Guardar los datos originales para detectar cambios
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

  const getChangedData = () => {
    if (!originalFormData || !formData) return null

    const changedData: Partial<ConfigData> = {}
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof ConfigData] !== originalFormData[key as keyof ConfigData]) {
        changedData[key as keyof ConfigData] = formData[key as keyof ConfigData]
      }
    })
    return changedData
  }

  const handleSave = async () => {
    const changedData = getChangedData()

    if (changedData) {
      const payload = {
        integrationId,
        enabled: config?.enabled || true, // Mantener el valor de `enabled` o usar true por defecto
        configData: changedData,
      }

      try {
        await reqPatchConfigIntegrationsByUnit(unitId, payload)
        console.log('Configuración actualizada:', payload)
        onClose() // Cerrar el modal después de guardar
      } catch (error) {
        console.error('Error al actualizar la configuración', error)
      }
    } else {
      console.log('No se detectaron cambios')
    }
  }

  if (!config || !formData) return <div>Cargando...</div>

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Editar Configuración</h2>
        <form>
          {Object.keys(formData).map((key) => (
            <div key={key} className='form-group mb-4'>
              <label htmlFor={key} className='block text-sm font-medium text-gray-700'>
                {key}
              </label>
              <input
                type='text'
                id={key}
                name={key}
                value={formData[key as keyof ConfigData]}
                onChange={handleInputChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
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
