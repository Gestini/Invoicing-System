const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importa el paquete cors
const routes = require('./routes/routes'); // Asegúrate de que la ruta al archivo de rutas es correcta
const app = express();
const port = process.env.PORT || 4000;

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' // Permite solicitudes solo desde este origen
}));

// Si solo deseas permitir solicitudes desde un origen específico, configura CORS de la siguiente manera:
// app.use(cors({ origin: 'http://localhost:5173' }));

// Usar rutas definidas en routes
app.use('/', routes); // Esto usa las rutas definidas en tu archivo de rutas

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
