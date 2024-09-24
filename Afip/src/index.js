<<<<<<< HEAD
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importa el paquete cors
const routes = require('./routes/routes'); // Asegúrate de que la ruta al archivo de rutas es correcta
const Afip = require('@afipsdk/afip.js');

=======
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Importa el paquete cors
const routes = require("./routes/routes"); // Asegúrate de que la ruta al archivo de rutas es correcta
>>>>>>> ae81e340df4eeaa071b610ffa69a2269a3ffaf3e
const app = express();
const bodyParser = require("body-parser");
const ValidationTokenMiddleware = require("./middlewares/ValidationToken")
const port = process.env.PORT || 4000;

// Instanciamos Afip globalmente para usarlo en varias rutas
const afip = new Afip({ CUIT: process.env.CUIT || '20432405649' });

// Contraseña para ingresar a AFIP.
const password = 'Estte12345';

// Alias para el certificado (Nombre para reconocerlo en AFIP)
const alias = 'Test1';

// Función para crear el certificado
async function createAfipCert() {
    try {
        const res = await afip.CreateCert('20432405649', password, alias);

        // Mostramos el certificado por pantalla
        console.log('Certificado:', res.cert);

        // Mostramos la key por pantalla
        console.log('Key:', res.key);
    } catch (error) {
        console.error('Error creando certificado:', error);
    }
}

// Ejecuta la función async para crear el certificado
createAfipCert();

// Middleware para registrar solicitudes HTTP
app.use(morgan("dev"));

// Middleware para parsear JSON
app.use(bodyParser.json());

<<<<<<< HEAD
// Configura CORS
app.use(cors({
    origin: 'http://localhost:5173' // Permite solicitudes solo desde este origen
}));
=======
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes solo desde este origen
  })
);
>>>>>>> ae81e340df4eeaa071b610ffa69a2269a3ffaf3e

app.use('/', ValidationTokenMiddleware, routes) 

// Ruta principal
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Ruta para crear una factura en AFIP
app.post('/create-invoice-afip', async (req, res) => {
    try {
        const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        let data = {
            'CantReg': 1,  // Cantidad de comprobantes a registrar
            'PtoVta': 1,  // Punto de venta
            'CbteTipo': 6,  // Tipo de comprobante (ver tipos disponibles) 
            'Concepto': 1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
            'DocTipo': 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
            'DocNro': 0,  // Número de documento del comprador (0 consumidor final)
            'CbteDesde': 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
            'CbteHasta': 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
            'CbteFch': parseInt(fecha.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
            'ImpTotal': 121, // Importe total del comprobante
            'ImpTotConc': 0,   // Importe neto no gravado
            'ImpNeto': 100, // Importe neto gravado
            'ImpOpEx': 0,   // Importe exento de IVA
            'ImpIVA': 21,  // Importe total de IVA
            'ImpTrib': 0,   // Importe total de tributos
            'MonId': 'PES', // Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
            'MonCotiz': 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
            'Iva': [ // (Opcional) Alícuotas asociadas al comprobante
                {
                    'Id': 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
                    'BaseImp': 100, // Base imponible
                    'Importe': 21 // Importe 
                }
            ],
        };

        const resAfip = await afip.ElectronicBilling.createVoucher(data);

        console.log('CAE:', resAfip['CAE']); // CAE asignado al comprobante
        console.log('Fecha de Vencimiento CAE:', resAfip['CAEFchVto']); // Fecha de vencimiento del CAE (yyyy-mm-dd)
        
        res.status(200).json({ message: 'Factura creada con éxito', CAE: resAfip['CAE'], CAEFchVto: resAfip['CAEFchVto'] });
        
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ error: 'Error al crear la factura' });
    }
});

// Escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
