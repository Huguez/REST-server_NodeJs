const Role = require('../models/role')
const User = require( '../models/user' )

const validarRole = async ( role ) => {
   const existeRol = await Role.findOne( { role } )
   if( !existeRol ){
      throw new Error( `El rol ${ role } no esta registrado en la BD` )
   }
}

const validarEmail = async ( email ) => {
   const existeEmail = await User.findOne( { email } )
   if( existeEmail ){
      throw new Error( `El email ${ email } ya esta registrado en la BD` )
   }
}


const validarExisteUser = async ( id ) => {
   const existeUser = await User.findOne( { id } )
   if( !existeUser ){
      throw new Error( `El usuario con ${ id } No esta registrado en la BD` )
   }
}
   
module.exports = {
   validarRole,
   validarEmail,
   validarExisteUser
}