
const { Router } = require('express');
const { check } = require('express-validator');


const { existeUsuarioPorId, existeRolPorId, existeRolePorId } = require('../helpers/db-validators');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const {rolExiste } = require('../helpers/db-validators');

const router = Router();



const { 
   
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const { usuariosRolesGet,
        usuariosRolesPost,
   } = require('../controllers/usuariosroles');

router.get('/', usuariosRolesGet );
 
router.post('/',[
    check('usuario','No es un id de Mongo').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    check('role','No es un id de Mongo').isMongoId(),
    check('role').custom( existeRolePorId ),
    validarCampos
], usuariosRolesPost );

 

module.exports = router;