'useclient'
import React, { useEffect, useState } from 'react'
import { Switch } from '@nextui-org/switch'
import Afip from '../../assets/Icons/thumbnail.webp'
import { useParams } from 'react-router-dom'
import { reqGetIntegrationsByUnit } from '@renderer/api/requests'

interface Integration {
  imageUrl: string
  name: string
  enabled: boolean
  description: string
}

const Integration = () => {
  const { id } = useParams()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Tipo actualizado

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await reqGetIntegrationsByUnit(id)
        setIntegrations(response.data)
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

  const handleSwitchChange = (index) => {
    // Aquí puedes manejar el cambio del estado del Switch, si es necesario
    // Por ejemplo, podrías enviar una solicitud para actualizar el estado en el backend
    // const updatedIntegrations = [...integrations]
    // updatedIntegrations[index].enabled = !updatedIntegrations[index].enabled
    // setIntegrations(updatedIntegrations)
  }

  return (
    <div className='w-full h-full'>
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
                  isSelected={card.enabled === true} // Controla el estado del Switch basado en `enabled`
                  onValueChange={() => handleSwitchChange(index)} // Maneja el cambio de estado
                />
              </div>
            </div>
            <p className='text-[12px] w-full'>{card.description}</p>
            <div className='border border-divider w-full'></div>
            <div className='fottercard-integration w-full flex justify-end text-[14px] font-[600] text-c-primary cursor-pointer'>
              Ver Integración
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Integration
