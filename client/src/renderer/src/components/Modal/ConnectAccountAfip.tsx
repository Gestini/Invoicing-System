import React, { useState } from 'react'
import { reqGenerateCert, reqPatchConfigIntegrationsByUnit } from '@renderer/api/requests'

interface ConnectAccountProps {
  unitId: string
  integrationId: number
  onClose: () => void
  onConnectSuccess: () => void // nuevo prop
}

const ConnectAccountAfip: React.FC<ConnectAccountProps> = ({
  unitId,
  integrationId,
  onClose,
  onConnectSuccess,
}) => {
  const [loading, setLoading] = useState(false)
  const [connectionData, setConnectionData] = useState({
    taxId: '',
    username: '',
    password: '',
    alias: '',
  })

  const handleConnectionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConnectionData((prevData) => ({
      ...prevData,
      [name]: value,
      taxId: name === 'username' ? value : prevData.taxId,
    }))
  }

  const ConnectAccountAfip = async () => {
    setLoading(true)
    try {
      // Simulación de respuesta
      const response = await reqGenerateCert(connectionData) // Espera la respuesta de la función

      // const response = {
      //   status: 200,
      //   data: {
      //     'f-cert': 'certificado_simulado',
      //     'f-key': 'clave_simulada',
      //     's-user': 'usuario_simuladorito',
      //   },
      // }

      if (response.status !== 200) {
        throw new Error('Error al conectar la cuenta')
      }

      const responseData = response.data

      const payload = {
        integrationId: integrationId,
        configData: {
          'f-cert': responseData['f-cert'],
          'f-key': responseData['f-key'],
          's-username': responseData['s-user'],
          'a-isauth': true, // Cambia el estado de autenticación
        },
      }

      await reqPatchConfigIntegrationsByUnit(unitId, payload)
      onConnectSuccess() // Llama a la función de éxito
      onClose() // Informa a ConfigModal sobre el éxito
    } catch (error) {
      console.error('Error al conectar la cuenta:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>Conectar tu Cuenta</h2>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1' htmlFor='username'>
          Clave Fiscal
        </label>
        <input
          type='text'
          name='username'
          value={connectionData.username}
          onChange={handleConnectionInputChange}
          required
          className='border border-gray-300 rounded p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1' htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          name='password'
          value={connectionData.password}
          onChange={handleConnectionInputChange}
          required
          className='border border-gray-300 rounded p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1' htmlFor='alias'>
          Alias
        </label>
        <input
          type='text'
          name='alias'
          value={connectionData.alias}
          onChange={handleConnectionInputChange}
          required
          className='border border-gray-300 rounded p-2 w-full'
        />
      </div>
      <button
        type='button'
        onClick={ConnectAccountAfip}
        disabled={loading}
        className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded hover:${loading ? '' : 'bg-blue-700'}`}
      >
        {loading ? 'Conectando...' : 'Conectar'}
      </button>
      {loading && <div className='mt-4 text-center'>Cargando...</div>}
    </>
  )
}

export default ConnectAccountAfip
