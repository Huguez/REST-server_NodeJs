const { request, response } = require( 'express' )
const { Category } = require( "../models" )

const getCategorys = async ( req = request, res = response ) => {
   try {
      const { limite = 5, desde = 0 } = req.query

      const [ total, categorias ] = await Promise.all( [
         (await Category.find( { state: true } )).length,
         Category.find({ state: true }).limit( Number( limite ) ).skip( Number( desde ) ).populate( 'user', 'name' )
      ] )

      return res.status( 200 ).json( {
         total,
         categorias,
      } )

   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const getCategory = async ( req = request, res = response ) => {
   try {
      const { params:{ id } } = req

      const c = await Category.findById( id ).populate( 'user', 'name' )
      
      return res.status( 200 ).json( c )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const postCategory = async ( req = request, res = response ) => {
   try {
      const { name } = req.body

      const nombre = name.toUpperCase();

      const existe = await Category.findOne( { name: nombre } )
      if( existe ) {
         return res.status( 400 ).json( {
            msg: `La categoria ${ name } ya existe`
         } );
      }

      const data = {
         name: nombre,
         user: req.user._id
      }

      const c = new Category( data )
      await c.save()

      const { __v, state, ...rest } = c["_doc"]

      return res.status( 201 ).json( { ...rest } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const putCategory = async ( req = request, res = response ) => {
   try {
      const { body:{ name }, params:{ id } } = req

      const nombre = name.toUpperCase();
      
      let aux = await Category.findByIdAndUpdate( id, { name: nombre }, { new: true } ).populate( 'user', ['name', 'email', 'role'] )
      
      await aux.save()

      return res.status( 200 ).json( aux )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const deleteCategory = async( req = request, res = response ) => {
   try {
      const { params:{ id } } = req

      let aux = await Category.findByIdAndUpdate( id, { state: false }, { new: true } ).populate( 'user', ['name', 'email', 'role'] )
      
      await aux.save()

      return res.status( 200 ).json( aux )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}


module.exports = {
   getCategorys,
   getCategory,
   postCategory,
   putCategory,
   deleteCategory
}