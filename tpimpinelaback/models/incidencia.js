
const { Schema, model } = require('mongoose');

const IncidenciaSchema = Schema({
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    mensaje: {
        type: String,
        required: true
    },
    num_incidencia: {
        type: String
    },
    tipo_incidencia: {
        type: String,
        required: true,
        default: 'DUDA',
        emun: ['DUDA', 'PEDIDO', 'INTEGRACION']
    },
    estado: {
        type: String,
        required: true,
        default: 'en-curso',
        emun: ['resuelta', 'en-curso']
    }
});



IncidenciaSchema.methods.toJSON = function() {
    const { __v,...incidencia  } = this.toObject();
    
    return incidencia;
}

module.exports = model( 'Incidencia', IncidenciaSchema );
