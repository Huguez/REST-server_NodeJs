const Role = require('../models/role')

const validarRole = async ( role ) => {
   const existeRol = await Role.findOne( { role } )
   if( !existeRol ){
      throw new Error( `El rol ${ rol } no esta registrado en la BD` )
   }
}

module.exports = {
   validarRole
}