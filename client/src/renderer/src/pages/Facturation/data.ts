// FACTURA DINÁMICA
export const factura = [
  {
    section: 'Datos de factura',
    info: [
      {
        name: 'billType',
        title: 'Tipo de factura',
        value: '',
        type: 'select',
        options: [1, 6, 11],
        invisible: true,
      },
      {
        name: 'billTypeLetter',
        title: 'Letra de la factura',
        value: '',
        type: 'select',
        options: ['A', 'B', 'C'],
      },
      {
        name: 'compNumber',
        title: 'Número de comprobante',
        value: '',
        type: 'input',
        invisible: true,
      },
      { name: 'issueDate', title: 'Fecha de emisión', value: '', type: 'input' },
      { name: 'dueDate', title: 'Fecha de vencimiento', value: '', type: 'input' },
      {
        name: 'saleCondition',
        title: 'Condición de venta',
        value: '',
        type: 'select',
        options: [
          'Contado',
          'Tarjeta de débito',
          'Tarjeta de crédito',
          'Depósito',
          'Transferencia',
        ],
      },
    ],
  },
  {
    section: 'Datos de empresa',
    info: [
      { name: 'companyName', title: 'Nombre de la empresa', value: '', type: 'input' },
      { name: 'companyAddress', title: 'Dirección de la empresa', value: '', type: 'input' },
      {
        name: 'companyIvaCondition',
        title: 'Condición IVA de la empresa',
        value: '',
        type: 'select',
        options: [
          'Monotributista',
          'IVA responsable inscripto',
          'IVA responsable no inscripto',
          'IVA sujeto exento',
          'Consumidor final',
          'Proveedor del exterior',
          'Cliente del exterior',
          'IVA Liberado - Ley 19.640',
          'Monotributista social',
          'IVA no alcanzado',
        ],
      },
      { name: 'companyCuit', title: 'CUIT de la empresa', value: '', type: 'input' },
    ],
  },
  {
    section: 'Concepto',
    info: [
      { name: 'salePoint', title: 'Punto de venta', value: '', type: 'input' },
      {
        name: 'concepto',
        title: 'Concepto',
        value: '',
        type: 'select',
        options: ['Productos', 'Servicios', 'Productos y servicios'],
      },
    ],
  },
  {
    section: 'Datos de cliente',
    info: [
      { name: 'clientName', title: 'Nombre del cliente', value: '', type: 'input' },
      { name: 'clientCuil', title: 'CUIL del cliente', value: '', type: 'input' },
      {
        name: 'clientCondition',
        title: 'Condición IVA del cliente',
        value: '',
        type: 'select',
        options: [
          'Monotributista',
          'IVA responsable inscripto',
          'IVA responsable no inscripto',
          'IVA sujeto exento',
          'Consumidor final',
          'Proveedor del exterior',
          'Cliente del exterior',
          'IVA Liberado - Ley 19.640',
          'Monotributista social',
          'IVA no alcanzado',
        ],
      },
      { name: 'clientPhone', title: 'Teléfono del cliente', value: '', type: 'input' },
      { name: 'clientEmail', title: 'Email del cliente', value: '', type: 'input' },
      { name: 'clientAddress', title: 'Dirección del cliente', value: '', type: 'input' },
    ],
  },
  {
    section: 'items',
    info: [
      { name: 'code', title: 'Código', value: '615', type: 'input' },
      { name: 'product', title: 'Producto', value: 'Producto 1', type: 'input' },
      { name: 'quantity', title: 'Cantidad', value: '10', type: 'input' },
      { name: 'unit', title: 'Unidad', value: 'Coca-cola', type: 'input' },
      { name: 'unitPrice', title: 'Precio unitario', value: '100', type: 'input' },
      { name: 'discountPercent', title: 'Descuento (%)', value: '1', type: 'input' },
      { name: 'discountAmount', title: 'Descuento (monto)', value: '1', type: 'input' },
      { name: 'subtotal', title: 'Subtotal', value: '100', type: 'input' },
    ],
  },
  {
    section: 'totals',
    info: [
      { name: 'importeGravado', title: 'Importe Gravado', value: '100', type: 'input' },
      { name: 'importeExento', title: 'Importe Exento', value: '150', type: 'input' },
      { name: 'iva', title: 'IVA', value: '600', type: 'input' },
      { name: 'total', title: 'Total', value: '100', type: 'input' },
    ],
  },
]

// // FACTURA A, B, C
// export const factura = {
//     // FACTURA DATA
//     // BILLTYPE = 1 => A | BILLTYPE = 6 => B | BILLTYPE = 11 => C
//     billType: 1, // Factura de Crédito Electrónica MiPyMEs A
//     billTypeLetter: 'A',
//     compNumber: '000000033',
//     issueDate: '25/10/2023',
//     dueDate: '25/10/2023',
//     saleCondition: 'Contado',

//     // COMPANY DATA
//     companyName: 'Gestini S.A.',
//     companyAddress: 'Gestini street 123',
//     companyIvaCondition: 'Responsable inscripto',
//     companyCuit: '12345678912',

//     // CONCEPTO Y ALMACENES
//     salePoint: '0001',
//     concepto: 1, // 1 = Productos

