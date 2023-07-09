const { response } = require('express');
const { Producto } = require('../models');
const ResponseIncidencia = require('../models/response_incidencia');
const usuario = require('../models/usuario');


const obtenerProductos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    });
}


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

const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( producto );

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

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );

}

const borrarProducto = async(req, res = response ) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}




module.exports = {
    crearResIncidencia,
    obtenerResponseIncidencia,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
