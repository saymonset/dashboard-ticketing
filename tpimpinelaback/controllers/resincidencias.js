const { response } = require('express');

const ResponseIncidencia = require('../models/response_incidencia');



const obtenerResponseIncidencia = async(req, res = response ) => {

    let respose_incidencias =  await ResponseIncidencia.find()
    .populate('incidencia')
    .populate('usuario');

    const { id } = req.params;
    const { estado} = req.query;

    if (estado){
      respose_incidencias =  respose_incidencias.filter(element => {
            return  element.incidencia?.estado.toLowerCase()== estado.toLowerCase()
          })

    }

    if (id){
      respose_incidencias =  respose_incidencias.filter(element => {
        return  element.incidencia?._id == id
      })
    }



    res.json({
      respose_incidencias
    });
}



const crearResIncidencia = async(req, res = response ) => {

    const {  ...body } = req.body;


    // Generar la data a guardar
    const data = {
        ...body
    }

    const rsi = new ResponseIncidencia( data );

    // Guardar DB
    await rsi.save();

    res.status(201).json(rsi);

}





module.exports = {
    crearResIncidencia,
    obtenerResponseIncidencia,

}
