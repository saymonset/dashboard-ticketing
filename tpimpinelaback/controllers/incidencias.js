const { response, request } = require('express');
const Incidencia = require('../models/incidencia');




const incidenciasGet = async(req = request, res = response) => {
    let incidencias = await Incidencia.find();

    const {estado, mensaje} = req.query;

    if (estado){
        incidencias =  incidencias.filter(element => {
                console.log(element.estado);
            return  element?.estado.toLowerCase()== estado.toLowerCase()
          });
    }

  if (mensaje){
    incidencias =  incidencias.filter(element => {

      let indice = element?.mensaje?.toLowerCase().includes(mensaje.toLowerCase());
      if (indice > 0)
         return true;
      else
         return false;
    });
  }

    res.json({
        incidencias
    });
}

const incidenciaPost = async(req, res = response) => {

    const {  mensaje, tipo_incidencia, estado } = req.body;


    const query = { estado: { $ne: false }  };
    const num_incidencia = await Incidencia.countDocuments(query) + 1;

    const incidencia = new Incidencia({ mensaje,num_incidencia, tipo_incidencia, estado });



    // Guardar en BD
    await incidencia.save();

    res.json({
        incidencia
    });
}



const incidenciaPut = async(req, res = response) => {

    const { id } = req.params;
    const {  ...resto } = req.body;
    const incidencia = await Incidencia.findByIdAndUpdate( id, resto, {new:true} );
    res.json({incidencia});
}

const incidenciaDelete = async(req, res = response) => {

    const { id } = req.params;

    const incidencia = await Incidencia.findByIdAndDelete( id );


    res.json(incidencia);
}


module.exports = {

    incidenciaPut,

    incidenciaDelete,
    incidenciasGet,
    incidenciaPost
}
