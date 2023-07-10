const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;



    try {

        // Verificar si el email existe
        let user = await Usuario.findOne({ correo });
        if ( !user ) {

          let nombre = correo.split('@')[0];
          let rol = 'USER_ROLE';
          if (nombre.toLowerCase()=='admin'){
            rol = 'ADMIN_ROLE';
          }
          const usuario = new Usuario({ nombre, correo, password, rol});

          // Encriptar la contraseña
          const salt = bcryptjs.genSaltSync();
          usuario.password = bcryptjs.hashSync( password, salt );

          // Guardar en BD
          user = await usuario.save();
        }






        // Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}



module.exports = {
    login,
    googleSignin
}
