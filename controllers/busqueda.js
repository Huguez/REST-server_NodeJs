const { request, response } = require( 'express' )
const { ObjectId } = require( 'mongoose' ).Types

const { Product, Category, User } = require( '../models' )


const buscarUser = async ( term = "", res = response ) => {

   const isMongoID = ObjectId.isValid( term )

   if( isMongoID ){
      const auxU = await User.findById( term )
      return res.status( 200 ).json( {
         results: ( !!auxU ? [ auxU ] : [] )  
      } )
   }

   const regex = new RegExp( term, 'i' )

   const results = await User.find( { 
      $or: [ { name: regex }, { email: regex } ],
      $and: [ { state: true } ]
   } )

   return res.status( 200 ).json( { results } )
}

const buscarCategory = async ( term = "", res = response ) => {
   try {
      const isMongoID = ObjectId.isValid( term )

      if( isMongoID ){
         const auxU = await Category.findById( term ).populate( 'user', [ 'name', 'email' ] )

         return res.status( 200 ).json( {
            results: ( !!auxU ? [ auxU ] : [] )  
         } )
      }
      
      const regex = new RegExp( term, 'i' )

      const results = await Category.find( { 
         $or: [ { name: regex } ],
         $and: [ { state: true } ]
      } ).populate( 'user', [ 'name', 'email' ] )

      return res.status( 200 ).json( { results } )
   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: "Error en search",
         error
      } )
   }
}


const buscarProducto = async ( term = "", res = response ) => {
   try {
      const isMongoID = ObjectId.isValid( term )

      if( isMongoID ){
         const auxP = await Product.findById( term ).populate( 'categoria', 'name' ).populate( 'user', [ 'name', 'email' ] )

         return res.status( 200 ).json( {
            results: ( !!auxP ? [ auxP ] : [] )  
         } )
      }

      const regex = new RegExp( term, 'i' )

      const results = await Product.find( { 
         $or: [ { name: regex }, { descripcion: regex } ],
         $and: [ { state: true } ]
      } ).populate( 'categoria', 'name' ).populate( 'user', [ 'name', 'email' ] )

      return res.status( 200 ).json( { results } )
      
   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: "Error en search",
         error
      } )   
   }
}

const coleccionesPermitidas = [
   'users',
   'categoria',
   'productos',
]

const search = ( req = request, res = response ) => {
   try {
      const { term, coleccion } = req.params

      if ( !coleccionesPermitidas.includes( coleccion ) ) {
         return res.status( 400 ).json({
            msg: `Las collecciones permitidas son: ${ coleccionesPermitidas.toString() }`
         })
      }

      switch( coleccion ){
         case 'users':
            return buscarUser( term, res )
         case 'categoria':
            return buscarCategory( term, res )
         case 'productos':
            return buscarProducto( term, res )
         default:
            return res.status( 500 ).json({
               msg: `busqueda pendiente, ${ coleccion }`
            })
      }
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: "Error en search",
         error
      } )
   }
}



module.exports = {
   search
}