//     // CLIENT DATA
//     clientName: 'pepe soria',
//     clientCuil: '432564828',
//     clientCondition: 'Consumidor final',
//     clientPhone: '1155565156',
//     clientEmail: 'pepesoria@gmail.com',
//     clientAddress: 'Yerba buena 123',

//     // PRODUCTOS Y/O SERVICIOS
//     items: [
//         {
//             code: '321',
//             product: 'Computadora A1',
//             quantity: '2,00',
//             unit: 'Unidad',
//             unitPrice: '200,00',
//             discountPercent: '5,00',
//             discountAmount: '20,00',
//             subtotal: '380,00'
//         },
//         {
//             code: '322',
//             product: 'Monitor A1',
//             quantity: '1,00',
//             unit: 'Unidad',
//             unitPrice: '100,00',
//             discountPercent: '0,00',
//             discountAmount: '0,00',
//             subtotal: '100,00'
//         }
//     ],

//     // TOTALES
//     totals: {
//         importeGravado: 480,
//         importeExento: 0,
//         iva: 100.80,
//         total: 580.80
//     }
// };

// FACTURA DE CRÉDITO A, B, C
export const facturadeCredito = {
  // FACTURA DATA
  // BILLTYPE = 201 => A | BILLTYPE = 206 => B | BILLTYPE = 211 => C
  billType: 201, // Tipo de Factura de Crédito (201: A, 206: B, 211: C)
  billTypeLetter: 'A', // Letra de Factura de Crédito
  numeroFactura: 1, // Número de Factura (Calculado)
  issueDate: '25/10/2023',
  dueDate: '25/10/2023',
  saleCondition: 'Contado',

  // COMPANY DATA
  companyName: 'Gestini S.A.',
  companyAddress: 'Gestini street 123',
  companyIvaCondition: 'Responsable inscripto',
  companyCuit: '12345678912',

  // CONCEPTO Y ALMACENES
  salePoint: '0001', // Punto de Venta
  concepto: 1, // Concepto (1: Productos)

  // CLIENT DATA
  clientName: 'pepe soria',
  clientCuil: '432564828',
  clientCondition: 'Consumidor final',
  clientPhone: '1155565156',
  clientEmail: 'pepesoria@gmail.com',
  clientAddress: 'Yerba buena 123',
  CBU: '1234567890123456789012', // CBU del Cliente
  transferencia: 'ADC', // Tipo de Transferencia

  // FECHAS Y MONTOS
  importeGravado: 480.0, // Importe Gravado
  importeExentoIva: 0.0, // Importe Exento de IVA
  importeIva: 100.8, // Importe de IVA
  impTotal: 580.8, // Total de la Factura

  // IVA DETALLE
  Iva: [
    {
      Id: 5, // ID del Tipo de IVA (21%)
      BaseImp: 480.0, // Base Imponible
      Importe: 100.8, // Importe de IVA
    },
  ],

  // OPCIONALES
  Opcionales: [
    {
      Id: 2101, // ID para CBU
      Valor: '1234567890123456789012',
    },
    {
      Id: 27, // ID para Transferencia
      Valor: 'ADC',
    },
  ],
}

// NOTA DE CRÉDITO A, B, C
export const notadecredito = {
  // FACTURA DATA
  billTypeLetter: 'A', // Letra de Nota de Crédito
  billType: '', // Tipo de Nota de Crédito (A, B, C)
  compNumber: '000000033', // Número de Comprobante
  issueDate: '25/10/2023',
  dueDate: '25/10/2023',
  saleCondition: 'Contado', // Condición de Venta

  // COMPANY DATA
  companyName: 'Gestini S.A.', // Nombre de la Empresa
  companyAddress: 'Gestini street 123', // Dirección de la Empresa
  companyIvaCondition: 'Responsable inscripto', // Condición de IVA de la Empresa
  companyCuit: '12345678912', // CUIT de la Empresa

  // CONCEPTO Y ALMACENES
  salePoint: '0001', // Punto de Venta
  concepto: 1, // Concepto (1: Productos)

  // CLIENT DATA
  clientName: 'pepe soria', // Nombre del Cliente
  clientCuil: '432564828', // CUIT/CUIL del Cliente
  clientCondition: 'Consumidor final', // Condición del Cliente
  clientPhone: '1155565156', // Teléfono del Cliente
  clientEmail: 'pepesoria@gmail.com', // Email del Cliente
  clientAddress: 'Yerba buena 123', // Dirección del Cliente

  // FACTURA ASOCIADA
  associatedInvoice: {
    type: 'Factura A', // Tipo de Factura Asociada
    salePoint: '0001', // Punto de Venta Asociado
    compNumber: '000000033', // Número de Comprobante Asociado
  },

  // PRODUCTOS Y/O SERVICIOS
  items: [
    {
      code: '321', // Código del Producto
      product: 'Computadora A1', // Nombre del Producto
      quantity: '2,00', // Cantidad
      unit: 'Unidad', // Unidad de Medida
      unitPrice: '200,00', // Precio Unitario
      discountPercent: '5,00', // Porcentaje de Descuento
      discountAmount: '20,00', // Monto del Descuento
      subtotal: '380,00', // Subtotal
    },
  ],

  // TOTALES
  totals: {
    importeGravado: 480, // Importe Gravado
    importeExento: 0, // Importe Exento
    iva: 100.8, // IVA
    total: 580.8, // Total
  },
}
