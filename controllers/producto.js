const { request, response } = require( "express" )
const { Product } = require( '../models' )

const postProduct = async ( req = request, res = response ) => {
   try {
      const { name, ...data  } = req.body

      const auxP = await Product.findOne( { name: name.toUpperCase() } )
      if( auxP ){
         return res.status( 400 ).json( {
            msg: `El producto con el nombre ${ name } ya existe`
         } );
      }

      const producto = new Product( { name: name.toUpperCase(), ...data } )
      await producto.save()

      return res.status( 200 ).json( producto );

   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( { 
         error 
      } )
   }
}

const getProduct = async ( req = request, res = response ) => {
   try {
      const { id } = req.params
      
      const auxP = await Product.findById( id ).populate( 'categoria', [ 'name', ] ).populate( 'user', [ 'name', 'email' ] )

      return res.status( 200 ).json( auxP )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( { 
         error 
      } )
   }
}

const getProducts = async ( req = request, res = response ) => {
   try {
      const { limite = 5, desde = 0 } = req.query

      const [ total, productos ] = await Promise.all( [
         Product.countDocuments( { state: true } ),
         Product.find({ state: true }).limit( Number( limite ) ).skip( Number( desde ) ).populate( 'user', 'name' ).populate( 'categoria', [ 'name' ] )
      ] )

      return res.status( 200 ).json( {
         total,
         productos,
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( { 
         error 
      } )
   }
}

const putProduct = async ( req = request, res = response ) => {
   try {
      const { name, ...data } = req.body
      const { id } = req.params

      const auxP = await Product.findOne( { name: name.toUpperCase(), state: true } )
      if (auxP) {
         return res.status( 200 ).json( { 
            msg: `Ya exite un producto ${ name }`
          } );
      }

      const p = await Product.findByIdAndUpdate( id , { name: name.toUpperCase(), ...data }, { new: true } )
         .populate( 'categoria', [ 'name' ] ).populate( 'user', [ 'name', 'email' ] )

      await p.save() 

      return res.status( 200 ).json( p )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( { 
         error 
      } )
   }
}

const deleteProduct = async ( req = request, res = response ) => {
   try {
      const { id } = req.params

      const producto = await Product.findByIdAndUpdate( id, { state: false }, { new: true } )
         .populate( 'categoria', [ 'name', 'user' ] ).populate( 'user', [ 'name', 'email' ] )

      return res.status( 200 ).json( producto )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( { 
         error 
      } )
   }
}

module.exports = {
   postProduct,
   getProduct,
   getProducts,
   putProduct,
   deleteProduct
}