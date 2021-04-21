const express = require('express');
const router = require('./routes');
const path = require('path');
const expresslayouts = require('express-ejs-layouts');
const { resolve } = require('path');

const db = require('./config/db');
db.sync()
    .then(()=>{
        console.log('Db Conectada');
    })
    .catch((e) => {
        console.log(e);
    });


require ('dotenv').config({
    path: 'variables.env'
});

const app = express();

// Habilitar EJS como template engine
app.use(expresslayouts)
app.set('view engine', 'ejs');

// Ubicación de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar el contenido estático
app.use(express.static('public'));

// Middleware Propio (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})

// Routing (se coloca al final antes del puerto siempre)
app.use('/', router());

// Agrega el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor está funcionando');
});