import React, { useState } from 'react'

const InvoiceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    billTypeLetter: '',
    companyName: '',
    companyAddress: '',
    companyIvaCondition: '',
    salePoint: '',
    compNumber: '',
    issueDate: '',
    companyCuit: '',
    clientCuil: '',
    clientName: '',
    clientCondition: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    saleCondition: '',
    items: [
      {
        code: '',
        product: '',
        quantity: '',
        unit: '',
        price: '',
        discountPercent: '',
        discountAmount: '',
        subtotal: '',
      },
    ],
    subtotal: '',
    otherTaxes: '',
    totalAmount: '',
    caeNumber: '',
    caeExpirationDate: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className=' p-4 overflow-auto'>
      <div className='relative w-full max-w-[210mm] p-8 bg-white  mx-auto mt-5 text-[12px]'>
        <table className='w-full '>
          <div className='relative flex'>
            <div className='border w-[50%] p-2'>
              <div style={{ left: 'calc(50% - 32px)' }} className='text-center absolute  '>
                <input
                  type='text'
                  name='billTypeLetter'
                  value={formData.billTypeLetter}
                  onChange={handleInputChange}
                  className='w-16 h-12 text-center border border-gray-300'
                />
              </div>

              <p>
                <strong>Empresa:</strong>{' '}
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Razón social:</strong>{' '}
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Domicilio Comercial:</strong>{' '}
                <input
                  type='text'
                  name='companyAddress'
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Condición IVA:</strong>{' '}
                <input
                  type='text'
                  name='companyIvaCondition'
                  value={formData.companyIvaCondition}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
            </div>
            <div className='border w-[50%] p-2 pl-20  '>
              <p>
                <strong>Factura:</strong>{' '}
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Punto de Venta:</strong>{' '}
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Comp. Nro:</strong>{' '}
                <input
                  type='text'
                  name='companyAddress'
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>Fecha de Emisión:</strong>{' '}
                <input
                  type='text'
                  name='companyIvaCondition'
                  value={formData.companyIvaCondition}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
              <p>
                <strong>CUIT:</strong>{' '}
                <input
                  type='text'
                  name='companyIvaCondition'
                  value={formData.companyIvaCondition}
                  onChange={handleInputChange}
                  className='border mb-1'
                />
              </p>
            </div>
          </div>

          <div>
            <div className='border p-2'>
              <div className='flex'>
                <p className='w-1/2'>
                  <strong>Fecha de Vto. del pago:</strong>{' '}
                  <input
                    type='text'
                    name='dueDate'
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className='border'
                  />
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className='border p-2'>
              <div>
                <div className='flex '>
                  <p className='w-1/3'>
                    <strong>CUIL/CUIT:</strong>{' '}
                    <input
                      type='text'
                      name='clientCuil'
                      value={formData.clientCuil}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                  <p className='w-2/3'>
                    <strong>Nombre completo / Razón social:</strong>{' '}
                    <input
                      type='text'
                      name='clientName'
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-1/2'>
                    <strong>Condición IVA:</strong>{' '}
                    <input
                      type='text'
                      name='clientCondition'
                      value={formData.clientCondition}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                  <p className='w-1/2'>
                    <strong>Domicilio:</strong>{' '}
                    <input
                      type='text'
                      name='clientAddress'
                      value={formData.clientAddress}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-1/2'>
                    <strong>Telefono:</strong>{' '}
                    <input
                      type='text'
                      name='clientPhone'
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                  <p className='w-1/2'>
                    <strong>Email:</strong>{' '}
                    <input
                      type='text'
                      name='clientEmail'
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      className='border'
                    />
                  </p>
                </div>
                <p>
                  <strong>Condición de venta:</strong>{' '}
                  <input
                    type='text'
                    name='saleCondition'
                    value={formData.saleCondition}
                    onChange={handleInputChange}
                    className='border'
                  />
                </p>
              </div>
            </div>
          </div>

          <tr className='border-t border-gray-300'>
            <td>
              <div>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className='bg-gray-200 font-bold'>
                      <th className='border border-gray-300 px-2 py-1'>Código</th>
                      <th className='border border-gray-300 px-2 py-1'>Producto / Servicio</th>
                      <th className='border border-gray-300 px-2 py-1'>Cantidad</th>
                      <th className='border border-gray-300 px-2 py-1'>U. Medida</th>
                      <th className='border border-gray-300 px-2 py-1'>Precio Unit.</th>
                      <th className='border border-gray-300 px-2 py-1'>% Bonif.</th>
                      <th className='border border-gray-300 px-2 py-1'>Imp. Bonif.</th>
                      <th className='border border-gray-300 px-2 py-1'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-gray-300 px-2 py-1'>200</td>
                      <td className='border border-gray-300 px-2 py-1'>Producto</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>UNIDAD</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>5%</td>
                      <td className='border border-gray-300 px-2 py-1'>5</td>
                      <td className='border border-gray-300 px-2 py-1'>95</td>
                    </tr>
                    <tr>
                      <td className='border border-gray-300 px-2 py-1'>200</td>
                      <td className='border border-gray-300 px-2 py-1'>Producto</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>UNIDAD</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>5%</td>
                      <td className='border border-gray-300 px-2 py-1'>5</td>
                      <td className='border border-gray-300 px-2 py-1'>95</td>
                    </tr>
                    <tr>
                      <td className='border border-gray-300 px-2 py-1'>200</td>
                      <td className='border border-gray-300 px-2 py-1'>Producto</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>UNIDAD</td>
                      <td className='border border-gray-300 px-2 py-1'>100</td>
                      <td className='border border-gray-300 px-2 py-1'>5%</td>
                      <td className='border border-gray-300 px-2 py-1'>5</td>
                      <td className='border border-gray-300 px-2 py-1'>95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr className='border-t border-gray-300 mb-2'>
            <td>
              <div>
                <div className='flex justify-end mb-2'>
                  <p className='w-5/6 text-right font-bold'>
                    <strong>Subtotal: $</strong>
                  </p>
                  <p className='w-1/6 text-right font-bold'>
                    <strong>150,00</strong>
                  </p>
                </div>
                <div className='flex justify-end mb-2'>
                  <p className='w-5/6 text-right font-bold'>
                    <strong>Importe Otros Tributos: $</strong>
                  </p>
                  <p className='w-1/6 text-right font-bold'>
                    <strong>0,00</strong>
                  </p>
                </div>
                <div className='flex justify-end mb-2'>
                  <p className='w-5/6 text-right font-bold'>
                    <strong>Importe total: $</strong>
                  </p>
                  <p className='w-1/6 text-right font-bold'>
                    <strong>150,00</strong>
                  </p>
                </div>
              </div>
            </td>
          </tr>
          <tr className='border-t border-gray-300'>
            <td>
              <div>
                <div className='mb-2'>
                  <strong>CAE Nº:&nbsp;</strong> 12345678912345
                </div>
                <div>
                  <strong>Fecha de Vto. de CAE:&nbsp;</strong> 05/11/2023
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div className='row text-left gestini-lema'>
          Generado en www.gestini.com - Gestini: Gestión inteligente
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm
