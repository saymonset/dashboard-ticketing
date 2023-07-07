
const { Router } = require('express');
const { check } = require('express-validator');


const { existeUIncidenciaPorId} = require('../helpers/db-validators');
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

const { incidenciasGet,
        incidenciaPost,
        incidenciaPut,
        incidenciaDelete
   } = require('../controllers/incidencias');

router.get('/', incidenciasGet );

router.post('/',[
    check('tipo_incidencia', 'El  tipo de incidencia es obligatorio').not().isEmpty(),
    validarCampos
], incidenciaPost );

router.put('/:id',[
    check('tipo_incidencia', 'El  tipo de incidencia es obligatorio').not().isEmpty(),
    validarCampos
],incidenciaPut );



/***
 * 
 * ,[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUIncidenciaPorId ),
    validarCampos
]
 */

router.delete('/:id',incidenciaDelete );

module.exports = router;