const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  factura,
  notadecredito,
  facturadeCredito,
} = require("../data/facturas");
const path = require("path");
const handlebars = require("handlebars");
const axios = require("axios");
const forge = require("node-forge");
const bodyParser = require("body-parser");
const archiver = require("archiver");
const Afip = require("@afipsdk/afip.js"); // Asegúrate de instalar afip.js con npm

// Ruta para verificar el estado
router.get("/", (req, res) => {
  res.json({ message: "Listen to port 4000" });
});

const taxId = "";
const username = "";
const password = "d";
const alias = "";

const certPath = path.resolve(__dirname, "cert.txt");
const keyPath = path.resolve(__dirname, "privateKey.txt");

const cert = fs.readFileSync(certPath, { encoding: "utf8" });
const key = fs.readFileSync(keyPath, { encoding: "utf8" });

const afip = new Afip({ CUIT: taxId, cert: cert, key: key });

// // Ruta para verificar el estado
// router.get("/status", async (req, res) => {
//   try {
//     const serverStatus = await afip.ElectronicBilling.getServerStatus();
//     res.json({ status: serverStatus });
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener el estado del servidor" });
//   }
// });

// // Ruta para crear una factura tipo a, b o c de prueba
// router.post("/create-invoice", async (req, res) => {
//   try {
//     // Datos recibidos del frontend
//     const facturaData = req.body;
//     // Nombre para el archivo PDF
//     const name = "PDF de prueba";
//     // Leer y compilar el archivo HTML
//     const templatePath = path.join(__dirname, "../../bill.html");
//     const htmlTemplate = fs.readFileSync(templatePath, "utf8");
//     const template = handlebars.compile(htmlTemplate);
//     const html = template(facturaData);
//     // Opciones para el archivo PDF
//     const options = {
//       width: 8,
//       marginLeft: 0.1,
//       marginRight: 0.1,
//       marginTop: 0.1,
//       marginBottom: 0.1,
//     };
//     // Crear el PDF
//     const pdfResponse = await afip.ElectronicBilling.createPDF({
//       html: html,
//       file_name: name,
//       options: options,
//     });

//     // Mostrar la URL del archivo creado
//     res.json({ file: pdfResponse.file });
//   } catch (error) {
//     console.error("Error al crear el PDF:", error);
//     res.status(500).json({ error: "Error al crear el PDF" });
//   }
// });

// // Ruta para crear una Factura de Crédito
// router.post("/create-credit-invoice", async (req, res) => {
//   try {
//     // Leer y compilar el archivo HTML de la plantilla
//     const templatePath = path.join(__dirname, "../../bill.html");
//     const htmlTemplate = fs.readFileSync(templatePath, "utf8");
//     const template = handlebars.compile(htmlTemplate);
//     const html = template(facturadeCredito);

//     // Opciones para el archivo PDF
//     const options = {
//       width: 8,
//       marginLeft: 0.1,
//       marginRight: 0.1,
//       marginTop: 0.1,
//       marginBottom: 0.1,
//     };

//     // Crear el PDF
//     const pdfResponse = await afip.ElectronicBilling.createPDF({
//       html: html,
//       file_name: "Factura_Credito_",
//       options: options,
//     });

//     // Mostrar la URL del archivo creado
//     res.json({ file: pdfResponse.file });
//   } catch (error) {
//     console.error("Error al crear el PDF:", error);
//     res.status(500).json({ error: "Error al crear el PDF" });
//   }
// });

// // Ruta para crear un PDF de una Nota de Crédito
// router.post("/create-credit-note", async (req, res) => {
//   try {
//     // Nombre para el archivo PDF
//     const name = "Nota de Crédito";

//     // Leer y compilar el archivo HTML
//     const templatePath = path.join(__dirname, "../../credit_note.html"); // Asegúrate de tener un template específico para la Nota de Crédito
//     const htmlTemplate = fs.readFileSync(templatePath, "utf8");
//     const template = handlebars.compile(htmlTemplate);
//     const html = template(notadecredito);

