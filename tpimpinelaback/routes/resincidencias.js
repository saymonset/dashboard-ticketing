const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearResIncidencia,
        obtenerResponseIncidencia,
        obtenerProducto,
        actualizarProducto, 
        borrarProducto } = require('../controllers/resincidencias');

const { existeUsuarioPorId,existeUIncidenciaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerResponseIncidencia );

 

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    check('mensaje','El mensaje es obligatorio').not().isEmpty(),
    check('incidencia','No es un id de Mongo').isMongoId(),
  //  check('incidencia').custom( existeUIncidenciaPorId ),
    check('usuario','No es un id de Mongo').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearResIncidencia );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarProducto);


module.exports = router;