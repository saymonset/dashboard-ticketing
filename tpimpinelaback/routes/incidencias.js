
const { Router } = require('express');
const { check } = require('express-validator');


const {
    validarCampos,

} = require('../middlewares');


const router = Router();


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
    check('estado', 'El  estado es obligatorio').not().isEmpty(),
    validarCampos
],incidenciaPut );



router.delete('/:id',incidenciaDelete );

module.exports = router;
