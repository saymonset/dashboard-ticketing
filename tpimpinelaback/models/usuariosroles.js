
const { Schema, model } = require('mongoose');

const UsuariosrolesSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
});



UsuariosrolesSchema.methods.toJSON = function() {
    const { __v,...ur  } = this.toObject();
    
    return ur;
}

module.exports = model( 'UsuariosRoles', UsuariosrolesSchema );
