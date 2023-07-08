const { response, request } = require('express');
const { Role } = require('../models');
const { UsuariosRoles } = require('../models');




const usuariosRolesGet = async(req = request, res = response) => {

  

    const uroles = await UsuariosRoles.find().populate("usuario").populate("role");

    

    res.json({
        uroles
    });
}


const usuariosRolesPost = async(req, res = response) => {


    const {  ...body } = req.body;

   
    // Generar la data a guardar
    const data = {
        ...body
    }

    const ur = new UsuariosRoles( data );

    // Guardar DB
    await ur.save();
    
    
    res.json({
        ur
    });
}

 

 

 
module.exports = {
    
    usuariosRolesPost,
    usuariosRolesGet,
}