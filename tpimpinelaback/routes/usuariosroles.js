
const { Router } = require('express');
const { check } = require('express-validator');


const { existeUsuarioPorId, existeRolPorId, existeRolePorId } = require('../helpers/db-validators');
const {
    validarCampos,

} = require('../middlewares');


const router = Router();




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
