
import FacturaDesign from './FacturaDesing'

const InvoiceForm = () => {
//   const [factura, setFactura] = useState(facturaTemplate)
//   const [loading, setLoading] = useState(false) // Estado para manejar el loading
//   const [errorMessage, setErrorMessage] = useState<string | null>(null) // Estado para manejar errores

//   const resetForm = () => {
//     setFactura(facturaTemplate)
//   }

//   // Función para transformar la estructura de "factura" en un objeto plano
//   const transformFacturaToObj = () => {
//     const facturaObj = {}
//     factura.forEach((section) => {
//       section.info.forEach((infoItem) => {
//         facturaObj[infoItem.name] = infoItem.value
//       })
//     })
//     return facturaObj
//   }

//   // Función para manejar cambios en los inputs
//   const handleChange = (section, name, value) => {
//     setFactura((prevFactura) =>
//       prevFactura.map((item) =>
//         item.section === section
//           ? {
//               ...item,
//               info: item.info.map((infoItem) =>
//                 infoItem.name === name ? { ...infoItem, value } : infoItem,
//               ),
//             }
//           : item,
//       ),
//     )

//     // Actualizar campos relacionados automáticamente
//     if (name === 'billTypeLetter') {
//       const billTypeMap = { A: 1, B: 6, C: 11 }
//       const billTypeValue = billTypeMap[value] || ''
//       handleChange('Datos de factura', 'billType', billTypeValue)
//     }
//   }

//   // Función para manejar cambios en los selects
//   const handleSelectChange = (section, name, value) => {
//     handleChange(section, name, value)
//   }

//   // Función para manejar el envío del formulario
//   const handleSubmit = async () => {
//     const facturaObj = transformFacturaToObj()
//     setLoading(true)
//     setErrorMessage(null)

//     try {
//       const response = await reqCreateInvoiceAfip(facturaObj)
//       if (response && response.data && response.data.file) {
//         window.open(response.data.file, '_blank')
//       } else {
//         setErrorMessage('Error: La respuesta del servidor no es válida.')
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         setErrorMessage(`Error: ${error.message}`)
//       } else {
//         setErrorMessage('Error: Ha ocurrido un error inesperado.')
//       }
//     } finally {
//       setLoading(false) // Para asegurarte de que se oculta el loading después de la llamada
//     }
//   }

  return (
    <FacturaDesign />
    // <>
    //     <Tabs tabs={tabs} />
    //     <div className="relative w-full max-w-[210mm] min-h-[297mm] p-8 bg-white  mx-auto mt-5">

    //         {/* PUNTA DE LA HOJA */}
    //         <div className="absolute right-0 top-0  w-10 h-10">
    //             {/* Primer triángulo */}
    //             <div className="absolute top-0 left-0 w-0 h-0 border-r-[40px] border-r-transparent border-b-[40px] border-b-c-bg-color-2"></div>
    //             {/* Segundo triángulo */}
    //             <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-c-bg-color"></div>
    //         </div>
    //         {/* Contenido de la boleta */}
    //         <h1 className="text-2xl font-bold mb-4">Boleta de AFIP</h1>

    //         {factura.map(section => (
    //             <div key={section.section} className="mb-1">
    //                 <h3 className="text-xl font-semibold mb-4">{section.section}</h3>
    //                 {section.info.map(infoItem => (
    //                     !infoItem.invisible && (
    //                         <div key={infoItem.name} className="mb-1 flex gap-4">
    //                             <label className="block text-sm font-medium text-gray-700 w-52">
    //                                 {infoItem.title}
    //                             </label>
    //                             {infoItem.type === 'input' ? (
    //                                 <input
    //                                     type="text"
    //                                     value={infoItem.value}
    //                                     onChange={e => handleChange(section.section, infoItem.name, e.target.value)}
    //                                     className="border w-40 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 />
    //                             ) : infoItem.type === 'select' ? (
    //                                 <select
    //                                     value={infoItem.value}
    //                                     onChange={e => handleSelectChange(section.section, infoItem.name, e.target.value)}
    //                                     className=" border  w-40 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 >
    //                                     <option value="">Seleccione</option>
    //                                     {infoItem.options.map(option => (
    //                                         <option key={option} value={option}>
    //                                             {option}
    //                                         </option>
    //                                     ))}
    //                                 </select>
    //                             ) : null}
    //                         </div>
    //                     )
    //                 ))}
    //             </div>
    //         ))}
    //         {errorMessage && (
    //             <div className="text-red-600 mb-4">
    //                 {errorMessage}
    //             </div>
    //         )}
    //         <button
    //             onClick={handleSubmit}
    //             className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
    //             disabled={loading} // Desactiva el botón cuando está cargando
    //         >
    //             {loading ? 'Cargando...' : 'Crear PDF'}
    //         </button>
    //     </div>
    // </>
  )
}

export default InvoiceForm
