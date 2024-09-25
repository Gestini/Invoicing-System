<<<<<<< HEAD
// Usuario para ingresar a AFIP.
// Para la mayoria es el mismo CUIT, pero al administrar
// una sociedad el CUIT con el que se ingresa es el del administrador
// de la sociedad.
const username = '20432405649'; 

// Contraseña para ingresar a AFIP.
const password = 'Estte12345';

// Alias para el certificado (Nombre para reconocerlo en AFIP)
// un alias puede tener muchos certificados, si estas renovando
// un certificado pordes utilizar le mismo alias
const alias = 'afipsdk';

// Creamos el certificado (¡Paciencia! Esto toma unos cuantos segundos)
const res = await afip.CreateCert(username, password, alias);

// Mostramos el certificado por pantalla
console.log(res.cert);

// Mostramos la key por pantalla
console.log(res.key);

// ATENCION! Recorda guardar el cert y key ya que 
// la libreria por seguridad no los guarda, esto depende de vos.
// Si no lo guardas vas tener que generar uno nuevo con este metodo
=======
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
>>>>>>> ae81e340df4eeaa071b610ffa69a2269a3ffaf3e
