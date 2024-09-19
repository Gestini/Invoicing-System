// const Afip = require('@afipsdk/afip.js');
// const fs = require('fs');

// // CUIT del contribuyente
// const taxId = 20432405649;
// // Usuario para ingresar a AFIP
// const username = '20432405649';
// // Contraseña para ingresar a AFIP
// // const password = 'Estte12345';
// // // Alias para el certificado
// // const alias = 'gemini';

// // DATOS DE TESTING
// const password = 'gestini';
// // Alias para el certificado
// const alias = 'gestini';

// // Creamos una instancia de la librería
// const afip = new Afip({
//     CUIT: taxId,
//     // access_token: 'K3fxRhkPqdfiryMsek05eHBVxCgT7Xo2qvJJl3hbBOL3LtgHLsb0e6QfKOwPXurc', // Asegúrate de que este token es válido
//     // production: true
// });

// // Crear el certificado y clave privada
// (async () => {
//     try {
//         const res = await afip.CreateCert(username, password, alias);

//         // Guarda el certificado y la clave en archivos (opcional)
//         // fs.writeFileSync('./certificado.crt', res.cert, { encoding: 'utf8' });
//         // fs.writeFileSync('./key.key', res.key, { encoding: 'utf8' });

//         fs.writeFileSync('./certificadoTest.crt', res.cert, { encoding: 'utf8' });
//         fs.writeFileSync('./testKey.key', res.key, { encoding: 'utf8' });
//     } catch (error) {
//         console.error('Error al crear el certificado:', error);
//     }
// })();

// module.exports = afip;
