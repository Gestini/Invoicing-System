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