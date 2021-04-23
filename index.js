const express = require('express');
const router = require('./routes');
const path = require('path');
const expresslayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Configuración y modelos de la BD
const db = require('./config/db');
db.sync()
    .then(()=>{
        console.log('Db Conectada');
    })
    .catch((e) => {
        console.log(e);
    });


// Variables de desarrollo
require ('dotenv').config({
    path: 'variables.env'
});

// Importación de los modelos
require('./models/Usuarios');

// Aplicación Principal
const app = express();

// Bodyparser para leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar EJS como template engine
app.use(expresslayouts)
app.set('view engine', 'ejs');

// Ubicación de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar el contenido estático
app.use(express.static('public'));

// Habilitar cookie parser
app.use(cookieParser());

// Crear la sesión
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));

// Agregar flash messages
app.use(flash());

// Middleware Propio (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
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