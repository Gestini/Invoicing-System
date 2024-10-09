'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@nextui-org/switch'
import { useParams } from 'react-router-dom'
import { reqGetIntegrationsByUnit } from '@renderer/api/requests'
import ConfigModal from '../../components/Modal/ConfigModal' // Asegúrate de importar tu modal

interface Integration {
  imageUrl: string
  name: string
  enabled: boolean
  description: string
  id: number // Necesitamos el ID para identificar cada integración
}

const Integration = () => {
  const { id } = useParams()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState<string | null>(null) // Estado de error
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null) // Estado para la integración seleccionada

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await reqGetIntegrationsByUnit(id)
        setIntegrations(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchIntegrations()
  }, [id])

  const handleSwitchChange = (index: number) => {
    const updatedIntegrations = [...integrations]
    updatedIntegrations[index].enabled = !updatedIntegrations[index].enabled // Cambia el estado localmente
    setIntegrations(updatedIntegrations) // Actualiza el estado
  }

  const handleOpenConfigModal = (integration: Integration) => {
    setSelectedIntegration(integration) // Establece la integración seleccionada
  }

  const handleCloseConfigModal = () => {
    setSelectedIntegration(null) // Cierra el modal
  }

  return (
    <div className='w-full h-full'>
      {loading ? ( // Muestra un loading mientras se están cargando las integraciones
        <div>Loading...</div>
      ) : error ? ( // Muestra un mensaje de error si hay uno
        <div>Error: {error}</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {integrations.map((card, index) => (
            <div key={index} className='bg-white p-3 shadow-md rounded-md flex flex-col gap-4'>
              <div className='topsectioncard-integration flex w-full justify-between'>
                <div className='infocardtop-integration flex gap-2 font-[600] items-center'>
                  <div
                    className='w-[50px] h-[50px] rounded-xl'
                    style={{
                      backgroundImage: `url(${card.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                  <span>{card.name}</span>
                </div>
                <div className='infocardtoggle flex items-start'>
                  <Switch
                    size='sm'
                    color='primary'
                    isSelected={card.enabled} // Controla el estado del Switch basado en `enabled`
                    onValueChange={() => handleSwitchChange(index)} // Cambia solo el estado visual
                  />
                </div>
              </div>
              <p className='text-[12px] w-full'>{card.description}</p>
              <div className='border border-divider w-full'></div>
              <div
                className='fottercard-integration w-full flex justify-end text-[14px] font-[600] text-c-primary cursor-pointer'
                onClick={() => handleOpenConfigModal(card)} // Abre el modal de configuración
              >
                Configurar
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mostrar el modal solo si hay una integración seleccionada */}
      {selectedIntegration && (
        <ConfigModal
          unitId={id || ''}
          integrationId={selectedIntegration.id}
          onClose={handleCloseConfigModal}
        />
      )}
    </div>
  )
}

export default Integration
