const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearResIncidencia,
        obtenerResponseIncidencia,
       } = require('../controllers/resincidencias');

const { existeUsuarioPorId,existeUIncidenciaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/:id', obtenerResponseIncidencia );




router.post('/', [
    check('mensaje','El mensaje es obligatorio').not().isEmpty(),
    check('incidencia','No es un id de Mongo').isMongoId(),
    check('usuario','No es un id de Mongo').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearResIncidencia );






module.exports = router;
