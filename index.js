import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Diversas variables
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear() // Año en footer
    res.locals.nombreSitio = 'Agencia de viaje'; // Titulo
    next();
});

// Agregar bodyparser para agregar los datos de testimoniales
app.use(express.urlencoded({extended: true}));

//Definir carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
    console.log(`El servidor está funcionando en el puerto ${port} y en el ${host}`)
});