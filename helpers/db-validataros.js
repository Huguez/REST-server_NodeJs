const { 
   Role,
   User,
   Product,
   Category 
} = require('../models')

const existeProducto = async ( id ) => {      
   const p = await Product.findById( id ).findOne({ state: true })
   if( !p ) {
      throw new Error( `No hay una categoria activa con el id: ${ id }` )
   }
}

const existeCategoria = async ( id ) => {      
   const c = await Category.findById( id ).findOne({ state: true })
   if( !c ) {
      throw new Error( `No hay una categoria activa con el id: ${ id }` )
   }
}

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

const coleccionesPermitidas = ( col, colPerm ) => {
   if( !colPerm.includes( col ) ){
      throw new Error( `La collecion ${ col } No esta permitida` )
   }
   return true
} 
   
module.exports = {
   validarRole,
   validarEmail,
   validarExisteUser,
   existeCategoria,
   existeProducto,
   coleccionesPermitidas,
}