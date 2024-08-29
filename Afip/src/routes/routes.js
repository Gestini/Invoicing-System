const express = require('express');
const router = express.Router();
const fs = require('fs');
const afip = require('../config/afip');
const { factura, notadecredito, facturadeCredito } = require('../data/facturas');
const path = require('path');
const handlebars = require('handlebars')

// Ruta para verificar el estado
router.get('/', (req, res) => {
    res.json({ message: 'Listen to port 4000' });
});

// Ruta para verificar el estado
router.get('/status', async (req, res) => {
    try {
        const serverStatus = await afip.ElectronicBilling.getServerStatus();
        res.json({ status: serverStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estado del servidor' });
    }
});

// Ruta para crear una factura tipo a, b o c de prueba
router.post('/create-invoice', async (req, res) => {
    try {
        // Datos recibidos del frontend
        const facturaData = req.body;
        // Nombre para el archivo PDF
        const name = 'PDF de prueba';
        // Leer y compilar el archivo HTML
        const templatePath = path.join(__dirname, '../../bill.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(htmlTemplate);
        const html = template(facturaData);
        // Opciones para el archivo PDF
        const options = {
            width: 8,
            marginLeft: 0.1,
            marginRight: 0.1,
            marginTop: 0.1,
            marginBottom: 0.1,
        };
        // Crear el PDF
        const pdfResponse = await afip.ElectronicBilling.createPDF({
            html: html,
            file_name: name,
            options: options
        });

        // Mostrar la URL del archivo creado
        res.json({ file: pdfResponse.file });

    } catch (error) {
        console.error('Error al crear el PDF:', error);
        res.status(500).json({ error: 'Error al crear el PDF' });
    }
});

// Ruta para crear una Factura de Crédito
router.post('/create-credit-invoice', async (req, res) => {
    try {
        // Leer y compilar el archivo HTML de la plantilla
        const templatePath = path.join(__dirname, '../../bill.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(htmlTemplate);
        const html = template(facturadeCredito);

        // Opciones para el archivo PDF
        const options = {
            width: 8,
            marginLeft: 0.1,
            marginRight: 0.1,
            marginTop: 0.1,
            marginBottom: 0.1,
        };

        // Crear el PDF
        const pdfResponse = await afip.ElectronicBilling.createPDF({
            html: html,
            file_name: 'Factura_Credito_',
            options: options
        });

        // Mostrar la URL del archivo creado
        res.json({ file: pdfResponse.file });

    } catch (error) {
        console.error('Error al crear el PDF:', error);
        res.status(500).json({ error: 'Error al crear el PDF' });
    }
});

// Ruta para crear un PDF de una Nota de Crédito
router.post('/create-credit-note', async (req, res) => {
    try {
        // Nombre para el archivo PDF
        const name = 'Nota de Crédito';

        // Leer y compilar el archivo HTML
        const templatePath = path.join(__dirname, '../../credit_note.html'); // Asegúrate de tener un template específico para la Nota de Crédito
        const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(htmlTemplate);
        const html = template(notadecredito);

        // Opciones para el archivo PDF
        const options = {
            width: 8,
            marginLeft: 0.1,
            marginRight: 0.1,
            marginTop: 0.1,
            marginBottom: 0.1,
        };

        // Crear el PDF
        const pdfResponse = await afip.ElectronicBilling.createPDF({
            html: html,
            file_name: name,
            options: options
        });

        // Mostrar la URL del archivo creado
        res.json({ file: pdfResponse.file });

    } catch (error) {
        console.error('Error al crear la Nota de Crédito:', error);
        res.status(500).json({ error: 'Error al crear la Nota de Crédito' });
    }
});

module.exports = router;
