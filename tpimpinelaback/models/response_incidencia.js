const { Schema, model } = require('mongoose');

const ResponseIncidenciaSchema = Schema({
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    mensaje: {
        type: String,
        required: true
    },
    archivo: {
        type: String
    },
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    
    incidencia: {
        type: Schema.Types.ObjectId,
        ref: 'Incidencia',
        required: true
    }, 
});


ResponseIncidenciaSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}


module.exports = model( 'ResponseIncidencia', ResponseIncidenciaSchema );