//     // Opciones para el archivo PDF
//     const options = {
//       width: 8,
//       marginLeft: 0.1,
//       marginRight: 0.1,
//       marginTop: 0.1,
//       marginBottom: 0.1,
//     };

//     // Crear el PDF
//     const pdfResponse = await afip.ElectronicBilling.createPDF({
//       html: html,
//       file_name: name,
//       options: options,
//     });

//     // Mostrar la URL del archivo creado
//     res.json({ file: pdfResponse.file });
//   } catch (error) {
//     console.error("Error al crear la Nota de Crédito:", error);
//     res.status(500).json({ error: "Error al crear la Nota de Crédito" });
//   }
// });

// Ruta para generar clave y CSR

// router.post("/generate-csr", (req, res) => {
//   const { companyName, certName, cuit } = req.body;

//   if (!companyName || !certName || !cuit) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // Generar clave privada
//     const keys = forge.pki.rsa.generateKeyPair(2048);
//     const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);

//     // Crear CSR
//     const csr = forge.pki.createCertificationRequest();
//     csr.publicKey = keys.publicKey;
//     csr.setSubject([
//       { name: "countryName", value: "AR" },
//       { name: "organizationName", value: companyName },
//       { shortName: "CN", value: certName },
//       { name: "serialNumber", value: `CUIT ${cuit}` },
//     ]);

//     csr.sign(keys.privateKey);
//     const csrPem = forge.pki.certificationRequestToPem(csr);

//     // Configurar el archivo ZIP
//     const archive = archiver("zip", { zlib: { level: 9 } });
//     res.attachment("certificates.zip");

//     // Crear el archivo ZIP y enviarlo como respuesta
//     archive.pipe(res);

//     // Añadir archivos al archivo ZIP
//     archive.append(privateKeyPem, { name: "privateKey.pem" });
//     archive.append(csrPem, { name: "csr.pem" });

