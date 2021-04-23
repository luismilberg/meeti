const Usuarios = require('../models/Usuarios')

// Formulario para crear cuenta
exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    });
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    try {
        const nuevoUsuario = await Usuarios.create(usuario);
    
        //TODO: Flash message y redireccionar
    
        console.log('Usuario creado', nuevoUsuario);
        
    } catch (error) {

        console.log(error);
        return;

        const erroresSequelize = error.errors.map( err => err.message);

        console.log(erroresSequelize);
    }


}