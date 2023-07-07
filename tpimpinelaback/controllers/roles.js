const { response, request } = require('express');
const { Role } = require('../models');



const rolesGet = async(req = request, res = response) => {

  

    const roles = await Role.find();

    

    res.json({
        roles
    });
}

const rolesPut = async(req, res = response) => {

    const { id } = req.params;
    const {  ...resto } = req.body;

    const role = await Role.findByIdAndUpdate( id, resto, {new:true} );
    res.json({role});
}

const rolesPost = async(req, res = response) => {
    
    const {  rol } = req.body;
    const role = new Role({ rol });

    // Guardar en BD
    await role.save();

    res.json({
        role
    });
}


const RoleDelete = async(req, res = response) => {

    const { id } = req.params;
    
    const role = await Role.findByIdAndDelete( id );

    
    res.json(role);
}

 
module.exports = {
    rolesGet,
    rolesPut,
    rolesPost,
    RoleDelete
}