//     // Finalizar y enviar el archivo ZIP
//     archive.finalize();
//   } catch (error) {
//     console.error("Error generating CSR:", error); // Más detalles del error
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Ruta para crear una factura
router.post("/create-voucher", async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const {
      punto_de_venta,
      tipo_de_factura,
      concepto,
      tipo_de_documento,
      numero_de_documento,
      importe_gravado,
      importe_exento_iva,
      importe_iva,
      fecha_servicio_desde,
      fecha_servicio_hasta,
      fecha_vencimiento_pago,
    } = req.body;

    // Validar campos requeridos
    const missingFields = [];
    if (punto_de_venta === undefined) missingFields.push("punto_de_venta");
    if (tipo_de_factura === undefined) missingFields.push("tipo_de_factura");
    if (concepto === undefined) missingFields.push("concepto");
    if (tipo_de_documento === undefined)
      missingFields.push("tipo_de_documento");
    if (numero_de_documento === undefined)
      missingFields.push("numero_de_documento");
    if (importe_gravado === undefined) missingFields.push("importe_gravado");
    if (importe_exento_iva === undefined)
      missingFields.push("importe_exento_iva");
    if (importe_iva === undefined) missingFields.push("importe_iva");

    if (concepto === 2 || concepto === 3) {
      if (fecha_servicio_desde === undefined)
        missingFields.push("fecha_servicio_desde");
      if (fecha_servicio_hasta === undefined)
        missingFields.push("fecha_servicio_hasta");
      if (fecha_vencimiento_pago === undefined)
        missingFields.push("fecha_vencimiento_pago");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Faltan los siguientes campos: ${missingFields.join(", ")}`,
      });
    }

    // Obtener el último número de factura
    const last_voucher = await afip.ElectronicBilling.getLastVoucher(
      punto_de_venta,
      tipo_de_factura
    );
    const numero_de_factura = last_voucher + 1;
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    // Crear el objeto de datos para la factura
    const data = {
      CantReg: 1,
      PtoVta: punto_de_venta,
      CbteTipo: tipo_de_factura,
      Concepto: concepto,
      DocTipo: tipo_de_documento,
      DocNro: numero_de_documento,
      CbteDesde: numero_de_factura,
      CbteHasta: numero_de_factura,
      CbteFch: parseInt(fecha.replace(/-/g, "")),
      FchServDesde:
        concepto === 2 || concepto === 3 ? fecha_servicio_desde : null,
      FchServHasta:
        concepto === 2 || concepto === 3 ? fecha_servicio_hasta : null,
      FchVtoPago:
        concepto === 2 || concepto === 3 ? fecha_vencimiento_pago : null,
      ImpTotal: importe_gravado + importe_iva + importe_exento_iva,
      ImpTotConc: 0,
      ImpNeto: importe_gravado,
      ImpOpEx: importe_exento_iva,
      ImpIVA: importe_iva,
      ImpTrib: 0,
      MonId: "PES",
      MonCotiz: 1,
      Iva: [
        {
          Id: 5,
          BaseImp: importe_gravado,
          Importe: importe_iva,
        },
      ],
    };

    // Crear la factura
    const result = await afip.ElectronicBilling.createVoucher(data);

    // Obtener el HTML para el PDF
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Factura</title>
        <style type="text/css">
            * {
                box-sizing: border-box;
                -webkit-user-select: none; /* Chrome, Opera, Safari */
                -moz-user-select: none; /* Firefox 2+ */
                -ms-user-select: none; /* IE 10+ */
                user-select: none; /* Standard syntax */
            }
            .bill-container {
                width: 750px;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                border-collapse: collapse;
                font-family: sans-serif;
                font-size: 13px;
            }
    
            .bill-emitter-row td {
                width: 50%;
                border-bottom: 1px solid;
                padding-top: 10px;
                padding-left: 10px;
                vertical-align: top;
            }
            .bill-emitter-row {
                position: relative;
            }
            .bill-emitter-row td:nth-child(2) {
                padding-left: 60px;
            }
            .bill-emitter-row td:nth-child(1) {
                padding-right: 60px;
            }
    
            .bill-type {
                border: 1px solid;
                border-top: 1px solid;
                border-bottom: 1px solid;
                margin-right: -30px;
                background: white;
                width: 60px;
                height: 50px;
                position: absolute;
                left: 0;
                right: 0;
                top: -1px;
                margin: auto;
                text-align: center;
                font-size: 40px;
                font-weight: 600;
            }
            .text-lg {
                font-size: 30px;
            }
            .text-center {
                text-align: center;
            }
    
            .col-2 {
                width: 16.66666667%;
                float: left;
            }
            .col-3 {
                width: 25%;
                float: left;
            }
            .col-4 {
                width: 33.3333333%;
                float: left;
            }
            .col-5 {
                width: 41.66666667%;
                float: left;
            }
            .col-6 {
                width: 50%;
                float: left;
            }
            .col-8 {
                width: 66.66666667%;
                float: left;
            }
            .col-10 {
                width: 83.33333333%;
                float: left;
            }
            .row {
                overflow: hidden;
            }
    
            .margin-b-0 {
                margin-bottom: 0px;
            }
    
            .bill-row td {
                padding-top: 5px;
            }
    
            .bill-row td > div {
                border-top: 1px solid;
                border-bottom: 1px solid;
                margin: 0 -1px 0 -2px;
                padding: 0 10px 13px 10px;
            }
            .row-details table {
                border-collapse: collapse;
                width: 100%;
            }
            .row-details td > div, .row-qrcode td > div {
                border: 0;
                margin: 0 -1px 0 -2px;
                padding: 0;
            }
            .row-details table td {
                padding: 5px;
            }
            .row-details table tr:nth-child(1) {
                border-top: 1px solid;
                border-bottom: 1px solid;
                background: #c0c0c0;
                font-weight: bold;
                text-align: center;
            }
            .row-details table tr + tr {
                border-top: 1px solid #c0c0c0;
            }
            .text-right {
                text-align: right;
            }
    
            .margin-b-10 {
                margin-bottom: 10px;
            }
    
            .total-row td > div {
                border-width: 2px;
            }
    
            .row-qrcode td {
                padding: 10px;
            }
    
            #qrcode {
                width: 50%;
            }
        </style>
    </head>
<body>
    <table class="bill-container">
        <tr class="bill-emitter-row">
            <td>
                <div class="bill-type">
                    B
                </div>
                <div class="text-lg text-center">
                    Empresa imaginaria S.A.
                </div>
                <p><strong>Razón social:</strong> Empresa imaginaria S.A.</p>
                <p><strong>Domicilio Comercial:</strong> Calle falsa 123</p>
                <p><strong>Condición Frente al IVA:</strong> Responsable inscripto</p>
            </td>
            <td>
                <div>
                    <div class="text-lg">
                        Factura
                    </div>
                    <div class="row">
                        <p class="col-6 margin-b-0">
                            <strong>Punto de Venta: 0001</strong>
                        </p>
                        <p class="col-6 margin-b-0">
                            <strong>Comp. Nro: 000000${numero_de_factura
                              .toString()
                              .padStart(6, "0")}</strong>
                        </p>
                    </div>
                    <p><strong>Fecha de Emisión:</strong> ${fecha}</p>
                    <p><strong>CUIT:</strong> 12345678912</p>
                    <p><strong>Ingresos Brutos:</strong> 12345432</p>
                    <p><strong>Fecha de Inicio de Actividades:</strong> ${fecha}</p>
                </div>
            </td>
        </tr>
        <tr class="bill-row">
            <td colspan="2">
                <div class="row">
                    <p class="col-4 margin-b-0">
                        <strong>Período Facturado Desde: </strong>${fecha}
                    </p>
                    <p class="col-3 margin-b-0">
                        <strong>Hasta: </strong>${fecha}
                    </p>
                    <p class="col-5 margin-b-0">
                        <strong>Fecha de Vto. para el pago: </strong>${fecha}
                    </p>
                </div>
            </td>
        </tr>
        <tr class="bill-row">
            <td colspan="2">
                <div>
                    <div class="row">
                        <p class="col-4 margin-b-0">
                            <strong>CUIL/CUIT: </strong>12345678912
                        </p>
                        <p class="col-8 margin-b-0">
                            <strong>Apellido y Nombre / Razón social: </strong>Pepe Pérez
                        </p>
                    </div>
                    <div class="row">
                        <p class="col-6 margin-b-0">
                            <strong>Condición Frente al IVA: </strong>Consumidor final
                        </p>
                        <p class="col-6 margin-b-0">
                            <strong>Domicilio: </strong>Calle falsa 123
                        </p>
                    </div>
                    <p>
                        <strong>Condición de venta: </strong>Efectivo
                    </p>
                </div>
            </td>
        </tr>
        <tr class="bill-row row-details">
            <td colspan="2">
                <div>
                    <table>
                        <tr>
                            <td>Código</td>
                            <td>Producto / Servicio</td>
                            <td>Cantidad</td>
                            <td>U. Medida</td>
                            <td>Precio Unit.</td>
                            <td>% Bonif.</td>
                            <td>Imp. Bonif.</td>
                            <td>Subtotal</td>
                        </tr>
                        <tr>
                            <td>321</td>
                            <td>Madera</td>
                            <td>1,00</td>
                            <td>Unidad</td>
                            <td>150,00</td>
                            <td>0,00</td>
                            <td>0,00</td>
                            <td>150,00</td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
        <tr class="bill-row total-row">
            <td colspan="2">
                <div>
                    <div class="row text-right">
                        <p class="col-10 margin-b-0">
                            <strong>Subtotal: $</strong>
                        </p>
                        <p class="col-2 margin-b-0">
                            <strong>150,00</strong>
                        </p>
                    </div>
                    <div class="row text-right">
                        <p class="col-10 margin-b-0">
                            <strong>Importe Otros Tributos: $</strong>
                        </p>
                        <p class="col-2 margin-b-0">
                            <strong>0,00</strong>
                        </p>
                    </div>
                    <div class="row text-right">
                        <p class="col-10 margin-b-0">
                            <strong>Importe total: $</strong>
                        </p>
                        <p class="col-2 margin-b-0">
                            <strong>150,00</strong>
                        </p>
                    </div>
                </div>
            </td>
        </tr>
        <tr class="bill-row row-details">
            <td>
                <div>
                    <div class="row">
                        <!-- Aquí puedes agregar más detalles si es necesario -->
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div class="row text-right margin-b-10">
                        <strong>CAE Nº:&nbsp;</strong> 12345678912345
                    </div>
                    <div class="row text-right">
                        <strong>Fecha de Vto. de CAE:&nbsp;</strong> 05/11/2023
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
    </html>
    `;

    // Opciones para el archivo PDF
    const options = {
      width: 8, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
      marginLeft: 0.4, // Margen izquierdo en pulgadas. Usar 0.1 para ticket
      marginRight: 0.4, // Margen derecho en pulgadas. Usar 0.1 para ticket
      marginTop: 0.4, // Margen superior en pulgadas. Usar 0.1 para ticket
      marginBottom: 0.4, // Margen inferior en pulgadas. Usar 0.1 para ticket
    };

    // Crear el PDF
    const pdfResponse = await afip.ElectronicBilling.createPDF({
      html: html,
      file_name: `Factura_${numero_de_factura}`,
      options: options,
    });

    // Enviar la respuesta con detalles de la factura y el PDF
    res.json({
      cae: result.CAE,
      vencimiento: result.CAEFchVto,
      pdfUrl: pdfResponse.file, // Suponiendo que `pdfResponse.file` es la URL del archivo PDF
    });
  } catch (error) {
    // Imprimir el error completo para depuración
    console.error(
      "Error al crear el voucher:",
      error.response ? error.response.data : error.message
    );

    // Enviar un mensaje de error con detalles
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalles en la consola." });
  }
});
// Ruta para generar y mostrar el certificado
router.post("/generate-cert", async (req, res) => {
    try {
      // Obtener los valores del cuerpo de la solicitud
      const { username, taxId, password, alias, wsid = "wsfe" } = req.body;

      const afip = new Afip({ CUIT: taxId});
  
      // Creamos el certificado
      const certResult = await afip.CreateCert(username, password, alias);
  
      // Creamos la autorización
      const authResult = await afip.CreateWSAuth(username, password, alias, wsid);
  
      // Función para subir un archivo de texto a Cloudinary
      const uploadTextFileToCloudinary = async (text) => {
        const formData = new FormData();
        formData.append('file', new Blob([text], { type: 'text/plain' }));
        formData.append('upload_preset', 'preset_pabs');
  
        const response = await fetch(`https://api.cloudinary.com/v1_1/dlmjzjb9x/raw/upload`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.secure_url) {
          return data.secure_url;
        } else {
          throw new Error('Error al subir el archivo: ' + data.message);
        }
      };
  
      // Subir los certificados a Cloudinary
      const certUrl = await uploadTextFileToCloudinary(certResult.cert, `${username}_cert.txt`);
      const keyUrl = await uploadTextFileToCloudinary(certResult.key, `${username}_key.txt`);
  
      // Enviar la respuesta en formato JSON
      res.json({
        "s-user": username,
        "f-cert": certUrl,
        "f-key": keyUrl,
      });
    } catch (error) {
      // En caso de error, enviamos un mensaje de error
      res.status(500).send(`Error: ${error.message}`);
    }
  });
module.exports = router;
