
const { Router } = require('express');
const { check } = require('express-validator');


const { existeUsuarioPorId, existeRolPorId } = require('../helpers/db-validators');
const {
    validarCampos,

} = require('../middlewares');


const {rolExiste } = require('../helpers/db-validators');

const router = Router();




const { rolesGet,
        rolesPut,
        rolesPost,
        RoleDelete
   } = require('../controllers/roles');

router.get('/', rolesGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],rolesPut );


router.post('/',[
    check('rol', 'El nombre es obligatorio').not().isEmpty(),

    // check('rol', 'No es un rol exista').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( rolExiste ),
    validarCampos
], rolesPost );


router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeRolPorId ),
    validarCampos
],RoleDelete );

module.exports = router;
